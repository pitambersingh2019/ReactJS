import { FC } from "react";
import * as Styled from "./style";
import editImg from "../../../../assets/img/edit_big.svg";
import { useDispatch } from "react-redux";
import { setStepCreate } from "../../../../reducer";

type TStep = 1 | 2 | 3;
interface IProps {
  step: TStep;
  title: string;
  gap: number;
  img?: string;
}

const Result: FC<IProps> = ({ title, gap, img, step, children }) => {
  const dispatch = useDispatch();

  const onClickEdit = (step: TStep) => {
    dispatch(setStepCreate({ step }));
  };

  return (
    <Styled.Wrapper>
      <Styled.HeaderWrapper>
        <Styled.TitleWrapepr>
          {img && (
            <Styled.TitleImg>
              <img src={img} />
            </Styled.TitleImg>
          )}
          <Styled.Title>{title}</Styled.Title>
        </Styled.TitleWrapepr>
        <Styled.ResultEdit
          onClick={() => {
            onClickEdit(step);
          }}
        >
          <img src={editImg} />
        </Styled.ResultEdit>
      </Styled.HeaderWrapper>
      <Styled.WrapperContent gap={gap}>{children}</Styled.WrapperContent>
    </Styled.Wrapper>
  );
};

export default Result;
