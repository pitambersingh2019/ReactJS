import React from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { useSelector } from "react-redux";
import { selectProductRecipeChannels } from "../../slice/selectors";
import CollapsTableBox from "../CollapsTableBox/CollapsTableBox";
import { CollpasWrapper, EmptyData } from "./product-recipe-content.styles";

const ProductRecipeContent: React.FC = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectProductRecipeChannels);

  return (
    <CollpasWrapper>
      {channels?.length ? (
        channels?.map((channel, index) => (
          <CollapsTableBox
            key={channel.ChannelNumber}
            channelData={channel}
            index={index}
          />
        ))
      ) : (
        <EmptyData>{t(translations.ProductRecipe.NO_DATA)}</EmptyData>
      )}
    </CollpasWrapper>
  );
};

export default ProductRecipeContent;
