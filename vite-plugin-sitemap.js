/**
 * Sitemap Generator Plugin for High Seas Yachting
 *
 * ─ What it does ─────────────────────────────────────────────────────────────
 *  • Reads src/router/index.js and auto-discovers every static route.
 *  • Calls a resolver for each dynamic route (:param) to produce real URLs
 *    from the data files in public/data/.
 *  • Writes public/sitemap.xml on every `npm run build` AND on dev-server start.
 *  • In dev mode, watches the router file and regenerates on changes.
 *
 * ─ Adding a new STATIC page (e.g. /new-page) ───────────────────────────────
 *  1. Add the route to src/router/index.js → picked up automatically.
 *  2. Optionally add SEO metadata for it in ROUTE_META below.
 *
 * ─ Adding a new DYNAMIC page (e.g. /yacht/:id) ──────────────────────────────
 *  1. Add the route to src/router/index.js.
 *  2. Write a resolver function (see examples below as a pattern).
 *  3. Register it in DYNAMIC_RESOLVERS.
 */

import fs   from 'fs'
import path from 'path'

// ─── SITE CONFIGURATION ──────────────────────────────────────────────────────
// Change BASE_URL to your production domain before deploying.
const BASE_URL = 'https://highseasyachting.com'

// SEO metadata per static route path.
// Any route not listed here uses DEFAULTS below.
const ROUTE_META = {
  '/':             { priority: 1.0, changefreq: 'daily'   },
  '/forsale':      { priority: 0.9, changefreq: 'daily'   },
  '/day-charter':  { priority: 0.9, changefreq: 'daily'   },
  '/term-charter': { priority: 0.9, changefreq: 'weekly'  },
  '/dockage':      { priority: 0.8, changefreq: 'weekly'  },
  '/blog':         { priority: 0.8, changefreq: 'daily'   },
  '/about-us':     { priority: 0.8, changefreq: 'monthly' },
  '/our-team':     { priority: 0.7, changefreq: 'monthly' },
  '/events':       { priority: 0.8, changefreq: 'weekly'  },
  '/contact-us':   { priority: 0.8, changefreq: 'monthly' },
}

const DEFAULTS = { priority: 0.6, changefreq: 'weekly' }

// Destination UUIDs used in the app (see HomePage.vue → destinations-slider).
// Add new destination IDs here when adding new destinations to the homepage.
const DESTINATION_IDS = [
  '7f0099dc-4336-47ad-aee7-16138f08ea29', // New England & The Hamptons
  'ef4e5acf-30d6-42e8-b3d4-ced8e5731c3b', // South Florida & The Keys
  '5e5763c6-3ac1-4f0d-8fd7-36dcb2f31220', // Mediterranean
]

// ─── UTILITY HELPERS ─────────────────────────────────────────────────────────

function readJson(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch {
    return null
  }
}

// Flattens batched or nested JSON structures into a flat array of records.
function extractRecords(data) {
  if (!data) return []
  if (Array.isArray(data)) {
    // Batched format: [{data_type, records: [...]}, ...]
    if (data.length > 0 && data[0]?.records) {
      return data.flatMap(batch => batch.records ?? [])
    }
    return data
  }
  return data.records ?? []
}

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Mirrors the slug formula used in Vue pages (ForsalePage, DayCharterPage, etc.)
function generateListingSlug(listing, suffix) {
  return slugify(`${listing.year || ''}-${listing.manufacturer || ''}-${listing.yacht_name || ''}-${suffix}`)
}

