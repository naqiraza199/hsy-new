 <template>
    <NavbarSection />
    <header class="dockage-hero">
        <div class="dockage-hero-overlay"></div>
        <div class="dockage-hero-bg"></div>
        <div class="dockage-hero-content">
            <div class="dockage-hero-badge">
                <i class="fas fa-anchor"></i>
                Dockage & Marina Services
            </div>
            <h1 class="dockage-hero-title">Dock With Us — Fort Lauderdale & Miami Services</h1>
            <p class="dockage-hero-subtitle">
                Secure premium slips, concierge dockside support, and seamless marina access across South Florida. Our
                team arranges trusted dockage, event berthing, and long-term stay packages for luxury yachts.
            </p>
        </div>
    </header>

    <main class="dockage-main">
 
        <!-- Dockage Request Section -->
        <section class="dockage-request-section">
            <div class="dockage-container">
                
                  <section class="section-card" data-v-8b86c27f="">
              <h2 class="section-title" data-v-8b86c27f="">Dockage &amp; Marina Access</h2>
              <p class="section-copy" data-v-8b86c27f="">We help owners secure premium slips and marina spots at top-tier
                  locations across Miami, Fort Lauderdale, and Palm Beach. Whether for long-term docking or show events,
                  our network ensures priority access and optimized pricing.</p>
          </section>
                  <div class="dockage-request-wrapper">
                      <div class="dockage-request-header">
                          <span class="dockage-request-badge">
                              <i class="fas fa-anchor"></i>
                              Dockage Services
                          </span>
                          <h2 class="dockage-request-title">Request a Dockage Quote</h2>
                          <p class="dockage-request-subtitle">
                              Fill in your details and our marina specialists will contact you within 24 hours.
                          </p>
                      </div>
  
                      <div class="dockage-request-divider"></div>
  
                      <form id="hsDockageForm" class="dockage-form">
                          <!-- Personal Information -->
                          <div class="dockage-form-section">
                              <h3 class="dockage-form-section-title">
                                  <span class="dockage-form-section-number">01</span>
                                  Personal Information
                              </h3>
  
                              <div class="dockage-form-row">
                                  <div class="dockage-form-group">
                                      <label for="firstName">First Name <span class="dockage-required">*</span></label>
                                      <input type="text" id="firstName" name="firstName"
                                          placeholder="Enter your first name" required>
                                  </div>
                                  <div class="dockage-form-group">
                                      <label for="lastName">Last Name <span class="dockage-required">*</span></label>
                                      <input type="text" id="lastName" name="lastName" placeholder="Enter your last name"
                                          required>
                                  </div>
                              </div>
  
                              <div class="dockage-form-row">
                                  <div class="dockage-form-group">
                                      <label for="phone">Phone <span class="dockage-required">*</span></label>
                                      <input type="tel" id="phone" name="phone" placeholder="+1 (954) 123-4567" required>
                                  </div>
                                  <div class="dockage-form-group">
                                      <label for="email">Email <span class="dockage-required">*</span></label>
                                      <input type="email" id="email" name="email" placeholder="your@email.com" required>
                                  </div>
                              </div>
  
                              <div class="dockage-form-group">
                                  <label for="address">Address <span class="dockage-required">*</span></label>
                                  <input type="text" id="address" name="address"
                                      placeholder="Full address including city, state, zip" required>
                              </div>
                          </div>
  
                          <!-- Boat Information -->
                          <div class="dockage-form-section">
                              <h3 class="dockage-form-section-title">
                                  <span class="dockage-form-section-number">02</span>
                                  Boat Information
                              </h3>
  
                              <div class="dockage-form-row">
                                  <div class="dockage-form-group">
                                      <label for="boatName">Boat's Name <span class="dockage-required">*</span></label>
                                      <input type="text" id="boatName" name="boatName"
                                          placeholder="Enter your boat's name" required>
                                  </div>
                                  <div class="dockage-form-group">
                                      <label for="manufacturer">Manufacturer <span
                                              class="dockage-required">*</span></label>
                                      <input type="text" id="manufacturer" name="manufacturer"
                                          placeholder="Boat manufacturer" required>
                                  </div>
                              </div>
  
                              <div class="dockage-form-row">
                                  <div class="dockage-form-group">
                                      <label for="length">Length (ft) <span class="dockage-required">*</span></label>
                                      <input type="number" id="length" name="length" placeholder="0" min="0" step="0.1"
                                          required>
                                  </div>
                                  <div class="dockage-form-group">
                                      <label for="beam">Beam (ft) <span class="dockage-required">*</span></label>
                                      <input type="number" id="beam" name="beam" placeholder="0" min="0" step="0.1"
                                          required>
                                  </div>
                                  <div class="dockage-form-group">
                                      <label for="draft">Draft (ft) <span class="dockage-required">*</span></label>
                                      <input type="number" id="draft" name="draft" placeholder="0" min="0" step="0.1"
                                          required>
                                  </div>
                              </div>
  
                              <div class="dockage-form-row">
                                  <div class="dockage-form-group">
                                      <label for="startDate">Preferred Start Date <span
                                              class="dockage-required">*</span></label>
                                      <input type="date" id="startDate" name="startDate" required>
                                  </div>
                                  <div class="dockage-form-group">
                                      <label for="power">Power Requirements</label>
                                      <select id="power" name="power">
                                          <option value="">Select power requirements</option>
                                          <option value="30">30 Amp</option>
                                          <option value="50">50 Amp</option>
                                          <option value="100">100 Amp</option>
                                          <option value="other">Other</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
  
                          <!-- Boat Photo Upload -->
                          <div class="dockage-form-section">
                              <h3 class="dockage-form-section-title">
                                  <span class="dockage-form-section-number">03</span>
                                  Boat Photo (Optional)
                              </h3>
  
                              <div class="dockage-form-group">
                                  <label>Upload a photo of your boat</label>
                                  <div class="dockage-upload-area" id="uploadArea">
                                      <div class="dockage-upload-content">
                                          <i class="fas fa-cloud-upload-alt dockage-upload-icon"></i>
                                          <p class="dockage-upload-text">Click or drag to upload a photo</p>
                                          <span class="dockage-upload-hint">Max 10MB, JPG/PNG recommended</span>
                                      </div>
                                      <input type="file" id="boatPhoto" name="boatPhoto" accept="image/*"
                                          style="display: none;">
                                  </div>
                              </div>
                          </div>
  
                          <!-- Submit Button -->
                          <div class="dockage-form-actions">
                              <button type="submit" class="dockage-submit-btn">
                                  <span class="dockage-submit-text">Submit Dockage Request</span>
                                  <i class="fas fa-arrow-right dockage-submit-icon"></i>
                              </button>
                              <p class="dockage-form-note">
                                  By submitting, you agree to our <a href="/terms">Terms of Service</a> and <a
                                      href="/privacy">Privacy Policy</a>.
                              </p>
                          </div>
                      </form>
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
      </main>
  
      <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';

