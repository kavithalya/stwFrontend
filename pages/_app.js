import React, { useEffect, useState } from 'react';
import ThemeSettings from '../components/customizer/theme-settings';
import '../public/assets/scss/app.scss';
import '../public/assets/css/react-confirm-alert.css';
import '../public/assets/css/MasterControl.css';
import { ToastContainer } from 'react-toastify';
import TapTop from '../components/common/widgets/Tap-Top';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { MenuContextProvider } from '../helpers/menu/MenuContext';
import CartContextProvider from '../helpers/cart/CartContext';
import { WishlistContextProvider } from '../helpers/wishlist/WishlistContext';
import FilterProvider from '../helpers/filter/FilterProvider';
import SettingProvider from '../helpers/theme-setting/SettingProvider';
import { CompareContextProvider } from '../helpers/Compare/CompareContext';
import { CurrencyContextProvider } from '../helpers/Currency/CurrencyContext';
import Helmet from 'react-helmet';
import { useRouter } from 'next/router'
import { ApolloProvider, useQuery } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import { useAmp } from 'next/amp'
import Loader from '../components/common/Loader';

// import * as ga from '../pages/lib/ga'
const client = new ApolloClient({
      // uri: "https://test.digitechniq.in/graphql"  //local stwapi
    uri: "http://localhost:4000/graphql"  //local stwapi
    // uri: "https://test.digitechniq.in/graphql" //local stwapi
    // http://162.0.210.5:4458/
    // uri: "http://162.0.210.5:4457/api/graphql"  //local stwapi
    // uri: "https://cryptic-mountain-48315.herokuapp.com/api/graphql"  //Test env
    //uri:'https://docker.digitechniq.in/api/graphql', //production env 001
    
// uri:'https://stwecommerceapi.digitechniq.in/graphql', //production env 002
    
    
})


export const config = { amp: 'hybrid' }
export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const router = useRouter()
   
  useEffect(() => {
    const path = window.location.pathname.split('/');
    const url = path[path.length - 1];
    setUrl(url);
    // document.body.classList.add('dark');
    setTimeout(function () {
      setIsLoading(false)
    }, 1000);

    const handleRouteChange = (url) => {
      window.gtag('config', 'UA-185043489-2', {
        page_path: url,
      })
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }

  }, [router.events]);
  return (
    <>
      {
        isLoading ?

          <div className="loader-wrapper" >
            {
              url === 'Christmas' ?
                <div id="preloader"></div>
                :
                <Loader />
                // <div className="loader"></div>
            }


          </div>
          :
          <>
            {/* <MessengerCustomerChat
              pageId="2123438804574660"
              appId="406252930752412"
              htmlRef="https://connect.facebook.net/en_US/sdk.js"
            /> */}
          <Helmet>
            
           
          </Helmet>
            <div>
            <ApolloProvider client={client}>
              <SettingProvider>
                <CompareContextProvider>
                  <CurrencyContextProvider>
                    <CartContextProvider>
                      <WishlistContextProvider>
                        <MenuContextProvider>
                          <FilterProvider>
                            <Component {...pageProps} />
                          </FilterProvider>
                        </MenuContextProvider>
                      </WishlistContextProvider>
                    </CartContextProvider>
                  </CurrencyContextProvider>
                  <ThemeSettings />
                </CompareContextProvider>
              </SettingProvider>
              <ToastContainer />
              <TapTop />
              </ApolloProvider>
            </div>
          </>
      }

    </>
  )
}