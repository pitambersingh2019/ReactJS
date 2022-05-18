import momentTz from "moment-timezone";
import { loadStateLang } from "../../../AppStart";

const lang = JSON.parse(loadStateLang());

export const filterTypes = {
  defaultText: (rows, id, filterValue) => {
    return rows.filter((row) => {
      const rowValue = row.values[id].value;
      return rowValue !== undefined
        ? String(rowValue)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase())
        : true;
    });
  },
  materialText: (rows, id, filterValue) => {
    return rows.filter((row) => {
      const rowValue = row.values[id].value.FValue;
      return rowValue !== undefined
        ? String(rowValue)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase())
        : true;
    });
  },
};

export const sortTypes = {
  defaultSort: (rowA, rowB, id) => {
    if (rowA.values[id] === undefined) return 1;
    if (rowB.values[id] === undefined) return -1;
    if (rowA.values[id] === undefined && rowB.values[id] === undefined)
      return 0;
    if (rowA.values[id].value > rowB.values[id].value) return 1;
    if (rowB.values[id].value > rowA.values[id].value) return -1;
    return 0;
  },
  materialSort: (rowA, rowB, id) => {
    if (rowA.values[id] === undefined) return 1;
    if (rowB.values[id] === undefined) return -1;
    if (rowA.values[id] === undefined && rowB.values[id] === undefined)
      return 0;
    if (rowA.values[id].value.DisplayType === "num") {
      if (
        Number(rowA.values[id].value.FValue) >
        Number(rowB.values[id].value.FValue)
      )
        return 1;
      if (
        Number(rowB.values[id].value.FValue) >
        Number(rowA.values[id].value.FValue)
      )
        return -1;
    } else if (rowA.values[id].value.DisplayType === "text") {
      if (rowA.values[id].value.FValue > rowB.values[id].value.FValue) return 1;
      if (rowB.values[id].value.FValue > rowA.values[id].value.FValue)
        return -1;
    }
    return 0;
  },
};

export const makeTableDataFromChannelData = (channel) => {
  if (channel.ChannelNumber === 0) {
    const initProductionParamters = channel
      ? channel.channelSplit[0].splits
      : [];
    const productionParamters = [];
    initProductionParamters.length > 0 &&
      initProductionParamters.map((param) => {
        if (
          param.DisplayType === "combo" ||
          param.DisplayType === "text" ||
          param.DisplayType === "Boolean"
        ) {
          productionParamters.push({
            ...param,
            PropertyEName: {
              type: "title",
              value: lang === "eng" ? param.PropertyEName : param.PropertyHName,
              calcFunction: param.FValueCalcFunction.length ? true : false,
              required: param.AllowNull == false ? true : false,
              toolTip: param.ToolTip,
            },
            FValue: {
              type: param.DisplayType,
              value: param.FValue,
              isEditable:
                (param.AllowEdit || param.IsEditable || param.IsEnabled) &&
                ((param.CalcUpdateOption === 3 &&
                  param.FValueCalcFunction !== "") ||
                  param.CalcUpdateOption !== 3) &&
                param.SourceTable === "",
            },
            HValue: undefined,
            LValue: undefined,
          });
        } else if (param.DisplayType === "num") {
          productionParamters.push({
            ...param,
            PropertyEName: {
              type: "title",
              value: lang === "eng" ? param.PropertyEName : param.PropertyHName,
              calcFunction: param.FValueCalcFunction.length ? true : false,
              required: param.AllowNull == false ? true : false,
              toolTip: param.ToolTip,
            },
            FValue:
              param.SearchLink === false && param.RecipeFValue
                ? {
                    type: param.DisplayType,
                    value: Number(param.FValue),
                    isEditable:
                      (param.AllowEdit ||
                        param.IsEditable ||
                        param.IsEnabled) &&
                      ((param.CalcUpdateOption === 3 &&
                        param.FValueCalcFunction !== "") ||
                        param.CalcUpdateOption !== 3) &&
                      param.SourceTable === "",
                  }
                : undefined,
            HValue:
              param.SearchLink === false && param.RecipeHValue
                ? {
                    type: param.DisplayType,
                    value: Number(param.HValue),
                    isEditable:
                      (param.AllowEdit ||
                        param.IsEditable ||
                        param.IsEnabled) &&
                      ((param.CalcUpdateOption === 3 &&
                        param.FValueCalcFunction !== "") ||
                        param.CalcUpdateOption !== 3) &&
                      param.SourceTable === "",
                  }
                : undefined,
            LValue:
              param.SearchLink === false && param.RecipeLValue
                ? {
                    type: param.DisplayType,
                    value: Number(param.LValue),
                    isEditable:
                      (param.AllowEdit ||
                        param.IsEditable ||
                        param.IsEnabled) &&
                      ((param.CalcUpdateOption === 3 &&
                        param.FValueCalcFunction !== "") ||
                        param.CalcUpdateOption !== 3) &&
                      param.SourceTable === "",
                  }
                : undefined,
          });
        }
      });
    return productionParamters;
  } else {
    const splits = [];
    channel.channelSplit.map((rowData) => {
      const dummy = {};
      if (rowData.SplitNumber != 0) {
        dummy.SplitNumber = {
          type: "title",
          value: rowData.SplitNumber,
        };
        rowData.splits.map((data) => {
          dummy[data.PropertyEName] = {
            type:
              data.PropertyEName === "MaterialID" ? "MaterialID" : "Material",
            value: data,
            isEditable:
              (data.AllowEdit || data.IsEditable || data.IsEnabled) &&
              ((data.CalcUpdateOption === 3 &&
                data.FValueCalcFunction !== "") ||
                data.CalcUpdateOption !== 3) &&
              data.SourceTable === "",
          };
        });
        splits.push(dummy);
      }
    });
    return splits;
  }
};

