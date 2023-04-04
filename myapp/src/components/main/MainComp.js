/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MenuComp from '../menu/MenuComp'

const MainComp = () => {

    const customersSelector = useSelector(state => state.customers)
    const purchasesSelector = useSelector(state => state.purchases)

    useEffect(() => {

    }, [customersSelector]);

    useEffect(() => {

    }, [purchasesSelector]);

    return (
        <MenuComp />
    )
}

export default MainComp
