<template>
    <div>
      <!-- Image Section -->
      <div class="flex justify-center items-center ">
        <img src="../images/bmi.jpeg"  alt="Centered Image" width="20%" height="20%" />
        </div>
  
      <!-- Description Section -->
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">BMI Calculator</h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Features of the website</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to both adult men and women. While BMI is not a perfect measure of body fat, it is an important tool for assessing health risk in individuals.
            </p>
          </div>
          <div class="flex flex-wrap">
            <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">BMI Calculation</h2>
              <p class="leading-relaxed text-base mb-4">
                It's a good way to gauge whether your weight is in healthy proportion to your height. In fact, knowing your BMI can help you – and your GP – determine any health risks you may face if it's outside of the healthy range. Being overweight can lead to a range of chronic conditions including: Type 2 Diabetes.
              </p>
              <a href="calculator.html" class="text-indigo-500 inline-flex items-center">
                BMI Calculator
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">BMI Ranges</h2>
              <p class="leading-relaxed text-base mb-4">
                Below 18.5 – you're in the underweight range. Between 18.5 and 24.9 – you're in the healthy weight range. Between 25 and 29.9 – you're in the overweight range. 30 or over – you're in the obese range.
              </p>
              <a class="text-indigo-500 inline-flex items-center">
                Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Health Recommendations</h2>
              <p class="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
              <a class="text-indigo-500 inline-flex items-center">
                Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
  
      <!-- BMI Calculator Section -->
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-12 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">BMI Calculator</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Calculate your Body Mass Index (BMI) using the form below.</p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <form @submit.prevent="calculateBMI" class="flex flex-wrap -m-2">
              <!-- Age Input -->
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="age" class="leading-7 text-sm text-gray-600">Age</label>
                  <input
                    type="number"
                    id="age"
                    v-model="age"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter your age"
                    required
                  />
                </div>
              </div>
  
              <!-- Gender Input -->
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="gender" class="leading-7 text-sm text-gray-600">Gender</label>
                  <select
                    id="gender"
                    v-model="gender"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
  
              <!-- Height Input -->
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="height" class="leading-7 text-sm text-gray-600">Height (cm)</label>
                  <input
                    type="number"
                    id="height"
                    v-model="height"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter your height in centimeters"
                    required
                  />
                </div>
              </div>
  
              <!-- Weight Input -->
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="weight" class="leading-7 text-sm text-gray-600">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    v-model="weight"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter your weight in kilograms"
                    required
                  />
                </div>
              </div>
  
              <!-- Calculate Button -->
              <div class="p-2 w-full">
                <button
                  type="submit"
                  class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Calculate BMI
                </button>
              </div>
            </form>
  
            <!-- Result Display -->
            <div v-if="bmi !== null" class="p-2 w-full text-center">
              <h2 class="text-xl font-medium title-font mb-4 text-gray-900">Your BMI: {{ bmi.toFixed(2) }}</h2>
              <p class="text-lg text-gray-700">{{ bmiInterpretation }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { foodservices } from '../services/foodservices.js';
  export default {
    data() {
      return {
        age: null, // Age of the user
        gender: "male", // Gender of the user (default: male)
        height: null, // Height in centimeters
        weight: null, // Weight in kilograms
        bmi: null, // Calculated BMI value
      };
    },
    computed: {
      bmiInterpretation() {
        if (this.bmi === null) return "";
        if (this.gender === "male") {
          return this.interpretMaleBMI(this.bmi);
        } else if (this.gender === "female") {
          return this.interpretFemaleBMI(this.bmi);
        }
        return "";
      },
    },
    methods: {
      calculateBMI() {
        if (!this.height || !this.weight) {
          alert("Please enter both height and weight.");
          return;
        }
  
        // Convert height from cm to meters
        const heightInMeters = this.height / 100;
  
        // Calculate BMI: BMI = weight (kg) / (height (m) * height (m))
        this.bmi = this.weight / (heightInMeters * heightInMeters);

        foodservices.addBmi(this.bmi)
        .then(response => {
          localStorage.setItem('bmi', this.bmi)
          console.log(response.data);
        })
      },
      interpretMaleBMI(bmi) {
        if (bmi < 18.5) return "Underweight (Male)";
        if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight (Male)";
        if (bmi >= 25 && bmi <= 29.9) return "Overweight (Male)";
        return "Obesity (Male)";
      },
      interpretFemaleBMI(bmi) {
        if (bmi < 18.5) return "Underweight (Female)";
        if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight (Female)";
        if (bmi >= 25 && bmi <= 29.9) return "Overweight (Female)";
        return "Obesity (Female)";
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here if needed */
  </style>