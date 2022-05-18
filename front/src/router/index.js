import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'
import Wall from '../views/Wall/Wall.vue'
import Profil from '../views/Profil/Profil.vue'
import Signup from '../views/Signup/Signup.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/wall',
    name: 'Wall',
    component: Wall
  },
  {
    path: '/profil/:id',
    name: 'Profil',
    component: Profil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if(
      localStorage.getItem('headers') == null &&
      (to.path != '/' && to.path != '/signup')
    ){
      window.location.href = "/"
  } 
  if(
    localStorage.getItem('headers') != null &&
    (to.path == '/' || to.path == '/signup')
  ) {
    window.location.href = "/wall"
  }

})

export default router
