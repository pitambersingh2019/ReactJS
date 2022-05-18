import React, { useEffect, useState } from "react";
import {
  SendMessageContainer,
  InputContainer,
  ActionDescription,
  InputDescription,
  FlexContainer,
  VerticalLine,
  SelectContainer,
  Group_title,
  SelectMachinedInput,
  SelectMachinedTitle,
  SelectSubContainer,
} from "./styles";
import DropDown from "../../../../Component/DropDown/DropDown";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useSelector } from "../../../../utils/React2Ang/useCustoms";
import { selectRuleData } from "../../slice/index";
import { RulesContainerSlice } from "../../../RuleContainer/slice/types";
import { selectAllDepartmentMachine } from "../../../RuleContainer/slice/selectors";

interface SendMessageProps {
  handleMessageParams: (
    message: string,
    subMachinesList: string[],
    subMachinesIDList: number[]
  ) => void;
}

const groupList = [
  {
    label: "Department",
    value: "DepartmentMachine",
  },
  {
    label: "Line",
    value: "DepartemntMachineLines",
  },
  {
    label: "Group",
    value: "DepartemntMachineGroups",
  },
];

const SendMessage: React.FC<SendMessageProps> = (props) => {
  const deps: RulesContainerSlice["DepartmentMachine"] = useSelector(
    selectAllDepartmentMachine
  );

  const data = useSelector(selectRuleData);
  const [itemSelected, setItemSelected] = useState(false);

  const [inputText, setInputText] = useState("");

  const [factory, setFactory] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [departmentExpandList, setDepartmentExpandList] = useState([""]);
  const [departmentCheckedList, setDepartmentCheckedList] = useState([""]);

  const [departmentIDCheckedList, setDepartmentIDList] = useState([0]);

  const [groupClicked, setGroupClicked] = useState(groupList[0].label);

  const selectedGroupValue = groupList.find(
    (item) => item.label === groupClicked
  );
  const dataMachines = selectedGroupValue?.value
    ? (deps.data as any)[selectedGroupValue.value]
    : [];
  console.log("machines ", dataMachines);
  //{ EName: string; }; Value: { MachineName: string; Id: number}[]; }
  const listMachines = dataMachines.map((item: any) => {
    const handleItemChange = (item: string, department: any) => {
      if (departmentCheckedList.includes(item)) {
        //get index of item
        const index = departmentCheckedList.indexOf(item);

        if (index !== -1) {
          departmentCheckedList.splice(index, 1);
          departmentIDCheckedList.splice(index, 1);
          //if department unchecked then remove all subDepartment
          department.Value.map((element: { MachineName: string }) => {
            departmentCheckedList.splice(
              departmentCheckedList.indexOf(element.MachineName),
              1
            );
            //remove ID's
            departmentIDCheckedList.splice(
              departmentCheckedList.indexOf(element.MachineName),
              1
            );
          });
        }
      } else {
        departmentCheckedList.push(item);

        //if department checked then add all subDepartment
        department.Value.map((element: { MachineName: string }) => {
          //add only who in unchecked
          if (!departmentCheckedList.includes(element.MachineName)) {
            departmentCheckedList.push(element.MachineName);
          }
        });

        //if department checked then add all subDepartment
        department.Value.map((element: { Id: number }) => {
          //add only who in unchecked
          if (!departmentIDCheckedList.includes(element.Id)) {
            departmentIDCheckedList.push(element.Id);
          }
        });

        //remove first empty item
        if (departmentIDCheckedList[0] === 0) {
          departmentIDCheckedList.splice(0, 1);
        }
      }

      setDepartmentCheckedList(departmentCheckedList);
      setDepartmentIDList(departmentIDCheckedList);
      setRefresh(!refresh);
    };

    const handleIconClicked = (item: string) => {
      if (departmentExpandList.includes(item)) {
        //get index of item
        const index = departmentExpandList.indexOf(item);

        if (index !== -1) {
          departmentExpandList.splice(index, 1);
        }
      } else {
        departmentExpandList.push(item);
      }

      setDepartmentExpandList(departmentExpandList);
      setRefresh(!refresh);
    };

    if (item.Key.EName === null || item.Key.EName === undefined) {
      return null;
    }

    return (
      // eslint-disable-next-line react/jsx-key
      <SelectSubContainer>
        <SelectContainer>
          {departmentExpandList.includes(item.Key.EName) ? (
            <IndeterminateCheckBoxIcon
              onClick={() => handleIconClicked(item.Key.EName)}
            />
          ) : (
            <AddBoxIcon onClick={() => handleIconClicked(item.Key.EName)} />
          )}
          <SelectMachinedInput
            name={item.Key.EName}
            type="checkbox"
            checked={
              departmentCheckedList.includes(item.Key.EName) ? true : false
            }
            onClick={() => handleItemChange(item.Key.EName, item)}
            width={16}
            height={16}
            marginLeft={10}
          />
          <SelectMachinedTitle marginRight={0} marginLeft={8}>
            {item.Key.EName}
          </SelectMachinedTitle>
        </SelectContainer>
        {selectedGroupValue?.value === "DepartmentMachine" ? (
          departmentExpandList.includes(item.Key.EName) ? (
            ListSubDepartment(
              item.Value?.map((element: { MachineName: string }) => {
                return element.MachineName;
              }) || [],
              item.Key.EName,
              item.Value?.map((element: { Id: number }) => {
                return element.Id;
              }) || []
            )
          ) : (
            <></>
          )
        ) : (
          ListSubMachine({ Key: item.Value[0].Key, Value: item.Value })
        )}
      </SelectSubContainer>
    );
  });

  function ListSubMachine(item: {
    Key: { EName: string };
    Value: { MachineName: string }[];
  }) {
    const handleItemChange = (item: string, department: any) => {
      if (departmentCheckedList.includes(item)) {
        //get index of item
        const index = departmentCheckedList.indexOf(item);

        if (index !== -1) {
          departmentCheckedList.splice(index, 1);
          //if department unchecked then remove all subDepartment
          department.Value.map((element: { MachineName: string }) => {
            departmentCheckedList.splice(
              departmentCheckedList.indexOf(element.MachineName),
              1
            );
          });
        }
      } else {
        departmentCheckedList.push(item);
        //if department checked then add all subDepartment
        department.Value.map((element: { MachineName: string }) => {
          //add only who in unchecked
          if (!departmentCheckedList.includes(element.MachineName)) {
            departmentCheckedList.push(element.MachineName);
          }
        });
      }

      setDepartmentCheckedList(departmentCheckedList);
      setRefresh(!refresh);
    };

    const handleIconClicked = (item: string) => {
      if (departmentExpandList.includes(item)) {
        //get index of item
        const index = departmentExpandList.indexOf(item);

        if (index !== -1) {
          departmentExpandList.splice(index, 1);
        }
      } else {
        departmentExpandList.push(item);
      }

      setDepartmentExpandList(departmentExpandList);
      setRefresh(!refresh);
    };

    if (item.Key.EName === null || item.Key.EName === undefined) {
      return null;
    }

    return (
      <SelectSubContainer>
        <SelectContainer>
          {departmentExpandList.includes(item.Key.EName) ? (
            <IndeterminateCheckBoxIcon
              onClick={() => handleIconClicked(item.Key.EName)}
            />
          ) : (
            <AddBoxIcon onClick={() => handleIconClicked(item.Key.EName)} />
          )}
          <SelectMachinedInput
            name={item.Key.EName}
            type="checkbox"
            checked={
              departmentCheckedList.includes(item.Key.EName) ? true : false
            }
            onClick={() => handleItemChange(item.Key.EName, item)}
            width={16}
            height={16}
            marginLeft={10}
          />
          <SelectMachinedTitle marginRight={0} marginLeft={8}>
            {item.Key.EName}
          </SelectMachinedTitle>
        </SelectContainer>
        {departmentExpandList.includes(item.Key.EName) ? (
          ListSubDepartment(
            item.Value?.map((element: { MachineName: string }) => {
              return element.MachineName;
            }) || [],
            item.Key.EName,
            []
          )
        ) : (
          <></>
        )}
      </SelectSubContainer>
    );
  }

  function ListSubDepartment(
    subDepartment: string[],
    department: string,
    subDepartmentID: number[]
  ) {
    const handleItemChange = (item: string, id: number) => {
      console.log(id);
      console.log(item);
      if (departmentCheckedList.includes(item)) {
        //get index of item
        const index = departmentCheckedList.indexOf(item);

        if (index !== -1) {
          departmentCheckedList.splice(index, 1);
          departmentIDCheckedList.splice(index, 1);
        }

        //if at list one subDepartment unchecked then master/department make unchecked
        if (departmentCheckedList.includes(department)) {
          departmentCheckedList.splice(
            departmentCheckedList.indexOf(department),
            1
          );
        }
      } else {
        departmentCheckedList.push(item);

        departmentIDCheckedList.push(id);

        //remove first empty item
        if (departmentIDCheckedList[0] === 0) {
          departmentIDCheckedList.splice(0, 1);
        }

        //if all subDepartment are checked then make department checked
        let flag = true;
        for (let i = 0; i < subDepartment.length; i++) {
          if (!departmentCheckedList.includes(subDepartment[i])) {
            flag = false;
          }
        }
        //if flag still true then all subDepartment are checked
        if (flag) {
          departmentCheckedList.push(department);
        }
      }

      setDepartmentCheckedList(departmentCheckedList);
      setDepartmentIDList(departmentIDCheckedList);
      setRefresh(!refresh);
    };

    const listSubDepartment = subDepartment.map((item) => (
      <SelectSubContainer key={item}>
        <SelectContainer>
          <SelectMachinedInput
            name={item}
            type="checkbox"
            checked={departmentCheckedList.includes(item) ? true : false}
            onClick={() =>
              handleItemChange(
                item,
                subDepartmentID[subDepartment.indexOf(item)]
              )
            }
            width={16}
            height={16}
            marginLeft={30}
          />
          <SelectMachinedTitle marginRight={0} marginLeft={8}>
            {item}
          </SelectMachinedTitle>
        </SelectContainer>
      </SelectSubContainer>
    ));

    return <div>{listSubDepartment}</div>;
  }

  useEffect(() => {
    console.log("deps ", deps);

    if (inputText !== "") {
      props.handleMessageParams(
        inputText,
        departmentCheckedList,
        departmentIDCheckedList
      );
    }

    //if was data at state then display it
    if (
      data.description !== "" &&
      data.description !== undefined &&
      !itemSelected
    ) {
      setInputText(data.description);

      //make mutable array
      const subMachines = [...data.subMachinesList];
      subMachines.sort((a, b) => a.order - b.order);
      setDepartmentCheckedList(subMachines);

      //to show open list
      setFactory(true);

      setItemSelected(true);
    }
  }, [data, deps, inputText, departmentCheckedList]);

  const handleGroupDropDown = (item: string) => {
    //clean old data
    setDepartmentExpandList([""]);
    setDepartmentCheckedList([""]);
    setDepartmentIDList([0]);

    setGroupClicked(item);
  };

  return (
    <SendMessageContainer>
      <FlexContainer>
        <SelectContainer>
          <ActionDescription paddingLeft={false}>
            Select machined
          </ActionDescription>

          <Group_title>Grouped by:</Group_title>

          <DropDown
            id={"Grouped by:"}
            data={groupList}
            marginTop={1}
            marginRight={0}
            marginBottom={0}
            marginLeft={0}
            top={51}
            itemSelected={groupClicked}
            disableShadow={true}
            disableBorder={true}
            dropDownScrolling={"false"}
            setWidth={true}
            nonPaddingTop={true}
            handleSelectItem={(getItemSelected) => {
              handleGroupDropDown(getItemSelected);
            }}
          />
          <ArrowDropDownIcon />
        </SelectContainer>

        <SelectContainer checked={factory}>
          {factory ? (
            <IndeterminateCheckBoxIcon onClick={() => setFactory(!factory)} />
          ) : (
            <AddBoxIcon onClick={() => setFactory(!factory)} />
          )}
          <SelectMachinedTitle marginRight={0} marginLeft={8}>
            Factory
          </SelectMachinedTitle>
        </SelectContainer>
        {factory ? listMachines : <></>}
      </FlexContainer>

      <VerticalLine />

      <FlexContainer>
        <ActionDescription paddingLeft={true}>
          Write a message*
        </ActionDescription>
        <InputContainer>
          <InputDescription
            placeholder="Write a message for the machine you selected"
            defaultValue={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
        </InputContainer>
      </FlexContainer>
    </SendMessageContainer>
  );
};

export default SendMessage;
