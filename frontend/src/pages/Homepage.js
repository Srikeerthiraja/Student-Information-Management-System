import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LightPurpleButton } from '../components/buttonStyles';
import { getAllSclasses } from '../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../redux/teacherRelated/teacherHandle';

const Homepage = () => {
    const dispatch = useDispatch();
    const { sclassesList } = useSelector((state) => state.sclass);
    const { studentsList } = useSelector((state) => state.student);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);
    const adminID = currentUser?._id;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfStudents = studentsList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    useEffect(() => {
        if (adminID) {
            dispatch(getAllSclasses(adminID, "Sclass"));
            dispatch(getAllStudents(adminID));
            dispatch(getAllTeachers(adminID));
        }
    }, [adminID, dispatch]);

    return (
        <BackgroundWrapper>
            <Overlay />
            <ContentContainer container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={8} lg={6}>
                    <ContentBox>
                        <StyledTitle>
                            Welcome to<br />
                            Student Information Management<br />
                            System
                        </StyledTitle>
                        <StyledText>
                            <h4>
                                Effortlessly manage student data and academic operations - from organizing classes and enrolling students or faculty, to tracking attendance, evaluating performance, and delivering feedback. Access academic records, view grades, and communicate with ease, all in one seamless platform.
                            </h4>
                        </StyledText>
               
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>

                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{ color: "#550080" }}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </ContentBox>
                </Grid>
            </ContentContainer>
        </BackgroundWrapper>
    );
};

export default Homepage;

const BackgroundWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentContainer = styled(Grid)`
  min-height: 100vh;
  position: relative;
  z-index: 2;
  display: flex !important;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled.div`
  background: rgba(100, 107, 247, 0.91);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgb(241, 241, 241);
  text-align: center;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  color: rgb(0, 0, 0);
  font-weight: 700;
  margin-bottom: 1rem;
`;

const StyledText = styled.p`
  font-size: 1rem;
  color: #f4f2f5;
  line-height: 1.6;
  margin: 20px 0;
`;

const ClassCountText = styled.p`
  font-size: 1.1rem;
  color: #ffffff;
  margin: 8px 0 0;
  font-weight: 600;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
