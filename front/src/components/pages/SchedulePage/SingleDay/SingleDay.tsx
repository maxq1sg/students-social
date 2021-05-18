import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";

interface ISingleDay {
  day: string;
  objects: any[];
}

const useStyles = makeStyles((theme: any) => ({
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
    textAlign: "center",
  },
  tableHead: {
    background: "#0d3670",
    color: "white",
    paddingRight: 4,
    paddingLeft: 5,
    textAlign: "center",
  },
}));
const TableTitle = styled.h1`
  text-align: center;
`;
const SingleDay = ({ data }: { data: ISingleDay }) => {
  const classes = useStyles();
  return (
    <div>
      <TableTitle>{data.day}</TableTitle>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Время</TableCell>
              <TableCell className={classes.tableHead}>Предмет</TableCell>
              <TableCell className={classes.tableHead}>Преподаватель</TableCell>
              <TableCell className={classes.tableHead}>Аудитория</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.objects.map((row: any, index) => (
              <TableRow key={index}>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  {row.time}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.predmet}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.prepod}
                </TableCell>
                <TableCell className={classes.tableCell}>{row.aud}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SingleDay;
