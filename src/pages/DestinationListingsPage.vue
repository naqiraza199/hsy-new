<template>
    <NavbarSection />

    <header class="page-hero">
        <div class="hero-content">
            <span class="hero-label"><i class="fas fa-ship"></i> Destination Yachts</span>
            <h1 class="hero-title">Luxury Yachts Available</h1>
            <p class="hero-copy">Discover our curated collection of luxury yachts for sale and charter across premier destinations.</p>
        </div>
    </header>

    <main class="content-shell">
        <!-- Tabs Navigation -->
        <div class="tabs-wrapper" v-if="activeListingTabs.length > 0">
            <div class="tabs-container">
                <button 
                    v-for="tab in activeListingTabs" 
                    :key="tab.value"
                    :class="['tab-btn', { active: activeTab === tab.value }]"
                    @click="activeTab = tab.value"
                >
                    <i :class="tab.icon"></i>
                    {{ tab.label }}
                </button>
            </div>
        </div>

        <!-- Listings Grid -->
        <div class="listings-grid" v-for="tab in activeListingTabs" :key="tab.value" v-show="activeTab === tab.value">
            <article 
                v-for="listing in getListingsByType(tab.value)" 
                :key="listing.id" 
                class="listing-card"
            >
                <div class="listing-image">
                    <router-link :to="'/listing-detail/' + listing.slug">
                        <img 
                            :src="getImageUrl(listing.photos[0])" 
                            :alt="listing.yachtName" 
                            loading="lazy"
                            @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80')"
                        >
                    </router-link>
                    <div class="listing-badge">{{ tab.label }}</div>
                    <router-link :to="'/listing-detail/' + listing.slug" class="view-overlay">
                        <i class="fas fa-eye"></i> View Details
                    </router-link>
                </div>
                <div class="listing-info">
                    <h3 class="listing-name">{{ listing.year }} {{ listing.manufacturer }} {{ listing.yachtName }}</h3>
                    <p class="listing-location">
                        <i class="fas fa-map-marker-alt"></i>
                        {{ listing.city ? listing.city.charAt(0).toUpperCase() + listing.city.slice(1).replace(/,/g, ', ') : 'N/A' }}, FL
                    </p>
                    <div class="listing-specs">
                        <div class="spec-item">
                            <span class="spec-value">{{ formatLength(listing.length) }}</span>
                            <span class="spec-label">Length</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-value">{{ listing.manufacturer || 'N/A' }}</span>
                            <span class="spec-label">Make</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-value">{{ listing.year }}</span>
                            <span class="spec-label">Year</span>
                        </div>
                    </div>
                    <div class="listing-price">{{ formatPrice(listing.price) }}</div>
                    <div class="listing-actions">
                        <router-link :to="'/listing-detail/' + listing.slug" class="details-btn">
                            View Details
                            <i class="fas fa-arrow-right"></i>
                        </router-link>
                        <button class="contact-btn" aria-label="Contact">
                            <i class="fas fa-phone"></i>
                        </button>
                    </div>
                </div>
            </article>
        </div>

        <!-- Empty State when no listings exist for the entire destination -->
        <div v-if="activeListingTabs.length === 0" class="empty-state">
            <i class="fas fa-ship"></i>
            <h3>No Listings Available</h3>
            <p>Check back soon for new listings in this destination.</p>
        </div>
    </main>

    <FooterSection />
</template>

<script>
import FooterSection from '../components/FooterSection.vue';
import NavbarSection from '../components/NavbarSection.vue';

const SUPABASE_URL = 'https://qumgjqbfreeskjgltfvu.supabase.co/storage/v1/object/public/listings/';

export default {
    name: 'DestinationListingsPage',
    components: {
        NavbarSection,
        FooterSection
    },
    data() {
        return {
            activeTab: 'forsale',
            regionId: this.$route.params.id,
            tabs: [
                { label: 'For Sale', value: 'forsale', icon: 'fas fa-tag' },
                { label: 'Day Charter', value: 'daycharter', icon: 'fas fa-sun' },
                { label: 'Term Charter', value: 'termcharter', icon: 'fas fa-calendar-alt' }
            ],
            listingsDataProcessed: []
        };
    },
    watch: {
        '$route.params.id': {
            immediate: true,
            async handler(newId) {
                this.regionId = newId;
                await this.processListings();
            }
        }
    },
    methods: {
        async processListings() {
            let records = [];
            try {
                const resp = await fetch('/data/listings.json');
                const listingsData = await resp.json();
                if (Array.isArray(listingsData) && listingsData.length > 0) {
                    const firstItem = listingsData[0];
                    if (firstItem && firstItem.records && Array.isArray(firstItem.records)) {
                        records = firstItem.records;
                    } else {
                        records = listingsData;
                    }
                } else if (listingsData?.records) {
                    records = listingsData.records;
                }
            } catch (e) {
                console.error('Error loading listings:', e);
            }

            const regionId = this.regionId;
            this.listingsDataProcessed = records.filter(item => {
                const listingRegionId = item.metadata?.region_id || item.region_id;
                return item && listingRegionId === regionId;
            });

            const types = ['forsale', 'daycharter', 'termcharter'];
            for (const type of types) {
                if (this.listingsDataProcessed.some(l => l.type === type)) {
                    this.activeTab = type;
                    break;
                }
            }
        },
        getListingsByType(type) {
            return this.listingsDataProcessed
                .filter(item => item.type === type)
                .map(listing => ({
                    id: listing.id,
                    yachtName: listing.yacht_name,
                    year: listing.year,
                    manufacturer: listing.manufacturer,
                    length: listing.length,
                    beam: listing.beam,
                    draft: listing.draft,
                    description: listing.description,
                    city: listing.metadata?.city || listing.city || '',
                    price: listing.metadata?.price || 0,
                    photos: listing.metadata?.photos || [],
                    slug: listing.slug || ''
                }));
        },
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
        }
    },
    computed: {
        activeListingTabs() {
            const types = [];
            if (this.getListingsByType('forsale').length > 0) {
                types.push({ ...this.tabs.find(t => t.value === 'forsale') });
            }
            if (this.getListingsByType('daycharter').length > 0) {
                types.push({ ...this.tabs.find(t => t.value === 'daycharter') });
            }
            if (this.getListingsByType('termcharter').length > 0) {
                types.push({ ...this.tabs.find(t => t.value === 'termcharter') });
            }
            return types;
        }
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background: #fdfdfd;
    color: #102012;
    line-height: 1.7;
    min-height: 100vh;
}

