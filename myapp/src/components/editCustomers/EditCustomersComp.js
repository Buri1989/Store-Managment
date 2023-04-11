import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Container, Grid, Paper, styled } from '@mui/material'
import ListItemComp from '../sharedFolder/ListItemComp'
import EditCustomerFormComp from './form/EditCustomerFormComp'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.button,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
}));

const EditCustomersComp = () => {
    const productSelector = useSelector(state => state.products)
    const customerSelector = useSelector(state => state.customers)
    const purchasesSelector = useSelector(state => state.purchases)

    const params = useParams();
    const [productList, setProductList] = useState([])
    const [customer, setCustomer] = useState({
        ID: 'ID',
        FirstName: 'First Name',
        LastName: 'Last Name',
        City: 'City'
    })

    useEffect(() => {
        let _productList = purchasesSelector.filter(pur => {
            return pur.CustomerId === params.id
        });
        const array = _productList.map(productsFromPurchase => {
            let productName = productSelector.find(item => {
                return Number(item.id) === Number(productsFromPurchase.ProductId)
            })
            if (!productName) {
                return productsFromPurchase;
            }
            return {
                ID: productName.ID,
                Name: productName.Name,

            }
        })
        setProductList(array);
    }, [productSelector, params, purchasesSelector]);

    useEffect(() => {
        const cus = customerSelector.filter(cus => Number(cus.ID) === Number(params.id))
        if (cus.length > 0) {
            setCustomer(cus[0])
        }
    }, [customerSelector, params.id]);

    return (<Container>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    {/* Customers data */}
                    edit customer 1
                    <EditCustomerFormComp customer={customer} />
                </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    {/* List of all items that a customer bought */}
                    <Box
                        sx={{
                            maxWidth: 400,
                            width: "fit-content"
                        }}>
                        <h1>Product List:</h1>
                        <ul>
                            {
                                productList.length > 0 &&
                                <ListItemComp isCustomer={false} productList={productList}></ListItemComp>
                            }
                        </ul>
                    </Box>
                </Item>
            </Grid>
        </Grid>
    </Container>)
}

export default EditCustomersComp
