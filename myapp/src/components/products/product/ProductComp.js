import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Box, Container, createTheme, Paper, ThemeProvider, Typography } from '@mui/material'
import ExpandedZoneComp from './expended Zone/ExpandedZoneComp'

const darkTheme = createTheme({ palette: { mode: 'dark' } })

const ProductComp = () => {
    const productSelector = useSelector(state => state.products)
    const customerSelector = useSelector(state => state.customers)
    const purchasesSelector = useSelector(state => state.purchases)

    return (
        <Container>
            <ThemeProvider theme={darkTheme}>
                <Box sx={{
                    flexGrow: 1,
                    padding: "5px"
                }}>
                    <Typography variant='h4'>
                        ✨ All Products
                    </Typography>
                    {productSelector && purchasesSelector.map((prod, index) => {
                        return <Paper sx={{
                            marginY: '10px',
                            alignContent: 'center',
                            padding: '10px',
                            backgroundColor: 'darkgray',
                            color: 'black',
                            border: '2px solid black',
                            '&:hover': {
                                'NameLink': {
                                    color: 'red'
                                }
                            }
                        }} key={index} elevation={2}>
                            <ul>
                                <Box sx={{
                                    'a': {
                                        color: 'black'
                                    },
                                    'a:hover': {
                                        color: 'seagreen'
                                    }
                                }}>
                                    <Link to={`/EditProducts/${prod.ID}`}>
                                        <li>
                                            Name:{prod.Name}
                                        </li>
                                    </Link>
                                </Box>
                                <li>
                                    Price:{prod.Price} $
                                </li>
                                <li>
                                    Quantity:{prod.Quantity}
                                </li>
                            </ul>

                            {(purchasesSelector && customerSelector) &&
                                purchasesSelector.length > 0 &&
                                (purchasesSelector.filter(pur => pur.ProductId === prod.ID).length) > 0 ?
                                <ExpandedZoneComp productID={prod.ID}
                                    customersSelect={customerSelector}
                                    purchasesSelect={purchasesSelector}>
                                </ExpandedZoneComp> : <Container>
                                    <Typography variant='body1' style={{ marginLeft: 25, color: 'black', fontWeight: 800 }}>
                                        No one bought this product yet.
                                    </Typography>
                                </Container>
                            }
                        </Paper>
                    })}
                </Box>
            </ThemeProvider>
        </Container>
    )
}

export default ProductComp
