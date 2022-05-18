import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { useAppSelector } from "../../redux/hooks";
import { TopBarTitleContainer } from "./styles";

type TopBarTitleProps = {
  catalogId: string | number | undefined;
};

export default function TopBarTitle({ catalogId }: TopBarTitleProps) {
  const jobId = useAppSelector((state) => state.jobRecipe.jobId);

  const { t } = useTranslation();

  const catalog = catalogId
    ? `, ${t(translations.JobRecipe.ERPCatalogId)} = ${catalogId}`
    : "";

  const title = `${t(translations.JobRecipe.Job)} # ${jobId}${catalog}`;

  return <TopBarTitleContainer>{title}</TopBarTitleContainer>;
}
