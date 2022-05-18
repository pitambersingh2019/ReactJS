import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { StyledToastContainer } from "../../Component/Toast/ToastContainer";
import store from "../../Redux/store";
import Create from "./create";
import Header from "./header";
import {
  initialCreateState,
  setCreateState,
  setIsCreate,
  setStepCreate,
} from "./reducer";
import { selectIsCreate } from "./reducer/selectors";
import * as Styled from "./style";
import TableKPI from "./table";

const KPI = () => {
  const isCreate = useSelector(selectIsCreate);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCreate) {
      dispatch(setIsCreate());
      dispatch(setStepCreate({ step: 1 }));
      dispatch(setCreateState(initialCreateState));
    }
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.WrapperCenter>
        {isCreate ? (
          <Create />
        ) : (
          <React.Fragment>
            <Header />
            <TableKPI />
          </React.Fragment>
        )}
      </Styled.WrapperCenter>
    </Styled.Wrapper>
  );
};

const KPIWrapper = () => {
  return (
    <Provider store={store}>
      <StyledToastContainer />
      <KPI />
    </Provider>
  );
};

export default KPIWrapper;
