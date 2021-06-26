import { useField, ErrorMessage } from "formik";
import styled from "styled-components";
import { CustomField } from "../CourseCreatePage/CourseForm";
import FormErrorMessage from "../CourseCreatePage/FormErrorMessage";

const ModifCustomField = styled(CustomField)`
  width: 100%;
`;

const MyTextInput = (props: any) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <ModifCustomField {...field} {...props} />
      {hasError && (
        <ErrorMessage name={props.name} component={FormErrorMessage} />
      )}
    </>
  );
};

export default MyTextInput;
