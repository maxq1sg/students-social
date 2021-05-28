import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import FormErrorMessage from "./FormErrorMessage";
import {
  ECreateCourseActionType,
  EGetTechersActionType,
  EGroupsActionType,
  ICreatedCourse,
  IGroupsState,
  IteachersState,
  IUser,
  IUserLoginState,
} from "../../../redux/reducers/types";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  makeStyles,
} from "@material-ui/core";
import useStyles from "./materialStyles";
// import { createLanguageServiceSourceFile } from "typescript";
import { validationSchema } from "./validationSchema";
import StyledButton from "../../StyledButton/StyledButton";
import { useHistory } from "react-router";
import { RootState } from "../../../redux/store";
import { ICoursesState } from "../../../redux/reducers/getCoursesRedcuer";
import Select from "react-select";

const CustomField = styled(Field)`
  padding: 5px;
  border-radius: 3px;
  font-size: 18px;
  border: 1px solid purple;
`;
const customStyle = {
  control() {
    return {
      // border: "0",
    };
  },
};
interface IListState {
  options: any[];
  selectedOptions: any[];
}
const CourseForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    groups,
    loading: groupsLoading,
    error: groupsError,
  } = useSelector((state: RootState): IGroupsState => state.groups);

  const [groupsState, setGroupsState] = useState<IListState>({
    options: groups,
    selectedOptions: [],
  });
  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );
  const {
    teachers,
    loading: teachersLoading,
    error: teachersError,
  } = useSelector((state: RootState): IteachersState => state.teachers);

  const [teachersState, setTeacherState] = useState<IListState>({
    options: teachers,
    selectedOptions: [],
  });
  useEffect(() => {
    dispatch({ type: EGroupsActionType.GET_GROUPS, payload: user?.token });
    dispatch({
      type: EGetTechersActionType.GET_TEACHERS,
      payload: user?.token,
    });
  }, []);
  const groupsChangeHandler = (selected: any) => {
    setGroupsState((prev: any) => ({
      ...prev,
      selectedOptions: selected,
    }));
  };
  useEffect(() => {
    if (teachers.length) {
      const currentTeacher = teachers.find(
        (item: any) => item.value === user?.id
      );
      setTeacherState((prev) => ({
        selectedOptions: [...prev.selectedOptions, currentTeacher],
        options: teachers,
      }));
    }
  }, [teachers]);
  useEffect(() => {
    if (groups.length) {
      setGroupsState((prev) => ({ ...prev, options: groups }));
    }
  }, [teachers]);

  const teachersChangeHandler = (selected: any) => {
    setTeacherState((prev: any) => ({
      ...prev,
      selectedOptions: selected,
    }));
  };
  const {
    course,
    loading: createCourseLoading,
    error: createCourseError,
  } = useSelector((state: RootState): ICreatedCourse => state.createdCourse);

  useEffect(() => {
    if (course) {
      history.push(`/courses/${course._id}`);
    }
  }, [course]);
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        name: "maximka",
        description: "",
        password: "123",
        beginDate: "2011-09-29",
        endDate: "2011-09-29",
      }}
      onSubmit={(values) => {
        dispatch({
          type: ECreateCourseActionType.CREATE_COURSE,
          payload: {
            ...values,
            groups: groupsState.selectedOptions.map(
              (group: any) => group.value
            ),
            teachers: teachersState.selectedOptions.map(
              (teacher: any) => teacher.value
            ),
          },
        });
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <Table className={classes.table} component={Paper}>
          <TableContainer component={Paper}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <label htmlFor="name"> Название курса</label>
                </TableCell>
                <TableCell>
                  <CustomField id="name" name="name" />
                  <ErrorMessage name="name" component={FormErrorMessage} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <label htmlFor="name"> Описание курса (необязательно)</label>
                </TableCell>
                <TableCell>
                  <CustomField id="description" name="description" />
                  <ErrorMessage
                    name="description"
                    component={FormErrorMessage}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  // className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  <label htmlFor="name"> Группы для участия в курсе</label>
                </TableCell>
                <TableCell>
                  <Select
                    placeholder={groupsLoading ? "загрузка..." : "группы"}
                    maxMenuHeight={120}
                    isMulti
                    name="groups"
                    options={groupsState.options}
                    classNamePrefix="select"
                    onChange={groupsChangeHandler}
                    styles={customStyle}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  // className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  <label htmlFor="name"> Преподаватели курса (кроме Вас)</label>
                </TableCell>
                <TableCell>
                  <Select
                    placeholder={
                      teachersLoading ? "загрузка..." : "преподаватели"
                    }
                    maxMenuHeight={120}
                    isMulti
                    name="teachers"
                    options={teachersState.options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyle}
                    onChange={teachersChangeHandler}
                    // defaultValue={
                    //   !teachers.length && !teachersLoading
                    //     ? { value: "", label: "maximk" }
                    //     : null
                    // }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  // className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  <label htmlFor="password"> Кодовое слово курса</label>
                </TableCell>
                <TableCell>
                  <CustomField id="password" name="password" />
                  <ErrorMessage name="password" component={FormErrorMessage} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  // className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  <label htmlFor="beginDate"> Дата начала курса</label>
                </TableCell>
                <TableCell>
                  <CustomField name="beginDate" type="date" />
                  <ErrorMessage name="beginDate" component={FormErrorMessage} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <label htmlFor="endDate"> Дата окончания курса</label>
                </TableCell>
                <TableCell>
                  <CustomField name="endDate" type="date" />
                  <ErrorMessage name="endDate" component={FormErrorMessage} />
                </TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </Table>
        <StyledButton disabled={createCourseLoading}>
          {createCourseLoading ? "идет создание курса" : "создать курс"}
        </StyledButton>
      </Form>
    </Formik>
  );
};

export default CourseForm;
