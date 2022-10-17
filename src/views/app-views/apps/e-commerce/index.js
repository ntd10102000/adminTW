import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductList from "./product-list";
import AddProduct from "./add-product";
import EditProduct from "./edit-product";
import Orders from "./orders";
import Subject from "./subject";
import Classes from "./classes";
import Helplines from "./helplines";
import Feedbacks from "./feedbacks";
import Revision from "./revision";
import TeacherClassSubject from "./teacher-class-subject";
import User from "./user";

const Ecommerce = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/product-list`} />
      <Route path={`${match.url}/add-product`} component={AddProduct} />
      <Route path={`${match.url}/edit-product/:id`} component={EditProduct} />
      <Route path={`${match.url}/product-list`} component={ProductList} />
      <Route path={`${match.url}/subject`} component={Subject} />
      <Route path={`${match.url}/classes`} component={Classes} />
      <Route path={`${match.url}/helplines`} component={Helplines} />
      <Route path={`${match.url}/feedbacks`} component={Feedbacks} />
      <Route path={`${match.url}/revision`} component={Revision} />
      <Route path={`${match.url}/orders`} component={Orders} />
      <Route path={`${match.url}/tcs`} component={TeacherClassSubject} />
      <Route path={`${match.url}/user`} component={User} />
    </Switch>
  );
};

export default Ecommerce;
