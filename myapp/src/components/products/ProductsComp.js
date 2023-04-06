import React from 'react'
import { Container } from '@mui/material'
import ProductComp from './product/ProductComp'
import TotalAmountComp from './total/TotalAmountComp'

const ProductsComp = () => {
    return (
        <Container>
            <TotalAmountComp />
            <hr></hr>
            <ProductComp />
        </Container>
    )
}

export default ProductsComp
