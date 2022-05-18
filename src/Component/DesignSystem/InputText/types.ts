export enum InputMode {
  disabled = "disabled",
  readonly = "readonly",
  editable = "editable",
}

export enum InputType {
  text = "text",
  number = "number",
}
export interface InputTextInterface {
  placeholder: string;
  required: boolean;
  mode?: InputMode;
  value: string | number;
  onChange: (text: string) => void;
  onBlur?: (text: string) => void;
  TitleText: string;
  type?: InputType;
  maxLength?: number;
  step?: number;
  min?: number;
  max?: number;
  disableCopyPaste?: boolean;
}
