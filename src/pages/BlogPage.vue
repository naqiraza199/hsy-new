<template>
   <NavbarSection />

<header class="page-hero">
  <div class="hero-content">
    <span class="hero-label"><i class="fas fa-pen-nib"></i> Blog</span>
    <h1 class="hero-title">Insights from the High Seas Yachting</h1>
    <p class="hero-copy">Discover expert yacht lifestyle articles, destination guides, and premium travel advice for discerning owners and charter guests.</p>
  </div>
</header>

<main class="content-shell">
  <div class="blog-layout">
<div class="blog-list">
        <div class="section-header">
          <h2 class="section-title">Latest Articles</h2>
          <a href="#" class="section-link">View All <i class="fas fa-arrow-right"></i></a>
        </div>

        <article v-for="blog in paginatedBlogs" :key="blog.id" class="blog-card">
          <div class="blog-card-image">
            <img :src="blog.featured_image || blog.image || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'" :alt="blog.title">
            <span class="blog-card-badge">{{ blog.category || 'Luxury Lifestyle' }}</span>
          </div>
          <div class="blog-card-content">
            <div class="blog-meta">
              <span><i class="fas fa-user"></i> {{ blog.author || 'By Admin' }}</span>
              <span><i class="fas fa-calendar-alt"></i> {{ formatDate(blog.publish_date || blog.date) }}</span>
            </div>
            <h2 class="blog-title">{{ blog.title }}</h2>
            <p class="blog-snippet">{{ blog.excerpt || blog.description }}</p>
            <router-link class="blog-action" :to="`/blog/${blog.id}`">Read Article <i class="fas fa-arrow-right"></i></router-link>
          </div>
        </article>

        <div v-if="filteredBlogs.length === 0" class="no-blogs">
          <p>No blogs found matching your search.</p>
        </div>

        <div v-if="totalPages > 1" class="pagination-container">
          <div class="pagination">
            <button 
              class="page-btn" 
              :disabled="currentPage === 1"
              @click="currentPage = 1"
              title="First page"
            >
              <i class="fas fa-angles-left"></i>
            </button>
            <button 
              class="page-btn" 
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              <i class="fas fa-angle-left"></i>
            </button>
            
            <template v-for="page in visiblePages" :key="page">
              <button 
                v-if="page !== '...'"
                class="page-btn"
                :class="{ active: currentPage === page }"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
              <span v-else class="page-ellipsis">...</span>
            </template>
            
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              <i class="fas fa-angle-right"></i>
            </button>
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages"
              @click="currentPage = totalPages"
              title="Last page"
            >
              <i class="fas fa-angles-right"></i>
            </button>
          </div>
          <p class="pagination-info">Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredBlogs.length) }} of {{ filteredBlogs.length }} articles</p>
        </div>
      </div>

    <aside class="sidebar">
      <div class="sidebar-panel">
        <div class="search-box">
          <input 
            type="search" 
            placeholder="Search articles..." 
            v-model="searchQuery"
            @input="currentPage = 1"
          >
          <button type="button"><i class="fas fa-search"></i></button>
        </div>
      </div>

      <div class="sidebar-panel">
        <h3 class="sidebar-title">Categories</h3>
        <ul class="category-list">
          <li v-for="(count, category) in categories" :key="category" class="category-item">
            <span>{{ category }}</span><span>{{ count }}</span>
          </li>
        </ul>
      </div>

      <div class="sidebar-panel">
        <h3 class="sidebar-title">Popular Tags</h3>
        <div class="tag-list">
          <span v-for="tag in tags" :key="tag" class="tag-item">{{ tag }}</span>
        </div>
      </div>

      <div class="sidebar-panel recent-sidebar-panel">
      <h3 class="sidebar-title">Recent Articles</h3>
      <div class="recent-sidebar-list">
        <article v-for="blog in recentBlogs" :key="blog.id" class="recent-sidebar-item">
          <a :href="`/blog/${blog.id}`" target="_blank" rel="noopener noreferrer" class="recent-sidebar-link">
            <div class="recent-sidebar-image">
              <img :src="blog.featured_image || blog.image || 'https://images.unsplash.com/photo-1540946485063-4d3a2a2f8b0d?auto=format&fit=crop&w=150&q=80'" :alt="blog.title">
            </div>
            <div class="recent-sidebar-content">
              <p class="recent-sidebar-date">{{ formatDate(blog.publish_date || blog.date) }}</p>
              <h4 class="recent-sidebar-title">{{ blog.title }}</h4>
            </div>
          </a>
        </article>

        <div v-if="recentBlogs.length === 0">
          <article class="recent-sidebar-item">
            <a href="#" class="recent-sidebar-link">
              <div class="recent-sidebar-image">
                <img src="https://images.unsplash.com/photo-1540946485063-4d3a2a2f8b0d?auto=format&fit=crop&w=150&q=80" alt="Yacht">
              </div>
              <div class="recent-sidebar-content">
                <p class="recent-sidebar-date">Mar 5, 2026</p>
                <h4 class="recent-sidebar-title">The Ultimate Guide to Yacht Maintenance</h4>
              </div>
            </a>
          </article>
        </div>
      </div>
    </div>
    </aside>
  </div>

