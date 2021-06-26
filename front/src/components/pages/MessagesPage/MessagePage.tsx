import React, { FC } from "react";
import Message from "../../Message/Messgae";

const MessagePage: FC = () => {
  // useEffect(() => {
  //   axios
  //     .get("api/users/60a242110ceb05dbc29a843")
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error.response));
  // }, []);
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
