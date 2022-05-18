import { ModalTitle, TitleContainer, TitleIcon } from "./styles";

type TitleProps = {
  icon: string;
  titleText: string;
};

export default function Title({ icon, titleText }: TitleProps) {
  return (
    <TitleContainer>
      <TitleIcon src={icon} alt="icon" />
      <ModalTitle>{titleText}</ModalTitle>
    </TitleContainer>
  );
}
