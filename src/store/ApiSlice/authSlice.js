import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { setSession } from "../../helpers/authHelper";
import { authHeader } from "../../helpers/authHelper";
import { token } from "./bookmarkSlice";
const initialState = {
  user: {},
  isLoggedIn: false,
  errorSignIn: false,
  status: "idle",
  error: null,
  loginguser: {},
  tokendata: "",
  loginUser: false
};

export const getProfile = createAsyncThunk("user/get-profile", async () => {
  try {
    const response = await axiosInstance.get(`user/get-profile`, {
      headers: authHeader()
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});

export const logIn = createAsyncThunk("user/login", async (body) => {
  try {
    const response = await axiosInstance.post(`user/login`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const AddContactUs = createAsyncThunk(
  "contactUs/create",
  async (body) => {
    try {
      const response = await fetch(
        "https://cms.findmyaitool.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
            mutation Mutation($data: ContactusInput!) {
              createContactus(data: $data) {
                data {
                  id
                  attributes {
                    name
                    email
                    message
                    createdAt
                    updatedAt
                    publishedAt
                  }
                }
              }
            }
          `,
            variables: {
              data: body
            }
          })
        }
      );

      const responseData = await response.json();
      if (responseData.errors) {
        throw new Error(responseData.errors[0].message);
      }
      return responseData.data;
    } catch (error) {
      console.error("Error adding contact:", error);
      throw error;
    }
  }
);

export const setSessionData = (token, userInfo) => {
  const sessionData = {
    access_token: token,
    userInfo: userInfo
  };
  setSession(sessionData);
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    setUpdatedUser(state, action) {
      state.user = action.payload;
    },

    setAutoLogin(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.status = "succeeded";
      state.error = null;
    },
    setLogin(state, action) {
      state.loginUser = action.payload;
    },
    setToken(state, action) {
      state.tokendata = action.payload;
    }
  },
  extraReducers(builder) {
    builder

      .addCase(logIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const token = action?.payload.payload?.token;
        let userInfo = action?.payload.payload.admin;
        if (token) {
          state.isLoggedIn = true;
          state.loginguser = userInfo;
          state.status = "succeeded";
          setSessionData(token, userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("UserToken", token);
          state.tokendata = token;
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getProfile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offer = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
      });
  }
});

export const { setLogin, resetAuth, setUpdatedUser, setAutoLogin, setToken } =
  authSlice.actions;
export default authSlice.reducer;