export default {
    name: 'DockagePage',
    components: {
        NavbarSection,
        FooterSection
    },
    data() {
        return {
            loading: false,
            notification: {
                show: false,
                message: '',
                type: 'success' // 'success' | 'error'
            }
        };
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
        }
    },
    mounted() {
        // Setup file upload functionality
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('boatPhoto');

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#416B3C';
                uploadArea.style.backgroundColor = 'rgba(65, 107, 60, 0.05)';
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = '#e8ebe7';
                uploadArea.style.backgroundColor = '#ffffff';
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#e8ebe7';
                uploadArea.style.backgroundColor = '#ffffff';

                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    const fileName = files[0].name;
                    uploadArea.querySelector('.dockage-upload-text').textContent = fileName;
                }
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    const fileName = e.target.files[0].name;
                    uploadArea.querySelector('.dockage-upload-text').textContent = fileName;
                }
            });
        }

        // Form submission
        const form = document.getElementById('hsDockageForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const submitBtn = form.querySelector('.dockage-submit-btn');
                const submitText = submitBtn.querySelector('.dockage-submit-text');
                const submitIcon = submitBtn.querySelector('.dockage-submit-icon');

                // Show loading state
                submitBtn.disabled = true;
                submitText.textContent = 'Submitting...';
                submitIcon.className = 'fas fa-spinner fa-spin dockage-submit-icon';

                try {
                    // Get form values
                    const firstName = document.getElementById('firstName').value;
                    const lastName = document.getElementById('lastName').value;
                    const email = document.getElementById('email').value;
                    const phone = document.getElementById('phone').value;
                    const address = document.getElementById('address').value;
                    const boatName = document.getElementById('boatName').value;
                    const manufacturer = document.getElementById('manufacturer').value;
                    const length = document.getElementById('length').value;
                    const beam = document.getElementById('beam').value;
                    const draft = document.getElementById('draft').value;
                    const startDate = document.getElementById('startDate').value;
                    const power = document.getElementById('power').value;

                    // Basic validation
                    if (!firstName || !lastName || !email || !phone || !address || !boatName || !manufacturer || !length || !beam || !draft || !startDate) {
                        this.showNotification('Please fill in all required fields.', 'error');
                        return;
                    }

                    // Prepare payload
                    const payload = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        phone: phone,
                        address: address,
                        boat_name: boatName,
                        manufacturer: manufacturer,
                        boat_length: length,
                        beam: beam,
                        draft: draft,
                        arrival_date: startDate
                    };

                    // Send to API
                    const response = await fetch('https://qumgjqbfreeskjgltfvu.supabase.co/functions/v1/external-dockage-api', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 6154693e-8731-4a7e-bc40-228eccb1b4eb:5044a0e8-c43c-4f8b-b436-84a421755afb'
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

                    console.log('Dockage API Response:', { 
                        status: response.status, 
                        ok: response.ok, 
                        result 
                    });

                    if (response.ok) {
                        this.showNotification(
                            'Your dockage request has been submitted successfully! We will contact you within 24 hours.', 
                            'success'
                        );

                        // Reset form
                        form.reset();

                        // Reset upload area if applicable
                        const uploadText = uploadArea?.querySelector('.dockage-upload-text');
                        if (uploadText) {
                            uploadText.textContent = 'Click or drag to upload a photo';
                        }
                    } else {
                        const errorMsg = result.message || result.error || `Failed to submit request (${response.status})`;
                        this.showNotification(errorMsg, 'error');
                        console.error('Dockage request failed:', result);
                    }
                } catch (error) {
                    console.error('Dockage submission error:', error);
                    this.showNotification(
                        'Unable to connect to dockage service. Please check your connection and try again.', 
                        'error'
                    );
                } finally {
                    submitBtn.disabled = false;
                    submitText.textContent = 'Submit Dockage Request';
                    submitIcon.className = 'fas fa-arrow-right dockage-submit-icon';
                }
            });
        }
    }
}
</script>

