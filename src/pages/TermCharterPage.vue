<template>
    <NavbarSection />

<header class="page-hero">
  <div class="page-hero-content">
    <h1 class="hero-title">Term Charter</h1>
    <p class="hero-copy">Experience the pinnacle of yacht ownership with our curated long-term charter programs. Premium service, elegant vessels, and Florida's most exclusive destinations await.</p>
    
  </div>
</header>

<section class="section-shell">
  <div class="term-tabs">
    <input type="radio" id="tab-purchasing" name="term-tab" checked>
    <input type="radio" id="tab-selling" name="term-tab">
    <input type="radio" id="tab-chartering" name="term-tab">

    <div class="term-controls">
      <label for="tab-purchasing">
        <i class="fas fa-shopping-bag"></i>
        Purchasing
      </label>
      <label for="tab-selling">
        <i class="fas fa-tag"></i>
        Selling
      </label>
      <label for="tab-chartering">
        <i class="fas fa-ship"></i>
        Chartering
      </label>
    </div>

    <div class="tab-panels">
      <div class="tab-panel panel-purchasing">
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-phone-alt"></i></div>
          <p class="step-title">Contact</p>
          <p class="step-text">Connect with our expert advisors to discuss your goals.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-search"></i></div>
          <p class="step-title">Review</p>
          <p class="step-text">Explore curated selections matched to your criteria.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-file-contract"></i></div>
          <p class="step-title">Proposal</p>
          <p class="step-text">Receive a comprehensive proposal with options.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-clipboard-check"></i></div>
          <p class="step-title">Arrange</p>
          <p class="step-text">Schedule inspections and finalize contract details.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-check-circle"></i></div>
          <p class="step-title">Close</p>
          <p class="step-text">Complete the acquisition and prepare for service.</p>
        </div>
      </div>

      <div class="tab-panel panel-selling">
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-calculator"></i></div>
          <p class="step-title">Evaluate</p>
          <p class="step-text">Get a professional market appraisal.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-bullhorn"></i></div>
          <p class="step-title">Market</p>
          <p class="step-text">List with premium exposure to buyers.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-handshake"></i></div>
          <p class="step-title">Negotiate</p>
          <p class="step-text">Secure optimal terms for your asset.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-file-signature"></i></div>
          <p class="step-title">Close</p>
          <p class="step-text">Finalize the sale with expert support.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-star"></i></div>
          <p class="step-title">Deliver</p>
          <p class="step-text">Transfer ownership smoothly.</p>
        </div>
      </div>

      <div class="tab-panel panel-chartering">
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-compass"></i></div>
          <p class="step-title">Plan</p>
          <p class="step-text">Select the perfect charter package.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-calendar-check"></i></div>
          <p class="step-title">Schedule</p>
          <p class="step-text">Book your dates and itinerary.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-user-tie"></i></div>
          <p class="step-title">Crew</p>
          <p class="step-text">Meet your professional crew.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-sunset"></i></div>
          <p class="step-title">Experience</p>
          <p class="step-text">Enjoy an exceptional voyage.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-camera"></i></div>
          <p class="step-title">Return</p>
          <p class="step-text">Disembark with memories.</p>
        </div>
      </div>
    </div>

    <div class="step-footer">
      <a href="#" class="step-cta">
        <i class="fas fa-phone"></i>
        Call Us Today
      </a>
    </div>

  </div>
