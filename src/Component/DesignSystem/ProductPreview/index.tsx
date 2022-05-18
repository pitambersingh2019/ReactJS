import React from "react";
import {
  Container,
  Title,
  ImageContainer,
  Button,
  TitleButton,
  FooterWrapper,
  Icon,
  Image,
} from "./styles";
import { ProductPreviewInterface } from "./types";
import deleteIcon from "../../../assets/icons/delete_icon.svg";
import replace from "../../../assets/icons/Icon_Replace Image.svg";

const ProductPreview: React.FC<ProductPreviewInterface> = (props) => {
  const { TitleText, url } = props;

  return (
    <Container>
      <Title> {TitleText} </Title>
      <ImageContainer>
        <Image src={url}></Image>
        {/* <FooterWrapper>
          <Button>
            <Icon src={replace} />
            <TitleButton>Replace Image</TitleButton>
          </Button>
          <Button>
            <Icon src={deleteIcon} />
            <TitleButton>Remove</TitleButton>
          </Button>
        </FooterWrapper> */}
      </ImageContainer>
    </Container>
  );
};

export default ProductPreview;
