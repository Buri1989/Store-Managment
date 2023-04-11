import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useDispatch } from 'react-redux';
import { updateCustomer, deleteCustomer } from '../../../redux/reduxSlice/customers/customers'


function MyFormHelperText(text) {
    const { focused } = useFormControl() || {};
    const _focused = text.text.focused;
    const _text = text.text.text;
    const helperText = React.useMemo(() => {
        if (focused) {
            return _focused;
        }
        return _text;
    }, [focused, _focused, _text]);

    return <FormHelperText>{helperText}</FormHelperText>;
}

const EditCustomerFormComp = ({ customer }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const [snackBarMessage, setSnackBarMessage] = React.useState('');

    const [ID, setID] = React.useState(customer.ID)
    const [FirstName, setFirstName] = React.useState(customer.FirstName)
    const [LastName, setLastName] = React.useState(customer.LastName)
    const [City, setCity] = React.useState(customer.City)

    React.useEffect(() => {
        setID(customer.ID)
        setFirstName(customer.FirstName)
        setLastName(customer.LastName)
        setCity(customer.City)
    }, [customer])

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickAway') {
            return;
        }

        setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleUpdate = () => {
        const obj = {
            ID: ID,
            FirstName: FirstName,
            LastName: LastName,
            City: City
        }
        dispatch(updateCustomer(obj))
        setSnackBarMessage("Customer Updated")
        handleClick()
    }

    const handleDelete = () => {
        dispatch(deleteCustomer(ID))
        setSnackBarMessage("Customer Deleted")
        handleClick()
    }


    return (
        <Box component="form" sx={{
            '& > :not(style)': { m: 1 },
        }} noValidate autoComplete="off">
            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput label="ID" value={ID} onChange={(e) => {
                    setID(e.target.value)
                }} />
                <MyFormHelperText text={{ focused: 'ID', text: '' }} />
            </FormControl>
            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput value={FirstName} onChange={(e) => {
                    setFirstName(e.target.value)
                }} />
                <MyFormHelperText text={{ focused: 'First Name', text: '' }} />
            </FormControl>
            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput value={LastName} onChange={(e) => {
                    setLastName(e.target.value)
                }} />
                <MyFormHelperText text={{ focused: 'Last Name', text: '' }} />
            </FormControl>
            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput value={City} onChange={(e) => {
                    setCity(e.target.value)
                }} />
                <MyFormHelperText text={{ focused: 'City', text: '' }} />
            </FormControl>
            <Button variant='contained' sx={{ padding: 2 }} endIcon={<UpdateIcon />} color={"success"} onClick={
                handleUpdate
            }>Update</Button>
            <Button variant='contained'
                sx={{ padding: 2 }} startIcon={<DeleteIcon />} color={"error"} onClick={handleDelete}>Delete</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>

        </Box>
    );
}

export default EditCustomerFormComp