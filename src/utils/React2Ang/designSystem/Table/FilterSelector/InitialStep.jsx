import React from "react";
import {
  InitialStepIconStyled,
  InitialStepIconWrapper,
  InitialStepTextStyled,
  ListFilterItemWrapper,
  FilterItemWrapper,
  FilterItemContent,
  CloseIconStyled,
  EditIconStyled,
  FilterItemRightSide,
  TitlesWrapper,
} from "./styles";

const InitialStep = ({
  ListItems,
  handleRemoveFilterFromItems,
  handleEditItem,
}) => {
  console.log(ListItems);
  return (
    <ListFilterItemWrapper>
      {ListItems.every((elem) => elem.systemPreset) && (
        <InitialStepIconWrapper>
          <InitialStepIconStyled />
          <TitlesWrapper>
            <InitialStepTextStyled>
              This is a large data set table
            </InitialStepTextStyled>
            <InitialStepTextStyled>
              Add filters to reduce the data
            </InitialStepTextStyled>
          </TitlesWrapper>
        </InitialStepIconWrapper>
      )}
      {ListItems.map((elem, index) => (
        <FilterItemWrapper key={index}>
          <FilterItemContent>{elem.text}</FilterItemContent>
          <FilterItemRightSide>
            <CloseIconStyled
              onClick={() => handleRemoveFilterFromItems(elem.id)}
            />
            <EditIconStyled onClick={() => handleEditItem(elem)} />
          </FilterItemRightSide>
        </FilterItemWrapper>
      ))}
    </ListFilterItemWrapper>
  );
};

export default InitialStep;
