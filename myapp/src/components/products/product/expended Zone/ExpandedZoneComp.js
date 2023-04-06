import * as React from 'react'
import { AccordionDetails, Container } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import UsersTableComp from './usersTable/UsersTableComp'

const ExpandedZoneComp = ({ productID, customersSelect, purchasesSelect }) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    };

    return (
        <Container>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1bh-content'
                    id='panel1bh-header'
                >
                    <Typography st sx={{ width: '33%', flexShrink: 0 }}>customers</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>All the customers that bought this product</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UsersTableComp productID={productID} customersSelect={customersSelect} purchasesSelect={purchasesSelect} />
                </AccordionDetails>
            </Accordion>
        </Container >

    )
}

export default ExpandedZoneComp