function isoDate(dateStr) {
  try {
    if (!dateStr) return today()
    const d = new Date(dateStr)
    if (isNaN(d)) return today()
    return d.toISOString().slice(0, 10)
  } catch {
    return today()
  }
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

// ─── ROUTER PARSER ───────────────────────────────────────────────────────────
// Reads src/router/index.js and extracts every path: '...' that has no params.
// New static routes are picked up automatically – no changes needed here.

function parseStaticPaths(routerFile) {
  if (!fs.existsSync(routerFile)) return []
  const src = fs.readFileSync(routerFile, 'utf8')
  const results = []
  const re = /path:\s*['"`]([^'"`]+)['"`]/g
  let m
  while ((m = re.exec(src)) !== null) {
    const p = m[1]
    if (!p.includes(':') && !p.includes('*')) results.push(p)
  }
  return [...new Set(results)]
}

function parseDynamicPatterns(routerFile) {
  if (!fs.existsSync(routerFile)) return []
  const src = fs.readFileSync(routerFile, 'utf8')
  const results = []
  const re = /path:\s*['"`]([^'"`]*:[^'"`]+)['"`]/g
  let m
  while ((m = re.exec(src)) !== null) results.push(m[1])
  return [...new Set(results)]
}

// ─── DYNAMIC RESOLVERS ───────────────────────────────────────────────────────
// Each function receives the public/data directory path and returns an array of
// { loc, priority, changefreq, lastmod? } objects.

async function resolveListings(dataDir) {
  const urls  = []
  const seenIds = new Set()

  // ── Own listings (listings.json) ──────────────────────────────────────────
  const ownRecords = extractRecords(readJson(path.join(dataDir, 'listings.json')))
  for (const listing of ownRecords) {
    if (!listing?.id || seenIds.has(listing.id)) continue
    seenIds.add(listing.id)

    // Use the pre-computed slug field when available (primary lookup in ListingDetailPage)
    const slug = listing.slug || generateListingSlug(
      listing,
      listing.type === 'daycharter'  ? 'day-charter'  :
      listing.type === 'termcharter' ? 'term-charter' : 'for-sale'
    )
    if (!slug) continue

    urls.push({
      loc:         `${BASE_URL}/listing-detail/${encodeURIComponent(slug)}`,
      priority:    0.7,
      changefreq:  'weekly',
      lastmod:     isoDate(listing.updated_at),
    })
  }

  // ── MLS forsale listings (yacht-mls-forsale.json) ────────────────────────
  const mlsRecords = extractRecords(readJson(path.join(dataDir, 'yacht-mls-forsale.json')))
  for (const listing of mlsRecords) {
    if (!listing?.id || seenIds.has(listing.id)) continue
    seenIds.add(listing.id)

    const slug = listing.slug || generateListingSlug(listing, 'for-sale')
    if (!slug) continue

    urls.push({
      loc:        `${BASE_URL}/listing-detail/${encodeURIComponent(slug)}`,
      priority:   0.6,
      changefreq: 'weekly',
      lastmod:    isoDate(listing.updated_at),
    })
  }

  return urls
}

async function resolveBrokers(dataDir) {
  const records = extractRecords(readJson(path.join(dataDir, 'brokers.json')))
  return records
    .filter(b => b?.name && b.is_active !== false)
    .map(broker => ({
      // Mirrors getBrokerSlug() in OurTeamPage.vue / HomePage.vue
      loc:        `${BASE_URL}/broker/${encodeURIComponent(`${broker.name}-high-seas-yachting`)}`,
      priority:   0.6,
      changefreq: 'monthly',
      lastmod:    isoDate(broker.updated_at),
    }))
}

async function resolveBlogs(dataDir) {
  const records = extractRecords(readJson(path.join(dataDir, 'blogs.json')))
  return records
    .filter(b => b?.id && b.status !== 'draft')
    .map(blog => ({
      loc:        `${BASE_URL}/blog/${blog.id}`,
      priority:   0.6,
      changefreq: 'monthly',
      lastmod:    isoDate(blog.updated_at || blog.publish_date),
    }))
}

async function resolveEvents(dataDir) {
  const records = extractRecords(readJson(path.join(dataDir, 'events.json')))
  return records
    .filter(e => e?.id)
    .map(event => ({
      loc:        `${BASE_URL}/event/${event.id}`,
      priority:   0.6,
      changefreq: 'weekly',
      lastmod:    isoDate(event.updated_at),
    }))
}

async function resolveDestinations() {
  return DESTINATION_IDS.map(id => ({
    loc:        `${BASE_URL}/destination-listings/${id}`,
    priority:   0.7,
    changefreq: 'weekly',
    lastmod:    today(),
  }))
}

// Maps the exact route pattern string (from router/index.js) to its resolver.
// !! Add a new entry here when you add a new dynamic route type !!
const DYNAMIC_RESOLVERS = {
  '/listing-detail/:slug':     resolveListings,
  '/broker/:id':               resolveBrokers,
  '/blog/:id':                 resolveBlogs,
  '/event/:id':                resolveEvents,
  '/destination-listings/:id': resolveDestinations,
  // '/daycharter-booking/:slug' is intentionally excluded (booking form, not indexable content)
}

// ─── XML BUILDER ─────────────────────────────────────────────────────────────

function buildXml(urls) {
  const now = today()
  const entries = urls
    .map(({ loc, priority, changefreq, lastmod }) =>
      `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      `    <lastmod>${lastmod || now}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${Number(priority).toFixed(1)}</priority>\n` +
      `  </url>`
    )
    .join('\n')

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset\n` +
    `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n` +
    `  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n` +
    `    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n` +
    `\n` +
    entries + '\n' +
    `\n</urlset>\n`
  )
}

// ─── MAIN GENERATOR ──────────────────────────────────────────────────────────

export async function generateSitemap(rootDir) {
  const routerFile = path.join(rootDir, 'src', 'router', 'index.js')
  const dataDir    = path.join(rootDir, 'public', 'data')
  const outFile    = path.join(rootDir, 'public', 'sitemap.xml')

  console.log('[sitemap] Generating...')
  const startMs = Date.now()

  const allUrls = []

  // 1. Static routes (auto-detected from router)
  const staticPaths = parseStaticPaths(routerFile)
  for (const routePath of staticPaths) {
    const meta = ROUTE_META[routePath] ?? DEFAULTS
    allUrls.push({
      loc:        `${BASE_URL}${routePath}`,
      priority:   meta.priority,
      changefreq: meta.changefreq,
      lastmod:    today(),
    })
  }

  // 2. Dynamic routes (resolved from data files)
  const dynamicPatterns = parseDynamicPatterns(routerFile)
  for (const pattern of dynamicPatterns) {
    const resolver = DYNAMIC_RESOLVERS[pattern]
    if (!resolver) continue
    try {
      const resolved = await resolver(dataDir)
      allUrls.push(...resolved)
    } catch (err) {
      console.warn(`[sitemap] Warning: resolver for "${pattern}" failed: ${err.message}`)
    }
  }

  // 3. Deduplicate by URL (own listings take priority over MLS)
  const seen    = new Set()
  const dedupedUrls = allUrls.filter(u => {
    if (seen.has(u.loc)) return false
    seen.add(u.loc)
    return true
  })

  // 4. Write
  fs.writeFileSync(outFile, buildXml(dedupedUrls), 'utf8')
  const ms = Date.now() - startMs
  console.log(`[sitemap] ✓ ${dedupedUrls.length} URLs → public/sitemap.xml (${ms}ms)`)
}

// ─── VITE PLUGIN ─────────────────────────────────────────────────────────────

export function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',

    // Runs on every `npm run build`
    async buildStart() {
      await generateSitemap(process.cwd())
    },

    // Runs when dev server starts; watches for router changes
    configureServer(server) {
      generateSitemap(process.cwd()).catch(console.error)

      const routerFile = path.join(process.cwd(), 'src', 'router', 'index.js')
      server.watcher.add(routerFile)

      server.watcher.on('change', async (changedFile) => {
        const rel = path.relative(process.cwd(), changedFile).replace(/\\/g, '/')
        if (rel.startsWith('src/router') || rel.startsWith('public/data')) {
          console.log(`[sitemap] "${rel}" changed, regenerating...`)
          await generateSitemap(process.cwd()).catch(console.error)
        }
      })
    },
  }
}

export default sitemapPlugin
