import { useField } from "formik";
import { ErrorMessage } from "formik";
import { CustomTextArea } from "./CourseForm";
import FormErrorMessage from "./FormErrorMessage";

const TextAreaWithFormik = (props: any) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <CustomTextArea {...field} {...props} />
      {hasError && (
        <ErrorMessage
          name={`tasks.${props.index}.text`}
          component={FormErrorMessage}
        />
      )}
    </>
  );
};

export default TextAreaWithFormik;
