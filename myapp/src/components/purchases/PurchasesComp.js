import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Box, Button, Container, createTheme, Grid, ThemeProvider, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import PurchasesTableComp from './PurchasesTableComp'

const darkTheme = createTheme({})

const PurchasesComp = () => {
    const productsSelector = useSelector(state => state.products)
    const customersSelector = useSelector(state => state.customers)

    const [opCus, setOpCus] = React.useState('')
    const [opProd, setOpProd] = React.useState('')

    const [showTable, setShowTable] = React.useState(false)

    const [optionCustomers, setOptionCustomers] = React.useState([])
    const [optionProducts, setOptionProducts] = React.useState([])


    const [selectedCustomer, setSelectedCustomer] = React.useState('')
    const [selectedProduct, setSelectedProduct] = React.useState('')
    const [selectedDate, setSelectedDate] = React.useState('')
    const [writtenDate, setWrittenDate] = React.useState('')

    React.useEffect(() => {
        const getProductList = () => {
            const _products = productsSelector.map(prod => {
                return {
                    label: prod.name,
                    id: prod.ID
                }
            })
            setOptionProducts(_products)
        }
        const getCustomersList = () => {
            const _customers = customersSelector.map(cus => {
                return {
                    label: cus.FirstName + ' ' + cus.LastName,
                    id: cus.ID
                }
            })
            setOptionCustomers(_customers)
        }
        getProductList();
        getCustomersList();
    }, [productsSelector, customersSelector]);

    const customerSelected = (cus) => {
        if (cus === null || cus === '' || cus === undefined) {
            setOpCus('')
        }
        if (cus) {
            setOpCus(cus.ID)
        }
    }

    const productSelected = (prod) => {
        if (prod === null || prod === '' || prod === undefined) {
            setOpProd(undefined)
        }
        if (prod) {
            setOpProd(prod.ID)
        }
    }

    const handleSearch = () => {
        setShowTable(true)
        setSelectedCustomer(opCus)
        setSelectedProduct(opProd)
        setSelectedDate(writtenDate)
    }

    return (<Container>
        <ThemeProvider theme={darkTheme}>
            <Typography variant='h4'>
                ✨ Purchases ✨
            </Typography>
            <Grid container sx={{}} gap={2}>
                <Grid item sm={12} lg={4}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            padding: "5px"
                        }}
                    >
                        <ControllableStates
                            options={optionCustomers}
                            label='Customers'
                            cusSelected={customerSelected}></ControllableStates>
                        <ControllableStates
                            options={optionProducts}
                            label='Products'
                            prodSelected={productSelected}></ControllableStates>
                        <Box
                            component={"form"}
                            sx={{
                                '& > :not(style)': { width: 300, marginTop: 3 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" color="primary" label="Dates" variant="outlined" focused onChange={(e) => {
                                setWrittenDate(e.target.value)
                            }}
                                helperText="Please enter your purchase date in the following format day/month/year"
                                placeholder='17/7/1994' />
                        </Box>
                        <Button variant='contained' sx={{ marginTop: 3 }} color="success" onClick={() => {
                            handleSearch()
                        }}>Search</Button>
                    </Box>
                </Grid>
                <Grid item sm={12} lg={7}>
                    <Box sx={{
                        margin: "30px 10px",

                    }}>
                        {showTable ? <PurchasesTableComp
                            productID={selectedProduct}
                            customerID={selectedCustomer}
                            selectedDate={selectedDate}></PurchasesTableComp> : <Container></Container>}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    </Container>
    )
}

export default PurchasesComp

const ControllableStates = ({ options, label, customerSelected, productSelected }) => {
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const handleChange = (newValue) => {
        if (customerSelected) {
            customerSelected(newValue)
        }
        else if (productSelected) {
            productSelected(newValue)
        }
    }

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    handleChange(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id='controllable-states-demo'
                options={options}
                clearOnEscape
                sx={{ width: 300, margin: 3 }}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </div >
    )
}
