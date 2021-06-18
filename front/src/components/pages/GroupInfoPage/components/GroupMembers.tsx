import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  EGetGroupMebersActionType,
  IGroupMembersState,
} from "../../../../redux/reducers/getGroupMembersReducer";
import { IUser } from "../../../../redux/reducers/types";
import { SectionTitle } from "./SectionTitle";
import { RootState } from "../../../../redux/store";
import Loader from "../../../Loader/Loader";
import styled from "styled-components";
import Message from "../../../Message/Messgae";
import { CustomTable } from "./CustomComponents";
import LittleAva from "../../../Course/LittleAva";
import { Link } from "react-router-dom";
import { ITheme } from "../../../DarkMode/themes";

const GroupMembersContainer = styled.div`
  min-height: 100px;
  background: ${({ theme }: { theme: ITheme }) => theme.secondary};
  border-radius: 15px;
  padding: 3px;
`;
const FlexContainer = styled.div`
  display: flex;
`;
const MemberName = styled.div`
  padding-left: 20px;
  line-height: 50px;
`;
const CustomLink = styled(Link)`
  color: ${({ theme }: { theme: ITheme }) => theme.colorReverse};
`;
const GroupMembers = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { members, loading, error }: IGroupMembersState = useSelector(
    (state: RootState) => state.groupMembers
  );

  useEffect(() => {
    dispatch({
      type: EGetGroupMebersActionType.GET_GROUP_MEMBERS,
      payload: { id },
    });
    return () => {
      dispatch({
        type: EGetGroupMebersActionType.GET_GROUP_MEMBERS_RESET,
      });
    };
  }, []);
  return (
    <GroupMembersContainer>
      {loading && <Loader width="60px" />}
      {error && <Message severity="error">{error}</Message>}
      {!loading && members.length ? (
        <CustomTable>
          {members.map((member) => (
            <tr>
              <td>
                <FlexContainer>
                  <LittleAva
                    id={member._id}
                    content={member.fullName}
                    isPerson={true}
                    letter={member.fullName[0]}
                  />
                  <CustomLink className="link" to={`/${member._id}`}>
                    <MemberName>{member.fullName}</MemberName>
                  </CustomLink>
                </FlexContainer>
              </td>
            </tr>
          ))}
        </CustomTable>
      ) : null}
    </GroupMembersContainer>
  );
};

export default GroupMembers;
