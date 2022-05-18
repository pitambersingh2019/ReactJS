import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import SkeletonTable from "../../../../utils/React2Ang/designSystem/Table/SkeletonTable";
import { useContainerSize } from "../../hooks/useContainerSize";
import { Container, InfoText } from "./skeleton.styles";

export default function Skeleton() {
  const componentRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerSize(componentRef);

  const { t } = useTranslation();
  return (
    <>
      <Container ref={componentRef}>
        <SkeletonTable tableHeight={height} tableWidth={width} />
      </Container>
      <InfoText>{t(translations.SyncTool.EmptyData1)}</InfoText>
      <InfoText>{t(translations.SyncTool.EmptyData2)}</InfoText>
    </>
  );
}
