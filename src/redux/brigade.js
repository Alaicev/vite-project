import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/api";

export const GetAllBrigade = createAsyncThunk("get/Abrigade", async () => {
  const  res  = await instance.get("/brigade");
  return res;
});

export const CreateBrigade = createAsyncThunk("create/brigade", async (data) => {
  const res = await instance.post("/brigade" , data)
  return res
})

export const DeleteBrigade = createAsyncThunk("delete/brigade", async (id) => {
  const res = await instance.delete(`/brigade/${id}`)
  return res
})

export const UpdateBrigade = createAsyncThunk("put/brigade", async (data) => {
  const res = await instance.put("/brigade" , data)
  return res
})



const initialState = {
 
  brigade: {
    brigadeData: {
      items: [],
      status: "loading",
    },
  }
};

const brigadeSlice = createSlice({
  name: "brigade",
  initialState,
  reducers: {},
  extraReducers: {
    [GetAllBrigade.pending]: (state) => {
      state.brigade.brigadeData.items = [];
      state.brigade.brigadeData.status = "loading";
    },
    [GetAllBrigade.fulfilled]: (state, action) => {
      state.brigade.brigadeData.items = action.payload.data;
      state.brigade.brigadeData.status = "loaded";
    },
    [GetAllBrigade.rejected]: (state) => {
      state.brigade.brigadeData.items = [];
      state.brigade.brigadeData.status = "error";
    },
    [CreateBrigade.pending]: (state) => {
      state.brigade.brigadeData.items = state.brigade.brigadeData.items;
      state.brigade.brigadeData.status = "loading";
    },
    [CreateBrigade.fulfilled]: (state, action) => {
      state.brigade.brigadeData.items.push(action.payload.data)
      state.brigade.brigadeData.status = "loaded";
    },
    [CreateBrigade.rejected]: (state) => {
      state.brigade.brigadeData.items = [];
      state.brigade.brigadeData.status = "error";
    },
    [UpdateBrigade.pending]: (state) => {
      state.brigade.brigadeData.items = state.brigade.brigadeData.items;
      state.brigade.brigadeData.status = "loading";
    },
    [UpdateBrigade.fulfilled]: (state, action) => {
      const deletebrigade = action.payload.data;
      state.brigade.brigadeData.items = state.brigade.brigadeData.items.filter(
        (br) => br.id != deletebrigade.id
      );
      state.brigade.brigadeData.items.push(deletebrigade)
      state.brigade.brigadeData.status = "loaded";
    },
    [UpdateBrigade.rejected]: (state) => {
      state.brigade.brigadeData.items = [];
      state.brigade.brigadeData.status = "error";
    },
  },
});

export const BrigadeSlice = brigadeSlice.reducer;
