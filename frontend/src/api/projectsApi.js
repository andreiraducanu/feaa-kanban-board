import {
    projectAddedAction,
    projectDeletedAction,
    projectUpdatedAction,
    usersLoadedAction,
    projectsLoadingAction,
    projectsLoadedAction
} from '../redux/actions';

import API from './client'

export const createProject = (name, description, username) => async dispatch => {
    API.post('/projects', {
        name: name,
        description: description,
        ownerUsername: username
    }).then(res => {
        dispatch(projectAddedAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const getProjects = (username) => async dispatch => {
    dispatch(projectsLoadingAction);
    API.get('/projects', { params: { owner: username } }).then(res => {
        dispatch(projectsLoadedAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const updateProject = (idProject, name, description) => async dispatch => {
    console.log(idProject, name, description)
    API.put(`/projects/${idProject}`, {
        name: name,
        description: description,
    }).then(res => {
        console.log(res.data)
        dispatch(projectUpdatedAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const deleteProject = (idProject) => async dispatch => {
    API.delete(`/projects/${idProject}`).then(res => {
        dispatch(projectDeletedAction(idProject))
    }).catch(err => {
        console.log(err);
    })
}

export const addMember = (projectId, memberUsername) => async dispatch => {
    console.log("Test in api" + projectId + memberUsername)
    API.post(`/projects/${projectId}/members`, {
        memberUsername: memberUsername,
    }).then(res => {
        console.log(res.data)
        dispatch(projectUpdatedAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}
