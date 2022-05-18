import React from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { useDispatch, useSelector } from "react-redux";
import { SetEditing, SetAllCollapsStatus } from "../../slice/index";
import { selectEditMode, selectCollapsStatus } from "../../slice/selectors";
import { selectIsRtl } from "../../../../slice/selectors";
import EditIcon from "@material-ui/icons/Edit";
import UpdateStatus from "./UpdateStatus/UpdateStatus";
import {
  HeaderContainer,
  StyledCollapsAll,
  StyledEditButton,
  SideGroup,
} from "./header.styles";

interface HeaderProps {
  showBarOnScroll: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBarOnScroll }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  const isRtl = useSelector(selectIsRtl);
  const collapsStatus = useSelector(selectCollapsStatus);
  const collapsAll = collapsStatus.every((ele) => ele === false);

  const handleEditMode = () => {
    dispatch(SetEditing(true));
  };

  const handleCollapsAll = () => {
    dispatch(SetAllCollapsStatus(collapsAll));
  };

  return (
    <HeaderContainer showBarOnScroll={showBarOnScroll}>
      <StyledCollapsAll onClick={handleCollapsAll}>
        {collapsAll
          ? t(translations.ProductRecipe.EXPAND_ALL)
          : t(translations.ProductRecipe.COLLAPSE_ALL)}
      </StyledCollapsAll>
      <SideGroup>
        <UpdateStatus />
        <StyledEditButton onClick={handleEditMode} editing={editMode}>
          <EditIcon
            style={{
              fontSize: "18px",
              marginLeft: isRtl === "rtl" ? "4px" : "0",
              marginRight: isRtl === "rtl" ? "0" : "4px",
            }}
          />
          {editMode
            ? t(translations.ProductRecipe.EDITING)
            : t(translations.ProductRecipe.EDIT_RECIPE)}
        </StyledEditButton>
      </SideGroup>
    </HeaderContainer>
  );
};

export default Header;
