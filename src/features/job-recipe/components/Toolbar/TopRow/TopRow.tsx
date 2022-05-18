import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { CollapseAll, SideContainer, TopRowContainer } from "./top-row.styles";
import editIcon from "../../../../../assets/icons/Edit-white.svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setExpandedDrawers, setEditing } from "../../../redux/slice";
import Updated from "../../TopBar/Updated";

type TopRowProps = {
  showTopBarOnScroll: boolean;
};

export default function TopRow({ showTopBarOnScroll }: TopRowProps) {
  const dispatch = useAppDispatch();
  const { expandedDrawers, isEditing } = useAppSelector(
    (state) => state.jobRecipe
  );

  const allCollapsed = expandedDrawers.every((drawer) => !drawer.expanded);

  const { t } = useTranslation();

  const onEdit = () => {
    dispatch(setEditing(true));
  };

  const onToggleCollapseAll = () => {
    const newExpandedDrawers = expandedDrawers.map((drawer) => ({
      ...drawer,
      expanded: allCollapsed,
    }));
    dispatch(setExpandedDrawers(newExpandedDrawers));
  };

  return (
    <TopRowContainer showBarOnScroll={showTopBarOnScroll}>
      <CollapseAll onClick={onToggleCollapseAll}>
        {t(
          translations.JobRecipe[
            `${allCollapsed ? "ExpandAll" : "CollapseAll"}`
          ]
        )}
      </CollapseAll>
      <SideContainer>
        <Updated />
        <Button
          label={
            isEditing
              ? `${t(translations.JobRecipe.Editing)}...`
              : t(translations.JobRecipe.EditJobRecipe)
          }
          onClick={onEdit}
          variant="purple"
          withIcon
          iconPath={editIcon}
          iconHeight="16px"
          size="md"
          disabled={isEditing}
        />
      </SideContainer>
    </TopRowContainer>
  );
}
