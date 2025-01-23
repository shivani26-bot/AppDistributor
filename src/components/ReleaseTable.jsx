import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// DataTable component in JavaScript
export function ReleaseTable({ columns, data }) {
  const pageSize = 5; // Set a fixed page size of 5
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize, // Number of rows per page
        pageIndex, // Set the pageIndex from the state
      },
    },
    onPaginationChange: (updater) => {
      // Update pagination state manually
      setPageIndex((prevPageIndex) => {
        const newState = updater({ pageIndex: prevPageIndex, pageSize });
        return newState.pageIndex;
      });
    },
  });

  const handleNextPage = () => {
    if (table.getCanNextPage()) {
      setPageIndex((prev) => prev + 1); // Move to the next page by incrementing the pageIndex
    }
  };

  // Handle "Previous" button click
  const handlePreviousPage = () => {
    if (table.getCanPreviousPage()) {
      setPageIndex((prev) => prev - 1); // Move to the previous page by decrementing the pageIndex
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        {/* <Table> component serves as the container for the entire table structure. Inside it, there are two main parts: the header (<TableHeader>) and the body (<TableBody>).  */}
        <Table>
          <TableHeader>
            {/* <TableHeader> part is responsible for displaying the header rows of the table */}
            {/* table.getHeaderGroups(): This method returns an array of header
            groups. In React Table, you may have multiple groups of headers, for
            example, if you are grouping columns. headerGroup.headers: Each
            group of headers contains multiple header cells. */}
            {/* flexRender: This function is used to render the actual content of each header. It takes the header.column.columnDef.header (i.e., the content or label of the header) and the context (header.getContext()), which provides additional information, like whether the column is sortable, etc. */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* The body of the table is responsible for rendering the rows of data. This is where you map through the data that is passed to the table and display each row as a set of cells. */}
            {/* table.getRowModel().rows: This provides the rows of data to be displayed in the table. getRowModel() is a method from the React Table library that returns the row model, including the rows of data.
Conditionally Render Rows:
If there are rows to display (table.getRowModel().rows?.length), the code maps over each row and renders it as a <TableRow>. */}
            {/* If there are no rows (else case), it displays a single row with a message "No results." */}
            {/* (<TableCell>), which are created by mapping over row.getVisibleCells():

row.getVisibleCells(): This method returns the visible cells for the row. Not all cells may be visible depending on things like column visibility, pagination, etc.
flexRender(cell.column.columnDef.cell, cell.getContext()): This is used to render the content of each cell. It takes the actual content (cell.column.columnDef.cell) and the context of the cell (cell.getContext()), which provides things like additional formatting, or how to render the data in the cell. */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          //   onClick={() => table.previousPage()}
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()} //Disable if on the first page
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          //   onClick={() => table.nextPage()}
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()} // Disable if on the last page
        >
          Next
        </Button>
      </div>
    </div>
  );
}
