import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#1A2027',
    ...theme.typography.button,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    '&:hover': {
        backgroundColor: 'gray',
        color: 'black',
    }
}));

const MenuComp = () => {

    const navigate = useNavigate();

    const navigateTo = (event, button, address) => {
        event.preventDefault();
        navigate(address)
    }

    return (<Container>
        <Box sx={{
            with: '100%',
            height: '100%'
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <Item onClick={(event) => {
                        navigateTo(event, "products clicked", "/Products")
                    }}>Products</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Item onClick={(event) => {
                        navigateTo(event, "customers clicked", "/Customers")
                    }}>Customers</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Item onClick={(event) => {
                        navigateTo(event, "purchases clicked", "/Purchases")
                    }}>Purchases</Item>
                </Grid>
            </Grid>
        </Box>
    </Container >
    )
}

export default MenuComp