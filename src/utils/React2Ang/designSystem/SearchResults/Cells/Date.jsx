import moment from "moment";
import { useMemo } from "react";
const Date = ({ cell }) => {
  const date = useMemo(() => {
    const d = moment(cell.value);
    if (d.isValid()) return d.format("DD/MM/YYYY HH:mm:ss");
    return null;
  }, [cell.value]);
  return cell.value ? date : null;
};
export default Date;
