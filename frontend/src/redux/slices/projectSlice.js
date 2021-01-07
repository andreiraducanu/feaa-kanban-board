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

export default projectSlice.reducer;

const { createProject } = projectSlice.actions

// Actions
export const addProject = (name, description, username) => async dispatch => {
    fetch(`http://localhost:8080/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({ name: name, description: description, ownerUsername: username })
    })
        .then(res => {
            if (res.status === 201) {
                dispatch(createProject())
            }
        })
}