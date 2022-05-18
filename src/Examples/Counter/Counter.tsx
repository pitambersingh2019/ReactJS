import { decrement, increment, selectCounter } from "./counterSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";

import { useTranslation } from "react-i18next";
import { translations } from "../../locales/translations";

// @ts-ignore
import rtl from "styled-components-rtl";

function Counter() {
  const test_state = useSelector(selectCounter);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const handleLanguageChange = (value: string) => {
    const language = value;
    i18n.changeLanguage(language);
  };

  const changelang = () => {
    if (i18n.language === "en") {
      handleLanguageChange("heb");
    } else {
      handleLanguageChange("en");
    }
  };

  return (
    <>
      <Paragraph>الإمبراطورية الروسية (بالإملاء الروسي رُ</Paragraph>
      <Paragraph>The Russian Empire, al</Paragraph>
      <Container>
        <EditIcon />
        <h1>{t(translations.RulesContainer.Title)}</h1>
        <button aria-label="change lang" onClick={changelang}>
          {" "}
          Cahnge lang{" "}
        </button>
        <h3>React Component!</h3>
        <Item>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment(2))}
          >
            Increment{" "}
          </button>
          <span> {test_state} </span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement(2))}
          >
            Decrement{" "}
          </button>
        </Item>
      </Container>
    </>
  );
}
const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  align-items: center;
  border: 1px black solid;
  font-size: 20px;
`;

const Paragraph = styled.p`
  border: 1px solid green;

  ${rtl`
        padding-left: 100px;
  `}
  background: wheat;
`;

const Item = styled.div`
  background-color: royalblue;
  display: flex;
  border: 2px black solid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 30px;
  border-radius: 10px;
`;

export default Counter;
