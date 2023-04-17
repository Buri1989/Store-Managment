import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PanelComp from './panel/PanelComp'
import { Box, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import PreviewIcon from '@mue/icons-material/Preview'


const CustomersComp = () => {
    const customerSelector = useSelector(state => state.customers)
    const [panels, setPanels] = useState([]);
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    };

    useEffect(() => {
        let panels = []
        customerSelector.forEach(customer => {
            panels.push(`panel` + customer.ID);
        })
        setPanels(panels)
    }, [customerSelector]);

    return (<Container>
        <Typography variant='h4'>
            ✨ All Customers
        </Typography>
        <Box
            sx={{
                flexGrow: 1,
                marginTop: 3,
                width: '100%',
                height: '100%'
            }}
        >
            {panels && panels.length === 0 &&
                <Container>
                    <LoadingButton
                        size="large"
                        loadingPosition="start"
                        startIcon={<PreviewIcon />}
                        loading={panels.length === 0}
                    >
                        Show All Customers
                    </LoadingButton>
                </Container>
            }
        </Box>
        {panels.length > 0 && customerSelector.map((customer, index) => {
            return <Container key={index}>
                <PanelComp panel={panels[index]}
                    expanded={expanded}
                    handleChange={handleChange} customer={customer} />
            </Container>
        })}

    </Container>);
}

export default CustomersComp