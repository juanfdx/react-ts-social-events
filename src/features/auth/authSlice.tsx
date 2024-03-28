import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/types/user";


type State = {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const initialState: State = {
  isAuthenticated: false,
  currentUser: null
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {      
      const user = action.payload;
      state.isAuthenticated = true;
      state.currentUser = {...user};
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  }
})



export const { signIn, signOut } = authSlice.actions;

export const authReducer = authSlice.reducer;