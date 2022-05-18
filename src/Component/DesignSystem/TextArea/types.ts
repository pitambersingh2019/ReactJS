export enum InputMode {
  disabled = "disabled",
  readonly = "readonly",
  editable = "editable",
}

export interface InputTextInterface {
  placeholder: string;
  required: boolean;
  mode?: InputMode;
  value: string;
  onChange: (text: string) => void;
  TitleText: string;
  isError?: boolean;
  maxLength?: number;
  withCounter?: boolean;
}
