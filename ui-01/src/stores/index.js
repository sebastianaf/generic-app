//Redux
import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
  app: { name: `generic-front`, version: `1.5.0` },
  user: {
    name: null,//`generic-front`,
    role: null//`generic-role`,
  },
  open: true,
};

export const store = createStore(reducer, initialState);
