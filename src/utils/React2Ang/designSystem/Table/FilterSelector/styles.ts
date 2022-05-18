import styled, { keyframes, css } from "styled-components";
import CloseIcon from "../SVG/CloseIcon";
import InitialStepIcon from "../SVG/TableFilterPapers";
import AddIcon from "../SVG/AddIcon";
import EditIcon from "../SVG/EditIcon";
import SaveIcon from "../SVG/SaveIcon";
// @ts-ignore
import rtl from "styled-components-rtl";
const animation = keyframes`
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(1);
  }
`;

export const FilterWrapper = styled.div<{ top: number }>`
  position: absolute;
  top: ${(p) => p.top}px;
  ${rtl`
    right: 0;
  `}
  z-index: 9999;
  width: 480px;
  max-height: 565px;
  min-height: 250px;
  height: calc(100vh - 200px);
  overflow-y: auto;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  background-color: #ffff;
  animation: ${animation} 0.2s linear;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  > * {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const FilterContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  width: 100%;
  height: 455px;
  gap: 8px;
`;
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #ecf1f7;
`;

export const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
  user-select: none;
`;

export const LoadFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
`;

export const TitleLoadFilter = styled.div`
  font-size: 16px;
  font-weight: 600;
  width: 400px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
       text-align: left;
  `}

  color: #404d61;
  user-select: none;
`;

export const DropDownWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DropDownAddWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;
export const InputTypeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;
export const FilterFieldAddWrapperButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const CloseIconStyled = styled(CloseIcon)`
  width: 20px;
  height: 20px;
  fill: #797e8d;
  cursor: pointer;
  :hover {
    fill: #1268fb;
  }
`;
export const EditIconStyled = styled(EditIcon)`
  width: 16px;
  height: 16px;
  .EditIconst1 {
    fill: #4a4a4a;
  }
  cursor: pointer;
  :hover {
    .EditIconst1 {
      fill: #1268fb;
    }
  }
`;

export const FooterStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;
`;

export const SaveChangesStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  gap: 16px;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  position: sticky;
  padding: 8px 0 8px 0;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.08);
  gap: 8px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
`;

export const CancelButton = styled.div<{ disabled: boolean }>`
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  border: ${(p) => (p.disabled ? "1px solid #ad9ebe" : "1px solid #5900d3")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  user-select: none;

  &:hover {
    color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  }
`;

export const ApplyButton = styled.div<{ disabled: boolean }>`
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  }
`;

export const SaveChangesButton = styled.div<{ disabled: boolean }>`
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  }
`;

export const FilterFieldsWrapper = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 300px;
`;
export const FilterFieldsContent = styled.div`
  background-color: #f6f7fc;
  width: 100%;
`;

export const InitialStepIconStyled = styled(InitialStepIcon)`
  width: 150px;
  height: 150px;
  fill: #797e8d;
`;

export const InitialStepIconWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const ListFilterItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  height: 300px;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    margin: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const FilterItemWrapper = styled.div`
  width: 100%;
  /* height: 40px; */
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f7fc;
  padding: 8px;
  z-index: 2;
`;

export const FilterItemContent = styled.div`
  /* height: 40px; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  overflow: hidden;
  word-break: break-all;
  ${rtl`
       text-align: left;
  `}

  color: #101010;
  user-select: none;
`;
export const FilterItemRightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const TitlesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;
export const InitialStepTextStyled = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #404d61;
`;

export const AddFilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const AddEditFilterWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  min-width: 130px;
  cursor: pointer;
`;

export const AddFilterRightSideWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 24px;
  flex: 1;
`;
export const ClearWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  padding: 5px;
  line-height: 1.21;
  letter-spacing: normal;
  ${rtl`
       text-align: left;
  `}
  color: #101010;
  text-decoration: underline;
  cursor: pointer;
`;
export const AddIconStyled = styled(AddIcon)<{ disabledColor: boolean }>`
  width: 20px;
  height: 20px;
  .AddIconst0 {
    fill: ${(p) => (p.disabledColor ? "#ad9ebe" : "#5900d3")};
  }
`;
export const AddFilterText = styled.div<{ disabledColor?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(p) => (p.disabledColor ? "#ad9ebe" : "#5900d3")};
  user-select: none;
`;

export const AddButtonFilterField = styled.div<{ disabled: boolean }>`
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  border: ${(p) => (p.disabled ? "1px solid #ad9ebe" : "1px solid #5900d3")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  user-select: none;

  &:hover {
    color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  }
`;

export const EditHeaderWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  gap: 8px;
`;
export const EditHeaderTitle = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 20px;
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
`;

export const EditHeaderDivider = styled.div`
  background-color: #e4e7eb;
  width: 100%;
  height: 1px;
`;

export const SaveIconStyled = styled(SaveIcon)`
  width: 20px;
  height: 20px;
  .st0 {
    fill: ${(p) => (p.disabledColor ? "#ad9ebe" : "#5900d3")};
  }
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-end;
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #101010;
  margin-inline-start: 7px;
`;

export const TitleIcon = styled.img`
  height: 22px;
`;

const BaseContent = css`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #101010;
`;

export const ModalContent = styled.div`
  ${BaseContent}
  padding: 16px 0 43px;
`;

const BaseButtonContainer = css`
  display: flex;
`;

export const ButtonContainer = styled.div`
  margin-top: 43px;
  ${BaseButtonContainer}
  gap: 5px;
`;

export const WarningIcon = styled.img`
  height: 30px;
`;

export const NotifyModalContent = styled.div`
  ${BaseContent}
  margin-top: 16px;
  padding-left: 4px;
  justify-content: left;
  & .filter-name {
    font-weight: 600;
  }
`;

export const NotifyModalInfo = styled.div`
  ${BaseContent}
  margin-top: 24px;
  padding-left: 4px;
  justify-content: left;
`;

export const NotifyModalButtonsContainer = styled.div`
  ${BaseButtonContainer}
  gap: 16px;
  margin-top: 88px;
`;

export const LimitText = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: #8787d1;
`;
