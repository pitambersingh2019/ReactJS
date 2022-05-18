import Backdrop from "@mui/material/Backdrop";
import { SliderImage } from "../../../../context/useImagePreview";
import ImageSlider from "../ImageSlider/ImageSlider";

type ImagePreviewProps = {
  open: boolean;
  handleClose: () => void;
  images: SliderImage[];
};

export default function ImagePreview({
  open,
  handleClose,
  images,
}: ImagePreviewProps) {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: 12000,
        backgroundColor: "rgba(16, 16, 16, 0.8)",
        height: "100vh",
        overflow: "scroll",
        alignItems: "unset",
      }}
    >
      <ImageSlider images={images} handleClose={handleClose} />
    </Backdrop>
  );
}
