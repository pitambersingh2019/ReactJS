import { FC } from "react";
import * as Styled from "./style";
import errorImg from "./../../../assets/icons/WaringAlert.svg";
import HtmlTooltip from "../../ToolTip/TooltipSelect";

interface IProps {
  title?: string;
  isRequired: boolean;
  status: "editable" | "readonly" | "disable";
  touch?: boolean;
  leave?: boolean;
  error?: string | boolean;
}

const colorTitle = {
  editable: "#404d61",
  readonly: "#6c7481",
  disable: "#b9bec6",
};

const colorRequired = {
  editable: "#6c7481",
  readonly: "#6c7481",
  disable: "#e4e7eb",
};

const TitleRequired: FC<IProps> = ({
  children,
  title,
  isRequired,
  status,
  error,
  touch,
  leave,
}) => {
  return (
    <div>
      {(title || error) && (
        <Styled.TitleErrorWrapper>
          {title && (
            <Styled.Title
              color={error && touch && leave ? "#c73431" : colorTitle[status]}
            >
              {title}
            </Styled.Title>
          )}
          {error && touch && typeof error === "string" && (
            <HtmlTooltip title={error}>
              <Styled.ErorrWrapper>
                <img src={errorImg} />
              </Styled.ErorrWrapper>
            </HtmlTooltip>
          )}
        </Styled.TitleErrorWrapper>
      )}
      {children}
      {isRequired && (
        <Styled.Required
          color={error && touch && leave ? "#c73431" : colorRequired[status]}
        >
          *Required
        </Styled.Required>
      )}
    </div>
  );
};

export default TitleRequired;
