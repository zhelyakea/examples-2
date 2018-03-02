import { createAction, createReducer } from "redux-act";

const initialState = {
  selected: null,
  list: {}
};
export const clearWashers = createAction("action/CLEAR_WASHERS");
const handleClearWashers = () => ({
  selected: null,
  list: {}
});
export const updateWashers = createAction("action/UPDATE_WASHERS");
const handleUpdateWashers = (state, washers) => ({
  ...state,
  list: { ...washers }
});
export const selectWasher = createAction("action/SELECT_CREATE_WASHER");
const handleSelectWasher = (state, washer_id) => ({
  ...state,
  selected: washer_id
});
export default createReducer(
  {
    [clearWashers]: handleClearWashers,
    [updateWashers]: handleUpdateWashers,
    [selectWasher]: handleSelectWasher
  },
  initialState
);
