import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayState } from "components/audio";
import NowPlaying from "models/now-playing.model";
export type AudioSliceState = {
  playState: PlayState;
  nowPlaying: NowPlaying | null;
};
const initialState: AudioSliceState = {
  playState: 0,
  nowPlaying: null,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setNowPlaying: (state, action: PayloadAction<AudioSliceState>) => {
      state.playState = action.payload.playState;
      state.nowPlaying = action.payload.nowPlaying;
    },
    setPlayState: (state, action: PayloadAction<PlayState>) => {
      state.playState = action.payload;
    },
  },
});

export const { setNowPlaying, setPlayState } = audioSlice.actions;
export default audioSlice.reducer;
