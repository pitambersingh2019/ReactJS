import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/Network";
const usePositionRole = () => {
  const [positionItems, setPositionItems] = useState([]);
  const [positionRole, setPositionRole] = useState(null);

  useEffect(() => {
    apiCall("GetUserPosition", "POST", {
      Lang: "eng",
    })
      .then((response) => {
        if (Array.isArray(response.ResponseList)) {
          const positions = response.ResponseList.map((elem) => ({
            ...elem,
            value: elem.ID,
            label: elem.EName,
          }));
          setPositionItems(positions);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return [positionItems, positionRole, setPositionRole];
};

export default usePositionRole;
