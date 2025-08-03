import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HowItWorksView from '../views/HowItWorksView.vue'
import AboutUsView from '../views/AboutUsView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import VerifyIdentityView from '../views/VerifyIdentityView.vue'
import RaceDetailView from '../views/RaceDetailView.vue'
import RequestEntryView from '../views/RequestEntryView.vue'
import RequestSuccessView from '../views/RequestSuccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: HowItWorksView,
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUsView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/verify-identity',
      name: 'verify-identity',
      component: VerifyIdentityView,
    },
    {
      path: '/race/:id',
      name: 'race-detail',
      component: RaceDetailView,
    },
    {
      path: '/request-entry/:raceId/:participantId',
      name: 'request-entry',
      component: RequestEntryView,
    },
    {
      path: '/request-success',
      name: 'request-success',
      component: RequestSuccessView,
    },
  ],
})

export default router
