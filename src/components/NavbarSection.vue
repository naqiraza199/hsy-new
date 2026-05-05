<template>
  <!-- Navigation -->
        <nav class="navbar">
            <div class="nav-container">
                <router-link to="/" class="logo">
                    <img src="/images/hsy-logo.svg" alt="High Seas Yachting Logo">
                </router-link>

                <ul class="nav-menu">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/forsale">For Sale</router-link></li>
                    <li class="dropdown" @mouseenter="showCharterDropdown" @mouseleave="hideCharterDropdown">
                        <a href="#" :class="{ active: charterDropdown }">Charter</a>
                        <ul class="dropdown-menu" v-show="charterDropdown">
                            <li><router-link to="/day-charter">Day Charter</router-link></li>
                            <li><router-link to="/term-charter">Term Charter</router-link></li>
                        </ul>
                    </li>
                    <li><router-link to="/dockage">Dockage</router-link></li>
                    <li><router-link to="/blog">Blog</router-link></li>
                    <li class="dropdown" @mouseenter="showResourcesDropdown" @mouseleave="hideResourcesDropdown">
                        <a href="#" :class="{ active: resourcesDropdown }">Resources</a>
                        <ul class="dropdown-menu" v-show="resourcesDropdown">
                            <li><router-link to="/about-us">About Us</router-link></li>
                            <li><router-link to="/our-team">Our Team</router-link></li>
                            <li><router-link to="/events">Events</router-link></li>
                            <li><router-link to="/contact-us">Contact Us</router-link></li>
                        </ul>
                    </li>
                </ul>

        <div class="nav-right">
            <router-link to="/contact-us" class="book-btn">Contact Us →</router-link>

            <!-- Search Toggle Button -->
            <button class="nav-search-toggle" @click="toggleSearch" :class="{ active: searchOpen }" aria-label="Toggle search">
                <i class="fas fa-search"></i>
            </button>

            <button class="mobile-toggle" @click.stop="toggleMobileMenu" :class="{ active: mobileMenuOpen }">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        </div>
    </nav>

    <!-- Navbar Search Overlay/Input -->
    <div class="nav-search-overlay" :class="{ active: searchOpen }" @click.self="closeSearch">
        <div class="nav-search-container">
            <div class="nav-search-box">
                <i class="fas fa-search nav-search-icon"></i>
                <input
                    ref="searchInput"
                    type="text"
                    v-model="searchQuery"
                    @keyup.enter="performSearch"
                    placeholder="Search yacht name, make, model..."
                    class="nav-search-input"
                >
                <button class="nav-search-submit" @click="performSearch">
                    Search
                </button>
                <button class="nav-search-close" @click="closeSearch">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
        <div class="mobile-menu" :class="{ active: mobileMenuOpen }" id="mobileMenu">
            <div class="mobile-menu-header">
                <button class="mobile-close-btn" @click="closeMobileMenu">
                    <span>✕</span>
                </button>
            </div>
            <router-link to="/">Home</router-link>
            <router-link to="/forsale">For Sale</router-link>
            <div class="mobile-dropdown charter-dropdown">
                <a href="#" @click.prevent="toggleCharterDropdown($event)" class="mobile-dropdown-toggle charter-toggle" :class="{ active: charterDropdown }">Charter</a>
                <div class="mobile-dropdown-menu" v-if="charterDropdown">
                    <router-link to="/day-charter">Day Charter</router-link>
                    <router-link to="/term-charter">Term Charter</router-link>
                </div>
            </div>
            <router-link to="/dockage">Dockage</router-link>
            <router-link to="/blog">Blog</router-link>
            <div class="mobile-dropdown resources-dropdown">
                <a href="#" @click.prevent="toggleResourcesDropdown($event)" class="mobile-dropdown-toggle resources-toggle" :class="{ active: resourcesDropdown }">Resources</a>
                <div class="mobile-dropdown-menu" v-if="resourcesDropdown">
                    <router-link to="/about-us">About Us</router-link>
                    <router-link to="/our-team">Our Team</router-link>
                    <router-link to="/events">Events</router-link>
                    <router-link to="/contact-us">Contact Us</router-link>
                </div>
            </div>
            <div class="mobile-contact">
                <a href="mailto:Sales@highseasyachting.com">Sales@highseasyachting.com</a>
                <a href="tel:+19546861671">+1 (954) 686-1671</a>
                <router-link to="/contact-us" class="book-btn">Book Now →</router-link>
            </div>
        </div>
