import { createSlice } from "@reduxjs/toolkit"
import { sampleData } from "../../app/api/sampleData"
import { AppEvent } from "../../app/types/event"


type State = {
  events: AppEvent[]
}

const initialState: State = {
  events: sampleData
}


export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    createEvent: (state, action) => {
      const newEvent = action.payload
      state.events = [...state.events, newEvent]
    },
    updateEvent: (state, action) => {
      state.events = 
        state.events.map(e => e.id === action.payload.id ? action.payload : e)
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload)
    }
  }
})



export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;

export const eventReducer = eventSlice.reducer;