/*import Image from "next/image";
import styles from "./page.module.css";*/
'use client'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CarList from "@/components/CarList";

const queryClient = new QueryClient();

export default function Home() {
  return (
      <Container maxWidth="md">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Car Shop
            </Typography>
          </Toolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
          <CarList />
        </QueryClientProvider>
      </Container>
  );
}