<style scoped>
/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background: #f4f4f4;
    color: #1a1f1a;
    line-height: 1.7;
    min-height: 100vh;
}

a {
    color: inherit;
    text-decoration: none;
}

.dockage-container {
    max-width: 1370px;
    margin: 0 auto;
    padding: 0 24px;
}

/* ===================== HERO SECTION ===================== */
.dockage-hero {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: 100px;
}

.dockage-hero-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(15, 40, 24, 0.95) 0%, rgba(26, 77, 53, 0.85) 100%),
        url('https://new.highseasyachting.com/images/dockage.webp') center/cover no-repeat;
}

.dockage-hero-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 0%, rgba(15, 40, 24, 0.9) 100%);
}

.dockage-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    max-width: 900px;
    padding: 0 24px;
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

.dockage-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    padding: 12px 24px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.dockage-hero-badge i {
    color: #d4a853;
}

.dockage-hero-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.dockage-hero-subtitle {
    font-size: clamp(1.1rem, 1.8vw, 1.25rem);
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.7;
    max-width: 700px;
    margin: 0 auto 40px;
    font-weight: 400;
}


/* ===================== MAIN CONTENT ===================== */
.dockage-main {
    background: #fdfdfd;
}


/* ===================== REQUEST SECTION ===================== */
.dockage-request-section {
    padding: 100px 0;
}

.dockage-request-wrapper {
    max-width: 1300px;
    margin: 0 auto;
    background: white;
    border-radius: 32px;
    box-shadow: 0 20px 60px rgba(26, 58, 42, 0.1);
    border: 1px solid rgba(26, 58, 42, 0.1);
    overflow: hidden;
}

.dockage-request-header {
    padding: 48px 48px 24px;
    text-align: center;
    background: linear-gradient(135deg, #f8faf6 0%, rgba(65, 107, 60, 0.04) 100%);
    border-bottom: 1px solid rgba(26, 58, 42, 0.08);
}

.dockage-request-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #416B3C, #2d5a45);
    color: white;
    padding: 10px 20px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
}

