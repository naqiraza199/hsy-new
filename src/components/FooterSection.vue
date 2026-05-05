<template>
 <!-- ====================== FOOTER SECTION ====================== -->
    <footer class="hs-footer">
        <div class="hs-footer-container">

            <!-- Top Call to Action -->
            <div class="hs-footer-cta">
                <div class="hs-cta-content">
                    <h2 class="hs-cta-title">Call Our Advisors Now!</h2>
                    <p class="hs-cta-subtitle">
                        Stay Connected with the latest updates, news, and special offers from High Seas Yachting.
                    </p>
                </div>
                <a href="tel:+19546861671" class="hs-call-btn">
                    <i class="fas fa-phone"></i> Call Us Now
                </a>
            </div>

            <div class="hs-footer-main">

                <!-- Logo & About -->
                <div class="hs-footer-col hs-footer-brand">
                    <router-link to="/" >
                    <div class="hs-footer-logo">
                        <img src="/images/white-hsy.svg" alt="High Seas Yachting">
                    </div>
                    </router-link>
                  
                    <p class="hs-footer-tagline">
                        A Trusted &amp; Committed Client-Centric Firm dedicated to providing the best yacht experiences.
                    </p>
                    <div class="hs-social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="hs-footer-col">
                    <h4 class="hs-footer-heading">Quick Links</h4>
                    <ul class="hs-footer-links">
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/about-us">About Us</router-link></li>
                        <li><router-link to="/forsale">For Sale</router-link></li>
                        <li><router-link to="/dockage">Dockage</router-link></li>
                        <li><router-link to="/contact-us">Contact Us</router-link></li>
                    </ul>
                </div>

                <!-- Get In Touch -->
                <div class="hs-footer-col">
                    <h4 class="hs-footer-heading">Get In Touch</h4>
                    <div class="hs-contact-info">
                        <div class="hs-contact-item">
                            <i class="fas fa-phone"></i>
                            <a href="tel:+19546861671">+1 (954) 686-1671</a>
                        </div>
                        <div class="hs-contact-item">
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:Sales@highseasyachting.com">Sales@highseasyachting.com</a>
                        </div>
                        <div class="hs-contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Fort Lauderdale, FL</span>
                        </div>
                    </div>
                </div>

                <!-- Instagram Posts -->
                <div class="hs-footer-col hs-instagram-col">
                    <h4 class="hs-footer-heading">Instagram Posts</h4>
                    <div class="hs-instagram-grid">
                        <img src="/images/i1.webp" alt="Instagram">
                        <img src="/images/i2.webp" alt="Instagram">
                        <img src="/images/i3.webp" alt="Instagram">
                        <img src="/images/i4.webp" alt="Instagram">
                        <img src="/images/i5.webp" alt="Instagram">
                        <img src="/images/i6.webp" alt="Instagram">
                    </div>
                </div>

            </div>

            <!-- Bottom Copyright -->
            <div class="hs-footer-bottom">
                <p>&copy; 2026 High Seas Yachting. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
         name: 'FooterSection'
    }
</script>

<style scoped>
   .hs-footer {
            background: linear-gradient(180deg, #0f1f15 0%, #1a3320 100%);
            color: #ffffff;
            font-family: 'Poppins', sans-serif;
            padding-top: 80px;
        }

        .hs-footer-container {
            max-width: 1350px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* CTA Bar */
        .hs-footer-cta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #416B3C 0%, #2d4a29 100%);
            padding: 35px 45px;
            border-radius: 20px;
            margin-bottom: 60px;
            flex-wrap: wrap;
            gap: 25px;
            box-shadow: 0 10px 40px rgba(65, 107, 60, 0.3);
        }

        .hs-cta-title {
            font-size: 1.9rem;
            font-weight: 700;
            margin: 0;
        }

        .hs-cta-subtitle {
            margin: 8px 0 0;
            opacity: 0.92;
            max-width: 450px;
            line-height: 1.5;
        }

        .hs-call-btn {
            background: white;
            color: #1a3320;
            padding: 16px 36px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1rem;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.4s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .hs-call-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        /* Main Footer */
        .hs-footer-main {
            display: grid;
            grid-template-columns: 1.8fr 1fr 1fr 1.5fr;
            gap: 50px;
            margin-bottom: 60px;
        }

        .hs-footer-col h4 {
            font-size: 1.15rem;
            margin-bottom: 24px;
            color: #ffffff;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .hs-footer-links {
            list-style: none;
            padding: 0;
        }

        .hs-footer-links li {
            margin-bottom: 14px;
        }

        .hs-footer-links a {
            color: #a8c0a8;
            text-decoration: none;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
        }

        .hs-footer-links a:hover {
            color: white;
            padding-left: 5px;
        }

        .hs-footer-links a.router-link-active {
            color: white;
        }

        /* Contact Info */
        .hs-contact-item {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 18px;
            color: #a8c0a8;
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .hs-contact-item i {
            width: 20px;
            color: #416B3C;
            margin-top: 3px;
            flex-shrink: 0;
        }

        .hs-contact-item a {
            color: #a8c0a8;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .hs-contact-item a:hover {
            color: white;
        }

        /* Instagram Grid */
        .hs-instagram-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

        .hs-instagram-grid img {
            width: 100%;
            height: 80px;
            object-fit: cover;
            border-radius: 10px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .hs-instagram-grid img:hover {
            transform: scale(1.05);
            opacity: 0.85;
        }

        /* Brand */
        .hs-footer-logo {
            margin-bottom: 20px;
        }

        .hs-footer-logo img {
            height: 100px;
            width: auto;
        }

        .hs-footer-tagline {
            color: #a8c0a8;
            line-height: 1.6;
            max-width: 280px;
            margin-bottom: 24px;
            font-size: 0.95rem;
        }

        .hs-social-icons {
            display: flex;
            gap: 12px;
        }

        .hs-social-icons a {
            display: inline-flex;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.08);
            color: white;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .hs-social-icons a:hover {
            background: #416B3C;
            transform: translateY(-4px);
        }

        /* Bottom Bar */
        .hs-footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding: 30px 0;
            text-align: center;
            color: #6e7570;
            font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 1100px) {
            .hs-footer-main {
                grid-template-columns: 1fr 1fr;
                gap: 40px;
            }
            .hs-footer-brand {
                grid-column: span 2;
            }
        }

        @media (max-width: 768px) {
            .hs-footer-main {
                grid-template-columns: 1fr;
                gap: 40px;
            }
            .hs-footer-brand {
                grid-column: span 1;
            }
            .hs-footer-cta {
                flex-direction: column;
                text-align: center;
                padding: 30px 25px;
            }
            .hs-cta-title {
                font-size: 1.6rem;
            }
            .hs-footer {
                padding-top: 60px;
            }
            .hs-instagram-grid img {
                height: 70px;
            }
        }
</style>