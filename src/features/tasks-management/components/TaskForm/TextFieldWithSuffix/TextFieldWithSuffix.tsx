import {
  Container,
  ContainerInput,
  InputFieldStyled,
  Label,
  Suffix,
  Wrapper,
} from "./text-field-with-suffix.styles";

type TextFieldWithSuffixProps = {
  type?: "number" | "text";
  label?: string;
  value: string | number | undefined;
  placeholder: string;
  onChange: (value: string) => void;
  suffix: string;
  disabled?: boolean;
  error?: boolean;
};

export default function TextFieldWithSuffix({
  type = "text",
  label,
  value,
  placeholder,
  onChange,
  suffix,
  disabled,
  error,
}: TextFieldWithSuffixProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Wrapper>
        <ContainerInput disabled={disabled} error={error}>
          <InputFieldStyled
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            disabled={disabled}
          />
        </ContainerInput>
        <Suffix>{suffix}</Suffix>
      </Wrapper>
    </Container>
  );
}
