import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
// import AddBoxIcon from '@material-ui/icons/AddBox';
// import CheckIcon from "@material-ui/icons/Check";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import DeleteIcon from "@material-ui/icons/Delete";
import DeleteIcon from "../../../../../src/assets/icons/card_delete.svg";
// import RemoveIcon from "@material-ui/icons/Remove";
import { useSelector } from "react-redux";
import { selectIsRtl } from "../../../../slice/selectors";

const Container = styled.div`
  overflow: hidden;

  overflow-y: auto;
  margin: 0px;
  &::-webkit-scrollbar {
    width: 4px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    //hide this scroll because there is another one at parent TreeSelectContainer
    // background-color: rgba(5, 7, 9, 0.38);
  }
`;

const OptContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => (props.checked ? "5px" : "16px")};
  margin-bottom: ${(props) => (props.checked ? "0" : "11px")};
  .MuiSvgIcon-root {
    cursor: pointer;
    color: #4a4a4a;
  }
`;

const StyledSelectedMachineCardWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #f0f6ff;
  width: 100%;
`;

const StyledSelectedMachineCardName = styled.p`
  font-size: 16px;
  color: #050709;
  margin-bottom: 0;
  ${(props) =>
    props.theme.dir === "rtl" ? `margin-right: 5px;` : `margin-left: 5px;`}
`;

const StyledDeleteIcon = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  cursor: pointer;
  color: #575757;
`;

const TreeDelete = ({ toppingOptions, handleData }) => {
  const [ParentsChilds, setParentsChilds] = useState({});
  const [expandedOptions, setexpandedOptions] = useState({
    100000: { 9999: {}, 10000: {}, 10001: {}, 10002: {} },
  });

  useEffect(() => {
    const array = {};
    const findChilds = (obj, parent) => {
      obj.forEach((elem) => {
        array[parent]["childs"].push({
          id: elem.id,
          name: elem.name,
          parentID: parent,
        });
        if (elem.subOptions.length > 0) findChilds(elem.subOptions, parent);
      });
    };
    const findParents = (obj) => {
      for (let i = 0; i < obj.length; i++) {
        if (obj[i]) {
          array[obj[i].id] = {
            childs: [],
            name: obj[i].name,
            parentID: obj[i].parentID,
          };
          findChilds(obj[i].subOptions, obj[i].id);
          findParents(obj[i].subOptions);
        }
      }
    };
    findParents(toppingOptions);
    setParentsChilds(array);
  }, [toppingOptions]);

  return (
    <Container>
      <OptionsList
        options={toppingOptions}
        onExpand={setexpandedOptions}
        expandedOptions={expandedOptions}
        ParentsChilds={ParentsChilds}
        onDelete={handleData}
      />
    </Container>
  );
};

// Recursive component
const OptionsList = ({
  options,
  expandedOptions,
  onExpand,
  ParentsChilds,
  onDelete,
}) => {
  const isRtl = useSelector(selectIsRtl);

  const handleExpandClicked = (selectedOptionId) => {
    // is currently selected

    if (expandedOptions[selectedOptionId]) {
      const temp = { ...expandedOptions };
      delete temp[selectedOptionId];
      onExpand(temp);
    } else {
      // is not currently selected

      onExpand({ ...expandedOptions, [selectedOptionId]: {} });
    }
  };

  const handleSubOptionsListChange = (optionId, subSelections) => {
    // add sub selections to current optionId
    //console.log(subSelections);
    onExpand({ ...expandedOptions, [optionId]: subSelections });
  };

  return (
    <div>
      {options.map((option) => (
        <ul key={option.id}>
          <OptContainer checked={option.SPCControllerFields ? true : false}>
            {option.subOptions.length > 0 ? (
              expandedOptions[option.id] ? (
                <>
                  <KeyboardArrowDownIcon
                    onClick={() => {
                      handleExpandClicked(option.id);
                    }}
                  />
                  <StyledSelectedMachineCardName>
                    {option.name}
                  </StyledSelectedMachineCardName>
                </>
              ) : isRtl === "rtl" ? (
                <>
                  <KeyboardArrowLeftIcon
                    onClick={() => {
                      handleExpandClicked(option.id);
                    }}
                  />
                  <StyledSelectedMachineCardName>
                    {option.name}
                  </StyledSelectedMachineCardName>
                </>
              ) : (
                <>
                  <KeyboardArrowRightIcon
                    onClick={() => {
                      handleExpandClicked(option.id);
                    }}
                  />
                  <StyledSelectedMachineCardName>
                    {option.name}
                  </StyledSelectedMachineCardName>
                </>
              )
            ) : (
              <StyledSelectedMachineCardWrapper>
                <StyledSelectedMachineCardName>
                  {option.name}
                </StyledSelectedMachineCardName>
                <StyledDeleteIcon
                  width={20}
                  height={20}
                  src={DeleteIcon}
                  onClick={() => {
                    onDelete(option);
                  }}
                />
              </StyledSelectedMachineCardWrapper>
            )}
          </OptContainer>
          {option.subOptions.length > 0 && expandedOptions[option.id] && (
            <OptionsList
              options={option.subOptions}
              expandedOptions={expandedOptions[option.id]}
              onExpand={(subSelections) =>
                handleSubOptionsListChange(option.id, subSelections)
              }
              ParentsChilds={ParentsChilds}
              onDelete={onDelete}
            />
          )}
        </ul>
      ))}
    </div>
  );
};

export default TreeDelete;
