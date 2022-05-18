import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductRecipeData, loadMaterialsList } from "./slice";
import {
  selectProductRecipeDataLoading,
  selectEditMode,
} from "./slice/selectors";
import Spinner from "../targets-management/components/Spinner/Spinner";
import Header from "./components/Header/Header";
import ProductRecipeContent from "./components/ProductRecipeContent/ProductRecipeContent";
import Footer from "./components/Footer/Footer";
import { Wrapper } from "./product-recipe.styles";
import useScroll from "./utils/hooks/useScroll";

interface ProductRecipeProps {
  content: number;
}

const ProductRecipe: React.FC<ProductRecipeProps> = (props) => {
  const productID = props.content;
  // const ProductRecipe: React.FC = () => {
  //   const productID = 13396;
  const dispatch = useDispatch();
  const loadData = useSelector(selectProductRecipeDataLoading);
  const editMode = useSelector(selectEditMode);
  const { onScroll, showBarOnScroll } = useScroll(20);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    scrollRef.current &&
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(loadProductRecipeData(productID));
    dispatch(loadMaterialsList());
  }, [dispatch, productID]);

  return (
    <>
      {loadData ? (
        <Spinner />
      ) : (
        <Wrapper onScroll={onScroll} ref={scrollRef} editMode={editMode}>
          <Header showBarOnScroll={showBarOnScroll} />
          <ProductRecipeContent />
          <Footer onScrollToTop={scrollToTop} />
        </Wrapper>
      )}
    </>
  );
};

export default ProductRecipe;
