<template>
    <NavbarSection />
<header class="page-hero" v-if="event" :style="heroBackground">
    <div class="hero-content">
      <span class="hero-label"><i class="fas fa-calendar-alt"></i> Event Details</span>
      <h1 class="hero-title">{{ event.name }}</h1>
      <p class="hero-copy">{{ event.description }}</p>
    </div>
  </header>
  <header class="page-hero" v-else>
    <div class="hero-content">
      <span class="hero-label"><i class="fas fa-calendar-alt"></i> Event Details</span>
      <h1 class="hero-title">Event Not Found</h1>
      <p class="hero-copy">The event you're looking for doesn't exist.</p>
    </div>
  </header>

  <!-- ====================== section 1====================== -->
<section class="hs-boatshow-section" v-if="event && event.metadata && event.metadata.section1">
     <div class="hs-section-header">
        <span class="hs-small-tag">High Seas Yachting</span>
        <h2 class="hs-main-heading">{{ event.metadata.section1.title }}</h2>
      </div>
  <div class="hs-container">
    
    <!-- Announcement -->
    <div class="hs-announcement">
          
      <p>{{ event.metadata.section1.description }}</p>
    </div>

    <!-- section 2 -->
    <div class="hs-getting-there" v-if="event && event.metadata && event.metadata.section2">
      <div class="hs-section-header">
        <span class="hs-small-tag">GETTING THERE</span>
        <h2 class="hs-main-heading">{{ event.metadata.section2.section_title }}</h2>
      </div>

      <div class="hs-getting-grid">
        
        <!-- Left Column -->
        <div class="hs-getting-card">
          <div class="hs-getting-icon"><i class="fas fa-anchor"></i></div>
          <h3>{{ event.metadata.section2.title_1 }}</h3>
          <p>{{ event.metadata.section2.description_1 }}</p>
        </div>

        <!-- Right Column -->
        <div class="hs-getting-card">
          <div class="hs-getting-icon"><i class="fas fa-car"></i></div>
          <h3>{{ event.metadata.section2.title_2 }}</h3>
          <p>{{ event.metadata.section2.description_2 }}</p>
        </div>
      </div>
    </div>

    <!-- section 3 -->
    <div class="hs-entry-guide" v-if="event && event.metadata && event.metadata.section3">
      <div class="hs-section-header">
        <span class="hs-small-tag">ENTRY GUIDE</span>
        <h2 class="hs-main-heading">{{ event.metadata.section3.section_title }}</h2>
      </div>

      <div class="hs-steps-grid">
        
        <!-- Step 1 -->
        <div class="hs-step-card">
          <div class="hs-step-number">01</div>
          <h3>{{ event.metadata.section3.title_1 }}</h3>
          <p>{{ event.metadata.section3.description_1 }}</p>
          <a :href="event.metadata.section3.button_link_1" class="hs-step-link" target="_blank">{{ event.metadata.section3.button_text_1 }} <i class="fas fa-arrow-right"></i></a>
        </div>

        <!-- Step 2 -->
        <div class="hs-step-card">
          <div class="hs-step-number">02</div>
          <h3>{{ event.metadata.section3.title_2 }}</h3>
          <p>{{ event.metadata.section3.description_2 }}</p>
        </div>

        <!-- Step 3 -->
        <div class="hs-step-card">
          <div class="hs-step-number">03</div>
          <h3>{{ event.metadata.section3.title_3 }}</h3>
          <p>{{ event.metadata.section3.description_3 }}</p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- ====================== section 4 ====================== -->
