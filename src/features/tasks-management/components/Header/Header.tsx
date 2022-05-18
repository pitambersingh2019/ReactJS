import CreateTaskButton from "./CreateTaskButton/CreateTaskButton";
import Title from "./Title/Title";
import { HeaderContainer } from "./header.styles";
import SearchBar from "./SearchBar/SearchBar";

export default function Header() {
  return (
    <HeaderContainer>
      <div className="section">
        <Title />
        <SearchBar />
      </div>
      <CreateTaskButton />
    </HeaderContainer>
  );
}