.dockage-request-badge i {
    font-size: 0.9rem;
}

.dockage-request-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #1a3a2a;
    margin-bottom: 12px;
}

.dockage-request-subtitle {
    font-size: 1rem;
    color: #5f6d60;
    line-height: 1.6;
}

.dockage-request-divider {
    height: 3px;
    background: linear-gradient(90deg, #416B3C, #d4a853, #416B3C);
    margin-bottom: 48px;
}

.dockage-form {
    padding: 0 48px 48px;
}

.dockage-form-section {
    margin-bottom: 40px;
}

.dockage-form-section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a3a2a;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(65, 107, 60, 0.1);
}

.dockage-form-section-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #416B3C, #2d5a45);
    color: white;
    border-radius: 50%;
    font-size: 0.8rem;
    font-weight: 700;
}

.dockage-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.dockage-form-group {
    margin-bottom: 20px;
}

.dockage-form-group label {
    display: block;
    font-weight: 600;
    color: #1a3a2a;
    margin-bottom: 8px;
    font-size: 0.95rem;
}

.dockage-required {
    color: #e74c3c;
}

.dockage-form-group input,
.dockage-form-group select {
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

.dockage-form-group input:focus,
.dockage-form-group select:focus {
    outline: none;
    border-color: #416B3C;
    box-shadow: 0 0 0 4px rgba(65, 107, 60, 0.1);
}

.dockage-form-group input::placeholder {
    color: #a8a8a8;
}

/* Upload Area */
.dockage-upload-area {
    border: 2px dashed #ccc;
    border-radius: 16px;
    padding: 50px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fafafa;
}

.dockage-upload-area:hover {
    border-color: #416B3C;
    background: #f8f9f7;
}

.dockage-upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.dockage-upload-icon {
    font-size: 2.8rem;
    color: #416B3C;
}

.dockage-upload-text {
    font-size: 1rem;
    font-weight: 500;
    color: #1a3a2a;
}

.dockage-upload-hint {
    font-size: 0.85rem;
    color: #6e7070;
}

/* Form Actions */
.dockage-form-actions {
    text-align: center;
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid rgba(26, 58, 42, 0.1);
}

.dockage-submit-btn {
    width: 100%;
    max-width: 320px;
    background: linear-gradient(135deg, #1a3a2a, #2d5a45);
    color: white;
    border: none;
    padding: 18px 32px;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 8px 25px rgba(65, 107, 60, 0.35);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 0.03em;
}

.dockage-submit-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(65, 107, 60, 0.45);
}

.dockage-submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.dockage-submit-icon {
    transition: transform 0.3s ease;
}

.dockage-submit-btn:hover .dockage-submit-icon {
    transform: translateX(4px);
}

.dockage-form-note {
    margin-top: 24px;
    font-size: 0.85rem;
    color: #5f7062;
    line-height: 1.5;
}

.dockage-form-note a {
    color: #416B3C;
    font-weight: 600;
    text-decoration: none;
}

.dockage-form-note a:hover {
    text-decoration: underline;
}



/* ===================== RESPONSIVE DESIGN ===================== */
@media (max-width: 992px) {
    .dockage-hero {
        min-height: 500px;
        margin-top: 80px;
    }


    .dockage-row {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .dockage-hero {
        min-height: 450px;
        margin-top: 70px;
    }
.dockage-hero-content{
    padding: 65px 24px !important;
}

    .dockage-request-header,
    .dockage-form {
        padding-left: 24px;
        padding-right: 24px;
    }

    .dockage-form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .dockage-partners-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }
}

@media (max-width: 480px) {
    .dockage-hero {
        min-height: 400px;
        margin-top: 70px;
    }


    .dockage-value-section,
    .dockage-request-section,
    .dockage-partners-section {
        padding: 60px 0;
    }

    .dockage-container {
        padding: 0 16px;
    }

    .dockage-request-wrapper {
        border-radius: 20px;
    }

    .dockage-upload-area {
        padding: 30px 16px;
    }

    .dockage-form-section {
        margin-bottom: 32px;
    }

    .dockage-partner-card {
        padding: 24px;
    }
}

/* Scroll Animation */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* ===================== SECTION CARD STYLES ===================== */
.section-card {
   background: #f8f9f7;
   border-radius: 24px;
   padding: 40px;
   margin-bottom: 100px;
   box-shadow: 0 4px 12px rgba(0,0,0,0.05);
   border: 1px solid #e8ebe7;
}

.section-title {
   font-size: clamp(1.75rem, 3vw, 2.25rem);
   font-weight: 800;
   color: #1a3a2a;
   margin-bottom: 20px;
}

.section-copy {
   font-size: clamp(1rem, 1.8vw, 1.125rem);
   color: #5f6d60;
   line-height: 1.7;
   max-width: 800px;
}
@media (max-width: 768px) {
   .section-card {
     padding: 20px;
     margin: 20px 0;
   }
}


    .dockage-row {
        grid-template-columns: 1fr;
    }

@media (max-width: 768px) {
    .dockage-hero {
        min-height: 450px;
        margin-top: 70px;
    }
.dockage-hero-content{
    padding: 65px 24px !important;
}

    .dockage-request-header,
    .dockage-form {
        padding-left: 24px;
        padding-right: 24px;
    }

    .dockage-form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .dockage-partners-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }
}

