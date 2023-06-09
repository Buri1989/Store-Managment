import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
import { Button, Container, TableHead } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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

function CustomerProductComp({ customer }) {
    const purchasesSelector = useSelector(state => state.purchases)
    const productsSelector = useSelector(state => state.products)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [myRows, setMyRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let tempRows = [];
        if (purchasesSelector) {
            purchasesSelector.forEach(purchase => {
                if (purchase.CustomerId === customer.ID) {
                    const productPurchases = productsSelector.filter(prod => prod.ID === purchase.ProductId);
                    if (productPurchases) {
                        productPurchases.forEach(item => {
                            tempRows.push({
                                productID: purchase.ProductId,
                                productName: item.Name,
                                purchaseDate: purchase.Date,
                            })
                        })
                    }
                }
            })
            setMyRows(tempRows)
        }
        else {
            tempRows.push({
                productID: 1,
                productName: "product name",
                purchaseDate: "17.7.1994",
            })
            setMyRows(tempRows)
        }
    }, [customer.ID, productsSelector, purchasesSelector]);

    /*Avoid a layout jump when reaching the last page with empty rows. */
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

    return (
        <Container>
            {myRows.length > 0 ? <ThemeProvider theme={theme}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StylingTableCell>Product Name</StylingTableCell>
                                <StylingTableCell align="center">Purchase Date</StylingTableCell>
                                <StylingTableCell align="center">Buy Product</StylingTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? myRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : myRows
                            ).map((row) => (
                                <TableRow key={row.name} sx={{
                                    color: 'black',
                                    '&': {
                                        'a': {
                                            color: 'black'
                                        }
                                    },
                                }}>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/EditProducts/${row.productID}`}>{row.productName}</Link>
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.purchaseDate}
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="center">
                                        <Box sx={{
                                            flexGrow: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center'
                                        }}>
                                            <Button variant="contained"
                                                color="success" endIcon={<SendIcon />} onClick={() => {
                                                    navigate(`/BuyProduct/${customer.ID}`)
                                                }}>Buy Product</Button>
                                        </Box>
                                    </TableCell>
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
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
                                    ActionsComponent={TablePageAction}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </ThemeProvider> : <Container></Container>}
        </Container>
    )
}

export default CustomerProductComp