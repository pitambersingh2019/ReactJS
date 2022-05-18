import { PCParam } from "../../../ts";
import PCDisplayListItem from "../PCDisplayListItem/PCDisplayListItem";
import { Container } from "./pc-displays-list.styles";

type PCDisplaysListProps = {
  pcDisplays: PCParam[];
  onScroll: () => void;
};

export default function PCDisplaysList({
  pcDisplays,
  onScroll,
}: PCDisplaysListProps) {
  return pcDisplays.length > 0 ? (
    <Container>
      {pcDisplays.map((display) =>
        display.UpsertType !== 1 ? (
          <PCDisplayListItem
            key={display.ParamID}
            pcDisplay={display}
            onScroll={onScroll}
          />
        ) : null
      )}
    </Container>
  ) : null;
}