@media (max-width: 480px) {
    .dockage-hero {
        min-height: 400px;
        margin-top: 70px;
    }


    .dockage-value-section,
    .dockage-request-section,
    .dockage-partners-section {
        padding: 60px 0;
    }

    .dockage-container {
        padding: 0 16px;
    }

    .dockage-request-wrapper {
        border-radius: 20px;
    }

    .dockage-upload-area {
        padding: 30px 16px;
    }

    .dockage-form-section {
        margin-bottom: 32px;
    }

    .dockage-partner-card {
        padding: 24px;
    }
}

/* Scroll Animation */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* ===================== SECTION CARD STYLES ===================== */
.section-card {
   background: #f8f9f7;
   border-radius: 24px;
   padding: 40px;
   margin-bottom: 100px;
   box-shadow: 0 4px 12px rgba(0,0,0,0.05);
   border: 1px solid #e8ebe7;
}

.section-title {
   font-size: clamp(1.75rem, 3vw, 2.25rem);
   font-weight: 800;
   color: #1a3a2a;
   margin-bottom: 20px;
}

.section-copy {
   font-size: clamp(1rem, 1.8vw, 1.125rem);
   color: #5f6d60;
   line-height: 1.7;
   max-width: 800px;
}
@media (max-width: 768px) {
   .section-card {
     padding: 20px;
     margin: 20px 0;
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


    .dockage-row {
        grid-template-columns: 1fr;
    }

@media (max-width: 768px) {
    .dockage-hero {
        min-height: 450px;
        margin-top: 70px;
    }
.dockage-hero-content{
    padding: 65px 24px !important;
}

    .dockage-request-header,
    .dockage-form {
        padding-left: 24px;
        padding-right: 24px;
    }

    .dockage-form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .dockage-partners-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }
}

@media (max-width: 480px) {
    .dockage-hero {
        min-height: 400px;
        margin-top: 70px;
    }


    .dockage-value-section,
    .dockage-request-section,
    .dockage-partners-section {
        padding: 60px 0;
    }

    .dockage-container {
        padding: 0 16px;
    }

    .dockage-request-wrapper {
        border-radius: 20px;
    }

    .dockage-upload-area {
        padding: 30px 16px;
    }

    .dockage-form-section {
        margin-bottom: 32px;
    }

    .dockage-partner-card {
        padding: 24px;
    }
}

/* Scroll Animation */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
/* ===================== SECTION CARD STYLES ===================== */
.section-card {
   background: #f8f9f7;
   border-radius: 24px;
   padding: 40px;
   margin-bottom: 100px;
   box-shadow: 0 4px 12px rgba(0,0,0,0.05);
   border: 1px solid #e8ebe7;
}

.section-title {
   font-size: clamp(1.75rem, 3vw, 2.25rem);
   font-weight: 800;
   color: #1a3a2a;
   margin-bottom: 20px;
}

.section-copy {
   font-size: clamp(1rem, 1.8vw, 1.125rem);
   color: #5f6d60;
   line-height: 1.7;
   max-width: 800px;
}
@media (max-width: 768px) {
  .section-card {
    padding: 20px;
    margin: 20px 0;
  }
}
</style>