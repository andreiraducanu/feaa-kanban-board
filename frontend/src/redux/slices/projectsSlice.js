import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    entities: {},
    status: 'normal'
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        projectAdded(state, action) {
            const project = action.payload;
            state.entities[project.id] = project;

            console.log(`Project ${project.id} added`);
        },
        projectDeleted(state, action) {
            const projectId = action.payload;
            delete state.entities[projectId];

            console.log(`Project ${projectId} deleted`);
        },
        projectUpdated(state, action) {
            const project = action.payload;

            state.entities[project.id] = project;

            console.log(`Project ${project.id} updated`);
        },
        projectsLoading(state) {
            state.status = 'loading'

            console.log('Projects loading');
        },
        projectsLoaded(state, action) {
            const newEntities = {};
            action.payload.forEach(project => newEntities[project.id] = project);
            state.entities = newEntities;
            state.status = 'normal';

            console.log('Projects loaded');
        }
    }
});

export const {
    projectAdded,
    projectDeleted,
    projectUpdated,
    projectsLoading,
    projectsLoaded
} = projectsSlice.actions;

export default projectsSlice.reducer;

const selectProjectEntities = (state) => state.projects.entities;

export const selectProjects = createSelector(
    selectProjectEntities,
    (entities) => Object.values(entities)
);

export const selectProjectById = (state, projectId) => selectProjectEntities(state)[projectId];

export const selectProjectIds = createSelector(
    selectProjects,
    (projects) => projects.map((project) => project.id)
);
