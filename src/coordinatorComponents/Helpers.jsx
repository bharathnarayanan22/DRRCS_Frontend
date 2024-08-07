import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography, IconButton, Box, Skeleton } from '@mui/material';

const Helpers = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom style={{ color: '#121481', fontWeight: 'bold' }}>
                Helpers Enrolled
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="helpers table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#000' }}>
                            <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Helpers</TableCell>
                            <TableCell align='right' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell align='right' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell>V1</TableCell>
                            <TableCell align='right'>Role</TableCell>
                            <TableCell align='right'>
                                <IconButton style={{ color: '#000' }}
                                    sx={{ '&:hover': { color: 'blue' } }}><EditIcon /></IconButton>
                                <IconButton style={{ color: '#000' }}
                                    sx={{ '&:hover': { color: 'blue' } }}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Helpers;