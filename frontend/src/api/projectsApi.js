import {
    setProjectsAction,
    addProjectAction,
    removeProjectAction,
    updateProjectAction
} from '../redux/actions';

import API from './client'

export const createProject = (name, description, username) => async dispatch => {
    API.post('/projects', {
        name: name,
        description: description,
        ownerUsername: username
    }).then(res => {
        dispatch(addProjectAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const getProjects = (username) => async dispatch => {
    API.get('/projects', { params: { owner: username } }).then(res => {
        dispatch(setProjectsAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const updateProject = (idProject, name, description) => async dispatch => {
    API.put(`/projects/${idProject}`, {
        name: name,
        description: description,
    }).then(res => {
        dispatch(updateProjectAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const deleteProject = (idProject) => async dispatch => {
    API.delete(`/projects/${idProject}`).then(res => {
        dispatch(removeProjectAction(idProject))
    }).catch(err => {
        console.log(err);
    })
}

export const addMember = (projectId, memberUsername) => async dispatch => {
    API.post(`/projects/${projectId}/members`, {
        memberUsername: memberUsername,
    }).then(res => {
        dispatch(updateProjectAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const getMembers = (projectId) => async dispatch => {
    API.get('/users', { params: { projectId: projectId } }).then(res => {
        dispatch(getMembersAction(res.data))
    }).catch(err => {
        console.log(err);
    })
}