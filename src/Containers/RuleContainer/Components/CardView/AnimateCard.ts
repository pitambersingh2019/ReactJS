import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ClearLastCreateRuleID } from "../../slice";

export const ObserveAnimate = () => {
  const observer = useRef<null | IntersectionObserver>(null);
  const dispatch = useDispatch();
  const observeTheElement = (element: any, kpi?: string) => {
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        console.log("test showcard");
        element?.classList.add(`ShowCard`);

        setTimeout(() => {
          element?.classList.remove("ShowCard");
          observer.current?.disconnect();
          !!kpi && sessionStorage.removeItem("newKpi");
        }, 200);
        setTimeout(() => {
          !kpi && dispatch(ClearLastCreateRuleID());
        }, 600);
      }
    });
    observer.current.observe(element);
  };

  return observeTheElement;
};
