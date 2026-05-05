import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('../pages/HomePage.vue')
const ForsalePage = () => import('../pages/ForsalePage.vue')
const DayCharterPage = () => import('../pages/DayCharterPage.vue')
const TermCharterPage = () => import('../pages/TermCharterPage.vue')
const DockagePage = () => import('../pages/DockagePage.vue')
const BlogPage = () => import('../pages/BlogPage.vue')
const BlogDetailPage = () => import('../pages/BlogDetailPage.vue')
const AboutUsPage = () => import('../pages/AboutUsPage.vue')
const OurTeamPage = () => import('../pages/OurTeamPage.vue')
const EventsPage = () => import('../pages/EventsPage.vue')
const ContactUsPage = () => import('../pages/ContactUsPage.vue')
const BrokerDetailPage = () => import('../pages/BrokerDetailPage.vue')
const EventDetailPage = () => import('../pages/EventDetailPage.vue')
const ListingDetailPage = () => import('../pages/LIstingDetailPage.vue')
const DestinationListingsPage = () => import('../pages/DestinationListingsPage.vue')
const DayCharterBookingPage = () => import('../pages/DayCharterBookingPage.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'High Seas Yachting - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/forsale',
    name: 'Forsale',
    component: ForsalePage,
    meta: { title: 'For Sale - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/day-charter',
    name: 'DayCharter',
    component: DayCharterPage,
    meta: { title: 'Day Charter - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/term-charter',
    name: 'TermCharter',
    component: TermCharterPage,
    meta: { title: 'Term Charter - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/dockage',
    name: 'Dockage',
    component: DockagePage,
    meta: { title: 'Dockage - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
    meta: { title: 'Blog - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetailPage,
    meta: { title: 'Blog Detail - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUsPage,
    meta: { title: 'About Us - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/our-team',
    name: 'OurTeam',
    component: OurTeamPage,
    meta: { title: 'Our Team - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/events',
    name: 'Events',
    component: EventsPage,
    meta: { title: 'Events - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUsPage,
    meta: { title: 'Contact Us - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/broker/:id',
    name: 'BrokerDetail',
    component: BrokerDetailPage,
    meta: { title: 'Broker Detail - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetailPage,
    meta: { title: 'Event Detail - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/listing-detail/:slug',
    name: 'ListingDetail',
    component: ListingDetailPage,
    meta: { title: 'Listing Detail - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/destination-listings/:id',
    name: 'DestinationListings',
    component: DestinationListingsPage,
    meta: { title: 'Destination Listings - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  },
  {
    path: '/daycharter-booking/:slug',
    name: 'DayCharterBooking',
    component: DayCharterBookingPage,
    meta: { title: 'Day Charter Booking - Luxury Yacht Brokers Fort Lauderdale & Miami' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'High Seas Yachting'
  next()
})

export default router