import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Box,
    IconButton,
    Paper,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import TableTemplate from '../../../components/TableTemplate';

import { deleteSubject, getSubjectList } from '../../../redux/sclassRelated/sclassHandle';

const ShowSubjects = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    // ==========================
    // FETCH SUBJECTS
    // ==========================
    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        }
    }, [currentUser?._id, dispatch]);

    if (error) {
        console.log(error);
    }

    // ==========================
    // DELETE SUBJECT
    // ==========================
    const deleteHandler = async (deleteID, address) => {
        try {
            await dispatch(deleteSubject(deleteID));


            dispatch(getSubjectList(currentUser._id, "AllSubjects"));

            setMessage("Deleted Successfully");
            setShowPopup(true);

        } catch (error) {
            setMessage("Delete Failed");
            setShowPopup(true);
        }
    };

    // ==========================
    // TABLE COLUMNS
    // ==========================
    const subjectColumns = [
        { id: 'subName', label: 'Sub Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    // ==========================
    // TABLE ROWS
    // ==========================
    const subjectRows = Array.isArray(subjectsList)
        ? subjectsList.map((subject) => ({
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName?.sclassName,
            sclassID: subject.sclassName?._id,
            id: subject._id,
        }))
        : [];

    // ==========================
    // DELETE + VIEW BUTTONS
    // ==========================
    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id)}>
                    <DeleteIcon color="error" />
                </IconButton>

                <BlueButton
                    variant="contained"
                    onClick={() =>
                        navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)
                    }
                >
                    View
                </BlueButton>
            </>
        );
    };

    // ==========================
    // FLOATING ACTION BUTTONS
    // ==========================
    const actions = [
        {
            icon: <PostAddIcon color="primary" />,
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    // ==========================
    // RETURN
    // ==========================
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {response ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/subjects/chooseclass")}
                            >
                                Add Subjects
                            </GreenButton>
                        </Box>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {subjectRows.length > 0 && (
                                <TableTemplate
                                    buttonHaver={SubjectsButtonHaver}
                                    columns={subjectColumns}
                                    rows={subjectRows}
                                />
                            )}

                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    )}
                </>
            )}

            <Popup
                message={message}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
            />
        </>
    );
};

export default ShowSubjects;
