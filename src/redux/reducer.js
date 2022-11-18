import { db } from "../../firebase";
import types from "./types";

let init_state = {
  allItem: [],
};

export function itemReducer(state = init_state, action) {
  switch (action.type) {
    case types.SHOW: {
      let data = action.payload;
      return { ...state, allItem: [...data] };
    }
    case types.ADDITEM: {
      let data = action.payload;
      db.collection("Items")
        .doc("FE46nOIBSjyJEVmzbrIm")
        .set({
          allItem: data,
        })
        .then(() => {
          alert("item added");
        });
      return { ...state, allItem: [...data] };
    }

    case types.UPDATEITEM: {
      let data = action.payload;
      db.collection("Items")
        .doc("FE46nOIBSjyJEVmzbrIm")
        .set({
          allItem: data,
        })
        .then(() => {
          alert("item updated successfully");
        });
      return { ...state, allItem: [...data] };
    }
    case types.DELETEITEM: {
      let data = action.payload;
      db.collection("Items")
        .doc("FE46nOIBSjyJEVmzbrIm")
        .set({
          allItem: data,
        })
        .then(() => {
          alert("item deleted");
        });
      return { ...state, allItem: [...data] };
    }

    default:
      return { ...state };
  }
}
