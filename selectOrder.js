import { put, fork, select } from "redux-saga/effects";
import { stopOrderFetch, startOrderFetch } from "../actions";
import { fetchPosts } from "./fetchPosts";
import { actionMenu } from "./actionMenu";
import { changePlace } from "./changePlace";
import { getFetchState } from "../reducers/fetchState/selector";
import { setBlockedMessage } from "../reducers/blockedMessage";
import { select_order } from "../reducers/selectedOrder";

export function* selectOrder(dataset_type, id) {
  const fetchState = yield select(getFetchState);
  if (fetchState !== "failed") {
    yield put(stopOrderFetch());
    switch (dataset_type) {
      case "order":
        yield fork(fetchPosts, `order=${id}`);
        yield fork(actionMenu, true, false);
        yield put(select_order(id));
        break;
      case "blocked_order":
      case "blocked_washer":
      case "blocked_box":
        yield put(startOrderFetch("getorders"));
        yield put(setBlockedMessage(true));
        yield put(select_order(id));
        break;
      case "washer":
        yield fork(fetchPosts, `order=${id}`);
        yield put(select_order(id));
        yield fork(changePlace, `/washerspage/${id}`);
        break;
      case "box":
        yield fork(fetchPosts, `order=${id}`);
        yield put(select_order(id));
        yield fork(changePlace, `/boxespage/${id}`);
        break;
      default:
    }
  }
}
