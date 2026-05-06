<template>
    <NavbarSection />
<header class="page-hero">
    <div class="hero-content">
      <span class="hero-label"><i class="fas fa-user"></i> Broker Profile</span>
      <h1 class="hero-title">{{ brokerName }}</h1>
    </div>
  </header>

  <main class="content-shell" v-if="broker">
    <div class="broker-content">
      
      <div class="profile-content">
        <h2 class="section-title">Profile Overview</h2>
        <p class="profile-text">
          {{ broker.short_description || broker.long_description || (brokerName + ' is a distinguished yacht broker specializing in high-end yacht sales and bespoke charter experiences, trusted by elite clients worldwide for his precision and discretion.') }}
        </p>

        <h2 class="section-title">About {{ brokerName }}</h2>
        <p class="profile-text">
          {{ broker.long_description || 'With a refined understanding of the global luxury market, ' + brokerName + ' delivers exceptional results through integrity, expertise, and meticulous attention to detail. His career is defined by guiding clients through complex transactions with clarity and confidence.' }}
        </p>
      </div>

      <div class="profile-card">
        <div class="profile-image-wrapper">
          <img :src="getBrokerImage()" 
               :alt="brokerName" class="profile-image">
          
          <div class="floating-yacht">
            <img src="https://e5m5sskeexb.exactdn.com/wp-content/uploads/2025/02/EDIT_Majesty-175-Profile-3-1300x867.jpg?strip=all" 
                 alt="Yacht">
          </div>
        </div>

        <div class="profile-info">
          <h3 class="profile-name">{{ brokerName }}</h3>
          
          <div class="contact-row">
            <i class="fas fa-envelope"></i>
            <div>
              <span class="contact-label">Email</span>
              <a :href="'mailto:' + brokerEmail" class="contact-value">{{ brokerEmail }}</a>
            </div>
          </div>

          <div class="contact-row">
            <i class="fas fa-phone"></i>
            <div>
              <span class="contact-label">Phone</span>
              <a :href="'tel:+1' + getPhone()" class="contact-value">{{ brokerPhone }}</a>
            </div>
          </div>

          <button onclick="alert('Message sent to {{ brokerName }}!')" class="message-btn">
            <i class="fas fa-paper-plane"></i>
            SEND MESSAGE
          </button>
        </div>
      </div>

    </div>
  </main>


  <!-- ====================== BROKER LISTINGS SECTION ====================== -->
<section class="brett-listings">
  <div class="listings-inner">
    
     <div class="listings-header">
       <h1 class="listings-title">{{ brokerName }}'s Listings</h1>
       <p class="listings-subtitle">Explore {{ brokerName }}'s exclusive yacht listings</p>
     </div>

     <div class="listings-tabs">
       <a v-for="type in activeListingTypes" 
          :key="type.id"
          :href="'#' + type.id" 
          :class="['tab-btn', { active: activeTab === type.id }]"
          @click.prevent="switchTab($event, type.id)">
         <i :class="type.icon"></i> {{ type.label }} <span class="tab-count">{{ type.count }}</span>
       </a>
     </div>

     <div v-for="type in activeListingTypes" 
          :key="type.id"
          :id="type.id" 
          :class="['tab-content', { active: activeTab === type.id }]">
       <div class="listings-grid" v-if="type.listings.length > 0">
         <article v-for="listing in type.listings" :key="listing.slug" class="yacht-card">
           <div class="yacht-image">
             <img :src="getListingImage(listing)" :alt="listing.yacht_name">
             <div class="yacht-badge" :class="{ charter: type.id !== 'forsale' }">{{ type.badge }}</div>
           </div>
           <div class="yacht-info">
             <h3 class="yacht-name">{{ listing.yacht_name }}</h3>
             <div class="yacht-meta">
               <span class="meta-item"><i class="fas fa-map-marker-alt"></i> {{ getListingCity(listing) }}</span>
               <span class="meta-item"><i class="fas fa-calendar-alt"></i> {{ getListingYear(listing) }}</span>
               <span class="meta-item"><i class="fas fa-ruler-horizontal"></i> {{ getListingLength(listing) }}</span>
             </div>
             <div class="yacht-price">{{ getListingPrice(listing) }}</div>
             <router-link :to="'/listing-detail/' + listing.slug" class="view-btn">View Details →</router-link>
           </div>
         </article>
       </div>
     </div>

  </div>
</section>
    <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';
