import { useEffect, useState } from "react";
import {
  CloseIcon,
  FileName,
  IconContainer,
  ImageContainer,
  ImageSliderContainer,
  ImageView,
  TopBar,
  Wrapper,
} from "./image-slider.styles";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import closeIcon from "../../../../../../assets/icons/tasks-management/close-white.svg";
import {
  SliderImage,
  useImagePreview,
} from "../../../../context/useImagePreview";
import BottomPreview from "../BottomPreview/BottomPreview";

type ImageSliderProps = {
  images: SliderImage[];
  handleClose: () => void;
};

export default function ImageSlider({ images, handleClose }: ImageSliderProps) {
  const { currentImageId } = useImagePreview();
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const curImage = images.find((image) => image.id === currentImageId);
    const startImageIdx = curImage ? images.indexOf(curImage) : 0;
    setCurrent(startImageIdx);
  }, [currentImageId, images]);

  return (
    <Wrapper>
      <TopBar>
        <FileName>{images[current].name}</FileName>
        <CloseIcon src={closeIcon} alt="close icon" onClick={handleClose} />
      </TopBar>
      <ImageSliderContainer>
        <IconContainer>
          <ArrowBack onClick={prevImage} fontSize="large" />
        </IconContainer>
        {images.map((image, idx) => {
          return (
            <ImageContainer key={image.id} isActive={idx === current}>
              {idx === current && <ImageView src={image.path} alt="image" />}
            </ImageContainer>
          );
        })}
        <IconContainer>
          <ArrowForward onClick={nextImage} fontSize="large" />
        </IconContainer>
      </ImageSliderContainer>
      <BottomPreview items={images} activeIdx={current} />
    </Wrapper>
  );
}
