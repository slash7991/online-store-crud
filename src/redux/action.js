import types from "./types";
export function show(data) {
  return {
    type: types.SHOW,
    payload: data,
  };
}
export function add(data) {
  return {
    type: types.ADDITEM,
    payload: data,
  };
}
export function deleteI(data) {
  return {
    type: types.DELETEITEM,
    payload: data,
  };
}
export function update(data) {
  return {
    type: types.UPDATEITEM,
    payload: data,
  };
}
