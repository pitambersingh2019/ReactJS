import { CustomButtonContainer, Icon } from "./styles";
import plusIcon from "../../../assets/icons/create-white.svg";

type CustomButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, "size"> & {
  variant?: "primary" | "secondary" | "purple" | "purple-secondary";
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "lg" | "md" | "sm" | "ssm";
  disabled?: boolean;
  width?: string;
  withIcon?: boolean;
  iconPath?: string;
  iconHeight?: string;
};

export default function Button({
  variant = "primary",
  size = "lg",
  label,
  onClick,
  disabled,
  width = "120px",
  withIcon,
  iconPath = plusIcon,
  iconHeight = size === "sm" || size === "ssm" ? "16px" : "20px",
}: CustomButtonProps) {
  return (
    <CustomButtonContainer
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      width={width}
      size={size}
    >
      {withIcon && (
        <Icon src={iconPath} alt="button icon" iconHeight={iconHeight} />
      )}
      {label}
    </CustomButtonContainer>
  );
}
