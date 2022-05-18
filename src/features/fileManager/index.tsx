import { Provider } from "react-redux";
import styled from "styled-components";
import PagesWrapper from "./pages";
import { store } from "./redux/store";

export default function SyncTool() {
  return (
    <Wrapper>
      <Provider store={store}>
        <PagesWrapper />
      </Provider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 56px 24px 0px 24px;
  flex-direction: column;
  background-color: white;
`;
