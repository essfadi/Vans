import styled from 'styled-components';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip,
    Box,
  } from "@mui/material"; 

export const MyBigTable = styled(Table)`
    min-width: 70vw;
`;

export const MyTableContainer = styled(TableContainer)`
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    margin: 10px 10px;
    max-width: 90vw;
`;

export const MyTablePagination = styled(TablePagination)`
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    margin: 10px 10px;
    max-width: 80vw;
    min-width: 75vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #A2AEBB;
    
`;

export const MyTableHeadCell = styled(TableCell)`
    background-color: #3F88C5;
    color: #fff;
    font-weight: 600;
    font-family: 'Source Code Pro', monospace;
`;

export const MyPaper = styled(Paper)`
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    margin: auto;    
    max-width: 95vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`; 
export const MyToolbar = styled(Toolbar)`
    width: 100%;
`;

export const MyTitle = styled(Typography)`
    font-family: 'Poppins', sans-serif !important;
    font-weight: 600 ;
    font-size: 2rem !important;
    
    text-align: center;
`;