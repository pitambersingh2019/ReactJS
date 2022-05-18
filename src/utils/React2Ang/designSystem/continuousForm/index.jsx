/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { apiCall } from "../../../Network";
import EditableTable from "../editableTable";
import Field from "./Fields";
import Spinner from "./Spinner/Spinner";
import {
  Container,
  FieldsWrapper,
  SearchButton,
  SearchWrapper,
  TableWrapper,
} from "./styles";
import { checkMenuDOM } from "../../../CommonFunctions";
const ContinuousForm = ({ data, targetPairs }) => {
  const [fields, setFields] = useState(null);
  const [content, setContent] = useState(null);
  const menuPresent = useRef(checkMenuDOM());
  console.log("menuPresentmenuPresent", menuPresent.current);
  const pairs = useRef([]);
  useEffect(() => {
    const api = "DisplayFormResults";
    apiCall(api, "POST", {
      LeaderID: 0,
      formID: data.SubMenuExtID,
    })
      .then((response) => {
        setFields(response.recordTemplate);
      })
      .catch((err) => {
        console.log(err);
      });
    if (targetPairs) SaveValues(targetPairs);
  }, [SaveValues, data.SubMenuExtID, data.formID, targetPairs]);

  const handleSearchButton = useCallback(() => {
    setContent({
      request: {
        LeaderID: 0,
        formID: data.SubMenuExtID,
        pairs: pairs.current,
      },
    });
  }, [data.SubMenuExtID]);

  const SaveValues = useCallback((pair) => {
    const newChanges = [...pairs.current];
    const index = pairs.current.findIndex(
      (elem) => elem.FieldName === pair.FieldName
    );
    if (index >= 0) {
      newChanges[index] = pair;
    } else {
      newChanges.push(pair);
    }
    pairs.current = newChanges;
    console.log("newChanges", newChanges);
  }, []);

  const DeleteValues = useCallback((fieldname) => {
    pairs.current = pairs.current.filter(
      (elem) => elem.FieldName !== fieldname
    );
    console.log("newChanges", pairs.current);
  }, []);

  const HeaderRef = useRef(null);
  const [height, setheight] = useState(0);
  useEffect(() => {
    if (HeaderRef.current) {
      const fullHeight = HeaderRef.current.getBoundingClientRect().height;
      setheight(fullHeight);
    }
  }, [fields]);

  //80 heigh of header and footer of page, 64 footer of buttons table, 40 for search button, 62 for title!
  const tableheight = useMemo(
    () =>
      menuPresent.current
        ? `calc(100vh - ${height + 80 + 60 + 60 + 40}px)`
        : `calc(100vh - ${height + 100}px)`,
    [height]
  );
  return (
    <Container>
      <FieldsWrapper ref={HeaderRef}>
        {fields ? (
          fields.map(
            (field, index) =>
              field.ShowInCriteria && (
                <Field
                  key={index}
                  field={field}
                  SaveValues={SaveValues}
                  DeleteValues={DeleteValues}
                />
              )
          )
        ) : (
          <Spinner />
        )}
      </FieldsWrapper>
      <SearchWrapper>
        <SearchButton
          disabled={fields ? false : true}
          onClick={handleSearchButton}
        >
          Search
        </SearchButton>
      </SearchWrapper>
      <TableWrapper>
        {content && (
          <EditableTable
            content={content}
            data={data}
            heightStyle={tableheight}
            targetPairs={targetPairs}
          />
        )}
      </TableWrapper>
    </Container>
  );
};

export default ContinuousForm;