</section>
  <section class="term-listings">
    <div class="term-listings-inner">
      <div class="listings-header">
        <span class="section-tag"><i class="fas fa-ship"></i> TermCharter</span>
        <h2 class="listings-title">Boats Term Charter</h2>
      </div>
      <div class="term-listings-grid">
        <article 
          v-for="listing in termcharterListings" 
          :key="listing.id" 
          class="term-card"
        >
          <div class="term-card-image">
            <img 
              :src="getImageUrl(listing.photos[0])" 
              :alt="listing.yachtName"
              @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80')"
            >
          </div>
          <div class="term-card-body">
            <h3>{{ listing.manufacturer }} {{ listing.length }}</h3>
            <p class="term-card-location"><i class="fas fa-map-marker-alt"></i> {{ formatCity(listing.city) }}</p>
            <div class="term-card-specs">
              <div class="term-card-spec"><span>Year</span><strong>{{ listing.year }}</strong></div>
              <div class="term-card-spec"><span>Length</span><strong>{{ listing.length }} ft</strong></div>
            </div>
            <router-link :to="'/listing-detail/' + getListingSlug(listing)" class="term-card-button">View Details <i class="fas fa-arrow-right"></i></router-link>
          </div>
        </article>
      </div>
      <div v-if="termcharterListings.length === 0" class="no-listings">
        <p>No term charter yachts available at the moment. Please check back later.</p>
      </div>
    </div>
  </section>


    <section class="term-info">
      <div class="term-info-inner">
        <div class="term-info-row">
          <div class="term-info-image">
            <img src="/images/ts1.webp" alt="Term charter yacht on the water">
          </div>
          <div class="term-info-copy">
            <h2>What is a Term Charter?</h2>
            <p>A term charter provides extended access to a luxury yacht, enabling guests to enjoy multiple destinations and relaxed travel over several days or weeks. It blends the freedom of private yachting with professional crew service, tailored itineraries, and elevated on-board comfort.</p>
          </div>
        </div>

        <div class="term-info-row">
          <div class="term-info-copy">
            <h2>Why Choose High Seas Yachting for Term Charters?</h2>
            <p>Our expert team crafts bespoke term charter experiences with premium yachts, seamless logistics, and concierge-level support. From route planning to on-board service, each charter is built around your preferences for a truly memorable voyage.</p>
          </div>
          <div class="term-info-image">
            <img src="/images/ts2.webp" alt="Luxury yacht interior and service">
          </div>
        </div>
      </div>
    </section>

    <section class="term-contact">
      <div class="term-contact-inner">
        <div class="term-contact-grid">
          <div class="term-contact-copy">
            <span class="section-tag"><i class="fas fa-anchor"></i> Charter with us</span>
            <h2>Secure your next term charter booking</h2>
            <p>Send your details and our team will connect you with the ideal yacht, tailored itinerary, and premium on-board experience for your next long-term charter.</p>
            
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-phone-alt"></i>
                <span>+1 (954) 686-1671</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>Sales@highseasyachting.com</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>Fort Lauderdale, Florida</span>
              </div>
            </div>
          </div>

          <form class="term-contact-form" id="termContactForm" @submit.prevent="submitLeadForm">
            <div class="form-row">
              <div class="form-field">
                <input type="text" name="first_name" placeholder="First Name *" required maxlength="100">
              </div>
              <div class="form-field">
                <input type="text" name="last_name" placeholder="Last Name *" required maxlength="100">
              </div>
            </div>

            <div class="form-row">
              <div class="form-field">
                <input type="email" name="email" placeholder="Your Email *" required maxlength="255">
              </div>
              <div class="form-field">
                <input type="tel" name="phone" placeholder="Your Phone Number" maxlength="30">
              </div>
            </div>

            <div class="form-row full">
              <div class="form-field">
                <select name="interest_type" required>
                  <option value="">Choose your interest</option>
                  <option value="Term Charter">Term Charter</option>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                  <option value="Day Charter">Day Charter</option>
                  <option value="Management">Management</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-field">
                <input type="text" name="city" placeholder="City" maxlength="100">
              </div>
              <div class="form-field">
                <input type="text" name="budget" placeholder="Budget (e.g. $500,000)" maxlength="50">
              </div>
            </div>

            <div class="form-row full">
              <div class="form-field">
                <textarea name="special_notes" placeholder="Describe what you are looking for"></textarea>
              </div>
            </div>

            <div class="term-contact-submit">
              <button type="submit" :disabled="formLoading">
                {{ formLoading ? 'Submitting...' : 'Submit' }} <i class="fas" :class="formLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>



    <section class="term-info">
      <div class="term-info-inner">
        <div class="term-info-row">
          <div class="term-info-image">
            <img src="/images/ts3.webp" alt="Term charter yacht on the water">
          </div>
          <div class="term-info-copy">
            <h2>Personalized Itineraries</h2>
            <p>At High Seas Yachting, each itinerary is tailored to highlight the best each destination has to offer, from hidden coves and secluded beaches to the most popular spots. Our team works closely with you to ensure every detail is tailored to your preferences, from culinary delights onboard to activities and excursions ashore.</p>
          </div>
        </div>

        <div class="term-info-row">
          <div class="term-info-copy">
            <h2>Seamless Vacation Planning</h2>
            <p>Choosing High Seas Yachting means you’re opting for a hassle-free vacation. We handle all logistics, from booking to boarding, so you can focus on enjoying your journey. Our dedication to excellence and meticulous attention to detail ensures that your term charter experience is nothing short of spectacular. By offering a comprehensive guide to term charters and showcasing the unique benefits of each destination, High Seas Yachting ensures a memorable and luxurious sailing experience. Whether you’re looking to explore the vibrant life of the Caribbean or the tranquil beauty of the Bahamas, High Seas Yachting is your trusted partner in adventure. Each section of this webpage could be visually enhanced with stunning images from the corresponding destinations, linking each image to a more detailed gallery or itinerary page for further exploration. </p>
          </div>
          <div class="term-info-image">
            <img src="/images/ts4.webp" alt="Luxury yacht interior and service">
          </div>
        </div>
      </div>
    </section>

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
</template>

