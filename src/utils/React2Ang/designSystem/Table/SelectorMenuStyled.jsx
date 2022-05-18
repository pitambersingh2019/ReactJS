/* eslint-disable @typescript-eslint/no-unused-vars */
import { MENU_COLS, SIDE_COL_WIDTH } from "./config";
import { Col } from "./styles";
const SelectorMenuStyled = ({ headerGroups }) => {
  const menuHeader = headerGroups[0].headers.find((d) => d.id === MENU_COLS);
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <div
          key={headerGroup}
          {...headerGroup.getHeaderGroupProps()}
          style={{
            ...headerGroup.getHeaderGroupProps().style,
            width: SIDE_COL_WIDTH,
          }}
          className="tr"
        >
          <Col {...menuHeader.getHeaderProps()}></Col>
        </div>
      ))}
    </>
  );
};

export default SelectorMenuStyled;
