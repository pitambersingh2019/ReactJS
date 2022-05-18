export interface InputSearchInterface {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  TitleText: string;
  onSearch: (text: string) => void;
  disabled: boolean;
  required?: boolean;
}
