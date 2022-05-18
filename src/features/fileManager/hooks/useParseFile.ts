import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectFilesDelimiter } from "../redux/selectors";
import { setParsedFileData } from "../redux/slice";

export default function useParseFile() {
  const dispatch = useAppDispatch();

  const filesDelimiter = useAppSelector(selectFilesDelimiter);

  const parseFile = async (file: File) => {
    const textFile = await file.text();
    const lines = textFile.split("\n");

    const delimiter = filesDelimiter.find(({ FileType }) => {
      if (file.type === "text/csv") {
        return FileType === "csv";
      }
      if (file.type === "text/plain") {
        return FileType === "txt";
      }
    })?.Delimiter;

    const headers = lines[0].split(
      delimiter === "Tab" ? "\t" : delimiter || ","
    );

    dispatch(
      setParsedFileData({
        headers,
        numberOfRecords: lines.length - 1,
        file,
      })
    );
  };

  return { parseFile };
}
