import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        currentProject: {},
        projects: []

    },
    reducers: {
        createProject(state, action) {
            console.log("Project created")
        },
        // functia lui mihai de getProjects
        getProjects(state, action) {
            state.projects = action.payload
            console.log("All projects get")
        },
        getProject(state, action) {
            state.currentProject = action.payload
            console.log("Project got")
        },
        updateProject(state, action) {
            console.log("Project updated")
        },
        deleteProject(state, action) {
            console.log("Project deleted")
        },
        addMember(state, action) {
            console.log("Project member added")
        },
    },
});

export const { createProject, getProjects, getProject, updateProject, deleteProject, addMember } = projectSlice.actions;

export default projectSlice.reducer;