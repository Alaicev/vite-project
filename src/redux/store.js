import { configureStore } from "@reduxjs/toolkit";
import { NormsReduser } from "./norms";
import { UsersReduser } from "./users";
import { UchetReduser } from "./uchet";
import { BrigadeSlice } from "./brigade";

const store = configureStore({
  reducer: {
    norms: NormsReduser,
    users: UsersReduser,
    uchet: UchetReduser,
    brigade: BrigadeSlice
  },
});
export default store;
