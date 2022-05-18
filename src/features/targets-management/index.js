import styled from "styled-components";

import TableWrapper from "./components/TableWrapper/TableWrapper";
import Title from "./components/Title/Title";
import { ErrorContextProvider } from "./context/ErrorContext";
import { ExpandedRowsContextProvider } from "./context/ExpandedRowsContext";
import { UpdateMessageContextProvider } from "./context/UpdateMessageContext";
import { ValuesContextProvider } from "./hooks/useValues";

function App() {
  return (
    <ExpandedRowsContextProvider>
      <ValuesContextProvider>
        <Wrapper>
          <UpdateMessageContextProvider>
            <Title />
            <ErrorContextProvider>
              <TableWrapper />
            </ErrorContextProvider>
          </UpdateMessageContextProvider>
        </Wrapper>
      </ValuesContextProvider>
    </ExpandedRowsContextProvider>
  );
}

export default App;

const Wrapper = styled.div`
  padding: 40px 24px 0px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
