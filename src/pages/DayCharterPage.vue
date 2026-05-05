<template>
    <NavbarSection />

<header class="page-hero">
  <div class="page-hero-content">
    <h1 class="hero-title">Day Charter</h1>
    <p class="hero-copy">Experience the thrill of sailing in crystal-clear waters. Create unforgettable memories aboard our premium fleet.</p>
  </div>
</header>

<!-- ====================== BOATS DAY CHARTER SECTION ====================== -->
<section class="hs-charter-section">
  <div class="hs-container">

    <!-- City Tabs Navigation -->
    <div class="hs-city-tabs-wrapper">
      <div class="hs-city-tabs">
        <button
          v-for="city in uniqueCities"
          :key="city"
          :class="['hs-city-tab', { active: activeCity === city.toLowerCase() }]"
          :data-city="city.toLowerCase()"
          @click="scrollToCity(city.toLowerCase())"
        >
          <i class="fas fa-map-marker-alt"></i>
          <span class="hs-city-name">{{ city }}</span>
          <span class="hs-city-count">{{ getCityCount(city) }}</span>
        </button>
      </div>
    </div>

    <!-- City Sections -->
    <div v-for="cityData in daycharterByCity" :key="cityData.cityName" :id="getCityId(cityData.cityName)" class="hs-city-section">
      <!-- City Header -->
      <div class="hs-charter-header">
        <div class="hs-location-header">
          <i class="fas fa-anchor"></i>
          <div>
            <h1>{{ cityData.cityName }}</h1>
            <p class="hs-available-count">{{ cityData.listings.length }} Yachts Available</p>
          </div>
        </div>
      </div>

      <div class="hs-charter-grid">
        <div 
          v-for="listing in cityData.listings" 
          :key="listing.id" 
          class="hs-charter-card"
        >
          <div class="hs-charter-image">
            <img 
              :src="getImageUrl(listing.photos[0])" 
              :alt="listing.yachtName"
              @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80')"
            >
            <router-link :to="'/listing-detail/' + getListingSlug(listing)" type="button" class="hs-view-details-overlay">
              <i class="fas fa-eye"></i>
              View Details
            </router-link>
          </div>
          <div class="hs-charter-info">
            <h3 class="hs-charter-name">{{ listing.manufacturer }} {{ listing.length }}</h3>
            <p class="hs-charter-location"><i class="fas fa-map-marker-alt"></i> {{ formatCity(listing.city) }}</p>
            <div class="hs-charter-specs">
              <div><i class="fas fa-ruler-horizontal"></i> {{ listing.length }} ft</div>
              <div><i class="fas fa-clock"></i>  4, 6, 8 hrs</div>
            </div>
            <div class="hs-pricing">
              <div class="hs-pricing-row"><span>4 Hours</span><strong>{{ formatPrice(listing.pricing?.four_hour) }}</strong></div>
              <div class="hs-pricing-row"><span>6 Hours</span><strong>{{ formatPrice(listing.pricing?.six_hour) }}</strong></div>
              <div class="hs-pricing-row"><span>8 Hours</span><strong>{{ formatPrice(listing.pricing?.eight_hour) }}</strong></div>
            </div>
            <router-link :to="'/listing-detail/' + getListingSlug(listing)">
            <button type="button" class="hs-book-btn"><i class="fas fa-paper-plane"></i> Book This Yacht</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="daycharterByCity.length === 0" class="hs-no-results">
      <p>No day charter yachts available at the moment. Please check back later.</p>
    </div>
  </div>
</section>

    <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';
import listingsDataRaw from '../../listings.json';

const listingsData = Array.isArray(listingsDataRaw) ? listingsDataRaw : [listingsDataRaw];

const SUPABASE_URL = 'https://qumgjqbfreeskjgltfvu.supabase.co/storage/v1/object/public/listings/';

