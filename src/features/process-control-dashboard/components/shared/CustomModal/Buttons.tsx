import { ReactNode } from "react";
import { ButtonsContainer } from "./styles";

type ButtonsProps = {
  children: ReactNode;
  marginTop?: string;
};

export default function Buttons({
  children,
  marginTop = "24px",
}: ButtonsProps) {
  return <ButtonsContainer marginTop={marginTop}>{children}</ButtonsContainer>;
}
