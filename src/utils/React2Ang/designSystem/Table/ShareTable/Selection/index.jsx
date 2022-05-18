import React, { useEffect, useState } from "react";
import { Container, Header, UserGroupTitle, Section } from "./styles";
import SelectCheckBox from "../../../../../../Component/DesignSystem/CheckBox";
const Selection = ({ items, title, handlecheck, handlecheckall }) => {
  const [selectall, setselectall] = useState(false);

  useEffect(() => {
    handlecheckall(selectall);
  }, [handlecheckall, selectall]);
  return (
    <Container>
      <Header>
        <UserGroupTitle>
          {title} ({items.filter((elem) => elem.checked).length}/{items.length})
        </UserGroupTitle>
        <SelectCheckBox
          checked={selectall}
          onChange={() => setselectall((prev) => !prev)}
          TitleText="Select all"
        />
      </Header>
      <Section>
        {items.map((elem, index) => (
          <SelectCheckBox
            key={index}
            checked={elem.checked}
            onChange={() => handlecheck(elem.id)}
            TitleText={elem.ename}
          />
        ))}
      </Section>
    </Container>
  );
};

export default Selection;
