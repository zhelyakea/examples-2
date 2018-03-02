import { put, call, select, race } from "redux-saga/effects";
import { delay } from "redux-saga";
import { updateOrders, startOrderFetch } from "../actions";
import { fetchPost } from "../services/fetch";
import {
  getData,
  getDataSuccess,
  getDataFailure
} from "../reducers/fetchState";

const pendeingDelay = ms => new Promise(resolve => setTimeout(resolve, ms));
const checkPlace = curr => {
  return curr !== "/neworder" || curr !== "/createfinalpage";
};
export function* fetchPosts(text) {
  const curr = yield select(state => state.route.curr);
  if (checkPlace(curr)) {
    try {
      yield put(getData());
      const { posts, timeout } = yield race({
        posts: call(fetchPost, text),
        timeout: call(pendeingDelay, 1000)
      });
      if (posts) {
        yield put(updateOrders(posts));
        yield put(getDataSuccess());
      } else {
        yield put(getDataFailure());
      }
    } catch (error) {
      yield put(getDataFailure());
    }
  }
  yield delay(1000);
  if (checkPlace(curr)) yield put(startOrderFetch("getorders"));
}
