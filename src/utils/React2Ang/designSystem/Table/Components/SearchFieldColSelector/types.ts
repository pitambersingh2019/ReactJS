export interface InputSearchInterface {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  onEnter?: () => void;
  size?: "lg" | "sm";
}
