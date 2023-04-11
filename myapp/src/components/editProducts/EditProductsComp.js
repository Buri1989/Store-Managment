import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Container, Grid, Paper, styled } from '@mui/material'
import ListItemComp from '../sharedFolder/ListItemComp'
import EditProductFormComp from './form/EditProductFormComp'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.button,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    '&:hover': {
        backgroundColor: 'lightgray',
        color: 'black',
    }
}));

const EditProductsComp = () => {
    const productSelector = useSelector(state => state.products)
    const customerSelector = useSelector(state => state.customers)
    const purchasesSelector = useSelector(state => state.purchases)
    const params = useParams();
    const [customerList, setCustomerList] = useState([])
    const [product, setProduct] = useState({
        ID: 'ID',
        Name: 'Name',
        Quantity: 'Quantity',
        Price: 'Price'
    })

    useEffect(() => {
        let _customerList = purchasesSelector.filter(pur => {
            return Number(pur.ProductId) === Number(params.id)
        });
        const array = _customerList.map(customerFromPurchase => {
            let customerName = customerSelector.find(item => {
                return Number(item.id) === Number(customerFromPurchase.CustomerId)
            })
            if (!customerName) {
                return customerFromPurchase;
            }
            return {
                ID: customerName.ID,
                FirstName: customerName.FirstName,
                LastName: customerName.LastName
            }
        })
        setCustomerList(array);
    }, [customerSelector, params, purchasesSelector]);

    useEffect(() => {
        const prod = productSelector.filter(prod => Number(prod.ID) === Number(params.id))
        if (prod.length > 0) {
            setProduct(prod[0])
        }
    }, [params.id, productSelector]);

    return (<Container>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    {/*Product data */}
                    Edit product 1
                    <EditProductFormComp product={product} />
                </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    {/*List of all customers that bought the item */}
                    <Box sx={{
                        width: 'fit-content',
                        maxWidth: 400
                    }}>
                        <h1>Customer List</h1>
                        <ul>
                            {customerList.length > 0 && < ListItemComp isCustomer={true} customerList={customerList}></ListItemComp>}
                        </ul>
                    </Box>
                </Item>
            </Grid>
        </Grid>
    </Container>)
}

export default EditProductsComp