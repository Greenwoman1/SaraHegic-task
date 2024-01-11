import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useSearchParams } from "react-router-dom/dist/umd/react-router-dom.development";
export const register = async (formData) => {
  await fetch("https://junior-test.mntzdevs.com/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const login = async (data) => {
  try {
    let user_data = {
      username: "",
      id: "",
    };
    const response = await axios.post(
      "https://junior-test.mntzdevs.com/api/login/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("token", response.data.jwt);
    console.log("response jwt", response.data.jwt);
    const res = await decodeToken(localStorage.token);
    user_data = {
        username: res.username,
        id: res.id,
      };
    localStorage.setItem("userData", JSON.stringify({
      username: user_data.username,
      id: user_data.id,
    }));
  } catch (error) {
    console.log(error)
    throw new Error("Login faileddd");
  }
};

export const decodeToken = async (token) => {
  if (token) {
    try {
      const decoded = await jwtDecode(token);

      if (decoded) {
        console.log("decoded toke: ", decoded);
        return decoded;
      } else {
        console.error("Error decoding token");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
};
