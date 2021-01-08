import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        data: {}
    },
    reducers: {
        setProjects(state, { payload }) {
            payload.forEach(project => {
                state.data[project.id] = project;
            });
        },
        addProject(state, { payload }) {
            const { id } = payload;

            state.data[id] = payload;
        },
        removeProject(state, { payload }) {
            delete state.data[id];
        },
        updateProject(state, { payload }) {
            const { id } = payload;

            if (state.data.hasOwnProperty(id)) {
                state.data[id] = payload;
            }
        },
    }
});

export const { setProjects, addProject, removeProject, updateProject } = projectsSlice.actions;

export default projectsSlice.reducer;