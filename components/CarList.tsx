'use client'
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCars, deleteCar } from '@/lib/api/cars';
import { 
  DataGrid, 
  GridColDef, 
  GridCellParams
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from './AddCar';
import EditCar from './EditCar';

function CarList() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  const { mutate } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      setOpen(true);
      void queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  }); 

  const columns: GridColDef[] = [
    {field: 'brand', headerName: 'Brand', width: 100},
    {field: 'model', headerName: 'Model', width: 100},
    {field: 'color', headerName: 'Color', width: 100},
    {field: 'registration', headerName: 'Registration', width: 150},
    {field: 'year', headerName: 'Year', width: 100},
    {field: 'price', headerName: 'Price', width: 100},
    {
      field: 'edit',
      headerName: 'Edit',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditCar cardata={params.row} />
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton aria-label="delete" size="small"
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
              mutate(params.row._links.car.href);
            } 
          }}       
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]; 

  if (isLoading) {
    return <span>Loading...</span>
  }
  else if (isError) {
    return <span>Error when fetching cars...</span>
  }
  else if (isSuccess) {
    return (
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={row => row._links.self.href}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted" />
        </>
    );
  }
}

export default CarList;
