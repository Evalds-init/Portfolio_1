import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import MainPageItems from './components/items/MainPageItems';
import Alerts from './components/utils/Alerts';
import SingleItem from './components/items/item/SingleItem';
import Basket from './components/basket/frame/Basket';
import Orders from './components/orders/Orders';
import Account from './components/account/Account';
import ProductState from './context/products/productState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import BasketState from './context/basket/BasketState';
import AddMerchandise from './components/admin/AddMerchandise';
import Checkout from './components/basket/payment/Checkout';
import Canceled from './components/basket/payment/Canceled';
import OrderState from './context/orders/OrderState';
import './css/style.comp.css';
function App() {
  return (
    <AuthState>
      <AlertState>
        <ProductState>
          <BasketState>
            <OrderState>
              <Router>
                <div className="container">
                  <Navbar />
                  <Alerts />

                  <Switch>
                    <Route exact path="/" component={MainPageItems} />
                    <Route exact path="/basket" component={Basket} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route
                      exact
                      path="/checkout/canceled"
                      component={Canceled}
                    />
                    <Route exact path="/orders" component={Orders} />
                    <Route exact path="/register" component={Register} />

                    <Route
                      exact
                      path="/admin/addmerchandise"
                      component={AddMerchandise}
                    />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/item/:id" component={SingleItem} />
                    <Route exact path="/account" component={Account} />
                  </Switch>
                </div>
              </Router>
            </OrderState>
          </BasketState>
        </ProductState>
      </AlertState>
    </AuthState>
  );
}

export default App;
