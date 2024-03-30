import { PayloadAction } from "@reduxjs/toolkit"
import { AppEvent } from "../../app/types/event"
import { Timestamp } from "firebase/firestore/lite"
import { GenericActions, GenericState, createGenericSlice } from "../../app/store/genericSlice"


type State = {
  data: AppEvent[]
}

const initialState: State = {
  data: []
}


export const eventSlice = createGenericSlice({
  name: 'events',
  initialState: initialState as GenericState<AppEvent[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.data = action.payload;
        state.status = "finished";
      },
      //for fireStore we have to format the date
      prepare: (events: any) => {
        //check if is an array, if not, means we are in EventDetailedPage and receiving an obj event so make it an array
        let eventArray: AppEvent[] = [];
        Array.isArray(events) ? eventArray = events : eventArray = [...eventArray, events];

        const mapped = eventArray.map((e: any) => {
          return   {...e, date: (e.date as Timestamp).toDate().toISOString() }
        })
        return { payload: mapped } 
      }
    }
  }
})

export const actions = eventSlice.actions as GenericActions<AppEvent[]>;



/* ======================================================================================== */

// export const eventSlice = createSlice({
//   name: 'events',
//   initialState,
//   reducers: {
//     setEvents: {
//       reducer: (state, action: PayloadAction<AppEvent[]>) => {
//         state.events = action.payload
//       },
//       //for fireStore we have to format the date
//       prepare: (events: any) => {
//         //check if is an array, if not, means we are in EventDetailedPage and receiving an obj event so make it an array
//         let eventArray: AppEvent[] = [];
//         Array.isArray(events) ? eventArray = events : eventArray = [...eventArray, events];

//         const mapped = eventArray.map((e: any) => {
//           return   {...e, date: (e.date as Timestamp).toDate().toISOString() }
//         })
//         return { payload: mapped } 
//       }
//     }
//   }
// })



// export const { setEvents } = eventSlice.actions;

export const eventReducer = eventSlice.reducer;