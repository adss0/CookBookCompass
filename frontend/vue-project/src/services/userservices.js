const login = (email, password) => {
  return fetch("http://localhost:3333/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
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

const signup = (first_name, last_name, email, password, age, gender) => {
  return fetch("http://localhost:3333/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      age: age,
      gender: gender,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
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

// Logout of a user accoutn
const logout = () => {
  return fetch("http://localhost:3333/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  }).then((response) => {
    // Clear the session token
    localStorage.removeItem("session_token");
    localStorage.removeItem("bmi");
    if (!response.ok) {
      throw new Error("Logout failed");
    }
    // Return
    return;
  });
};

const getBmi = () => {
  return fetch("http://localhost:3333/bmi", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
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

export const userServices = {
  signup,
  login,
  logout,
  getBmi,
};
