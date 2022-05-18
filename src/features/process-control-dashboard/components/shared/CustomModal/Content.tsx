import { ReactNode } from "react";
import { ModalContent } from "./styles";

type ContentProps = {
  children: ReactNode;
};

export default function Content({ children }: ContentProps) {
  return <ModalContent>{children}</ModalContent>;
}
