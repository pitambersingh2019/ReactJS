import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import MachineChannel from "./MachineChannel/MachineChannel";
import { MachineChannelsContainer } from "./machine-channels.styles";
import { useEffect } from "react";
import { setExpandedDrawers } from "../../../redux/slice";
import { PRODUCTION_PARAMETERS_DRAWER_ID } from "../../../constants";

export default function MachineChannels() {
  const dispatch = useAppDispatch();
  const machineMainChannelsParameters = useAppSelector(
    (state) => state.jobRecipe.machineMainChannelsParameters
  );

  useEffect(() => {
    const drawers = machineMainChannelsParameters.map((channel) => ({
      drawerId: channel.Cahnnel,
      expanded: true,
    }));
    dispatch(
      setExpandedDrawers([
        { drawerId: PRODUCTION_PARAMETERS_DRAWER_ID, expanded: true },
        ...drawers,
      ])
    );
  }, [dispatch, machineMainChannelsParameters]);

  return (
    <MachineChannelsContainer>
      {machineMainChannelsParameters.map((machineMainChannel) => (
        <MachineChannel
          key={machineMainChannel.Cahnnel}
          machineMainChannel={machineMainChannel}
        />
      ))}
    </MachineChannelsContainer>
  );
}
