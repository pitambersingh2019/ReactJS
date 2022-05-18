import { HeaderGroup } from "react-table";
import {
  ArrowContainer,
  SortingIcon,
  TableHeaderCell,
  Title,
} from "./table-header.styles";
import sortIconDefault from "../../../../../assets/icons/Table/sort_default.svg";
import sortIconAsc from "../../../../../assets/icons/Table/sort_asc.svg";
import sortIconDesc from "../../../../../assets/icons/Table/sort_desc.svg";

type TableHeaderProps = {
  headerGroups: HeaderGroup<{}>[];
};

export default function TableHeader({ headerGroups }: TableHeaderProps) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        const { key, ...restHeaderGroupProps } =
          headerGroup.getHeaderGroupProps();
        return (
          <tr key={key} {...restHeaderGroupProps}>
            {headerGroup.headers.map((column) => {
              const { key, ...restColumn } = column.getHeaderProps(
                column.getSortByToggleProps({ title: undefined })
              );
              return (
                <TableHeaderCell key={key} {...restColumn}>
                  <Title>
                    {column.render("Header")}
                    <ArrowContainer>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <SortingIcon
                            src={sortIconDesc}
                            alt="sorting icon desc"
                          />
                        ) : (
                          <SortingIcon
                            src={sortIconAsc}
                            alt="sorting icon asc"
                          />
                        )
                      ) : column.canSort ? (
                        <SortingIcon src={sortIconDefault} alt="sorting icon" />
                      ) : (
                        ""
                      )}
                    </ArrowContainer>
                  </Title>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </TableHeaderCell>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
}
