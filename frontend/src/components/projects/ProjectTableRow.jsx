import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { selectProjectById } from '../../redux/slices/projectsSlice';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const ProjectTableRow = ({ projectId, onDeleteClick, onEditClick, onAddMemberClick }) => {

    const project = useSelector(state => selectProjectById(state, projectId));
    const { name, description, owner } = project;

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleClick = (action) => {
        action();
        handleMenuClose();
    }

    return (
        <TableRow key={projectId}>
            <TableCell>
                <Link component={RouterLink} to={`/dashboard/${projectId}`} variant="subtitle2">
                    {name}
                </Link>
            </TableCell>
            <TableCell>
                {description}
            </TableCell>
            <TableCell>
                {`${owner.firstname} ${owner.lastname}`}
            </TableCell>
            <TableCell align="right">
                <IconButton style={{ maxHeight: '24px' }} onClick={handleMenuClick}>
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleClick(onDeleteClick)}>
                        Delete
                    </MenuItem>
                    <MenuItem onClick={() => handleClick(onEditClick)}>
                        Edit project
                    </MenuItem>
                    <MenuItem onClick={() => handleClick(onAddMemberClick)}>
                        Add member
                    </MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

export default ProjectTableRow;