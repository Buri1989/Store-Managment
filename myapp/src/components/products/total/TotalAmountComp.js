import { useSelector } from 'react-redux'
import { Box, Container, createTheme, Paper, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'

const darkTheme = createTheme({ palette: { mode: 'dark' } })

const TotalAmountComp = () => {
    const productsSelector = useSelector(state => state.products)
    const purchasesSelector = useSelector(state => state.purchases)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let finalTotal = 0;
        purchasesSelector.forEach(purch => {
            let prod = productsSelector.filter(prod => prod.ID === purch.ProductId)
            if (prod) {
                prod.forEach(item => total += item.Price)
            }
        })
        setTotal(finalTotal)
    }, [productsSelector, purchasesSelector]);

    return (
        <Container>
            <ThemeProvider theme={darkTheme}>
                <Box sx={{
                    flexGrow: 1,
                    padding: "5px"
                }}>
                    <Paper sx={{
                        marginY: "5px",
                        alignContent: 'center',
                        padding: '10px'
                    }}>
                        Total - {total} $
                    </Paper>
                </Box>
            </ThemeProvider>
        </Container>
    )
}

export default TotalAmountComp