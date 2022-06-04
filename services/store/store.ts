import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./audio.store";

export default configureStore({
  reducer: {
    audio: audioReducer,
  },
});
