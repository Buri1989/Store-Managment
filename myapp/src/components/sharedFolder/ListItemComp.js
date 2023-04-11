import React from 'react'
import { Container } from '@mui/material'
import { Link } from 'react-router-dom'


const ListItemComp = ({ isCustomer, customerList, productList }) => {
    return (<Container>
        {isCustomer ? <Container>
            {customerList && customerList.map(customer => {
                return <li key={customer.ID}>
                    <Link to={`/EditCustomers/${customer.ID}`}>
                        {customer.FirstName + ' ' + customer.LastName}
                    </Link>
                </li>
            })}
        </Container> : <Container>
            {productList && productList.map(product => {
                return <li key={product.ID}>
                    <Link to={`/EditProducts/${product.ID}`}>
                        {product.Name}
                    </Link>
                </li>
            })}
        </Container>}
    </Container >
    )
}

export default ListItemComp