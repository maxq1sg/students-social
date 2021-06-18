import React from "react";
import { ICourse } from "../../../redux/reducers/types";
import Message from "../../../components/Message/Messgae";
import SingleTask from "./SingleTask";

const TaskList = ({ course }: { course: ICourse }) => {
  return (
    <>
      <h1>Задания курса</h1>
      {course.tasks.length == 0 ? (
        <Message severity="warning">
          {"На данный момент задания в курс не добавлены!"}
        </Message>
      ) : (
        <ul>
          {course.tasks.map((item) => (
            <SingleTask>{item.text}</SingleTask>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
