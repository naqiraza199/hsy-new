<template>
    <NavbarSection />

<header class="page-hero">
  <div class="page-hero-content">
    <h1 class="hero-title">Contact Us</h1>
    <p class="hero-copy">Get in touch with our expert team for personalized yacht charter experiences, sales inquiries, or general questions. We're here to make your maritime dreams a reality.</p>
  </div>
</header>

<section class="section-shell">
  <div class="contact-wrapper">
    <div class="contact-grid">
      <div class="contact-info-side">
        <div class="contact-info-card">
          <span class="contact-label"><i class="fas fa-headset"></i> Get in Touch</span>
          <h2>We're Here to Help</h2>
          <p>Our dedicated team is available 24/7 to assist you with booking inquiries, charter planning, or any questions about our luxury yacht services.</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="method-details">
                <span class="method-label">Phone</span>
                <a href="tel:+19546861671">+1 (954) 686-1671</a>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="method-details">
                <span class="method-label">Email</span>
                <a href="mailto:Sales@highseasyachting.com">Sales@highseasyachting.com</a>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="method-details">
                <span class="method-label">Location</span>
                <span>Fort Lauderdale, Florida</span>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="method-details">
                <span class="method-label">Hours</span>
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>

          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div class="contact-form-side">
        <div class="contact-form-card">
          <div class="form-header">
            <span class="form-tag"><i class="fas fa-paper-plane"></i> Send a Message</span>
            <h3>Send Us a Message</h3>
            <p>Fill out the form below and our team will get back to you within 24 hours.</p>
          </div>

          <form class="contact-form" id="contactForm" @submit.prevent="submitLeadForm">
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
                <textarea name="special_notes" placeholder="Your Message *" rows="5" required maxlength="1000"></textarea>
              </div>
            </div>

            <div class="form-submit">
              <button type="submit" :disabled="formLoading">
                <span>{{ formLoading ? 'Sending...' : 'Send Message' }}</span>
                <i class="fas" :class="formLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="features-section">
  <div class="features-inner">
    <div class="features-header">
      <span class="section-tag"><i class="fas fa-star"></i> Why Choose Us</span>
      <h2>The High Seas Difference</h2>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <i class="fas fa-medal"></i>
        </div>
        <h3>Premium Service</h3>
        <p>Award-winning yacht charter experiences with meticulous attention to every detail.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <i class="fas fa-ship"></i>
        </div>
        <h3>Curated Fleet</h3>
        <p>Access to Florida's most exclusive luxury yachts, handpicked for quality and comfort.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <i class="fas fa-user-tie"></i>
        </div>
        <h3>Expert Crew</h3>
        <p>Professional captains and crew certified to the highest standards in the industry.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <i class="fas fa-anchor"></i>
        </div>
        <h3>Tailored Itineraries</h3>
        <p>Customized charter routes designed around your preferences and desires.</p>
      </div>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <div class="faq-header">
      <span class="section-tag"><i class="fas fa-question-circle"></i> FAQ</span>
      <h2>Frequently Asked Questions</h2>
    </div>

    <div class="faq-grid">
      <div class="faq-card">
        <div class="faq-icon">
          <i class="fas fa-ship"></i>
        </div>
        <h3>What types of charters do you offer?</h3>
        <p>We offer day charters, term charters, and custom yacht experiences throughout Florida, the Bahamas, and Caribbean destinations.</p>
      </div>

      <div class="faq-card">
        <div class="faq-icon">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <h3>What is included in the charter price?</h3>
        <p>Each charter includes the yacht, professional crew, fuel, and standard amenities. Specific inclusions vary by vessel and package.</p>
      </div>

      <div class="faq-card">
        <div class="faq-icon">
          <i class="fas fa-calendar-check"></i>
        </div>
        <h3>How far in advance should I book?</h3>
        <p>We recommend booking 2-4 weeks in advance for day charters and 4-8 weeks for term charters to ensure availability.</p>
      </div>

      <div class="faq-card">
        <div class="faq-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>How many guests can accompany on a charter?</h3>
        <p>Capacity varies by yacht. Our fleet ranges from 8 to 50+ guests depending on the vessel and charter type.</p>
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

    export default {
        name: 'ContactUsPage',
        components: {
            NavbarSection,
            FooterSection
        },
        data() {
            return {
                formLoading: false,
                notification: {
                    show: false,
                    message: '',
                    type: 'success'
                }
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
                const form = document.getElementById('contactForm');
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
        url('/images/contact.jpg') center/cover no-repeat;
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

    .section-shell {
      background: #ffffff;
      padding: 200px 24px 80px;
      margin-top: -50px;
      border-radius: 32px 32px 0 0;
      box-shadow: 0 -20px 60px rgba(26, 58, 42, 0.08);
    }

    .contact-wrapper {
      max-width: 1280px;
      margin: 0 auto;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 40px;
      align-items: start;
    }

    .contact-info-side {
      position: sticky;
      top: 120px;
    }

    .contact-info-card {
      background: linear-gradient(135deg, #1a3a2a 0%, #2d5a45 100%);
      border-radius: 32px;
      padding: 48px 40px;
      color: white;
      position: relative;
      overflow: hidden;
    }

    .contact-info-card::before {
      content: '';
      position: absolute;
      top: -30%;
      right: -30%;
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(212, 168, 83, 0.15) 0%, transparent 70%);
    }

    .contact-info-card::after {
      content: '';
      position: absolute;
      bottom: -20%;
      left: -20%;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    }

    .contact-label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 24px;
    }

    .contact-info-card h2 {
      font-size: clamp(1.75rem, 2.5vw, 2.25rem);
      font-weight: 800;
      margin-bottom: 16px;
      line-height: 1.2;
      position: relative;
      z-index: 1;
    }

    .contact-info-card > p {
      color: rgba(255, 255, 255, 0.85);
      font-size: 1.05rem;
      line-height: 1.75;
      margin-bottom: 40px;
      position: relative;
      z-index: 1;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
      z-index: 1;
      margin-bottom: 40px;
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .method-icon {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      font-size: 1.1rem;
      color: #d4a853;
    }

    .method-details {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .method-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.6);
    }

    .method-details a,
    .method-details span {
      color: white;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
    }

    .social-links {
      display: flex;
      gap: 12px;
      position: relative;
      z-index: 1;
    }

    .social-link {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      color: white;
      text-decoration: none;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: #d4a853;
      border-color: #d4a853;
      color: #1a3a2a;
      transform: translateY(-3px);
    }

    .contact-form-side {
      position: relative;
    }

    .contact-form-card {
      background: #ffffff;
      border-radius: 32px;
      padding: 48px;
      box-shadow: 0 10px 50px rgba(26, 58, 42, 0.08);
      border: 1px solid rgba(26, 58, 42, 0.06);
      position: relative;
    }

    .contact-form-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #1a3a2a, #d4a853, #1a3a2a);
      border-radius: 32px 32px 0 0;
    }

    .form-header {
      margin-bottom: 36px;
    }

    .form-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 50px;
      background: rgba(26, 58, 42, 0.1);
      color: #1a3a2a;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }

    .form-header h3 {
      font-size: 1.75rem;
      font-weight: 800;
      color: #1a1f1a;
      margin-bottom: 8px;
    }

    .form-header p {
      color: #6b7280;
      font-size: 1rem;
      line-height: 1.6;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .form-row.full {
      grid-template-columns: 1fr;
    }

    .form-field {
      position: relative;
    }

    .form-field input,
    .form-field select,
    .form-field textarea {
      width: 100%;
      padding: 18px 20px;
      border-radius: 14px;
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
      box-shadow: 0 0 0 4px rgba(26, 58, 42, 0.08);
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

    .form-field textarea {
      min-height: 120px;
      resize: vertical;
    }

    .form-submit {
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
    }

    .form-submit button {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 18px 40px;
      border-radius: 50px;
      border: none;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      font-weight: 700;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 10px 30px rgba(26, 58, 42, 0.3);
    }

    .form-submit button:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(26, 58, 42, 0.35);
    }

    .form-submit button i {
      transition: transform 0.3s ease;
    }

    .form-submit button:hover i {
      transform: translateX(3px) translateY(-2px);
    }

    .features-section {
      padding: 100px 24px;
      background: #f8faf6;
    }

    .features-inner {
      max-width: 1300px;
      margin: 0 auto;
    }

    .features-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      border-radius: 50px;
      background: rgba(26, 58, 42, 0.1);
      color: #1a3a2a;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 16px;
    }

    .features-header h2 {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 800;
      color: #1a1f1a;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 28px;
    }

    .feature-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 36px 28px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(26, 58, 42, 0.06);
      border: 1px solid rgba(26, 58, 42, 0.05);
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(26, 58, 42, 0.12);
    }

    .feature-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      border-radius: 18px;
      font-size: 1.5rem;
    }

    .feature-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #1a1f1a;
      margin-bottom: 12px;
    }

    .feature-card p {
      color: #6b7280;
      font-size: 0.95rem;
      line-height: 1.7;
    }

    .faq-section {
      padding: 100px 24px;
      background: #ffffff;
    }

    .faq-inner {
      max-width: 1300px;
      margin: 0 auto;
    }

    .faq-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .faq-header h2 {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 800;
      color: #1a1f1a;
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
    }

    .faq-card {
      background: #f8faf6;
      border-radius: 24px;
      padding: 32px;
      transition: all 0.3s ease;
    }

    .faq-card:hover {
      background: #ffffff;
      box-shadow: 0 10px 40px rgba(26, 58, 42, 0.1);
    }

    .faq-icon {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a3a2a, #2d5a45);
      color: white;
      border-radius: 14px;
      font-size: 1.2rem;
      margin-bottom: 20px;
    }

    .faq-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #1a1f1a;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .faq-card p {
      color: #6b7280;
      font-size: 0.95rem;
      line-height: 1.7;
    }

    @media (max-width: 1100px) {
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 992px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .contact-info-side {
        position: relative;
        top: 0;
      }

      .faq-grid {
        grid-template-columns: 1fr;
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

      .contact-info-card {
        padding: 36px 28px;
      }

      .contact-form-card {
        padding: 32px 24px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .form-submit button {
        width: 100%;
        justify-content: center;
      }

      .features-section {
        padding: 60px 16px;
      }

      .features-grid {
        grid-template-columns: 1fr;
        max-width: 400px;
        margin: 0 auto;
      }

      .faq-section {
        padding: 60px 16px;
      }
    }

    @media (max-width: 520px) {
      .contact-label {
        font-size: 0.7rem;
        padding: 8px 14px;
      }

      .contact-info-card h2 {
        font-size: 1.5rem;
      }

      .method-icon {
        width: 44px;
        height: 44px;
        font-size: 1rem;
      }

      .form-header h3 {
        font-size: 1.4rem;
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