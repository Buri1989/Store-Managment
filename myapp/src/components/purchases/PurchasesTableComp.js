import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Container, TableHead } from '@mui/material';



const TablePageAction = (props) => {
    const theme = useTheme({
        palette: { mode: 'light' }
    });

    const { count, page, rowsPerPage, onPageChange } = props

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    }

    const handleBackPageButtonClick = (event) => {
        onPageChange(event, page - 1)
    }

    const handleNextPageButtonClick = (event) => {
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label='first page'>
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackPageButtonClick}
                disabled={page === 0}
                aria-label='previous page'>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) + 1}
                aria-label='next page'>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label='last page'>
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </IconButton>
        </Box >
    )
}

TablePageAction.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

const StylingTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



const PurchasesTableComp = ({ productID, customerID, selectedDate }) => {
    const productSelector = useSelector(state => state.products)
    const customerSelector = useSelector(state => state.customers)
    const purchasesSelector = useSelector(state => state.purchases)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [myRows, setMyRows] = useState([]);

    const createTableItem = (CustomerId, CustomerFullName, ItemName, ItemPurchaseData) => {
        const _tableItem = {
            customerID: CustomerId,
            name: CustomerFullName,
            purchasedItem: ItemName,
            purchaseData: ItemPurchaseData
        }
        return _tableItem
    }

    const createTableRows = useCallback(() => {
        let tableItemArray = []
        purchasesSelector.forEach(purchase => {
            /*Filter the customers and products that didn't got bought or didn't buy anything  */
            let customersFoundPurchase = undefined;
            let productsFoundPurchase = undefined;
            if (customerID) {
                customersFoundPurchase = customerSelector.find(cus => {
                    return Number(cus.ID) === Number(customerID) && Number(purchase.CustomerId) === Number(cus.ID)
                });
            } else {
                customersFoundPurchase = customerSelector.find(cus => cus.ID === purchase.CustomerId);
            }
            if (productID) {
                productsFoundPurchase = productSelector.find(prod => {
                    return Number(prod.ID) === Number(productID) && Number(prod.ID) === Number(purchase.ProductId)
                })
            } else {
                productsFoundPurchase = productSelector.find(prod => prod.ID === purchase.ProductId);
            }
            /*If a date was selected ,filter all the products that weren't bought that day */
            let d = true;
            if (selectedDate) {
                if (purchase.Date !== selectedDate)
                    d = false
            }
            if (customersFoundPurchase && productsFoundPurchase && d) {
                const tempRow =
                    createTableItem(customersFoundPurchase.ID,
                        `${customersFoundPurchase.FirstName}
                          ${customersFoundPurchase.LastName}`, productsFoundPurchase.Name, purchase.Date);
                tableItemArray = [...tableItemArray, tempRow];
            }
        })
        return tableItemArray;
    }, [customerID, customerSelector, productID, productSelector, purchasesSelector, selectedDate])

    useEffect(() => {
        setMyRows([])
        const tempRows = createTableRows()
        setMyRows(tempRows)

    }, [productID, customerID, customerSelector, productSelector, purchasesSelector, selectedDate, createTableItem]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myRows.length) : 0;

    const handlePageChange = (event, newPage) => {
        setPage(parseInt(newPage, 10));
    };

    const handleRowsPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const theme = useTheme();

    return (<ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StylingTableCell align="center">User ID</StylingTableCell >
                        <StylingTableCell align="center">User Name</StylingTableCell>
                        <StylingTableCell align="center">Purchased Item</StylingTableCell>
                        <StylingTableCell align="center">Purchase Date</StylingTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? myRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : myRows).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ width: 160 }} align='center'>{row.customerID}</TableCell>
                                <TableCell style={{ width: 160 }} align='center'>{row.name}</TableCell>
                                <TableCell style={{ width: 160 }} align='center'>{row.purchasedItem}</TableCell>
                                <TableCell style={{ width: 160 }} align='center'>{row.purchaseData}</TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={myRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPageChange}
                            ActionsComponent={TablePageAction} />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </ThemeProvider>
    )
}

export default PurchasesTableComp
