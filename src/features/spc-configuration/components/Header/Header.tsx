import { useSelector } from "react-redux";
import { selectSPCStep } from "../../slice/selectors";
import Title from "./Title/Title";
import Description from "./Description/Description";
import { HeaderContainer } from "./header.styles";

const Header: React.FC = () => {
  const step = useSelector(selectSPCStep);
  return (
    <HeaderContainer>
      <Title />
      {step != 2 && <Description />}
    </HeaderContainer>
  );
};

export default Header;
