import ReferenceRow from "./ReferenceRow/ReferenceRow";
import { ToolbarContainer } from "./toolbar.styles";
import TopRow from "./TopRow/TopRow";

type ToolbarProps = {
  showTopBarOnScroll: boolean;
};

export default function Toolbar({ showTopBarOnScroll }: ToolbarProps) {
  return (
    <ToolbarContainer>
      <TopRow showTopBarOnScroll={showTopBarOnScroll} />
      <ReferenceRow />
    </ToolbarContainer>
  );
}
