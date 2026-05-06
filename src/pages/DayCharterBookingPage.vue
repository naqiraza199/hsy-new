<template>
    <NavbarSection />

    <!-- Full Page Loader Overlay -->
    <div v-if="loading" class="hs-page-loader-overlay">
      <div class="hs-page-loader-content">
        <div class="hs-page-loader-spinner">
          <div class="hs-page-loader-ring"></div>
          <div class="hs-page-loader-ring"></div>
          <div class="hs-page-loader-ring"></div>
        </div>
        <p class="hs-page-loader-text">Loading yacht details...</p>
      </div>
    </div>

    <div v-else>
<!-- Page Header -->
   <header class="page-header">
     <div class="header-inner">
       <div class="header-label">
         <i class="fas fa-calendar-check"></i>
         Booking Request
       </div>
       <h1 class="header-title">{{ pageTitle }}</h1>
       <p class="header-subtitle">
         {{ pageSubtitle }}
       </p>
     </div>

    <!-- Breadcrumb -->
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-separator">
          <i class="fas fa-chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/day-charter">Day Charter</router-link>
        </li>
        <li class="breadcrumb-separator">
          <i class="fas fa-chevron-right"></i>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Book Now
        </li>
      </ol>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="main-content">

     <!-- Boat Info Card (Sticky) -->
     <aside class="boat-card" v-if="listing">
       <div class="boat-image">
         <img :src="listingImage" :alt="listing.yacht_name">
         <span class="boat-badge">{{ boatBadgeText }}</span>
       </div>
         <div class="boat-details">
         <h2 class="boat-title">{{ listing.year }} {{ listing.manufacturer }} {{ listing.yacht_name }}</h2>
         <p class="boat-subtitle">{{ boatSubtitleText }}</p>
        <div class="boat-specs">
          <div class="spec-item">
            <i class="fas fa-users"></i>
            <span>Up to {{ listing.metadata?.max_capacity || '12' }} Guests</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-ruler-combined"></i>
            <span>{{ listing.length }} ft Length</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-clock"></i>
            <span>{{ getAvailableHours() }}</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ displayLocation }}</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- No Listing Found -->
    <div v-else-if="!loading" class="hs-no-listing">
      <div class="hs-no-listing-content">
        <i class="fas fa-ship"></i>
        <h3>Listing Not Found</h3>
        <p>Sorry, we couldn't find the yacht you're looking for.</p>
        <a href="/day-charter" class="hs-back-link"> Browse Day Charter Yachts</a>
      </div>
    </div>

    <!-- Booking Form -->
    <div class="form-card" v-if="listing">
      <div class="form-header">
        <h2><i class="fas fa-edit"></i> Complete Your Booking</h2>
        <p>Fill in your details and we'll get back to you shortly</p>
      </div>

       <form class="form-body" @submit.prevent="handleSubmit">

          <div class="form-row">
            <div class="form-group">
              <label class="required">Duration</label>
               <select v-model="formData.duration" name="duration" required>
                 <option value="">Select duration</option>
                 <template v-if="!isTermCharter">
                   <option v-if="listing?.metadata?.pricing?.retail?.two_hour" value="two_hour">2 Hours - {{ formatCurrency(listing.metadata.pricing.retail.two_hour) }}</option>
                   <option v-if="listing?.metadata?.pricing?.retail?.four_hour" value="four_hour">4 Hours - {{ formatCurrency(listing.metadata.pricing.retail.four_hour) }}</option>
                   <option v-if="listing?.metadata?.pricing?.retail?.six_hour" value="six_hour">6 Hours - {{ formatCurrency(listing.metadata.pricing.retail.six_hour) }}</option>
                   <option v-if="listing?.metadata?.pricing?.retail?.eight_hour" value="eight_hour">8 Hours - {{ formatCurrency(listing.metadata.pricing.retail.eight_hour) }}</option>
                   <option v-if="listing?.metadata?.pricing?.retail?.two_day" value="two_day">2 Days - {{ formatCurrency(listing.metadata.pricing.retail.two_day) }}</option>
                   <option v-if="listing?.metadata?.pricing?.retail?.three_day" value="three_day">3 Days - {{ formatCurrency(listing.metadata.pricing.retail.three_day) }}</option>
                   <option v-if="listing?.metadata?.pricing?.retail?.weekly" value="weekly">Weekly - {{ formatCurrency(listing.metadata.pricing.retail.weekly) }}</option>
                 </template>
                 <template v-else>
                   <option v-if="listing?.metadata?.pricing?.retail?.daily" value="daily">Daily - {{ formatCurrency(listing.metadata.pricing.retail.daily) }}</option>
                   <option v-if="listing?.metadata?.pricing?.retail?.weekly" value="weekly">Weekly - {{ formatCurrency(listing.metadata.pricing.retail.weekly) }}</option>
                   <option v-if="listing?.metadata?.pricing?.retail?.monthly" value="monthly">Monthly - {{ formatCurrency(listing.metadata.pricing.retail.monthly) }}</option>
                 </template>
               </select>
            </div>
            <div class="form-group">
              <label class="required">Booking Date</label>
              <input type="date" v-model="formData.booking_date" name="booking_date" required>
            </div>
          </div>

         <div class="form-row">
           <div class="form-group">
             <label class="required">First Name</label>
             <input type="text" v-model="formData.first_name" name="first_name" placeholder="Enter first name" required>
           </div>
           <div class="form-group">
             <label class="required">Last Name</label>
             <input type="text" v-model="formData.last_name" name="last_name" placeholder="Enter last name" required>
           </div>
         </div>

         <div class="form-row">
           <div class="form-group">
             <label class="required">Phone</label>
             <input type="tel" v-model="formData.phone" name="phone" placeholder="+1 (555) 000-0000" required>
           </div>
           <div class="form-group">
             <label class="required">Email</label>
             <input type="email" v-model="formData.email" name="email" placeholder="your@email.com" required>
           </div>
         </div>

         <div class="form-row">
           <div class="form-group">
             <label class="required">City</label>
             <input type="text" v-model="formData.city" name="city" readonly required>
           </div>
           <div class="form-group">
             <label>Start Time</label>
             <input type="time" v-model="formData.time_start" name="start_time">
           </div>
         </div>

         <div class="form-group full-width">
           <label>Special Requests or Notes</label>
           <textarea v-model="formData.notes" name="notes" placeholder="Tell us about any special requirements, occasions, or preferences..."></textarea>
         </div>

         <button type="submit" class="submit-btn" :disabled="submitting">
           <span v-if="!submitting">Submit Booking Request</span>
           <span v-else>Processing...</span>
           <i v-if="!submitting" class="fas fa-arrow-right"></i>
           <i v-else class="fas fa-spinner fa-spin"></i>
         </button>

        <p class="form-note">
          By submitting, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>

      </form>
    </div>

     </main>

     <!-- Notification Toast -->
     <div v-if="notification.show" :class="['notification-toast', 'notification-' + notification.type]">
       <div class="notification-icon">
         <i v-if="notification.type === 'success'" class="fas fa-check-circle"></i>
         <i v-else class="fas fa-exclamation-circle"></i>
       </div>
       <div class="notification-content">
         <div class="notification-title">
           {{ notification.type === 'success' ? 'Success!' : 'Error' }}
         </div>
         <div class="notification-message">{{ notification.message }}</div>
       </div>
       <button class="notification-close" @click="notification.show = false">
         <i class="fas fa-times"></i>
       </button>
     </div>

     <FooterSection />
    </div>
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';
import listingsDataRaw from '../../listings.json';
import brokersDataRaw from '../../broker.json';

