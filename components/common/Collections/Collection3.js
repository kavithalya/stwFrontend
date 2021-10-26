import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
// import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ProductItems from '../product-box/ProductBox1';
import { Row, Col, Container, Media } from 'reactstrap';
import CartContext from '../../../helpers/cart';
import { WishlistContext } from '../../../helpers/wishlist/WishlistContext';
// import PostLoader from '../PostLoader';
import { CompareContext } from '../../../helpers/Compare/CompareContext';
// import search from '../../../public/assets/images/empty-search.jpg'
import FilterContext from '../../../helpers/filter/FilterContext';
import { useRouter } from 'next/router';
import { CurrencyContext } from '../../../helpers/Currency/CurrencyContext';
import AutoFitImage from 'react-image-autofit-frame';
import Link from "next/link";
import Loader from '../../../components/common/Loader';


 

const TopCollection = ({ type, title, subtitle, designClass, noSlider, cartClass, productSlider, titleClass, noTitle, innerClass, inner, backImage }) => {

    const context = useContext(CartContext)
    const contextWishlist = useContext(WishlistContext);
    const comapreList = useContext(CompareContext);
    const quantity = context.quantity;
    const [delayProduct,setDelayProduct] = useState(true)
    const router = useRouter();
    const curContext = useContext(CurrencyContext);
    const topCollections = curContext.state.topCollections; 
    const filterContext = useContext(FilterContext);
    const [geoLocation, setgeoLocation] = useState(
        sessionStorage.getItem('geoLocation')
    );


    const linkStyle ={
        fontSize:12,
        cursor: 'pointer',
        objectFit: "cover",
        width: "100%",
        height: "100%",
        borderWidth:  3,  
        borderLeftColor:  'red'
    }
    const lableStyle={
        backgroundColor:"red",
        fontSize:"12px",
        color:"white",
        marginBottom: "29px"
    }

 
        const loaderStyle={
        margin: "auto",
        width: "60%",
 
        padding: "10px",
    }
    
    const getURL = (data) => {
        filterContext.setselectedKeyword("");
        filterContext.setSelectedCategory("");
        filterContext.setSelectedPromaflag(data.category);

        var gLocation = "";
        if(geoLocation==null)
        gLocation="";
        else
        gLocation = geoLocation;
        
        var url ="/promo/"+data.category 

        return url;
    }

   
    useEffect(() => {
        if (topCollections === undefined) {
            noSlider === false;
        } else {
            noSlider === true;
        }
        
        setTimeout(() => {
                (false)  
        }, 5000);

    }, [delayProduct])
    return (
        <>
            <div className={designClass}>
                {noSlider ?
                    <Container>
                        <Row>
                            <Col>
                                {
                                    noTitle === "null" ?
                                        ""
                                        :
                                        <div className={innerClass}>
                                            {subtitle ? <h6>{subtitle}</h6> : ''}
                                            <h4 className={inner}>{title}</h4>
                                            {titleClass ?
                                                <hr role="tournament6" />
                                                :
                                                <div className="line"></div>
                                            }
                                        </div>
                                }

                                {topCollections && topCollections.length>0 ?
                                                                
                                <Slider {...productSlider} className="product-m no-arrow">
                                        
                                        {topCollections && topCollections.slice(0, 10).map((collection, index) =>
                                            <Link href={getURL(collection)}>
                                            <div style={linkStyle} className="front" key={index} >
                                                <center> <AutoFitImage frameWidth="260px" imgSize="contain" frameHeight="200px" imgSrc={collection.imguRL}/> </center> 
                                                {/* <center style={lableStyle}> <a style={{color:"white"}}  href="#" onClick={() => getURL(collection)} >{collection.keyWorld} </a></center>  */}
                                            </div>
                                            </Link>)}
                                </Slider>

                                :
                                <div className="row mx-0 margin-default">
                                <div className="col-xl-3 col-lg-4 col-6">

                                <div className="top-banner-wrapper" style={loaderStyle}> 
                                    <div className="row mx-0 margin-default">
                                            <div className="col-xl-12 col-lg-12 col-12">
                                            <div className="typography_section"> 
                                                <div className="typography-box"> 
                                                    <div  className="custom-load typo-content loader-typo" >
                                                        
                                                    <Loader />
                                                         {/* <div className="pre-loader"></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-6">
                                <div className="top-banner-wrapper" style={loaderStyle}> 
                                    <div className="row mx-0 margin-default">
                                            <div className="col-xl-12 col-lg-12 col-12">
                                            <div className="typography_section"> 
                                                <div className="typography-box"> 
                                                    <div  className="custom-load typo-content loader-typo" >
                                                        
                                                    <Loader />
                                                         {/* <div className="pre-loader"></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-6">
                                <div className="top-banner-wrapper" style={loaderStyle}> 
                                    <div className="row mx-0 margin-default">
                                            <div className="col-xl-12 col-lg-12 col-12">
                                            <div className="typography_section"> 
                                                <div className="typography-box"> 
                                                    <div  className="custom-load typo-content loader-typo" >
                                                        
                                                         <Loader />
                                                         {/* <div className="pre-loader"></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-6">
                                <div className="top-banner-wrapper" style={loaderStyle}> 
                                    <div className="row mx-0 margin-default">
                                            <div className="col-xl-12 col-lg-12 col-12">
                                            <div className="typography_section"> 
                                                <div className="typography-box"> 
                                                    <div  className="custom-load typo-content loader-typo" >
                                                        
                                                         <Loader />
                                                         {/* <div className="pre-loader"></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                </div>
                                </div>
                                }
                            </Col>
                        </Row>
                    </Container>
                    :
                    <>
                        {title ? <div className="title1 title-gradient  section-t-space">
                            <h6>{subtitle}</h6>
                            <h4 className="title-inner1">{title}</h4>
                            <hr role="tournament6" />
                        </div> : ''}
                        <Container>
                            <Row className="margin-default">
                                {(!data || !data.products || !data.products.items || !data.products.items.length === 0 || !loading) ?
                                    
                                    <div className="top-banner-wrapper" style={loaderStyle}> 
                                    <div className="row mx-0 margin-default">
                                            <div className="col-xl-12 col-lg-12 col-12">
                                            <div className="typography_section"> 
                                                <div className="typography-box"> 
                                                    <div  className="custom-load typo-content loader-typo" >
                                                        
                                                         <Loader />
                                                         {/* <div className="pre-loader"></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                    :
                                    data && data.products.items.slice(0, 8).map((product, index) =>
                                        <Col xl="3" sm="6" key={index}>
                                            <div>
                                                <ProductItems product={product} backImage={backImage}
                                                    addCompare={() => comapreList.addToCompare(product)}
                                                    addWishlist={() => contextWishlist.addToWish(product)}
                                                    title={title}
                                                    cartClass={cartClass}
                                                    addCart={() => context.addToCart(product, quantity)} key={index} />
                                            </div>
                                        </Col>
                                    )
                                    
                                }
                            </Row>
                        </Container>
                    </>
                }

            </div>
        </>
    )
}


export default TopCollection;