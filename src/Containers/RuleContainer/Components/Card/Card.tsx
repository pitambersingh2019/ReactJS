import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
//import EditIcon from "@material-ui/icons/Edit";
//import FileCopyIcon from "@material-ui/icons/FileCopy";
//import DeleteIcon from "@material-ui/icons/Delete";
import PopupDelete from "../Popup/PopupDelete";
import {
  CardWrapper,
  CardContainer,
  SwitchContainer,
  SwitchName,
  SwitchTitle,
  SwitchSubtitle,
  Name,
  Footer,
  Info,
  CardDropDownContainer,
  CardDropDown,
  CardDropDownList,
  CardDropDownRow,
  Popup,
  InfoContainer,
  NewContainer,
  HeaderSwitchAndTitle,
  IsActiveLoadingContainer,
  IsDeleteLoadingContainer,
  Line,
  StyledIconMenu,
  MenuIconStyled3Dots,
} from "./styles";

import card_pencil_edit from "../../../../../src/assets/icons/card_pencil_edit.svg";
import card_duplicate from "../../../../../src/assets/icons/card_duplicate.svg";
import card_delete from "../../../../../src/assets/icons/card_delete.svg";
import { LESS_THAN_MIN, FEW_SECONDS_AGO } from "../../../../utils/Constants";

import { Badge } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";
import Switch from "../../../../Component/Switch/Swtich";
import {
  CardsInterface,
  DeleteTriggerInterface,
  setActiveTriggerInterface,
  RulesContainerSlice,
} from "../../slice/types";
import { useDispatch, useSelector } from "react-redux";
import { SetActiveTriggerCard, DeleteTrigger } from "../../slice";
import {
  selectActivateRuleSwitch,
  selectDeletedRule,
} from "../../slice/selectors";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import {
  timeAgo,
  DateTime,
  timeAgoLastFired,
} from "../../../../utils/CommonFunctions";

import CircularProgress from "@mui/material/CircularProgress";
import { LoadingTitle, LoadingContainer } from "../../styles";
import {
  TooltipDateCard,
  TooltipNameCard,
} from "../../../../Component/ToolTip/ToolTipMUI";
interface CardProps {
  children?: ReactNode;
  data: CardsInterface;
  //to send to CardView
  handleClickEdit: (data: CardsInterface) => void;
  handleClickDuplicate: (data: CardsInterface) => void;
}

