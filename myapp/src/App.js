import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import BuyProductsComp from './components/buyProducts/BuyProducts'
import CustomersComp from './components/customers/CustomersComp'
import EditCustomersComp from './components/editCustomers/EditCustomersComp'
import EditProductsComp from './components/editProducts/EditProductsComp'
import MainComp from './components/main/MainComp'
import NavbarComp from './components/navbar/NavbarComp'
import ProductsComp from './components/products/ProductsComp'
import PurchasesComp from './components/purchases/PurchasesComp'




const App = () => {
  return (
    <Router>
      <NavbarComp />
      <Outlet />
      <Routes>
        <Route
          exact
          path='/'
          element={<MainComp />}
        />
        <Route
          exact
          path='/Products'
          element={<ProductsComp />}
        />
        <Route
          exact
          path='/EditProducts/:id'
          element={<EditProductsComp />}
        />
        <Route
          exact
          path='/EditCustomers/:id'
          element={<EditCustomersComp />}
        />
        <Route
          exact
          path='/BuyProduct/:id'
          element={<BuyProductsComp />}
        />
        <Route
          exact
          path='/Customers'
          element={<CustomersComp />}
        />
        <Route
          exact
          path='/Purchases'
          element={<PurchasesComp />}
        />
      </Routes>
    </Router>
  )
}

export default App
