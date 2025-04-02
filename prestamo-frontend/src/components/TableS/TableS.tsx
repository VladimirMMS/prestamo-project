/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid } from '@mui/x-data-grid';
import { NoRowsOverlay } from '../NoFoundRows/NotFoundRows';

export default function DataTable({
  columns,
  rows,
  count,
  handlePageChange,
  handleSort,
  handleFilter,
  page,
  message,
}: any) {
  console.log(rows, 'rows');
  return (
    <div
      style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        rowCount={count}
        onPaginationModelChange={handlePageChange}
        onFilterModelChange={handleFilter}
        sortingOrder={['desc', 'asc']}
        onSortModelChange={handleSort}
        rowHeight={100}
        autoPageSize={true}
        slots={{
          noRowsOverlay: (props) => <NoRowsOverlay message={message} {...props} />
        }}
      />
    </div>
  );
}