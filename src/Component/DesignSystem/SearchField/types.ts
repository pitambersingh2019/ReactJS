export interface InputSearchInterface {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  onEnter?: () => void;
  TitleText?: string;
  size?: "lg" | "sm";
}
