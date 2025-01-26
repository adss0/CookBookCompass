## Cookbook Compass

A BMI-based recipe recommendation system designed to help you make healthier food choices tailored to your unique health profile. Our purpose is to simplify healthy eating by providing personalized meal suggestions based on your BMI, making it easier to maintain a balanced diet, boost energy levels, and reduce the risk of chronic diseases. Whether you're looking to gain, maintain, or lose weight, our platform empowers you to take control of your health and wellbeing.

---

### Key Features

- BMI Calculator: Calculate your BMI based on height and weight.

- Personalized Recommendations: Get recipe suggestions tailored to your BMI category (underweight, healthy, overweight).

- Recipe Filters: Filter recipes by dietary preferences (e.g., vegetarian, gluten-free).

- WebSocket Integration: Real-time communication for interactive features.

- TCP Server: Allows external clients to interact with the system.

---

### Setup Instructions

#### Prerequisites

Node.js (v14 or higher)

npm (Node Package Manager)

#### Steps to Run the Project

1. Clone the repository
   `git clone https://github.com/UmairM13/CookbookCompass.git`
   `cd CookbookCompass`

2. Install Dependencies:

   - backend:
     `cd backend`
     `npm install`
   - frontend:
     `cd frontend`
     `cd vue-project`
     `npm install`

3. Start the Server:

   - backend server:
     `cd backend`
     `npm run dev`
   - flask server:
     `cd backend/recommendation`
     `python ./app.py`
   - frontend
     `cd frontend/vue-project`
     `npm run dev`

4. Access the Application:

- The backend server runs on:
  `http://localhost:3333/`

- flask:
  `http://localhost:127.0.0.1:5000/`

- frontend:
  `http://localhost:5173/`

- For WebSocket connections, use `ws://localhost:3333`

---

## Endpoints

See Postman collection [here](/CookbookCompass.postman_collection.json)

---

## Usage

1. Calculate BMI

- Use the BMI calculator to input your height and weight.

- The system will categorize you as underweight, healthy, or overweight.

2. Get Recipe Recommendations

- Based on your BMI category, the system will recommend recipes:

- Underweight: High-calorie, nutrient-dense meals.

- Healthy: Balanced meals to maintain weight.

- Overweight: Low-calorie, high-fiber meals.

3. Filter Recipes

- Use the filters to find recipes that match your dietary preferences (e.g., vegetarian, gluten-free).

4. Real-Time Interaction

- Connect to the WebSocket or TCP server to send and receive real-time messages.

---

## Contribution

- Adeel Chaudhry
- Prateek Sahoo
- Umair Mangera

---

## License

This project is licensed under the MIT License.

---
