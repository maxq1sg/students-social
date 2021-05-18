import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

type severity = "error" | "warning" | "info" | "success";
interface IMessageProps {
  severity: severity;
  children: string;
  className?: string;
}

const Message = ({ severity, children, className }: IMessageProps) => {
  //   const styles = useStyles();
  return (
    <MuiAlert
      className={className}
      elevation={10}
      variant="filled"
      severity={severity}
    >
      {children}
    </MuiAlert>
  );
};

export default Message;
