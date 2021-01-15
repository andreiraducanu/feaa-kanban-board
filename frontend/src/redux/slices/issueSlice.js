import { createSlice } from '@reduxjs/toolkit';

const issueSlice = createSlice({
    name: 'issue',
    initialState: {

    },
    reducers: {
        createIssue(state, action) {
            console.log("Issue created")
        },
        updateIssue(state, action) {
            console.log("Issue updated")
        },
        deleteIssue(state, action) {
            console.log("Issue deleted")
        },
        addChild(state, action) {
            console.log("Child added")
        },
        removeChild(state, action) {
            console.log("Child removed")
        },
        addWorkLog(state, action) {
            console.log("WorkLog deleted")
        },
        updateWorkLog(state, action) {
            console.log("WorkLog updated")
        },
        deleteWorkLog(state, action) {
            console.log("WorkLog deleted")
        },
        addComment(state, action) {
            console.log("Comment added")
        },
        updateComment(state, action) {
            console.log("Comment updated")
        },
        deleteComment(state, action) {
            console.log("Comment deleted")
        },
    },
});

export default issueSlice.reducer;

export const { createIssue, updateIssue, deleteIssue, addChild, removeChild, addWorkLog, updateWorkLog, deleteWorkLog, addComment, updateComment, deleteComment } = issueSlice.actions