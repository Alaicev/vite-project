import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/api";

export const GetUchet = createAsyncThunk("get/uchet", async (id) => {
  const res = await instance.get(`/uchet/${id}`);
  console.log("ret");
  return res;
});
export const PostUchet = createAsyncThunk("post/uchet", async (data) => {
  const res = await instance.post("/uchet", data);
  return res;
});
export const DeleteUchet = createAsyncThunk("delete/users", async (id) => {
  const res = await instance.delete(`/uchet/${id}`);
  return res;
});

export const GetUchetUsers = createAsyncThunk(
  "post/uchetuser",
  async (data) => {
    const dataRes = {
      name: data,
    };
    const dataUser = await instance.post(`/uchetuser`, dataRes);
    return dataUser;
  }
);

const initialState = {
  uchet: {
    uchetData: {
      items: [],
      status: "loading",
    },
  },
  uchetUser: {
    uchetUchetUser: {
      items: [],
      status: "loading",
    },
  },
};

const uchetSlice = createSlice({
  name: "uchet",
  initialState,
  reducers: {},
  extraReducers: {
    [DeleteUchet.pending]: (state) => {
      state.uchet.uchetData.status = "loading";
    },
    [DeleteUchet.fulfilled]: (state, action) => {
      const deletedUchetId = action.payload.data;
      state.uchet.uchetData.items = state.uchet.uchetData.items.filter(
        (user) => user.id != deletedUchetId
      );
      state.uchet.uchetData.status = "loaded";
    },
    [DeleteUchet.rejected]: (state) => {
      state.uchet.uchetData.status = "error";
    },
    [PostUchet.pending]: (state) => {
      state.uchet.uchetData.status = "loading";
    },
    [PostUchet.fulfilled]: (state, action) => {
      state.uchet.uchetData.items.push(action.payload.data);
      state.uchet.uchetData.status = "loaded";
    },
    [GetUchet.pending]: (state) => {
      state.uchet.uchetData.items = [];
      state.uchet.uchetData.status = "loading";
    },
    [GetUchet.fulfilled]: (state, action) => {
      state.uchet.uchetData.items = action.payload.data;
      state.uchet.uchetData.status = "loaded";
    },
    [GetUchet.rejected]: (state) => {
      state.uchet.uchetData.items = [];
      state.uchet.uchetData.status = "error";
    },
    [GetUchetUsers.pending]: (state) => {
      state.uchetUser.uchetUchetUser.items = [];
      state.uchetUser.uchetUchetUser.status = "loading";
    },
    [GetUchetUsers.fulfilled]: (state, action) => {
      state.uchetUser.uchetUchetUser.items = action.payload.data;
      state.uchetUser.uchetUchetUser.status = "loaded";
    },
    [GetUchetUsers.rejected]: (state) => {
      state.uchetUser.uchetUchetUser = [];
      state.uchetUser.uchetUchetUser.status = "error";
    },
  },
});

export const UchetReduser = uchetSlice.reducer;
