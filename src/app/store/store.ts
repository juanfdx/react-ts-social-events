import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { testReducer } from "../../features/scratch/testSlice";
import { eventReducer } from "../../features/events/eventSlice";
import { modalReducer } from "../common/modals/modalSlice";
import { authReducer } from "../../features/auth/authSlice";


export const store = configureStore({
  reducer: {
    test: testReducer,
    events: eventReducer,
    modals: modalReducer,
    auth: authReducer,
  },
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector