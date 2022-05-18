import { SliderImage } from "../../../../context/useImagePreview";
import {
  BottomPreviewContainer,
  BottomPreviewItem,
} from "./bottom-preview.styled";

type BottomPreviewProps = {
  items: SliderImage[];
  activeIdx: number;
};

export default function BottomPreview({
  items,
  activeIdx,
}: BottomPreviewProps) {
  return (
    <BottomPreviewContainer>
      {items.map((item, idx) => (
        <BottomPreviewItem
          key={item.id}
          src={item.path}
          alt="small preview"
          isActive={idx === activeIdx}
        />
      ))}
    </BottomPreviewContainer>
  );
}
