import { useEffect } from "react";
import Spinner from "../../../targets-management/components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getMachineMainChannelsParametersData,
  getProductRecipeJob,
  getProductReferenceRecipeJob,
} from "../../redux/slice";
import { ContentWrapperContainer, Error } from "./content-wrapper.styles";
import MachineChannels from "./MachineChannels/MachineChannels";
import ProductionParametersAccordion from "./ProductionParamatersAccordion/ProductionParametersAccordion";

type ContentWrapperProps = {
  jobID: number;
};

export default function ContentWrapper({ jobID }: ContentWrapperProps) {
  const dispatch = useAppDispatch();
  const { loading, productRecipeJob, error, selectedRecipeRefType } =
    useAppSelector((state) => state.jobRecipe);

  useEffect(() => {
    dispatch(getProductRecipeJob(jobID));
    dispatch(getProductReferenceRecipeJob(jobID));
    dispatch(getMachineMainChannelsParametersData(jobID));
  }, [dispatch, jobID, selectedRecipeRefType]);

  if (error) {
    return <Error>{error}</Error>;
  }

  if (loading) return <Spinner />;

  if (productRecipeJob?.length > 0) {
    return (
      <ContentWrapperContainer>
        <ProductionParametersAccordion />
        <MachineChannels />
      </ContentWrapperContainer>
    );
  }

  return null;
}
