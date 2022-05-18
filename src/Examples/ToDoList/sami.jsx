import React, { useState } from "react";
import styled from "styled-components";

// Note: This also works with class components
const TodoList = ({ todos, count, $scope }) => {
  const [state, setstate] = useState(0);

  const handleclick = () => {
    setstate(state + 1);
  };

  const handleclick_change_angularjs_variable = () => {
    $scope.count += 5;
    $scope.$apply();
  };

  return (
    <Container>
      <h3>React Component! {count}</h3>
      <Listitem>
        <h4>useState example : {state} </h4>
        {todos.map((todo) => (
          <Item onClick={handleclick} key={todo._id}>
            {todo.description}
          </Item>
        ))}
      </Listitem>
      <Listitem>
        <h4>count from angularjs to React: {count}</h4>
        <Item2 onClick={handleclick_change_angularjs_variable}>click me</Item2>
      </Listitem>
    </Container>
  );
};

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

const Listitem = styled.div`
  background-color: royalblue;
  display: flex;
  border: 2px black solid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
`;
const Item = styled.div`
  background-color: salmon;
  border: solid black 1px;
  border-radius: 10px;
  padding: 5px 15px;
  cursor: pointer;
`;
const Item2 = styled.div`
  background-color: red;
  border: solid black 1px;
  border-radius: 10px;
  padding: 5px 15px;
  margin-top: 10px;
  cursor: pointer;
`;

export default TodoList;