<script>
import NavbarSection from '../components/NavbarSection.vue';
import FooterSection from '../components/FooterSection.vue';
let termcharterCache = null;

const SUPABASE_URL = 'https://qumgjqbfreeskjgltfvu.supabase.co/storage/v1/object/public/listings/';

    export default {
        name: 'TermCharterPage',
        components: {
            NavbarSection,
            FooterSection
        },
        data() {
            return {
                termcharterListings: [],
                formLoading: false,
                notification: {
                    show: false,
                    message: '',
                    type: 'success'
                }
            };
        },
        async mounted() {
            if (termcharterCache) {
                this.termcharterListings = termcharterCache;
            } else {
                await this.loadTermcharterListings();
            }
        },
        methods: {
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
            submitLeadForm() {
                const form = document.getElementById('termContactForm');
                const formData = new FormData(form);
                
                this.formLoading = true;

                const data = {
                    first_name: formData.get('first_name')?.trim() || '',
                    last_name: formData.get('last_name')?.trim() || '',
                    email: formData.get('email')?.trim() || '',
                    phone: formData.get('phone')?.trim() || '',
                    interest_type: formData.get('interest_type') || '',
                    city: formData.get('city')?.trim() || '',
                    budget: formData.get('budget')?.trim() || '',
                    special_notes: formData.get('special_notes')?.trim() || '',
                };
                data.broker_id = '2aeecdcd-d901-4187-8e63-d4ce079a4d1b';

                const self = this;
                fetch('https://qumgjqbfreeskjgltfvu.supabase.co/functions/v1/external-lead-api', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'x-api-token': 'd0aabf8c1b2b75756f86e27ed1cd06ef7f05e7f0e91273e945849b5339965fcd' 
                    },
                    body: JSON.stringify(data),
                })
                .then(function(res) {
                    return res.json().then(function(result) {
                        if (res.ok && result.success) {
                            form.reset();
                            self.showNotification('Thank you! Your information has been submitted successfully. We will get back to you soon!', 'success');
                        } else {
                            self.showNotification(result.error || 'Something went wrong. Please try again.', 'error');
                        }
                    });
                })
                .catch(function() {
                    self.showNotification('Network error. Please check your connection and try again.', 'error');
                })
                .finally(function() {
                    self.formLoading = false;
                });
            },
            async loadTermcharterListings() {
                try {
                    const data = await fetch('/data/listings.json').then(r => r.json());
                    const records = data[0]?.records || data;
                    this.termcharterListings = records
                        .filter(item => item && item.type === 'termcharter' && item.is_published !== false)
                        .map(listing => ({
                            id: listing.id,
                            yachtName: listing.yacht_name,
                            year: listing.year,
                            manufacturer: listing.manufacturer,
                            length: listing.length,
                            city: listing.metadata?.city || listing.city || '',
                            photos: listing.metadata?.photos || []
                        }));
                    termcharterCache = this.termcharterListings;
                } catch (error) {
                    console.error('Error loading term charter listings:', error);
                }
            },
            getImageUrl(photoPath) {
                if (!photoPath) return '';
                if (photoPath.startsWith('http')) return photoPath;
                const path = photoPath.replace(/^\/media\/listings\//, '');
                return SUPABASE_URL + path.split('/').map(encodeURIComponent).join('/');
            },
            getListingSlug(listing) {
                if (!listing) return '';
                const city = listing.city || '';
                return `${listing.year}-${listing.manufacturer}-${listing.yachtName}-${city}-term-charter`.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            },
            formatCity(city) {
                if (!city) return 'N/A';
                return city.charAt(0).toUpperCase() + city.slice(1);
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
      color: #1a1f1a;
      background: #f0f4ef;
      min-height: 100vh;
      line-height: 1.6;
    }

    .page-hero {
      position: relative;
      background: linear-gradient(180deg, rgba(15,40,24,0.75) 0%, rgba(15,40,24,0.35) 50%, rgba(15,40,24,0.15) 100%),
        url('/images/termcharter.webp') center/cover no-repeat;
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

    .hero-cta-wrapper {
      margin-top: 36px;
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 30px;
      border-radius: 50px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .hero-cta-primary {
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
    }

    .hero-cta-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(26, 58, 42, 0.4);
    }

    .hero-cta-secondary {
      background: rgba(255,255,255,0.1);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
    }

    .section-shell {
      background: #ffffff;
      padding: 200px 24px 80px;
      margin-top: -50px;
      border-radius: 32px 32px 0 0;
      box-shadow: 0 -20px 60px rgba(26, 58, 42, 0.08);
    }

    .term-tabs {
      max-width: 1200px;
      margin: 0 auto;
    }

    .term-controls {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 6px;
      background: #f8faf6;
      border-radius: 50px;
      max-width: 560px;
      margin: 0 auto 50px;
    }

    .term-tabs input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .term-controls label {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 24px;
      border-radius: 50px;
      background: transparent;
      border: none;
      color: #6b7280;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .term-controls label:hover {
      color: #1a3a2a;
    }

    #tab-purchasing:checked ~ .term-controls label[for="tab-purchasing"],
    #tab-selling:checked ~ .term-controls label[for="tab-selling"],
    #tab-chartering:checked ~ .term-controls label[for="tab-chartering"] {
      background: #1a3a2a;
      color: white;
    }

    .tab-panel {
      display: none;
    }

    #tab-purchasing:checked ~ .tab-panels .panel-purchasing,
    #tab-selling:checked ~ .tab-panels .panel-selling,
    #tab-chartering:checked ~ .tab-panels .panel-chartering {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
    }

    .step-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 28px 20px;
      box-shadow: 0 4px 20px rgba(26, 58, 42, 0.08);
      border: 1px solid rgba(26, 58, 42, 0.06);
      text-align: center;
      transition: all 0.3s ease;
    }

    .step-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(26, 58, 42, 0.12);
    }

    .step-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      border-radius: 16px;
      font-size: 1.3rem;
    }

    .step-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1a1f1a;
      margin-bottom: 8px;
    }

    .step-text {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.6;
    }

    .step-footer {
      margin-top: 50px;
      display: flex;
      justify-content: center;
    }

    .step-cta {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 36px;
      border-radius: 50px;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      font-weight: 700;
      font-size: 1rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .step-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(26, 58, 42, 0.35);
    }
    .term-info {
      padding: 80px 24px;
    }

    .term-info-inner {
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      gap: 80px;
    }

    .term-info-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .term-info-row:nth-child(even) {
      grid-template-columns: 1fr 1fr;
    }

    .term-info-copy {
      padding: 20px;
    }

    .term-info-copy h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 24px;
      color: #1a1f1a;
      position: relative;
      display: inline-block;
    }

    .term-info-copy h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #d4a853);
      border-radius: 2px;
    }

    .term-info-copy p {
      color: #6b7280;
      font-size: 1.05rem;
      line-height: 1.85;
    }

    .term-info-image {
      position: relative;
      overflow: hidden;
      border-radius: 24px;
      box-shadow: 0 20px 50px rgba(26, 58, 42, 0.15);
    }

    .term-info-image::before {
      content: '';
      position: absolute;
      inset: 0;
      border: 3px solid #d4a853;
      border-radius: 24px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
      pointer-events: none;
    }

    .term-info-image:hover::before {
      opacity: 1;
    }

    .term-info-image img {
      width: 100%;
      height: 380px;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }

    .term-info-image:hover img {
      transform: scale(1.06);
    }

    .term-contact {
      background: linear-gradient(135deg, #0f2818 0%, #1a4d35 50%, #0f2818 100%);
      padding: 100px 24px;
      position: relative;
      overflow: hidden;
    }

    .term-contact::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 30% 20%, rgba(212, 168, 83, 0.08) 0%, transparent 40%),
                  radial-gradient(circle at 70% 80%, rgba(26, 58, 42, 0.15) 0%, transparent 40%);
      animation: subtleFloat 20s ease-in-out infinite;
    }

    @keyframes subtleFloat {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-2%, -2%); }
    }

    .term-contact-inner {
      max-width: 1280px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .term-contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 0;
      background: white;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 40px 100px rgba(0, 0, 0, 0.3);
      position: relative;
    }

    .term-contact-grid::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #1a3a2a, #d4a853, #1a3a2a);
    }

    .term-contact-copy {
      padding: 60px 50px;
      background: linear-gradient(135deg, #1a3a2a 0%, #2d5a45 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .term-contact-copy::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(212, 168, 83, 0.2) 0%, transparent 70%);
      transform: translate(30%, -30%);
    }

    .term-contact-copy::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
      transform: translate(-30%, 30%);
    }

    .term-contact-copy .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      backdrop-filter: blur(10px);
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      position: relative;
      z-index: 1;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .term-contact-copy h2 {
      font-size: clamp(1.75rem, 2.5vw, 2.5rem);
      font-weight: 800;
      margin-bottom: 24px;
      color: white;
      line-height: 1.15;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    }

    .term-contact-copy p {
      color: rgba(255, 255, 255, 0.85);
      font-size: 1.05rem;
      line-height: 1.8;
      position: relative;
      z-index: 1;
    }

    .term-contact-copy .contact-info {
      margin-top: 36px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      z-index: 1;
    }

    .term-contact-copy .contact-item {
      display: flex;
      align-items: center;
      gap: 14px;
      color: white;
      font-size: 1rem;
    }

    .term-contact-copy .contact-item i {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #d4a853;
      font-size: 1.1rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .term-contact-form {
      padding: 50px 48px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background: white;
      position: relative;
    }

    .term-contact-form::before {
      content: '';
      position: absolute;
      top: 20px;
      right: 20px;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(212, 168, 83, 0.1), rgba(212, 168, 83, 0.05));
      border-radius: 20px;
      transform: rotate(12deg);
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      position: relative;
      z-index: 1;
    }

    .form-row.full {
      grid-template-columns: 1fr;
    }

    .form-field {
      position: relative;
    }

    .form-field label {
      position: absolute;
      top: 16px;
      left: 20px;
      color: #9ca3af;
      font-size: 0.85rem;
      font-weight: 500;
      pointer-events: none;
      transition: all 0.3s ease;
      background: transparent;
    }

    .form-field input,
    .form-field select,
    .form-field textarea {
      width: 100%;
      padding: 20px 22px;
      border-radius: 16px;
      border: 2px solid #e8ebe7;
      background: #f9faf9;
      color: #1a1f1a;
      font-size: 0.95rem;
      font-family: 'Poppins', sans-serif;
      outline: none;
      transition: all 0.3s ease;
    }

    .form-field input::placeholder,
    .form-field textarea::placeholder {
      color: #9ca3af;
    }

    .form-field input:focus,
    .form-field select:focus,
    .form-field textarea:focus {
      border-color: #1a3a2a;
      background: white;
      box-shadow: 0 0 0 4px rgba(26, 58, 42, 0.08), 0 4px 20px rgba(26, 58, 42, 0.08);
    }

    .form-field input:focus + label,
    .form-field textarea:focus + label,
    .form-field input:not(:placeholder-shown) + label,
    .form-field textarea:not(:placeholder-shown) + label {
      top: -10px;
      left: 14px;
      font-size: 0.7rem;
      background: white;
      padding: 0 8px;
      color: #1a3a2a;
      font-weight: 700;
    }

    .form-field select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 18px center;
      background-size: 18px;
      padding-right: 52px;
    }

    .form-field select:focus + label {
      top: -10px;
      left: 14px;
      font-size: 0.7rem;
      background: white;
      padding: 0 8px;
      color: #1a3a2a;
      font-weight: 700;
    }

    .form-field textarea {
      min-height: 100px;
      resize: vertical;
    }

    .term-contact-submit {
      display: flex;
      justify-content: flex-end;
      padding-top: 12px;
      position: relative;
      z-index: 1;
    }

    .term-contact-submit button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 20px 48px;
      border-radius: 50px;
      border: none;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      font-weight: 700;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 10px 30px rgba(26, 58, 42, 0.35);
      position: relative;
      overflow: hidden;
    }

    .term-contact-submit button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }

    .term-contact-submit button:hover::before {
      left: 100%;
    }

    .term-contact-submit button:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 50px rgba(26, 58, 42, 0.45);
    }

    .term-contact-submit button i {
      transition: transform 0.3s ease;
    }

    .term-contact-submit button:hover i {
      transform: translateX(4px) translateY(-2px);
    }

    @media (max-width: 1024px) {
      .term-contact-grid {
        grid-template-columns: 1fr;
        border-radius: 28px;
      }

      .term-contact-copy {
        padding: 48px 40px;
        text-align: center;
        align-items: center;
      }

      .term-contact-copy .contact-info {
        align-items: center;
      }

      .term-contact-form {
        padding: 40px 36px;
      }
    }

    @media (max-width: 640px) {
      .term-contact {
        padding: 60px 16px;
      }

      .term-contact-grid {
        border-radius: 24px;
      }

      .term-contact-copy {
        padding: 36px 24px;
      }

      .term-contact-copy h2 {
        font-size: 1.4rem;
      }

      .term-contact-copy p {
        font-size: 0.95rem;
      }

      .term-contact-form {
        padding: 32px 22px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .term-contact-submit button {
        width: 100%;
        justify-content: center;
      }
    }

      .term-contact-submit button {
        width: 100%;
        justify-content: center;
      }

    @media (max-width: 992px) {
      .term-info-row {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .term-info-row:nth-child(even) {
        grid-template-columns: 1fr;
      }

      .term-info-image {
        order: -1;
      }

      .term-info-image img {
        height: 300px;
      }
    }

    @media (max-width: 576px) {
      .term-info {
        padding: 60px 16px;
      }

      .term-info-inner {
        gap: 50px;
      }

      .term-info-copy h2 {
        font-size: 1.5rem;
      }

      .term-info-copy p {
        font-size: 1rem;
      }

      .term-info-image img {
        height: 250px;
      }
    }
    .term-listings {
      background: #f8faf6;
      padding: 80px 24px 100px;
    }

    .term-listings-inner {
      max-width: 1300px;
      margin: 0 auto;
    }

    .listings-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      border-radius: 50px;
      background: rgba(26, 58, 42, 0.1);
      color: #1a3a2a;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 16px;
    }

    .listings-title {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 800;
      color: #1a1f1a;
      margin-bottom: 12px;
    }

    .term-listings-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }

    .term-card {
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(26, 58, 42, 0.06);
      border: 1px solid rgba(26, 58, 42, 0.05);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
    }

    .term-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #d4a853);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    .term-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(26, 58, 42, 0.12);
    }

    .term-card:hover::before {
      opacity: 1;
    }

    .term-card-image {
      position: relative;
      height: 220px;
      overflow: hidden;
    }

    .term-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .term-card:hover .term-card-image img {
      transform: scale(1.08);
    }

    .term-card-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      padding: 8px 16px;
      border-radius: 50px;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      box-shadow: 0 4px 15px rgba(26, 58, 42, 0.25);
    }

    .term-card-wishlist {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 44px;
      height: 44px;
      background: rgba(255,255,255,0.95);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .term-card-wishlist:hover {
      color: #e74c3c;
      transform: scale(1.1);
    }

    .term-card-body {
      padding: 24px;
    }

    .term-card-body h3 {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: #1a1f1a;
      line-height: 1.3;
    }

    .term-card-location {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1a3a2a;
      font-size: 0.9rem;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .term-card-specs {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .term-card-spec {
      background: #f8faf9;
      padding: 14px;
      border-radius: 14px;
      text-align: center;
    }

    .term-card-spec span {
      display: block;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #6b7280;
      margin-bottom: 4px;
    }

    .term-card-spec strong {
      display: block;
      color: #1a1f1a;
      font-size: 0.95rem;
      font-weight: 700;
    }

    .term-card-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 16px 20px;
      border-radius: 14px;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .term-card-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(26, 58, 42, 0.25);
    }

    .term-card-button i {
      transition: transform 0.3s ease;
    }

    .term-card-button:hover i {
      transform: translateX(4px);
    }

    @media (max-width: 1100px) {
      .term-listings-grid {
        grid-template-columns: repeat(1, 1fr) !important;
      }
    }

    @media (max-width: 768px) {
      .term-listings {
        padding: 60px 16px 70px;
      }

      .term-listings-grid {
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
      }

      .term-card-image {
        height: 180px;
      }

      .term-card-body {
        padding: 18px;
      }

      .term-card-body h3 {
        font-size: 1rem;
      }
    }

    @media (max-width: 520px) {
      .term-listings-grid {
        grid-template-columns: 1fr;
        max-width: 380px;
        margin: 0 auto;
      }

      .term-card-body h3 {
        font-size: 1.1rem;
      }
    }

    .no-listings {
      text-align: center;
      padding: 60px 20px;
      color: #6b7280;
      font-size: 1.1rem;
    }

    @media (max-width: 1100px) {
      #tab-purchasing:checked ~ .tab-panels .panel-purchasing,
      #tab-selling:checked ~ .tab-panels .panel-selling,
      #tab-chartering:checked ~ .tab-panels .panel-chartering {
        grid-template-columns: repeat(3, 1fr);
      }

      .term-listings-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .page-hero {
        min-height: 400px;
        padding: 80px 20px 50px;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-copy {
        font-size: 1rem;
      }

      .section-shell {
        padding: 50px 16px 60px;
        margin-top: -40px;
        border-radius: 16px 16px 0 0;
      }

      .term-controls {
        flex-direction: column;
        border-radius: 16px;
        max-width: 100%;
      }

      .term-controls label {
        padding: 12px 20px;
      }

      #tab-purchasing:checked ~ .tab-panels .panel-purchasing,
      #tab-selling:checked ~ .tab-panels .panel-selling,
      #tab-chartering:checked ~ .tab-panels .panel-chartering {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .step-card {
        padding: 22px 16px;
      }

      .term-info {
        padding: 40px 16px 30px;
      }

      .term-info-row {
        grid-template-columns: 1fr;
      }

      .term-info-row:nth-child(even) {
        grid-template-columns: 1fr;
      }

      .term-info-copy h2 {
        font-size: 2rem;
      }

      .term-info-image {
        height: 100%;
      }

      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 500px) {
      #tab-purchasing:checked ~ .tab-panels .panel-purchasing,
      #tab-selling:checked ~ .tab-panels .panel-selling,
      #tab-chartering:checked ~ .tab-panels .panel-chartering {
        grid-template-columns: 1fr;
        max-width: 320px;
        margin: 0 auto;
      }

      .step-cta {
        padding: 14px 28px;
        font-size: 0.95rem;
      }

      .hero-cta-wrapper {
        flex-direction: column;
        align-items: center;
      }

      .hero-cta {
        width: 100%;
        max-width: 260px;
        justify-content: center;
      }
    }

    /* ===================== NOTIFICATION TOAST STYLES ===================== */
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

      .notification-icon {
        font-size: 1.2rem;
      }

      .notification-title {
        font-size: 0.85rem;
      }

      .notification-message {
        font-size: 0.8rem;
      }
    }
</style>