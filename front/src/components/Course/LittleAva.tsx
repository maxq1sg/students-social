import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const useStyles = makeStyles(() => ({
  avatar: {
    background: "purple",
  },
}));
const AvaContainer = styled.div`
  margin: 0 2px;
`;
const LittleAva = ({ name, id }: { name: string; id: string }) => {
  console.log(id);
  const classes = useStyles();
  return (
    <AvaContainer>
      <Link className="link" to={`/${id}`}>
        <Avatar className={classes.avatar} title={name}>
          {name[0].toUpperCase()}
        </Avatar>
      </Link>
    </AvaContainer>
  );
};

export default LittleAva;