</template>

<script>
    export default {
       name: 'NavbarSection',
       data() {
           return {
               charterDropdown: false,
               resourcesDropdown: false,
               mobileMenuOpen: false,
               searchOpen: false,
               searchQuery: ''
           }
       },
        methods: {
            showCharterDropdown() {
                this.charterDropdown = true;
                this.resourcesDropdown = false; // Close other dropdown
            },
            hideCharterDropdown() {
                this.charterDropdown = false;
            },
            showResourcesDropdown() {
                this.resourcesDropdown = true;
                this.charterDropdown = false; // Close other dropdown
            },
            hideResourcesDropdown() {
                this.resourcesDropdown = false;
            },
             toggleCharterDropdown(e) {
                 e.stopPropagation();
                 this.charterDropdown = !this.charterDropdown;
                 this.resourcesDropdown = false;
             },
             toggleResourcesDropdown(e) {
                 e.stopPropagation();
                 this.resourcesDropdown = !this.resourcesDropdown;
                 this.charterDropdown = false;
             },
            closeDropdowns() {
                this.charterDropdown = false;
                this.resourcesDropdown = false;
            },
            toggleMobileMenu() {
                this.mobileMenuOpen = !this.mobileMenuOpen;
            },
            closeMobileMenu() {
                this.mobileMenuOpen = false;
            },
            toggleSearch() {
                this.searchOpen = !this.searchOpen;
                if (this.searchOpen) {
                    this.$nextTick(() => {
                        if (this.$refs.searchInput) {
                            this.$refs.searchInput.focus();
                        }
                    });
                } else {
                    this.searchQuery = '';
                }
            },
            closeSearch() {
                this.searchOpen = false;
                this.searchQuery = '';
            },
            performSearch() {
                if (this.searchQuery.trim()) {
                    this.$router.push({
                        path: '/forsale',
                        query: { q: this.searchQuery.trim() }
                    });
                    this.closeSearch();
                }
            }
        },
        mounted() {
            document.addEventListener('click', (e) => {
                const isCharterClick = e.target.closest('.charter-dropdown');
                const isResourcesClick = e.target.closest('.resources-dropdown');
                
                if (!isCharterClick) {
                    this.charterDropdown = false;
                }
                if (!isResourcesClick) {
                    this.resourcesDropdown = false;
                }
                if (!this.$el.contains(e.target) || e.target.closest('.mobile-menu')) {
                    this.closeMobileMenu();
                }
            });

            // Close search on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.searchOpen) {
                    this.closeSearch();
                }
            });
        }
    }


</script>

