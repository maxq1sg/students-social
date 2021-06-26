import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormErrorMessage from "./FormErrorMessage";
import StyledButton from "../../StyledButton/StyledButton";
import {
  ECreateCourseActionType,
  EGetTechersActionType,
  EGroupsActionType,
  ICreatedCourse,
  IGroupsState,
  IteachersState,
  IUser,
} from "../../../redux/reducers/types";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import useStyles from "./materialStyles";
import { validationSchema } from "./validationSchema";
import { useHistory } from "react-router";
import { RootState } from "../../../redux/store";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import CloseIcon from "@material-ui/icons/Close";
import TextAreaWithFormik from "./TextArea";

export const CustomField = styled(Field)`
  padding: 5px;
  border-radius: 3px;
  font-size: 18px;
  border: 1px solid purple;
`;

export const CustomTextArea = styled(TextareaAutosize)`
  padding: 5px;
  border-radius: 3px;
  font-size: 18px;
  border: 1px solid purple;
  resize: none;
  font: inherit;
  width: 200px;
`;
const OptionWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: -15%;
  transform: translateY(-50%);
`;
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
    // error: groupsError,
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
    // error: teachersError,
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
  }, [dispatch, user?.token]);
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
  }, [teachers, user?.id]);
  useEffect(() => {
    if (groups.length) {
      setGroupsState((prev) => ({ ...prev, options: groups }));
    }
  }, [groups]);

  const teachersChangeHandler = (selected: any) => {
    setTeacherState((prev: any) => ({
      ...prev,
      selectedOptions: selected,
    }));
  };
  const {
    course,
    loading: createCourseLoading,
    // error: createCourseError,
  } = useSelector((state: RootState): ICreatedCourse => state.createdCourse);

  useEffect(() => {
    if (course) {
      history.push(`/courses/${course._id}`);
    }
  }, [course, history]);
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        password: "",
        beginDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        tasks: [{ text: "" }],
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
      {({ values }) => (
        <Form>
          <div className={classes.div}>
            <Table className={classes.table} component={Paper}>
              <TableContainer component={Paper}>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <label htmlFor="name"> Название курса*</label>
                    </TableCell>
                    <TableCell>
                      <CustomField id="name" name="name" />
                      <ErrorMessage name="name" component={FormErrorMessage} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <label htmlFor="name">
                        {" "}
                        Описание курса (необязательно)
                      </label>
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
                        // styles={customStyle}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      // className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      <label htmlFor="name"> Преподаватели курса</label>
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
                        // styles={customStyle}
                        onChange={teachersChangeHandler}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      // className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      <label htmlFor="password"> Кодовое слово курса*</label>
                    </TableCell>
                    <TableCell>
                      <CustomField id="password" name="password" />
                      <ErrorMessage
                        name="password"
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
                      <label htmlFor="beginDate"> Дата начала курса</label>
                    </TableCell>
                    <TableCell>
                      <CustomField name="beginDate" type="date" />
                      <ErrorMessage
                        name="beginDate"
                        component={FormErrorMessage}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <label htmlFor="endDate"> Дата окончания курса</label>
                    </TableCell>
                    <TableCell>
                      <CustomField name="endDate" type="date" />
                      <ErrorMessage
                        name="endDate"
                        component={FormErrorMessage}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <label htmlFor="endDate"> Задания курса</label>
                    </TableCell>
                    <TableCell>
                      <FieldArray name="tasks">
                        {({ insert, remove, push }) => (
                          <div>
                            {values.tasks.length > 0 &&
                              values.tasks.map((task, index) => (
                                <div key={index}>
                                  <OptionWrapper>
                                    {/* <CustomTextArea
                                      name={`tasks.${index}.text`}
                                      placeholder="Введите задание"
                                    /> */}
                                    <TextAreaWithFormik
                                      name={`tasks.${index}.text`}
                                      placeholder="Введите задание"
                                      index={index}
                                    />
                                    {/* <ErrorMessage
                                      name={`tasks.${index}.text`}
                                      component={FormErrorMessage}
                                    /> */}
                                    <IconWrapper>
                                      <CloseIcon
                                        onClick={() => remove(index)}
                                      />
                                    </IconWrapper>
                                  </OptionWrapper>
                                </div>
                              ))}
                            <StyledButton
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                push({ text: "" });
                              }}
                            >
                              Добавить
                            </StyledButton>
                          </div>
                        )}
                      </FieldArray>

                      {/* <CustomField name="endDate" type="date" />
                    <ErrorMessage name="endDate" component={FormErrorMessage} /> */}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </TableContainer>
            </Table>
          </div>
          <StyledButton disabled={createCourseLoading}>
            {createCourseLoading ? "идет создание курса" : "создать курс"}
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;
