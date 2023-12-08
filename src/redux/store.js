import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./Reducers/AuthenticationSlice";
import LoggedSlice from "./Reducers/LoggedSlice";
import CompanySlice from "./Reducers/CompanySlice";
import SendQuoteSlice from "./Reducers/SendQuoteSlice";
import MemberSlice from "./Reducers/MemberSlice";
import SpotlightSlice from "./Reducers/SpotlightSlice";
import MonthlyReportSlice from "./Reducers/MonthlyReportSlice";
import MeetMemberSlice from "./Reducers/MeetMemberSlice";
import ResolutionCenterSlice from "./Reducers/ResolutionCenterSlice";
import EventExhibitionSlice from "./Reducers/EventExhibitionSlice";
import AnnualConferenceSlice from "./Reducers/AnnualConferenceSlice";
import DashboardSlice from "./Reducers/DashboardSlice";
import NotificationsSlice from "./Reducers/NotificationsSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const appReducers = combineReducers({
  authentication: AuthenticationReducer,
  loggedin: LoggedSlice,
  company: CompanySlice,
  sendquote: SendQuoteSlice,
  member: MemberSlice,
  spotlight: SpotlightSlice,
  monthlyReport: MonthlyReportSlice,
  meetmember: MeetMemberSlice,
  resolutioncenter: ResolutionCenterSlice,
  exhibition: EventExhibitionSlice,
  annualconference: AnnualConferenceSlice,
  dashboard: DashboardSlice,
  notfication: NotificationsSlice,
});

const reducers = (state, action) => {

  // console.log('action.',action);
  // console.log('action.payload',action?.payload);
  // console.log('action.payload.data',action?.payload?.data);
  if (typeof action !== "undefined"
    && typeof action.payload !== "undefined"
    && typeof action.payload.data !== "undefined"
    && typeof action.payload.data.message !== "undefined"
  ) {
    if (action.payload.data.message === 'Invalid token'
      || action.payload.data.message === 'Token Invalid') {
      storage.removeItem("token");
      storage.removeItem("persist:rootlogin");
      return appReducers(undefined, action);
    }
  }

  if (typeof action !== "undefined"
    && typeof action.payload !== "undefined"
    && typeof action.payload.data !== "undefined"
    && typeof action.payload.data.error !== "undefined"
  ) {
    if (action.payload.data.error === 'Invalid token'
      || action.payload.data.error === 'Token Invalid') {
      storage.removeItem("token");
      storage.removeItem("persist:rootlogin");
      return appReducers(undefined, action);
    }
  }
  if (
    typeof action !== "undefined" &&
    action.type === "loggedIn/setLogout"
  ) {
    storage.removeItem("token");
    storage.removeItem("persist:rootlogin");
    return appReducers(undefined, action);
  }
  return appReducers(state, action);
};

const persistConfig = {
  key: 'rootlogin',
  storage,
  whitelist: [
    'loggedin',
    'company',
    'sendquote',
    'member',
    'spotlight',
    'monthlyReport',
    'meetmember',
    'resolutioncenter',
    'exhibition',
    'annualconference',
    'dashboard',
    'notfication',
  ],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

let persistor = persistStore(store);

const reset_store = async () => {
  const persistConfig = {
    key: "rootlogin",
    storage,
    blacklist: [],
    stateReconciler: autoMergeLevel2,
  };
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
  });
  persistStore(store);
};

export { store, persistor, reset_store, reducers };

// export { store, persistor };
// export default store;
