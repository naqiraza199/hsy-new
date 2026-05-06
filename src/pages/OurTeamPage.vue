<template>
    <NavbarSection />
<!-- Hero Section -->
  <section class="page-hero">
    <div class="hero-content">
      <h1 class="hero-title">Our Team</h1>
      <p class="hero-copy">Meet the visionary leaders and dedicated professionals who drive High Seas Yachting's commitment to excellence.</p>
    </div>
  </section>

  <main>
    <!-- Featured Founder Section -->
    <section class="featured-founder">
      <div class="featured-founder-wrapper">
        <div class="founder-card" v-if="founder">
          <div class="founder-image">
            <img :src="getFounderImage()" alt="Featured Founder">
          </div>
          <div class="founder-content">
            <div class="founder-badge">
              <i class="fas fa-crown"></i>
              CEO & Founder
            </div>
            <h2 class="founder-name">{{ founder.name }}</h2>
            <p class="founder-role">Co-Founder | Sales & Charter</p>
            <p class="founder-bio">{{ founder.short_description || founder.long_description }}</p>
            <div class="founder-actions">
              <a href="#" class="founder-btn primary">
                <i class="fas fa-plus"></i>
                List a Boat
              </a>
               <router-link :to="'/broker/' + getBrokerSlug(founder)" class="founder-btn">
                <i class="fas fa-user"></i>
                View Profile
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Team Members Section -->
    <section class="special-team-section">
      <div class="special-team-wrapper">
      

        <div class="special-team-grid">
          <div v-for="member in specialMembers" :key="member.id" class="special-team-card">
            <div class="special-team-image">
              <img :src="getProfileImage(member)" :alt="member.name">
            </div>
            <div class="special-team-content">
              <h3 class="special-team-name">{{ member.name }}</h3>
              <p class="special-team-role">{{ getRole(member) }}</p>
              <div class="special-team-buttons">
                <a href="#" class="special-team-btn primary">List a Boat</a>
                 <router-link :to="'/broker/' + getBrokerSlug(member)" class="special-team-btn secondary">View Profile</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Grid Section -->
    <section class="team-section">
      <div class="team-wrapper">
        <div class="team-header">
          <h2>Meet Our Team</h2>
          <p>Our dedicated professionals are committed to delivering exceptional yacht experiences</p>
        </div>

        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.id" class="team-card">
            <div class="team-image">
              <img :src="getProfileImage(member)" :alt="member.name">
            </div>
            <div class="team-content">
              <h3 class="team-name">{{ member.name }}</h3>
              <p class="team-role">{{ getRole(member) }}</p>
              <div class="team-buttons">
                <a href="#" class="team-btn primary">List a Boat</a>
                <router-link :to="'/broker/' + getBrokerSlug(member)" class="team-btn secondary">View Profile</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
    <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';