export const removeEmptyLines = (channel) => {
  if (channel.ChannelNumber === 0) {
    return channel;
  } else {
    let removedResult = {};
    let array = Object.assign([], channel.channelSplit);
    // const dummyArray = array.filter((ele) => {
    //   let check = 0;
    //   if (ele.SplitNumber != 0) {
    //     for (let i = 0; i < ele.splits.length; i++) {
    //       if (
    //         ele.splits[i].FValue === 0 ||
    //         ele.splits[i].FValue === "0" ||
    //         ele.splits[i].FValue === "" ||
    //         ele.splits[i].FValue === undefined
    //       ) {
    //         check = check + 1;
    //       } else {
    //         !ele.splits[i].RecipeFValue && (check = check + 1);
    //       }
    //     }
    //   }
    //   return check != ele.splits.length;
    // });

    const dummyArray = array.filter((ele) => {
      if (ele.SplitNumber != 0) {
        return ele.splits.some((cell) => {
          return (
            cell.FValue != 0 &&
            cell.FValue != "0" &&
            cell.FValue != "" &&
            cell.FValue != undefined
          );
        });
      }
    });
    removedResult = { ...channel, channelSplit: dummyArray };
    return removedResult;
  }
};

export const getTimeFromNow = (dateString) => {
  const localeUTC = momentTz.tz(
    dateString,
    "DD/MM/YYYY HH:mm:ss",
    "Asia/Jerusalem"
  );
  const date = new Date(localeUTC.format());

  const now = new Date();

  const diff = Math.abs(+now - +date); //in miliseconds
  const seconds = Math.floor(diff / 1000);
  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / (60 * 60));
  const days = Math.floor(seconds / (60 * 60 * 24));
  const months = Math.floor(seconds / (60 * 60 * 24 * 30.5));
  return { months, days, hours, mins, seconds };
};

export const getCurrentUserId = () => {
  try {
    const userId = window.sessionStorage.getItem("ngStorage-userID");
    if (!userId) {
      return undefined;
    }
    return Number(userId);
  } catch (err) {
    return undefined;
  }
};
