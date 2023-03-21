import * as React from "react";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import classes from "./pagination.module.css";
import axios from "axios";
import Loading from "../Loading/loading";

export default function Paginate(props) {

  return (
    <div className={classes.pagination}>
      <Stack spacing={2} sx={{marginTop: 3}}>
        <Pagination
          count={props.pagesCounter}
          page={props.changepage}
          onChange={props.onChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
}
