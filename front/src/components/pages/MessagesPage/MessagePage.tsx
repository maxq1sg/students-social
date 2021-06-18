import React, { FC, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import SearchInput from "../UserSearchPage/SearchInput";
import FormikTest from "./FormikTest.jsx";
import Message from "../../Message/Messgae";
import axios from "axios";
// import ClassComp from "./ClassComp";

const CustomTdd = styled.td`
  border: 1px solid black;
  width: 100%;
`;

const MessagePage: FC = () => {
  useEffect(() => {
    axios
      .get("api/users/60a242110ceb05dbc29a843")
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));
  }, []);
  return (
    <>
      <Message severity="error">
        Данный функционал находится на стадии разработки
      </Message>
      {/* <ClassComp message={"hello"} /> */}
    </>
  );
};

export default MessagePage;
