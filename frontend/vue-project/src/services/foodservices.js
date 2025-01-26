const search = (params) => {
  return fetch(`http://localhost:3333/foodsSearch?q=` + params)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 400) {
        throw "Bad request";
      } else {
        throw "Seomething went wrong";
      }
    })
    .then((resJson) => {
      return resJson;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const info = (params) => {
  return fetch(`http://localhost:3333/foods/` + params)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 400) {
        throw "Bad request";
      } else {
        throw "Seomething went wrong";
      }
    })
    .then((resJson) => {
      console.log(resJson);
      return resJson;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const foodByFilter = (ingredients, allergens, cuisine, budget, servingSize) => {
  return fetch("http://localhost:3333/foodsbyFilter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
      allergens: allergens,
      cuisine: cuisine,
      budget: budget,
      servings: servingSize,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 500) {
        throw "Internal Server Error";
      }
    })
    .then((resJson) => {
      console.log(" this responese: " + resJson);
      return resJson;
    })

    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const addBmi = (bmi) => {
  return fetch("http://localhost:3333/bmi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
    body: JSON.stringify({
      bmi: bmi,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 500) {
        throw "Internal Server Error";
      }
    })
    .then((resJson) => {
      return resJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const getRecommendations = (bmiCategory) => {
  return fetch(
    `http://localhost:5000/api/recommendations?bmi_category=${bmiCategory}`
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 400) {
        throw "Bad request";
      } else {
        throw "Something went wrong";
      }
    })
    .then((resJson) => {
      return resJson;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export const foodservices = {
  search,
  info,
  foodByFilter,
  addBmi,
  getRecommendations,
};
