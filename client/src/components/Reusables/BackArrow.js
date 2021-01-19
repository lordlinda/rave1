import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";
const BackArrow = (props) => {
  return (
    /*some distance from the top*/
    <IconButton onClick={() => props.goBack.goBack()}>
      <ArrowBackIosIcon fontSize="small" />
    </IconButton>
  );
};

export default BackArrow;
