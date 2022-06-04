import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayState } from "components/audio";
import NowPlaying from "models/now-playing.model";
type AudioSliceState = {
  playState: PlayState;
  nowPlaying: NowPlaying | null;
};
const initialState: AudioSliceState = {
  playState: PlayState.Stopped,
  nowPlaying: null,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setNowPlaying: (state, action: PayloadAction<NowPlaying>) => {
      state.nowPlaying = action.payload;
    },
  },
});

export const { setNowPlaying } = audioSlice.actions;
export default audioSlice.reducer;