.page-hero {
    position: relative;
    background: linear-gradient(180deg, rgba(15, 40, 24, 0.85) 0%, rgba(15, 40, 24, 0.3) 60%),
        url('https://timesreview-images.s3.amazonaws.com/wp-content/uploads/sites/12/2025/08/GroundsDetails__DHY8964-1024x684.jpg') center/cover no-repeat;
    min-height: 380px;
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
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    text-transform: uppercase;
}

.hero-copy {
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.7;
}

.content-shell {
    max-width: 1350px;
    margin: 0 auto;
    padding: 80px 24px 100px;
}

.tabs-wrapper {
    margin-bottom: 50px;
}

.tabs-container {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}

.tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    border: 2px solid #e8ede8;
    background: #ffffff;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    color: #5f6d60;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
}

.tab-btn i {
    font-size: 0.9rem;
}

.tab-btn:hover {
    border-color: #355a32;
    color: #355a32;
    transform: translateY(-2px);
}

.tab-btn.active {
    background: linear-gradient(135deg, #1a3a2a 0%, #2d5a45 100%);
    border-color: #1a3a2a;
    color: white;
    box-shadow: 0 8px 25px rgba(26, 58, 42, 0.3);
}

.listings-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.listing-card {
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 12px 35px rgba(15, 40, 24, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(15, 40, 24, 0.06);
}

.listing-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1a3a2a, #355a32);
}

.listing-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(15, 40, 24, 0.18);
}

.listing-image {
    position: relative;
    height: 280px;
    overflow: hidden;
}

.listing-image a {
    display: block;
    height: 100%;
}

.listing-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.listing-card:hover .listing-image img {
    transform: scale(1.08);
}

.listing-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: linear-gradient(135deg, #1a3a2a 0%, #2d5a45 100%);
    color: white;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(26, 58, 42, 0.3);
}

.view-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(26, 58, 42, 0.9));
    padding: 40px 20px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: white;
    font-weight: 600;
    text-decoration: none;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.listing-card:hover .view-overlay {
    opacity: 1;
    transform: translateY(0);
}

.listing-info {
    padding: 28px 26px;
}

.listing-name {
    font-size: 1.35rem;
    font-weight: 800;
    color: #1a3a2a;
    margin-bottom: 10px;
    line-height: 1.3;
}

.listing-location {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #5f6d60;
    font-size: 0.95rem;
    margin-bottom: 20px;
    font-weight: 500;
}

.listing-location i {
    color: #355a32;
}

.listing-specs {
    display: flex;
    gap: 24px;
    padding: 20px 0;
    border-top: 1px solid rgba(15, 40, 24, 0.08);
    border-bottom: 1px solid rgba(15, 40, 24, 0.08);
    margin-bottom: 20px;
    text-align: center;
  justify-content: center;
}

.spec-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.spec-value {
    font-size: 1rem;
    font-weight: 700;
    color: #1a3a2a;
}

.spec-label {
    font-size: 0.7rem;
    color: #5f6d60;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.listing-price {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1a3a2a;
    margin-bottom: 24px;
}

.listing-actions {
    display: flex;
    gap: 12px;
}

.details-btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 24px;
    background: linear-gradient(135deg, #1a3a2a 0%, #2d5a45 100%);
    color: white;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(26, 58, 42, 0.2);
}

.details-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(26, 58, 42, 0.3);
}

.contact-btn {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #f8faf6;
    border: none;
    color: #1a3a2a;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.contact-btn:hover {
    background: #1a3a2a;
    color: white;
}

.empty-state {
    text-align: center;
    padding: 80px 20px;
    background: #f8faf6;
    border-radius: 24px;
}

.empty-state i {
    font-size: 4rem;
    color: #5f6d60;
    margin-bottom: 20px;
}

.empty-state h3 {
    font-size: 1.5rem;
    color: #1a3a2a;
    margin-bottom: 10px;
}

.empty-state p {
    color: #5f6d60;
}

@media (max-width: 1100px) {
    .listings-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .page-hero {
        min-height: 300px;
        padding: 60px 18px;
    }

    .hero-title {
        font-size: 2rem;
    }

    .content-shell {
        padding: 60px 18px 80px;
    }

    .tabs-container {
        gap: 8px;
    }

    .tab-btn {
        padding: 12px 24px;
        font-size: 0.9rem;
    }

    .listings-grid {
        grid-template-columns: 1fr;
        gap: 24px;
    }

    .listing-image {
        height: 240px;
    }
}

@media (max-width: 480px) {
    .tabs-container {
        flex-direction: column;
    }

    .tab-btn {
        width: 100%;
        justify-content: center;
    }

    .listing-specs {
        flex-wrap: wrap;
        gap: 16px;
    }
}
</style>