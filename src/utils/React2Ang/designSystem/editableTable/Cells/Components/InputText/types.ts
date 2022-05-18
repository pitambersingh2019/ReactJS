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
  value: string;
  onChange: (text: string) => void;
  TitleText: string;
  type?: InputType;
  onBlur: (text: string) => void;
}
