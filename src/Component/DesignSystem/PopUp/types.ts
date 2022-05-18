export interface PopUpInterface {
  TitleText: string;
  ContentText: string;
  ButtonLabel: string;
  onClosePopUp: () => void;
  width?: number;
}
