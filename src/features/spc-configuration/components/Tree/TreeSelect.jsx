import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckIcon from "@material-ui/icons/Check";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import RemoveIcon from "@material-ui/icons/Remove";
import { useSelector } from "react-redux";
import { selectIsRtl } from "../../../../slice/selectors";

const CheckBoxContainer = styled.div`
  display: flex;
  height: 10px;
  margin: 5px;
  align-items: center;
  cursor: pointer;
`;

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

const SelectMachinedInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: ${(props) =>
    props.indeter
      ? "solid 1px #5900d3"
      : props.selected
      ? "none"
      : "solid 1px #9b9b9b"};
  background-color: ${(props) => (props.selected ? "#5900d3" : "#fafafa")};
  border-radius: 2px;
`;

const OptContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  .MuiSvgIcon-root {
    cursor: pointer;
    //color: '${(props) => (props.checked ? "#69aefd" : "#1580fc")};'
    color: #4a4a4a;
  }
`;

const SelectMachinedTitle = styled.div`
  height: 18px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  margin-right: 10px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #101010;
`;

// Root component -> Manages all app state
const TreeSelect = ({
  toppingOptions,
  selectedIDS,
  handleData,
  expandedOption,
}) => {
  const [expandedOptions, setexpandedOptions] = useState(expandedOption ?? {});
  const [selectedOptions, setselectedOptions] = useState([]);

  const [ParentsChilds, setParentsChilds] = useState({});
  const [IndeterminateParents, setIndeterminateParents] = useState({});

  useEffect(() => {
    setexpandedOptions(expandedOption);
  }, [expandedOption]);

  useEffect(() => {
    const array = {};
    const array2 = {};
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
          array2[obj[i].id] = { indeter: false };
          findChilds(obj[i].subOptions, obj[i].id);
          findParents(obj[i].subOptions);
        }
      }
    };
    findParents(toppingOptions);
    setParentsChilds(array);
    setIndeterminateParents(array2);
    setselectedOptions(selectedIDS);
  }, [toppingOptions, selectedIDS]);

  const handleSelectedData = (dataWithParent) => {
    let departmentIDCheckedList = [];
    for (let index = 0; index < dataWithParent.length; index++) {
      if (
        ParentsChilds[dataWithParent[index].id] &&
        ParentsChilds[dataWithParent[index].id].childs.length === 0
      ) {
        departmentIDCheckedList.push(dataWithParent[index]);
      }
    }
    handleData(departmentIDCheckedList);
    setselectedOptions(dataWithParent);
    //to expand main list and disable close list when click item
    if (departmentIDCheckedList.length === 0) {
      setexpandedOptions(expandedOption);
    }
  };

  useEffect(() => {
    const tempSelectedIDS = Object.assign([], selectedIDS);
    for (let key in ParentsChilds) {
      let flag = 1;
      let childs = ParentsChilds[key]["childs"];
      if (childs.length > 0) {
        childs.forEach((elem) => {
          if (
            tempSelectedIDS.find((elem2) => elem.id === elem2.id) === undefined
          ) {
            flag = 0;
          }
        });
        if (flag) {
          tempSelectedIDS.push({
            id: Number(key),
            name: ParentsChilds[key]["name"],
            parentID: ParentsChilds[key]["parentID"],
          });
        }
      }
    }
    setselectedOptions([...tempSelectedIDS]);

    let Indeterminate = {};
    for (let key in ParentsChilds) {
      let len = ParentsChilds[key]["childs"].length;
      let count = 0;
      ParentsChilds[key]["childs"].forEach((element) => {
        if (
          tempSelectedIDS.find((elem) => elem.id === element.id) !== undefined
        ) {
          count += 1;
        }
      });
      if (len !== count && count > 0) {
        Indeterminate[key] = { indeter: true };
      } else {
        Indeterminate[key] = { indeter: false };
      }
    }
    setIndeterminateParents(Indeterminate);
  }, [ParentsChilds, selectedIDS]);

  return (
    <Container>
      <OptionsList
        options={toppingOptions}
        onExpand={setexpandedOptions}
        expandedOptions={expandedOptions}
        selectedOptions={selectedOptions}
        ParentsChilds={ParentsChilds}
        IndeterminateParents={IndeterminateParents}
        OnIndeter={setIndeterminateParents}
        handleSelectedData={handleSelectedData}
      />
    </Container>
  );
};

