import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
const useStyles = makeStyles(() => ({
  avatar: {
    background: "purple",
  },
}));
const AvaContainer = styled.div`
  margin: 0 2px;
`;
const PrepodAva = ({ name }: { name: string }) => {
  const classes = useStyles();
  return (
    <AvaContainer>
      <Avatar className={classes.avatar} title={name}>
        {name[0].toUpperCase()}
      </Avatar>
    </AvaContainer>
  );
};

export default PrepodAva;
