import { StyledLevel } from "./level.styles";

type LevelProps = {
  level: string;
  name: string;
  isSmallMargin: boolean;
};
export default function Level({ level, name, isSmallMargin }: LevelProps) {
  return (
    <StyledLevel
      isSmallMargin={isSmallMargin}
    >{`${level}: ${name}`}</StyledLevel>
  );
}
