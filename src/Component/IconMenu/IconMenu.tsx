import * as React from "react";
// import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import { useSelector } from "../../utils/React2Ang/useCustoms";
import { selectLanguage } from "../../slice/selectors";
import { isLocalLanguage } from "../../utils/CommonFunctions";
import card_pencil_edit from "../../assets/icons/card_pencil_edit.svg";
import { StyledIconMenu } from "../../Containers/RuleContainer/Components/Card/styles";
import card_duplicate from "../../assets/icons/card_duplicate.svg";
import card_delete from "../../assets/icons/card_delete.svg";

const ITEM_HEIGHT = 48;

const IconDiv = styled.div`
  cursor: pointer;
`;

const ButtonIcon = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: transparent;
  border: none;

  > .MuiSvgIcon-root {
    color: #757575;
    font-size: 1.3em;
    cursor: pointer;
  }
`;

interface IconMenuInterface {
  data: { id: number; name: string }[];
  onClickItem: (option: number) => void;
}

const IconMenu: React.FC<IconMenuInterface> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentLanguage = useSelector(selectLanguage);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemclick = (optionId: number) => {
    setAnchorEl(null);
    props.onClickItem(optionId);
  };

  return (
    <IconDiv>
      <ButtonIcon onClick={handleClick}>
        <MoreVertIcon />
      </ButtonIcon>
      <Menu
        id="long-menu"
        anchorOrigin={{
          vertical: "top",
          horizontal: isLocalLanguage(currentLanguage) ? "left" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isLocalLanguage(currentLanguage) ? "right" : "left",
        }}
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {props.data.map((option) => (
          <MenuItem
            style={{ fontSize: "14px" }}
            key={option.id}
            onClick={() => handleItemclick(option.id)}
          >
            {option.id === 0 ? (
              <StyledIconMenu width={20} height={15} src={card_pencil_edit} />
            ) : option.id === 1 ? (
              <StyledIconMenu width={20} height={18} src={card_duplicate} />
            ) : (
              <StyledIconMenu width={20} height={20} src={card_delete} />
            )}
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </IconDiv>
  );
};
export default IconMenu;
