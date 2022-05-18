import { FC } from "react";
import * as Styled from "./style";

interface IProps {
  imgCalendar: string;
  imgArrow: string;
  text?: string;
  onClickSetting?: () => void;
}

const SettingButton: FC<IProps> = ({
  imgCalendar,
  imgArrow,
  text,
  onClickSetting,
}) => {
  return (
    <Styled.ViewButton onClick={onClickSetting}>
      <Styled.ImgWrapper width={25}>
        <img src={imgCalendar} />
      </Styled.ImgWrapper>
      <Styled.Text>{text}</Styled.Text>
      <Styled.ImgWrapper width={20}>
        <img src={imgArrow} />
      </Styled.ImgWrapper>
    </Styled.ViewButton>
  );
};

export default SettingButton;
