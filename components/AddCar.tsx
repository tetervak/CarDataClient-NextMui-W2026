'use client'
import { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCar } from '@/lib/api/cars';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CarDialogContent from './CarDialogContent';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Car } from '@/lib/api/types';

function AddCar() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registration: '',
    year: 0,
    price: 0
  });

  const { mutate } = useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });  

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };    
  
  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(car);
    setCar({ brand: '', model: '', color: '', registration: '', year: 0, price: 0 });
    handleClose();
  }  

  return(
    <>
      <Button onClick={handleClickOpen} variant="contained" style={{alignSelf: 'flex-start'}}>
        <AddCircleOutlineIcon style={{marginRight: 10}}/>
        New Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Car</DialogTitle>
          <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;