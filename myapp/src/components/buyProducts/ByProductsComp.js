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
    if (prodID !== '')
    //TODO: finish this comp

}

const ByProductsComp = () => {
    return (
        <div>

        </div>
    )
}

export default ByProductsComp
