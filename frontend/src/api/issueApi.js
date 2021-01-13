import {
    fetchErrorAction,
    createIssueAction,
    updateIssueAction,
    deleteIssueAction,
    addChildAction,
    removeChildAction,
    addWorkLogAction,
    updateWorkLogAction,
    deleteWorkLogAction,
    addCommentAction,
    updateCommentAction,
    deleteCommentAction
} from '../redux/actions';

import API from './client'

export const createIssue = (projectId, title, type, priority, assigneeUsername) => async dispatch => {
    API.post('/issues', {
        projectId: projectId,
        title: title,
        type: type,
        priority: priority,
        assigneeUsername: assigneeUsername,
    }).then(res => {
        dispatch(createIssueAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from createIssue" }))
    })
}

export const updateIssue = (title, description, type, priority, reporterUsername, assigneeUsername, totalWorkTime) => async dispatch => {
    API.put(`/issues/${issueId}`, {
        title: title,
        description: description,
        type: type,
        priority: priority,
        reporterUsername: reporterUsername,
        assigneeUsername: assigneeUsername,
        totalWorkTime: totalWorkTime
    }).then(res => {
        dispatch(updateIssueAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from updateIssue" }))
    })
}

export const deleteIssue = (issueId) => async dispatch => {
    API.delete(`/issues/${issueId}`).then(res => {
        dispatch(deleteIssueAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from deleteIssue" }))
    })
}

export const addWorkLog = (issueId, userUsername, time) => async dispatch => {
    API.post(`/issues/${issueId}/worklogs`, {
        userUsername: userUsername,
        time: time,
    }).then(res => {
        dispatch(addWorkLogAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from addWorkLog" }))
    })
}

export const addChild = (issueId, childId) => async dispatch => {
    API.post(`/issues/${issueId}/children`, {
        childId: childId,
    }).then(res => {
        dispatch(addChildAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from addChild" }))
    })
}

export const removeChild = (issueId, childId) => async dispatch => {
    API.delete(`/issues/${issueId}/children/${childId}`).then(res => {
        dispatch(removeChildAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from removeChild" }))
    })
}

export const updateWorkLog = (issueId, idWorkLog, time) => async dispatch => {
    API.put(`/issues/${issueId}/worklogs/${idWorkLog}`, {
        time: time,
    }).then(res => {
        dispatch(updateWorkLogAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from updateWorkLog" }))
    })
}

export const deleteWorkLog = (issueId, idWorkLog) => async dispatch => {
    API.delete(`/issues/${issueId}/worklogs/${idWorkLog}`).then(res => {
        dispatch(deleteWorkLogAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from deleteWorkLog" }))
    })
}

export const addComment = (issueId, userUsername, text) => async dispatch => {
    API.post(`/issues/${issueId}/comments`, {
        userUsername: userUsername,
        text: text,
    }).then(res => {
        dispatch(addCommentAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from addComment" }))
    })
}

export const updateComment = (idIssue, idComment, text) => async dispatch => {
    API.put(`/issues/${idIssue}/comments/${idComment}`, {
        text: text,
    }).then(res => {
        dispatch(updateCommentAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from updateComment" }))
    })
}

export const deleteComment = (idIssue, idComment) => async dispatch => {
    API.delete(`/issues/${idIssue}/comments/${idComment}`).then(res => {
        dispatch(deleteCommentAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from deleteComment" }))
    })
}
