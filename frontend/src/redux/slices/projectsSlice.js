import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    items: {},
    current: null,
    status: 'normal'
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        projectAdded(state, action) {
            const project = action.payload;
            state.items[project.id] = project;

            console.log(`Project ${project.id} added`);
        },
        projectDeleted(state, action) {
            const projectId = action.payload;
            delete state.items[projectId];

            console.log(`Project ${projectId} deleted`);
        },
        projectUpdated(state, action) {
            const project = action.payload;

            state.items[project.id] = project;

            console.log(`Project ${project.id} updated`);
        },
        projectSelected: {
            reducer: (state, action) => {
                const { project } = action.payload;

                state.current = project;

                console.log(`Project ${project.id} selected`);
            },
            prepare: (project) => {
                const { columns } = project;

                // Create columns order array
                project.columnOrder = columns.map(column => column.id);

                // Create issues dictionary
                const issues = {};
                columns.forEach(column =>
                    column.issues.forEach(issue =>
                        issues[issue.id] = issue
                    )
                );
                project.issues = issues;

                // // For each column map the issues to array of issue ids
                columns.forEach(column => {
                    column.issueIds = column.issues.map(issue => issue.id);
                    delete column.issues;
                });

                // // Create columns dictionary
                const newColumns = {};
                columns.forEach(column => newColumns[column.id] = column);
                project.columns = newColumns;

                return {
                    payload: {
                        project: project
                    }
                };
            }
        },
        projectsLoading(state) {
            state.status = 'loading'

            console.log('Projects loading');
        },
        projectsLoaded(state, action) {
            const newitems = {};
            action.payload.forEach(project => newitems[project.id] = project);

            state.items = newitems;
            state.status = 'normal';

            console.log('Projects loaded');
        }
    }
});

export const {
    projectAdded,
    projectDeleted,
    projectUpdated,
    projectSelected,
    projectsLoading,
    projectsLoaded
} = projectsSlice.actions;

export default projectsSlice.reducer;

const selectProjectItems = (state) => state.projects.items;

export const selectProjects = createSelector(
    selectProjectItems,
    (items) => Object.values(items)
);

export const selectProjectById = (state, projectId) => selectProjectItems(state)[projectId];

export const selectProjectIds = createSelector(
    selectProjects,
    (projects) => projects.map((project) => project.id)
);