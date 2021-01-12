import React, { useState, useEffect } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import ProjectTableRow from './ProjectTableRow';
import { DeleteProjectDialog, EditProjectDialog, AddMemberDialog } from '../dialogs';

const ProjectTable = ({ projectIds }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [showDeleteProject, setShowDeleteProject] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [showAddMemberProject, setShowAddMemberProject] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteClick = (projectId) => {
        setSelectedProjectId(projectId);
        setShowDeleteProject(true);
    };

    const handleEditClick = (projectId) => {
        setSelectedProjectId(projectId);
        setShowEditProject(true);
    };

    const handleAddMemberClick = (projectId) => {
        setSelectedProjectId(projectId);
        setShowAddMemberProject(true);
    };

    return (
        <React.Fragment>
            <Paper variant="outlined">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Created Date</TableCell>
                                <TableCell>Lead</TableCell>
                                <TableCell></TableCell>
                            </TableRow >
                        </TableHead >
                        <TableBody>
                            {projectIds
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(projectId =>
                                    <ProjectTableRow
                                        key={projectId}
                                        id={projectId}
                                        onDeleteClick={() => handleDeleteClick(projectId)}
                                        onEditClick={() => handleEditClick(projectId)}
                                        onAddMemberClick={() => handleAddMemberClick(projectId)}
                                    />
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={projectIds.length}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPageOptions={[5, 10, 25]}
                    rowsPerPage={rowsPerPage}
                />
            </Paper>
            <DeleteProjectDialog
                open={showDeleteProject}
                onClose={() => setShowDeleteProject(false)}
                projectId={selectedProjectId}
            />
            <EditProjectDialog
                open={showEditProject}
                onClose={() => setShowEditProject(false)}
                projectId={selectedProjectId}
            />
            <AddMemberDialog
                open={showAddMemberProject}
                onClose={() => setShowAddMemberProject(false)}
                projectId={selectedProjectId}
            />
        </React.Fragment>
    );
};

export default ProjectTable;