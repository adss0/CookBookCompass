import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import AdvanceFilter from "../views/AdvanceFilter.vue";
import MoreInfo from "../views/MoreInfo.vue";
import Recommendation from "../views/Recommendation.vue";
import Login from "../views/Login.vue";
import Signup from "@/views/Signup.vue";
import BMICalculator from "@/views/BMICalculator.vue";
import ChatSystem from "@/views/ChatSystem.vue";

const ifAuthenticated = (to, from, next) => {
  const loggedIn = localStorage.getItem("session_token");
  if (loggedIn) {
    next();
    return;
  }
  next("login");
};

// Define your routes
const routes = [
  { path: "/", component: Home },
  { path: "/search", component: Search },
  { path: "/filter", component: AdvanceFilter },
  { path: "/foods/:foodId", component: MoreInfo },
  {
    path: "/recommendation",
    component: Recommendation,
    beforeEnter: ifAuthenticated,
  },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/bmiCalculator", component: BMICalculator },
  { path: "/chat", component: ChatSystem },

  // Add other routes as needed
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
