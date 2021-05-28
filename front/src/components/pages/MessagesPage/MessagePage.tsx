import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import SearchInput from "../UserSearchPage/SearchInput";



const MessagePage = () => {

  return (
    <div>
      <Helmet>
        <title>Мои Сообщения</title>
      </Helmet>

      {/* <SearchInput/> */}
    </div>
  );
};

export default MessagePage;
