import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { WalletProvider } from "./contexts/wallet";
import { ConnectionProvider } from "./contexts/connection";
import { AccountsProvider } from "./contexts/accounts";
import { MarketProvider } from "./contexts/market";
import { PurchaseProvider } from "./contexts/purchase";
import { AdvertiseProvider } from "./contexts/advertise";
import { ApiProvider } from "./contexts/api";
import { AppLayout } from "./components/Layout";

import { FaucetView, HomeView, GridView } from "./views";

export function Routes() {
  return (
    <>
      <HashRouter basename={"/"}>
        <ConnectionProvider>
          <WalletProvider>
            <AccountsProvider>
              <MarketProvider>
                <ApiProvider>
                  <PurchaseProvider>
                    <AdvertiseProvider>
                      <AppLayout>
                        <Switch>
                          {/* <Route
                            exact
                            path="/"
                            component={() => <HomeView />}
                          /> */}
                          <Route
                            exact
                            path="/"
                            component={() => <GridView />}
                          />
                          {/* <Route
                            exact
                            path="/faucet"
                            children={<FaucetView />}
                          /> */}
                        </Switch>
                      </AppLayout>
                    </AdvertiseProvider>
                  </PurchaseProvider>
                </ApiProvider>
              </MarketProvider>
            </AccountsProvider>
          </WalletProvider>
        </ConnectionProvider>
      </HashRouter>
    </>
  );
}
