import React from "react";
import { Helmet } from "react-helmet";
import ToAccessCourse from "./ToAccessCourse";

const SingleCourseAccessPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Доступ к курсу</title>
      </Helmet>
      <ToAccessCourse />
    </>
  );
};

export default SingleCourseAccessPage;
