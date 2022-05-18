import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetDetailMachine } from "../../../../slice";
import {
  selectTreeSelectedMachines,
  selectDetailMachine,
} from "../../../../slice/selectors";
import { selectIsRtl } from "../../../../../../slice/selectors";
import { TreeData } from "../../../../slice/types";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  StyledPreNext,
  StyledPreNextText,
  StyledPreNextButton,
} from "./preNext-header.styles";
import { getChildList } from "../../../../utils";

const PreNextHeader: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const treeSelectedMachines = useSelector(selectTreeSelectedMachines);
  const activeMachine = useSelector(selectDetailMachine);
  const isRtl = useSelector(selectIsRtl);
  const [childList, setChildList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (treeSelectedMachines.length > 0) {
      let tempChilds = getChildList(treeSelectedMachines);
      setChildList(tempChilds);
    }
  }, [treeSelectedMachines]);

  useEffect(() => {
    let index = childList.findIndex(
      (child: TreeData) => child.id === activeMachine?.id
    );
    setActiveIndex(index);
  }, [activeMachine, childList]);

  const handlePreNextMachine = (value: "pre" | "next") => {
    if (value === "pre") {
      dispatch(SetDetailMachine(childList[activeIndex - 1]));
    } else {
      dispatch(SetDetailMachine(childList[activeIndex + 1]));
    }
  };

  return (
    <StyledPreNext>
      <StyledPreNextButton
        onClick={() => activeIndex != 0 && handlePreNextMachine("pre")}
        disabled={activeIndex === 0}
      >
        {isRtl === "rtl" ? (
          <KeyboardArrowRightIcon style={{ fontSize: "18px" }} />
        ) : (
          <KeyboardArrowLeftIcon style={{ fontSize: "18px" }} />
        )}
        <StyledPreNextText>{t(translations.SPC.PRE_MACHINE)}</StyledPreNextText>
      </StyledPreNextButton>
      <StyledPreNextButton
        onClick={() =>
          activeIndex != childList.length - 1 && handlePreNextMachine("next")
        }
        disabled={activeIndex === childList.length - 1}
      >
        <StyledPreNextText>
          {t(translations.SPC.NEXT_MACHINE)}
        </StyledPreNextText>
        {isRtl === "rtl" ? (
          <KeyboardArrowLeftIcon style={{ fontSize: "18px" }} />
        ) : (
          <KeyboardArrowRightIcon style={{ fontSize: "18px" }} />
        )}
      </StyledPreNextButton>
    </StyledPreNext>
  );
};

export default PreNextHeader;
