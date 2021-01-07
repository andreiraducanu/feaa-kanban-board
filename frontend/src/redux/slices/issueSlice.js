import { createSlice } from '@reduxjs/toolkit';

const issueSlice = createSlice({
    name: 'issue',
    initialState: {

    },
    reducers: {
        createIssue(state, action) {
            console.log("Issue created")
        },
        updateIssueById(state, action) {
            console.log("Issue updated")
        },
        deleteIssueById(state, action) {
            console.log("Issue deleted")
        },
    },
});

export default issueSlice.reducer;

const { createIssue, updateIssueById, deleteIssueById } = issueSlice.actions

// Actions
export const addIssue = (projectId, title, description, type, priority, reporterUsername, assigneeUsername, totalWorkTime) => async dispatch => {
    console.log(`Bearer ${localStorage.getItem('jwt')}`)
    fetch(`http://localhost:8080/issues`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            projectId: projectId,
            title: title,
            description: description,
            type: type,
            priority: priority,
            reporterUsername: reporterUsername,
            assigneeUsername: assigneeUsername,
            totalWorkTime: totalWorkTime
        })
    })
        .then(res => {
            if (res.status === 201) {
                dispatch(createIssue())
            }
        })
}

export const updateIssue = (projectId, title, description, type, priority, reporterUsername, assigneeUsername, totalWorkTime) => async dispatch => {
    fetch(`http://localhost:8080/issues/{${issueId}}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            title: title,
            description: description,
            type: type,
            priority: priority,
            reporterUsername: reporterUsername,
            assigneeUsername: assigneeUsername,
            totalWorkTime: totalWorkTime
        })
    })
        .then(res => {
            if (res.status === 200) {
                dispatch(updateIssueById())
            }
        })
}

export const deleteIssue = (projectId) => async dispatch => {
    fetch(`http://localhost:8080/issues/{${issueId}}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(res => {
            if (res.status === 200) {
                dispatch(deleteIssueById())
            }
        })
}