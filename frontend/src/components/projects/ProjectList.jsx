import React, { useState, useEffect } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import ProjectListItem from './ProjectListItem';
import { DeleteProjectDialog } from '../dialogs';

const ProjectList = ({ projectIds }) => {

    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [showDeleteProject, setShowDeleteProject] = useState(false);

    const handleDeleteClick = (projectId) => {
        setSelectedProjectId(projectId);
        setShowDeleteProject(true);
    };

    const handleEditClick = (projectId) => {
        //TODO
    };

    const handleAddMemberClick = (projectId) => {
        //TODO
    };

    return (
        <React.Fragment>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Lead</TableCell>
                        </TableRow >
                    </TableHead >
                    <TableBody>
                        {projectIds.map(projectId =>
                            <ProjectListItem
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
            <DeleteProjectDialog
                open={showDeleteProject}
                onClose={() => setShowDeleteProject(false)}
                projectId={selectedProjectId}
            />
        </React.Fragment>
    );
};

export default ProjectList;