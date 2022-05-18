import { useState } from "react";
import { Row } from "react-table";
import {
  DownloadIcon,
  IconWrapper,
  TableRowContainer,
} from "./table-row.styles";
import downloadIcon from "../../../assets/img/download.svg";
import { UploadedFile } from "../../../ts";
import { useAppDispatch } from "../../../redux/hooks";
import { getS3FileObject } from "../../../redux/slice";
import { getFile } from "../../../utils";

type TableRowProps = {
  children: React.ReactNode;
  row: Row<UploadedFile | any>;
};

export default function TableRow({
  children,
  row,
  ...otherProps
}: TableRowProps) {
  const [isHovering, setIsHovering] = useState(false);

  const dispatch = useAppDispatch();

  const onDownload = () => {
    const fileName = row.original.Path.split("/").pop();

    dispatch(getS3FileObject(fileName))
      .unwrap()
      .then((resp) => getFile(resp.fileURL, fileName));
  };

  return (
    <TableRowContainer
      {...otherProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <IconWrapper>
          <DownloadIcon
            src={downloadIcon}
            alt="download icon"
            onClick={onDownload}
          />
        </IconWrapper>
      )}
      {children}
    </TableRowContainer>
  );
}
