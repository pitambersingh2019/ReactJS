import {
  EditableInputContainer,
  HiddenSpan,
  InputContainer,
  InputField,
  PencilIcon,
} from "./styles";
import pencil from "../../../assets/icons/pencil.svg";
import { useEffect, useRef, useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { useFocus } from "./useFocus";
import Tooltip from "../../../features/process-control-dashboard/components/shared/Tooltip/Tooltip";

export type EditableInputProps = {
  value?: string;
  onChangeValue: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  variant?: "sm" | "lg";
  maxCharacters?: number;
  tooltipValue?: string;
  onBlur?: () => void;
  showEditPencil?: boolean;
  maxWidth?: number; //in px
  disabledInput?: boolean;
};

export default function EditableInput({
  value,
  onChangeValue,
  maxLength = 524288,
  placeholder,
  variant = "sm",
  maxCharacters = 1000,
  tooltipValue,
  onBlur,
  showEditPencil,
  maxWidth = 4000,
  disabledInput = false,
}: EditableInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [editMode, setEditMode] = useState(false);
  const minWidth = variant === "sm" ? 130 : 214;
  const [width, setWidth] = useState(minWidth);
  const [isOverflowActive, setIsOverflowActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputRef, setInputFocus] = useFocus();

  const onEdit = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setEditMode(true);
  };

  const onInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!disabledInput) {
      e.stopPropagation();
      setEditMode(true);
    }
  };

  const onExitEditMode = () => {
    if (editMode) {
      setEditMode(false);
      if (value && value.length <= maxCharacters)
        //update input width based on the actual content
        spanRef.current && setWidth(spanRef.current.offsetWidth + 20);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onChangeValue(inputValue || "");
      onExitEditMode();
    }
  };

  const handleBlur = () => {
    onChangeValue(inputValue || "");
    onExitEditMode();
    onBlur && onBlur();
  };

  const handleHover = () => {
    isOverflowActive && setShowTooltip(true);
  };

  const hideTooltip = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    editMode && setInputFocus();
  }, [editMode, setInputFocus]);

  //autogrow input
  useEffect(() => {
    if (!spanRef.current) return;
    const contentWidth = spanRef.current.offsetWidth + 40; //40 - padding + other
    if (contentWidth < maxWidth && contentWidth > minWidth) {
      setWidth(contentWidth);
    }
    if (contentWidth >= maxWidth) {
      setWidth(maxWidth);
    }
  }, [value, minWidth, maxWidth]);

  useEffect(() => {
    if (!value) return;
    //when in not edit mode, show cut value with ellipsis for value length more than max characters
    if (!editMode && value.length > maxCharacters) {
      setWidth(300); //300px - width of 30 characters for sm variant
      setIsOverflowActive(true);
    }
    //set initial width
    if (value && !editMode && spanRef.current) {
      setWidth(spanRef.current.offsetWidth + 30);
    }
  }, [editMode, maxCharacters, value]);

  return (
    <ClickAwayListener onClickAway={onExitEditMode}>
      <EditableInputContainer
        onMouseEnter={handleHover}
        onMouseLeave={hideTooltip}
        onClick={onInputClick}
      >
        <InputContainer variant={variant} disabledInput={disabledInput}>
          {/* autogrow input */}
          <HiddenSpan ref={spanRef} variant={variant}>
            {value}
          </HiddenSpan>
          <InputField
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            maxLength={maxLength}
            disabled={!editMode}
            onKeyDown={onKeyDown}
            ref={inputRef}
            width={width}
            variant={variant}
            onBlur={handleBlur}
            disabledInput={disabledInput}
          />
        </InputContainer>
        {showEditPencil && (
          <PencilIcon src={pencil} alt="pencil icon" onClick={onEdit} />
        )}
        {showTooltip && <Tooltip content={tooltipValue || value || ""} />}
      </EditableInputContainer>
    </ClickAwayListener>
  );
}
