import { Photo } from '../../app/types/profile'
import { GenericState, createGenericSlice } from '../../app/store/genericSlice';


type State = {
  data: Photo[];
}

const initialState: State = {
  data: []
}


export const photosSlice = createGenericSlice({
  name: 'photos',
  initialState: initialState as GenericState<Photo[]>,
  reducers: {}
})


export const actions = photosSlice.actions;
export const photosReducer = photosSlice.reducer;
