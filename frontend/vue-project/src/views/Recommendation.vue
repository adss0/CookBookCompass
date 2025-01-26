<template>
  <div class="recipe-recommendations">
    <div v-if="!bmi">
      <p>No BMI data found. Please calculate your BMI first.</p>
      <router-link to="/bmiCalculator">Calculate BMI</router-link>
    </div>
    <div v-else>
      <h1>Here are your recipe recommendations based on your BMI:</h1>
      <div v-if="loading">Loading recommendations...</div>
      <div v-else>
        <div v-if="recipes.length > 0">
          <div v-for="recipe in recipes" :key="recipe.title" class="recipe-card">
            <h2>{{ recipe.title }}</h2>
            <p>Calories: {{ recipe.calories }} kcal</p>
          </div>
        </div>
        <div v-else>
          <p>No recipes found. Please try again later.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { foodservices } from '@/services/foodservices'; // Import the service

export default {
  data() {
    return {
      bmi: null, // Initialize BMI as null
      recipes: [], // Stores the recipe recommendations
      loading: true, // Tracks whether data is being fetched
    };
  },
  created() {
    // Check if BMI is present in localStorage
    this.checkBmi();
  },
  methods: {
    // Function to check if BMI is present in localStorage
    checkBmi() {
      const bmi = parseFloat(localStorage.getItem('bmi'));

      // If BMI is not present or invalid, redirect to Calculate BMI page
      if (!bmi || isNaN(bmi)) {
        this.$router.push({ path: '/bmiCalculator' });
      } else {
        this.bmi = bmi; // Set BMI in the component's data
        this.fetchRecommendations(); // Fetch recommendations
      }
    },

    // Function to categorize BMI
    categorizeBmi(bmi) {
      if (bmi < 18.5) {
        return 'underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
        return 'healthy';
      } else {
        return 'overweight';
      }
    },

    // Function to fetch recommendations
    async fetchRecommendations() {
      try {
        // Categorize BMI
        const bmiCategory = this.categorizeBmi(this.bmi);

        // Fetch recommendations based on BMI category
        const data = await foodservices.getRecommendations(bmiCategory);
        this.recipes = data; // Store the fetched recipes
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        this.loading = false; // Stop loading state
      }
    },
  },
};
</script>

<style scoped>
.recipe-recommendations {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.recipe-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.recipe-card h2 {
  font-size: 20px;
  margin: 0 0 10px 0;
}

.recipe-card p {
  font-size: 16px;
  color: #555;
  margin: 0;
}
</style>