</main>
    <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';

    export default {
        name: 'BlogPage',
        components: {
            NavbarSection,
            FooterSection
        },
        data() {
            return {
                blogs: [],
                searchQuery: '',
                currentPage: 1,
                perPage: 5,
                loading: true
            }
        },
        async created() {
            try {
                const response = await fetch('/data/blogs.json');
                const data = await response.json();
                const blogData = data.find(b => b.data_type === 'blog_posts');
                this.blogs = blogData?.records || data;
            } catch (error) {
                console.error('Error loading blogs:', error);
            } finally {
                this.loading = false;
            }
        },
        computed: {
            filteredBlogs() {
                if (!this.searchQuery.trim()) {
                    return this.blogs;
                }
                const query = this.searchQuery.toLowerCase();
                return this.blogs.filter(blog => {
                    const title = (blog.title || '').toLowerCase();
                    const excerpt = (blog.excerpt || blog.description || '').toLowerCase();
                    const category = (blog.category || '').toLowerCase();
                    const author = (blog.author || '').toLowerCase();
                    return title.includes(query) || excerpt.includes(query) || category.includes(query) || author.includes(query);
                });
            },
            paginatedBlogs() {
                const start = (this.currentPage - 1) * this.perPage;
                const end = start + this.perPage;
                return this.filteredBlogs.slice(start, end);
            },
            totalPages() {
                return Math.ceil(this.filteredBlogs.length / this.perPage);
            },
            startIndex() {
                return (this.currentPage - 1) * this.perPage;
            },
            endIndex() {
                return this.startIndex + this.perPage;
            },
            visiblePages() {
                const pages = [];
                const total = this.totalPages;
                const current = this.currentPage;
                
                if (total <= 7) {
                    for (let i = 1; i <= total; i++) pages.push(i);
                } else {
                    if (current <= 3) {
                        pages.push(1, 2, 3, 4, '...', total);
                    } else if (current >= total - 2) {
                        pages.push(1, '...', total - 3, total - 2, total - 1, total);
                    } else {
                        pages.push(1, '...', current - 1, current, current + 1, '...', total);
                    }
                }
                return pages;
            },
            recentBlogs() {
                return this.blogs.slice(0, 4);
            },
            categories() {
                const cats = {};
                this.blogs.forEach(blog => {
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
                this.blogs.forEach(blog => {
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
            formatDate(dateString) {
                if (!dateString) return 'Mar 9, 2026';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
        },
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
      background: #f8faf6;
      color: #f6f6f6;
      line-height: 1.7;
      min-height: 100vh;
    }

    img { max-width: 100%; display: block; }

    /* Hero Section */
    .page-hero {
      position: relative;
      background: linear-gradient(180deg, rgba(15,40,24,0.75) 0%, rgba(15,40,24,0.35) 50%, rgba(15,40,24,0.15) 100%),
        url('/images/blog.jpg') center/cover no-repeat;
      min-height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 100px 24px 60px;
      color: white;
      margin-top: 100px;

    }

    .page-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 30% 20%, rgba(212, 168, 83, 0.15) 0%, transparent 50%);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
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
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin-bottom: 20px;
    }

    .hero-copy {
      max-width: 600px;
      margin: 0 auto;
      font-size: 1.1rem;
      color: rgba(255,255,255,0.85);
      line-height: 1.8;
    }

    /* Main Content */
    .content-shell {
      max-width: 1400px;
      margin: 0 auto;
      padding: 80px 24px 100px;
    }

    .blog-layout {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 40px;
      align-items: start;
    }

    /* Featured Blog */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .section-title {
      font-size: 1.75rem;
      font-weight: 800;
      color: #1a1f1a;
    }

    .section-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #1a3a2a;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .section-link:hover {
      color: #d4a853;
      gap: 12px;
    }

    .blog-list {
      display: grid;
      gap: 32px;
    }

    .blog-card {
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(26, 58, 42, 0.08);
      border: 1px solid rgba(26, 58, 42, 0.06);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .blog-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #d4a853);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .blog-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 60px rgba(26, 58, 42, 0.16);
    }

    .blog-card:hover::before {
      opacity: 1;
    }

    .blog-card-image {
      position: relative;
      height: 280px;
      overflow: hidden;
    }

    .blog-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .blog-card:hover .blog-card-image img {
      transform: scale(1.08);
    }

    .blog-card-badge {
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 8px 18px;
      background: #1a3a2a;
      color: white;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .blog-card-content {
      padding: 32px;
    }

    .blog-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 16px;
    }

    .blog-meta span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .blog-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1a1f1a;
      line-height: 1.3;
      margin-bottom: 14px;
      transition: color 0.3s ease;
    }

    .blog-card:hover .blog-title {
      color: #1a3a2a;
    }

    .blog-snippet {
      color: #6b7280;
      font-size: 1rem;
      line-height: 1.8;
      margin-bottom: 20px;
    }

    .blog-action {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: #1a3a2a;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .blog-action:hover {
      color: #d4a853;
      gap: 14px;
    }

    .no-blogs {
      text-align: center;
      padding: 40px;
      color: #6b7280;
      font-size: 1.1rem;
    }

    /* Sidebar */
    .sidebar {
      display: grid;
      gap: 28px;
    }

    .sidebar-panel {
      background: #ffffff;
      border-radius: 32px;
      padding: 28px;
      box-shadow: 0 4px 20px rgba(26, 58, 42, 0.08);
      border: 1px solid rgba(26, 58, 42, 0.06);
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 2px solid #e8ebe7;
      border-radius: 50px;
      padding: 8px 8px 8px 20px;
      background: #f8faf6;
      transition: all 0.3s ease;
    }

    .search-box:focus-within {
      border-color: #1a3a2a;
      background: white;
      box-shadow: 0 0 0 4px rgba(26, 58, 42, 0.1);
    }

    .search-box input {
      border: none;
      width: 100%;
      background: transparent;
      outline: none;
      font-size: 0.95rem;
      font-family: 'Poppins', sans-serif;
      color: #1a1f1a;
    }

    .search-box button {
      border: none;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .search-box button:hover {
      transform: scale(1.05);
    }

    .sidebar-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #1a1f1a;
      margin-bottom: 20px;
      padding-bottom: 14px;
      border-bottom: 2px solid #f0f0f0;
    }

    .category-list, .recent-list {
      list-style: none;
      display: grid;
      gap: 12px;
    }

    .category-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 18px;
      border-radius: 18px;
      background: #f8faf6;
      color: #6b7280;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }

    .category-item:hover {
      background: #1a3a2a;
      color: white;
    }

    .category-item span:last-child {
      background: rgba(0,0,0,0.08);
      padding: 4px 12px;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .tag-item {
      padding: 10px 18px;
      background: #f8faf6;
      border-radius: 50px;
      font-size: 0.85rem;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tag-item:hover {
      background: #1a3a2a;
      color: white;
    }

    /* Sidebar Recent Articles */
    .recent-sidebar-panel {
      padding: 24px;
    }

    .recent-sidebar-list {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .recent-sidebar-item {
      display: flex;
      gap: 14px;
      padding: 14px;
      background: #f8faf6;
      border-radius: 18px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .recent-sidebar-item:hover {
      background: #1a3a2a;
      color: white;
    }

    .recent-sidebar-item:hover .recent-sidebar-date {
      color: rgba(255,255,255,0.8);
    }

    .recent-sidebar-item:hover .recent-sidebar-title {
      color: white;
    }

    .recent-sidebar-link {
      display: flex;
      gap: 14px;
      text-decoration: none;
      color: inherit;
      width: 100%;
    }

    .recent-sidebar-link:hover {
      color: white;
    }

    .recent-sidebar-image {
      width: 70px;
      height: 70px;
      border-radius: 12px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .recent-sidebar-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .recent-sidebar-item:hover .recent-sidebar-image img {
      transform: scale(1.1);
    }

    .recent-sidebar-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .recent-sidebar-date {
      font-size: 0.75rem;
      color: #6b7280;
      margin-bottom: 6px;
    }

    .recent-sidebar-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #1a1f1a;
      line-height: 1.4;
      transition: color 0.3s ease;
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .blog-layout {
        grid-template-columns: 1fr 320px;
      }
    }

    @media (max-width: 992px) {
      .blog-layout {
        grid-template-columns: 1fr;
      }

      .blog-list {
        display: grid;
        gap: 24px;
      }

      .sidebar {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        order: -1;
      }
    }

    @media (max-width: 768px) {
      .page-hero {
        min-height: 360px;
        padding: 80px 16px 50px;
      }

      .hero-label {
        padding: 8px 16px;
        font-size: 0.7rem;
      }

      .hero-title {
        font-size: 1.75rem;
      }

      .hero-copy {
        font-size: 0.95rem;
      }

      .content-shell {
        padding: 40px 16px 50px;
      }

      .blog-layout {
        gap: 24px;
      }

      .blog-card {
        border-radius: 26px;
      }

      .blog-card-image {
        height: 200px;
      }

      .blog-card-content {
        padding: 20px;
      }

      .blog-meta {
        gap: 12px;
        font-size: 0.8rem;
        margin-bottom: 12px;
      }

      .blog-title {
        font-size: 1.15rem;
        margin-bottom: 10px;
      }

      .blog-snippet {
        font-size: 0.9rem;
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .section-header {
        margin-bottom: 24px;
      }

      .section-title {
        font-size: 1.4rem;
      }

      .sidebar {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .sidebar-panel {
        padding: 20px;
      }

      .sidebar-title {
        font-size: 1rem;
        margin-bottom: 14px;
      }

      .search-box {
        padding: 6px 6px 6px 16px;
      }

      .search-box button {
        width: 40px;
        height: 40px;
      }

      .category-item {
        padding: 12px 14px;
        font-size: 0.85rem;
      }

      .tag-item {
        padding: 8px 14px;
        font-size: 0.8rem;
      }

      .recent-sidebar-panel {
        order: -1;
      }

      .recent-sidebar-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }

      .recent-sidebar-item {
        flex-direction: column;
        padding: 12px;
        text-align: center;
      }

      .recent-sidebar-image {
        width: 100%;
        height: 100px;
        border-radius: 12px;
      }

      .recent-sidebar-content {
        align-items: center;
      }
    }

    @media (max-width: 520px) {
      .page-hero {
        min-height: 300px;
        padding: 70px 16px 40px;
      }

      .hero-title {
        font-size: 1.5rem;
      }

      .hero-copy {
        font-size: 0.85rem;
      }

      .content-shell {
        padding: 30px 12px 40px;
      }

      .blog-list {
        gap: 20px;
      }

      .blog-card-image {
        height: 180px;
      }

      .blog-card-content {
        padding: 16px;
      }

      .blog-meta {
        flex-wrap: wrap;
        gap: 8px;
        font-size: 0.75rem;
      }

      .blog-title {
        font-size: 1rem;
      }

      .blog-snippet {
        font-size: 0.85rem;
        -webkit-line-clamp: 2;
      }

      .sidebar {
        gap: 12px;
      }

      .sidebar-panel {
        padding: 16px;
        border-radius: 26px;
      }

      .sidebar-title {
        font-size: 0.95rem;
      }

      .search-box input {
        font-size: 0.85rem;
      }

      .category-list {
        gap: 8px;
      }

      .category-item {
        padding: 10px 12px;
        font-size: 0.8rem;
      }

      .tag-list {
        gap: 8px;
      }

      .tag-item {
        padding: 6px 12px;
        font-size: 0.75rem;
      }

      .recent-sidebar-list {
        grid-template-columns: 1fr;
      }

      .recent-sidebar-item {
        flex-direction: row;
        text-align: left;
        align-items: flex-start;
      }

      .recent-sidebar-image {
        width: 60px;
        height: 60px;
      }

      .recent-sidebar-content {
        align-items: flex-start;
      }

      .recent-sidebar-date {
        font-size: 0.7rem;
      }

      .recent-sidebar-title {
        font-size: 0.8rem;
      }
    }

    /* Pagination */
    .pagination-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-top: 48px;
      padding: 32px 0;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .page-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      height: 48px;
      padding: 0 14px;
      border: 2px solid #e8ebe7;
      border-radius: 14px;
      background: #ffffff;
      color: #1a1f1a;
      font-family: 'Poppins', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .page-btn:hover:not(:disabled) {
      border-color: #1a3a2a;
      background: #1a3a2a;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(26, 58, 42, 0.2);
    }

    .page-btn.active {
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      border-color: #1a3a2a;
      color: white;
      box-shadow: 0 4px 16px rgba(26, 58, 42, 0.3);
    }

    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none;
    }

    .page-btn:disabled:hover {
      border-color: #e8ebe7;
      background: #ffffff;
      color: #1a1f1a;
      box-shadow: none;
    }

    .page-ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      height: 48px;
      color: #6b7280;
      font-weight: 600;
    }

    .pagination-info {
      color: #6b7280;
      font-size: 0.9rem;
      text-align: center;
    }

    @media (max-width: 768px) {
      .pagination-container {
        margin-top: 32px;
        padding: 24px 0;
      }

      .pagination {
        gap: 6px;
      }

      .page-btn {
        min-width: 42px;
        height: 42px;
        padding: 0 10px;
        font-size: 0.85rem;
        border-radius: 12px;
      }

      .page-ellipsis {
        min-width: 36px;
        height: 42px;
      }

      .pagination-info {
        font-size: 0.8rem;
      }
    }

    @media (max-width: 520px) {
      .pagination {
        gap: 4px;
      }

      .page-btn {
        min-width: 38px;
        height: 38px;
        padding: 0 8px;
        font-size: 0.8rem;
        border-radius: 10px;
      }

      .page-ellipsis {
        min-width: 28px;
        height: 38px;
        font-size: 0.75rem;
      }
    }
</style>