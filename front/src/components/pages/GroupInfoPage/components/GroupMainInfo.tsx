import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  EGetGroupMainActionType,
  IGroupMainInfoState,
} from "../../../../redux/reducers/getMainGroupInfoReducer";
import { RootState } from "../../../../redux/store";
import Loader from "../../../Loader/Loader";
import Message from "../../../Message/Messgae";
import { CustomTable } from "./CustomComponents";
import { SectionTitle, SubTitle } from "./SectionTitle";
import GroupMainInfoContainer from "./Wrapper";

const GroupMainInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { group, loading, error }: IGroupMainInfoState = useSelector(
    (state: RootState) => state.groupInfo
  );

  useEffect(() => {
    dispatch({
      type: EGetGroupMainActionType.GET_GROUP_MAIN_INFO,
      payload: { id },
    });
  }, []);
  return (
    <>
      <GroupMainInfoContainer>
        {loading && <Loader width="60px" />}
        {error && <Message severity="error">{error}</Message>}
        {!loading && group ? (
          <>
            <SubTitle>Общее</SubTitle>

            <CustomTable>
              <tr>
                <td>Специальность: </td>
                <td>{group.profession}</td>
              </tr>
              <tr>
                <td>Код: </td>
                <td>{group.short}</td>
              </tr>
              <tr>
                <td>Курс: </td>
                <td>{group.year}</td>
              </tr>
            </CustomTable>
          </>
        ) : null}
      </GroupMainInfoContainer>
    </>
  );
};

export default GroupMainInfo;
