<template>
    <NavbarSection />
  <header class="page-hero" :style="heroBackgroundStyle">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span class="hero-label"><i class="fas fa-pen-nib"></i> Blog</span>
      <h1 class="hero-title">{{ blog?.title || 'Blog Not Found' }}</h1>
    </div>
  </header>

  <main class="content-shell">
    <div v-if="blog" class="blog-detail-layout">
      <article class="blog-main">
        <img class="blog-image" :src="blog.featured_image || blog.image || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'" :alt="blog.title">
        
        <div class="blog-content">
          <div class="blog-header">
            <div class="blog-meta-detail">
              <span><i class="fas fa-user"></i> {{ blog.author || 'By Admin' }}</span>
              <span><i class="fas fa-calendar-alt"></i> {{ formatDate(blog.publish_date || blog.date) }}</span>
              <span><i class="fas fa-tag"></i> {{ blog.category || 'Luxury Lifestyle' }}</span>
            </div>
            <h2 class="blog-title">{{ blog.title }}</h2>
          </div>

          <div class="blog-body" v-html="renderedContent"></div>

          <div class="blog-footer">
            <div class="blog-tags" v-if="blog.tags && blog.tags.length">
              <span v-for="tag in blog.tags" :key="tag" class="tag-badge">{{ tag }}</span>
            </div>

            <div class="blog-share">
              <span class="blog-share-label">Share:</span>
              <div class="share-buttons">
                <a class="share-btn" href="#" title="Share on Facebook"><i class="fab fa-facebook-f"></i></a>
                <a class="share-btn" href="#" title="Share on Twitter"><i class="fab fa-twitter"></i></a>
                <a class="share-btn" href="#" title="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a class="share-btn" href="#" title="Share via WhatsApp"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <aside class="sidebar">
        <div class="sidebar-panel">
          <h3 class="sidebar-title">Recent Posts</h3>
          <ul class="recent-list">
            <li v-for="recentBlog in recentBlogs" :key="recentBlog.id" class="recent-item">
              <a :href="`/blog/${recentBlog.id}`" target="_blank" rel="noopener noreferrer" class="recent-item-link">
                <div class="recent-item-title">{{ recentBlog.title }}</div>
                <div class="recent-item-date"><i class="fas fa-calendar-alt"></i> {{ formatDate(recentBlog.publish_date || recentBlog.date) }}</div>
              </a>
            </li>
          </ul>
        </div>

        <div class="sidebar-panel">
          <h3 class="sidebar-title">Categories</h3>
          <ul class="category-list">
            <li v-for="(count, category) in categories" :key="category" class="category-item">
              <a :href="`/blog?category=${encodeURIComponent(category)}`" target="_blank" rel="noopener noreferrer" class="category-link">
                <span>{{ category }}</span><span>{{ count }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="sidebar-panel">
          <h3 class="sidebar-title">Popular Tags</h3>
          <div class="tag-list">
            <a v-for="tag in tags" :key="tag" :href="`/blog?tag=${encodeURIComponent(tag)}`" target="_blank" rel="noopener noreferrer" class="tag-item">{{ tag }}</a>
          </div>
        </div>
      </aside>
    </div>

    <div v-else class="not-found">
      <div class="not-found-content">
        <h2>Blog Not Found</h2>
        <p>The blog article you're looking for doesn't exist or has been removed.</p>
        <router-link to="/blog" class="back-link">Back to Blog <i class="fas fa-arrow-right"></i></router-link>
      </div>
    </div>
  </main>
    <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';

    export default {
        name: 'BlogDetailPage',
        components: {
            NavbarSection,
            FooterSection
        },
        data() {
            return {
                blog: null,
                allBlogs: [],
                loading: true
            }
        },
        async created() {
                await this.loadBlog();
        },
        computed: {
            renderedContent() {
                if (!this.blog?.content) return '';
                return this.blog.content.replace(/\n/g, '<br>');
            },
            recentBlogs() {
                return this.allBlogs.slice(0, 5).filter(b => b.id !== this.blog?.id);
            },
            categories() {
                const cats = {};
                this.allBlogs.forEach(blog => {
                    const cat = blog.category || 'Luxury Lifestyle';
                    cats[cat] = (cats[cat] || 0) + 1;
                });
                if (Object.keys(cats).length === 0) {
                    return { 'Luxury Lifestyle': 0, 'Boating Guide': 0, 'Travel': 0, 'Yacht News': 0 };
                }
                return cats;
            },
            tags() {
                const allTags = [];
                this.allBlogs.forEach(blog => {
                    if (blog.tags && Array.isArray(blog.tags)) {
                        allTags.push(...blog.tags.map(t => t.toLowerCase()));
                    }
                });
                const uniqueTags = [...new Set(allTags)];
                if (uniqueTags.length === 0) {
                    return ['Yachts', 'Yacht Buying', 'Yacht Travel', 'Charter', 'Destinations'];
                }
                return uniqueTags;
            }
        },
        methods: {
            async loadBlog() {
                this.loading = true;
                try {
                    const response = await fetch('/data/blogs.json');
                    const data = await response.json();
                    const blogData = data.find(b => b.data_type === 'blog_posts');
                    this.allBlogs = blogData?.records || data;
                    
                    const blogId = this.$route.params.id;
                    this.blog = this.allBlogs.find(b => b.id === blogId);
                    
                    if (this.blog) {
                        document.title = `${this.blog.title} - High Seas Yachting`;
                    }
                } catch (error) {
                    console.error('Error loading blog:', error);
                } finally {
                    this.loading = false;
                }
            },
            heroBackgroundStyle() {
                const imageUrl = this.blog?.featured_image || this.blog?.image || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1920&q=80';
                return {
                    backgroundImage: `linear-gradient(180deg, rgba(15, 40, 24, 0.85) 0%, rgba(15, 40, 24, 0.25) 60%), url('${imageUrl}')`
                };
            },
            formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
        }
    }
</script>

<style scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: #fbfbfb;
      color: #102012;
      line-height: 1.8;
      min-height: 100vh;
    }

    img {
      max-width: 100%;
      display: block;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .page-hero {
      position: relative;
      background: linear-gradient(180deg, rgba(15, 40, 24, 0.85) 0%, rgba(15, 40, 24, 0.25) 60%),
        url('https://www.ferretti-yachts.com/portals/5/skins/infynito/assets/img/bkg-gamma-infynito.png') center/cover no-repeat;
      min-height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px 24px;
      color: white;
      margin-top: 100px;}

    .hero-content {
      max-width: 900px;
    }

    .hero-label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 50px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 0.75rem;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .hero-title {
      font-size: clamp(2.8rem, 5vw, 4.2rem);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.02em;
      margin-bottom: 20px;
    }

    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      align-items: center;
      color: rgba(255,255,255,0.9);
      font-size: 0.95rem;
    }

    .hero-meta span {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .content-shell {
      max-width: 1500px;
      margin: 0 auto;
      padding: 50px 24px 80px;
    }

    .blog-detail-layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 40px;
      align-items: start;
    }

    .blog-main {
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(15, 40, 24, 0.08);
    }

    .blog-image {
      width: 100%;
      height: 420px;
      object-fit: cover;
    }

    .blog-content {
      padding: 45px 48px;
    }

    .blog-header {
      margin-bottom: 36px;
    }

    .blog-meta-detail {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      color: #5f6d60;
      font-size: 0.9rem;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(15, 40, 24, 0.08);
    }

    .blog-meta-detail span {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .blog-title {
      font-size: 2.4rem;
      font-weight: 800;
      color: #1a3a2a;
      line-height: 1.1;
      margin-bottom: 18px;
    }

    .blog-body {
      color: #5f6d60;
      font-size: 1rem;
      line-height: 1.95;
    }

    .blog-body p {
      margin-bottom: 24px;
    }

    .blog-body h2 {
      font-size: 1.8rem;
      color: #1a3a2a;
      margin: 36px 0 18px;
      font-weight: 700;
    }

    .blog-body h3 {
      font-size: 1.3rem;
      color: #1a3a2a;
      margin: 28px 0 14px;
      font-weight: 700;
    }

    .blog-body ul,
    .blog-body ol {
      margin: 20px 0 20px 24px;
    }

    .blog-body li {
      margin-bottom: 10px;
      line-height: 1.85;
    }

    .blog-footer {
      margin-top: 40px;
      padding-top: 36px;
      border-top: 1px solid rgba(15, 40, 24, 0.08);
      display: grid;
      gap: 24px;
    }

    .blog-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .tag-badge {
      padding: 8px 16px;
      background: #f8faf6;
      border-radius: 999px;
      font-size: 0.9rem;
      color: #1a3a2a;
      cursor: pointer;
      transition: background 0.25s ease;
    }

    .tag-badge:hover {
      background: rgba(53,90,50,0.15);
    }

    .blog-share {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .blog-share-label {
      font-weight: 700;
      color: #1a3a2a;
    }

    .share-buttons {
      display: flex;
      gap: 12px;
    }

    .share-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #f8faf6;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1a3a2a;
      transition: background 0.25s ease, color 0.25s ease;
    }

    .share-btn:hover {
      background: #1a3a2a;
      color: white;
    }

    .sidebar {
      display: grid;
      gap: 26px;
    }

    .sidebar-panel {
      background: #ffffff;
      border-radius: 32px;
      padding: 26px;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(15, 40, 24, 0.08);
    }

    .sidebar-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1a3a2a;
      margin-bottom: 18px;
      letter-spacing: 0.02em;
    }

    .recent-list {
      list-style: none;
      display: grid;
      gap: 16px;
    }

    .recent-item {
      padding: 14px 16px;
      border-radius: 16px;
      background: #f8faf6;
      transition: background 0.25s ease;
    }

    .recent-item:hover {
      background: rgba(53,90,50,0.08);
    }

    .recent-item-link {
      display: block;
      text-decoration: none;
      color: inherit;
    }

    .recent-item-link:hover .recent-item-title {
      color: #d4a853;
    }

    .recent-item-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #1a3a2a;
      margin-bottom: 6px;
      line-height: 1.3;
    }

    .recent-item-date {
      font-size: 0.8rem;
      color: #5f6d60;
    }

    .category-list {
      list-style: none;
      display: grid;
      gap: 14px;
    }

    .category-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 16px;
      background: #f8faf6;
      color: #5f6d60;
      font-size: 0.95rem;
      transition: background 0.25s ease;
    }

    .category-item:hover {
      background: rgba(53,90,50,0.08);
    }

    .category-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      text-decoration: none;
      color: inherit;
    }

    .category-link:hover {
      color: #1a3a2a;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .tag-item {
      padding: 10px 16px;
      background: #f8faf6;
      border-radius: 999px;
      font-size: 0.9rem;
      color: #1a3a2a;
      cursor: pointer;
      transition: background 0.25s ease;
    }

    .tag-item:hover {
      background: rgba(53,90,50,0.12);
    }

    @media (max-width: 1050px) {
      .blog-detail-layout {
        grid-template-columns: 1fr;
      }

      .sidebar {
        order: -1;
      }
    }

    @media (max-width: 680px) {
      .page-hero {
        min-height: 340px;
        padding: 60px 18px;
      }

      .hero-title {
        font-size: 2.4rem;
      }

      .hero-meta {
        flex-direction: column;
        gap: 12px;
      }

      .content-shell {
        padding: 40px 18px 60px;
      }

      .blog-image {
        height: 280px;
      }

      .blog-content {
        padding: 32px 22px;
      }

      .blog-title {
        font-size: 1.8rem;
      }

      .blog-body {
        font-size: 0.95rem;
      }

      .blog-share {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .not-found {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      text-align: center;
    }

    .not-found-content {
      padding: 40px;
    }

    .not-found-content h2 {
      font-size: 2rem;
      color: #1a3a2a;
      margin-bottom: 16px;
    }

    .not-found-content p {
      color: #6b7280;
      margin-bottom: 24px;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .back-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(26, 58, 42, 0.3);
    }

    .recent-item {
      cursor: pointer;
    }

    .blog-body :deep(h2) {
      font-size: 1.8rem;
      color: #1a3a2a;
      margin: 36px 0 18px;
      font-weight: 700;
    }

    .blog-body :deep(p) {
      margin-bottom: 24px;
    }

    .blog-body :deep(ul) {
      margin: 20px 0 20px 24px;
    }

    .blog-body :deep(li) {
      margin-bottom: 10px;
      line-height: 1.85;
    }
</style>