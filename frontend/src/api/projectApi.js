import {
    fetchErrorAction,
    createProjectAction,
    getProjectAction,
    updateProjectAction,
    deleteProjectAction,
    addMemberAction
} from '../redux/actions';

import API from './client'

export const createProject = (name, description, username) => async dispatch => {
    API.post('/projects', {
        name: name,
        description: description,
        ownerUsername: username
    }).then(res => {
        dispatch(createProjectAction(res.data))
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from addProject" }))
    })
}

export const updateProject = (idProject, name, description) => async dispatch => {
    API.put(`/projects/{${idProject}}`, {
        name: name,
        description: description,
    }).then(res => {
        dispatch(updateProjectAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from updateProject" }))
    })
}

export const deleteProject = (idProject) => async dispatch => {
    API.delete(`/projects/{${idProject}}`).then(res => {
        dispatch(deleteProjectAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from deleteProject" }))
    })
}

export const addChild = (issueId, memberUsername) => async dispatch => {
    API.post(`/projects/{${issueId}}/members`, {
        memberUsername: memberUsername,
    }).then(res => {
        dispatch(addMemberAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from addChild" }))
    })
}

export const getProject = () => async dispatch => {
    API.get('/projects').then(res => {
        dispatch(getProjectAction(res.data))
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from getProject" }))
    })
}