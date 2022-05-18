import React, { useCallback, useMemo, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import GridIcon from "@material-ui/icons/Apps";
import {
  Filtercontainer,
  Filteritems,
  IconFilter,
  Filtermenu,
  DeleteSelectedItemContainer,
  DeleteTitle,
  Button,
  IconFilterNew,
} from "./styles";

import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { useDispatch, useSelector } from "react-redux";
import {
  SetViewOfRules,
  SetFilter,
  SetSort,
  DeleteSelectedRules,
  SetSortType,
} from "../../slice";
import {
  selectViewRules,
  selectIsSelectedRuleInTable,
  selectSortBy,
  selectFilterBy,
} from "../../slice/selectors";
import { VIEW_ROWS_GRID, SORTBY, FILTERBY } from "../../slice/types";
import SelectIcon from "../../../../Component/SelectIcon/SelectIcon";
import FilterIconSVG from "../../../../assets/icons/filterNew.svg";
import SortIconSVG from "../../../../assets/icons/Ascending_Dscending.svg";
import ConfirmDialog from "../../../../Component/Dialog/ConfirmDialog";
import { StyledIconMenu } from "../Card/styles";
import card_delete from "../../../../assets/icons/card_delete.svg";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FilterProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Filter: React.FC<FilterProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filter_selected: FILTERBY = useSelector(selectFilterBy);
  const sort_selected: SORTBY = useSelector(selectSortBy);
  const [rotate, setRotate] = useState(false);

  const get_selected_filter = () => {
    if (filter_selected === FILTERBY.ALL) {
      return filteredList[0];
    } else if (filter_selected === FILTERBY.TIME_TRIGGER_RULES) {
      return filteredList[1];
    } else if (filter_selected === FILTERBY.MACHINE_STOP_RULES) {
      return filteredList[2];
    } else if (filter_selected === FILTERBY.DEVIATION_PARAMETER) {
      return filteredList[3];
    } else if (filter_selected === FILTERBY.SPC_PARAMETER) {
      return filteredList[4];
    } else if (filter_selected === FILTERBY.CREATE_BY_ME) {
      return filteredList[5];
    } else if (filter_selected === FILTERBY.NOT_CREATE_BY_ME) {
      return filteredList[6];
    } else {
      return filteredList[0];
    }
  };

  const get_selected_sort = () => {
    if (sort_selected === SORTBY.ACTIVE_FIRST) {
      return sortedList[2];
    } else if (sort_selected === SORTBY.DATE_CREATED) {
      return sortedList[0];
    } else if (sort_selected === SORTBY.ALPHABET) {
      return sortedList[1];
    } else if (sort_selected === SORTBY.LAST_FIRED) {
      return sortedList[3];
    } else {
      return sortedList[0];
    }
  };

  const filteredList = useMemo(
    () => [
      {
        label: t(translations.RulesContainer.FILTER.ALL),
        value: 1,
      },
      {
        label: t(translations.RulesContainer.FILTER.TIME_TRIGGER_RULES),
        value: 2,
      },
      {
        label: t(translations.RulesContainer.FILTER.MACHINE_STOPS_RULES),
        value: 3,
      },
      {
        label: t(translations.RulesContainer.FILTER.DEVIATION),
        value: 4,
      },
      {
        label: t(translations.RulesContainer.FILTER.SPC),
        value: 5,
      },
      {
        label: t(translations.RulesContainer.FILTER.CREATED_BY_ME),
        value: 6,
      },
      {
        label: t(translations.RulesContainer.FILTER.NOT_CREATED_BY_ME),
        value: 7,
      },
    ],
    [t]
  );

  const sortedList = useMemo(
    () => [
      {
        label: t(translations.RulesContainer.FILTER.DATE_CREATED),
        value: 1,
      },
      {
        label: t(translations.RulesContainer.FILTER.ALPHABET),
        value: 2,
      },
      {
        label: t(translations.RulesContainer.FILTER.ACTIVE_FIRST),
        value: 3,
      },
      {
        label: t(translations.RulesContainer.FILTER.LAST_FIRED),
        value: 4,
      },
    ],
    [t]
  );

  //handle sort click
  const handleSort = useCallback(
    (label: string, value: number) => {
      console.log("handleSort");
      switch (value) {
        case 1:
          dispatch(SetSort(SORTBY.DATE_CREATED));
          break;
        case 2:
          dispatch(SetSort(SORTBY.ALPHABET));
          break;
        case 3:
          dispatch(SetSort(SORTBY.ACTIVE_FIRST));
          break;
        case 4:
          dispatch(SetSort(SORTBY.LAST_FIRED));
          break;
        default:
          dispatch(SetSort(SORTBY.ACTIVE_FIRST));
          break;
      }
    },
    [dispatch]
  );

  //handle filter click
  const handleFilter = useCallback(
    (label: string, value: number) => {
      console.log("handleFilter ", value);
      switch (value) {
        case 1:
          dispatch(SetFilter(FILTERBY.ALL));
          break;
        case 2:
          dispatch(SetFilter(FILTERBY.TIME_TRIGGER_RULES));
          break;
        case 3:
          dispatch(SetFilter(FILTERBY.MACHINE_STOP_RULES));
          break;
        case 4:
          dispatch(SetFilter(FILTERBY.DEVIATION_PARAMETER));
          break;
        case 5:
          dispatch(SetFilter(FILTERBY.SPC_PARAMETER));
          break;
        case 6:
          dispatch(SetFilter(FILTERBY.CREATE_BY_ME));
          break;
        case 7:
          dispatch(SetFilter(FILTERBY.NOT_CREATE_BY_ME));
          break;
        default:
          dispatch(SetFilter(FILTERBY.ALL));
          break;
      }
    },
    [dispatch]
  );

  //onIconSort Click
  const IconSortClickHandler = () => {
    dispatch(SetSortType());
    setRotate(!rotate);
  };

  //display filter or delete template
  const selected_items: number[] = useSelector(selectIsSelectedRuleInTable);
  const isThereSelectedItemsInTableToDelete = () => {
    if (selected_items.length > 0) {
      return true;
    }
    return false;
  };

  //change between Table and Grid
  const ViewRulesState = useSelector(selectViewRules);
  const ToggleIconChange = () => {
    dispatch(SetViewOfRules());
  };

  const handleDeleteSelected = () => {
    dispatch(DeleteSelectedRules());
  };

  return (
    <Filtercontainer>
      {isThereSelectedItemsInTableToDelete() === false ? (
        <Filteritems>
          <SelectIcon
            Icon={<IconFilterNew src={FilterIconSVG} alt="filter" />}
            data={filteredList}
            border={false}
            handleItemClicked={handleFilter}
            fitContent={false}
            width={185}
            selected={get_selected_filter()}
            IconOpen={true}
          />

          <SelectIcon
            Icon={
              <IconFilter
                src={SortIconSVG}
                alt="sort"
                onClick={IconSortClickHandler}
                rotate={rotate.toString()}
              />
            }
            data={sortedList}
            border={false}
            handleItemClicked={handleSort}
            fitContent={false}
            width={150}
            selected={get_selected_sort()}
          />
        </Filteritems>
      ) : (
        <DeleteSelectedItemContainer>
          <DeleteTitle>
            {t(translations.RulesContainer.TABLE.SELECTED_RULES_TO_DEL)}:
            {selected_items.length}
          </DeleteTitle>
          <ConfirmDialog
            Title={t(translations.RulesContainer.TABLE.CONFIRM)}
            Content={t(translations.RulesContainer.TABLE.DELETE_RULE_CONTENT)}
            onConfirm={handleDeleteSelected}
          >
            <Button>
              {/*<DeleteOutlinedIcon*/}
              {/*  style={{ fontSize: "1.4em" }}*/}
              {/*></DeleteOutlinedIcon>*/}
              <StyledIconMenu width={20} height={20} src={card_delete} />
              {t(translations.RulesContainer.CARD.DELETE)}
            </Button>
          </ConfirmDialog>

          {/* {selected_items.length === 1? <ConfirmDialog Title={"Confirm"} Content={t(translations.RulesContainer.TABLE.DUP_RULE_CONTENT)} onConfirm={handleDeleteSelected}>
                        <Button>
                            <FileCopyIcon style={{ fontSize: '1.3em' }} ></FileCopyIcon>
                            {t(translations.RulesContainer.CARD.DUPLICATE)}
                        </Button>
                    </ConfirmDialog> : null} */}
        </DeleteSelectedItemContainer>
      )}

      <Filtermenu onClick={ToggleIconChange}>
        {ViewRulesState === VIEW_ROWS_GRID.GRID ? (
          <MenuIcon style={{ fontSize: "0.9em" }} />
        ) : (
          <GridIcon style={{ fontSize: "0.9em" }} />
        )}
      </Filtermenu>
    </Filtercontainer>
  );
};

export default Filter;
