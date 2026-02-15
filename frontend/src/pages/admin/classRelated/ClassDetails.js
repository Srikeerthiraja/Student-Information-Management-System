import {
    Container,
    Typography
} from '@mui/material';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GreenButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';

const ClassDetails = () => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } =
        useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = async (deleteID, address) => {
        try {
            await dispatch(deleteUser(deleteID, address));
            dispatch(getClassStudents(classID));
            dispatch(getSubjectList(classID, "ClassSubjects"));
            setMessage("Deleted successfully");
            setShowPopup(true);
        } catch (error) {
            setMessage("Delete failed");
            setShowPopup(true);
        }
    };

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>

                <Typography variant="h5" gutterBottom>
                    This is Class {sclassDetails && sclassDetails.sclassName}
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Number of Subjects: {numberOfSubjects}
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Number of Students: {numberOfStudents}
                </Typography>

                {getresponse && (
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                        sx={{ mt: 2, mr: 2 }}
                    >
                        Add Students
                    </GreenButton>
                )}

                {response && (
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                        sx={{ mt: 2 }}
                    >
                        Add Subjects
                    </GreenButton>
                )}
            </>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                    <ClassDetailsSection />
                </Container>
            )}

            <Popup
                message={message}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
            />
        </>
    );
};

export default ClassDetails;
