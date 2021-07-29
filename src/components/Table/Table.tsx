import React from "react";
import { Row, CellContent, Column } from "./types";
import * as helpers from "./helpers";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./Table.scss";

function getWidth(items: unknown[]) {
  return `${100 / items.length}%`;
}

export interface TableProps {
  rows: Row[];
  columns: Column[];
}

export default function Table({ rows, columns }: TableProps) {
  const [filters, setFilters] = React.useState(new Array(columns.length));
  const items = helpers.getItems(rows, columns);
  const filteredItems = helpers.filterItems(items, columns, filters);

  const flexBasis = getWidth(columns);

  const setFilter = (value: string, index: number) => {
    setFilters([
      ...filters.slice(0, index),
      { value: value === "" ? undefined : value, filtering: true },
      ...filters.slice(index + 1),
    ]);
  };

  function onSearchIconClick(index: number) {
    setFilters([
      ...filters.slice(0, index),
      { value: undefined, filtering: true },
      ...filters.slice(index + 1),
    ]);
  }

  function onFilterRemoveIconClick(index: number) {
    setFilters([
      ...filters.slice(0, index),
      { value: undefined, filtering: false },
      ...filters.slice(index + 1),
    ]);
  }

  return (
    <div className="rc-table">
      <TableHeader
        columns={columns}
        filters={filters}
        flexBasis={flexBasis}
        onFilterChange={setFilter}
        onSearchIconClick={onSearchIconClick}
        onFilterRemoveIconClick={onFilterRemoveIconClick}
      />
      <TableBody items={filteredItems} flexBasis={flexBasis} />
    </div>
  );
}