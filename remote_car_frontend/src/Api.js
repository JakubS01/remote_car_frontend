import jwt_decode from 'jwt-decode'

const tokenName = "RENTCAR_TOKEN";

class Api {
  static Url = "http://localhost:8081"
  static Auth_Url = "http://localhost/auth/realms/SpringBootKeycloak/protocol/openid-connect/token"

  IsLoggedIn() {
    return localStorage.getItem(tokenName) !== null;
  }

  IsAdmin() {
    const decodedJwt = jwt_decode(localStorage.getItem(tokenName));
    return decodedJwt["resource_access"]["springboot-keycloak-client"]["roles"].includes("admin");
  }

  async Login(username, password) {
    const formData = new URLSearchParams();
    formData.append("client_id", "springboot-keycloak-client");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("grant_type", "password");

    try {
      const response = await fetch(Api.Auth_Url,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData
        }
      )
      if (response.status === 200) {
        const json = await response.json();
        localStorage.setItem(tokenName, json.access_token);
        return true;
      }
      else {
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  Logout(navigate) {
    localStorage.removeItem(tokenName);
    navigate("/login", { replace: true });
  }

  async Register(name, email, password) {
    try {
      const response = await fetch(Api.Url + "/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "password": password,
          "email": email
        })
      })
      if (response.status === 200) {
        return true;
      }
      else {
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async GetCars() {
    try {
      const response = await fetch(Api.Url + "/car", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Authorization": "Bearer " + localStorage.getItem(tokenName)
        }
      });
      if (response.status === 200) {
        return await response.json();
      }
      else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async GetCarsAdmin() {
    try {
      const response = await fetch(Api.Url + "/car_admin", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        }
      });
      if (response.status === 200) {
        return await response.json();
      }
      else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async GetCarAdmin(id) {
    try {
      const response = await fetch(Api.Url + `/car_admin/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        }
      });
      if (response.status === 200) {
        return await response.json();
      }
      else {
        console.log(response);
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async AddCarAdmin(name, url) {
    try {
      const response = await fetch(Api.Url + "/car_admin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        },
        body: JSON.stringify({
          "name": name,
          "url": url
        })
      });
      if (response.status === 200) {
        return true;
      }
      else {
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async ChangeCarAdmin(id, name, url) {
    try {
      const response = await fetch(Api.Url + `/car_admin/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        },
        body: JSON.stringify({
          "name": name,
          "url": url
        })
      });
      if (response.status === 200) {
        return true;
      }
      else {
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async DeleteCarAdmin(id) {
    try {
      const response = await fetch(Api.Url + `/car_admin/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        }
      });
      if (response.status === 200) {
        return true;
      }
      else {
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const API = new Api();

export default API;
