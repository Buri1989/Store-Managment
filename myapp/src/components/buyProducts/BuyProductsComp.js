import * as React from 'react'
import { useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { addPurchase } from '../../redux/reduxSlice/purchases/purchases'
import { quantityProductUpdate } from '../../redux/reduxSlice/products/products'


const addProduct = (_customerId, chosen, productsSelect, dispatch) => {
    let prodID = '';
    const date = new Date();
    const UTC_DATE = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

    productsSelect.forEach(product => {
        if (product.Name === chosen) {
            prodID = product.ID;
        }
    })
    if (prodID !== '') {
        const obj = {
            Date: UTC_DATE,
            ProductId: prodID,
            CustomerId: _customerId ? _customerId : '1',
            ID: nanoid()
        }
        dispatch(addPurchase(obj))
        dispatch(quantityProductUpdate(obj.ProductId))
    }
}

const BuyProductsComp = ({ _customerId }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const [open, setOpen] = React.useState(false);
    const productsSelect = useSelector(state => state.products);
    const [products, setProducts] = React.useState([]);
    const [chosen, setChosen] = React.useState('')

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
    })

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickAway') {
            return;
        }
        setOpen(false)
    }

    React.useEffect(() => {
        const product = [...productsSelect];
        let productsNames = []
        product.forEach(item => {
            productsNames = [...productsNames, item.Name];
        })
        setProducts(productsNames)
        setChosen(productsNames[0]);
    }, [productsSelect]);

    return (<Container>
        <Typography variant='h4' sx={{
            flexGrow: 1,
            textAlign: 'center',
            marginBottom: 3,
            fontWeight: 700,
            color: 'seagreen',
            textShadow: '2px 2px 1px'
        }}>Buy Product</Typography>
        <Box sx={{
            width: '100%',
            height: '100%',
            placeContent: 'center'
        }}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Autocomplete
                        disablePortal
                        id='combo=box-demo'
                        option={products}
                        onChange={(event, newValue) => {
                            setChosen(newValue)
                        }}
                        renderInput={(params => <TextField {...params} label="Products" />)}
                    />
                    <Button
                        variant='contained'
                        color='success'
                        sx={{
                            height: 53
                        }}
                        endIcon={<AddIcon></AddIcon>}
                        onClick={() => {
                            if (params.id && params.id.includes('=')) {
                                const customer_id = params.id.split('=')[1]
                                _customerId = customer_id
                            }
                            addProduct(_customerId, chosen, productsSelect, dispatch)
                            handleClick()
                        }}>Add</Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                            Item was added successfully!
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </Box>
    </Container>)
}

export default BuyProductsComp
