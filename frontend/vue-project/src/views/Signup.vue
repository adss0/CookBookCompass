<template>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 class="title-font font-medium text-3xl text-gray-900">Create Your Account</h1>
          <p class="leading-relaxed mt-4">Join our community and start your journey with us. Fill in the details below to create your account.</p>
        </div>
        <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <form @submit.prevent="handleSubmit">
            <!-- First Name and Last Name Fields -->
            <div class="flex gap-4 mb-4">
              <div class="relative flex-1">
                <label for="first_name" class="leading-7 text-sm text-gray-600">First Name</label>
                <input
                  id="first_name"
                  v-model="first_name"
                  type="text"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div class="relative flex-1">
                <label for="last_name" class="leading-7 text-sm text-gray-600">Last Name</label>
                <input
                  id="last_name"
                  v-model="last_name"
                  type="text"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
  
            <!-- Gender and Age Fields -->
            <div class="flex gap-4 mb-4">
              <div class="relative flex-1">
                <label for="gender" class="leading-7 text-sm text-gray-600">Gender</label>
                <select
                  id="gender"
                  v-model="gender"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                >
                  <option value="" disabled selected>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="relative flex-1">
                <label for="age" class="leading-7 text-sm text-gray-600">Age</label>
                <input
                  id="age"
                  v-model="age"
                  type="number"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
  
            <!-- Email Field -->
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
  
            <!-- Confirm Email Field -->
            <div class="relative mb-4">
              <label for="confirm_email" class="leading-7 text-sm text-gray-600">Confirm Email</label>
              <input
                id="confirm_email"
                v-model="confirm_email"
                type="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
  
            <!-- Password Field -->
            <div class="relative mb-4">
              <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
              <input
                type="text"
                v-model="password"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
  
            <!-- Password Requirements -->
            <ul class="text-xs text-gray-500 mb-4 pl-4 list-disc">
              <li>At Least One Uppercase and Lowercase Letter</li>
              <li>At Least One Digit</li>
              <li>At Least One Special Character</li>
              <li>Length Between 8 and 30 Characters</li>
            </ul>
  
            <!-- Confirm Password Field -->
            <div class="relative mb-4">
              <label for="confirm_password" class="leading-7 text-sm text-gray-600">Confirm Password</label>
              <input
                type="text"
                v-model="confirm_password"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
  
            <!-- Submit Button -->
            <button
              type="submit"
              class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full"
            >
              Signup
            </button>
  
            <!-- Error Message -->
            <div v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script>
import { userServices } from '@/services/userservices';

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      gender: "",
      age: "",
      email: "",
      confirm_email: "",
      password: "",
      confirm_password: "",
      error: "",
      submitted: false, // Added submitted property
    };
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;

      // Validation checks for the signup form
      const { email, confirm_email, password, confirm_password, first_name, last_name, gender, age } = this;

      const namePattern = /^[A-Za-z]+$/;

      if (!namePattern.test(first_name) || !namePattern.test(last_name)) {
        this.error = "Please enter a valid name";
        return;
      }

      // Validate Gender
      if (!gender) {
        this.error = "Please select a gender.";
        return;
      }

      // Validate Age
      if (!age || isNaN(age) || age < 1 || age > 120) {
        this.error = "Please enter a valid age (between 1 and 120).";
        return;
      }

      if (!(email && confirm_email && password && confirm_password)) {
        this.error = "Please fill in all the fields";
        return;
      }

      // Use this.emailValidator to call the method
      if (!this.emailValidator(email)) {
        this.error = "Invalid email!";
        return;
      }

      if (email !== confirm_email) {
        this.error = "Emails do not match!";
        return;
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^\w]).{8,30}$/;
      if (!passwordPattern.test(password)) {
        this.error = "Password not strong enough.";
        return;
      }

      if (password !== confirm_password) {
        this.error = "Passwords do not match!";
        return;
      }

      this.error = ""; // Clear any previous error

      try {
        // Call the signup method from userServices
        const response = await userServices.signup(this.first_name, this.last_name, this.email, this.password, this.age, this.gender);

        // Handle successful signup
        if (response) {
          alert("Signup Form submitted successfully!");
          this.$router.push({ path: "/login" });
        }
      } catch (err) {
        // Handle signup error
        this.error = err.message || "Signup failed. Please try again.";
        console.error("Signup error:", err);
      }
    },
    emailValidator(email) {
      // Simple email validation regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
  },
};
</script>

