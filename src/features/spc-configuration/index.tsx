import { useEffect } from "react";
import { loadSPCData, loadSPCTemplate } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { selectSPCDataLoading } from "./slice/selectors";
import Spinner from "../targets-management/components/Spinner/Spinner";
import Header from "./components/Header/Header";
import SPCContentWrapper from "./components/SPCContentWrapper/SPCContentWrapper";
import { Wrapper } from "./spc-configuration.styles";

const SpcConfiguration: React.FC = () => {
  const dispatch = useDispatch();
  const loadData = useSelector(selectSPCDataLoading);

  useEffect(() => {
    dispatch(loadSPCData());
    dispatch(loadSPCTemplate());
  }, [dispatch]);

  return (
    <>
      {loadData ? (
        <Spinner />
      ) : (
        <Wrapper>
          <Header />
          <SPCContentWrapper />
        </Wrapper>
      )}
    </>
  );
};

export default SpcConfiguration;
