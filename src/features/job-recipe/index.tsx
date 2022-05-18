import { useRef } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";
import ErrorOnSaveModal from "./components/ErrorOnSaveModal/ErrorOnSaveModal";
import Toolbar from "./components/Toolbar/Toolbar";
import useScroll from "./hooks/useScroll";

import { store } from "./redux/store";

type JobRecipeProps = {
  jobID: number;
  setFormIsChanges: (isChanges: boolean) => void;
};

export default function JobRecipe({ jobID, setFormIsChanges }: JobRecipeProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { onScroll, showBarOnScroll } = useScroll(20);

  const scrollToTop = () => {
    scrollRef.current &&
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Wrapper onScroll={onScroll} ref={scrollRef}>
      <Provider store={store}>
        <Toolbar showTopBarOnScroll={showBarOnScroll} />
        <ContentWrapper jobID={jobID} />
        <ActionButtons
          jobID={jobID}
          onScrollToTop={scrollToTop}
          setFormIsChanges={setFormIsChanges}
        />
        <ErrorOnSaveModal />
      </Provider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 8px;
  flex-direction: column;

  height: calc(100vh - 100px);
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;
