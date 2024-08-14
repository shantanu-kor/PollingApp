import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const allPollsSlice = createSlice({
    name: "AllPolls",
    initialState,
    reducers: {
        addPolls(state, action) {
            state.data = action.payload;
        },
        updatePollVotes(state, action) {
            const payload = action.payload;
            const index = state.data.findIndex(item => item._id === payload.id);
            // console.log(payload.data);
            state.data[index] = payload.data;
        },
        addPoll(state, action) {
            const data = [...state.data];
            const poll = action.payload.data;
            data.push(poll);
            state.data = data;
        },
        addUpdateComment(state, action) {
            const payload = action.payload;
            const index = state.data.findIndex(item => item._id === payload.pollId);
            const commentIndex = state.data[index].comments.findIndex(item => item._id === payload.data._id);
            if (commentIndex !== -1) {
                state.data[index].comments[commentIndex] = payload.data;
            } else {
                state.data[index].comments.push(payload.data);
            }
        }
    }
});

export const allPollsActions = allPollsSlice.actions;

export default allPollsSlice.reducer;