import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  UserList as UserListView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  ItemList as ItemListView,
  AddItem as AddItemView,
  PriceList as PriceListView,
  OrderList as OrderListView,
  FAQList as FAQListView,
  BannerList as BannerListView,
  AddBanner as AddBannerView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ItemListView}
        exact
        layout={MainLayout}
        path="/items"
      />
      <RouteWithLayout
        component={BannerListView}
        exact
        layout={MainLayout}
        path="/banners"
      />
      <RouteWithLayout
        component={FAQListView}
        exact
        layout={MainLayout}
        path="/faqs"
      />
      <RouteWithLayout
        component={OrderListView}
        exact
        layout={MainLayout}
        path="/orders"
      />
      <RouteWithLayout
        component={PriceListView}
        exact
        layout={MainLayout}
        path="/item/price"
      />
      <RouteWithLayout
        component={AddItemView}
        exact
        layout={MainLayout}
        path="/edit-item"
      />
      <RouteWithLayout
        component={AddBannerView}
        exact
        layout={MainLayout}
        path="/edit-banner"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
