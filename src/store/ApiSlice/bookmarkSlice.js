import { axiosInstance } from "@/api/base";
import { authHeader, getSession } from "@/helpers/authHelper";
import { tokenvalue } from "@/module/categoriesdetails/categoriesinformation";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = getSession()?.access_token;
    return token || null;
  }
  return null;
};
export const getId = () => {
  if (typeof window !== "undefined") {
    const data = getSession();
    const userInfo = data;
    const id = userInfo?.userInfo?._id;
    return id || null;
  }
  return null;
};
export const token = getToken();
export const Id = getId();

const initialState = {
  getBookMarkData: [],
  bookmarkByUser: [],
  BookMarkCount: 0,
  BookMarkLoading: false,
};

export const getBookMark = createAsyncThunk(
  "bookmark",
  async ({ status, limit, page, uid = Id, type, appId, aiToolId }) => {
    try {
      let url = "/bookmark";
      const params = {};

      if (status) {
        params.status = status;
      }

      if (limit) {
        params.limit = limit;
      }

      if (page) {
        params.page = page;
      }

      if (type) {
        params.type = type;
      }

      if (appId) {
        params.appId = appId;
      }
      if (aiToolId) {
        params.aiToolId = aiToolId;
      }
      if (uid) {
        params.uid = uid;
      }
      const response = await axiosInstance.get(url, {
        headers: authHeader(),
        params: params, // Send params to the API call
      });
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
);

export const AddBookMark = createAsyncThunk("bookmark", async (body) => {
  try {
    const response = await axiosInstance.post("bookmark", body, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response?.data;
  } catch (e) {
    return e.response?.data;
  }
});
export const GetBookMarkData = createAsyncThunk("bookmarkData", async (id) => {
  try {
    const response = await axiosInstance.get(`bookmark?uid=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response?.data;
  } catch (e) {
    return e.response?.data;
  }
});

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getBookMark.pending, (state) => {
        state.BookMarkLoading = true;
        state.status = "pending";
      })
      .addCase(getBookMark.fulfilled, (state, action) => {
        state.BookMarkLoading = false;
        state.status = "succeeded";
        state.getBookMarkData = action?.payload?.payload?.bookmarks;
        state.BookMarkCount = action?.payload?.payload?.count;
      })
      .addCase(getBookMark.rejected, (state, action) => {
        state.BookMarkLoading = false;
        state.status = "failed";
      });
  },
});

export default bookmarkSlice.reducer;
