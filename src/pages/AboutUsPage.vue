<template>
    <NavbarSection />
<header class="page-hero">
    <div class="hero-content">
      <span class="hero-label"><i class="fas fa-compass"></i> About Us</span>
      <h1 class="hero-title">About High Seas Yachting</h1>
      <p class="hero-copy">Discover the story behind South Florida's premier yacht brokerage, where tradition meets innovation in luxury yachting.</p>
    </div>
  </header>

  <main class="content-shell">
    <section class="about-intro">
      <h2 class="intro-title">About High Seas Yachting</h2>
      <p class="intro-text">Welcome to High Seas Yachting—where tradition meets innovation in South Florida's premier yacht market. Based in Fort Lauderdale, our team blends four generations of yachting experience with modern, client-first services to deliver trusted brokerage and charter solutions for luxury vessel owners and buyers.</p>
    </section>

    <section class="quote-section">
      <p class="quote-text">"With High Seas Yachting, our primary focus is to create a private and convenient relationship with our clients. Respecting the trust our clients give us, we provide a service that will be honest, dedicated, and reciprocated to create a memorable and successful experience for all involved."</p>
      <p class="quote-author">
        <span class="author-badge"><i class="fas fa-user-circle"></i> Shane & Brett</span>
      </p>
    </section>

    <section class="story-section">
      <div class="story-image">
        <img src="/images/sa1.webp" alt="Ocean at sunset">
      </div>
      <div class="story-content">
        <h2 class="story-title">Our Story & Heritage</h2>
        <div class="story-text">
          <p>With roots going back over 15 years, High Seas Yachting was founded by industry professionals with deep ties to Miami, Palm Beach, and Fort Lauderdale. This family legacy spans decades of delivering yachts, managing charters, and guiding first-time and repeat buyers through South Florida's competitive yacht scene.</p>
         </div>
      </div>
    </section>

    <section class="about-intro">
      <h2 class="intro-title"> Our Mission & Values </h2>
      <p class="intro-text">Our mission is simple: to deliver discreet, customized luxury experiences. We believe in building long-term relationships by offering concierge-style support, private listings, and open communication at every stage of your yachting journey.</p>
    </section>

    <section class="story-section">
      <div class="story-content">
        <h2 class="story-title">What Sets Us Apart</h2>
        <div class="story-text">
          <p>We’re not a volume shop. We focus on private yacht listings, concierge-level service, and local expertise that ensures every transaction is handled with precision. Our team personally handles every listing, charter, and care service—ensuring consistent quality and results.</p>
        </div>
      </div>

      <div class="story-image">
        <img src="/images/sa2.avif" alt="Ocean at sunset">
      </div>
    </section>

    <section class="team-intro">
      <div class="team-intro-image">
        <img src="/images/sa3.webp" alt="Our Team">
      </div>
    </section>

  </main>


    <section class="advisor-section">
      <div class="advisor-section-inner">
        <h2>Meet Our Trusted Advisors</h2>
        <p>Founders Shane & Brett lead High Seas Yachting with a vision rooted in transparency, service, and integrity. Their combined experience in yacht brokerage, marine management, and lifestyle services gives clients a rare advantage in the luxury yachting world.</p>

        <div class="advisor-grid">
          <div class="advisor-card">
            <div class="advisor-image">
              <img src="/images/sa4.webp" alt="Brett Horowitz">
            </div>
            <div class="advisor-content">
              <div class="advisor-name">Brett Horowitz</div>
              <div class="advisor-role">Co-Founder | Sales & Charter</div>
              <div class="advisor-social">
                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>

          <div class="advisor-card">
            <div class="advisor-image">
              <img src="/images/sa5.webp" alt="Shane Bussey">
            </div>
            <div class="advisor-content">
              <div class="advisor-name">Shane Bussey</div>
              <div class="advisor-role">Co-Founder | Sales & Charter</div>
              <div class="advisor-social">
                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="events-section">
      <div class="events-inner">
        <div class="events-header">
          <h2>Boat Show Highlights</h2>
          <p>Discover our latest yacht show appearances and featured events where High Seas Yachting brings exclusive vessels, luxury invites, and premium ownership experiences to life.</p>
        </div>

        <div class="events-grid">
          <article class="event-card" v-for="event in events" :key="event.id">
            <router-link :to="'/event/' + event.id" class="event-card-link">
              <div class="event-image">
                <img :src="event.image" :alt="event.name">
              </div>
              <div class="event-content">
                <div class="event-title">{{ event.name }}</div>
                <div class="event-date"><i class="fas fa-calendar-alt"></i> {{ formatDate(event.date) }}</div><br>
                <span class="event-button">Learn More <i class="fas fa-arrow-right"></i></span>
              </div>
            </router-link>
          </article>
        </div>
    </div>
    </section>

     <section class="term-contact">
      <div class="term-contact-inner">
        <div class="term-contact-grid">
          <div class="term-contact-copy">
            <span class="section-tag"><i class="fas fa-anchor"></i> Contact Us Now</span>
            <h2>Let’s Build Our Relationship</h2>
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

          <form class="term-contact-form" id="aboutContactForm" @submit.prevent="submitLeadForm">
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
    <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';

    export default {
        name: 'AboutUsPage',
        components: {
            NavbarSection,
            FooterSection
        },
        data() {
            return {
                events: [],
                loading: true,
                formLoading: false
            }
        },
        async mounted() {
            try {
                const response = await fetch('/data/events.json');
                const data = await response.json();
                this.events = data[0].records.slice(0, 3);
            } catch (error) {
                console.error('Error loading events:', error);
            } finally {
                this.loading = false;
            }
        },
        methods: {
            submitLeadForm() {
                const form = document.getElementById('aboutContactForm');
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
                            alert('Thank you! Your inquiry has been submitted successfully.');
                        } else {
                            alert(result.error || 'Something went wrong. Please try again.');
                        }
                    });
                })
                .catch(function() {
                    alert('Network error. Please check your connection and try again.');
                })
                .finally(function() {
                    self.formLoading = false;
                });
            },
            formatDate(dateString) {
                if (!dateString) return '';
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
      background:#fdfdfd;
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
        url('/images/about.jpeg') center/cover no-repeat;
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
      letter-spacing: -0.03em;
      margin-bottom: 18px;
      text-transform: uppercase;
      word-spacing: 0.1em;
    }

    .hero-copy {
      max-width: 600px;
      margin: 0 auto;
      font-size: 1.1rem;
      color: rgba(255,255,255,0.85);
      line-height: 1.8;
    }

    .content-shell {
      max-width: 1400px;
      margin: 0 auto;
      padding: 80px 24px 120px;
    }

    .about-intro {
      background: #ffffff;
      border-radius: 32px;
      padding: 52px 56px;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(15, 40, 24, 0.08);
      margin-bottom: 50px;
      position: relative;
      overflow: hidden;
    }

    .about-intro::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background: linear-gradient(180deg, #1a3a2a 0%, #355a32 100%);
    }

    .intro-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 20px;
      line-height: 1.1;
      position: relative;
    }

    .intro-title::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #355a32);
      border-radius: 2px;
      margin-top: 16px;
    }

    .intro-text {
      color: #5f6d60;
      font-size: 1.08rem;
      line-height: 1.9;
      font-weight: 400;
    }

    .quote-section {
      margin: 120px 0;
      padding: 48px 52px;
      background: linear-gradient(135deg, #ffffff 0%, rgba(53,90,50,0.05) 100%);
      border: 1px solid rgba(53,90,50, 0.12);
      border-radius: 32px;
      position: relative;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
    }

    .quote-section::before {
      content: '\f10d';
      font-family: 'Font Awesome 6 Free';
      font-weight: 900;
      position: absolute;
      top: -20px;
      left: 32px;
      font-size: 2.8rem;
      color: #1a3a2a;
      opacity: 0.15;
    }

    .quote-text {
      font-size: 1.22rem;
      font-style: italic;
      color: #102012;
      margin-bottom: 24px;
      line-height: 1.8;
      font-weight: 500;
    }

    .quote-author {
      font-size: 0.95rem;
      color: #5f6d60;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .author-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      background: #1a3a2a;
      color: white;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .story-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      margin-bottom: 120px;
      margin-top: 150px;
    }

    .story-image {
      width: 100%;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
      min-height: 98%;
      position: relative;
    }

    .story-image::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 32px;
      border: 2px solid rgba(255,255,255,0.3);
      pointer-events: none;
    }

    .story-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .story-image:hover img {
      transform: scale(1.06);
    }

    .story-content {
      padding: 0 16px;
    }

    .story-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 24px;
      line-height: 1.1;
      position: relative;
    }

    .story-title::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #355a32);
      border-radius: 2px;
      margin-top: 16px;
    }

    .story-text {
      color: #5f6d60;
      font-size: 1.08rem;
      line-height: 1.9;
    }

    .story-text p {
      margin-bottom: 20px;
    }

    .story-text p:last-child {
      margin-bottom: 0;
    }

    .team-intro {
      position: relative;
      text-align: center;
      padding: 0 24px;
    }

    .team-intro-image {
      max-width: 900px;
      margin: 0 auto;
    }

    .team-intro-image::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 32px;
      border: 3px solid rgba(255,255,255,0.4);
      pointer-events: none;
      z-index: 1;
    }

    .team-intro-image img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }

    .team-intro-image:hover img {
      transform: scale(1.02);
    }


    .advisor-section {
      background: linear-gradient(145deg, #1a3a2a 0%, #0f2819 100%);
      padding: 80px 24px;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
      position: relative;
      overflow: hidden;
    }

    .advisor-section-inner {
      max-width: 1100px;
      margin: 0 auto;
    }

       .advisor-section-inner p{
     font-family: 'Poppins', sans-serif;
  color: #fff;
  line-height: 1.7;
  text-align: center;
    }

    .advisor-section::before {
      content: '';
      position: absolute;
      top: -100px;
      right: -100px;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    .advisor-section::after {
      content: '';
      position: absolute;
      bottom: -80px;
      left: -80px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
      pointer-events: none;
    }

    .advisor-section h2 {
      font-size: 2.4rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 16px;
      line-height: 1.1;
      position: relative;
      text-align: center;
    }

    .advisor-section h2::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #5a8f5e, #7cb87a);
      border-radius: 2px;
      margin: 16px auto 0;
    }

    .advisor-section > p {
      max-width: 700px;
      color: rgba(255,255,255,0.75);
      font-size: 1.08rem;
      line-height: 1.85;
      margin: 0 auto 48px;
      text-align: center;
    }

    .advisor-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
      max-width: 900px;
      margin: 0 auto;
      margin-top: 50px;
    }

    .advisor-card {
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(10px);
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      border: 1px solid rgba(255,255,255,0.1);
      transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
    }

    .advisor-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      background: rgba(255,255,255,0.12);
    }

    .advisor-image {
      width: 100%;
      height: 340px;
      overflow: hidden;
      position: relative;
    }

    .advisor-image::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(15,40,24,0.6) 0%, transparent 50%);
      pointer-events: none;
    }

    .advisor-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .advisor-card:hover .advisor-image img {
      transform: scale(1.06);
    }

    .advisor-content {
      padding: 30px 28px 34px;
      position: relative;
      text-align: center;
    }

    .advisor-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 28px;
      right: 28px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    }

    .advisor-name {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 8px;
      letter-spacing: 0.01em;
    }

    .advisor-role {
      color: rgba(255,255,255,0.7);
      font-size: 0.98rem;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .advisor-social {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    .advisor-social a {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      transition: background 0.25s ease, transform 0.25s ease, color 0.25s ease;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .advisor-social a:hover {
      background: #5a8f5e;
      color: #ffffff;
      transform: translateY(-3px);
    }

    .events-section {
      padding: 80px 24px;
      background: #f8faf9;
    }

    .events-inner {
      max-width: 1200px;
      margin: 0 auto;
    }

    .events-header {
      text-align: center;
      margin-bottom: 48px;
    }

    .events-header h2 {
      font-size: 2.4rem;
      font-weight: 800;
      color: #1a3a2a;
      margin-bottom: 18px;
      line-height: 1.1;
      position: relative;
    }

    .events-header h2::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #1a3a2a, #5a8f5e);
      border-radius: 2px;
      margin: 18px auto 0;
    }

    .events-header p {
      max-width: 700px;
      margin: 0 auto;
      color: #5f6d60;
      font-size: 1.08rem;
      line-height: 1.85;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    .event-card-link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .event-card {
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(15,40,24,0.08);
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }

    .event-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(15, 40, 24, 0.12);
    }

    .event-image {
      width: 100%;
      height: 260px;
      overflow: hidden;
      position: relative;
    }

    .event-image::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(15,40,24,0.2) 0%, transparent 40%);
      pointer-events: none;
    }

    .event-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .event-card:hover .event-image img {
      transform: scale(1.06);
    }

    .event-content {
      padding: 28px 26px 32px;
    }

    .event-title {
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 12px;
      color: #1a3a2a;
      line-height: 1.2;
    }

    .event-date {
      color: #5f6d60;
      font-size: 0.95rem;
      margin-bottom: 24px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .event-date i {
      color: #5a8f5e;
    }

    .event-button {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 26px;
      border-radius: 999px;
      border: 2px solid #1a3a2a;
      color: #1a3a2a;
      font-weight: 700;
      font-size: 0.95rem;
      transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }

    .event-button:hover {
      background: #1a3a2a;
      color: white;
      transform: translateX(4px);
    }

    .event-button i {
      font-size: 0.85rem;
      transition: transform 0.3s ease;
    }

    .event-button:hover i {
      transform: translateX(4px);
    }

    .stats-row {
      display: flex;
      gap: 24px;
      margin-top: 36px;
      padding-top: 28px;
      border-top: 1px solid rgba(15,40,24,0.1);
    }

    .stat-item {
      flex: 1;
      text-align: center;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      color: #1a3a2a;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #5f6d60;
      margin-top: 6px;
    }

    @media (max-width: 960px) {
      .story-section {
        grid-template-columns: 1fr;
        gap: 36px;
      }

      .story-image {
        min-height: 100%;
        order: 1;
      }

      .story-content {
        padding: 0;
        order: 2;
      }

.advisor-section {
        padding: 48px 28px;
      }

      .advisor-grid {
        grid-template-columns: 1fr;
        gap: 24px;
        max-width: 480px;
      }

      .team-intro-caption {
        padding: 28px 24px 24px;
      }

      .team-intro-caption p {
        font-size: 1rem;
      }

      .stats-row {
        flex-wrap: wrap;
      }

      .events-section {
        padding: 60px 24px;
      }

      .events-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }


      .stats-row {
        grid-template-columns: 1fr;
        gap: 24px;
      }


      .stats-row {
        flex-wrap: wrap;
      }

      .stat-item {
        flex: 1 1 calc(50% - 12px);
        min-width: 140px;
      }
    }

    @media (max-width: 680px) {
      .page-hero {
        min-height: 340px;
        padding: 60px 18px;
      }

      .hero-title {
        font-size: 2.6rem;
      }

      .content-shell {
        padding: 36px 18px 60px;
      }

      .about-intro {
        padding: 32px 26px;
      }

      .about-intro::before {
        width: 4px;
      }

      .intro-title {
        font-size: 1.7rem;
      }

      .intro-text {
        font-size: 1rem;
      }

      .quote-section {
        padding: 32px 26px;
        margin: 40px 0;
      }

      .quote-text {
        font-size: 1.08rem;
      }

      .story-section {
        margin-top: 80px;
        margin-bottom: 60px;
      }

      .story-title {
        font-size: 1.7rem;
      }

      .story-text {
        font-size: 1rem;
      }

      .stat-number {
        font-size: 1.4rem;
      }

      .stat-label {
        margin-top: 0;
        font-size: 0.9rem;
      }

      .advisor-section {
        padding: 40px 24px;
        margin-top: 50px;
      }

      .advisor-section h2 {
        font-size: 1.8rem;
      }

      .advisor-section > p {
        font-size: 1rem;
        margin-bottom: 32px;
        padding: 0 12px;
      }

      .advisor-grid {
        gap: 20px;
      }

      .advisor-image {
        height: 280px;
      }

      .advisor-content {
        padding: 24px 20px 28px;
      }

      .advisor-content::before {
        left: 20px;
        right: 20px;
      }

      .advisor-name {
        font-size: 1.2rem;
      }

      .team-intro {
        margin-bottom: 50px;
        padding: 0 16px;
      }



      .stats-row {
        gap: 16px;
      }

      .stat-item {
        flex: 1 1 100%;
        text-align: left;
        display: flex;
        align-items: baseline;
        gap: 8px;
        padding: 8px 0;
      }

      .events-section {
        margin-top: 60px;
        padding: 48px 20px;
      }

      .events-header h2 {
        font-size: 1.8rem;
      }

      .events-header p {
        font-size: 1rem;
      }

      .events-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .event-card {
        max-width: 400px;
        margin: 0 auto;
      }

      .event-image {
        height: 220px;
      }

      .event-title {
        font-size: 1.2rem;
      }

      .event-content {
        padding: 22px 20px 26px;
      }

      .team-intro {
        margin-bottom: 50px;
        padding: 0 16px;
      }



      .stats-row {
        gap: 16px;
      }

      .stat-item {
        flex: 1 1 100%;
        text-align: left;
        display: flex;
        align-items: baseline;
        gap: 8px;
        padding: 8px 0;
      }
    }

    .term-contact {
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
</style>