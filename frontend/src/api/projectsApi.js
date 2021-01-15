import {
    projectAddedAction,
    projectDeletedAction,
    projectUpdatedAction,
    projectSelectedAction,
    projectsLoadingAction,
    projectsLoadedAction
} from '../redux/actions';

import API from './client';

export const createProject = (name, description, username) => async dispatch => {
    API.post('/projects', {
        name: name,
        description: description,
        ownerUsername: username
    }).then(res => {
        dispatch(projectAddedAction(res.data))
    }).catch(err => {
        console.log(err);
    });
};

export const createIssue = (projectId, title, type, priority, assigneeUsername) => async dispatch => {
    API.post('/issues', {
        projectId: projectId,
        title: title,
        type: type,
        priority: priority,
        assigneeUsername: assigneeUsername,
    }).then(res => {
        dispatch(getProject(projectId));
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from createIssue" }))
    })
}

export const getProjects = (username) => async dispatch => {
    dispatch(projectsLoadingAction);
    API.get('/projects', { params: { owner: username } }).then(res => {
        dispatch(projectsLoadedAction(res.data))
    }).catch(err => {
        console.log(err);
    });
};

export const getProject = (projectId) => async dispatch => {
    API.get(`/projects/${projectId}`).then(res => {
        dispatch(projectSelectedAction(res.data));
    }).catch(err => {
        console.log(err);
    });
};

export const updateProject = (projectId, name, description) => async dispatch => {
    API.put(`/projects/${projectId}`, {
        name: name,
        description: description,
    }).then(res => {
        dispatch(projectUpdatedAction(res.data))
    }).catch(err => {
        console.log(err);
    });
};

export const deleteProject = (projectId) => async dispatch => {
    API.delete(`/projects/${projectId}`).then(res => {
        dispatch(projectDeletedAction(projectId))
    }).catch(err => {
        console.log(err);
    });
};

export const addMember = (projectId, memberUsername) => async dispatch => {
    API.post(`/projects/${projectId}/members`, {
        memberUsername: memberUsername,
    }).then(res => {
        dispatch(projectSelectedAction(res.data))
    }).catch(err => {
        console.log(err);
    });
};


export const moveIssue = (
    projectId,
    issueId,
    { sourceColumnId, destinationColumnId, destinationIndex }
) => async dispatch => {

    API.put(`/projects/${projectId}/issues/${issueId}/move`, {
        sourceColumnId: sourceColumnId,
        destinationColumnId: destinationColumnId,
        destinationIndex: destinationIndex
    }).then(res => {
        dispatch(projectSelectedAction(res.data))
    }).catch(err => {
        console.log(err);
    });
}