// Recursive component
const OptionsList = ({
  options,
  expandedOptions,
  onExpand,
  selectedOptions,
  ParentsChilds,
  IndeterminateParents,
  OnIndeter,
  handleSelectedData,
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
    onExpand({ ...expandedOptions, [optionId]: subSelections });
  };

  const handleCheckboxClicked = (
    selectedOptionId,
    selectedOptionName,
    parentID
  ) => {
    function removeDuplicates(data, key) {
      return [...new Map(data.map((item) => [key(item), item])).values()];
    }

    const parents = [];

    for (let key in ParentsChilds) {
      let flag = 1;
      if (
        ParentsChilds[key]["childs"].find(
          (elem) => elem.id === selectedOptionId
        ) !== undefined
      ) {
        let childs = ParentsChilds[key]["childs"].filter(
          (elem) => elem.id !== selectedOptionId
        );

        childs.forEach((elem) => {
          if (
            selectedOptions.find((elem2) => elem.id === elem2.id) === undefined
          ) {
            flag = 0;
          }
        });
        if (flag) {
          parents.push({
            id: Number(key),
            name: ParentsChilds[key]["name"],
            parentID: ParentsChilds[key]["parentID"],
          });
        }
      }
    }

    const idsToSelect = [
      ...ParentsChilds[selectedOptionId]["childs"],
      { id: selectedOptionId, name: selectedOptionName, parentID: parentID },
    ];
    let forINDETS = [];

    if (selectedOptions.find((x) => x.id === selectedOptionId) !== undefined) {
      let newSelectArray = [...selectedOptions];
      idsToSelect.forEach((elem2) => {
        newSelectArray = newSelectArray.filter((elem) => elem.id !== elem2.id);
      });
      parents.forEach((elem2) => {
        newSelectArray = newSelectArray.filter((elem) => elem.id !== elem2.id);
      });
      handleSelectedData(removeDuplicates(newSelectArray, (elem) => elem.id));
      forINDETS = [...newSelectArray];
    } else {
      handleSelectedData(
        removeDuplicates(
          [...selectedOptions, ...parents, ...idsToSelect],
          (elem) => elem.id
        )
      );
      forINDETS = [...selectedOptions, ...parents, ...idsToSelect];
    }

    let Indeterminate = Object.assign({}, IndeterminateParents);
    for (let key in ParentsChilds) {
      let len = ParentsChilds[key]["childs"].length;
      let count = 0;
      ParentsChilds[key]["childs"].forEach((element) => {
        if (forINDETS.find((elem) => elem.id === element.id) !== undefined) {
          count += 1;
        }
      });
      if (len !== count && count > 0) {
        Indeterminate[key] = { indeter: true };
      } else {
        Indeterminate[key] = { indeter: false };
      }
    }
    OnIndeter(Indeterminate);
  };

  return (
    <div>
      {options.map((option) => (
        <ul key={option.id}>
          <OptContainer checked={expandedOptions[option.id] ? true : false}>
            {option.subOptions.length > 0 ? (
              expandedOptions[option.id] ? (
                <KeyboardArrowDownIcon
                  onClick={() => {
                    handleExpandClicked(option.id);
                  }}
                />
              ) : isRtl === "rtl" ? (
                <KeyboardArrowLeftIcon
                  onClick={() => {
                    handleExpandClicked(option.id);
                  }}
                />
              ) : (
                <KeyboardArrowRightIcon
                  onClick={() => {
                    handleExpandClicked(option.id);
                  }}
                />
              )
            ) : (
              <KeyboardArrowRightIcon
                style={{ color: "#f3f3f4", marginLeft: "10px" }}
              />
            )}
            <Checkbox
              selected={selectedOptions.find((x) => x.id === option.id)}
              indeter={
                IndeterminateParents[option.id]
                  ? IndeterminateParents[option.id].indeter
                  : false
              }
              label={option.name}
              onChange={() => {
                handleCheckboxClicked(option.id, option.name, option.parentID);
              }}
            />
          </OptContainer>
          {option.subOptions.length > 0 && expandedOptions[option.id] && (
            <OptionsList
              options={option.subOptions}
              expandedOptions={expandedOptions[option.id]}
              onExpand={(subSelections) =>
                handleSubOptionsListChange(option.id, subSelections)
              }
              selectedOptions={selectedOptions}
              ParentsChilds={ParentsChilds}
              IndeterminateParents={IndeterminateParents}
              OnIndeter={OnIndeter}
              handleSelectedData={handleSelectedData}
            />
          )}
        </ul>
      ))}
    </div>
  );
};

// Dumb checkbox component, completly controlled by parent
const Checkbox = ({ selected, label, onChange, indeter }) => {
  return (
    <CheckBoxContainer>
      <SelectMachinedInput
        selected={selected}
        indeter={indeter}
        onClick={onChange}
      >
        {selected ? (
          <CheckIcon style={{ fontSize: "10px", color: "#ffffff" }} />
        ) : indeter ? (
          <RemoveIcon
            style={{
              fontSize: "10px",
              color: "#5900d3",
              backgroundColor: "#fafafa",
            }}
          />
        ) : (
          ""
        )}
      </SelectMachinedInput>
      <SelectMachinedTitle>{label}</SelectMachinedTitle>
    </CheckBoxContainer>
  );
};

export default TreeSelect;
