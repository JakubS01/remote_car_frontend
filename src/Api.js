import jwt_decode from "jwt-decode";

class Api {
  static AUTH_TOKEN;
  static userID;

  Login(username, password) {
    const formData = new URLSearchParams();
    formData.append("client_id", "springboot-keycloak-client");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("grant_type", "password");

    fetch(
      "http://localhost/auth/realms/SpringBootKeycloak/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      }
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((json) => {
            Api.AUTH_TOKEN = json.access_token;
            let decodedJwt = jwt_decode(json.access_token);
            Api.userID = decodedJwt.sub;
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return true;
  }

  Register(name, email, password) {
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("email", email);

    fetch("http://localhost/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    })
      .then((response) => {
        return response.status === 200 ? true : false;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  GetCars() {
    // fetch("http://localhost/getcars", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + Api.AUTH_TOKEN
    //   }
    // })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       response.json().then((json) => {
    //         return json;
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return null;
    //   });
    // return null;
    return [{ Name: "Maszyna", Fps: "12", Status: "1" }];
  }

  GetCarsAdmin() {
    // fetch("http://localhost/car_admin", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + Api.AUTH_TOKEN
    //   }
    // })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       response.json().then((json) => {
    //         return json;
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return null;
    //   });
    // return null;
    return [{ Ip: "1478", Name: "Maszyna", Fps: "12", Status: "1" }];
  }

  AddCarAdmin(name, url) {
    // fetch("http://localhost/car_admin", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + Api.AUTH_TOKEN
    //   },
    //   body: JSON.stringify({ name: name, url: url })
    // })
    //   .then((response) => {
    //     return response.status === 200 ? true : false;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return false;
    //   });
    return [{ Ip: "1478", Name: "Maszyna", Fps: "12", Status: "1" }];
  }

  ChangeCarAdmin(id, name, url) {
    // fetch(`http://localhost/car_admin/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + Api.AUTH_TOKEN
    //   },
    //   body: JSON.stringify({ name: name, url: url })
    // })
    //   .then((response) => {
    //     return response.status === 200 ? true : false;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return false;
    //   });
    return true;
  }

  DeleteCarAdmin(id) {
    // fetch(`http://localhost/car_admin/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + Api.AUTH_TOKEN
    //   }
    // })
    //   .then((response) => {
    //     return response.status === 200 ? true : false;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return false;
    //   });
    return true;
  }
}

const API = new Api();

export default API;
