import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as Styled from "./style";
import dots from "./../../../../../assets/img/horizontal_3_dots.svg";
import CreateSettingPoint from "./CreateSettingPoint";
import editImg from "./../../../../../assets/img/Edit.svg";
import editWhiteImg from "./../../../../../assets/img/Edit_White.svg";
import deleteImg from "./../../../../../assets/img/delete.svg";
import deleteWhiteImg from "./../../../../../assets/img/delete_White.svg";
import EditComponent from "./editComponent";
import { CreateKPIContext } from "../../../..";
import { IFirstStep, IFormulaComponent } from "../../../../types";

interface IProps {
  params?: string[];
}

interface IEditPosition {
  top: number;
  left: number;
}

interface IEditWidth {
  width: number;
}

interface IPosDots {
  left: number;
  right: number;
  top: number;
}

const onClickDelete = (
  formulaComponent: IFormulaComponent[],
  activeElement: number,
  setStep: Dispatch<SetStateAction<IFirstStep>>
) => {
  const component = formulaComponent[activeElement].component;
  const newFormulaComponent = [...formulaComponent];
  const formulaName = formulaComponent.map((item) => item.props.name);

  if (component === "FuncComponent") {
    let lastIndex = formulaName.indexOf(")", activeElement);
    if (newFormulaComponent[lastIndex + 1].component === "CalComponent") {
      lastIndex++;
    }
    newFormulaComponent.splice(activeElement, lastIndex - activeElement + 1);
  }

  if (component === "ParamComponent") {
    let deletCount = 1;
    if (formulaComponent[activeElement + 1].component === "CalComponent") {
      deletCount++;
    }
    newFormulaComponent.splice(activeElement, deletCount);
  }
  if (component === "CalComponent") {
    let deleteCount = 0;
    let point = activeElement;
    const isNumber = (point: number) =>
      isFinite(parseInt(formulaComponent[point].props.name)) ||
      formulaComponent[point].props.name === ".";
    const isSign = (point: number) =>
      isNaN(parseInt(formulaComponent[point].props.name)) &&
      formulaComponent[point].props.name !== ".";
    if (isNumber(point)) {
      while (
        point !== 0 &&
        formulaComponent[point].component === "CalComponent" &&
        isNumber(point)
      ) {
        point--;
      }
      if (point !== 0) {
        point++;
      }
    }

    for (let i = point; i < formulaComponent.length; i++) {
      deleteCount++;
      const element = formulaComponent[i + 1];
      const element2 = formulaComponent[i + 2];
      if (
        element.component === "PlusComponent" ||
        (element.component === "CalComponent" && isSign(i + 1))
      ) {
        if (element.component !== "PlusComponent" && isNumber(activeElement))
          deleteCount++;
        if (
          element.component === "PlusComponent" &&
          element2 &&
          element2.props.name === ")" &&
          formulaComponent[activeElement + 1].component === "FuncComponent"
        ) {
          deleteCount = deleteCount + 2;
        }
        break;
      }
    }

    newFormulaComponent.splice(point, deleteCount);
  }

  let newActiveElement = newFormulaComponent.findIndex(
    (item) => item.component === "PlusComponent"
  );

  setStep((prev) => ({
    ...prev,
    formulaComponent: newFormulaComponent,
    ActiveElement: newActiveElement,
  }));
};

const DotsSetting: FC<IProps> = ({ params }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [positionEdit, setPositionEdit] = useState<IEditPosition>({
    top: 0,
    left: 0,
  });
  const [editWidth, setEditWidth] = useState<IEditWidth>({ width: 0 });
  const [posDots, setPosDots] = useState<IPosDots>({
    left: 0,
    right: 0,
    top: 0,
  });
  const contextCreate = useContext(CreateKPIContext);

  useEffect(() => {
    if (!open) setOpenEdit(false);
  }, [open]);

  useEffect(() => {
    if (posDots?.top && editWidth?.width) {
      const direction = document.body.dir;
      let left: number;
      if (direction === "ltr") {
        left =
          window.innerWidth - posDots.right > editWidth.width + 104
            ? 104 + posDots.left
            : posDots.left - editWidth.width - 4;
      } else {
        left =
          posDots.left > editWidth.width + 104
            ? posDots.right - 104 - editWidth.width
            : posDots.right + 4;
      }
      setPositionEdit({ top: posDots.top + 16, left });
    }
  }, [editWidth, posDots]);

  const handleRefEdit = useCallback((node) => {
    const editRef = !!node && node.getBoundingClientRect();
    !!editRef && setEditWidth({ width: editRef.width });
  }, []);

  const handleRefDots = useCallback(
    (node) => {
      const posDotsRef = !!node && node.getBoundingClientRect();
      !!posDotsRef &&
        setPosDots({
          left: posDotsRef.left,
          right: posDotsRef.right,
          top: posDotsRef.top,
        });
    },
    [open]
  );

  if (contextCreate === null) return <div></div>;

  const { firstStepSetting, setFirstStepSetting } = contextCreate;
  const { formulaComponent, ActiveElement } = firstStepSetting;

  const onClickDots = () => {
    setOpen((prev) => !prev);
    if (!posDots?.top) return;
  };

  const onClickEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  const settingPoint = [
    {
      text: "Edit",
      isArrow: true,
      img: editImg,
      imgWhite: editWhiteImg,
      onClick: onClickEdit,
    },
    {
      text: "Delete",
      isArrow: false,
      img: deleteImg,
      imgWhite: deleteWhiteImg,
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClickDelete(formulaComponent, ActiveElement, setFirstStepSetting);
      },
    },
  ];

  return (
    <Styled.IsActiveWrapper dir={document.body.dir}>
      <Styled.WrapperSettingImg ref={handleRefDots} onClick={onClickDots}>
        <img src={dots} alt="" />
      </Styled.WrapperSettingImg>
      {open && (
        <>
          <Styled.WrapperSetting>
            <Styled.WrapperSettingPoint>
              {settingPoint.map((item) => (
                <CreateSettingPoint key={item.text} {...item} />
              ))}
            </Styled.WrapperSettingPoint>
            {openEdit && (
              <Styled.EditWrapper ref={handleRefEdit} {...positionEdit}>
                <EditComponent onClick={onClickDots} params={params} />
              </Styled.EditWrapper>
            )}
          </Styled.WrapperSetting>
          <Styled.WallSetting onClick={onClickDots} />
        </>
      )}
    </Styled.IsActiveWrapper>
  );
};

export default DotsSetting;
