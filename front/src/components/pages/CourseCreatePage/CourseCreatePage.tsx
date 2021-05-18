import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EUserLogin } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import CourseForm from "./CourseForm";

const CourseCreatePage = () => {


  return (
    <>
      <CourseForm />
    </>
  );
};

export default CourseCreatePage;
