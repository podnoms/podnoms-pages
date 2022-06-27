import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./audio.store";
import domainReducer from "./domain.store";

const store = configureStore({
  reducer: {
    audio: audioReducer,
    domain: domainReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
