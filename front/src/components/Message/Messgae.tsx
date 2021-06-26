import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import styled from "styled-components";

type severity = "error" | "warning" | "info" | "success";
interface IMessageProps {
  severity: severity;
  children: string;
  className?: string;
}
const MessageWrapper = styled.div`
  margin: 15px 0;
`;
const Message = ({ severity, children, className }: IMessageProps) => {
  //   const styles = useStyles();
  return (
    <MessageWrapper>
      <MuiAlert
        className={className}
        elevation={10}
        variant="filled"
        severity={severity}
      >
        {children}
      </MuiAlert>
    </MessageWrapper>
  );
};

export default Message;
