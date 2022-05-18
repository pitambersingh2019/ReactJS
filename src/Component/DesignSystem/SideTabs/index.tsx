import React, { ReactElement, useMemo } from "react";
import { Container, TabsWrapper, ContentWrapper, Tab, typeTab } from "./styles";

interface IProps {
  Titles: string[];
  EnabledTabs: boolean[];
  children: ReactElement[];
  onClickIndex?: (index: number) => void;
  selectedIndex: number;
  menuHeight?: number;
}

const maxItemsRows = 4;
const SideTabs: React.FC<IProps> = ({
  Titles,
  children,
  onClickIndex,
  selectedIndex,
  EnabledTabs,
}) => {
  const TabClicked = (index: number) => {
    if (EnabledTabs[index]) {
      // setSelectedTab(index);
      if (onClickIndex) {
        onClickIndex(index);
      }
    }
  };
  const typeofTabs = useMemo(
    () =>
      children
        ? children.length > maxItemsRows
          ? typeTab.VERTICAL
          : typeTab.HORIZONTAL
        : typeTab.VERTICAL,
    [children]
  );
  return (
    <>
      <Container type={typeofTabs}>
        <TabsWrapper type={typeofTabs}>
          {Titles.map((title: string, index: number) => (
            <Tab
              type={typeofTabs}
              enabled={EnabledTabs[index] ?? false}
              key={index}
              active={selectedIndex === index}
              onClick={() => TabClicked(index)}
              height={title.length >= 16 ? 56 : 40}
              width={title.length >= 16 ? 300 : 200}
            >
              {title}
            </Tab>
          ))}
        </TabsWrapper>
        <ContentWrapper type={typeofTabs}>
          {children[selectedIndex]}
        </ContentWrapper>
      </Container>
    </>
  );
};

export default SideTabs;
