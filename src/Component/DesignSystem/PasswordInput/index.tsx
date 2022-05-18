import React, { useState } from "react";
import {
  ContainerInput,
  InputFieldStyled,
  Container,
  Title,
  StyledIconEye,
  TitleReq,
} from "./styles";
import { InputTextInterface } from "./types";
import showPwdImg from "../../../assets/icons/show-password.svg";
import hidePwdImg from "../../../assets/icons/hide-password.svg";

const InputTextField: React.FC<InputTextInterface> = (props) => {
  const { placeholder, onChange, value, TitleText } = props;
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const required = props.required ?? false;
  // const ref = useRef<HTMLInputElement>(null)
  const InputHandler = (text: string) => {
    onChange(text);
  };

  // useEffect(() => {
  //     if(ref.current){
  //         ref.current.checkValidity = function() { return false;}
  //         ref.current.setCustomValidity("aaaaaaaaa")
  //     }
  // }, [])
  return (
    <Container>
      <Title> {TitleText} </Title>
      <ContainerInput>
        <InputFieldStyled
          value={value}
          placeholder={placeholder}
          // ref={ref}
          type={isRevealPwd ? "text" : "password"}
          onChange={(e) => InputHandler(e.target.value)}
          required={required}
        />
        <StyledIconEye
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPwd((prevState) => !prevState)}
        />
      </ContainerInput>
      {required && <TitleReq>* Required</TitleReq>}
    </Container>
  );
};

export default InputTextField;