<style scoped>
/* NAV BAR */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background: white;
            box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1);
            height: 105px;
        }

        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 85px;
            margin-top: 10px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            z-index: 1001;
        }

        .logo img {
            height: 80px;
        }

        .nav-menu {
            display: flex;
            align-items: center;
            gap: 2.2rem;
            list-style: none;
        }

        .nav-menu a {
            text-decoration: none;
            color: #1a3320;
            font-weight: 600;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            position: relative;
            padding: 10px 0;
        }

        .nav-menu a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #416B3C;
            transition: width 0.3s ease;
        }

        .nav-menu a:hover::after {
            width: 100%;
        }

        .nav-menu a:hover {
            color: #416B3C;
        }

        .nav-menu a.router-link-active {
            color: #416B3C;
        }

        .nav-menu a.router-link-active::after {
            width: 100%;
        }

        /* Dropdown Styles */
        .dropdown {
            position: relative;
        }

        .dropdown a.active {
            color: #416B3C;
        }

        .dropdown a.active::after {
            width: 100%;
        }

        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            min-width: 200px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 10px 0;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }

        .dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown-menu li {
            list-style: none;
        }

        .dropdown-menu a {
            display: block;
            padding: 12px 20px;
            color: #1a3320;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.85rem;
            text-transform: none;
            transition: all 0.3s ease;
        }

        .dropdown-menu a:hover {
            background: #f5f5f5;
            color: #416B3C;
            padding-left: 25px;
        }

        .nav-right {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .book-btn {
            background: #416B3C;
            color: white;
            padding: 14px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(65, 107, 60, 0.3);
        }

        .book-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(65, 107, 60, 0.4);
            background: #355a32;
        }

        .mobile-toggle {
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 4px;
            width: 45px;
            height: 45px;
            cursor: pointer;
            z-index: 1001;
            background: #416B3C;
            border-radius: 8px;
            padding: 0;
            box-shadow: 0 2px 10px rgba(65, 107, 60, 0.2);
            transition: all 0.3s ease;
        }

        .mobile-toggle:hover {
            background: #355a32;
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(65, 107, 60, 0.3);
        }

        .mobile-toggle span {
            width: 24px;
            height: 2px;
            background: white;
            transition: all 0.3s ease;
            border-radius: 1px;
            position: relative;
        }

        .mobile-toggle.active {
            background: #1a3320;
        }

        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
            transform: translateX(10px);
        }

        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }

        .mobile-menu {
            position: fixed;
            top: 0;
            right: -300px; /* Hidden by default */
            width: 300px;
            height: 100vh;
            background: #ffffff;
            flex-direction: column;
            justify-content: flex-start;
            padding: 90px 0 0 0;
            gap: 0;
            z-index: 999;
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
            transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            overflow-y: auto;
        }

        .mobile-menu.active {
            right: 0; /* Slide in when active */
            opacity: 1; /* Ensure full opacity when active */
        }

        .mobile-menu::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.1);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
            z-index: -1;
        }

        .mobile-menu.active::before {
            opacity: 1;
            visibility: visible;
        }

        .mobile-menu-header {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 70px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 20px;
            background: linear-gradient(135deg, #416B3C 0%, #355a32 100%);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .mobile-close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
        }

        .mobile-close-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.1);
        }

        .mobile-menu a {
            color: #1a3320;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 600;
            padding: 16px 24px;
            border-bottom: 1px solid rgba(26, 51, 32, 0.1);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            display: flex;
            align-items: center;
            margin: 0 8px;
            border-radius: 8px;
        }

        .mobile-menu a:hover {
            background: linear-gradient(135deg, rgba(65, 107, 60, 0.1), rgba(65, 107, 60, 0.05));
            color: #416B3C;
            transform: translateX(8px);
            box-shadow: 0 4px 15px rgba(65, 107, 60, 0.1);
        }

        .mobile-menu a::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 2px;
            background: #416B3C;
            transition: width 0.3s ease;
        }

        .mobile-menu a:hover::before {
            width: 4px;
        }

        .mobile-dropdown {
            width: 100%;
        }

        .mobile-dropdown-toggle {
            color: #1a3320;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 600;
            padding: 16px 24px;
            border-bottom: 1px solid rgba(26, 51, 32, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 8px;
            border-radius: 8px;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
        }

        .mobile-dropdown-toggle::after {
            content: '▼';
            font-size: 0.8rem;
            color: #416B3C;
            transition: transform 0.3s ease;
            margin-left: 8px;
        }

        .mobile-dropdown-toggle.active::after {
            transform: rotate(180deg);
        }

        .mobile-dropdown-toggle.active {
            background: rgba(65, 107, 60, 0.1);
            color: #416B3C;
            font-weight: 700;
            border-left: 3px solid #416B3C;
            padding-left: 21px;
        }

        .mobile-dropdown-toggle:hover {
            background: linear-gradient(135deg, rgba(65, 107, 60, 0.1), rgba(65, 107, 60, 0.05));
            color: #416B3C;
            transform: translateX(8px);
            box-shadow: 0 4px 15px rgba(65, 107, 60, 0.1);
        }

        .mobile-dropdown-menu {
            background: #f8f9f7;
            border-left: 3px solid #416B3C;
            margin: 4px 16px;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
            opacity: 1;
            display: block;
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .mobile-dropdown-menu a {
            font-size: 1rem;
            padding: 14px 20px;
            border-bottom: 1px solid rgba(65, 107, 60, 0.1);
            font-weight: 500;
            margin: 0;
            border-radius: 0;
            transition: all 0.3s ease;
        }

        .mobile-dropdown-menu a:hover {
            background: linear-gradient(135deg, rgba(65, 107, 60, 0.15), rgba(65, 107, 60, 0.08));
            color: #355a32;
            transform: translateX(4px);
            padding-left: 24px;
            opacity: 1;
        }

        .mobile-dropdown-menu a:last-child {
            border-bottom: none;
        }

        .mobile-contact {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.2rem;
            margin-top: auto;
            padding: 2.5rem 1.5rem;
            background: linear-gradient(135deg, #416B3C 0%, #355a32 100%);
            width: 100%;
            color: white;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }

        .mobile-contact a {
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.95rem;
            text-decoration: none;
            border: none;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .mobile-contact a:hover {
            color: white;
            transform: scale(1.05);
        }

        .mobile-contact .book-btn {
            margin-top: 1rem;
            background: white;
            color: #416B3C;
            border: 2px solid white;
            box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
        }

        .mobile-contact .book-btn:hover {
            background: rgba(255, 255, 255, 0.9);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 1100px) {
            .nav-menu {
                gap: 1.5rem;
            }

            .nav-menu a {
                font-size: 0.8rem;
            }
        }

        @media (max-width: 900px) {
            .nav-menu {
                gap: 1.2rem;
            }

            .nav-menu a {
                font-size: 0.75rem;
                padding: 8px 0;
            }

            .book-btn {
                padding: 12px 24px;
                font-size: 0.85rem;
            }
        }

        @media (max-width: 768px) {
            .nav-menu,
            .nav-right .book-btn {
                display: none;
            }

            .mobile-toggle {
                display: flex;
            }

            .mobile-menu {
                display: flex;
            }

            .nav-container {
                padding: 0 1.5rem;
                height: 70px;
            }

            .logo img {
                height: 45px;
            }
        }

        @media (max-width: 640px) {
            .mobile-menu {
                width: 280px;
                right: -280px;
            }

            .mobile-menu a {
                font-size: 1rem;
                padding: 14px 20px;
                margin: 0 6px;
            }

            .mobile-dropdown-toggle {
                font-size: 1rem;
                padding: 14px 20px;
                margin: 0 6px;
            }

            .mobile-dropdown-menu a {
                font-size: 0.95rem;
                padding: 12px 16px;
            }
        }

        @media (max-width: 480px) {
            .navbar {
                height: 70px;
            }

            .nav-container {
                padding: 0 1rem;
                height: 60px;
            }

            .logo img {
                height: 40px;
            }

            .mobile-menu {
                width: 260px;
                right: -260px;
                padding-top: 80px;
            }

            .mobile-menu a {
                font-size: 0.95rem;
                padding: 12px 16px;
                margin: 0 4px;
            }

            .mobile-dropdown-toggle {
                font-size: 0.95rem;
                padding: 12px 16px;
                margin: 0 4px;
            }

            .mobile-dropdown-menu {
                margin: 4px 12px;
            }

            .mobile-dropdown-menu a {
                font-size: 0.9rem;
                padding: 10px 14px;
            }

            .mobile-contact {
                padding: 2rem 1rem;
                gap: 1rem;
            }

            .mobile-contact a {
                font-size: 0.9rem;
            }

            .mobile-contact .book-btn {
                padding: 12px 24px;
                font-size: 0.85rem;
            }
        }

        /* ============================================
           NAVBAR SEARCH STYLES
        ============================================ */
        .nav-search-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            background: transparent;
            border: 2px solid #416B3C;
            border-radius: 50%;
            color: #416B3C;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .nav-search-toggle:hover {
            background: rgba(65, 107, 60, 0.1);
            transform: scale(1.05);
        }

        .nav-search-toggle.active {
            background: #416B3C;
            color: white;
        }

        /* Search Overlay */
        .nav-search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, #376132 0%, #2d4a29cf 100%);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-search-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        /* Search Container */
        .nav-search-container {
            width: 100%;
            max-width: 800px;
            padding: 0 24px;
            transform: translateY(-30px) scale(0.95);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-search-overlay.active .nav-search-container {
            transform: translateY(0) scale(1);
        }

        /* Search Box */
        .nav-search-box {
            display: flex;
            align-items: center;
            background: white;
            border-radius: 60px;
            padding: 12px 12px 12px 28px;
            box-shadow: 0 20px 60px rgba(15, 40, 24, 0.15), 0 8px 30px rgba(0, 0, 0, 0.08);
            border: 3px solid transparent;
            transition: all 0.4s ease;
        }

        .nav-search-box:focus-within {
            border-color: #416B3C;
            box-shadow: 0 25px 70px rgba(65, 107, 60, 0.2), 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        /* Search Icon */
        .nav-search-icon {
            color: #416B3C;
            font-size: 1.3rem;
            margin-right: 16px;
            flex-shrink: 0;
        }

        /* Search Input */
        .nav-search-input {
            flex: 1;
            border: none;
            outline: none;
            font-size: 1.15rem;
            font-family: 'Poppins', sans-serif;
            color: #0d1117;
            background: transparent;
            padding: 8px 12px;
        }

        .nav-search-input::placeholder {
            color: #8b9a8f;
            font-weight: 400;
        }

        /* Search Submit Button */
        .nav-search-submit {
            background: linear-gradient(135deg, #416B3C, #355a32);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 14px 32px;
            font-size: 0.95rem;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
            box-shadow: 0 4px 20px rgba(65, 107, 60, 0.3);
        }

        .nav-search-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(65, 107, 60, 0.4);
            background: linear-gradient(135deg, #355a32, #2d4a28);
        }

        .nav-search-submit:active {
            transform: translateY(0);
        }

        /* Search Close Button */
        .nav-search-close {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background: #f3f4f6;
            border: none;
            border-radius: 50%;
            color: #5a6b63;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-left: 12px;
            flex-shrink: 0;
        }

        .nav-search-close:hover {
            background: #e5e7eb;
            color: #0d1117;
            transform: rotate(90deg);
        }

        /* Responsive Search */
        @media (max-width: 768px) {
            .nav-search-toggle {
                display: flex;
            }
        }

        @media (max-width: 640px) {
            .nav-search-box {
                flex-direction: column;
                padding: 20px;
                border-radius: 24px;
                gap: 16px;
            }

            .nav-search-icon {
                display: none;
            }

            .nav-search-input {
                width: 100%;
                text-align: center;
                font-size: 1rem;
                padding: 12px;
                border-bottom: 2px solid #e5e7eb;
                border-radius: 0;
            }

            .nav-search-submit {
                width: 100%;
                padding: 16px;
                border-radius: 14px;
            }

            .nav-search-close {
                position: absolute;
                top: 20px;
                right: 20px;
                margin-left: 0;
            }

            .nav-search-container {
                position: relative;
            }
        }

        @media (max-width: 480px) {
            .nav-search-container {
                padding: 0 16px;
            }

            .nav-search-box {
                padding: 16px;
            }

            .nav-search-input {
                font-size: 0.95rem;
            }

            .nav-search-submit {
                font-size: 0.9rem;
                padding: 14px;
            }
        }
</style>