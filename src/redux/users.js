import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/api";

export const featchUsers = createAsyncThunk("get/users", async () => {
  const { data } = await instance.get("/users");
  
  return data;
});
export const createUsers = createAsyncThunk("create/users", async (data) => {
  const res = await instance.post("/users", data);
  return res
});

export const UppdateUsers = createAsyncThunk("uppdata/users", async (data) => {
  const res = await instance.put("/users", data);
  return res
});

export const DeleteUsers = createAsyncThunk("delete/users", async (id) => {
  const res = await instance.delete(`/users/${id}`);
  return res
});

const initialState = {
  users: {
    usersData:  {
      items: [],
      status: "loading",
    },
  }
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [UppdateUsers.pending]: (state) => {
      state.users.usersData.status = "loading";
    },
    [UppdateUsers.fulfilled]: (state, action) => {
      const updatedUser = action.payload.data;
      state.users.usersData.items = state.users.usersData.items.map(user =>
        user.id == updatedUser[0].id ? updatedUser[0] : user
      );
      state.users.usersData.status = "loaded";
    },
    [UppdateUsers.rejected]: (state) => {
      state.users.usersData.status = "error";
    },

    [DeleteUsers.pending]: (state) => {
      state.users.usersData.status = "loading";
    },
    [DeleteUsers.fulfilled]: (state, action) => {
      const deletedUserId = action.payload.data;
      state.users.usersData.items = state.users.usersData.items.filter(user => user.id != deletedUserId);
      state.users.usersData.status = "loaded";
    },
    [DeleteUsers.rejected]: (state) => {
      state.users.usersData.status = "error";
    },
    [createUsers.pending]: (state) => {
      state.users.usersData.status = "loading";
    },
    [createUsers.fulfilled]: (state, action) => {
      state.users.usersData.items.push(action.payload.data);
      state.users.usersData.status = "loaded";
    },
    [featchUsers.pending]: (state) => {
      state.users.usersData.items = [];
      state.users.usersData.status = "loading";
    },
    [featchUsers.fulfilled]: (state, action) => {
      state.users.usersData.items = action.payload.sort();
      state.users.usersData.items;
      state.users.usersData.status = "loaded";
    },
    [featchUsers.rejected]: (state) => {
      state.users.usersData.items = [];
      state.users.usersData.status = "error";
    },

  },
});

export const UsersReduser = usersSlice.reducer;
