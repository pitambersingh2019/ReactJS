import { SelectedMachine, TreeData, Department, Machine } from "../slice/types";

export const getSelectedTreeData = (
  selectedMachines: SelectedMachine[],
  treeData: TreeData[]
) => {
  const subOptions = getInitalSubOptions(selectedMachines, treeData);
  return getInitialTreeData(subOptions);
};

const getInitalSubOptions = (
  selectedMachines: SelectedMachine[],
  treeData: TreeData[]
) => {
  let initalSubOptions: TreeData[] = [];
  treeData[0].subOptions.forEach((ele) => {
    initalSubOptions.push({
      id: ele.id,
      name: ele.name,
      parentID: ele.parentID,
      subOptions: [],
    });
  });
  if (selectedMachines.length > 0) {
    for (let key in treeData[0].subOptions) {
      let childs = treeData[0].subOptions[key]["subOptions"];
      if (childs.length > 0) {
        childs.forEach((elem) => {
          if (selectedMachines.find((elem2) => elem.id === elem2.id)) {
            initalSubOptions[key].subOptions.push(elem);
          }
        });
      }
    }
  }
  return initalSubOptions;
};

const getInitialTreeData = (subOptions: TreeData[]) => {
  let initalTreeData: TreeData[] = [
    {
      id: 100000,
      name: "Factory",
      parentID: null,
      subOptions: [],
    },
  ];
  let tempArr: TreeData[] = [];
  subOptions.forEach((ele: TreeData) => {
    if (ele.subOptions.length > 0) {
      tempArr.push(ele);
    }
  });
  initalTreeData[0].subOptions = tempArr;
  return initalTreeData;
};

export const getDepartmentTreeData = (treeData: Department[]) => {
  let index = 9999;
  const data: TreeData[] = [];
  treeData?.forEach((elem: Department) => {
    const subOptions: TreeData[] = [];
    elem.Machines.forEach((elem2: Machine) => {
      subOptions.push({
        id: elem2.MachineID,
        name: elem2.MachineName,
        parentID: index,
        SPCControllerFields: elem2.SPCControllerFields,
        subOptions: [],
      });
    });
    data.push({
      id: index,
      name: elem.DepartmentName,
      parentID: 100000,
      subOptions: subOptions,
    });
    index += 1;
  });
  const Factory = [
    {
      id: 100000,
      name: "Factory",
      parentID: null,
      subOptions: data,
    },
  ];
  return Factory;
};

export const getChildList = (treeData: TreeData[]) => {
  let tempChilds = Object.assign([]);
  treeData[0].subOptions.forEach((ele) => {
    ele.subOptions.forEach((ele1) => {
      tempChilds.push(ele1);
    });
  });
  return tempChilds;
};