<section class="hs-boats-event-section" v-if="event && event.metadata && event.metadata.section4">
  <div class="hs-container">
    
    <div class="hs-section-header">
      <span class="hs-small-tag">FEATURED YACHTS</span>
      <h1 class="hs-event-title">{{ event.metadata.section4.section_title }}</h1>
    </div>

    <!-- Yacht Cards -->
    <div class="hs-event-grid">

      <div class="hs-event-card" v-for="listing in eventListings" :key="listing.id">
        <div class="hs-event-image">
          <img :src="getImageUrl(listing.photos[0])" :alt="listing.yachtName" @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80')">
          <span class="hs-location-badge">{{ listing.city ? listing.city.charAt(0).toUpperCase() + listing.city.slice(1) : 'N/A' }}</span>
        </div>
        <div class="hs-event-info">
          <h3>{{ listing.year }} {{ listing.manufacturer }} {{ listing.yachtName }}</h3>
          <div class="hs-yacht-specs">
            <div><strong>Year</strong>{{ listing.year }}</div>
            <div><strong>Length</strong>{{ formatLength(listing.length) }}</div>
            <div><strong>Make</strong> {{ listing.manufacturer }}</div>
            <div><strong>Model</strong> {{ listing.yachtName }}</div>
          </div>                     
          <div class="hs-event-buttons">
            <button class="hs-call-btn"><i class="fas fa-phone"></i> Call Broker</button>
            <router-link :to="'/listing-detail/' + listing.slug" class="hs-details-btn">View Details</router-link>
          </div>
        </div>
      </div>

    </div>

    <!-- section 5 -->
    <div class="hs-docks-section" v-if="event && event.metadata && event.metadata.section5">
      <div class="hs-docks-content">
        <span class="hs-small-tag">SEE YOU THERE</span>
        <h2 class="hs-docks-title">{{ event.metadata.section5.title }}</h2>
        <p class="hs-docks-text">{{ event.metadata.section5.description }}</p>
      </div>

      <div class="hs-docks-image">
        <img :src="event.metadata.section5.image" 
             alt="Team at Boat Show">
        <div class="hs-overlay-text">
          <h3>Start it</h3>
          <p>Still Looking for Someone to move your Business to Next Level?</p>
          <button class="hs-consult-btn">GET FREE CONSULTATION</button>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- ====================== section 6 ====================== -->
<section class="hs-event-registration" v-if="event && event.metadata && event.metadata.section6">
  <div class="hs-container">
    
    <h1 class="hs-registration-title">Event Registration</h1>

    <div class="hs-registration-grid">
      
      <!-- LEFT SIDE - IMAGE -->
      <div class="hs-registration-image">
        <img :src="event.metadata.section6.image" alt="Yacht Registration">
        <div class="hs-image-overlay">
          <h2 class="hs-pibs-title">{{ event.name }}</h2>
          <p class="hs-pibs-subtitle">Join us for an exclusive experience</p>
        </div>
      </div>

      <!-- RIGHT SIDE - IFRAME -->
      <div class="hs-registration-iframe">
        <iframe data-v-41825cf6="" :src="event.metadata.section6.form_url" width="100%" height="600" frameborder="0" class="reg-iframe"></iframe>
      </div>
    </div>
  </div>
</section>
    <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';
import eventsData from '../../events.json';
import listingsData from '../../listings.json';
import { useRoute } from 'vue-router';

const SUPABASE_URL = 'https://qumgjqbfreeskjgltfvu.supabase.co/storage/v1/object/public/listings/';

    export default {
        name: 'EventDetailPage',
        components: {
            NavbarSection,
            FooterSection
        },
        data() {
            return {
                event: null,
                eventListings: []
            }
        },
        computed: {
            heroBackground() {
                if (this.event && this.event.image) {
                    return {
                        background: `linear-gradient(180deg, rgba(15, 40, 24, 0.92) 0%, rgba(15, 40, 24, 0.55) 100%), url('${this.event.image}') center/cover no-repeat`
                    };
                }
                return {};
            }
        },
        methods: {
            getImageUrl(photoPath) {
                if (!photoPath) return '';
                const filename = photoPath.split('/').pop();
                return SUPABASE_URL + encodeURIComponent(filename);
            },
            formatPrice(price) {
                if (!price) return 'Price on request';
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(price);
            },
            formatLength(length) {
                return length ? `${length} ft` : 'N/A';
            },
            loadEventListings() {
                if (this.event && this.event.metadata && this.event.metadata.section4 && this.event.metadata.section4.listing_ids) {
                    const listingIds = this.event.metadata.section4.listing_ids;
                    let allListings = [];
                    
                    if (listingsData) {
                        if (Array.isArray(listingsData) && listingsData.length > 0) {
                            const firstItem = listingsData[0];
                            if (firstItem && firstItem.records && Array.isArray(firstItem.records)) {
                                allListings = firstItem.records;
                            } else if (Array.isArray(listingsData)) {
                                allListings = listingsData;
                            }
                        } else if (listingsData.records && Array.isArray(listingsData.records)) {
                            allListings = listingsData.records;
                        }
                    }
                    
                    const filteredListings = allListings.filter(listing => listingIds.includes(listing.id));
                    
                    this.eventListings = filteredListings.map(listing => ({
                        id: listing.id,
                        yachtName: listing.yacht_name,
                        year: listing.year,
                        manufacturer: listing.manufacturer,
                        length: listing.length,
                        beam: listing.beam,
                        draft: listing.draft,
                        description: listing.description,
                        city: listing.metadata?.city || '',
                        price: listing.metadata?.price || 0,
                        photos: listing.metadata?.photos || [],
                        slug: listing.slug || ''
                    }));
                }
            }
        },
        mounted() {
            const route = useRoute();
            const eventId = route.params.id;
            const allEvents = eventsData[0].records;
            this.event = allEvents.find(e => e.id === eventId);
            this.loadEventListings();
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
      min-height: 100vh;
    }

    img {
      max-width: 100%;
      display: block;
    }

    .page-hero {
      position: relative;
      background: linear-gradient(180deg, rgba(15, 40, 24, 0.82) 0%, rgba(15, 40, 24, 0.2) 60%),
        url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=80') center/cover no-repeat;
      background-color: #1a3a2a;
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
      max-width: 850px;
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
      font-size: clamp(3rem, 5vw, 4.8rem);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 18px;
      text-transform: uppercase;
      word-spacing: 0.1em;
    }

    .hero-copy {
      max-width: 640px;
      margin: 0 auto;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.87);
      line-height: 1.85;
    }

   
    @media (max-width: 680px) {
      .page-hero {
        min-height: 340px;
        padding: 60px 18px;
      }

      .hero-title {
        font-size: 2.4rem;
      }

    }

