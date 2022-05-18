import {
  DropDownIcon,
  IconContainer,
  Label,
  ModalContainer,
  ModalItem,
  SplitButtonContainer,
  Wrapper,
} from "./styles";
import arrow from "../../../../assets/icons/Arowdropdown.svg";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

type SplitButtonProps = {
  label: string;
  onButtonClick: () => void;
  modalItems: {
    label: string;
    onClickAction: () => void;
  }[];
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  disabled?: boolean;
};

export default function SplitButton({
  label,
  onButtonClick,
  modalItems,
  showModal,
  setShowModal,
  disabled = false,
}: SplitButtonProps) {
  const onIconClick = () => {
    !disabled && setShowModal(!showModal);
  };

  const handleButtonClick = () => {
    !disabled && onButtonClick();
  };

  return (
    <ClickAwayListener onClickAway={() => setShowModal(false)}>
      <Wrapper>
        <SplitButtonContainer disabled={disabled}>
          <Label onClick={handleButtonClick}>{label}</Label>
          <IconContainer onClick={onIconClick} disabled={disabled}>
            <DropDownIcon src={arrow} alt="arrow icon" />
          </IconContainer>
        </SplitButtonContainer>
        {showModal && (
          <ModalContainer>
            {modalItems.map((item, idx) => (
              <ModalItem key={idx} onClick={item.onClickAction}>
                {item.label}
              </ModalItem>
            ))}
          </ModalContainer>
        )}
      </Wrapper>
    </ClickAwayListener>
  );
}
