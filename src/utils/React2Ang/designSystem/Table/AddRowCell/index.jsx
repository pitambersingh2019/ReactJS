import React from "react";
import { Container, CheckMarkStyled, CloseIconStyled } from "./styles";
const AddRowCell = ({ handleAddRowConfirm, handleDeleteRow }) => {
  return (
    <Container>
      <CheckMarkStyled onClick={handleAddRowConfirm} />
      <CloseIconStyled onClick={handleDeleteRow} />
    </Container>
  );
};
export default AddRowCell;
