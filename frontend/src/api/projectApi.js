import {
    fetchErrorAction,
    createProjectAction,
    getProjectsAction,
    getProjectAction,
    updateProjectAction,
    deleteProjectAction,
    addMemberAction,
    getMembersAction,
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

export const getProject = (projectId) => async dispatch => {
    API.get(`/projects/${projectId}`).then(res => {
        dispatch(getProjectAction(res.data))
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from getProject" }))
    })
}

// functia lui mihai
export const getProjects = (username) => async dispatch => {
    API.get('/projects', { params: { owner: username } }).then(res => {
        dispatch(getProjectsAction(res.data))
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from getProjects" }))
    })
}

export const updateProject = (idProject, name, description) => async dispatch => {
    API.put(`/projects/${idProject}`, {
        name: name,
        description: description,
    }).then(res => {
        dispatch(updateProjectAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from updateProject" }))
    })
}

export const deleteProject = (idProject) => async dispatch => {
    API.delete(`/projects/${idProject}`).then(res => {
        dispatch(deleteProjectAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from deleteProject" }))
    })
}

export const addChild = (issueId, memberUsername) => async dispatch => {
    API.post(`/projects/${issueId}/members`, {
        memberUsername: memberUsername,
    }).then(res => {
        dispatch(addMemberAction())
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from addChild" }))
    })
}

export const getMembers = (projectId) => async dispatch => {
    API.get('/users', { params: { projectId: projectId } }).then(res => {
        dispatch(getMembersAction(res.data))
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from getUsers" }))
    })
}