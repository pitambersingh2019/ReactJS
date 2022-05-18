import { Provider } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header/Header";
import TableWrapper from "./components/TableWrapper/TableWrapper";
import TimeRange from "./components/TimeRange";
import { store } from "./redux/store";

export default function QuantityTargetsManagement() {
  return (
    <Wrapper>
      <Header />
      <Provider store={store}>
        <TimeRange />
        <TableWrapper />
      </Provider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 56px 24px 40px;
  flex-direction: column;
`;
