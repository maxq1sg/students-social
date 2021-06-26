import CourseForm from "./CourseForm";
import { Helmet } from "react-helmet";

const CourseCreatePage = () => {
  return (
    <>
      <Helmet>
        <title>Конструктор курса</title>
      </Helmet>
      <CourseForm />
    </>
  );
};

export default CourseCreatePage;