// eslint-disable-next-line react/display-name
const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const [checked, setChecked] = useState(props.data.IsActive);
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [popupState, setPopupState] = useState("");
  const dropdownRef = useRef(null);
  const [TimeStamp, setTimeStamp] = useState<{ update: string; fired: string }>(
    { update: "", fired: "" }
  );
  const [badge, setbadge] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { data } = props;
  const { t } = useTranslation();

  const Activate_data: RulesContainerSlice["Triggers"]["ActivateRule"] =
    useSelector(selectActivateRuleSwitch);
  const Deleted_data: RulesContainerSlice["Triggers"]["DeleteRules"] =
    useSelector(selectDeletedRule);

  const onToggleChange = useCallback(() => {
    let ruletext = "";
    if (data.triggerText.toLocaleLowerCase().includes("every day")) {
      ruletext += "Every day";
    } else if (data.triggerText.toLocaleLowerCase().includes("every week")) {
      ruletext += "Every week";
    } else if (data.triggerText.toLocaleLowerCase().includes("every month")) {
      ruletext += "Every month";
    } else {
      ruletext += "Every time period";
    }

    const dispatchObject: setActiveTriggerInterface = {
      ID: data.TriggerGroupID,
      Name: data.name,
      RuleText: ruletext,
      IsActive: checked ? 0 : 1,
    };

    setChecked((prev) => !prev);
    setTimeout(() => dispatch(SetActiveTriggerCard(dispatchObject)), 100);
  }, [checked, data.TriggerGroupID, data.name, data.triggerText, dispatch]);

  const handleMenuClick = () => {
    setMenuIsActive(!menuIsActive);
  };

  const handleClickEdit = () => {
    setMenuIsActive(!menuIsActive);
    //send to CardView
    props.handleClickEdit(props.data);
  };

  const handleClickDuplicate = () => {
    setMenuIsActive(!menuIsActive);
    props.handleClickDuplicate(props.data);
  };

  const handleClickDelete = () => {
    setMenuIsActive(!menuIsActive);
    setDeleteClicked(!deleteClicked);
  };

  const handlePopUpClicked = (title: string) => {
    setPopupState(title);
    setDeleteClicked(false);
    if (title === "cancel") {
      //do nothing
    } else if (title === "delete") {
      //if message or notifcation or call (NotificationType is number) then send Triggertypr 2, else if task then TriggerType 1
      let TriggerType = 0;
      if (typeof props.data.NotificationType == "number") {
        TriggerType = 2;
      } else {
        TriggerType = 1;
      }

      const dispatchObject: DeleteTriggerInterface = {
        ID: props.data.TriggerGroupID,
        TriggerType: TriggerType,
        Name: props.data.name,
      };

      dispatch(DeleteTrigger(dispatchObject));
    }
  };

  useEffect(() => {
    let updateCreateDate = "";
    let lastFired = "";
    if (data.CreateDate) {
      const time = timeAgo(data.CreateDate);
      if (time[1] === "DATE") {
        updateCreateDate = time[0].toString();
      } else {
        const str_time =
          t(translations.RulesContainer.CARD.UPDATED) +
          " " +
          (time[0] === 0
            ? t(translations.RulesContainer.CARD[time[1]])
            : time[0] + " " + t(translations.RulesContainer.CARD[time[1]]));

        updateCreateDate = str_time;
      }

      if (time[1] === LESS_THAN_MIN || time[1] === FEW_SECONDS_AGO)
        setbadge(true);
    }

    if (data.LastRunTime) {
      const time = timeAgoLastFired(data.LastRunTime);
      if (time[1] === "DATE") {
        lastFired = time[0].toString();
        // setTimeStamp((prev) => ({ ...prev, fired: time[0].toString() }));
      } else {
        const str_time =
          t(translations.RulesContainer.CARD.FIRED) +
          " " +
          (time[0] === 0
            ? t(translations.RulesContainer.CARD[time[1]])
            : time[0] + " " + t(translations.RulesContainer.CARD[time[1]]));
        lastFired = str_time;
        // setTimeStamp((prev) => ({ ...prev, fired: str_time }));
      }
    }
    setTimeStamp({ fired: lastFired, update: updateCreateDate });
  }, [data.CreateDate, data.LastRunTime, t]);

  return (
    <ClickAwayListener onClickAway={() => setMenuIsActive(false)}>
      <CardContainer switchOn={checked} ref={ref}>
        <CardWrapper clicked={false}>
          <HeaderSwitchAndTitle>
            <SwitchContainer>
              <div onClick={onToggleChange}>
                <Switch IsActive={checked} />
              </div>

              {props.data.LastRunTime ? (
                <TooltipDateCard
                  title={DateTime(props.data.LastRunTime)}
                  placement="bottom-start"
                >
                  <SwitchName>{TimeStamp.fired}</SwitchName>
                </TooltipDateCard>
              ) : (
                <SwitchName>{TimeStamp.fired}</SwitchName>
              )}

              <MenuIconStyled3Dots onClick={handleMenuClick} />
              <CardDropDownContainer>
                <CardDropDown isActive={menuIsActive} ref={dropdownRef}>
                  <ul>
                    <li>
                      <CardDropDownList onClick={() => handleClickEdit()}>
                        <CardDropDownRow>
                          {/*<EditIcon style={{ fontSize: "1.8em" }} />*/}
                          <StyledIconMenu
                            width={20}
                            height={15}
                            src={card_pencil_edit}
                          />
                          {t(translations.RulesContainer.CARD.EDIT)}
                        </CardDropDownRow>
                      </CardDropDownList>
                    </li>
                    <li>
                      <CardDropDownList onClick={() => handleClickDuplicate()}>
                        <CardDropDownRow>
                          {/*<FileCopyIcon style={{ fontSize: "1.8em" }} />*/}
                          <StyledIconMenu
                            width={20}
                            height={20}
                            src={card_duplicate}
                          />
                          {t(translations.RulesContainer.CARD.DUPLICATE)}
                        </CardDropDownRow>
                      </CardDropDownList>
                    </li>
                    <li>
                      <CardDropDownList onClick={() => handleClickDelete()}>
                        <CardDropDownRow>
                          {/*<DeleteIcon style={{ fontSize: "1.8em" }} />*/}
                          <StyledIconMenu
                            width={20}
                            height={20}
                            src={card_delete}
                          />
                          {t(translations.RulesContainer.CARD.DELETE)}
                        </CardDropDownRow>
                      </CardDropDownList>
                    </li>
                  </ul>
                </CardDropDown>
              </CardDropDownContainer>
            </SwitchContainer>

            <SwitchTitle>{props.data.name}</SwitchTitle>
            <SwitchSubtitle>{props.data.triggerText}</SwitchSubtitle>
          </HeaderSwitchAndTitle>

          <Footer>
            {props.data.GroupCreateUser.length > 30 ? (
              <TooltipNameCard
                title={props.data.GroupCreateUser}
                placement="top-start"
              >
                <Name>{props.data.GroupCreateUser.slice(0, 25)}...</Name>
              </TooltipNameCard>
            ) : (
              <Name>{props.data.GroupCreateUser}</Name>
            )}

            <Line />
            <InfoContainer>
              <TooltipDateCard
                title={DateTime(props.data.CreateDate)}
                placement="top-start"
              >
                <Info newIsVisible={TimeStamp.update.length > 30}>
                  {TimeStamp.update}
                </Info>
              </TooltipDateCard>

              <Badge badgeContent={1} color={"primary"} invisible={true}>
                <NewContainer isVisible={badge}>
                  {t(translations.RulesContainer.CARD.NEW)}
                </NewContainer>
              </Badge>
            </InfoContainer>
          </Footer>
        </CardWrapper>

        <Popup deleteClicked={deleteClicked}>
          <PopupDelete
            id={props.data.TriggerGroupID}
            handlePopUpClicked={(title) => handlePopUpClicked(title)}
          />
        </Popup>
        {Deleted_data.find((id) => id === data.TriggerGroupID) !== undefined ? (
          <IsDeleteLoadingContainer>
            <LoadingContainer>
              <LoadingTitle>Deleting Rule...</LoadingTitle>
              <CircularProgress />
            </LoadingContainer>
          </IsDeleteLoadingContainer>
        ) : null}

        {Activate_data.find((id) => id === data.TriggerGroupID) !==
        undefined ? (
          <IsActiveLoadingContainer>
            <LoadingContainer>
              <LoadingTitle>
                {checked ? "Switching On..." : "Switching Off..."}
              </LoadingTitle>
              <CircularProgress />
            </LoadingContainer>
          </IsActiveLoadingContainer>
        ) : null}
      </CardContainer>
    </ClickAwayListener>
  );
});

export default Card;
