export interface InputTextInterface {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  TitleText: string;
  required?: boolean;
}
