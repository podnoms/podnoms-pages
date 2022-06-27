import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Domain } from "models";

const initialState: Domain = {
  domain: "",
  canonicalUrl: "",
  podcastId: "",
  podcastSlug: "",
  userSlug: "",
  url: "",
};

export const domainStateSlice = createSlice({
  name: "domain",
  initialState: initialState,
  reducers: {
    setDomain: (state, action: PayloadAction<Domain>) => action.payload,
  },
});

export const { setDomain } = domainStateSlice.actions;
export default domainStateSlice.reducer;
