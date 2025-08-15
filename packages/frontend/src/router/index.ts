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
import CheckEmailView from '../views/CheckEmailView.vue'
import EmailVerifiedView from '../views/EmailVerifiedView.vue'
import UserPageView from '../views/UserPageView.vue'

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
    {
      path: '/check-email',
      name: 'check-email',
      component: CheckEmailView,
    },
    {
      path: '/verify/:token',
      name: 'verify-email',
      component: EmailVerifiedView,
    },
    {
      path: '/user',
      name: 'user-page',
      component: UserPageView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem('authToken')) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
