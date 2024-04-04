// create slice
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogged: localStorage.getItem("isLogged") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
//  const {}= authSlice.actions;
export default authSlice.reducer;