.hs-boatshow-section {
     padding: 100px 0;
     background: #f8faf6;
     font-family: 'Poppins', sans-serif;
     position: relative;
     overflow: hidden;
   }

   .hs-boatshow-section::before {
     content: '';
     position: absolute;
     top: -200px;
     right: -200px;
     width: 600px;
     height: 600px;
     background: radial-gradient(circle, rgba(26, 58, 42, 0.06) 0%, transparent 70%);
     pointer-events: none;
   }

   .hs-boatshow-section::after {
     content: '';
     position: absolute;
     bottom: -200px;
     left: -200px;
     width: 500px;
     height: 500px;
     background: radial-gradient(circle, rgba(53, 90, 50, 0.05) 0%, transparent 70%);
     pointer-events: none;
   }

   .hs-container {
     max-width: 1280px;
     margin: 0 auto;
     padding: 0 20px;
     position: relative;
     z-index: 1;
   }

   .hs-announcement {
     background: linear-gradient(135deg, #1a3a2a 0%, #2d5a45 100%);
     padding: 48px 56px;
     border-radius: 32px;
     box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
     margin-bottom: 80px;
     line-height: 1.85;
     color: rgba(255, 255, 255, 0.92);
     font-size: 1.12rem;
     position: relative;
     overflow: hidden;
   }

   .hs-announcement::before {
     content: '';
     position: absolute;
     top: -50%;
     right: -10%;
     width: 300px;
     height: 300px;
     background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
     pointer-events: none;
   }

   .hs-announcement p {
     position: relative;
     z-index: 1;
   }

   .hs-section-header {
     text-align: center;
     margin-bottom: 50px;
   }

   .hs-small-tag {
     display: inline-block;
     text-align: center;
     color: #355a32;
     font-weight: 700;
     letter-spacing: 3px;
     font-size: 0.75rem;
     text-transform: uppercase;
     margin-bottom: 12px;
     padding: 8px 20px;
     background: rgba(65, 107, 60, 0.1);
     border-radius: 50px;
   }

   .hs-main-heading {
     font-size: 2.8rem;
     font-weight: 800;
     color: #1a3a2a;
     text-align: center;
     margin-bottom: 0;
     letter-spacing: -0.02em;
   }

   /* Getting There Grid */
   .hs-getting-grid {
     display: grid;
     grid-template-columns: repeat(2, 1fr);
     gap: 32px;
   }

   .hs-getting-card {
     background: #ffffff;
     padding: 40px 36px;
     border-radius: 26px;
     box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
     border: 1px solid rgba(26, 58, 42, 0.06);
     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
     position: relative;
   }

   .hs-getting-card::before {
     content: '';
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 4px;
     background: linear-gradient(90deg, #355a32, #2d5a45);
     border-radius: 26px 26px 0 0;
     opacity: 0;
     transition: opacity 0.4s ease;
   }

   .hs-getting-card:hover {
     transform: translateY(-6px);
     box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
   }

   .hs-getting-card:hover::before {
     opacity: 1;
   }

   .hs-getting-icon {
     width: 56px;
     height: 56px;
     background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
     border-radius: 14px;
     display: flex;
     align-items: center;
     justify-content: center;
     margin-bottom: 24px;
   }

   .hs-getting-icon i {
     font-size: 1.5rem;
     color: white;
   }

   .hs-getting-card h3 {
     font-size: 1.5rem;
     color: #1a3a2a;
     margin-bottom: 16px;
     font-weight: 700;
   }

   .hs-getting-card p {
     color: #5f6d60;
     line-height: 1.8;
     font-size: 1rem;
   }

   /* Entry Guide */
   .hs-entry-guide {
     margin-top: 80px;
   }

   .hs-steps-grid {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 30px;
   }

   .hs-step-card {
     background: #ffffff;
     padding: 48px 32px;
     border-radius: 26px;
     text-align: center;
     box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
     border: 1px solid rgba(26, 58, 42, 0.05);
     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
     position: relative;
   }

   .hs-step-card:hover {
     transform: translateY(-10px);
     box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
   }

   .hs-step-number {
     width: 70px;
     height: 70px;
     background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
     color: white;
     font-size: 1.6rem;
     font-weight: 800;
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     margin: 0 auto 28px;
     box-shadow: 0 8px 24px rgba(65, 107, 60, 0.3);
   }

   .hs-step-card h3 {
     font-size: 1.35rem;
     margin-bottom: 14px;
     color: #1a3a2a;
     font-weight: 700;
   }

   .hs-step-card p {
     color: #5f6d60;
     margin-bottom: 24px;
     line-height: 1.7;
   }

   .hs-step-link {
     color: #355a32;
     font-weight: 600;
     text-decoration: none;
     display: inline-flex;
     align-items: center;
     gap: 10px;
     padding: 12px 24px;
     background: rgba(65, 107, 60, 0.08);
     border-radius: 50px;
     transition: all 0.3s ease;
   }

   .hs-step-link i {
     transition: transform 0.3s ease;
   }

   .hs-step-link:hover {
     background: #355a32;
     color: white;
   }

   .hs-step-link:hover i {
     transform: translateX(4px);
   }

   /* Responsive */
   @media (max-width: 1024px) {
     .hs-steps-grid {
       grid-template-columns: repeat(2, 1fr);
     }
   }

   @media (max-width: 768px) {
     .hs-boatshow-section {
       padding: 70px 0;
     }

     .hs-getting-grid {
       grid-template-columns: 1fr;
       gap: 24px;
     }

     .hs-steps-grid {
       grid-template-columns: 1fr;
       gap: 24px;
     }

     .hs-announcement {
       padding: 36px 28px;
       border-radius: 26px;
     }

     .hs-main-heading {
       font-size: 2.2rem;
     }
   }

   @media (max-width: 480px) {
     .hs-announcement {
       padding: 28px 22px;
       margin-bottom: 50px;
     }

     .hs-getting-card,
     .hs-step-card {
       padding: 32px 24px;
     }

     .hs-main-heading {
       font-size: 1.85rem;
     }

     .hs-getting-card h3 {
       font-size: 1.3rem;
     }

     .hs-step-number {
       width: 60px;
       height: 60px;
       font-size: 1.35rem;
     }

     .hs-getting-icon {
       width: 48px;
       height: 48px;
     }

     .hs-getting-icon i {
       font-size: 1.25rem;
     }
   }

   .hs-boats-event-section {
     padding: 100px 0;
     background: #f8faf6;
     font-family: 'Poppins', sans-serif;
     position: relative;
     overflow: hidden;
   }

   .hs-boats-event-section::before {
     content: '';
     position: absolute;
     top: -150px;
     left: -150px;
     width: 500px;
     height: 500px;
     background: radial-gradient(circle, rgba(26, 58, 42, 0.05) 0%, transparent 70%);
     pointer-events: none;
   }

   .hs-boats-event-section::after {
     content: '';
     position: absolute;
     bottom: -150px;
     right: -150px;
     width: 400px;
     height: 400px;
     background: radial-gradient(circle, rgba(53, 90, 50, 0.04) 0%, transparent 70%);
     pointer-events: none;
   }

   .hs-container {
     max-width: 1350px;
     margin: 0 auto;
     padding: 0 20px;
     position: relative;
     z-index: 1;
   }

   .hs-event-title {
     font-size: 2.8rem;
     font-weight: 800;
     color: #1a3a2a;
     text-align: center;
     margin-bottom: 60px;
     letter-spacing: -0.02em;
   }

   .hs-event-grid {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 32px;
     margin-bottom: 100px;
   }

   .hs-event-card {
     background: #ffffff;
     border-radius: 26px;
     overflow: hidden;
     box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
     transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
     border: 1px solid rgba(26, 58, 42, 0.05);
   }

   .hs-event-card:hover {
     transform: translateY(-12px);
     box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
   }

   .hs-event-card:hover .hs-event-image img {
     transform: scale(1.08);
   }

   .hs-event-image {
     position: relative;
     height: 240px;
     overflow: hidden;
   }

   .hs-event-image img {
     width: 100%;
     height: 100%;
     object-fit: cover;
     transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .hs-location-badge {
     position: absolute;
     bottom: 16px;
     left: 16px;
     background: #ffffff;
     color: #1a3a2a;
     padding: 8px 18px;
     border-radius: 50px;
     font-size: 0.8rem;
     font-weight: 600;
     box-shadow: 0 4px 15px rgba(0,0,0,0.1);
     display: flex;
     align-items: center;
     gap: 6px;
   }

   .hs-location-badge::before {
     content: '\f3c5';
     font-family: 'Font Awesome 6 Free';
     font-weight: 900;
     font-size: 0.7rem;
     color: #355a32;
   }

   .hs-event-info {
     padding: 28px;
   }

   .hs-event-info h3 {
     font-size: 1.35rem;
     font-weight: 700;
     color: #1a3a2a;
     margin-bottom: 20px;
   }

   .hs-yacht-specs {
     display: flex;
     gap: 32px;
     margin-bottom: 24px;
     padding-bottom: 20px;
     border-bottom: 1px solid rgba(26, 58, 42, 0.08);
   }

   .hs-yacht-specs div {
     font-size: 0.95rem;
   }

   .hs-yacht-specs strong {
     display: block;
     font-size: 0.7rem;
     color: #5f6d60;
     margin-bottom: 6px;
     letter-spacing: 1.5px;
     text-transform: uppercase;
   }

   .hs-event-buttons {
     display: flex;
     gap: 12px;
   }

   .hs-call-btn {
     flex: 1;
     padding: 14px 20px;
     background: #1a3a2a;
     color: white;
     border: none;
     border-radius: 12px;
     font-weight: 600;
     font-size: 0.85rem;
     cursor: pointer;
     transition: all 0.3s ease;
   }

   .hs-call-btn:hover {
     background: #2d5a45;
     transform: translateY(-2px);
   }

   .hs-details-btn {
     flex: 1;
     padding: 14px 20px;
     background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
     color: white;
     border: none;
     border-radius: 12px;
     font-weight: 600;
     font-size: 0.85rem;
     cursor: pointer;
     transition: all 0.3s ease;
   }

   .hs-details-btn:hover {
     transform: translateY(-2px);
     box-shadow: 0 8px 20px rgba(65, 107, 60, 0.3);
   }

   /* See You on the Docks */
   .hs-docks-section {
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 60px;
     align-items: center;
     background: #ffffff;
     padding: 60px;
     border-radius: 32px;
     box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
   }

   .hs-docks-content {
     padding-right: 20px;
   }

   .hs-docks-title {
     font-size: 2.4rem;
     font-weight: 800;
     color: #1a3a2a;
     margin-bottom: 20px;
     letter-spacing: -0.02em;
   }

   .hs-docks-text {
     color: #5f6d60;
     line-height: 1.85;
     font-size: 1.05rem;
   }

   .hs-docks-image {
     position: relative;
     border-radius: 26px;
     overflow: hidden;
     height: 400px;
   }

   .hs-docks-image img {
     width: 100%;
     height: 100%;
     object-fit: cover;
     display: block;
   }

   .hs-overlay-text {
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
     background: linear-gradient(transparent 0%, rgba(26, 58, 42, 0.95) 100%);
     padding: 40px 30px 30px;
     color: white;
   }

   .hs-overlay-text h3 {
     font-size: 2rem;
     font-weight: 800;
     margin-bottom: 8px;
   }

   .hs-overlay-text p {
     font-size: 0.95rem;
     opacity: 0.9;
     margin-bottom: 16px;
   }

   .hs-consult-btn {
     background: white;
     color: #1a3a2a;
     border: none;
     padding: 14px 28px;
     border-radius: 50px;
     font-weight: 600;
     font-size: 0.85rem;
     cursor: pointer;
     transition: all 0.3s ease;
   }

   .hs-consult-btn:hover {
     transform: scale(1.05);
     box-shadow: 0 8px 25px rgba(255,255,255,0.2);
   }

   /* Responsive */
   @media (max-width: 1100px) {
     .hs-event-grid {
       grid-template-columns: repeat(2, 1fr);
     }
   }

   @media (max-width: 992px) {
     .hs-docks-section {
       grid-template-columns: 1fr;
       gap: 40px;
       padding: 40px;
     }

     .hs-docks-content {
       padding-right: 0;
       text-align: center;
     }

     .hs-docks-image {
       height: 350px;
     }
   }

   @media (max-width: 768px) {
     .hs-boats-event-section {
       padding: 70px 0;
     }

     .hs-event-title {
       font-size: 2.2rem;
       margin-bottom: 40px;
     }

     .hs-docks-section {
       padding: 30px 24px;
       border-radius: 26px;
     }

     .hs-docks-title {
       font-size: 2rem;
     }
   }

   @media (max-width: 600px) {
     .hs-event-grid {
       grid-template-columns: 1fr;
       gap: 24px;
       margin-bottom: 60px;
     }

     .hs-event-image {
       height: 200px;
     }

     .hs-yacht-specs {
       gap: 24px;
     }

     .hs-docks-image {
       height: 300px;
     }

     .hs-overlay-text h3 {
       font-size: 1.6rem;
     }

     .hs-event-buttons {
       flex-direction: column;
       gap: 10px;
     }
   }

   .hs-event-registration {
     padding: 100px 0;
     background: #f8faf6;
     font-family: 'Poppins', sans-serif;
     position: relative;
     overflow: hidden;
   }

   .hs-event-registration::before {
     content: '';
     position: absolute;
     top: -200px;
     right: -200px;
     width: 600px;
     height: 600px;
     background: radial-gradient(circle, rgba(26, 58, 42, 0.05) 0%, transparent 70%);
     pointer-events: none;
   }

   .hs-event-registration::after {
     content: '';
     position: absolute;
     bottom: -200px;
     left: -200px;
     width: 500px;
     height: 500px;
     background: radial-gradient(circle, rgba(53, 90, 50, 0.04) 0%, transparent 70%);
     pointer-events: none;
   }

   .hs-container {
     max-width: 1280px;
     margin: 0 auto;
     padding: 0 20px;
     position: relative;
     z-index: 1;
   }

   .hs-registration-title {
     font-size: 2.8rem;
     font-weight: 800;
     color: #1a3a2a;
     text-align: center;
     margin-bottom: 50px;
     letter-spacing: -0.02em;
   }

   .hs-registration-grid {
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 0;
     border-radius: 32px;
     overflow: hidden;
     box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
     background: #ffffff;
   }

   /* Left Image Side */
   .hs-registration-image {
     position: relative;
     min-height: 620px;
     overflow: hidden;
   }

   .hs-registration-image img {
     width: 100%;
     height: 100%;
     object-fit: cover;
     transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .hs-registration-image:hover img {
     transform: scale(1.05);
   }

   .hs-image-overlay {
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
     background: linear-gradient(transparent 0%, rgba(26, 58, 42, 0.9) 100%);
     padding: 40px 36px;
     color: white;
   }

   .hs-pibs-title {
     font-size: 3.5rem;
     font-weight: 800;
     margin-bottom: 8px;
     letter-spacing: -0.02em;
   }

   .hs-pibs-subtitle {
     font-size: 1.1rem;
     opacity: 0.9;
   }

   /* Right Iframe Side */
   .hs-registration-iframe {
     background: #ffffff;
     padding: 0;
     min-height: 620px;
   }

   .hs-registration-iframe .reg-iframe {
     width: 100%;
     height: 620px;
     border: none;
     display: block;
   }

   /* Responsive */
   @media (max-width: 992px) {
     .hs-registration-grid {
       grid-template-columns: 1fr;
     }
     .hs-registration-image {
       min-height: 350px;
     }
     .hs-registration-image:hover img {
       transform: none;
     }
     .hs-registration-iframe .reg-iframe {
       height: 550px;
     }
   }

   @media (max-width: 768px) {
     .hs-event-registration {
       padding: 70px 0;
     }
     .hs-registration-title {
       font-size: 2.2rem;
       margin-bottom: 40px;
     }
   }

   @media (max-width: 480px) {
     .hs-pibs-title {
       font-size: 2.5rem;
     }
     .hs-image-overlay {
       padding: 30px 24px;
     }
   }
   .hs-details-btn {
  text-decoration: none;
  text-align: center;
}
</style>