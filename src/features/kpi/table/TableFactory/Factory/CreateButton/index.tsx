import * as Styled from "./style";
import plusImg from "../../../../assets/img/Create_blue.svg";
import { useDispatch } from "react-redux";
import { setCreateState, setIsCreate } from "../../../../reducer";
import { FC } from "react";
import { initialCreateState } from "../../../../reducer";

interface IProps {
  departmentName: string;
  departmentID: number;
}

const CreateButtonFactory: FC<IProps> = ({ departmentName, departmentID }) => {
  const dispatch = useDispatch();

  const onClickCraete = () => {
    dispatch(setIsCreate());
    dispatch(
      setCreateState({
        ...initialCreateState,
        DepartmentName: departmentName,
        departmentID: departmentID,
      })
    );
  };

  return (
    <Styled.CreateWrapper onClick={onClickCraete}>
      <Styled.CreateImgWrapper>
        <img src={plusImg} alt="" />
      </Styled.CreateImgWrapper>
      <Styled.CreateText>Create New KPI</Styled.CreateText>
    </Styled.CreateWrapper>
  );
};

export default CreateButtonFactory;