const listingsData = Array.isArray(listingsDataRaw) ? listingsDataRaw : [listingsDataRaw];
const brokersData = Array.isArray(brokersDataRaw) ? brokersDataRaw : [brokersDataRaw];

const SUPABASE_URL = 'https://qumgjqbfreeskjgltfvu.supabase.co/storage/v1/object/public/listings/';
const SUPABASE_ANON_KEY = 'a383d7d4-73ac-48a0-9312-ef4e82485ed9:6facdc70-afed-4677-863f-9387aa7f176a';

export default {
    name: 'DayCharterBookingPage',
    components: {
        NavbarSection,
        FooterSection,
    },
    data() {
        return {
            listing: null,
            loading: true,
            submitting: false,
            notification: {
                show: false,
                message: '',
                type: 'success' // 'success' | 'error'
            },
            formData: {
                duration: '',
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                city: '',
                booking_date: '',
                time_start: '',
                notes: ''
            }
        };
    },
        computed: {
         listingImage() {
             if (!this.listing?.metadata?.photos || this.listing.metadata.photos.length === 0) {
                 return 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80';
             }
             const firstPhoto = this.listing.metadata.photos[0];
             if (firstPhoto.startsWith('http')) {
                 return firstPhoto;
             }
             const path = firstPhoto.replace(/^\/media\/listings\//, '');
             return SUPABASE_URL + encodeURIComponent(path);
         },
         displayLocation() {
             if (!this.listing) return 'N/A';
             const city = this.listing.metadata?.city || this.listing.city || '';
             return city ? city.charAt(0).toUpperCase() + city.slice(1) : 'N/A';
         },
         isTermCharter() {
             return this.listing?.type === 'termcharter';
         },
         pageTitle() {
             return this.isTermCharter ? 'Term Charter Booking' : 'Day Charter Booking';
         },
         pageSubtitle() {
             if (this.isTermCharter) {
                 return 'Reserve your unforgettable yacht experience. Fill in the details below and we\'ll confirm your booking within 24 hours.';
             }
             return 'Reserve your unforgettable yacht experience. Fill in the details below and we\'ll confirm your booking within 24 hours.';
         },
         boatBadgeText() {
             return this.isTermCharter ? 'Term Charter' : 'Day Charter';
         },
         boatSubtitleText() {
             if (this.isTermCharter) {
                 return `${this.listing.manufacturer} • Term Charter`;
             }
             return `${this.listing.manufacturer} • Day Charter`;
         }
     },
    watch: {
        listing: {
            handler(newVal) {
                if (newVal) {
                    this.formData.city = this.displayLocation;
                }
            }
        }
    },
    methods: {
        formatCurrency(value) {
            if (!value) return '-';
            return new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD', 
                minimumFractionDigits: 0 
            }).format(value);
        },
        getAvailableHours() {
            const hours = [];
            const pricing = this.listing?.metadata?.pricing?.retail;
            if (pricing?.two_hour) hours.push('2');
            if (pricing?.four_hour) hours.push('4');
            if (pricing?.six_hour) hours.push('6');
            if (pricing?.eight_hour) hours.push('8');
            return hours.length > 0 ? hours.join(', ') + ' hrs' : '2–8 Hours';
        },
        showNotification(message, type = 'success') {
            this.notification = {
                show: true,
                message,
                type
            };
            setTimeout(() => {
                this.notification.show = false;
            }, 5000);
        },
        async handleSubmit() {
            if (!this.listing) {
                this.showNotification('Listing not found. Please try again.', 'error');
                return;
            }

            // Validate required fields
            const { duration, first_name, last_name, email, phone, city, booking_date } = this.formData;

            if (!duration || !first_name || !last_name || !email || !phone || !city || !booking_date) {
                this.showNotification('Please fill in all required fields.', 'error');
                return;
            }

             this.submitting = true;

             const payload = {
                 yacht_id: this.listing.id,
                 booking_type: this.isTermCharter ? 'termcharter' : 'daycharter',
                 duration: duration,
                 first_name: first_name,
                 last_name: last_name,
                 email: email,
                 phone: phone,
                 city: city,
                 booking_date: booking_date,
                 time_start: this.formData.time_start || null,
                 broker_id: this.listing.broker_id || null,
                 notes: this.formData.notes || null
             };

            try {
                const response = await fetch('https://qumgjqbfreeskjgltfvu.supabase.co/functions/v1/external-booking-api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'apikey': SUPABASE_ANON_KEY   // ← This is the most important fix
                    },
                    body: JSON.stringify(payload)
                });

                let result;
                try {
                    result = await response.json();
                } catch (e) {
                    result = { 
                        message: await response.text() || 'Invalid response from server' 
                    };
                }

                console.log('Booking API Response:', { 
                    status: response.status, 
                    ok: response.ok, 
                    result 
                });

                if (response.ok) {
                    this.showNotification(
                        'Your booking request has been submitted successfully! We will confirm within 24 hours.', 
                        'success'
                    );

                    // Reset form
                    this.formData = {
                        duration: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: '',
                        city: this.displayLocation,
                        booking_date: '',
                        time_start: '',
                        notes: ''
                    };
                } else {
                    const errorMsg = result.message || result.error || `Failed to submit booking (${response.status})`;
                    this.showNotification(errorMsg, 'error');
                    console.error('Booking failed:', result);
                }
            } catch (error) {
                console.error('Booking submission error:', error);
                this.showNotification(
                    'Unable to connect to booking service. Please check your connection and try again.', 
                    'error'
                );
            } finally {
                this.submitting = false;
            }
        },
        async loadListing() {
            this.loading = true;
            try {
                const slug = this.$route.params.slug;
                if (!slug) {
                    this.loading = false;
                    return;
                }

                let records = [];
                if (listingsData.length > 0 && listingsData[0].records) {
                    records = listingsData[0].records;
                }

                this.listing = records.find(item => item.slug === slug);

                if (!this.listing && slug) {
                    this.listing = records.find(item => this.generateSlug(item) === slug);
                }

                if (!this.listing && slug) {
                    this.listing = records.find(item => this.generateHomePageSlug(item) === slug);
                }

                if (!this.listing && slug) {
                    this.listing = records.find(item => item.id === slug);
                }

                if (!this.listing) {
                    try {
                        const mlsResponse = await fetch('/data/yacht-mls.json');
                        const mlsData = await mlsResponse.json();
                        for (const batch of mlsData) {
                            if (batch && batch.records) {
                                const found = batch.records.find(item =>
                                    item.slug === slug ||
                                    this.generateSlug(item) === slug ||
                                    item.id === slug
                                );
                                if (found) {
                                    this.listing = found;
                                    break;
                                }
                            }
                        }
                    } catch (e) {
                        console.error('Error loading MLS:', e);
                    }
                }
            } catch (error) {
                console.error('Error loading listing:', error);
            } finally {
                this.loading = false;
            }
        },
        generateSlug(listing) {
            if (!listing) return '';
            return `${listing.year}-${listing.manufacturer}-${listing.yacht_name}-day-charter`.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        },
        generateHomePageSlug(listing) {
            if (!listing) return '';
            const city = listing.metadata?.city || listing.city || '';
            const yachtName = listing.yacht_name || '';
            return `${listing.year}-${listing.manufacturer}-${yachtName}-${city ? city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'location'}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
    },
    mounted() {
        this.loadListing();
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
       background: linear-gradient(180deg, #fdfdfd 0%, #f8f9f7 100%);
       color: #102012;
       line-height: 1.7;
       min-height: 100vh;
       overflow-x: hidden;
       -webkit-font-smoothing: antialiased;
     }

     img {
       max-width: 100%;
       display: block;
     }

     /* ============================================
        FULL PAGE LOADER STYLES
     ============================================ */
     .hs-page-loader-overlay {
       position: fixed;
       top: 0;
       left: 0;
       width: 100vw;
       height: 100vh;
       background: linear-gradient(135deg, rgba(15, 40, 24, 0.92) 0%, rgba(26, 77, 53, 0.95) 100%);
       backdrop-filter: blur(8px);
       -webkit-backdrop-filter: blur(8px);
       display: flex;
       align-items: center;
       justify-content: center;
       z-index: 9999;
       animation: hs-page-loader-fade-in 0.3s ease-out;
     }

     .hs-page-loader-content {
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       gap: 32px;
     }

     .hs-page-loader-spinner {
       position: relative;
       width: 120px;
       height: 120px;
       display: flex;
       align-items: center;
       justify-content: center;
     }

     .hs-page-loader-ring {
       position: absolute;
       border-radius: 50%;
       border: 5px solid transparent;
       animation: hs-page-loader-spin 1.8s cubic-bezier(0.68, 0, 0.3, 0.7) infinite;
     }

     .hs-page-loader-ring:nth-child(1) {
       width: 100%;
       height: 100%;
       border-top-color: rgba(255, 255, 255, 0.9);
       animation-delay: 0s;
     }

     .hs-page-loader-ring:nth-child(2) {
       width: 80%;
       height: 80%;
       border-right-color: rgba(107, 168, 96, 0.85);
       animation-delay: 0.2s;
       animation-direction: reverse;
     }

     .hs-page-loader-ring:nth-child(3) {
       width: 60%;
       height: 60%;
       border-bottom-color: rgba(255, 255, 255, 0.7);
       animation-delay: 0.4s;
     }

     @keyframes hs-page-loader-spin {
       0% {
         transform: rotate(0deg);
       }
       100% {
         transform: rotate(360deg);
       }
     }

     @keyframes hs-page-loader-fade-in {
       from {
         opacity: 0;
       }
       to {
         opacity: 1;
       }
     }

     .hs-page-loader-text {
       font-size: 1.25rem;
       font-weight: 600;
       color: rgba(255, 255, 255, 0.95);
       letter-spacing: 1.5px;
       text-transform: uppercase;
       animation: hs-page-loader-pulse 2s ease-in-out infinite;
     }

     @keyframes hs-page-loader-pulse {
       0%, 100% {
         opacity: 0.85;
         transform: scale(1);
       }
       50% {
         opacity: 1;
         transform: scale(1.02);
       }
     }

     /* No Listing Found */
     .hs-no-listing {
       display: flex;
       align-items: center;
       justify-content: center;
       min-height: 60vh;
       padding: 60px 24px;
     }

     .hs-no-listing-content {
       text-align: center;
       max-width: 500px;
     }

     .hs-no-listing-content i {
       font-size: 4rem;
       color: #355a32;
       margin-bottom: 24px;
       opacity: 0.6;
     }

     .hs-no-listing-content h3 {
       font-size: 1.75rem;
       font-weight: 800;
       color: #1a3a2a;
       margin-bottom: 12px;
     }

     .hs-no-listing-content p {
       color: #5f6d60;
       margin-bottom: 32px;
       font-size: 1.1rem;
     }

     .hs-back-link {
       display: inline-flex;
       align-items: center;
       gap: 8px;
       background: linear-gradient(135deg, #1a3a2a, #2d5a45);
       color: white;
       padding: 16px 32px;
       border-radius: 999px;
       text-decoration: none;
       font-weight: 600;
       transition: transform 0.3s ease, box-shadow 0.3s ease;
     }

     .hs-back-link:hover {
       transform: translateY(-2px);
       box-shadow: 0 12px 30px rgba(15, 40, 24, 0.2);
     }

     /* Responsive Page Loader */
     @media (max-width: 768px) {
       .hs-page-loader-spinner {
         width: 100px;
         height: 100px;
       }

       .hs-page-loader-ring:nth-child(2) {
         width: 75%;
         height: 75%;
       }

       .hs-page-loader-ring:nth-child(3) {
         width: 55%;
         height: 55%;
       }

       .hs-page-loader-text {
         font-size: 1.1rem;
         letter-spacing: 1px;
       }
     }

     @media (max-width: 480px) {
       .hs-page-loader-spinner {
         width: 80px;
         height: 80px;
       }

       .hs-page-loader-ring {
         border-width: 4px;
       }

       .hs-page-loader-ring:nth-child(2) {
         width: 70%;
         height: 70%;
       }

       .hs-page-loader-ring:nth-child(3) {
         width: 50%;
         height: 50%;
       }

       .hs-page-loader-text {
         font-size: 1rem;
       }
     }

     @media (max-width: 360px) {
       .hs-page-loader-spinner {
         width: 70px;
         height: 70px;
       }

       .hs-page-loader-text {
         font-size: 0.9rem;
       }
     }

    /* ===================== PAGE HEADER ===================== */
    .page-header {
      position: relative;
      background: linear-gradient(135deg, rgba(15, 40, 24, 0.94) 0%, rgba(22, 101, 52, 0.88) 100%),
        url('https://images.unsplash.com/photo-1569263979109-5d6d7d6b5b5f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF5JTIwY2hhcnRlcnxlbnwwfHwwfHx8MA%3D%3D') center/cover no-repeat;
      min-height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 24px 100px;
      color: white;
      margin-bottom: 0;
    }

    .page-header::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.35) 100%);
      pointer-events: none;
    }

    .header-inner {
      position: relative;
      z-index: 2;
      max-width: 800px;
      animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .header-label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      font-size: 0.75rem;
      font-weight: 800;
      margin-bottom: 24px;
      padding: 10px 24px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      border-radius: 999px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .header-label i {
      color: #d4a853;
      font-size: 0.85rem;
    }

    .header-title {
      font-size: clamp(2.5rem, 5.5vw, 3.5rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 20px;
      text-shadow: 0 4px 30px rgba(0,0,0,0.4);
    }

    .header-subtitle {
      font-size: clamp(1.1rem, 1.8vw, 1.25rem);
      color: rgba(255,255,255,0.9);
      line-height: 1.7;
      max-width: 650px;
      margin: 0 auto;
      font-weight: 500;
    }

     /* ===================== BREADCRUMB ===================== */
     .breadcrumb-nav {
       position: absolute;
       bottom: 40px;
       left: 0;
       right: 0;
       display: flex;
       justify-content: center;
       z-index: 3;
       padding: 0 20px;
       box-sizing: border-box;
     }

     .breadcrumb-list {
       display: flex;
       align-items: center;
       gap: 8px;
       background: rgba(255,255,255,0.1);
       backdrop-filter: blur(12px);
       border: 1px solid rgba(255,255,255,0.15);
       padding: 10px 24px;
       border-radius: 999px;
       list-style: none;
       margin: 0;
       flex-wrap: wrap;
       justify-content: center;
     }

     .breadcrumb-item a {
       color: rgba(255,255,255,0.85);
       text-decoration: none;
       font-size: 0.9rem;
       font-weight: 500;
       transition: color 0.3s ease;
       white-space: nowrap;
     }

     .breadcrumb-item a:hover {
       color: white;
     }

     .breadcrumb-item.active {
       color: white;
       font-size: 0.9rem;
       font-weight: 600;
     }

     .breadcrumb-separator {
       color: rgba(255,255,255,0.5);
       font-size: 0.8rem;
       flex-shrink: 0;
     }

    /* ===================== MAIN CONTENT ===================== */
    .main-content {
      max-width: 1280px;
      margin: 100px auto 0;
      padding: 0 24px 120px;
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 60px;
      align-items: start;
    }

    /* ===================== BOAT INFO CARD ===================== */
    .boat-card {
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
      border: 1px solid rgba(15, 40, 24, 0.1);
      position: sticky;
      top: 120px;
      animation: fadeInUp 0.6s ease-out 0.2s both;
    }

    .boat-image {
      position: relative;
      height: 280px;
      overflow: hidden;
    }

    .boat-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .boat-card:hover .boat-image img {
      transform: scale(1.05);
    }

    .boat-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 700;
      color: #1a3a2a;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .boat-details {
      padding: 32px;
    }

    .boat-title {
      font-size: 1.75rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 8px;
    }

    .boat-subtitle {
      font-size: 1.1rem;
      color: #355a32;
      font-weight: 600;
      margin-bottom: 24px;
    }

    .boat-specs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .spec-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #5f6d60;
      font-size: 0.95rem;
    }

    .spec-item i {
      color: #355a32;
      font-size: 1.1rem;
      width: 20px;
    }

    .boat-features {
      border-top: 1px solid rgba(15, 40, 24, 0.1);
      padding-top: 24px;
    }

    .boat-features h4 {
      font-size: 1rem;
      font-weight: 700;
      color: #1a3a2a;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .boat-features h4 i {
      color: #d4a853;
      font-size: 1.1rem;
    }

    .feature-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .feature-tag {
      background: #f8faf6;
      color: #5f6d60;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 500;
      border: 1px solid rgba(15, 40, 24, 0.08);
    }

    /* ===================== FORM CARD ===================== */
    .form-card {
      background: #ffffff;
      border-radius: 32px;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
      border: 1px solid rgba(15, 40, 24, 0.1);
      overflow: hidden;
      animation: fadeInUp 0.6s ease-out 0.3s both;
    }

    .form-header {
      padding: 32px 32px 24px;
      background: linear-gradient(135deg, #f8faf6 0%, rgba(53, 90, 50, 0.04) 100%);
      border-bottom: 1px solid rgba(15, 40, 24, 0.08);
    }

    .form-header h2 {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1a3a2a;
      margin: 0 0 8px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .form-header h2 i {
      color: #355a32;
      font-size: 1.3rem;
    }

    .form-header p {
      color: #5f6d60;
      font-size: 1rem;
      margin: 0;
    }

    .form-body {
      padding: 32px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 0;
    }

    .form-group {
      margin-bottom: 24px;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    label {
      display: block;
      font-weight: 600;
      color: #1a3a2a;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    .required::after {
      content: " *";
      color: #ef4444;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 16px 18px;
      border: 2px solid #e8ebe7;
      border-radius: 12px;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
      transition: all 0.3s ease;
      background: #ffffff;
      color: #102012;
    }

    input:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: #355a32;
      box-shadow: 0 0 0 4px rgba(65, 107, 60, 0.1);
      background: #ffffff;
    }

    input::placeholder,
    textarea::placeholder {
      color: #a8a8a8;
    }

    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235f6d60' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      background-size: 18px;
      padding-right: 48px;
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      width: 100%;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      border: none;
      padding: 18px;
      font-size: 1.1rem;
      font-weight: 700;
      border-radius: 12px;
      cursor: pointer;
      margin-top: 10px;
      transition: all 0.4s ease;
      box-shadow: 0 8px 25px rgba(65, 107, 60, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      letter-spacing: 0.03em;
    }

    .submit-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(65, 107, 60, 0.45);
    }

    .submit-btn i {
      font-size: 0.9rem;
      transition: transform 0.3s ease;
    }

    .submit-btn:hover i {
      transform: translateX(4px);
    }

       .submit-btn:disabled {
         opacity: 0.7;
         cursor: not-allowed;
       }

       .form-note {
         text-align: center;
         font-size: 0.8rem;
         color: #5f6d60;
         margin-top: 24px;
       }

       .form-note a {
         color: #355a32;
         font-weight: 600;
         text-decoration: none;
       }

       .form-note a:hover {
         text-decoration: underline;
       }

      /* Notification Toast */
      .notification-toast {
        position: fixed;
        top: 24px;
        right: 24px;
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 18px 20px;
        border-radius: 14px;
        z-index: 10000;
        max-width: 360px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        animation: notification-slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .notification-toast.notification-success {
        background: #1a3a2a;
        color: white;
      }

      .notification-toast.notification-error {
        background: #8b2a2a;
        color: white;
      }

      .notification-icon {
        font-size: 1.4rem;
        margin-top: 2px;
      }

      .notification-success .notification-icon {
        color: #60c060;
      }

      .notification-error .notification-icon {
        color: #ff8a8a;
      }

      .notification-content {
        flex: 1;
        min-width: 0;
      }

      .notification-title {
        font-size: 0.9rem;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .notification-message {
        font-size: 0.85rem;
        opacity: 0.9;
        line-height: 1.5;
      }

      .notification-close {
        background: none;
        border: none;
        color: inherit;
        opacity: 0.6;
        cursor: pointer;
        padding: 4px;
        font-size: 1rem;
        transition: opacity 0.2s;
      }

      .notification-close:hover {
        opacity: 1;
      }

      @keyframes notification-slide-in {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @media (max-width: 480px) {
        .notification-toast {
          top: 16px;
          right: 16px;
          left: 16px;
          max-width: none;
        }
      }

      /* ===================== SCROLL ANIMATIONS ===================== */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* ===================== RESPONSIVE DESIGN ===================== */
    @media (max-width: 1200px) {
      .main-content {
        gap: 50px;
        margin: 90px auto 0;
        padding: 0 20px 100px;
      }
      
      .page-header {
        min-height: 450px;
        padding: 110px 20px 90px;
      }
    }
    
     @media (max-width: 992px) {
       .main-content {
         grid-template-columns: 1fr;
         gap: 30px;
         margin: 70px auto 0;
         padding: 0 16px 70px;
       }
       
       .boat-card {
         position: static;
         top: auto;
         margin-bottom: 16px;
       }
       
       .page-header {
         min-height: 360px;
         padding: 80px 16px 80px;
       }
       
       .header-inner {
         padding-bottom: 40px;
       }
       
       .header-title {
         font-size: clamp(2rem, 5.5vw, 2.8rem);
       }
       
       .breadcrumb-nav {
         position: relative;
         bottom: auto;
         padding: 0 16px;
         margin-top: 20px;
       }
       
       .breadcrumb-list {
         padding: 8px 16px;
       }
       
       .breadcrumb-item a,
       .breadcrumb-item.active {
         font-size: 0.85rem;
       }
     }
    
     @media (max-width: 768px) {
       .main-content {
         gap: 24px;
         margin: 50px auto 0;
         padding: 0 14px 50px;
       }

       .breadcrumb-nav {
         display: none;
       }

       .page-header{
        padding: 110px 12px 50px !important;
       }
       
       .page-header {
         min-height: 300px;
         padding: 60px 14px 50px;
       }
       
       .header-inner {
         padding-bottom: 30px;
       }
       
       .header-title {
         font-size: clamp(1.8rem, 6vw, 2.4rem);
       }
       
       .header-subtitle {
         font-size: clamp(0.9rem, 2.2vw, 1rem);
       }
       
       .header-label {
         font-size: 0.65rem;
         gap: 5px;
         padding: 5px 14px;
       }
       
       .header-label i {
         font-size: 0.65rem;
       }
       
       .breadcrumb-nav {
         margin-top: 16px;
         padding: 0 14px;
       }
       
       .breadcrumb-list {
         gap: 4px;
         padding: 6px 12px;
       }
       
       .breadcrumb-item a,
       .breadcrumb-item.active {
         font-size: 0.75rem;
       }
       
       .breadcrumb-separator {
         font-size: 0.65rem;
       }
     }
    
     @media (max-width: 480px) {
       .main-content {
         gap: 16px;
         margin: 30px auto 0;
         padding: 0 12px 30px;
       }
       
       .page-header {
         min-height: 250px;
         padding: 50px 12px 50px;
       }
       
       .header-inner {
         padding-bottom: 24px;
       }
       
       .header-label {
         font-size: 0.6rem;
         gap: 4px;
         padding: 4px 10px;
         letter-spacing: 1.5px;
       }
       
       .header-label i {
         font-size: 0.6rem;
       }
       
       .header-title {
         font-size: clamp(1.6rem, 7vw, 2rem);
       }
       
       .header-subtitle {
         font-size: clamp(0.85rem, 3vw, 0.9rem);
         line-height: 1.5;
       }
       
       .breadcrumb-nav {
         margin-top: 14px;
         padding: 0 10px;
       }
       
       .breadcrumb-list {
         gap: 3px;
         padding: 5px 10px;
       }
       
       .breadcrumb-item a {
         font-size: 0.7rem;
       }
       
       .breadcrumb-item.active {
         font-size: 0.7rem;
       }
       
       .breadcrumb-separator {
         font-size: 0.6rem;
       }
        
       .boat-card {
         border-radius: 16px;
       }

       .boat-image {
         height: 160px;
       }

       .boat-badge {
         padding: 5px 10px;
         font-size: 0.65rem;
         top: 12px;
         right: 12px;
       }

       .boat-details {
         padding: 16px;
       }

       .boat-title {
         font-size: 1.25rem;
       }

       .boat-subtitle {
         font-size: 0.85rem;
       }

       .boat-specs {
         grid-template-columns: 1fr;
         gap: 8px;
         margin-bottom: 16px;
       }

       .spec-item {
         gap: 5px;
         font-size: 0.85rem;
         justify-content: flex-start;
       }

       .spec-item i {
         font-size: 0.9rem;
         width: 18px;
       }

       .form-card {
         border-radius: 16px;
       }

       .form-header {
         padding: 16px 16px 12px;
       }

       .form-header h2 {
         font-size: 1.1rem;
       }

       .form-header h2 i {
         font-size: 1rem;
       }

       .form-header p {
         font-size: 0.85rem;
       }

       .form-body {
         padding: 16px;
       }

       .form-row {
         grid-template-columns: 1fr;
         gap: 10px;
       }

       .form-group {
         margin-bottom: 14px;
       }

       label {
         font-size: 0.8rem;
         margin-bottom: 4px;
       }

       input,
       select,
       textarea {
         padding: 10px 12px;
         font-size: 0.85rem;
       }

       textarea {
         min-height: 85px;
       }

       .submit-btn {
         padding: 12px;
         font-size: 0.9rem;
         font-weight: 600;
       }

       .form-note {
         font-size: 0.7rem;
         margin-top: 14px;
       }
     }
      
      .notification-icon {
        font-size: 1.2rem;
      }
      
      .notification-title {
        font-size: 0.85rem;
      }
      
      .notification-message {
        font-size: 0.8rem;
      }
    
    
     @media (max-width: 360px) {
       .page-header {
         min-height: 230px;
         padding: 45px 10px 35px;
       }
       
       .header-inner {
         padding-bottom: 16px;
       }

       .header-label {
         font-size: 0.55rem;
         padding: 4px 8px;
         letter-spacing: 1px;
       }
       
       .header-label i {
         font-size: 0.55rem;
       }

       .header-title {
         font-size: clamp(1.4rem, 8vw, 1.8rem);
       }

       .header-subtitle {
         font-size: clamp(0.8rem, 3.5vw, 0.85rem);
       }

       .breadcrumb-list {
         gap: 2px;
         padding: 4px 8px;
       }

       .breadcrumb-item a,
       .breadcrumb-item.active {
         font-size: 0.65rem;
       }

       .breadcrumb-separator {
         font-size: 0.55rem;
       }

       .boat-image {
         height: 140px;
       }

       .boat-details {
         padding: 12px;
       }

       .boat-title {
         font-size: 1.1rem;
       }

       .boat-subtitle {
         font-size: 0.8rem;
       }

       .spec-item {
         font-size: 0.8rem;
       }

       .spec-item i {
         font-size: 0.85rem;
         width: 16px;
       }

       .form-header h2 {
         font-size: 1rem;
       }

       .form-body {
         padding: 12px;
       }

       .form-group {
         margin-bottom: 12px;
       }

       .submit-btn {
         padding: 10px;
         font-size: 0.85rem;
       }
     }
</style>