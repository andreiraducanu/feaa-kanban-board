import React, { useState, useEffect } from 'react';
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { deleteProject, getProjects } from "../../api/projectApi";
import { connect } from "react-redux";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = createStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    btn: {
        width: "20%",
        height: "10% !important",
        margin: "auto",
        marginBottom: "5%"
    },
});


function SimpleDialog(props) {
    const { classes } = props;
    const { onClose, selectedValue, open, deleteProject } = props;
    const { deleted } = props;

    const handleClose = () => {
        console.log("statusul este ", deleted);
        console.log("am iesit", selectedValue);
        onClose(selectedValue);
    };

    function deleteProj() {
        console.log(`sunt in delete si sterg ${selectedValue}`);
        deleteProject(selectedValue);
        console.log("dupa delete");
        // window.location.reload();
        handleClose();
    }

    return (
        <React.Fragment>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Are you sure you want to delete this project?</DialogTitle>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button, classes.btn}
                    onClick={deleteProj}
                    startIcon={<DeleteIcon />}
                >
                    Delete
      </Button>
            </Dialog>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    deleted: state.project.deleteProject
});

const mapDispatchToProps = ({
    deleteProject
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SimpleDialog));