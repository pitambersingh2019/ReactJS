import React from "react";
import { decrement, increment, selectCounter } from "./counterSlice2";
import { useSelector, useDispatch } from "../../utils/React2Ang/useCustoms";
import styled from "styled-components";

function CounterTest() {
  const test_state = useSelector(selectCounter);
  const dispatch = useDispatch();

  return (
    <Container>
      <h3>React Component!</h3>
      <Item>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment(1))}
        >
          Increment{" "}
        </button>
        <span> {test_state} </span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement(1))}
        >
          Decrement{" "}
        </button>
      </Item>
    </Container>
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
  justify-content: center;
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

export default CounterTest;
