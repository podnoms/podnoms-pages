import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./audio.store";
import domainReducer from "./domain.store";

export default configureStore({
  reducer: {
    audio: audioReducer,
    domain: domainReducer,
  },
});
