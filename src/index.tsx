/*eslint-disable*/
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client"
import GlobalStyle from './style/Global'
import App from './pages/App'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import Providers from './Providers'
import 'inter-ui'
import './i18n'
import "./style/custom.css";


const client = new ApolloClient({
  link: new HttpLink({
    headers: "Access-Control-Allow-Origin : *",
    uri: "https://graphql.bitquery.io"
  }),
  cache: new InMemoryCache()
})

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
  localStorage?.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Providers>
        <>
          <ListsUpdater />
          <ApplicationUpdater />
          <TransactionUpdater />
          <MulticallUpdater />
        </>
        <ResetCSS />
        <GlobalStyle />
        <App />
      </Providers>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
)
