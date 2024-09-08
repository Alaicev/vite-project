import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/api";

export const featchNorms = createAsyncThunk("get/norms", async () => {
  const { data } = await instance.get("/norm");
  return data;
});
export const CreatehNorms = createAsyncThunk("post/norm", async (data) => {
  const res = await instance.post("/norm", data);
  return res;
});
export const DeleteNorms = createAsyncThunk("delete/norm", async (id) => {
  const res = await instance.delete(`/norm/${id}`);
  return res;
});
export const UpdateNorms = createAsyncThunk("put/norm", async (data) => {
  const res = await instance.put(`/norm`, data);
  return res;
});
export const featchNormsItem = createAsyncThunk("get/normitall", async () => {
  const { data } = await instance.get("/normitall");
  return data;
});

export const CreatehNormsItems = createAsyncThunk("post/normit", async (data) => {
  const res = await instance.post("/normit", data);
  return res;
});

export const DeleteNormsItems = createAsyncThunk("delete/normit", async (id) => {
  const res = await instance.delete(`/normit/${id}`);
  return res;
});


const initialState = {
  norms: {
    nameNorms: {
      items: [],
      status: "loading",
    },
    normsitem: {
      items: [],
      status: "loading",
    },
  },
};

const normsSlice = createSlice({
  name: "norms",
  initialState,
  reducers: {},
  extraReducers: {
    [featchNorms.pending]: (state) => {
      state.norms.nameNorms.items = [];
      state.norms.nameNorms.status = "loading";
    },
    [featchNorms.fulfilled]: (state, action) => {
      state.norms.nameNorms.items = action.payload;
      state.norms.nameNorms.status = "loaded";
    },
    [featchNorms.rejected]: (state) => {
      state.norms.nameNorms.items = [];
      state.norms.nameNorms.status = "error";
    },
    [DeleteNorms.pending]: (state) => {
      state.norms.nameNorms.status = "loading";
    },
    [DeleteNorms.fulfilled]: (state, action) => {
      const deletedNormId = action.payload.data.id;
      state.norms.nameNorms.items = state.norms.nameNorms.items.filter(
        (n) => n.id != deletedNormId
      );
      state.norms.nameNorms.status = "loaded";
    },
    [DeleteNorms.rejected]: (state) => {
      state.norms.nameNorms.items = [];
      state.norms.nameNorms.status = "error";
    },
    [UpdateNorms.pending]: (state) => {
      state.norms.nameNorms.status = "loading";
    },
    [UpdateNorms.fulfilled]: (state, action) => {
      const updatedUser = action.payload.data;
      state.norms.nameNorms.items = state.norms.nameNorms.items.map((n) =>
        n.id == updatedUser.id ? updatedUser : n
      );
      state.norms.nameNorms.status = "loaded";
    },
    [UpdateNorms.rejected]: (state) => {
      state.norms.nameNorms.items = [];
      state.norms.nameNorms.status = "error";
    },
    [CreatehNorms.fulfilled]: (state, action) => {
      state.norms.nameNorms.items.push(action.payload.data);
      state.norms.nameNorms.status = "loaded";
    },
    [CreatehNorms.rejected]: (state) => {
      state.norms.nameNorms.items = [];
      state.norms.nameNorms.status = "error";
    },



    [featchNormsItem.pending]: (state) => {
      state.norms.normsitem.items = [];
      state.norms.normsitem.status = "loading";
    },
    [featchNormsItem.fulfilled]: (state, action) => {
      state.norms.normsitem.items = action.payload;
      state.norms.normsitem.status = "loaded";
    },
    [featchNormsItem.rejected]: (state) => {
      state.norms.normsitem.items = [];
      state.norms.normsitem.status = "error";
    },

    [CreatehNormsItems.pending]: (state) => {
      state.norms.normsitem.status = "loading";
    },

    [CreatehNormsItems.fulfilled]: (state, action) => {
      state.norms.normsitem.items.push(action.payload.data);
      state.norms.normsitem.status  = "loaded";
    },
    [CreatehNormsItems.rejected]: (state) => {
      state.norms.normsitem.items = [];
      state.norms.normsitem.status  = "error";
    },

    [DeleteNormsItems.pending]: (state) => {
      state.norms.normsitem.status = "loading";
    },

    [DeleteNormsItems.fulfilled]: (state, action) => {
      const updatedUser = action.payload.data.id;
      debugger
      state.norms.normsitem.items = state.norms.normsitem.items.filter(
        (n) => n.id != updatedUser
      );
      state.norms.normsitem.items = "loaded";
    },
    [DeleteNormsItems.rejected]: (state) => {
      state.norms.normsitem.items = [];
      state.norms.normsitem.status = "error";
    },
  },
});

export const NormsReduser = normsSlice.reducer;
