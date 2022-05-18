/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo } from "react";

const searchParent = function (scope, functionName) {
  for (var i = 0; i < 15; i++) {
    if (scope[functionName] !== undefined) {
      return scope[functionName];
    }
    if (!scope || !scope.$parent) {
      break;
    }
    if (scope && scope.$parent) {
      scope = scope.$parent;
    }
  }
  console.log(`function ${functionName} not found`);
  return null;
};

function MainTable(props) {
  //TEMPORARY LOAD SearchResult EXAMPLE!!!!
  const content = props.content;

  const closeModal = useMemo(
    () => searchParent(props.$scope, "ok"),
    [props.$scope]
  );

  //   const UpdateValue = useMemo(
  //     () => searchParent(props.$scope, "updateValue"),
  //     [props.$scope]
  //   );

  const rowClicked = useMemo(
    () => searchParent(props.$scope, "rowClicked"),
    [props.$scope]
  );

  useEffect(() => {
    console.log("AAAAAAAAAAAAAA", content, props.$scope);
  }, [content, props.$scope]);

  if (content.data.returnValue) {
    return (
      <div style={{ height: "500px", width: "500px", backgroundColor: "red" }}>
        this is modal table
        <div
          onClick={() =>
            rowClicked &&
            rowClicked(13225, null, null, {
              ID: 13225,
              ProductIDIndexName: "test Product Name 22!",
              ProductDescription: "test Product Description!",
              CatalogID: "20021",
              MachineType: "Injection",
              FinalProduct: true,
              ProductGroup: "Injection",
              ProductStatus: "Active",
              RejectCost: 18,
              Optimized: true,
              OptimizationDate: "2022-01-13T13:35:00.000Z",
              CycleTimeCost: 47.13,
              AlternativeKey: null,
              $$hashKey: "uiGrid-07HR",
              api: "QCGetProductsForReport",
            })
          }
        >
          aaa
        </div>
        <div
          onClick={() =>
            rowClicked &&
            rowClicked(458, null, null, {
              ID: 458,
              SubType: "Test4",
              IsActive: 1,
              $$hashKey: "uiGrid-08RB",
              api: "QCGetSubTypesForReport",
            })
          }
        >
          aaa
        </div>
      </div>
    );
  }
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>sami</div>
    </div>
  );
}

export default MainTable;
