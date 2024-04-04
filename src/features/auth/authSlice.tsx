import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppUser } from "../../app/types/user";
//comes from firebase User interface
import { User } from "firebase/auth";


type State = {
  isAuthenticated: boolean;
  currentUser: AppUser | null;
}

const initialState: State = {
  isAuthenticated: false,
  currentUser: null
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //first we have to prepare (serialize) the user:User object that comes from firebase
    signIn: {
      reducer: (state, action: PayloadAction<AppUser>) => {      
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      },
      prepare: (user: User) => {
        const mappedUser: AppUser = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          providerId: user.providerData[0].providerId,
        } ;
        return {payload: mappedUser};
      }
    } ,
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  }
})



export const { signIn, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;