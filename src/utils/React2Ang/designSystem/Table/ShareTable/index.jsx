/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  Container,
  Header,
  Wrapper,
  CloseIconStyled,
  Title,
  SubTitle,
  MainSection,
  Divider,
  SelectionWrapper,
  SearchWrapper,
  ApplyButton,
  FooterStyled,
  ItemsContainer,
  CancelButton,
  ItemWrapper,
  ItemContent,
  CloseIconItemStyled,
  ShareIconItemStyled,
  TitleWrapper,
  LineDivider,
} from "./styles";
import { createPortal } from "react-dom";
import Selection from "./Selection";
import SearchField from "../../../../../Component/DesignSystem/SearchField";
import { apiCall } from "../../../../Network";
import Button from "../../../../../Component/DesignSystem/Buttons";
import {
  notifyErrorToast,
  notifySuccessToast,
} from "../../../../../Component/Toast/ToastContainer";
import { isLocalLanguage } from "../../../../CommonFunctions";
import { translations } from "../../../../../locales/translations";
import { useTranslation } from "react-i18next";
const types = { USER: "user", GROUP: "group" };
const ShaereTable = ({ onClose, tableData }) => {
  const [search, setsearch] = useState("");
  const [users, setusers] = useState([]);
  const [groups, setgroups] = useState([]);
  const { t, i18n } = useTranslation();
  const language = useMemo(() => (i18n ? i18n.language : "eng"), [i18n]);
  const valueKey = isLocalLanguage(language) ? "ename" : "hname";
  const handleSearchChange = (text) => {
    setsearch(text);
  };

  useEffect(() => {
    apiCall("GetAllGroupsAndUsers", "GET")
      .then((response) => {
        if (response.error === null) {
          const usersResponse = response.Users.map((elem) => ({
            id: elem.id,
            ename: elem.displayname,
            hname: elem.displayhname,
            checked: false,
            type: types.USER,
          })).filter((elem) => elem.ename !== null && elem.hname !== null);
          const groupsResponse = response.Groups.map((elem) => ({
            ...elem,
            checked: false,
            type: types.GROUP,
          })).filter((elem) => elem.ename !== null && elem.hname !== null);
          setusers(usersResponse);
          setgroups(groupsResponse);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const FilterBySearch = useCallback(
    (elem) => {
      if (elem[valueKey]) {
        return elem[valueKey]
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      }
      return false;
    },
    [search]
  );

  const handleCheckItemUser = useCallback((id) => {
    setusers((old) =>
      old.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            checked: !elem.checked,
          };
        }
        return elem;
      })
    );
  }, []);

  const handleCheckItemGroup = useCallback((id) => {
    setgroups((old) =>
      old.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            checked: !elem.checked,
          };
        }
        return elem;
      })
    );
  }, []);

  const handleCheckAllUsers = useCallback((value) => {
    setusers((old) =>
      old.map((elem) => ({
        ...elem,
        checked: value,
      }))
    );
  }, []);

  const handleCheckAllGroups = useCallback((value) => {
    setgroups((old) =>
      old.map((elem) => ({
        ...elem,
        checked: value,
      }))
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const [limit, setlimit] = useState(0);

  const checkedItems = useMemo(
    () => [...users, ...groups].filter((elem) => elem.checked === true),
    [groups, users]
  );

  const checkedUsersIds = useMemo(
    () => users.filter((elem) => elem.checked === true).map((elem) => elem.id),
    [users]
  );

  const checkedGroupsIds = useMemo(
    () => groups.filter((elem) => elem.checked === true).map((elem) => elem.id),
    [groups]
  );

  const handleDeleteItem = useCallback((elem) => {
    if (elem.type === types.USER) {
      setusers((prev) =>
        prev.map((item) => {
          if (item.id === elem.id) {
            return { ...item, checked: false };
          }
          return item;
        })
      );
    } else {
      setgroups((prev) =>
        prev.map((item) => {
          if (item.id === elem.id) {
            return { ...item, checked: false };
          }
          return item;
        })
      );
    }
  }, []);

  useEffect(() => {
    const width = 608;
    const maxWidth = 2 * width;
    let stoppingIndex = 0;
    let stoppingIndexFlag = 1;
    let sum = 0;
    checkedItems.forEach((elem, index) => {
      if (stoppingIndexFlag) {
        const item = document.createElement("div");
        item.style.cssText = `display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.23;
          letter-spacing: normal;
          text-align: left;
          color: #101010;
          overflow-wrap: break-word;
          width: max-content;
          user-select: none;`;
        item.innerText = elem[valueKey];
        document.body.appendChild(item);
        const itemWidth = item.getBoundingClientRect().width + 36 + 8;
        document.body.removeChild(item);
        if (itemWidth + sum <= width) sum = sum + itemWidth;
        else if (itemWidth + sum >= width && sum <= width)
          sum = sum + itemWidth + (width - sum);
        else if (itemWidth + sum >= width && itemWidth + sum <= maxWidth)
          sum = sum + itemWidth;
        else {
          stoppingIndex = index - 1;
          stoppingIndexFlag = 0;
        }
      }
    });
    // console.log(sum);
    setlimit(stoppingIndex > 0 ? stoppingIndex : checkedItems.length);
    // console.log("INDEX", stoppingIndex);
  }, [checkedItems]);

  const handleSend = () => {
    const request = {
      SourceUserID: +tableData.SourceUserID,
      IsUserReport: false,
      ReportID: tableData.ReportID,
      Users: checkedUsersIds,
      Groups: checkedGroupsIds,
    };
    apiCall("CopyReportStructure", "POST", request).then((res) => {
      if (res.error !== null) {
        notifyErrorToast(
          t(translations.FORMS.Error),
          t(translations.TABLE.TABLE_SHARED_ERR),
          3000
        );
      } else {
        notifySuccessToast(
          t(translations.EditableTable.SuccessToast),
          t(translations.TABLE.TABLE_SHARED),
          3000
        );
      }
    });

    onClose();
  };
  return createPortal(
    <Container>
      <Wrapper>
        <Header>
          <TitleWrapper>
            <ShareIconItemStyled />
            <Title>Share Customised Table</Title>
          </TitleWrapper>

          <SubTitle>
            Select groups and / or individual users you would like to share the
            table with
          </SubTitle>
          <CloseIconStyled onClick={onClose} />
        </Header>
        {checkedItems.length > 0 && (
          <ItemsContainer>
            {checkedItems.slice(0, limit).map((elem) => (
              <ItemWrapper key={elem.id}>
                <ItemContent>{elem[valueKey]}</ItemContent>
                <CloseIconItemStyled onClick={() => handleDeleteItem(elem)} />
              </ItemWrapper>
            ))}
            {limit !== checkedItems.length && (
              <ItemWrapper>
                <ItemContent>
                  +{checkedItems.length - limit + " "}
                  More
                </ItemContent>
              </ItemWrapper>
            )}
          </ItemsContainer>
        )}
        {checkedItems.slice(0, limit).length > 0 && <LineDivider />}
        <SearchWrapper>
          <SearchField
            value={search}
            onChange={handleSearchChange}
            placeholder={"Search for user groups and users"}
          />
        </SearchWrapper>
        <MainSection>
          <SelectionWrapper>
            <Selection
              items={groups.filter(FilterBySearch)}
              title={"Groups"}
              handlecheck={handleCheckItemGroup}
              handlecheckall={handleCheckAllGroups}
            />
          </SelectionWrapper>

          <Divider />
          <SelectionWrapper>
            <Selection
              items={users.filter(FilterBySearch)}
              title={"Users"}
              handlecheck={handleCheckItemUser}
              handlecheckall={handleCheckAllUsers}
            />
          </SelectionWrapper>
        </MainSection>
        <FooterStyled>
          <Button
            label={"Cancel"}
            onClick={onClose}
            width="100px"
            size="md"
            variant="purple-secondary"
          />
          <Button
            label={"Send"}
            onClick={handleSend}
            width="100px"
            size="md"
            variant="purple"
            disabled={!checkedItems.length}
          />
        </FooterStyled>
      </Wrapper>
    </Container>,
    document.body
  );
};

export default ShaereTable;
