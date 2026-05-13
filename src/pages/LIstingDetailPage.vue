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
        <p class="hs-page-loader-text">Loading yachts...</p>
      </div>
    </div>
    
    <div v-else>
<header class="page-hero">
    <img :src="headerBackgroundImage" alt="Hero" class="hero-background-image" @error="headerImageError">
    <div class="hero-content">
      <div class="hero-info">
        <span class="hero-label"><i class="fas fa-ship"></i> {{ listingLabel }}</span>
        <h1 class="hero-title">{{ listing.year }} {{ listing.manufacturer }} {{ listing.yacht_name }}</h1>
        <p class="hero-subtitle"><i class="fas fa-map-marker-alt"></i> {{ displayLocation }}</p>
      </div>
      <div class="hero-price" v-if="listing.type === 'forsale'">
        <div class="price-label">{{ listing.sale_status === 'sold' ? 'Status' : 'Asking Price' }}</div>
        <div class="price-value" :style="listing.sale_status === 'sold' ? 'color:#e74c3c' : ''">
          {{ listing.sale_status === 'sold' ? 'SOLD' : formattedPrice }}
        </div>
      </div>
      <div class="hero-price" v-else-if="listing.type === 'daycharter'">
        <div class="price-label">Hourly Rate</div>
        <div class="price-value">{{ formattedHourlyPrice }}</div>
      </div>
      <div class="hero-price" v-else-if="listing.type === 'termcharter'">
        <div class="price-label">Starting at</div>
        <div class="price-value">{{ termCharterMinPrice }}</div>
      </div>
    </div>
  </header>

  <section class="ls-main-section">
    <div class="hs-container">
      <div class="ls-content-grid">
        <div class="ls-main-column">
          
           <!-- Gallery -->
           <div class="ls-cards">
             <div class="ls-gallery-wrapper">
               <div class="ls-main-slider">
                 <div class="ls-slider-track" id="sliderTrack">
                   <div class="ls-slider-slide" v-for="(mediaUrl, index) in listingPhotos" :key="index">
                     <template v-if="isVideo(mediaUrl)">
                       <video :src="mediaUrl" :alt="listing.yacht_name" controls class="ls-slider-video"></video>
                     </template>
                     <template v-else>
                       <img :src="mediaUrl" :alt="listing.yacht_name" @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80')">
                     </template>
                   </div>
                 </div>
                 <button class="ls-slider-nav prev" @click="changeSlide(-1)"><i class="fas fa-chevron-left"></i></button>
                 <button class="ls-slider-nav next" @click="changeSlide(1)"><i class="fas fa-chevron-right"></i></button>
                 <div class="ls-slider-dots" id="sliderDots"></div>
                 <div class="ls-slider-counter"><span id="currentSlide">1</span> / <span id="totalSlides">{{ listingPhotos.length }}</span></div>
               </div>
               <div class="ls-thumbnails">
                 <div class="ls-thumbnail" :class="{ active: currentSlideIndex === index }" v-for="(mediaUrl, index) in listingPhotos" :key="index" @click="goToSlide(index)">
                   <template v-if="isVideo(mediaUrl)">
                     <div class="ls-thumbnail-video">
                       <i class="fas fa-video"></i>
                     </div>
                   </template>
                   <template v-else>
                     <img :src="mediaUrl" :alt="'Thumb ' + (index + 1)" @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=100&q=80')">
                   </template>
                 </div>
               </div>
             </div>
           </div>

        

          <!-- Tabbed Details Section -->
          <div class="ls-details-card">
            <div class="ls-details-header">
              <div class="ls-details-info">
                <h2 class="ls-details-title">{{ listing.year }} {{ listing.manufacturer }} {{ listing.length }}</h2>
                <div class="ls-details-meta">
                  <span><i class="fas fa-tag"></i> {{ listingLabel }}</span>
                  <span><i class="fas fa-map-marker-alt"></i> {{ displayLocation }}</span>
                  <span v-if="listing.type === 'forsale'">
                    <i class="fas fa-tag"></i>
                    <span v-if="listing.sale_status === 'sold'" style="color:#e74c3c;font-weight:700">SOLD</span>
                    <span v-else>{{ formattedPrice }}</span>
                  </span>
                  <span v-else-if="listing.type === 'daycharter'"><i class="fas fa-clock"></i> {{ formattedHourlyPrice }}</span>
                  <span v-else-if="listing.type === 'termcharter'"><i class="fas fa-calendar"></i> Starting {{ termCharterMinPrice }}</span>
                </div>
              </div>
            </div>

            <div class="ls-tabs">
               <button class="ls-tab active" data-tab="overview" @click="handleTabClick">
                 <i class="fas fa-align-left"></i> <span>Overview</span>
               </button>
               <button class="ls-tab" data-tab="toy-features" v-if="hasToyOrFeatures" @click="handleTabClick">

                 <i class="fas fa-box-open"></i> <span>Toy & Features</span>

               </button>

               <button class="ls-tab" data-tab="specs" @click="handleTabClick">

                 <i class="fas fa-cogs"></i> <span>Specs</span>

               </button>

               <button class="ls-tab" data-tab="gallery" @click="handleTabClick">
                 <i class="fas fa-images"></i> <span>Gallery</span>
               </button>
               <button class="ls-tab" data-tab="crew" v-if="hasCrewIncluded" @click="handleTabClick">
                 <i class="fas fa-users"></i> <span>Crew Included</span>
               </button>
               <button class="ls-tab" data-tab="broker" @click="handleTabClick">
                 <i class="fas fa-user"></i> <span>Broker</span>
               </button>
             </div>

            <div class="ls-tab-content">
              <!-- Overview Tab -->
              <div class="ls-tab-pane active" id="overview">
              
                <!-- Description -->
                <div class="ls-description-section">
                  <h3 class="ls-section-subtitle">Description</h3>
                  <p class="ls-description-text" v-html="listing.description || 'No description available for this listing.'"></p>
                </div>

               
              </div>

              <!-- Toy & Features Tab -->
              <div class="ls-tab-pane" id="toy-features">
                <!-- Features Grid -->
                <div class="ls-features-grid" v-if="Object.keys(equipment).length > 0">
                  <div class="ls-feature-item" v-for="(item, key) in equipment" :key="key" v-show="item.included">
                    <i :class="item.icon || 'fas fa-check-circle'"></i>
                    {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                  </div>
                </div>
                <div class="ls-features-grid" v-else-if="!hasToyOrFeatures && !hasEquipment">
                  <div class="ls-feature-item">
                    <i class="fas fa-info-circle"></i>
                    No additional features listed
                  </div>
                </div>

                 <!-- Equipment Sections -->
                 <div class="ls-equipment-sections" v-if="hasToyOrFeatures">
                   <!-- Electronics -->
                   <div v-if="listing.metadata?.electronics && Object.keys(listing.metadata.electronics).length > 0" class="ls-equipment-category">
                     <h3 class="ls-section-subtitle"><i class="fas fa-satellite-dish"></i> Electronics</h3>
                     <div class="ls-equipment-grid">
                       <div v-for="(item, key) in listing.metadata.electronics" :key="key" v-show="item.included" class="ls-equipment-item">
                         <i :class="item.icon || 'fas fa-check-circle'"></i>
                         {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                       </div>
                     </div>
                   </div>

                   <!-- Electrical Equipment -->
                   <div v-if="listing.metadata?.electrical_equipment && Object.keys(listing.metadata.electrical_equipment).length > 0" class="ls-equipment-category">
                     <h3 class="ls-section-subtitle"><i class="fas fa-bolt"></i> Electrical Equipment</h3>
                     <div class="ls-equipment-grid">
                       <div v-for="(item, key) in listing.metadata.electrical_equipment" :key="key" v-show="item.included" class="ls-equipment-item">
                         <i :class="item.icon || 'fas fa-check-circle'"></i>
                         {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                       </div>
                     </div>
                   </div>

                   <!-- Inside Equipment -->
                   <div v-if="listing.metadata?.inside_equipment && Object.keys(listing.metadata.inside_equipment).length > 0" class="ls-equipment-category">
                     <h3 class="ls-section-subtitle"><i class="fas fa-couch"></i> Inside Equipment</h3>
                     <div class="ls-equipment-grid">
                       <div v-for="(item, key) in listing.metadata.inside_equipment" :key="key" v-show="item.included" class="ls-equipment-item">
                         <i :class="item.icon || 'fas fa-check-circle'"></i>
                         {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                       </div>
                     </div>
                   </div>

                   <!-- Outside Equipment -->
                   <div v-if="listing.metadata?.outside_equipment && Object.keys(listing.metadata.outside_equipment).length > 0" class="ls-equipment-category">
                     <h3 class="ls-section-subtitle"><i class="fas fa-umbrella-beach"></i> Outside Equipment</h3>
                     <div class="ls-equipment-grid">
                       <div v-for="(item, key) in listing.metadata.outside_equipment" :key="key" v-show="item.included" class="ls-equipment-item">
                         <i :class="item.icon || 'fas fa-check-circle'"></i>
                         {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                       </div>
                     </div>
                   </div>

                   <!-- Water Equipment -->
                   <div v-if="listing.metadata?.water_equipment && Object.keys(listing.metadata.water_equipment).length > 0" class="ls-equipment-category">
                     <h3 class="ls-section-subtitle"><i class="fas fa-water"></i> Water Equipment</h3>
                     <div class="ls-equipment-grid">
                       <div v-for="(item, key) in listing.metadata.water_equipment" :key="key" v-show="item.included" class="ls-equipment-item">
                         <i :class="item.icon || 'fas fa-check-circle'"></i>
                         {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                       </div>
                     </div>
                   </div>

                   <!-- Additional Equipment -->
                   <div v-if="listing.metadata?.additional_equipment && Object.keys(listing.metadata.additional_equipment).length > 0" class="ls-equipment-category">
                     <h3 class="ls-section-subtitle"><i class="fas fa-plus-circle"></i> Additional Equipment</h3>
                     <div class="ls-equipment-grid">
                       <div v-for="(item, key) in listing.metadata.additional_equipment" :key="key" v-show="item.included" class="ls-equipment-item">
                         <i :class="item.icon || 'fas fa-check-circle'"></i>
                         {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                       </div>
                     </div>
                   </div>

                  <!-- Water Toys -->
                  <div v-if="listing.metadata?.water_toys && Object.keys(listing.metadata.water_toys).length > 0" class="ls-equipment-category">
                    <h3 class="ls-section-subtitle"><i class="fas fa-life-ring"></i> Water Toys</h3>
                    <div class="ls-equipment-grid">
                      <div v-for="(item, key) in listing.metadata.water_toys" :key="key" v-show="item.included" class="ls-equipment-item">
                        <i :class="item.icon || 'fas fa-check-circle'"></i>
                        {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                      </div>
                    </div>
                  </div>

                   <!-- Tanks -->
                   <div v-if="listing.metadata?.tanks && Object.keys(listing.metadata.tanks).length > 0" class="ls-equipment-category">
                     <h3 class="ls-section-subtitle"><i class="fas fa-gas-pump"></i> Tanks</h3>
                     <div class="ls-equipment-grid">
                       <div v-for="(item, key) in listing.metadata.tanks" :key="key" v-show="item.capacity" class="ls-equipment-item">
                         <i :class="item.icon || 'fas fa-check-circle'"></i>
                         {{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}: {{ item.capacity }} gal
                       </div>
                     </div>
                   </div>
                </div>
              </div>


              <!-- Specifications Tab -->
              <div class="ls-tab-pane" id="specs">
                <div class="ls-specs-table">
                  <div class="ls-spec-row">
                    <span class="ls-spec-name">Length</span>
                    <span class="ls-spec-val">{{ listing.length || 'N/A' }} ft</span>
                  </div>
                  <div class="ls-spec-row">
                    <span class="ls-spec-name">Beam</span>
                    <span class="ls-spec-val">{{ listing.beam || 'N/A' }} ft</span>
                  </div>
                  <div class="ls-spec-row">
                    <span class="ls-spec-name">Draft</span>
                    <span class="ls-spec-val">{{ listing.draft || 'N/A' }} ft</span>
                  </div>
                  <div class="ls-spec-row">
                    <span class="ls-spec-name">Year</span>
                    <span class="ls-spec-val">{{ listing.year || 'N/A' }}</span>
                  </div>
                  <div class="ls-spec-row" v-if="engines?.make">
                    <span class="ls-spec-name">Engine Make</span>
                    <span class="ls-spec-val">{{ engines.make }}</span>
                  </div>
                  <div class="ls-spec-row" v-if="engines?.model">
                    <span class="ls-spec-name">Engine Model</span>
                    <span class="ls-spec-val">{{ engines.model }}</span>
                  </div>
                  <div class="ls-spec-row" v-if="engines?.hours">
                    <span class="ls-spec-name">Engine Hours</span>
                    <span class="ls-spec-val">{{ engines.hours }}</span>
                  </div>
                  <div class="ls-spec-row" v-if="engines?.horse_power">
                    <span class="ls-spec-name">Horse Power</span>
                    <span class="ls-spec-val">{{ engines.horse_power }} HP</span>
                  </div>
                  <div class="ls-spec-row" v-if="engines?.fuel_type">
                    <span class="ls-spec-name">Fuel Type</span>
                    <span class="ls-spec-val">{{ engines.fuel_type }}</span>
                  </div>
                  <div class="ls-spec-row" v-if="listing.metadata?.crew_count !== undefined">
                    <span class="ls-spec-name">Crew</span>
                    <span class="ls-spec-val">{{ listing.metadata.crew_count }}</span>
                  </div>
                </div>
              </div>

               <!-- Gallery Tab -->
               <div class="ls-tab-pane" id="gallery">
                 <div class="ls-gallery-grid">
                   <div class="ls-gallery-item" v-for="(mediaUrl, index) in listingPhotos" :key="index" @click="openGallery(index)">
                     <template v-if="isVideo(mediaUrl)">
                       <video :src="mediaUrl" :alt="'Gallery ' + (index + 1)" @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80')"></video>
                       <div class="ls-gallery-overlay"><i class="fas fa-play"></i></div>
                     </template>
                     <template v-else>
                       <img :src="mediaUrl" :alt="'Gallery ' + (index + 1)" @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80')">
                       <div class="ls-gallery-overlay"><i class="fas fa-expand"></i></div>
                     </template>
                   </div>
                 </div>
               </div>

              <!-- Crew Tab -->
              <div class="ls-tab-pane" id="crew" v-if="hasCrewIncluded">
                <div class="ls-crew-section">
                  <h3 class="ls-section-subtitle">Crew Included</h3>
                  <div class="ls-crew-grid">
                    <div v-for="crewItem in crewListItems" :key="crewItem.role" class="ls-crew-item">
                      <div class="ls-crew-icon">
                        <i class="fas fa-user"></i>
                      </div>
                      <div class="ls-crew-info">
                        <span class="ls-crew-role">{{ crewItem.label }}</span>
                        <span class="ls-crew-count">{{ crewItem.count }} {{ crewItem.count === 1 ? 'person' : 'people' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Broker Tab -->
              <div class="ls-tab-pane" id="broker">
                <div class="ls-broker-detail" v-if="listingBroker">
                  <img :src="getBrokerImage()" alt="Broker" class="ls-broker-detail-avatar">
                  <div class="ls-broker-detail-info">
                    <h3>{{ listingBroker.name }}</h3>
                    <span>{{ listingBroker.specialization || 'Professional Yacht Broker' }}</span>
                    <p>Contact us for more information about this yacht or to schedule a viewing.</p>
                  </div>
                </div>
                <div class="ls-broker-detail" v-else>
                  <img src="/images/favicon.png" alt="Broker" class="ls-broker-detail-avatar">
                  <div class="ls-broker-detail-info">
                    <h3>High Seas Yachting</h3>
                    <p>Contact us for more information about this yacht or to schedule a viewing.</p>
                  </div>
                </div>
                <div class="ls-broker-detail-contact">
                  <a v-if="listingBroker" :href="'tel:+1' + getBrokerPhone()" class="ls-contact-item">
                    <i class="fas fa-phone"></i>
                    {{ listingBroker.phone || '+1(954)686-1671' }}
                  </a>
                  <a v-if="listingBroker" :href="'mailto:' + listingBroker.email" class="ls-contact-item">
                    <i class="fas fa-envelope"></i>
                    {{ listingBroker.email }}
                  </a>
                  <a v-if="!listingBroker" href="tel:+19546861671" class="ls-contact-item">
                    <i class="fas fa-phone"></i>
                    +1(954)686-1671
                  </a>
                  <a v-if="!listingBroker" href="mailto:Sales@highseasyachting.com" class="ls-contact-item">
                    <i class="fas fa-envelope"></i>
                     Sales@highseasyachting.com
                  </a>
                </div>
<div class="ls-action-buttons">
                 <button v-if="listing.type === 'daycharter' || listing.type === 'termcharter'" @click="handleBookNow" class="ls-btn-primary">
                   <i class="fas fa-calendar-check"></i> Book Now
                 </button>
                 <button v-if="listing.type === 'forsale'" @click="openBoatInquiryModal(false)" class="ls-btn-primary">
                   <i class="fas fa-envelope"></i> Inquiry Now
                 </button>
                 <a :href="'tel:' + contactPhoneNumber" class="ls-btn-secondary">
                   <i class="fas fa-phone"></i> Contact Us
                 </a>
               </div>
              </div>
            </div>
          </div>

    

       

        </div>

        

        <!-- Sidebar -->
        <div class="ls-sidebar">
           <div class="ls-broker-card" v-if="listingBroker">
             <div class="ls-broker-header">
               <img :src="getBrokerImage()" alt="Broker" class="ls-broker-avatar">
               <div class="ls-broker-info">
                 <h4>{{ listingBroker.name }}</h4>
                 <span>{{ listingBroker.specialization || 'Professional Yacht Broker' }}</span>
               </div>
             </div>

             <div class="ls-broker-contact">
               <a :href="'tel:+1' + getBrokerPhone()" class="ls-contact-item">
                 <i class="fas fa-phone"></i>
                 {{ listingBroker.phone || '+1 (954) 555-1234' }}
               </a>
               <a :href="'mailto:' + listingBroker.email" class="ls-contact-item">
                 <i class="fas fa-envelope"></i>
                 {{ listingBroker.email }}
               </a>
             </div>


 <div class="ls-action-buttons">
                 <button v-if="listing.type === 'daycharter' || listing.type === 'termcharter'" @click="handleBookNow" class="ls-btn-primary">
                   <i class="fas fa-calendar-check"></i> Book Now
                 </button>
                 <button v-if="listing.type === 'forsale'" @click="openBoatInquiryModal(false)" class="ls-btn-primary">
                   <i class="fas fa-envelope"></i> Inquiry Now
                 </button>
                 <a :href="'tel:' + contactPhoneNumber" class="ls-btn-secondary">
                    <i class="fas fa-phone"></i> Contact Us
                 </a>
               </div>
           </div>

           <div class="ls-broker-card" v-else>
             <div class="ls-broker-header">
               <img src="/images/favicon.png" alt="Broker" class="ls-broker-avatar">
               <div class="ls-broker-info">
                 <h4>High Seas Yachting</h4>
               </div>
             </div>

             <div class="ls-broker-contact">
               <a href="tel:+19546861671" class="ls-contact-item">
                 <i class="fas fa-phone"></i>
                  +1(954)686-1671
               </a>
               <a href="mailto:Sales@highseasyachting.com" class="ls-contact-item">
                 <i class="fas fa-envelope"></i>
                  Sales@highseasyachting.com
               </a>
             </div>


              <div class="ls-action-buttons">
                 <button v-if="listing.type === 'daycharter' || listing.type === 'termcharter'" @click="handleBookNow" class="ls-btn-primary" style="margin-bottom: 12px;">
                   <i class="fas fa-calendar-check"></i> Book Now
                 </button>
                 <button v-if="listing.type === 'forsale'" @click="openBoatInquiryModal(false)" class="ls-btn-primary" style="margin-bottom: 12px;">
                   <i class="fas fa-envelope"></i> Inquiry Now
                 </button>
                 <a :href="'tel:' + contactPhoneNumber" class="ls-btn-secondary" style="text-decoration: none; display: inline-block;">
                   <i class="fas fa-phone"></i> Contact Us
                 </a>
               </div>
           </div>

          <!-- Price Card -->
          <div class="ls-price-card" v-if="listing.type === 'forsale'">
            <div class="ls-price-header">
              <span class="ls-price-label">{{ listing.sale_status === 'sold' ? 'Status' : 'Asking Price' }}</span>
              <div class="ls-price-value" :style="listing.sale_status === 'sold' ? 'color:#e74c3c;font-weight:800' : ''">
                {{ listing.sale_status === 'sold' ? 'SOLD' : formattedPrice }}
              </div>
            </div>
          </div>

          <!-- Term Charter Pricing Table -->
          <div class="ls-price-card" v-if="listing.type === 'termcharter'">
            <div class="ls-price-header">
              <span class="ls-price-label">Charter Rates</span>
            </div>
            <div class="ls-daycharter-table">
              <table>
                <tbody>
                  <tr v-for="(value, key) in listing.metadata?.pricing?.retail" :key="key">
                    <td>{{ formatPricingKey(key) }}</td>
                    <td class="ls-daycharter-amount">{{ formatCurrency(value) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Day Charter Pricing Table -->
          <div class="ls-price-card" v-if="listing.type === 'daycharter'">
            <div class="ls-price-header">
              <span class="ls-price-label">Charter Rates</span>
            </div>
            <div class="ls-daycharter-table">
              <table>
                <tbody>
                  <tr v-if="listing.metadata?.pricing?.retail?.four_hour">
                    <td>4 Hours</td>
                    <td class="ls-daycharter-amount">{{ formatCurrency(listing.metadata.pricing.retail.four_hour) }}</td>
                  </tr>
                  <tr v-if="listing.metadata?.pricing?.retail?.six_hour">
                    <td>6 Hours</td>
                    <td class="ls-daycharter-amount">{{ formatCurrency(listing.metadata.pricing.retail.six_hour) }}</td>
                  </tr>
                  <tr v-if="listing.metadata?.pricing?.retail?.eight_hour">
                    <td>8 Hours</td>
                    <td class="ls-daycharter-amount">{{ formatCurrency(listing.metadata.pricing.retail.eight_hour) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

           <!-- Payment Calculator Card (only for forsale) -->
           <div class="ls-calc-card" v-if="listing.type === 'forsale' && listing.sale_status !== 'sold'">
            <div class="ls-calc-header">
              <h4><i class="fas fa-calculator"></i> Payment Calculator</h4>
            </div>
            <div class="ls-calc-body">
              <div class="ls-calc-group">
                <label>Purchase Price</label>
                <div class="ls-calc-input-wrap">
                  <span class="ls-calc-currency">$</span>
                  <input type="number" id="calcPrice" class="ls-calc-input" @input="calculatePayment()">
                </div>
              </div>
              <div class="ls-calc-group">
                <label>Down Payment Amount</label>
                <div class="ls-calc-input-wrap">
                  <span class="ls-calc-currency">$</span>
                  <input type="number" id="calcDown" class="ls-calc-input" @input="calculatePayment()">
                </div>
              </div>
              <div class="ls-calc-group">
                <label>Down Payment %</label>
                <div class="ls-calc-input-wrap">
                  <input type="range" id="calcDownPercent" class="ls-calc-range" min="5" max="80" value="20" @input="updateDownPercent()">
                  <span class="ls-calc-percent-value" id="downPercentDisplay">20%</span>
                </div>
              </div>
              <div class="ls-calc-group">
                <label>Interest Rate (APR) %</label>
                <div class="ls-calc-input-wrap">
                  <input type="number" id="calcRate" class="ls-calc-input" value="6.74" step="0.01" @input="calculatePayment()">
                </div>
              </div>
              <div class="ls-calc-group">
                <label>Loan Term (Years)</label>
                <div class="ls-calc-select-wrap">
                  <select id="calcTerm" class="ls-calc-select" @change="calculatePayment()">
                    <option value="5">5 Years</option>
                    <option value="10">10 Years</option>
                    <option value="15">15 Years</option>
                    <option value="20" selected>20 Years</option>
                  </select>
                </div>
              </div>
              <div class="ls-calc-result">
                <span class="ls-calc-result-label">Estimated Monthly Payment</span>
                <div class="ls-calc-result-value" id="monthlyPayment">$0.00</div>
              </div>
            </div>
            <div class="ls-calc-footer">
              <p><i class="fas fa-check-circle"></i> Personalized yacht financing</p>
              <p><i class="fas fa-check-circle"></i> Seasoned financing experts</p>
              <p><i class="fas fa-check-circle"></i> Pre-qualify in minutes</p>
            </div>
               <div class="ls-calc-cta">
                 <button @click="openBoatInquiryModal(true)" class="ls-btn-primary">
                  <i class="fas fa-file-alt"></i> Get Pre-Qualified
                </button>
              </div>
          </div>


        </div>

        
      </div>
       <!-- Key Features Slider -->
                   <div v-if="hasValidKeyFeatures" class="ls-key-features">
                   <h3 class="ls-section-subtitle">Key Features</h3>
                   <div class="ls-key-features-slider">
                     <div 
                       class="ls-key-feature-card" 
                       v-for="(feature, index) in listing.metadata.key_features" 
                       :key="index"
                     >
                        <div class="ls-key-feature-image">
                          <img :src="getKeyFeatureImage(feature.image)" :alt="feature.title" @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&q=80')">
                        </div>
                       <div class="ls-key-feature-content">
                         <h4>{{ feature.title }}</h4>
                         <p>{{ feature.description }}</p>
                       </div>
                     </div>
                   </div>
                  </div>

                  <div class="ls-action-buttons" style="margin-top: 70px;">
                     <button v-if="listing.type === 'daycharter' || listing.type === 'termcharter'" @click="handleBookNow" class="ls-btn-primary">
                   <i class="fas fa-calendar-check"></i> Book Now
                 </button>
                  <a :href="'mailto:' + contactEmailAddress" class="ls-btn-secondary">
                    <i class="fas fa-envelope"></i> Email Us
                  </a>
                 <a :href="'tel:' + contactPhoneNumber" class="ls-btn-secondary">
                   <i class="fas fa-phone"></i> Call Now
                 </a>
                   <button v-if="listing.type === 'forsale'" @click="openBoatInquiryModal(false)" class="ls-btn-primary">
                   <i class="fas fa-envelope"></i> Inquiry Now
                 </button>
               </div>

     </div>

   </section>

  

   <section class="ls-similar-section">
     <div class="hs-container">
       <div class="ls-section-header">
         <h2 class="ls-section-title">{{ brokerSectionTitle }}</h2>
       </div>

        <div class="ls-similar-grid" v-if="brokerListings.length > 0">
          <div v-for="item in brokerListings" :key="item.id" class="ls-similar-card">
            <div class="ls-similar-image">
              <router-link :to="'/listing-detail/' + item.slug">
                <img :src="item.imageUrl" :alt="item.yacht_name" @error="($event.target.src = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80')">
              </router-link>
               <span class="ls-similar-badge"><i class="fas fa-map-marker-alt"></i> {{ (item.metadata?.city || item.city) ? formatCityName(item.metadata?.city || item.city) + ', FL' : 'N/A' }}</span>
            </div>
             <div class="ls-similar-info">
              <h3>{{ item.year }} {{ item.manufacturer }} {{ item.yacht_name }}</h3>
              <div class="ls-yacht-specs">
                <div><strong>Year</strong>{{ item.year || 'N/A' }}</div>
                <div><strong>Length</strong>{{ item.length ? item.length + ' ft' : 'N/A' }}</div>
              </div>
              <div class="ls-similar-footer">
                <span class="ls-similar-price">{{ formatCardPrice(item) }}</span>
                <router-link :to="'/listing-detail/' + item.slug" class="ls-similar-link">View Details <i class="fas fa-arrow-right"></i></router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="ls-empty-listing-card">
           <div class="ls-empty-content">
             <div class="ls-empty-icon-wrapper">
               <i class="fas fa-anchor ls-empty-icon"></i>
             </div>
             <h3 class="ls-empty-title">No {{ listingTypeDisplay }} listings found in {{ formatCityName(listing?.metadata?.city || listing?.city || 'fort lauderdale') }}</h3>
             <p class="ls-empty-text">We don't have any other {{ listingTypeDisplay.toLowerCase() }} yachts in this location at the moment. Check back soon or explore our listings in other cities.</p>
           </div>
         </div>
     </div>
    </section>

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="ls-lightbox" @click.self="closeLightbox">
      <div class="ls-lightbox-overlay" @click="closeLightbox"></div>
      <div class="ls-lightbox-content">
        <button class="ls-lightbox-close" @click="closeLightbox" aria-label="Close lightbox">
          <i class="fas fa-times"></i>
        </button>
        <button class="ls-lightbox-nav ls-lightbox-prev" @click="prevImage" aria-label="Previous image">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="ls-lightbox-nav ls-lightbox-next" @click="nextImage" aria-label="Next image">
          <i class="fas fa-chevron-right"></i>
        </button>
        <div class="ls-lightbox-media">
          <template v-if="isVideo(listingPhotos[lightboxIndex])">
            <video :src="listingPhotos[lightboxIndex]" controls autoplay class="ls-lightbox-video"></video>
          </template>
          <template v-else>
            <img :src="listingPhotos[lightboxIndex]" :alt="'Image ' + (lightboxIndex + 1)" class="ls-lightbox-image">
          </template>
        </div>
        <div class="ls-lightbox-counter">{{ lightboxIndex + 1 }} / {{ listingPhotos.length }}</div>
      </div>
     </div>

    <!-- Pre-Qualify Modal -->
    <div v-if="showPreQualifyModal" class="ls-prequalify-modal" @click.self="closePreQualifyModal">
      <div class="ls-prequalify-overlay" @click="closePreQualifyModal"></div>
      <div class="ls-prequalify-content">
        <!-- Left side: Yacht image with dark overlay and logo -->
        <div class="ls-prequalify-image-side">
          <img :src="listingPhotos[0]" alt="Yacht" class="ls-prequalify-img">
          <div class="ls-prequalify-image-overlay"></div>
          <div class="ls-prequalify-logo">
            <img src="/images/white-hsy.svg" alt="High Seas Yachting Logo" class="ls-prequalify-logo-img">
          </div>
        </div>
        <!-- Right side: Form -->
        <div class="ls-prequalify-form-side">
          <button class="ls-prequalify-close" @click="closePreQualifyModal" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
          <div class="ls-prequalify-form-container">
            <h3 class="ls-prequalify-title">Get Pre-Qualified</h3>
            <p class="ls-prequalify-subtitle">Fill out the form below and our financing experts will get back to you shortly.</p>
            
            <form @submit.prevent="submitPreQualifyForm" class="ls-prequalify-form">
               <div class="ls-prequalify-form-group">
                 <label for="pq-first-name">First Name</label>
                 <input 
                   type="text" 
                   id="pq-first-name" 
                   v-model="preQualifyForm.first_name" 
                   placeholder="Enter your first name"
                   required
                   class="ls-prequalify-input"
                 >
               </div>
               <div class="ls-prequalify-form-group">
                 <label for="pq-last-name">Last Name</label>
                 <input 
                   type="text" 
                   id="pq-last-name" 
                   v-model="preQualifyForm.last_name" 
                   placeholder="Enter your last name"
                   required
                   class="ls-prequalify-input"
                 >
               </div>
               <div class="ls-prequalify-form-group">
                 <label for="pq-email">Email Address</label>
                 <input 
                   type="email" 
                   id="pq-email" 
                   v-model="preQualifyForm.email" 
                   placeholder="Enter your email address"
                   required
                   class="ls-prequalify-input"
                 >
               </div>
               <div class="ls-prequalify-form-group">
                 <label for="pq-phone">Phone Number</label>
                 <input 
                    type="tel" 
                   id="pq-phone" 
                   v-model="preQualifyForm.phone" 
                   placeholder="Enter your phone number"
                   required
                   class="ls-prequalify-input"
                 >
               </div>
               <button type="submit" class="ls-prequalify-submit">
                 <i class="fas fa-paper-plane"></i> Submit Application
               </button>
              </form>

             <!-- Loan Summary -->
             <div class="ls-prequalify-summary">
               <h4 class="ls-prequalify-summary-title">Loan Summary</h4>
               <div class="ls-prequalify-summary-grid">
                 <div class="ls-prequalify-summary-item">
                   <span class="ls-prequalify-summary-label">Purchase Price</span>
                   <span class="ls-prequalify-summary-value">{{ formatCurrency(loanSummary.purchasePrice) }}</span>
                 </div>
                 <div class="ls-prequalify-summary-item">
                   <span class="ls-prequalify-summary-label">Down Payment</span>
                   <span class="ls-prequalify-summary-value">{{ formatCurrency(loanSummary.downPaymentAmount) }} ({{ loanSummary.downPaymentPercent }}%)</span>
                 </div>
                 <div class="ls-prequalify-summary-item">
                   <span class="ls-prequalify-summary-label">Interest Rate</span>
                   <span class="ls-prequalify-summary-value">{{ loanSummary.interestRate }}% APR</span>
                 </div>
                 <div class="ls-prequalify-summary-item">
                   <span class="ls-prequalify-summary-label">Loan Term</span>
                   <span class="ls-prequalify-summary-value">{{ loanSummary.loanTerm }} Years</span>
                 </div>
               </div>
               <div class="ls-prequalify-summary-total">
                 <span class="ls-prequalify-summary-label">Estimated Monthly Payment</span> <br><br>
                 <span class="ls-prequalify-summary-value">{{ formatCurrency(loanSummary.monthlyPayment) }}/month</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

     <!-- Boat Inquiry Modal -->
     <div v-if="showBoatInquiryModal" class="ls-prequalify-modal" @click.self="closeBoatInquiryModal">
       <div class="ls-prequalify-overlay" @click="closeBoatInquiryModal"></div>
       <div class="ls-prequalify-content">
         <div class="ls-prequalify-image-side">
           <img :src="listingPhotos[0]" :alt="listing?.yacht_name" class="ls-prequalify-img">
           <div class="ls-prequalify-image-overlay"></div>
           <div class="ls-prequalify-logo">
             <img src="/images/white-hsy.svg" alt="High Seas Yachting Logo" class="ls-prequalify-logo-img">
           </div>
         </div>
         <div class="ls-prequalify-form-side">
           <button class="ls-prequalify-close" @click="closeBoatInquiryModal" aria-label="Close modal">
             <i class="fas fa-times"></i>
           </button>
           <div class="ls-prequalify-form-container">
             <h3 class="ls-prequalify-title">Boat Inquiry</h3>
             <p class="ls-prequalify-subtitle">Fill out the form below to inquire about {{ listing?.yacht_name }}. Our team will get back to you shortly.</p>
             
             <form @submit.prevent="submitBoatInquiryForm" class="ls-prequalify-form">
               <div class="ls-prequalify-form-group">
                 <label for="inquiry-first-name">First Name</label>
                 <input 
                   type="text" 
                   id="inquiry-first-name" 
                   v-model="boatInquiryForm.first_name" 
                   placeholder="Enter your first name"
                   required
                   class="ls-prequalify-input"
                 >
               </div>
               <div class="ls-prequalify-form-group">
                 <label for="inquiry-last-name">Last Name</label>
                 <input 
                   type="text" 
                   id="inquiry-last-name" 
                   v-model="boatInquiryForm.last_name" 
                   placeholder="Enter your last name"
                   required
                   class="ls-prequalify-input"
                 >
               </div>
               <div class="ls-prequalify-form-group">
                 <label for="inquiry-email">Email Address <span style="color:#e74c3c">*</span></label>
                 <input 
                   type="email" 
                   id="inquiry-email" 
                   v-model="boatInquiryForm.email" 
                   placeholder="Enter your email address"
                   required
                   class="ls-prequalify-input"
                 >
               </div>
               <div class="ls-prequalify-form-group">
                 <label for="inquiry-phone">Phone Number</label>
                 <input 
                   type="tel" 
                   id="inquiry-phone" 
                   v-model="boatInquiryForm.phone" 
                   placeholder="Enter your phone number"
                   class="ls-prequalify-input"
                 >
                </div>
                  <!-- Boat details are automatically populated from listing data -->
                 <button type="submit" class="ls-prequalify-submit" :disabled="inquirySubmitting">
                 <i v-if="!inquirySubmitting" class="fas fa-paper-plane"></i>
                 <i v-else class="fas fa-spinner fa-spin"></i>
                 {{ inquirySubmitting ? 'Submitting...' : 'Submit Inquiry' }}
               </button>
             </form>
           </div>
         </div>
        </div>
      </div>



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
const SUPABASE_URL = 'https://qumgjqbfreeskjgltfvu.supabase.co/storage/v1/object/public/listings/';

export default {
    name: 'ListingDetailPage',
    components: {
        NavbarSection,
        FooterSection
    },
     data() {
             return {
                 listing: null,
                 loading: true,
                 listingsData: [],
                 brokersData: [],
                 currentSlideIndex: 0,
                 totalSlides: 6,
                 headerImageFallback: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80',
                 lightboxOpen: false,
                 lightboxIndex: 0,
                   showPreQualifyModal: false,
                   showBoatInquiryModal: false,
                 preQualifyForm: {
                     first_name: '',
                     last_name: '',
                     email: '',
                     phone: ''
                 },
                   boatInquiryForm: {
                       first_name: '',
                       last_name: '',
                       email: '',
                       phone: '',
                       boat_name: '',
                       make: '',
                       model: '',
                       year: '',
                       location: '',
                       price: '',
                       financing: 'no',
                       purchase_price: '',
                       down_payment: '',
                       interest_rate: '',
                       loan_term_months: '',
                       estimated_monthly_payment: '',
                        finance_details: ''
                    },

                 loanSummary: {
                     purchasePrice: 0,
                     downPaymentAmount: 0,
                     downPaymentPercent: 0,
                     interestRate: 0,
                     loanTerm: 0,
                     monthlyPayment: 0
                 },
                    notification: {
                        show: false,
                        message: '',
                        type: 'success'
                    },
                    inquirySubmitting: false,

                   inquiryFromCalculator: false
             };
        },
    computed: {
        listingBroker() {
            if (!this.listing?.broker_id) return null;
            let records = [];
            if (this.brokersData.length > 0 && this.brokersData[0].records) records = this.brokersData[0].records;
            return records.find(b => b.id === this.listing.broker_id) || null;
        },
listingPhotos() {
            // For listings.json - Supabase storage paths
            if (!this.listing?.metadata?.photos || this.listing.metadata.photos.length === 0) {
                return ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80'];
            }
            
            const firstPhoto = this.listing.metadata.photos[0];
            
            // Check if it's a direct URL (yacht-mls)
            if (firstPhoto.startsWith('http')) {
                return this.listing.metadata.photos;
            }
            
            // For listings.json - Supabase storage paths
            // Use the full path after /media/listings/ to construct the Supabase URL
            return this.listing.metadata.photos.map(photo => {
                // Remove /media/listings/ prefix to get the path for Supabase storage
                const path = photo.replace(/^\/media\/listings\//, '');
                return SUPABASE_URL + encodeURI(path);
            });
        },
        formattedPrice() {
            if (!this.listing?.metadata?.price) return 'Price on request';
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(this.listing.metadata.price);
        },
        formattedHourlyPrice() {
            const pricing = this.listing?.metadata?.pricing?.retail;
            if (!pricing) return 'Call for pricing';
            const prices = [];
            if (pricing.four_hour) prices.push(pricing.four_hour);
            if (pricing.six_hour) prices.push(pricing.six_hour);
            if (pricing.eight_hour) prices.push(pricing.eight_hour);
            if (prices.length === 0) return 'Call for pricing';
            const minPrice = Math.min(...prices);
            return `Starting from ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(minPrice)}`;
        },
        formattedTermCharterPrice() {
            const pricing = this.listing?.metadata?.pricing?.retail;
            if (!pricing || !pricing.weekly) return 'Call for pricing';
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(pricing.weekly);
        },
        termCharterMinPrice() {
            const pricing = this.listing?.metadata?.pricing?.retail;
            if (!pricing) return 'Call for pricing';
            const prices = Object.values(pricing).filter(p => typeof p === 'number');
            if (prices.length === 0) return 'Call for pricing';
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Math.min(...prices));
        },
        displayLocation() {
            if (!this.listing) return 'N/A';
            const city = this.listing.metadata?.city || this.listing.city || '';
            return city ? this.formatCityName(city) : 'N/A';
        },
        listingLabel() {
            if (this.listing?.type === 'daycharter') return 'Day Charter';
            if (this.listing?.type === 'termcharter') return 'Term Charter';
            return 'For Sale';
        },
        crewIncluded() {
            return this.listing?.metadata?.crew_included || {};
        },
        hasCrewIncluded() {
            const crew = this.listing?.metadata?.crew_included;
            if (!crew || typeof crew !== 'object') return false;
            return Object.values(crew).some(count => count > 0);
        },
        crewListItems() {
            const crew = this.listing?.metadata?.crew_included || {};
            return Object.entries(crew)
                .filter(([role, count]) => count > 0)
                .map(([role, count]) => ({
                    role,
                    count,
                    label: role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                }));
        },
engines() { return this.listing?.metadata?.engines || null; },
        equipment() { return this.listing?.metadata?.equipment || {}; },
        hasEquipment() {
            const equipment = this.listing?.metadata?.equipment;
            if (!equipment || typeof equipment !== 'object') return false;
            return Object.keys(equipment).some(key => equipment[key] && equipment[key].included);
        },
        hasToyOrFeatures() {
            const hasFeatureItems = this.hasEquipment;
            const hasEquipmentSections =
                (this.listing?.metadata?.electronics && Object.keys(this.listing.metadata.electronics).length > 0) ||
                (this.listing?.metadata?.electrical_equipment && Object.keys(this.listing.metadata.electrical_equipment).length > 0) ||
                (this.listing?.metadata?.inside_equipment && Object.keys(this.listing.metadata.inside_equipment).length > 0) ||
                (this.listing?.metadata?.outside_equipment && Object.keys(this.listing.metadata.outside_equipment).length > 0) ||
                (this.listing?.metadata?.water_equipment && Object.keys(this.listing.metadata.water_equipment).length > 0) ||
                (this.listing?.metadata?.additional_equipment && Object.keys(this.listing.metadata.additional_equipment).length > 0) ||
                (this.listing?.metadata?.water_toys && Object.keys(this.listing.metadata.water_toys).length > 0) ||
                (this.listing?.metadata?.tanks && Object.keys(this.listing.metadata.tanks).length > 0);
            return hasFeatureItems || hasEquipmentSections;
        },
        hasValidKeyFeatures() {
            const features = this.listing?.metadata?.key_features;
            if (!features || features.length === 0) return false;
            return features.every(f => f.title?.trim() && f.description?.trim());
        },
          headerBackgroundImage() {
              const fallback = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80';
              if (!this.listingPhotos || this.listingPhotos.length === 0) return this.headerImageFallback;
              // Use first image (not video) for background
              const firstImage = this.listingPhotos.find(url => !this.isVideo(url)) || this.listingPhotos[0];
              return firstImage;
          },
          headerImageError() {
              this.headerImageFallback = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80';
          },
         brokerListings() {
             if (!this.listing) return [];
             let records = [];
             if (this.listingsData.length > 0 && this.listingsData[0].records) records = this.listingsData[0].records;
             
             const currentCity = this.listing?.metadata?.city || this.listing?.city || '';
             const currentType = this.listing?.type || '';
             
             return records
                 .filter(item => 
                     item.id !== this.listing.id &&
                     item.type === currentType &&
                     ((item.metadata?.city && item.metadata.city.toLowerCase() === currentCity.toLowerCase()) ||
                      (item.city && item.city.toLowerCase() === currentCity.toLowerCase()))
                 )
                 .slice(0, 3)
                 .map(item => ({
                     ...item,
                     slug: this.generateSlug(item),
                     imageUrl: this.getListingImage(item)
                 }));
         },
         listingTypeDisplay() {
             if (this.listing?.type === 'daycharter') return 'Day Charter';
             if (this.listing?.type === 'termcharter') return 'Term Charter';
             return 'For Sale';
         },
         brokerSectionTitle() {
             const city = this.formatCityName(this.listing?.metadata?.city || this.listing?.city || '');
             const type = this.listingTypeDisplay;
             return city && type ? `More ${type} in ${city}` : 'More From This Broker';
         },
          contactPhoneNumber() {
              if (this.listingBroker?.phone) {
                  return this.listingBroker.phone.replace(/[^0-9]/g, '');
              }
              return '19546861671';
          },
          contactEmailAddress() {
              if (this.listingBroker?.email) {
                  return this.listingBroker.email;
              }
              return 'Sales@highseasyachting.com';
          }
    },
    methods: {
        getBrokerImage() {
            if (this.listingBroker && this.listingBroker.profile_image) {
                return this.listingBroker.profile_image;
            }
            return '/green.jpg';
        },
         getBrokerPhone() {
             if (this.listingBroker && this.listingBroker.phone) {
                 return this.listingBroker.phone.replace(/[^0-9]/g, '');
             }
             return '9545551234';
         },
          formatCityName(city) {
              if (!city) return '';
              return city.toLowerCase().split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');
          },
         formatCurrency(value) {
            if (!value) return '-';
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
        },
        formatPricingKey(key) {
            if (!key) return key;
            return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        },
        formatCrewRole(role) {
            return role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        },
        isVideo(url) {
            if (!url) return false;
            return url.includes('/videos/') || url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.ogg');
        },
        calculatePayment() {
            if (!this.listing) return;
            const price = this.listing.metadata?.price || 0;
            const el = id => document.getElementById(id);
            if (el('calcPrice')) el('calcPrice').value = price;
            const downAmount = parseFloat(el('calcDown')?.value) || (price * 0.2);
            const rate = parseFloat(el('calcRate')?.value) || 6.74;
            const termYears = parseInt(el('calcTerm')?.value) || 20;
            const loanAmount = price - downAmount;
            const monthlyRate = rate / 100 / 12;
            const totalPayments = termYears * 12;
            let payment = 0;
            if (loanAmount > 0 && monthlyRate > 0 && totalPayments > 0) {
                payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
            }
            if (el('monthlyPayment')) el('monthlyPayment').textContent = '$' + payment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        updateDownPercent() {
            const percent = document.getElementById('calcDownPercent')?.value;
            const price = this.listing?.metadata?.price || 0;
            const downAmount = Math.round(price * percent / 100);
            const el = id => document.getElementById(id);
            if (el('calcDown')) el('calcDown').value = downAmount;
            if (el('downPercentDisplay')) el('downPercentDisplay').textContent = percent + '%';
            this.calculatePayment();
        },
        initSlider() {
            this.totalSlides = this.listingPhotos.length;
            const dotsContainer = document.getElementById('sliderDots');
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < this.totalSlides; i++) {
                    const dot = document.createElement('button');
                    dot.className = i === 0 ? 'ls-slider-dot active' : 'ls-slider-dot';
                    dot.onclick = () => this.goToSlide(i);
                    dotsContainer.appendChild(dot);
                }
            }
            this.updateSlider();
        },
        updateSlider() {
            const track = document.getElementById('sliderTrack');
            if (track) track.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
            const el = id => document.getElementById(id);
            if (el('currentSlide')) el('currentSlide').textContent = this.currentSlideIndex + 1;
            document.querySelectorAll('.ls-slider-dot').forEach((dot, i) => dot.classList.toggle('active', i === this.currentSlideIndex));
            document.querySelectorAll('.ls-thumbnail').forEach((thumb, i) => thumb.classList.toggle('active', i === this.currentSlideIndex));
        },
        changeSlide(direction) {
            this.currentSlideIndex += direction;
            if (this.currentSlideIndex < 0) this.currentSlideIndex = this.totalSlides - 1;
            if (this.currentSlideIndex >= this.totalSlides) this.currentSlideIndex = 0;
            this.updateSlider();
        },
        goToSlide(index) { this.currentSlideIndex = index; this.updateSlider(); },
        handleTabClick(event) {
            const tab = event.currentTarget;
            document.querySelectorAll('.ls-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.ls-tab-pane').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab)?.classList.add('active');
        },
         openGallery(index) {
             this.lightboxIndex = index;
             this.lightboxOpen = true;
             // Also switch to gallery tab and update slider for existing functionality
             this.goToSlide(index);
             document.getElementById('gallery')?.classList.add('active');
             document.querySelectorAll('.ls-tab').forEach(t => t.classList.remove('active'));
             document.querySelector('[data-tab="gallery"]')?.classList.add('active');
         },
         closeLightbox() {
             this.lightboxOpen = false;
         },
         openLightboxAtIndex(index) {
             this.lightboxIndex = index;
             this.lightboxOpen = true;
         },
         nextImage(e) {
             if (e) e.stopPropagation();
             this.lightboxIndex = (this.lightboxIndex + 1) % this.listingPhotos.length;
         },
         prevImage(e) {
             if (e) e.stopPropagation();
             this.lightboxIndex = (this.lightboxIndex - 1 + this.listingPhotos.length) % this.listingPhotos.length;
         },
         handleLightboxKeydown(e) {
             if (!this.lightboxOpen) return;
             switch(e.key) {
                 case 'Escape':
                     this.closeLightbox();
                     break;
                 case 'ArrowRight':
                     this.nextImage();
                     break;
                 case 'ArrowLeft':
                     this.prevImage();
                     break;
             }
         },
        generateSlug(listing) {
            if (!listing) return '';
            const city = listing.metadata?.city || listing.city || '';
            let typeSuffix = 'for-sale';
            if (listing.type === 'daycharter') typeSuffix = 'day-charter';
            else if (listing.type === 'termcharter') typeSuffix = 'term-charter';
            return `${listing.year}-${listing.manufacturer}-${listing.yacht_name}-${city}-${typeSuffix}`.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        },
        getListingImage(listing) {
            if (!listing?.metadata?.photos || listing.metadata.photos.length === 0) {
                return 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80';
            }
            
            // Find first image (not video)
            const firstPhoto = listing.metadata.photos.find(photo => !this.isVideo(photo)) || listing.metadata.photos[0];
            
            // Check if it's a direct URL (yacht-mls)
            if (firstPhoto.startsWith('http')) {
                return firstPhoto;
            }
            
            // For listings.json - Supabase storage paths
            // Use the full path after /media/listings/ to construct the Supabase URL
            const path = firstPhoto.replace(/^\/media\/listings\//, '');
            return SUPABASE_URL + encodeURI(path);
        },
         formatListingPrice(price) {
             if (!price) return 'Price on request';
             return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
         },
         formatCardPrice(item) {
             if (!item) return 'Price on request';
             if (item.type === 'forsale') {
                 return this.formatCurrency(item.metadata?.price || item.price);
             } else if (item.type === 'daycharter') {
                 const pricing = item.metadata?.pricing?.retail;
                 if (!pricing) return 'Call for pricing';
                 const prices = [];
                 if (pricing.four_hour) prices.push(pricing.four_hour);
                 if (pricing.six_hour) prices.push(pricing.six_hour);
                 if (pricing.eight_hour) prices.push(pricing.eight_hour);
                 if (prices.length === 0) return 'Call for pricing';
                 const minPrice = Math.min(...prices);
                 return `From ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(minPrice)}`;
             } else if (item.type === 'termcharter') {
                 const pricing = item.metadata?.pricing?.retail;
                 if (!pricing) return 'Call for pricing';
                 const prices = Object.values(pricing).filter(p => typeof p === 'number');
                 if (prices.length === 0) return 'Call for pricing';
                 const minPrice = Math.min(...prices);
                 return `From ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(minPrice)}`;
             }
             return 'Price on request';
         },
         getKeyFeatureImage(imagePath) {
             if (!imagePath) return 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&q=80';
             if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
             const path = imagePath.replace(/^\/media\/listings\//, '');
             return SUPABASE_URL + encodeURI(path);
         },
          async loadListing() {
            this.loading = true;
            try {
                const slug = this.$route.params.slug;

                const [listingsResp, brokersResp] = await Promise.all([
                    fetch('/data/listings.json'),
                    fetch('/data/broker.json')
                ]);
                const listingsDataRaw = await listingsResp.json();
                const brokersDataRaw = await brokersResp.json();
                this.listingsData = Array.isArray(listingsDataRaw) ? listingsDataRaw : [listingsDataRaw];
                this.brokersData = Array.isArray(brokersDataRaw) ? brokersDataRaw : [brokersDataRaw];

                let records = [];
                if (this.listingsData.length > 0 && this.listingsData[0].records) {
                    records = this.listingsData[0].records;
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
                
                 if (this.listing) {
                     this.$nextTick(() => {
                         this.calculatePayment();
                         this.initSlider();
                     });
                 }
            } catch (error) {
                console.error('Error loading listing:', error);
            } finally {
                this.loading = false;
            }
        },
        generateHomePageSlug(listing) {
            if (!listing) return '';
            const city = listing.metadata?.city || listing.city || '';
            const yachtName = listing.yacht_name || '';
            return `${listing.year}-${listing.manufacturer}-${yachtName}-${city ? city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'location'}`.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        },
         handleBookNow() {
             this.$router.push({
                 path: `/daycharter-booking/${this.listing.slug}`
             });
         },
          openPreQualifyModal() {
              this.showPreQualifyModal = true;
              // Reset form when opening
              this.preQualifyForm = { first_name: '', last_name: '', email: '', phone: '' };
              // Compute current loan summary from calculator
              this.computeLoanSummary();
          },
         closePreQualifyModal() {
             this.showPreQualifyModal = false;
         },
         computeLoanSummary() {
             const getVal = (id) => {
                 const el = document.getElementById(id);
                 if (!el) return null;
                 const val = el.type === 'range' || el.type === 'number' || el.type === 'text' ? parseFloat(el.value) : null;
                 return isNaN(val) ? null : val;
             };
             
             const price = this.listing?.metadata?.price || getVal('calcPrice') || 0;
             const downAmount = getVal('calcDown') || (price * 0.2);
             const downPercent = getVal('calcDownPercent') || 20;
             const rate = getVal('calcRate') || 6.74;
             const termYears = parseInt(getVal('calcTerm')) || 20;
             
             const loanAmount = price - downAmount;
             const monthlyRate = rate / 100 / 12;
             const totalPayments = termYears * 12;
             let payment = 0;
             if (loanAmount > 0 && monthlyRate > 0 && totalPayments > 0) {
                 payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
             }
             
             this.loanSummary = {
                 purchasePrice: price,
                 downPaymentAmount: downAmount,
                 downPaymentPercent: downPercent,
                 interestRate: rate,
                 loanTerm: termYears,
                 monthlyPayment: payment
             };
         },
           submitPreQualifyForm() {
              // Here you would typically send the data to your backend
              console.log('Pre-Qualify Form Submitted:', this.preQualifyForm, 'Loan Summary:', this.loanSummary);
              // Show success message
              alert('Thank you! Your pre-qualification request has been submitted. We will contact you shortly.');
              this.closePreQualifyModal();
          },

            openBoatInquiryModal(fromCalculator = false) {
                this.inquiryFromCalculator = fromCalculator;
                this.showBoatInquiryModal = true;
                // Get current calculated values from the calculator
                const price = this.listing?.metadata?.price || 0;
                const downAmount = parseFloat(document.getElementById('calcDown')?.value) || (price * 0.2);
                const rate = parseFloat(document.getElementById('calcRate')?.value) || 6.74;
                const termYears = parseInt(document.getElementById('calcTerm')?.value) || 20;
                const loanAmount = price - downAmount;
                const monthlyRate = rate / 100 / 12;
                const totalPayments = termYears * 12;
                let payment = 0;
                if (loanAmount > 0 && monthlyRate > 0 && totalPayments > 0) {
                    payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
                }

                this.boatInquiryForm = {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    boat_name: this.listing?.yacht_name || '',
                    make: this.listing?.manufacturer || '',
                    model: '',
                    year: this.listing?.year || '',
                    location: this.displayLocation || '',
                    price: this.listing?.metadata?.price || '',
                    financing: fromCalculator ? 'yes' : 'no',
                    purchase_price: price.toString(),
                    down_payment: downAmount.toString(),
                    interest_rate: rate.toString(),
                    loan_term_months: (termYears * 12).toString(),
                    estimated_monthly_payment: payment.toString(),
                    finance_details: ''
                };
                this.inquirySubmitting = false;
            },

           closeBoatInquiryModal() {
               this.showBoatInquiryModal = false;
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

           async submitBoatInquiryForm() {
              this.inquirySubmitting = true;
              
              try {
                    const payload = {
                        first_name: this.boatInquiryForm.first_name,
                        last_name: this.boatInquiryForm.last_name,
                        email: this.boatInquiryForm.email,
                        phone: this.boatInquiryForm.phone,
                        boat_name: this.boatInquiryForm.boat_name,
                        make: this.boatInquiryForm.make,
                        model: this.boatInquiryForm.model,
                        year: this.boatInquiryForm.year ? parseInt(this.boatInquiryForm.year) : undefined,
                        location: this.boatInquiryForm.location,
                        price: this.boatInquiryForm.price ? parseFloat(this.boatInquiryForm.price) : undefined,
                        financing: this.boatInquiryForm.financing,
                        purchase_price: this.boatInquiryForm.purchase_price ? parseFloat(this.boatInquiryForm.purchase_price) : undefined,
                        down_payment: this.boatInquiryForm.down_payment ? parseFloat(this.boatInquiryForm.down_payment) : undefined,
                        interest_rate: this.boatInquiryForm.interest_rate ? parseFloat(this.boatInquiryForm.interest_rate) : undefined,
                        loan_term_months: this.boatInquiryForm.loan_term_months ? parseInt(this.boatInquiryForm.loan_term_months) : undefined,
                        estimated_monthly_payment: this.boatInquiryForm.estimated_monthly_payment ? parseFloat(this.boatInquiryForm.estimated_monthly_payment) : undefined
                    };

                     if (this.boatInquiryForm.financing === 'yes' && this.boatInquiryForm.finance_details) {
                         payload.finance_details = this.boatInquiryForm.finance_details;
                     }

                    // Remove undefined values
                    Object.keys(payload).forEach(key => 
                        payload[key] === undefined && delete payload[key]
                    );

                  const response = await fetch('https://qumgjqbfreeskjgltfvu.supabase.co/functions/v1/external-boat-inquiry-api', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'x-api-token': 'b87fe821-848b-4b8a-a910-993fe661c490:fe3aab01-21d3-490c-bd9f-77419c2d25bb'
                      },
                      body: JSON.stringify(payload)
                  });

                  let result;
                  try {
                      result = await response.json();
                  } catch (e) {
                      result = { message: await response.text() || 'Invalid response from server' };
                  }

                  console.log('Boat Inquiry API Response:', { 
                      status: response.status, 
                      ok: response.ok, 
                      result 
                  });

                  if (response.ok) {
                      this.showNotification(
                          'Your boat inquiry has been submitted successfully! Our team will contact you shortly.',
                          'success'
                      );
                      this.closeBoatInquiryModal();
                  } else {
                      const errorMsg = result.message || result.error || `Failed to submit inquiry (${response.status})`;
                      this.showNotification(errorMsg, 'error');
                      console.error('Boat inquiry request failed:', result);
                  }
              } catch (error) {
                  console.error('Boat inquiry submission error:', error);
                  this.showNotification(
                      'Unable to connect to the inquiry service. Please check your connection and try again.', 
                      'error'
                  );
               } finally {
                   this.inquirySubmitting = false;
               }
           },


    },
    watch: {
        '$route.params.slug'() {
            this.loadListing();
        }
    },
    mounted() {
        this.loadListing();
        window.addEventListener('keydown', this.handleLightboxKeydown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleLightboxKeydown);
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
      background: #ffffff;
      color: #102012;
      line-height: 1.7;
      min-height: 100vh;
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


     .page-hero {
       position: relative;
       min-height: 480px;
       display: flex;
       align-items: flex-end;
       justify-content: center;
       padding: 80px 24px;
       color: white;
       margin-top: 100px;
       overflow: hidden;
     }

     .hero-background-image {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       object-fit: cover;
       z-index: 0;
     }

     .page-hero::before {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: linear-gradient(180deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.2) 60%);
       z-index: 1;
       pointer-events: none;
     }

     .hero-content {
       position: relative;
       z-index: 2;
       max-width: 900px;
       width: 100%;
       display: flex;
       justify-content: space-between;
       align-items: flex-end;
       flex-wrap: wrap;
       gap: 24px;
     }

    .hero-info {
      flex: 1;
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
      font-size: clamp(2.2rem, 4vw, 3.5rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.85);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hero-price {
      background: #ffffff;
      color: #1a3a2a;
      padding: 20px 32px;
      border-radius: 26px;
      text-align: center;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
    }

    .price-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #5f6d60;
      margin-bottom: 6px;
      font-weight: 600;
    }

    .price-value {
      font-size: 1.8rem;
      font-weight: 800;
      color: #1a3a2a;
    }

    @media (max-width: 768px) {
      .page-hero {
        min-height: 320px;
        padding: 24px 16px;
        align-items: flex-end;
      }

      .hero-content {
        flex-direction: column;
         position: relative;
         z-index: 2;
        align-items: flex-start;
        gap: 16px;
      }

      .hero-label {
        padding: 8px 16px;
        font-size: 0.65rem;
        letter-spacing: 1.5px;
        margin-bottom: 12px;
      }

      .hero-title {
        font-size: 1.6rem;
        line-height: 1.2;
      }

      .hero-subtitle {
        font-size: 0.95rem;
      }

      .hero-price {
        width: 100%;
        padding: 16px 20px;
        border-radius: 18px;
      }

      .price-label {
        font-size: 0.65rem;
        margin-bottom: 4px;
      }

      .price-value {
        font-size: 1.4rem;
      }
    }

    @media (max-width: 480px) {
      .page-hero {
        min-height: 280px;
        padding: 20px 12px;
      }

      .hero-title {
        font-size: 1.3rem;
      }

      .hero-subtitle {
        font-size: 0.85rem;
      }
    }

    .hs-container {
      max-width: 1350px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .ls-main-section {
      padding: 80px 0;
      background: #f9f9f9;
      overflow-x: hidden;
    }

    .ls-content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .ls-sidebar {
      width: 100%;
      max-width: 420px;
    }

    @media (min-width: 1101px) {
      .ls-content-grid {
        grid-template-columns: 1fr 420px;
      }
    }

    .ls-main-column {
      display: flex;
      flex-direction: column;
      gap: 40px;
      min-width: 0;
    }

    .ls-sidebar {
      min-width: 0;
    }

    .ls-card {
      background: #ffffff;
      border-radius: 26px;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(26, 58, 42, 0.06);
      overflow: hidden;
    }

       .ls-cards {
      overflow: hidden;
      overflow-x: hidden;
    }

    .ls-card-header {
      padding: 28px 32px;
      border-bottom: 1px solid rgba(26, 58, 42, 0.08);
    }

    .ls-card-header h3 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a3a2a;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ls-card-header h3 i {
      color: #355a32;
    }

    .ls-card-body {
      padding: 32px;
    }

    .ls-description-text {
      color: #5f6d60;
      line-height: 1.9;
      font-size: 1.05rem;
    }

    .ls-specs-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    .ls-spec-item {
      text-align: center;
      padding: 24px 16px;
      background: #f8faf6;
      border-radius: 18px;
      transition: all 0.3s ease;
    }

    .ls-spec-item:hover {
      transform: translateY(-4px);
      background: #ffffff;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
    }

    .ls-spec-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    .ls-spec-icon i {
      color: white;
      font-size: 1.2rem;
    }

    .ls-spec-value {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a3a2a;
      margin-bottom: 6px;
    }

    .ls-spec-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #5f6d60;
      font-weight: 600;
    }

    .ls-features-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .ls-feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: #f8faf6;
      border-radius: 12px;
      font-size: 0.95rem;
      color: #102012;
      transition: all 0.3s ease;
    }

    .ls-feature-item:hover {
      background: rgba(65, 107, 60, 0.1);
    }

    .ls-feature-item i {
      color: #355a32;
      font-size: 0.9rem;
    }

    .ls-gallery-wrapper {
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    .ls-main-slider {
      position: relative;
      overflow: hidden;
      border-radius: 26px;
      height: 500px;
      background: #102012;
    }

    .ls-slider-track {
      display: flex;
      height: 100%;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ls-slider-slide {
      min-width: 100%;
      height: 100%;
      position: relative;
    }

     .ls-slider-slide img,
     .ls-slider-video {
       width: 100%;
       height: 100%;
       object-fit: cover;
     }

     .ls-slider-video {
       background: #000;
     }

    .ls-slider-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.95);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .ls-slider-nav:hover {
      background: #1a3a2a;
      color: white;
      transform: translateY(-50%) scale(1.1);
    }

    .ls-slider-nav.prev {
      left: 20px;
    }

    .ls-slider-nav.next {
      right: 20px;
    }

    .ls-slider-nav i {
      font-size: 1.2rem;
      color: #1a3a2a;
      transition: color 0.3s ease;
    }

    .ls-slider-nav:hover i {
      color: white;
    }

    .ls-slider-dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10;
    }

    .ls-slider-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .ls-slider-dot.active {
      background: white;
      transform: scale(1.2);
    }

    .ls-slider-dot:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    .ls-slider-counter {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(26, 58, 42, 0.85);
      color: white;
      padding: 10px 18px;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      z-index: 10;
      backdrop-filter: blur(10px);
    }

    .ls-thumbnails {
      display: flex;
      gap: 12px;
      margin-top: 16px;
      overflow-x: auto;
      padding-bottom: 8px;
      width: 100%;
      max-width: 890px;
    }

    .ls-thumbnails::-webkit-scrollbar {
      height: 6px;
    }

    .ls-thumbnails::-webkit-scrollbar-track {
      background: #f8faf6;
      border-radius: 3px;
    }

    .ls-thumbnails::-webkit-scrollbar-thumb {
      background: #355a32;
      border-radius: 3px;
    }

    .ls-thumbnail {
      flex-shrink: 0;
      width: 100px;
      height: 70px;
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .ls-thumbnail:hover {
      opacity: 0.9;
    }

    .ls-thumbnail.active {
      opacity: 1;
      border-color: #355a32;
    }

     .ls-thumbnail img {
       width: 100%;
       height: 100%;
       object-fit: cover;
     }

     .ls-thumbnail-video {
       width: 100%;
       height: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
       background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
       color: white;
       font-size: 1.5rem;
     }

    @media (max-width: 768px) {
      .ls-gallery-wrapper {
        margin: -8px;
      }

      .ls-main-slider {
        height: 280px;
        border-radius: 0;
      }

      .ls-slider-nav {
        width: 36px;
        height: 36px;
        opacity: 0.9;
      }

      .ls-slider-nav.prev {
        left: 10px;
      }

      .ls-slider-nav.next {
        right: 10px;
      }

      .ls-slider-nav i {
        font-size: 0.9rem;
      }

      .ls-slider-dots {
        bottom: 12px;
      }

      .ls-slider-dot {
        width: 8px;
        height: 8px;
      }

      .ls-slider-counter {
        top: 12px;
        right: 12px;
        padding: 6px 12px;
        font-size: 0.75rem;
      }

      .ls-thumbnails {
        gap: 8px;
        padding: 12px 8px;
        margin-top: 0;
        justify-content: center;
        width: 100%;
        max-width: 100%;
      }

      .ls-thumbnail {
        width: 60px;
        height: 50px;
        border-radius: 8px;
        opacity: 0.7;
      }

      .ls-thumbnail.active {
        opacity: 1;
      }

      .ls-thumbnail img {
        border-radius: 6px;
      }
    }

    @media (max-width: 480px) {
      .ls-main-slider {
        height: 220px;
      }

      .ls-slider-nav {
        width: 32px;
        height: 32px;
      }

      .ls-slider-nav.prev {
        left: 8px;
      }

      .ls-slider-nav.next {
        right: 8px;
      }

      .ls-thumbnail {
        width: 50px;
        height: 42px;
      }

      .ls-slider-counter {
        padding: 5px 10px;
        font-size: 0.7rem;
      }
    }

    .ls-sidebar {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .ls-broker-card {
      background: #ffffff;
      border-radius: 26px;
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
      padding: 32px;
      top: 24px;
    }

    .ls-broker-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 28px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(26, 58, 42, 0.08);
    }

    .ls-broker-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #355a32;
    }

    .ls-broker-info h4 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1a3a2a;
      margin-bottom: 4px;
    }

    .ls-broker-info span {
      font-size: 0.85rem;
      color: #5f6d60;
    }

    .ls-broker-contact {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 24px;
    }

    .ls-contact-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      background: #f8faf6;
      border-radius: 12px;
      color: #102012;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .ls-contact-item:hover {
      background: #355a32;
      color: white;
      transform: translateX(6px);
    }

    .ls-contact-item i {
      width: 20px;
      text-align: center;
      color: #355a32;
    }

    .ls-contact-item:hover i {
      color: white;
    }

    .ls-action-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }

    .ls-btn-primary {
      background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
      color: white;
      border: none;
      padding: 18px 24px;
      border-radius: 14px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
    }

    .ls-btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(65, 107, 60, 0.35);
    }

    .ls-btn-secondary {
      background: #f8faf6;
      color: #1a3a2a;
      border: 2px solid rgba(26, 58, 42, 0.15);
      padding: 16px 24px;
      border-radius: 14px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-decoration: none;
      width: 100%;
    }

    .ls-btn-secondary:hover {
      background: #1a3a2a;
      color: white;
      border-color: #1a3a2a;
    }

    @media (min-width: 480px) {
      .ls-action-buttons {
        flex-direction: row;
        gap: 16px;
      }

      .ls-btn-primary,
      .ls-btn-secondary {
        width: auto;
        flex: 1;
      }
    }

    @media (max-width: 768px) {
      .ls-action-buttons {
        gap: 10px;
      }

      .ls-btn-primary,
      .ls-btn-secondary {
        padding: 16px 20px;
        font-size: 0.95rem;
      }
    }

    .ls-quick-specs {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .ls-quick-spec {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px;
      background: #f8faf6;
      border-radius: 12px;
    }

    .ls-quick-spec i {
      color: #355a32;
      font-size: 1.1rem;
    }

    .ls-quick-spec-text {
      font-size: 0.9rem;
      color: #5f6d60;
    }

    /* Price Card */
    .ls-price-card {
      background: #ffffff;
      border-radius: 26px;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(26, 58, 42, 0.06);
      overflow: hidden;
    }

    .ls-price-header {
      background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
      padding: 28px;
      text-align: center;
    }

    .ls-price-label {
      display: block;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 8px;
      font-weight: 600;
    }

    .ls-price-value {
      font-size: 2.2rem;
      font-weight: 800;
      color: white;
      letter-spacing: -0.02em;
    }

    .ls-price-details {
      padding: 24px;
    }

    .ls-price-item {
      display: flex;
      justify-content: space-between;
      padding: 14px 0;
      border-bottom: 1px solid rgba(26, 58, 42, 0.08);
    }

    .ls-price-item:last-child {
      border-bottom: none;
    }

    .ls-price-item-label {
      color: #5f6d60;
      font-size: 0.9rem;
    }

    .ls-price-item-value {
      font-weight: 600;
      color: #1a3a2a;
      font-size: 0.9rem;
    }

    .ls-daycharter-table {
      padding: 20px;
    }

    .ls-daycharter-table table {
      width: 100%;
      border-collapse: collapse;
    }

    .ls-daycharter-table tr {
      display: flex;
      justify-content: space-between;
      padding: 14px 0;
      border-bottom: 1px solid rgba(26, 58, 42, 0.1);
    }

    .ls-daycharter-table tr:last-child {
      border-bottom: none;
    }

    .ls-daycharter-table td {
      font-size: 1rem;
      color: #1a3a2a;
    }

    .ls-daycharter-amount {
      font-weight: 700;
      color: #355a32;
    }

    /* Payment Calculator Card */
    .ls-calc-card {
      background: #ffffff;
      border-radius: 26px;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(26, 58, 42, 0.06);
      overflow: hidden;
    }

    .ls-calc-header {
      padding: 24px;
      border-bottom: 1px solid rgba(26, 58, 42, 0.08);
    }

    .ls-calc-header h4 {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1a3a2a;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ls-calc-header h4 i {
      color: #355a32;
    }

    .ls-calc-body {
      padding: 24px;
    }

    .ls-calc-group {
      margin-bottom: 18px;
    }

    .ls-calc-group:last-of-type {
      margin-bottom: 0;
    }

    .ls-calc-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: #5f6d60;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ls-calc-input-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ls-calc-currency {
      font-size: 1rem;
      font-weight: 600;
      color: #1a3a2a;
    }

    .ls-calc-input {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid rgba(26, 58, 42, 0.12);
      border-radius: 10px;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
      color: #1a3a2a;
      transition: all 0.3s ease;
    }

    .ls-calc-input:focus {
      outline: none;
      border-color: #355a32;
    }

    .ls-calc-range {
      flex: 1;
      -webkit-appearance: none;
      appearance: none;
      height: 8px;
      border-radius: 4px;
      background: #f8faf6;
      cursor: pointer;
    }

    .ls-calc-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #355a32;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(53, 90, 50, 0.3);
    }

    .ls-calc-percent-value {
      min-width: 45px;
      text-align: right;
      font-weight: 700;
      color: #1a3a2a;
      font-size: 0.95rem;
    }

    .ls-calc-select-wrap {
      position: relative;
    }

    .ls-calc-select {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid rgba(26, 58, 42, 0.12);
      border-radius: 10px;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
      color: #1a3a2a;
      background: #ffffff;
      cursor: pointer;
      transition: all 0.3s ease;
      -webkit-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231a3a2a' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
    }

    .ls-calc-select:focus {
      outline: none;
      border-color: #355a32;
    }

    .ls-calc-result {
      background: #f8faf6;
      padding: 20px;
      border-radius: 12px;
      margin-top: 20px;
      text-align: center;
    }

    .ls-calc-result-label {
      display: block;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #5f6d60;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .ls-calc-result-value {
      font-size: 1.8rem;
      font-weight: 800;
      color: #1a3a2a;
    }

    .ls-calc-footer {
      padding: 20px 24px;
      background: #f8faf6;
      border-top: 1px solid rgba(26, 58, 42, 0.08);
    }

    .ls-calc-footer p {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: #5f6d60;
      margin-bottom: 10px;
    }

    .ls-calc-footer p:last-child {
      margin-bottom: 0;
    }

     .ls-calc-footer i {
       color: #355a32;
       font-size: 0.8rem;
     }

     .ls-calc-cta {
       padding: 24px;
       background: #ffffff;
       border-top: 1px solid rgba(26, 58, 42, 0.08);
     }

     .ls-calc-cta .ls-btn-primary {
       width: 100%;
     }

     @media (max-width: 768px) {
      .ls-price-card,
      .ls-calc-card {
        border-radius: 18px;
        margin-bottom: 16px;
      }

      .ls-price-header {
        padding: 20px;
      }

      .ls-price-value {
        font-size: 1.75rem;
      }

      .ls-price-details {
        padding: 16px;
      }

      .ls-price-item {
        padding: 12px 0;
      }

      .ls-calc-header {
        padding: 18px;
      }

      .ls-calc-header h4 {
        font-size: 1.1rem;
      }

      .ls-calc-body {
        padding: 18px;
      }

      .ls-calc-input {
        padding: 12px 14px;
        font-size: 0.95rem;
      }

      .ls-calc-group label {
        font-size: 0.75rem;
      }

      .ls-calc-result {
        padding: 16px;
      }

      .ls-calc-result-value {
        font-size: 1.5rem;
      }

      .ls-calc-footer {
        padding: 16px 18px;
      }

      .ls-calc-footer p {
        font-size: 0.8rem;
      }
    }

    .ls-quick-spec-text strong {
      display: block;
      color: #1a3a2a;
      font-weight: 600;
    }

    /* Tabbed Details */
    .ls-details-card {
      background: #ffffff;
      border-radius: 26px;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      border: 1px solid rgba(26, 58, 42, 0.06);
      overflow: hidden;
      width: 100%;
      max-width: 100%;
    }

    .ls-details-header {
      background: linear-gradient(135deg, #1a3a2a 0%, #2d5a45 100%);
      padding: 32px;
    }

    .ls-details-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: white;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    .ls-details-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .ls-details-meta span {
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ls-details-meta i {
      font-size: 0.8rem;
      opacity: 0.8;
    }

    .ls-tabs {
      display: flex;
      border-bottom: 1px solid rgba(26, 58, 42, 0.1);
      background: #f8faf6;
      overflow-x: auto;
    }

    .ls-tab {
      flex: 1;
      min-width: max-content;
      padding: 18px 24px;
      background: none;
      border: none;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: #5f6d60;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
    }

    .ls-tab:hover {
      color: #1a3a2a;
      background: rgba(26, 58, 42, 0.05);
    }

    .ls-tab.active {
      color: #1a3a2a;
      background: #ffffff;
      border-bottom: 3px solid #355a32;
    }

    .ls-tab i {
      font-size: 0.85rem;
    }

    .ls-tab-content {
      padding: 28px;
    }

    .ls-tab-pane {
      display: none;
    }

    .ls-tab-pane.active {
      display: block;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ls-description-text {
      color: #5f6d60;
      line-height: 1.9;
      font-size: 1.05rem;
    }

    .ls-features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
      margin-bottom: 22px;
    }

    .ls-features-grid .ls-feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: #f8faf6;
      border-radius: 10px;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .ls-features-grid .ls-feature-item:hover {
      background: #ffffff;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      transform: translateX(4px);
    }

    .ls-features-grid .ls-feature-item i {
      color: #355a32;
      font-size: 0.85rem;
    }

    .ls-specs-table {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .ls-spec-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px;
      background: #f8faf6;
      border-radius: 10px;
    }

    .ls-spec-name {
      color: #5f6d60;
      font-size: 0.9rem;
    }

    .ls-spec-val {
      font-weight: 600;
      color: #1a3a2a;
      font-size: 0.95rem;
    }

    .ls-broker-detail {
      display: flex;
      gap: 24px;
      padding: 24px;
      background: #f8faf6;
      border-radius: 26px;
      margin-bottom: 20px;
    }

    .ls-broker-detail-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #355a32;
    }

    .ls-broker-detail-info h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1a3a2a;
      margin-bottom: 4px;
    }

    .ls-broker-detail-info span {
      color: #355a32;
      font-weight: 600;
      font-size: 0.85rem;
      display: block;
      margin-bottom: 12px;
    }

    .ls-broker-detail-info p {
      color: #5f6d60;
      font-size: 0.9rem;
      line-height: 1.7;
    }

    .ls-broker-detail-contact {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom:25px
    }

    @media (max-width: 768px) {
      .ls-details-header {
        padding: 24px 20px;
      }

      .ls-details-title {
        font-size: 1.4rem;
      }

      .ls-details-meta {
        gap: 12px;
      }

      .ls-details-meta span {
        font-size: 0.8rem;
      }

      .ls-tabs {
        padding: 0;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }

      .ls-tabs::-webkit-scrollbar {
        display: none;
      }

      .ls-tab {
        padding: 14px 12px;
        font-size: 0.75rem;
        gap: 6px;
        flex-shrink: 0;
      }

      .ls-tab span {
        display: none;
      }

      .ls-tab i {
        font-size: 0.9rem;
      }

      .ls-tab-content {
        padding: 20px;
      }

      .ls-features-grid {
        grid-template-columns: 1fr;
      }

      .ls-specs-table {
        grid-template-columns: 1fr;
      }

      .ls-broker-detail {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 20px;
      }

      .ls-broker-detail-avatar {
        width: 80px;
        height: 80px;
      }

      .ls-broker-detail-contact {
        width: 100%;
      }

      .ls-broker-detail-contact .ls-contact-item {
        justify-content: center;
      }

      .ls-video-wrapper img {
        height: 220px;
      }

      .ls-video-play {
        width: 60px;
        height: 60px;
      }

      .ls-video-play i {
        font-size: 1.3rem;
      }

      .ls-location-container {
        grid-template-columns: 1fr;
      }

      .ls-location-map img {
        min-height: 200px;
      }
    }

    /* Video Tab */
    .ls-video-container {
      text-align: center;
    }

    .ls-video-wrapper {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      cursor: pointer;
      margin-bottom: 16px;
    }

    .ls-video-wrapper img {
      width: 100%;
      height: 350px;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .ls-video-wrapper:hover img {
      transform: scale(1.05);
    }

    .ls-video-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }

    .ls-video-play i {
      color: #1a3a2a;
      font-size: 1.8rem;
      margin-left: 4px;
    }

    .ls-video-wrapper:hover .ls-video-play {
      background: #355a32;
      transform: translate(-50%, -50%) scale(1.1);
    }

    .ls-video-wrapper:hover .ls-video-play i {
      color: white;
    }

    .ls-video-note {
      color: #5f6d60;
      font-size: 0.9rem;
    }

    /* Gallery Tab */
    .ls-gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .ls-gallery-item {
      position: relative;
      aspect-ratio: 4/3;
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
    }

     .ls-gallery-item img,
     .ls-gallery-item video {
       width: 100%;
       height: 100%;
       object-fit: cover;
       transition: transform 0.4s ease;
     }

      .ls-gallery-item:hover img,
      .ls-gallery-item:hover video {
        transform: scale(1.1);
      }

     .ls-gallery-item:hover {
      transform: scale(1.03);
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
    }

    .ls-gallery-item:hover img {
      transform: scale(1.1);
    }

    .ls-gallery-overlay {
      position: absolute;
      inset: 0;
      background: rgba(26, 58, 42, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .ls-gallery-item:hover .ls-gallery-overlay {
      opacity: 1;
    }

    .ls-gallery-overlay i {
      color: white;
      font-size: 1.4rem;
    }

    @media (max-width: 768px) {
      .ls-gallery-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
    }

    @media (max-width: 540px) {
      .ls-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }

    /* Location Tab */
    .ls-location-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .ls-location-map {
      border-radius: 26px;
      overflow: hidden;
    }

    .ls-location-map img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      min-height: 300px;
    }

    .ls-location-details {
      padding: 20px;
    }

    .ls-location-details h4 {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1a3a2a;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ls-location-details h4 i {
      color: #355a32;
    }

    .ls-location-details p {
      color: #5f6d60;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    .ls-location-details p strong {
      color: #1a3a2a;
    }

    .ls-crew-section {
      padding: 24px;
    }

    .ls-crew-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }

    .ls-crew-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px;
      background: #f8faf6;
      border-radius: 14px;
      border: 1px solid rgba(53, 90, 50, 0.1);
    }

    .ls-crew-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #355a32, #2d5a45);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
    }

    .ls-crew-info {
      display: flex;
      flex-direction: column;
    }

    .ls-crew-role {
      font-weight: 700;
      color: #1a3a2a;
      font-size: 1rem;
    }

    .ls-crew-count {
      color: #5f6d60;
      font-size: 0.85rem;
    }

    .ls-no-crew {
      color: #5f6d60;
      font-size: 1rem;
      padding: 20px;
      text-align: center;
    }

    .ls-location-note {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
      padding: 12px 16px;
      background: rgba(65, 107, 60, 0.1);
      border-radius: 10px;
      color: #355a32 !important;
      font-weight: 600;
    }

    .ls-location-note i {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      .ls-details-title {
        font-size: 1.2rem;
      }

      .ls-details-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .ls-tab {
        padding: 12px 10px;
        font-size: 0.7rem;
      }

      .ls-tab i {
        font-size: 0.85rem;
      }

      .ls-tab-content {
        padding: 16px;
      }

      .ls-video-wrapper img {
        height: 180px;
      }

      .ls-video-play {
        width: 50px;
        height: 50px;
      }

      .ls-video-play i {
        font-size: 1.1rem;
      }

      .ls-location-details {
        padding: 12px;
      }

      .ls-location-details h4 {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 1100px) {
      .ls-sidebar {
        order: -1;
        max-width: 100%;
      }

      .ls-broker-card {
        position: static;
      }

      .ls-specs-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .ls-main-section {
        padding: 12px 0;
      }

      .ls-content-grid {
        gap: 24px;
      }

      .ls-features-list {
        grid-template-columns: 1fr;
      }

      .ls-card {
        border-radius: 18px;
      }

      .ls-card-header {
        padding: 20px 16px;
      }

      .ls-card-header h3 {
        font-size: 1.15rem;
      }

      .ls-card-body {
        padding: 16px;
      }

      .ls-specs-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .ls-spec-item {
        padding: 16px 10px;
      }

      .ls-spec-value {
        font-size: 1.15rem;
      }

      .ls-spec-label {
        font-size: 0.65rem;
      }

      .ls-spec-icon {
        width: 40px;
        height: 40px;
      }

      .ls-spec-icon i {
        font-size: 1rem;
      }

      .ls-features-list {
        gap: 10px;
      }

      .ls-feature-item {
        padding: 12px 14px;
        font-size: 0.85rem;
      }

      .ls-sidebar {
        padding: 0 4px;
      }

      .ls-broker-card {
        padding: 20px;
      }

      .ls-broker-header {
        gap: 14px;
        margin-bottom: 20px;
        padding-bottom: 16px;
      }

      .ls-broker-avatar {
        width: 60px;
        height: 60px;
      }

      .ls-broker-info h4 {
        font-size: 1.1rem;
      }

      .ls-broker-contact {
        gap: 10px;
        margin-bottom: 18px;
      }

      .ls-contact-item {
        padding: 12px 14px;
        font-size: 0.85rem;
      }

      .ls-quick-specs {
        gap: 10px;
      }

      .ls-quick-spec {
        padding: 12px;
      }

      .ls-action-buttons {
        gap: 10px;
      }

      .ls-btn-primary, .ls-btn-secondary {
        padding: 14px 18px;
        font-size: 0.9rem;
      }
    }
      

    .ls-similar-section {
      padding: 100px 0;
      background: #ffffff;
      font-family: 'Poppins', sans-serif;
      position: relative;
      overflow: hidden;
    }

    .ls-similar-section::before {
      content: '';
      position: absolute;
      top: -200px;
      right: -200px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(26, 58, 42, 0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    .ls-similar-section::after {
      content: '';
      position: absolute;
      bottom: -200px;
      left: -200px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(53, 90, 50, 0.04) 0%, transparent 70%);
      pointer-events: none;
    }

    .ls-section-header {
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

    .ls-section-title {
      font-size: 2.8rem;
      font-weight: 800;
      color: #1a3a2a;
      text-align: center;
      margin-bottom: 0;
      letter-spacing: -0.02em;
    }

    .ls-similar-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }

    .ls-similar-card {
      background: #ffffff;
      border-radius: 26px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(26, 58, 42, 0.05);
    }

    .ls-similar-card:hover {
      transform: translateY(-12px);
      box-shadow: 0 18px 45px rgba(15, 40, 24, 0.14);
    }

    .ls-similar-card:hover .ls-similar-image img {
      transform: scale(1.08);
    }

    .ls-similar-image {
      position: relative;
      height: 240px;
      overflow: hidden;
    }

    .ls-similar-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ls-similar-badge {
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

    .ls-similar-info {
      padding: 28px;
    }

    .ls-similar-info h3 {
      font-size: 1.35rem;
      font-weight: 700;
      color: #1a3a2a;
      margin-bottom: 16px;
    }

    .ls-yacht-specs {
      display: flex;
      gap: 24px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(26, 58, 42, 0.08);
    }

    .ls-yacht-specs div {
      font-size: 0.9rem;
    }

    .ls-yacht-specs strong {
      display: block;
      font-size: 0.7rem;
      color: #5f6d60;
      margin-bottom: 4px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .ls-similar-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ls-similar-price {
      font-size: 1.3rem;
      font-weight: 700;
      color: #355a32;
    }

    .ls-similar-link {
      color: #355a32;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .ls-similar-link:hover {
      gap: 12px;
      color: #1a3a2a;
    }

    .ls-similar-link i {
      font-size: 0.85rem;
    }

    @media (max-width: 1100px) {
      .ls-similar-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .ls-similar-section {
        padding: 50px 0;
      }

      .ls-section-title {
        font-size: 1.75rem;
      }

      .hs-small-tag {
        font-size: 0.65rem;
        padding: 6px 14px;
      }

      .ls-similar-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .ls-similar-image {
        height: 180px;
      }

      .ls-similar-info {
        padding: 20px;
      }

      .ls-similar-info h3 {
        font-size: 1.15rem;
      }

      .ls-yacht-specs {
        gap: 12px;
        margin-bottom: 14px;
      }

      .ls-yacht-specs div {
        font-size: 0.8rem;
      }

      .ls-yacht-specs strong {
        font-size: 0.6rem;
      }

      .ls-similar-price {
        font-size: 1.1rem;
      }
    }

   
    @media (max-width: 992px) {
      .ls-cta-grid {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 40px;
      }

      .ls-cta-image {
        height: 350px;
      }
    }

    @media (max-width: 768px) {
      .ls-cta-section {
        padding: 40px 0;
      }

      .ls-cta-grid {
        padding: 24px;
        border-radius: 18px;
        gap: 24px;
      }

      .ls-cta-content h2 {
        font-size: 1.5rem;
        margin-bottom: 14px;
      }

      .ls-cta-content p {
        font-size: 0.95rem;
        margin-bottom: 20px;
      }

      .ls-cta-form {
        flex-direction: column;
        gap: 12px;
      }

      .ls-cta-input {
        padding: 14px 16px;
        font-size: 0.9rem;
      }

      .ls-cta-submit {
        padding: 14px 24px;
        font-size: 0.9rem;
      }

      .ls-cta-image {
        height: 220px;
        border-radius: 18px;
      }

      .ls-cta-overlay {
        padding: 30px 20px 20px;
      }

      .ls-cta-overlay h3 {
        font-size: 1.3rem;
      }

      .ls-cta-overlay p {
        font-size: 0.85rem;
      }

       .ls-consult-btn {
         padding: 10px 20px;
         font-size: 0.8rem;
       }
        .ls-key-features {
        width: 100% !important;
      }
      }

      /* Key Features Section */
      .ls-key-features {
        background: #fff;
        border-radius: 26px;
        box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
        border: 1px solid rgba(26, 58, 42, 0.06);
        overflow: hidden;
        padding: 40px;
        margin-top: 50px;
        width: 79%;
      }

      .ls-section-subtitle {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1a3a2a;
        margin-bottom: 24px;
      }

      .ls-key-features-slider {
        display: flex;
        gap: 24px;
        overflow-x: auto;
        padding-bottom: 16px;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
      }

      .ls-key-features-slider::-webkit-scrollbar {
        height: 8px;
      }

      .ls-key-features-slider::-webkit-scrollbar-track {
        background: #f0f0f0;
        border-radius: 4px;
      }

      .ls-key-features-slider::-webkit-scrollbar-thumb {
        background: #355a32;
        border-radius: 4px;
      }

      .ls-key-feature-card {
        flex: 0 0 300px;
        scroll-snap-align: start;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .ls-key-feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
      }

      .ls-key-feature-image {
        width: 100%;
        height: 180px;
        overflow: hidden;
      }

      .ls-key-feature-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .ls-key-feature-card:hover .ls-key-feature-image img {
        transform: scale(1.05);
      }

      .ls-key-feature-content {
        padding: 20px;
      }

      .ls-key-feature-content h4 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1a3a2a;
        margin-bottom: 8px;
      }

      .ls-key-feature-content p {
        font-size: 0.9rem;
        color: #5f6d60;
        line-height: 1.6;
      }

      /* Equipment Tab Styles */
      .ls-equipment-sections {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      .ls-equipment-category {
        background: #ffffff;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      }

      .ls-equipment-category .ls-section-subtitle {
        font-size: 1.2rem;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid #355a32;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .ls-equipment-category .ls-section-subtitle i {
        color: #355a32;
      }

      .ls-equipment-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 12px;
      }

      .ls-equipment-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        background: #f8f9f8;
        border-radius: 10px;
        font-size: 0.95rem;
        color: #5f6d60;
        transition: all 0.2s ease;
      }

      .ls-equipment-item:hover {
        background: #eef2ee;
        transform: translateX(4px);
      }

      .ls-equipment-item i {
        color: #355a32;
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .ls-equipment-grid {
          grid-template-columns: 1fr;
        }

        .ls-equipment-category {
          padding: 20px;
        }

        .ls-equipment-category .ls-section-subtitle {
          font-size: 1.1rem;
        }
      }

      /* Lightbox Modal Styles */
     .ls-lightbox {
       position: fixed;
       inset: 0;
       z-index: 9999;
       display: flex;
       align-items: center;
       justify-content: center;
       background: rgba(0, 0, 0, 0.92);
       animation: ls-lightbox-fade-in 0.3s ease;
     }

     @keyframes ls-lightbox-fade-in {
       from { opacity: 0; }
       to { opacity: 1; }
     }

     .ls-lightbox-overlay {
       position: absolute;
       inset: 0;
       background: rgba(0, 0, 0, 0.9);
     }

     .ls-lightbox-content {
       position: relative;
       max-width: 90vw;
       max-height: 90vh;
       display: flex;
       align-items: center;
       justify-content: center;
       animation: ls-lightbox-zoom-in 0.3s ease;
     }

     @keyframes ls-lightbox-zoom-in {
       from {
         opacity: 0;
         transform: scale(0.9);
       }
       to {
         opacity: 1;
         transform: scale(1);
       }
     }

     .ls-lightbox-media {
       max-width: 100%;
       max-height: 90vh;
       display: flex;
       align-items: center;
       justify-content: center;
     }

     .ls-lightbox-image {
       max-width: 100%;
       max-height: 90vh;
       object-fit: contain;
       border-radius: 4px;
       box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
     }

     .ls-lightbox-video {
       max-width: 100%;
       max-height: 90vh;
       width: auto;
       height: auto;
       border-radius: 4px;
       box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
     }

     .ls-lightbox-close {
       position: absolute;
       top: 20px;
       right: 20px;
       width: 50px;
       height: 50px;
       background: rgba(255, 255, 255, 0.1);
       border: none;
       border-radius: 50%;
       color: white;
       font-size: 1.4rem;
       cursor: pointer;
       z-index: 10;
       display: flex;
       align-items: center;
       justify-content: center;
       transition: all 0.3s ease;
       backdrop-filter: blur(10px);
     }

     .ls-lightbox-close:hover {
       background: rgba(255, 255, 255, 0.25);
       transform: scale(1.1);
     }

     .ls-lightbox-nav {
       position: absolute;
       top: 50%;
       transform: translateY(-50%);
       width: 56px;
       height: 56px;
       background: rgba(255, 255, 255, 0.1);
       border: none;
       border-radius: 50%;
       color: white;
       font-size: 1.2rem;
       cursor: pointer;
       z-index: 10;
       display: flex;
       align-items: center;
       justify-content: center;
       transition: all 0.3s ease;
       backdrop-filter: blur(10px);
     }

     .ls-lightbox-nav:hover {
       background: rgba(255, 255, 255, 0.25);
       transform: translateY(-50%) scale(1.1);
     }

     .ls-lightbox-prev {
       left: 20px;
     }

     .ls-lightbox-next {
       right: 20px;
     }

     .ls-lightbox-counter {
       position: absolute;
       bottom: 20px;
       left: 50%;
       transform: translateX(-50%);
       color: white;
       font-size: 1rem;
       font-weight: 500;
       background: rgba(0, 0, 0, 0.5);
       padding: 8px 16px;
       border-radius: 20px;
       backdrop-filter: blur(10px);
     }

     @media (max-width: 768px) {
       .ls-lightbox-close {
         top: 10px;
         right: 10px;
         width: 44px;
         height: 44px;
         font-size: 1.2rem;
       }

       .ls-lightbox-nav {
         width: 44px;
         height: 44px;
         font-size: 1rem;
       }

       .ls-lightbox-prev {
         left: 10px;
       }

       .ls-lightbox-next {
         right: 10px;
       }

       .ls-lightbox-counter {
         bottom: 10px;
         font-size: 0.9rem;
         padding: 6px 12px;
       }
     }

       @media (max-width: 480px) {
         .ls-lightbox-content {
           max-width: 95vw;
           max-height: 95vh;
         }

         .ls-lightbox-nav {
           width: 40px;
           height: 40px;
         }
       }

     /* Empty Listing State Styles */
     .ls-empty-listing-card {
       background: #ffffff;
       border-radius: 26px;
       overflow: hidden;
       box-shadow: 0 10px 30px rgba(15, 40, 24, 0.08);
       border: 1px solid rgba(26, 58, 42, 0.06);
     }

     .ls-empty-content {
       padding: 60px 40px;
       text-align: center;
       display: flex;
       flex-direction: column;
       align-items: center;
       gap: 20px;
     }

     .ls-empty-icon-wrapper {
       width: 100px;
       height: 100px;
       background: linear-gradient(135deg, rgba(65, 107, 60, 0.15) 0%, rgba(53, 90, 50, 0.1) 100%);
       border-radius: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
       margin-bottom: 8px;
     }

     .ls-empty-icon {
       font-size: 2.8rem;
       color: #355a32;
     }

     .ls-empty-title {
       font-size: 1.4rem;
       font-weight: 700;
       color: #1a3a2a;
       margin: 0;
       line-height: 1.3;
     }

     .ls-empty-text {
       font-size: 1rem;
       color: #5f6d60;
       line-height: 1.7;
       max-width: 500px;
       margin: 0;
     }

     .ls-empty-cta {
       display: inline-flex;
       align-items: center;
       gap: 10px;
       margin-top: 10px;
       padding: 16px 32px;
       background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
       color: white;
       text-decoration: none;
       border-radius: 14px;
       font-weight: 600;
       font-size: 1rem;
       transition: all 0.3s ease;
       box-shadow: 0 8px 20px rgba(65, 107, 60, 0.25);
     }

     .ls-empty-cta:hover {
       transform: translateY(-3px);
       box-shadow: 0 12px 28px rgba(65, 107, 60, 0.35);
       color: white;
     }

     @media (max-width: 768px) {
       .ls-empty-content {
         padding: 40px 24px;
       }

       .ls-empty-icon-wrapper {
         width: 80px;
         height: 80px;
       }

       .ls-empty-icon {
         font-size: 2.2rem;
       }

       .ls-empty-title {
         font-size: 1.2rem;
       }

       .ls-empty-text {
         font-size: 0.9rem;
       }

       .ls-empty-cta {
         padding: 14px 24px;
         font-size: 0.9rem;
       }
     }

     @media (max-width: 480px) {
       .ls-empty-content {
         padding: 30px 16px;
       }

       .ls-empty-icon-wrapper {
         width: 70px;
         height: 70px;
       }

       .ls-empty-icon {
         font-size: 1.8rem;
       }

       .ls-empty-title {
         font-size: 1.1rem;
       }

       .ls-empty-text {
         font-size: 0.85rem;
       }

        .ls-empty-cta {
          padding: 12px 20px;
          font-size: 0.85rem;
        }
      }

      /* Pre-Qualify Modal Styles */
      .ls-prequalify-modal {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        animation: ls-prequalify-fade-in 0.3s ease;
      }

      @keyframes ls-prequalify-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .ls-prequalify-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg,#37613247 0%,#2d4a298a 100%);
      }

      .ls-prequalify-content {
        position: relative;
        width: 90%;
        max-width: 1100px;
        height: 85vh;
        max-height: 700px;
        display: flex;
        background: #ffffff;
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
        animation: ls-prequalify-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes ls-prequalify-slide-up {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .ls-prequalify-image-side {
        position: relative;
        flex: 1;
        overflow: hidden;
      }

      .ls-prequalify-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .ls-prequalify-image-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
      }

      .ls-prequalify-logo {
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        padding: 12px 24px;
        border-radius: 50px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .ls-prequalify-logo-img {
        height: 40px;
        width: auto;
        display: block;
      }

      .ls-prequalify-form-side {
        width: 520px;
        flex-shrink: 0;
        background: #ffffff;
        padding: 40px;
        overflow-y: auto;
        position: relative;
      }

      .ls-prequalify-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        background: rgba(26, 58, 42, 0.08);
        border: none;
        border-radius: 50%;
        color: #1a3a2a;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ls-prequalify-close:hover {
        background: rgba(26, 58, 42, 0.15);
        transform: scale(1.1);
      }

      .ls-prequalify-form-container {
        margin-top: 20px;
      }

      .ls-prequalify-title {
        font-size: 1.75rem;
        font-weight: 800;
        color: #1a3a2a;
        margin-bottom: 12px;
        letter-spacing: -0.02em;
      }

      .ls-prequalify-subtitle {
        font-size: 0.95rem;
        color: #5f6d60;
        margin-bottom: 32px;
        line-height: 1.6;
      }

      .ls-prequalify-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .ls-prequalify-form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .ls-prequalify-form-group label {
        font-size: 0.8rem;
        font-weight: 600;
        color: #5f6d60;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .ls-prequalify-input {
        padding: 16px 18px;
        border: 2px solid rgba(26, 58, 42, 0.12);
        border-radius: 12px;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        color: #1a3a2a;
        transition: all 0.3s ease;
        background: #ffffff;
      }

      .ls-prequalify-input:focus {
        outline: none;
        border-color: #355a32;
        box-shadow: 0 0 0 4px rgba(53, 90, 50, 0.1);
      }

      .ls-prequalify-input::placeholder {
        color: #a0b0a8;
      }

      .ls-prequalify-submit {
        margin-top: 12px;
        background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
        color: white;
        border: none;
        padding: 18px 24px;
        border-radius: 14px;
        font-size: 1rem;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .ls-prequalify-submit:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 28px rgba(65, 107, 60, 0.35);
      }

       .ls-prequalify-submit i {
         font-size: 0.9rem;
       }

       .ls-prequalify-summary {
         margin-top: 24px;
         padding: 20px;
         background: #f8faf6;
         border-radius: 14px;
         border: 1px solid rgba(26, 58, 42, 0.1);
       }

       .ls-prequalify-summary-title {
         font-size: 0.9rem;
         font-weight: 700;
         color: #1a3a2a;
         margin-bottom: 14px;
         text-align: center;
       }

       .ls-prequalify-summary-grid {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 12px;
         margin-bottom: 16px;
       }

       .ls-prequalify-summary-item {
         display: flex;
         flex-direction: column;
         gap: 4px;
       }

       .ls-prequalify-summary-label {
         font-size: 0.75rem;
         font-weight: 600;
         color: #5f6d60;
         text-transform: uppercase;
         letter-spacing: 0.5px;
       }

       .ls-prequalify-summary-value {
         font-size: 0.95rem;
         font-weight: 700;
         color: #1a3a2a;
       }

       .ls-prequalify-summary-total {
         padding-top: 14px;
         border-top: 1px solid rgba(26, 58, 42, 0.12);
       }

       .ls-prequalify-summary-total .ls-prequalify-summary-label {
         font-size: 0.85rem;
         font-weight: 700;
       }

       .ls-prequalify-summary-total .ls-prequalify-summary-value {
         font-size: 1.2rem;
         color: #355a32;
       }

       @media (max-width: 900px) {
        .ls-prequalify-content {
          flex-direction: column;
          height: 95vh;
          width: 95%;
          max-height: none;
        }

        .ls-prequalify-image-side {
          flex: 0 0 200px;
          max-height: 40%;
        }

        .ls-prequalify-form-side {
          width: 100%;
          flex: 1;
          padding: 30px 24px;
          overflow-y: auto;
        }

        .ls-prequalify-logo {
          top: 20px;
          padding: 8px 16px;
        }

        .ls-prequalify-logo-img {
          height: 30px;
        }

         .ls-prequalify-title {
           font-size: 1.5rem;
         }

         .ls-prequalify-summary {
           margin-top: 20px;
           padding: 16px;
         }

         .ls-prequalify-summary-title {
           font-size: 0.85rem;
           margin-bottom: 12px;
         }

         .ls-prequalify-summary-grid {
           gap: 10px;
           margin-bottom: 12px;
         }

         .ls-prequalify-summary-value {
           font-size: 0.9rem;
         }

         .ls-prequalify-summary-total .ls-prequalify-summary-value {
           font-size: 1.1rem;
         }
       }

      @media (max-width: 480px) {
        .ls-prequalify-content {
          border-radius: 18px;
          height: 98vh;
          width: 98%;
        }

        .ls-prequalify-image-side {
          flex: 0 0 160px;
        }

        .ls-prequalify-form-side {
          padding: 24px 20px;
        }

        .ls-prequalify-close {
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          font-size: 1rem;
        }

        .ls-prequalify-title {
          font-size: 1.3rem;
          margin-bottom: 8px;
        }

        .ls-prequalify-subtitle {
          font-size: 0.85rem;
          margin-bottom: 24px;
        }

        .ls-prequalify-form-group {
          gap: 6px;
        }

        .ls-prequalify-input {
          padding: 14px 16px;
          font-size: 0.95rem;
        }

         .ls-prequalify-submit {
           padding: 16px 20px;
           font-size: 0.95rem;
         }

         .ls-prequalify-summary {
           margin-top: 20px;
           padding: 14px;
         }

         .ls-prequalify-summary-title {
           font-size: 0.8rem;
           margin-bottom: 10px;
         }

         .ls-prequalify-summary-grid {
           gap: 8px;
           margin-bottom: 10px;
         }

         .ls-prequalify-summary-value {
           font-size: 0.85rem;
         }

         .ls-prequalify-summary-total .ls-prequalify-summary-value {
           font-size: 1rem;
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

/* Action Buttons Section */
.ls-action-buttons-section {
  margin-top: 60px;
  padding: 40px 0;
  background: linear-gradient(135deg, #f8faf6 0%, #ffffff 100%);
  border-radius: 26px;
  border: 1px solid rgba(26, 58, 42, 0.06);
}

.ls-action-buttons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.ls-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px 20px;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: #ffffff;
  color: #1a3a2a;
  box-shadow: 0 4px 16px rgba(26, 58, 42, 0.08);
  min-height: 100px;
}

.ls-action-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(26, 58, 42, 0.15);
}

.ls-action-btn i {
  font-size: 1.5rem;
  color: #355a32;
  margin-bottom: 4px;
}

.ls-action-btn span {
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.3;
}

.ls-call-btn {
  border-color: #355a32;
  background: linear-gradient(135deg, #ffffff 0%, #f8faf6 100%);
}

.ls-call-btn:hover {
  background: linear-gradient(135deg, #355a32 0%, #2d5a45 100%);
  color: white;
}

.ls-call-btn:hover i {
  color: white;
}

.ls-contact-btn {
  border-color: #67a354;
  background: linear-gradient(135deg, #ffffff 0%, #f0f8f0 100%);
}

.ls-contact-btn:hover {
  background: linear-gradient(135deg, #67a354 0%, #5a8f46 100%);
  color: white;
}

.ls-contact-btn:hover i {
  color: white;
}

.ls-inquiry-btn {
  border-color: #4a90e2;
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
}

.ls-inquiry-btn:hover {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
}

.ls-inquiry-btn:hover i {
  color: white;
}

/* Responsive Action Buttons */
@media (max-width: 768px) {
  .ls-action-buttons-section {
    margin-top: 40px;
    padding: 30px 20px;
    border-radius: 18px;
  }

  .ls-action-buttons-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 100%;
  }

  .ls-action-btn {
    flex-direction: row;
    padding: 20px;
    min-height: auto;
    gap: 16px;
  }

  .ls-action-btn span {
    font-size: 1rem;
    text-align: left;
  }

  .ls-action-btn i {
    font-size: 1.3rem;
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .ls-action-buttons-section {
    margin-top: 30px;
    padding: 24px 16px;
  }

  .ls-action-buttons-grid {
    gap: 12px;
  }

  .ls-action-btn {
    padding: 16px;
    gap: 12px;
  }

  .ls-action-btn span {
    font-size: 0.9rem;
  }

  .ls-action-btn i {
    font-size: 1.1rem;
  }
}
</style>