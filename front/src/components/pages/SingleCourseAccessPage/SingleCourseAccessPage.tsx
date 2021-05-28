import React from "react";
import { Helmet } from "react-helmet";
import { useHistory, useLocation, useParams } from "react-router";
import { useComponentWillMount } from "../../../hooks/useComponentWillMount";
import ToAccessCourse from "./ToAccessCourse";
interface LocationState {
  from: string;
}
const SingleCourseAccessPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { id } = useParams<{ id: string }>();
  const regExp = new RegExp("^/courses/([0-9]+([a-zA-Z]+[0-9]+)+)$");
  useComponentWillMount(() => {
    if (!regExp.test(location.state?.from)) {
      history.push(`/courses/${id}`);
    }
  });
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
