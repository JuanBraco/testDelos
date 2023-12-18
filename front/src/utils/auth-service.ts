import { UserDetails } from "../model/UserDetails";
import axiosInstance from "../utils/axiosInstance";
import { frontURL } from "./baseURL";
import baseURL from "./baseURL";
import axios from "axios";

const fetchHeaders = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": frontURL,
};

async function register(firstname: string, lastname: string, nickname: string, email: string, password: string) {
  try {
    const fullName = firstname + " " + lastname;
    return axiosInstance.post("/user/signup", {
      fullName,
      email,
      nickname,
      password,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customMessage = error.response.data.message;
      throw new Error(customMessage || "An unexpected error occurred.");
    } else {
      throw new Error("The request was made but no response was received");
    }
  }
}

async function login(email: string, password: string) {
  try {
    await axiosInstance.post("/user/signin", {
      email: email,
      password: password,
    });

    const userResponse = await axiosInstance.get("/user/me");
    return userResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Authentication failed. ${error.response.data.error}`);
    } else {
      throw new Error("Authentication failed. Please check your network connection.");
    }
  }
}

async function logout() {
  try {
    const logoutResponse = await axiosInstance.get("/user/logout");

    if (logoutResponse.data.message) {
      throw new Error(logoutResponse.data.message);
    }
  } catch (error) {
    console.error("Error logging out:", error);
    // console.log(gameSocket);
    throw error;
  }
}

async function getUserFromBack(): Promise<UserDetails | null> {
  const response = await axiosInstance.get("/user/me");
  if (response.status === 401) {
    throw new Error("Unauthorized access.");
  }
  return response.data;
}

async function changeSettings(fullName: string, nickname: string, email: string) {
  let updatedUser: UserDetails | null = null;
  await fetch(baseURL + "/user/changeSettings", {
    method: "POST",
    credentials: "include",
    headers: fetchHeaders,
    body: JSON.stringify({
      fullName: fullName,
      nickname: nickname,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        throw new Error(data.message);
      }
      updatedUser = data;
      return updatedUser;
    })
    .catch((error) => {
      throw error;
    });
  return updatedUser;
}

async function updateAvatar(imageUrl: string | undefined) {
  let updatedUser: UserDetails | null = null;
  if (imageUrl) {
    await fetch(baseURL + "/user/updateAvatar", {
      method: "POST",
      credentials: "include",
      headers: fetchHeaders,
      body: JSON.stringify({
        imageUrl: imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        }
        updatedUser = data;
        return updatedUser;
      })
      .catch((error) => {
        throw error;
      });
  }
  return updatedUser;
}

async function checkCurrentPassword(currentPassword: string) {
  await fetch(baseURL + "/user/checkCurrentPassword", {
    method: "POST",
    credentials: "include",
    headers: fetchHeaders,
    body: JSON.stringify({
      currentPassword: currentPassword,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        throw new Error(data.message);
      } else {
        return true;
      }
    })
    .catch((error) => {
      throw error;
    });
  return true;
}

async function updatePassword(newPassword: string) {
  let updatedUser: UserDetails | null = null;

  const response = await axiosInstance.post("/user/updatePassword", { newPassword: newPassword });
  updatedUser = response.data;
  return updatedUser;
}

const AuthService = {
  register,
  login,
  logout,
  getUserFromBack,
  changeSettings,
  updateAvatar,
  checkCurrentPassword,
  updatePassword,
};

export default AuthService;
