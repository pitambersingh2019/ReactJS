import { CardsContainer, LoadingContainer, LoadingTitle } from "../../styles";
import { CardsInterface } from "../../slice/types";
import {
  selectCardsResults,
  selectLoadingTriggers,
  selectLastCreated,
} from "../../slice/selectors";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from "react-redux";
import { ObserveAnimate } from "./AnimateCard";
import Card from "../Card/Card";
import { nanoid } from "nanoid";
import CircularProgress from "@mui/material/CircularProgress";
import EmptyCards from "../EmptyCards/EmptyCards";

interface CardsViewInterface {
  //send to RuleContainer
  handleClickEdit: (data: CardsInterface) => void;
  handleClickDuplicate: (data: CardsInterface) => void;
}

const CardsView: React.FC<CardsViewInterface> = (props) => {
  //const dispatch = useDispatch();
  const cardlist: CardsInterface[] = useSelector(selectCardsResults);
  //const Error = useSelector(selectErrorTriggers);
  const Loading: boolean = useSelector(selectLoadingTriggers);
  const LastCreatedID = useSelector(selectLastCreated);
  const observeElement = ObserveAnimate();

  // useEffect(() => {
  //     if(cardlist.length > 0){
  //         console.log(cardlist.reduce((a , b) => Number(new Date(a.CreateDate)) > Number(new Date(b.CreateDate)) ? a : b))

  //     }
  // }, [cardlist])

  return (
    <>
      {Loading === false ? (
        <CardsContainer>
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {cardlist.length === 0 ? (
            <EmptyCards></EmptyCards>
          ) : (
            cardlist.map((item: CardsInterface) => {
              return LastCreatedID && LastCreatedID === item.TriggerGroupID ? (
                <Card
                  key={nanoid()}
                  data={item}
                  handleClickEdit={(data) => props.handleClickEdit(data)}
                  ref={(node) => {
                    // console.log('Attached node: ', node)
                    if (node) {
                      observeElement(node);
                      node.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "center",
                      });
                    }
                  }}
                  handleClickDuplicate={(data) =>
                    props.handleClickDuplicate(data)
                  }
                />
              ) : (
                <Card
                  key={nanoid()}
                  data={item}
                  handleClickEdit={(data) => props.handleClickEdit(data)}
                  handleClickDuplicate={(data) =>
                    props.handleClickDuplicate(data)
                  }
                />
              );
            })
          )}
        </CardsContainer>
      ) : (
        <LoadingContainer>
          <LoadingTitle>Loading... Please wait</LoadingTitle>
          <CircularProgress />
        </LoadingContainer>
      )}
    </>
  );
};

export default CardsView;
