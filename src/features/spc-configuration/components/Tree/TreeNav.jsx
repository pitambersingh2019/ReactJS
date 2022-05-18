import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
// import AddBoxIcon from '@material-ui/icons/AddBox';
// import CheckIcon from "@material-ui/icons/Check";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import DeleteIcon from "@material-ui/icons/Delete";
// import RemoveIcon from "@material-ui/icons/Remove";
import { useSelector } from "react-redux";
import { selectIsRtl } from "../../../../slice/selectors";
import { device } from "../../../../utils/devices";

const Container = styled.div`
  height: calc(100vh - 239px);
  overflow-y: auto;
  margin: 0px;
  padding-left: 8px;
  @media ${device.laptop} {
    padding-left: 0px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  ul {
    padding-inline-start: 16px;
  }
`;

const OptContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => (props.included ? "0" : "16px")};
  margin-bottom: ${(props) => (props.included ? "0" : "11px")};
  .MuiSvgIcon-root {
    cursor: pointer;
    color: #4a4a4a;
  }
`;

const StyledSelectedMachineCardWrapper = styled.div`
  display: flex;
  align-item: center;
  position: relative;
  justify-content: space-between;
  padding: 12px 16px;
  width: 100%;
  cursor: pointer;
  border-right: ${(props) => (props.active ? "4px solid #5900d3" : "")};
  &:before {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 200px;
    height: 100%;
    background-color: ${(props) => (props.active ? "#f0f6ff" : "#ffffff")};
    z-index: 0;
  }
`;

const StyledSelectedMachineCardName = styled.p`
  font-size: 16px;
  color: ${(props) => (props.active ? "#5900d3" : "#050709")};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  margin-bottom: 0;
  ${(props) =>
    props.theme.dir === "rtl" ? `margin-right: 5px;` : `margin-left: 5px;`}
  z-index: 1;
`;

const StyledUl = styled.ul`
  @media ${device.laptop} {
    padding-inline-start: ${(props) =>
      props.factory ? "0 !important" : "16px"};
  }
`;

const TreeNav = ({ toppingOptions, activeID, handleData }) => {
  const [ParentsChilds, setParentsChilds] = useState({});
  const [expandedOptions, setexpandedOptions] = useState({
    100000: { 9999: {}, 10000: {}, 10001: {}, 10002: {} },
  });
  useEffect(() => {
    const currentRef = document.getElementById(activeID);
    if (currentRef) {
      currentRef.scrollIntoView(false);
    }
  }, [activeID]);

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
        activeID={activeID}
        handleData={handleData}
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
  activeID,
  handleData,
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
        <StyledUl key={option.id} factory={option.id === 100000 ? true : false}>
          <OptContainer included={option.SPCControllerFields ? true : false}>
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
              <StyledSelectedMachineCardWrapper
                id={option.id}
                active={activeID === option.id}
                onClick={() => handleData(option)}
              >
                <StyledSelectedMachineCardName active={activeID === option.id}>
                  {option.name}
                </StyledSelectedMachineCardName>
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
              activeID={activeID}
              handleData={handleData}
            />
          )}
        </StyledUl>
      ))}
    </div>
  );
};

export default TreeNav;
