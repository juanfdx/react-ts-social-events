import { createSlice } from "@reduxjs/toolkit";



type State = {
    isOpen: boolean;
    type: string | null;
    data: any;
  }
  
const initialState: State = {
isOpen: false,
type: null,
data: null
}



export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.type   = action.payload.type;
            state.data   = action.payload.data;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.type   = null;
            state.data   = null;
        }
    }
})


export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;