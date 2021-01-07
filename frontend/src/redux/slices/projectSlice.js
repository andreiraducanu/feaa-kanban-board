import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState: {

    },
    reducers: {
        createProject(state, action) {
            console.log("Project created")
        },
    },
});

export const { createProject } = projectSlice.actions;

export default projectSlice.reducer;