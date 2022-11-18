import { createStore } from "redux";
import { itemReducer } from "./reducer";

const store = createStore(itemReducer);

export default store;