export default {
    name: 'OurTeamPage',
    components: {
        NavbarSection,
        FooterSection
    },
    data() {
        return {
            teamMembers: [],
            founder: null,
            loading: true,
            specialMembers: []
        };
    },
    async mounted() {
        await this.loadBrokers();
    },
    methods: {
        async loadBrokers() {
            this.loading = true;
            try {
                const response = await fetch('/data/brokers.json');
                const brokers = await response.json();
                const allBrokers = brokers[0]?.records || brokers;

                const founderBroker = allBrokers.find(b => b.name === 'Brett Horowitz' && b.is_active === true);
                this.founder = founderBroker || null;

                const specialNames = ['Bobby Giancola', 'Naqi Raza', 'Drew Birch'];
                this.specialMembers = allBrokers.filter(b => specialNames.includes(b.name) && b.is_active === true);

                const activeBrokers = allBrokers
                    .filter(broker => broker.is_active === true && broker.name !== 'Brett Horowitz' && !specialNames.includes(broker.name))
                    .sort((a, b) => (a.order_index || 999) - (b.order_index || 999));

                this.teamMembers = activeBrokers;
            } catch (error) {
                console.error('Error loading brokers:', error);
            } finally {
                this.loading = false;
            }
        },
        getProfileImage(broker) {
            if (broker.profile_image) {
                return broker.profile_image;
            }
            return '/green.jpg';
        },
        getFounderImage() {
            if (this.founder && this.founder.profile_image) {
                return this.founder.profile_image;
            }
            return '/brett.png';
        },
        getRole(broker) {
            if (broker.specialization) {
                return `${broker.specialization} • High Seas Yachting`;
            }
            return 'High Seas Yachting';
        },
        getBrokerSlug(broker) {
            if (broker && broker.name) {
                return `${broker.name}-high-seas-yachting`;
            }
            return '';
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
      background: #fdfdfd;
      color: #102012;
      line-height: 1.7;
      min-height: 100vh;
    }

    img {
      max-width: 100%;
      display: block;
    }

    .page-hero {
      position: relative;
      background: linear-gradient(180deg, rgba(15, 40, 24, 0.8) 0%, rgba(15, 40, 24, 0.2) 55%),
        url('/images/team.jpg') center/cover no-repeat;
      min-height: 420px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px 24px;
      color: white;
      margin-top: 100px;
    }

    .hero-content {
      max-width: 900px;
    }

    .hero-label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 0.75rem;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .hero-title {
      font-size: clamp(3rem, 5vw, 4.6rem);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 18px;
      text-transform: uppercase;
      word-spacing: 0.1em;
    }

    .hero-copy {
      max-width: 600px;
      margin: 0 auto;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
    }

    .content-shell {
      max-width: 1400px;
      margin: 0 auto;
      padding: 80px 24px 120px;
    }

    main {
      position: relative;
    }

    /* FEATURED FOUNDER SECTION */
    .featured-founder {
      margin-top: -60px;
      position: relative;
      z-index: 10;
      margin-bottom: 100px;
    }

    .featured-founder-wrapper {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .founder-card {
      background: linear-gradient(135deg, #2d5a45 0%, #1a3a2a 100%);
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      align-items: center;
    }

    .founder-image {
      width: 100%;
      height: 100%;
      min-height: 420px;
      overflow: hidden;
      position: relative;
    }

    .founder-image::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(15, 40, 24, 0.4) 0%, transparent 100%);
      pointer-events: none;
    }

    .founder-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .founder-card:hover .founder-image img {
      transform: scale(1.05);
    }

    .founder-content {
      padding: 48px 52px;
      color: white;
      position: relative;
      z-index: 2;
    }

    .founder-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 24px;
      color: rgba(255, 255, 255, 0.9);
    }

    .founder-name {
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 10px;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }

    .founder-role {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 24px;
      font-weight: 500;
    }

    .founder-bio {
      color: rgba(255, 255, 255, 0.75);
      font-size: 1.02rem;
      line-height: 1.8;
      margin-bottom: 32px;
    }

    .founder-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .founder-btn {
      padding: 14px 28px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.95rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background: transparent;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .founder-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    .founder-btn.primary {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .founder-btn.primary:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .founder-card {
        grid-template-columns: 1fr;
      }

      .founder-image {
        min-height: 300px;
        order: -1;
      }

      .founder-content {
        padding: 36px 28px;
      }

      .founder-name {
        font-size: 1.8rem;
      }

      .founder-actions {
        flex-direction: column;
      }

      .founder-btn {
        justify-content: center;
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .page-hero {
        min-height: 300px;
        padding: 40px 20px;
      }

      .hero-title {
        font-size: 2.2rem;
      }

      .hero-copy {
        font-size: 1rem;
      }

      .founder-content {
        padding: 28px 20px;
      }

      .founder-name {
        font-size: 1.5rem;
      }

      .founder-role {
        font-size: 1rem;
      }
    }

    /* SPECIAL TEAM MEMBERS SECTION */
    .special-team-section {
      padding: 60px 24px;
    }

    .special-team-wrapper {
      max-width: 1300px;
      margin: 0 auto;
    }

    .special-team-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .special-team-header h2 {
      font-size: 2.6rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 18px;
      line-height: 1.1;
    }

    .special-team-header h2::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #355a32);
      border-radius: 2px;
      margin: 16px auto 0;
    }

    .special-team-header p {
      max-width: 700px;
      margin: 0 auto;
      color: #5f6d60;
      font-size: 1.08rem;
      line-height: 1.85;
    }

    .special-team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    .special-team-card {
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(15, 40, 24, 0.12);
      border: 1px solid rgba(15, 40, 24, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .special-team-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 25px 60px rgba(15, 40, 24, 0.18);
    }

    .special-team-image {
      width: 100%;
      height: 300px;
      overflow: hidden;
      position: relative;
      background: #f0f4ef;
    }

    .special-team-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .special-team-card:hover .special-team-image img {
      transform: scale(1.08);
    }

    .special-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #2d5a45 0%, #1a3a2a 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(15, 40, 24, 0.2);
    }

    .special-team-content {
      padding: 32px 28px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .special-team-name {
      font-size: 1.4rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 8px;
    }

    .special-team-role {
      color: #5f6d60;
      font-size: 1rem;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .special-team-bio {
      color: #5f6d60;
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 24px;
      flex-grow: 1;
    }

    .special-team-buttons {
      display: flex;
      gap: 12px;
      margin-top: auto;
    }

    .special-team-btn {
      flex: 1;
      padding: 14px 18px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
      text-align: center;
    }

    .special-team-btn.primary {
      background: #1a3a2a;
      color: white;
    }

    .special-team-btn.primary:hover {
      background: #2d5a45;
      transform: translateY(-2px);
    }

    .special-team-btn.secondary {
      background: transparent;
      color: #1a3a2a;
      border: 1.5px solid #1a3a2a;
    }

    .special-team-btn.secondary:hover {
      background: #1a3a2a;
      color: white;
      transform: translateY(-2px);
    }

    /* RESPONSIVE FOR SPECIAL TEAM */
    @media (max-width: 1024px) {
      .special-team-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }

      .special-team-header h2 {
        font-size: 2.2rem;
      }
    }

    @media (max-width: 640px) {
      .special-team-section {
        padding: 60px 20px;
      }

      .special-team-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .special-team-header h2 {
        font-size: 1.8rem;
      }

      .special-team-header p {
        font-size: 1rem;
      }

      .special-team-image {
        height: 250px;
      }

      .special-team-content {
        padding: 24px 20px;
      }

      .special-team-name {
        font-size: 1.2rem;
      }

      .special-team-role {
        font-size: 0.95rem;
      }

      .special-team-bio {
        font-size: 0.95rem;
      }

      .special-team-buttons {
        gap: 10px;
      }

      .special-team-btn {
        padding: 12px 16px;
        font-size: 0.85rem;
      }
    }

    /* TEAM SECTION */
    .team-section {
      padding: 100px 24px;
    }

    .team-wrapper {
      max-width: 1300px;
      margin: 0 auto;
    }

    .team-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .team-header h2 {
      font-size: 2.6rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 18px;
      line-height: 1.1;
    }

    .team-header h2::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #355a32);
      border-radius: 2px;
      margin: 16px auto 0;
    }

    .team-header p {
      max-width: 700px;
      margin: 0 auto;
      color: #5f6d60;
      font-size: 1.08rem;
      line-height: 1.85;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    .team-card {
      background: #ffffff;
      border-radius: 26px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(15, 40, 24, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .team-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
    }

    .team-image {
      width: 100%;
      height: 280px;
      overflow: hidden;
      position: relative;
      background: #f0f4ef;
    }

    .team-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .team-card:hover .team-image img {
      transform: scale(1.08);
    }

    .team-content {
      padding: 28px 24px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .team-name {
      font-size: 1.3rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 6px;
    }

    .team-role {
      color: #5f6d60;
      font-size: 0.95rem;
      margin-bottom: 18px;
      font-weight: 500;
    }

    .team-buttons {
      display: flex;
      gap: 12px;
      margin-top: auto;
    }

    .team-btn {
      flex: 1;
      padding: 12px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
      text-align: center;
    }

    .team-btn.primary {
      background: #1a3a2a;
      color: white;
    }

    .team-btn.primary:hover {
      background: #2d5a45;
      transform: translateY(-2px);
    }

    .team-btn.secondary {
      background: transparent;
      color: #1a3a2a;
      border: 1.5px solid #1a3a2a;
    }

    .team-btn.secondary:hover {
      background: #1a3a2a;
      color: white;
      transform: translateY(-2px);
    }

    /* RESPONSIVE GRID */
    @media (max-width: 1024px) {
      .team-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }

      .team-header h2 {
        font-size: 2.2rem;
      }
    }

    @media (max-width: 640px) {
      .team-section {
        padding: 60px 20px;
      }

      .team-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .team-header h2 {
        font-size: 1.8rem;
      }

      .team-header p {
        font-size: 1rem;
      }

      .team-image {
        height: 240px;
      }

      .team-buttons {
        gap: 10px;
      }

      .team-btn {
        padding: 10px 14px;
        font-size: 0.85rem;
      }
    }
</style>