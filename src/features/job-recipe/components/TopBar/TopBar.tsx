import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { useAppSelector } from "../../redux/hooks";
import { TitleDataItem } from "../../ts";
import { TopBarContainer } from "./styles";
import TopBarTitle from "./TopBarTitle";
import Updated from "./Updated";

export default function TopBar() {
  const [isHidden, setIsHidden] = useState(true);
  const [catalogId, setCatalogId] = useState<string | undefined>("");

  const jobId = useAppSelector((state) => state.jobRecipe.jobId);

  useEffect(() => {
    const checkJobRecipe = () => {
      const interval = setInterval(() => {
        const reactJobRecipe = document.getElementById("reactJobRecipeWrapper");
        const breadCrumbs = document.getElementById("breadCrumbsRecipe");
        const oldPageTitle = document.getElementById("oldPageTitle");
        if (
          breadCrumbs &&
          breadCrumbs.style &&
          oldPageTitle &&
          oldPageTitle.style
        ) {
          if (reactJobRecipe) {
            breadCrumbs.style.cssText = `
              top: 0px;
              background-color: #fafafa;
              left: 0px;
              right: 0px;
              border: none !important;
            `;
            oldPageTitle.style.visibility = "hidden";
            setIsHidden(false);
          } else {
            setIsHidden(true);
            breadCrumbs.style.cssText = `
              top: 46px;
              background-color: inherit;
              border-bottom: inherit;
              left: 0px;
              right: 0px;
            `;
            oldPageTitle.style.visibility = "visible";
            clearInterval(interval);
          }
        }
      }, 1000);
    };

    checkJobRecipe();
  }, []);

  useEffect(() => {
    const fetchHeader = async () => {
      const header = await api
        .post<{ Data: TitleDataItem[] }>("DisplayAppObjectHeaderFields", {
          LeaderID: jobId,
          appObject: "Job",
        })
        .then((resp) => resp.data);
      setCatalogId(
        header.Data.find((item) => item.DisplayEName === "Catalog ID")?.Value
      );
    };

    if (jobId > -1) {
      fetchHeader();
    }
  }, [jobId]);

  return (
    <TopBarContainer isHidden={isHidden}>
      <TopBarTitle catalogId={catalogId} />
      <Updated />
    </TopBarContainer>
  );
}
