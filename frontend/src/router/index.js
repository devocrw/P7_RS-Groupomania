import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth.vue'
import Accueil from '../components/Accueil.vue'
import Profil from '../components/Profil.vue'
import Forum from '../components/Forum.vue'
import Post from '../components/FormPost.vue'
import Moderation from '../components/Moderation.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/Accueil',
    name: 'Accueil',
    component: Accueil,
    meta: {
      isPublic: false
    }
  },
  {
    path: '/Accueil/Profil',
    name: 'Profil',
    component: Profil,
    meta: {
      isPublic: false
    }
  },
  {
    path: '/Accueil/Forum',
    name: 'Forum',
    component: Forum,
    meta: {
      isPublic: false
    }
  },
  {
    path: '/Accueil/Forum/Post',
    name: 'Post',
    component: Post,
    meta: {
      isPublic: false
    }
  },
  {
    path: '/Accueil/Moderation',
    name: 'Moderation',
    component: Moderation,
    meta: {
      isPublic: false
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeResolve(async (to, from, next) => {
  if ((localStorage.token === "" || localStorage.token === undefined) && to.path != '/') {
    next("/")
  } else {
    next();
  }
});

export default router