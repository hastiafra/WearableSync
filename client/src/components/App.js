import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//styling
import Globalstyles from "./Globalstyles";

//children
import Home from "./HomePage/Home";
import About from "./About";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import ItemDetailPage from "./ItemDetailPage";
import CheckOutForm from "./shoppingCart/CheckoutForm";
import Category from "./Category";
import Search from "./Search";
import SearchError from "../components/Navbar/SearchError";

import ErrorPage from "./ErrorPage";
import ConfirmationPage from "./ConfirmationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Globalstyles />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/category/:type">
            <Category />
          </Route>
          <Route path="/search/:type">
            <Search />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/item/:_id">
            <ItemDetailPage />
          </Route>
          <Route exact path="/checkout">
            <CheckOutForm />
          </Route>
          <Route exact path="/shopping-cart">
            <ShoppingCart/>
          </Route>
          <Route path="/error">
            <ErrorPage />
          </Route>
          <Route path="/searcherror">
            <SearchError />
          </Route>
          <Route path="/confirmation/:id">
            <ConfirmationPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
