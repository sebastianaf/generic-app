//Redux
import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
  app: { name: `generic-front`, version: `1.5.0` },
  user: null,
  open: true,
  modalOpen: false,
  loading: false,
  modalOptions: {
    title: "",
    description: "",
    error: false,
  },
};

export const store = createStore(reducer, initialState);
