import { configureStore } from "@reduxjs/toolkit";

import allPollsReducer from './allPollsSlice';
import myPollsReducer from './myPollsSlice';

const store = configureStore({
    reducer: {allPolls: allPollsReducer, myPolls: myPollsReducer}
});

export default store;