export default {
    name: 'DayCharterPage',
    components: {
        NavbarSection,
        FooterSection
    },
    data() {
        return {
            daycharterByCity: [],
            uniqueCities: [],
            activeCity: 'fort lauderdale'
        };
    },
    mounted: function() {
        this.loadDaycharterListings();
    },
    methods: {
        loadDaycharterListings() {
            let records = [];
            
            if (listingsData) {
                if (Array.isArray(listingsData) && listingsData.length > 0) {
                    const firstItem = listingsData[0];
                    if (firstItem && firstItem.records && Array.isArray(firstItem.records)) {
                        records = firstItem.records;
                    } else if (Array.isArray(listingsData)) {
                        records = listingsData;
                    }
                } else if (listingsData.records && Array.isArray(listingsData.records)) {
                    records = listingsData.records;
                }
            }
            
            const allDaycharters = records
                .filter(item => item && item.type === 'daycharter')
                .map(listing => ({
                    id: listing.id,
                    yachtName: listing.yacht_name,
                    year: listing.year,
                    manufacturer: listing.manufacturer,
                    length: listing.length,
                    city: listing.city || listing.metadata?.city || '',
                    photos: listing.metadata?.photos || [],
                    pricing: listing.metadata?.pricing?.retail || {}
                }));
            
            const cities = {};
            allDaycharters.forEach(item => {
                const cityKey = item.city ? item.city.toLowerCase() : 'unknown';
                if (!cities[cityKey]) {
                    cities[cityKey] = [];
                }
                cities[cityKey].push(item);
            });
            
            const sortedCities = Object.keys(cities).sort((a, b) => {
                if (a === 'fort lauderdale') return -1;
                if (b === 'fort lauderdale') return 1;
                return a.localeCompare(b);
            });
            this.uniqueCities = sortedCities;
            
            this.daycharterByCity = sortedCities.map(cityName => ({
                cityName: cityName.charAt(0).toUpperCase() + cityName.slice(1),
                listings: cities[cityName]
            }));
        },
        getImageUrl(photoPath) {
            if (!photoPath) return '';
            const filename = photoPath.split('/').pop();
            return SUPABASE_URL + encodeURIComponent(filename);
        },
        getListingSlug(listing) {
            if (!listing) return '';
            return `${listing.year}-${listing.manufacturer}-${listing.yachtName}-for-sale`.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        },
        formatCity(city) {
            if (!city) return 'N/A';
            return city.charAt(0).toUpperCase() + city.slice(1);
        },
        formatPrice(price) {
            if (!price) return 'Call for pricing';
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price);
        },
        getCityId(cityName) {
            return `city-${cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
        },
        getCityCount(cityName) {
            const cityData = this.daycharterByCity.find(c => c.cityName.toLowerCase() === cityName.toLowerCase());
            return cityData ? cityData.listings.length : 0;
        },
        scrollToCity(cityName) {
            this.activeCity = cityName;
            const element = document.getElementById(this.getCityId(cityName));
            if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
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

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Poppins', sans-serif;
      color: #122114;
      background: linear-gradient(180deg, #f1f6ef 0%, #e6ebe2 100%);
      min-height: 100vh;
    }

    /* Hero Section */
    .page-hero {
      position: relative;
      background: linear-gradient(180deg, rgba(15,40,24,0.75) 0%, rgba(15,40,24,0.35) 50%, rgba(15,40,24,0.15) 100%),
        url('/images/daycharter.png') center/cover no-repeat;
      min-height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      padding: 180px 24px 60px;
    }

    .page-hero-content {
      position: relative;
      z-index: 1;
      max-width: 850px;
    }

    .hero-label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 24px;
      border-radius: 50px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin-bottom: 20px;
    }

    .hero-copy {
      max-width: 650px;
      margin: 0 auto;
      font-size: 1.1rem;
      color: rgba(255,255,255,0.85);
      line-height: 1.8;
    }

    button,
    input,
    select {
      font: inherit;
    }

    button {
      border: none;
      background: none;
    }

  .hs-charter-section {
    padding: 80px 0 120px;
    background: #ffffff;
  }

  .hs-container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* City Tabs */
  .hs-city-tabs-wrapper {
    position: sticky;
    top: 100px;
    z-index: 100;
    background: #ffffff;
    padding: 20px 0 30px;
    margin-bottom: 20px;
  }

  .hs-city-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hs-city-tab {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 24px;
    background: #f4f7f2;
    border: 2px solid transparent;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    color: #5f7063;
    white-space: nowrap;
  }

  .hs-city-tab:hover {
    background: #e8ebe7;
    color: #355a32;
    transform: translateY(-2px);
  }

  .hs-city-tab.active {
    background: linear-gradient(135deg, #355a32, #2d4a29);
    color: white;
    border-color: #355a32;
    box-shadow: 0 8px 25px rgba(53, 90, 50, 0.3);
  }

  .hs-city-tab i {
    font-size: 1rem;
    color: inherit;
  }

  .hs-city-tab.active i {
    color: #d4a853;
  }

  .hs-city-name {
    text-transform: capitalize;
    letter-spacing: 0.5px;
  }

  .hs-city-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 8px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .hs-city-tab.active .hs-city-count {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .hs-charter-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    text-align: center;
  }

  .hs-charter-title {
    font-size: 2.6rem;
    font-weight: 800;
    color: #355a32;
    margin-bottom: 16px;
  }

  .hs-location-header {
    display: inline-flex;
    align-items: center;
    gap: 18px;
    padding: 18px 26px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.92);
    color: #122114;
  }

  .hs-location-header i {
    color: #355a32;
    font-size: 1.5rem;
  }

  .hs-location-header h1 {
    font-size: 1.9rem;
    font-weight: 800;
    margin: 0;
    color: #122114;
  }

  .hs-available-count {
    margin: 8px 0 0;
    display: block;
    color: #5f7063;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .hs-daycharter-badge {
    position: absolute;
    top: 24px;
    left: 24px;
    background: #355a32;
    color: white;
    padding: 9px 20px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    z-index: 2;
  }

  .hs-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .hs-spec-item {
    background: rgba(53, 90, 50, 0.08);
    color: #122114;
    padding: 14px 18px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: 140px;
    font-weight: 600;
  }

  .hs-spec-item i {
    color: #355a32;
    min-width: 22px;
  }

  .hs-pricing {
    display: grid;
    gap: 12px;
  }

  .hs-pricing-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid rgba(15,40,24,0.08);
    font-size: 0.9rem;
    font-weight: 400;
  }

  .hs-pricing-row strong {
    color: #122114;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .hs-book-btn {
    width: 100%;
    max-width: 320px;
    background: linear-gradient(135deg, #0f2818, #1a4d35);
    color: white;
    padding: 18px 24px;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hs-book-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 50px rgba(15, 40, 24, 0.16);
  }

  .hs-no-results {
    text-align: center;
    padding: 80px 20px;
    background: #ffffff;
    border-radius: 28px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  }

  .hs-no-results p {
    font-size: 1.2rem;
    color: #5f7063;
  }

  .hs-city-section {
    margin-bottom: 60px;
  }

  .hs-city-section:last-child {
    margin-bottom: 0;
  }

  .hs-charter-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(240px, 1fr));
    gap: 28px;
  }

  .hs-charter-card {
    background: #ffffff;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(15, 40, 24, 0.12);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }

  .hs-charter-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 24px 50px rgba(15, 40, 24, 0.16);
    cursor: pointer;
  }

  .hs-charter-image {
    position: relative;
    height: 210px;
    overflow: hidden;
  }

  .hs-charter-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease, opacity 0.4s ease;
  }

  .hs-view-details-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.85);
    background: rgba(255, 255, 255, 0.92);
    color: #355a32;
    border: 2px solid #355a32;
    padding: 12px 20px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 12px 30px rgba(15, 40, 24, 0.18);
    z-index: 2;
    pointer-events: auto;
    cursor: pointer;
    text-decoration: none;
  }

  .hs-charter-card:hover .hs-view-details-overlay {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
    pointer-events: auto;
  }

  .hs-charter-card:hover .hs-charter-image img {
    transform: scale(1.08);
    opacity: 0.32;
  }

  .hs-view-details-overlay:hover {
    background: #355a32;
    color: white;
    border-color: #355a32;
  }

  .hs-charter-info {
    padding: 20px;
  }

  .hs-charter-name {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .hs-charter-location {
    color: #355a32;
    font-size: 0.85rem;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;
  }

  .hs-charter-specs {
    display: grid;
    grid-template-columns: repeat(2, minmax(90px, 1fr));
    gap: 10px;
    margin-bottom: 16px;
    color: #5f7063;
    font-size: 0.88rem;
  }

  .hs-charter-specs div {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f4f7f2;
    padding: 10px 12px;
    border-radius: 12px;
    font-weight: 400;
    font-size: 0.82rem;
  }

  .hs-charter-specs i {
    color: #355a32;
    min-width: 18px;
  }

  .hs-pricing {
    display: grid;
    gap: 8px;
    margin-bottom: 18px;
  }

  .hs-charter-card .hs-pricing-row {
    padding: 10px 0;
    border-bottom: 1px solid rgba(15, 40, 24, 0.06);
    font-size: 0.9rem;
  }

  .hs-charter-card .hs-pricing-row:last-child {
    border-bottom: none;
  }

  .hs-charter-card .hs-book-btn {
    width: 100%;
    padding: 14px 20px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .hs-charter-card .hs-book-btn:hover {
    box-shadow: 0 16px 45px rgba(15,40,24,0.18);
  }

  @media (max-width: 1280px) {
    .hs-charter-grid {
      grid-template-columns: repeat(3, minmax(260px, 1fr));
    }
  }

  @media (max-width: 980px) {
    .hs-charter-grid {
      grid-template-columns: repeat(2, minmax(280px, 1fr));
    }
    .fas.fa-anchor {
  margin-bottom: 1px !important;
}
  }

  @media (max-width: 700px) {
    .hs-location-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
      padding: 16px 20px;
    }
    .fas.fa-anchor {
  margin-bottom: 1px;
}

    .hs-charter-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 520px) {
    .hs-container {
      padding: 0 16px;
    }

    .hs-charter-info {
      padding: 20px;
    }
    
  }
  .fas.fa-anchor {
  margin-bottom: 30px;
}

   /* Header */
    .hs-listings-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .hs-section-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, rgba(65, 107, 60, 0.1), rgba(65, 107, 60, 0.05));
      color: #0f2818;
      padding: 8px 20px;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .hs-page-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      color: #0f2818;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    .hs-subtitle {
      font-size: 1.1rem;
      color: #5f7063;
      max-width: 600px;
      margin: 0 auto;
    }

     /* Main Layout */
     .hs-listings-main {
       display: grid;
       grid-template-columns: 300px 1fr;
       gap: 40px;
       align-items: start;
     }

     /* Responsive City Tabs */
     @media (max-width: 768px) {
       .hs-city-tabs-wrapper {
         position: static;
         margin-bottom: 30px;
       }

       .hs-city-tabs {
         gap: 8px;
       }

       .hs-city-tab {
         padding: 10px 16px;
         font-size: 0.85rem;
         gap: 6px;
       }

       .hs-city-name {
         display: inline;
       }

       .hs-city-count {
         display: inline-flex;
       }
     }

     @media (max-width: 480px) {
       .hs-city-tabs-wrapper {
         padding: 15px 0 20px;
       }

       .hs-city-tab {
         padding: 8px 12px;
         font-size: 0.8rem;
       }

       .hs-city-count {
         min-width: 20px;
         height: 20px;
         font-size: 0.75rem;
       }
     }
</style>