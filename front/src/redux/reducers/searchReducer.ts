import { call, put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import { ICourse, IUser } from "./types";
export type result = "user" | "course";
export interface ISearchState {
  loading: boolean;
  error?: string;
  searchResults: ICourse[] | IUser[];
  finish:boolean
  // resultType?: result;
}
export enum ESearchActionType {
  SEARCH_REQUEST = "SEARCH_REQUEST",
  SEARCH_SUCCESS = "SEARCH_SUCCESS",
  SEARCH_FAILURE = "SEARCH_FAILURE",
  SEARCH = "SEARCH",
  SEARCH_RESET = "SEARCH_RESET",
}
// interface IPayload {
//   course: string;
//   user: string;
// }
interface ISearchPayload{
  resultType: result,
  keyword:string
}
export const searchReducer = (
  state: ISearchState = { loading: false, searchResults: [],finish:false },
  action: { type: ESearchActionType; payload: any }
): ISearchState => {
  switch (action.type) {
    case(ESearchActionType.SEARCH_REQUEST):
      return {loading: true, searchResults: [],finish:false };
    case(ESearchActionType.SEARCH_SUCCESS):
      return {loading: false, searchResults: action.payload ,finish:true};
    case(ESearchActionType.SEARCH_FAILURE):
      return {
        loading: false,
        searchResults: [],
        error: action.payload,finish:true
      };
    case(ESearchActionType.SEARCH_RESET):
      return { loading: false, searchResults: [],finish:false };
    default:
      return state;
  }
};
function fetchSearch({ keyword, resultType }: ISearchPayload) {
  console.log(keyword,resultType)
  return axios.get(`/api/search/${resultType}?keyword=${keyword}`);
}

function* searchWorker(action: { type:ESearchActionType ; payload: ISearchPayload }) {
  try {
    yield put({ type: ESearchActionType.SEARCH_REQUEST});
    const { data } = yield call(fetchSearch, action.payload);
    yield put({
      type: ESearchActionType.SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    yield put({
      type: ESearchActionType.SEARCH_FAILURE,
      payload: message,
    });
  }
}

export function* searchWatcher() {
  yield takeEvery(
    ESearchActionType.SEARCH,
    searchWorker
  );
}
