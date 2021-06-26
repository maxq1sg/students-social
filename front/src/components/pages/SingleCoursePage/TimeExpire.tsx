import React from "react";
import styled from "styled-components";
import { ICourse } from "../../../redux/reducers/types";
import courseExpire from "./courseExpire";
const TimeContainer = styled.div`
  margin-top: 45px;
  color: ${({ exp }: { exp: boolean }) => (exp ? "red" : "green")};
`;
const TimeExpire = ({ course }: { course: ICourse }) => {
  const [days, hasExpired] = courseExpire(course.endDate);
  return (
    <TimeContainer exp={hasExpired}>
      {hasExpired
        ? `Курс закончился ${days} дней назад`
        : `Курс закончится через ${days}дней`}
    </TimeContainer>
  );
};

export default TimeExpire;
