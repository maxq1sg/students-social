import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EScheduleActionType, IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Messgae";
import SingleDay from "./SingleDay/SingleDay";

const ScheduleWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  justify-content: center;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(400px, 500px));
  grid-gap: 20px;
`;

const SchedulePage = () => {
  const dispatch = useDispatch();
  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );

  const { loading, schedule, error } = useSelector(
    (state: RootState) => state.schedule
  );
  useEffect(() => {
    if (!schedule) {
      dispatch({
        type: EScheduleActionType.GET_SCHEDULE,
        payload: {
          year: user?.group?.year,
          short: user?.group?.short,
        },
      });
    }
  }, []);
  return (
    <>
      {loading && <Loader border="10px" width="100px" />}
      {error && <Message severity="error">{error}</Message>}
      <ScheduleWrapper>
        {schedule?.length &&
          !error &&
          schedule.map((data, index) => {
            return <SingleDay key={index} data={data} />;
          })}
      </ScheduleWrapper>
    </>
  );
};

export default SchedulePage;