import brokers from '../../broker.json';
import listings from '../../listings.json';
import { useRoute } from 'vue-router';

const SUPABASE_URL = 'https://qumgjqbfreeskjgltfvu.supabase.co/storage/v1/object/public/listings/';

export default {
    name: 'BrokerDetailPage',
    components: {
        NavbarSection,
        FooterSection
    },
    data() {
        return {
            broker: null,
            brokerListings: [],
            activeTab: 'forsale'
        };
    },
    mounted() {
        this.loadBroker();
        this.loadListings();
    },
    methods: {
        loadBroker() {
            const route = useRoute();
            const brokerSlug = route.params.id;
            
            let allBrokers = [];
            
            if (Array.isArray(brokers) && brokers.length > 0) {
                const brokerData = brokers.find(b => b.data_type === 'brokers' || b.records);
                if (brokerData && brokerData.records) {
                    allBrokers = brokerData.records;
                } else {
                    allBrokers = brokers;
                }
            }
            
            // Extract name from slug (format: "Name-high-seas-yachting")
            let extractedName = brokerSlug;
            if (brokerSlug.includes('-high-seas-yachting')) {
                extractedName = brokerSlug.replace('-high-seas-yachting', '');
            }
            
            // Find broker by matching the name (case-insensitive)
            this.broker = allBrokers.find(b => 
                b.name && b.name.toLowerCase() === extractedName.toLowerCase()
            ) || null;
            
            if (!this.broker && allBrokers.length > 0) {
                this.broker = allBrokers[0];
            }
        },
        loadListings() {
            if (!this.broker) return;
            
            let allListings = [];
            
            if (Array.isArray(listings) && listings.length > 0) {
                const listingData = listings.find(l => l.data_type === 'listings' || l.records);
                if (listingData && listingData.records) {
                    allListings = listingData.records;
                } else {
                    allListings = listings;
                }
            }
            
            this.brokerListings = allListings.filter(l => l.broker_id === this.broker.id);
            
            // Set initial active tab to first available listing type
            const types = ['forsale', 'daycharter', 'termcharter'];
            for (const type of types) {
                if (this.brokerListings.some(l => l.type === type)) {
                    this.activeTab = type;
                    break;
                }
            }
        },
        getBrokerImage() {
            if (this.broker && this.broker.profile_image) {
                return this.broker.profile_image;
            }
            return '/green.jpg';
        },
        getPhone() {
            if (this.broker && this.broker.phone) {
                return this.broker.phone.replace(/[^0-9]/g, '');
            }
            return '9546618225';
        },
        getListingImage(listing) {
            const photo = listing.metadata?.photos?.[0];
            if (!photo) return 'https://i.fbcd.co/products/resized/resized-750-500/a413c24cdb272cf65b11e6799854375d39616d6a9ae46c8c7ab51f763f7b7306.jpg';
            if (photo.startsWith('http')) return photo;
            if (photo.startsWith('/media/')) {
                const filename = photo.split('/').pop();
                return SUPABASE_URL + encodeURIComponent(filename);
            }
            return photo;
        },
        getListingPrice(listing) {
            const price = listing.metadata?.price || listing.price;
            if (price) {
                return '$' + price.toLocaleString();
            }
            return 'Price on Request';
        },
        getListingCity(listing) {
            return listing.city || listing.metadata?.city || 'N/A';
        },
        getListingYear(listing) {
            return listing.year || 'N/A';
        },
        getListingLength(listing) {
            return listing.length ? `${listing.length} ft` : 'N/A';
        },
        switchTab(event, tabId) {
            const btn = event.currentTarget;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                tabContent.classList.add('active');
            }
        }
    },
    computed: {
        brokerName() {
            return this.broker ? this.broker.name : 'Brett Horowitz';
        },
        brokerEmail() {
            return this.broker ? this.broker.email : 'Brett@highseasyachting.com';
        },
        brokerPhone() {
            return this.broker ? this.broker.phone : '954-661-8225';
        },
        forsaleListings() {
            return this.brokerListings.filter(l => l.type === 'forsale');
        },
        daycharterListings() {
            return this.brokerListings.filter(l => l.type === 'daycharter');
        },
        termcharterListings() {
            return this.brokerListings.filter(l => l.type === 'termcharter');
        },
        activeListingTypes() {
            const types = [];
            if (this.forsaleListings.length > 0) {
                types.push({                                                      
                    id: 'forsale',
                    label: 'For Sale',
                    icon: 'fas fa-anchor',
                    count: this.forsaleListings.length,
                    listings: this.forsaleListings,
                    badge: 'FOR SALE'
                });
            }
            if (this.daycharterListings.length > 0) {
                types.push({ 
                    id: 'daycharter',
                    label: 'Day Charter',
                    icon: 'fas fa-sun',
                    count: this.daycharterListings.length,
                    listings: this.daycharterListings,
                    badge: 'DAY CHARTER'
                });
            }
            if (this.termcharterListings.length > 0) {
                types.push({
                    id: 'termcharter',
                    label: 'Term Charter',
                    icon: 'fas fa-calendar-alt',
                    count: this.termcharterListings.length,
                    listings: this.termcharterListings,
                    badge: 'TERM CHARTER'
                });
            }
            return types;
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
      background: #ffffff;
      color: #102012;
      line-height: 1.7;
    }

    .page-hero {
      position: relative;
      background: linear-gradient(180deg, rgba(15, 40, 24, 0.8) 0%, rgba(15, 40, 24, 0.2) 55%),
        url('https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Main/Ferretti/83594.jpg') center/cover no-repeat;
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
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
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
      text-transform: uppercase;
      word-spacing: 0.1em;
    }

    .hero-copy {
      max-width: 600px;
      margin: 16px auto 0;
      font-size: 1.1rem;
      color: rgba(255,255,255,0.85);
      line-height: 1.8;
    }

    .content-shell {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 24px 100px;
    }

    .broker-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 40px;
      align-items: start;
    }

    .profile-card {
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
      border: 1px solid rgba(15, 40, 24, 0.08);
    }

    .profile-image-wrapper {
      position: relative;
      height: 420px;
    }

    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-image-wrapper::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(15,40,24,0.4) 0%, transparent 50%);
      pointer-events: none;
    }

    .floating-yacht {
      position: absolute;
      bottom: -40px;
      right: 24px;
      width: 200px;
      border: 6px solid white;
      border-radius: 26px;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
      overflow: hidden;
      z-index: 2;
    }

    .floating-yacht img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      display: block;
    }

    .profile-info {
      padding: 36px 32px;
    }

    .profile-name {
      font-size: 1.8rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 28px;
      position: relative;
    }

    .profile-name::after {
      content: '';
      display: block;
      width: 50px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #355a32);
      border-radius: 2px;
      margin-top: 14px;
    }

    .contact-row {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 22px;
      padding: 18px 20px;
      background: #f8faf6;
      border-radius: 18px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .contact-row:hover {
      transform: translateX(4px);
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
    }

    .contact-row i {
      font-size: 1.3rem;
      color: #355a32;
      width: 24px;
      margin-top: 2px;
    }

    .contact-label {
      font-size: 0.8rem;
      font-weight: 700;
      color: #5f6d60;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }

    .contact-value {
      color: #102012;
      font-weight: 600;
      text-decoration: none;
      font-size: 1rem;
      display: block;
    }

    .contact-value:hover {
      color: #355a32;
    }

    .message-btn {
      width: 100%;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      border: none;
      padding: 18px;
      border-radius: 18px;
      font-size: 1rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 8px;
      transition: all 0.4s ease;
      box-shadow: 0 8px 25px rgba(26, 58, 42, 0.25);
    }

    .message-btn:hover {
      background: #355a32;
      transform: translateY(-4px);
      box-shadow: 0 12px 35px rgba(26, 58, 42, 0.35);
    }

    .profile-content {
      background: #ffffff;
      border-radius: 32px;
      padding: 48px;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(15, 40, 24, 0.08);
    }

    .section-title {
      font-size: 2rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 24px;
      line-height: 1.1;
      position: relative;
    }

    .section-title::after {
      content: '';
      display: block;
      width: 50px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #355a32);
      border-radius: 2px;
      margin-top: 14px;
    }

    .profile-text {
      color: #5f6d60;
      font-size: 1.08rem;
      line-height: 1.9;
      margin-bottom: 36px;
    }

    .profile-text:last-child {
      margin-bottom: 0;
    }

    .stats-row {
      display: flex;
      gap: 24px;
      margin-top: 40px;
      padding-top: 32px;
      border-top: 1px solid rgba(15, 40, 24, 0.1);
    }

    .stat-item {
      flex: 1;
      text-align: center;
    }

    .stat-number {
      font-size: 2.2rem;
      font-weight: 800;
      color: #1a3a2a;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #5f6d60;
      margin-top: 8px;
    }

    @media (max-width: 1024px) {
      .broker-content {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .profile-card {
        max-width: 500px;
        margin: 0 auto;
      }

      .profile-image-wrapper {
        height: 380px;
      }

      .floating-yacht {
        width: 160px;
        bottom: -30px;
      }

      .floating-yacht img {
        height: 110px;
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

      .content-shell {
        padding: 40px 18px 60px;
      }

      .profile-content {
        padding: 32px 26px;
      }

      .section-title {
        font-size: 1.6rem;
      }

      .profile-text {
        font-size: 1rem;
      }

      .profile-image-wrapper {
        height: 320px;
      }

      .profile-info {
        padding: 28px 24px;
      }

      .profile-name {
        font-size: 1.5rem;
      }

      .contact-row {
        padding: 14px 16px;
      }

      .stats-row {
        flex-wrap: wrap;
        gap: 16px;
      }

      .stat-item {
        flex: 1 1 calc(50% - 8px);
      }

      .stat-number {
        font-size: 1.6rem;
      }
    }

    .brett-listings {
      padding: 80px 24px;
      background: #f8faf6; 
    }

    .listings-inner {
      max-width: 1300px;
      margin: 0 auto;
    }

    .listings-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .listings-title {
      font-size: 2.4rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 12px;
      position: relative;
    }

    .listings-title::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #355a32);
      border-radius: 2px;
      margin: 16px auto 0;
    }

    .listings-subtitle {
      color: #5f6d60;
      font-size: 1.1rem;
    }

    .listings-tabs {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 14px 28px;
      border: none;
      background: #ffffff;
      border-radius: 999px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      color: #5f6d60;
      font-size: 0.95rem;
      text-decoration: none;
    }

    .tab-btn:hover {
      background: #f8faf6;
      transform: translateY(-2px);
    }

    .tab-btn.active {
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      box-shadow: 0 8px 25px rgba(26, 58, 42, 0.25);
    }

    .tab-count {
      background: rgba(255,255,255,0.2);
      padding: 2px 10px;
      border-radius: 20px;
      font-size: 0.85rem;
    }

    .tab-btn:not(.active) .tab-count {
      background: #f8faf6;
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
      animation: fadeIn 0.4s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .listings-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }

    .yacht-card {
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(15, 40, 24, 0.08);
      transition: all 0.4s ease;
    }

    .yacht-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
    }

    .yacht-image {
      position: relative;
      height: 240px;
      overflow: hidden;
    }

    .yacht-image::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(15,40,24,0.3) 0%, transparent 40%);
      pointer-events: none;
    }

    .yacht-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .yacht-card:hover .yacht-image img {
      transform: scale(1.05);
    }

    .yacht-badge {
      position: absolute;
      top: 20px;
      left: 20px;
      background: #1a3a2a;
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      z-index: 1;
    }

    .yacht-badge.charter {
      background: #355a32;
    }

    .yacht-info {
      padding: 24px 22px 26px;
    }

    .yacht-name {
      font-size: 1.35rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 14px;
    }

    .yacht-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 18px;
    }

    .meta-item {
      background: #f8faf6;
      padding: 6px 14px;
      border-radius: 30px;
      font-size: 0.88rem;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #5f6d60;
    }

    .meta-item i {
      color: #355a32;
      font-size: 0.8rem;
    }

    .yacht-price {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 18px;
    }

    .view-btn {
      width: 100%;
      padding: 14px;
      background: #1a3a2a;
      color: white;
      border: none;
      border-radius: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.95rem;
      text-decoration: none;
      display: block;
      text-align: center;
    }

    .view-btn:hover {
      background: #355a32;
      transform: translateY(-2px);
    }

    @media (max-width: 1024px) {
      .listings-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 680px) {
      .brett-listings {
        padding: 60px 18px;
      }

      .listings-title {
        font-size: 1.8rem;
      }

      .listings-tabs {
        gap: 10px;
      }

      .tab-btn {
        padding: 12px 20px;
        font-size: 0.88rem;
      }

      .listings-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .yacht-image {
        height: 200px;
      }

      .yacht-name {
        font-size: 1.2rem;
      }
    }
    .tab-content {
    display: none;
  }
  .tab-content.active {
    display: block;
  }
</style>