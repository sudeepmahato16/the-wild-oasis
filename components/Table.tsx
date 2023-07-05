import React, { createContext, useContext, ReactNode } from "react";

interface TableProps {
  columns: string;
  children: ReactNode;
  className?: string;
}

const TableContext = createContext({
  columns: "",
});

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <header
    style={{
      gridTemplateColumns: columns
    }}
      className={`grid items-center gap-x-6 table-heading`}
      role="row"
    >
      {children}
    </header>
  );
};

interface BodyProps {
  data: any[];
  render: (item: any) => ReactNode;
}

const Body: React.FC<BodyProps> = ({ data, render }) => {
  if (!data.length)
    return (
      <p className="text-[16px] font-medium text-center m-6">
        No data to show at the moment
      </p>
    );
  return <section className="my-1">{data.map(render)}</section>;
};

const Row = ({ children }: { children: ReactNode }) => {
  const { columns } = useContext(TableContext);

  return (
    <div
    style={{
      gridTemplateColumns: columns
    }}
      className={`grid items-center gap-x-6 transition-none py-2 px-6 border-b border-grey-100 [&:not(:last-child)]:border-b-0`}
      role="row"
    >
      {children}
    </div>
  );
};

const Footer = () => {};

const Table: React.FC<TableProps> & {
  Header: typeof Header;
  Row: typeof Row;
  Body: typeof Body;
} = ({ columns, children, className }) => {
  return (
    <TableContext.Provider
      value={{ columns }}
    >
      <div className={`table ${className}`} role="table">
        {children}
      </div>
    </TableContext.Provider>
  );
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
