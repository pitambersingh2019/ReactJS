import { createContext, useContext, useState } from "react";

export type SliderImage = {
  name: string;
  path: string;
  id: number;
};

type ImagePreviewState = {
  showPreview: boolean;
  images: SliderImage[] | undefined;
  onImagePreviewOpen: (images: SliderImage[], currentImageId: number) => void;
  onImagePreviewClose: () => void;
  currentImageId: number;
};

type ImagePreviewContextProviderProps = {
  children: React.ReactNode;
};

const ImagePreviewContext = createContext<ImagePreviewState | undefined>(
  undefined
);

const ImagePreviewContextProvider = ({
  children,
}: ImagePreviewContextProviderProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState<SliderImage[] | undefined>(undefined);
  const [currentImageId, setCurrentImageId] = useState<number>(0);

  const onImagePreviewClose = () => {
    setShowPreview(false);
    setImages(undefined);
  };

  const onImagePreviewOpen = (
    images: SliderImage[],
    currentImageId: number
  ) => {
    setShowPreview(true);
    setImages(images);
    setCurrentImageId(currentImageId);
  };

  return (
    <ImagePreviewContext.Provider
      value={{
        showPreview,
        images,
        onImagePreviewClose,
        onImagePreviewOpen,
        currentImageId,
      }}
    >
      {children}
    </ImagePreviewContext.Provider>
  );
};

const useImagePreview = () => {
  const context = useContext(ImagePreviewContext);
  if (context === undefined) {
    throw new Error(
      "useImagePreview must be used within the ImagePreviewContextProvider"
    );
  }

  return context;
};

export { ImagePreviewContextProvider, useImagePreview };
