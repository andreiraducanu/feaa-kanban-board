import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        currentProject: {}

    },
    reducers: {
        createProject(state, action) {
            console.log("Project created")
        },
        // functia lui mihai de getProjects
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

export const { createProject, getProject, updateProject, deleteProject, addMember } = projectSlice.actions;

export default projectSlice.reducer;