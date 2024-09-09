// src/components/Pagination.js
import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ count, page, onChange }) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      size="large"
      sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}
    />
  );
};

export default Pagination;
