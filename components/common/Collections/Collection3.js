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

const GET_PRODUCTS = gql`
    query  products($type:String!,$indexFrom:Int! ,$limit:Int!,$color:String!,$brand:[String!]! ,$priceMax:Int!,$priceMin:Int!,$keyword:String!,$country:String!,$panel:String!,$promoflag:String!,$relevantProduct:String) {
        products (type: $type ,indexFrom:$indexFrom ,limit:$limit ,color:$color ,brand:$brand  ,priceMax:$priceMax,priceMin:$priceMin,keyword:$keyword,country:$country,panel:$panel,promoflag:$promoflag,relevantProduct:$relevantProduct){
  total(keyword:$keyword,type:$type,promoflag:$promoflag,relevantProduct:$relevantProduct){
            total
        }
        hasMore(limit:$limit,indexFrom:$indexFrom,keyword:$keyword,type:$type,promoflag:$promoflag,relevantProduct:$relevantProduct){
            seqid
        }
        items(limit:$limit,indexFrom:$indexFrom,keyword:$keyword,type:$type,promoflag:$promoflag,relevantProduct:$relevantProduct){
            seqid
            sku
            title
            description
            bullepoints
            brandid
            categoryid
            isvisible
            isactive
            warehouseid
            metatagdescription
            seokeywords
            weight
            height
            width
            length
      
            fromcurrency
            asin
      images{
            productid
            mainimageurl
            additionalimage1
            additionalimage2
            additionalimage3
            additionalimage4
            additionalimage5
      }
      variants(country:$country,panel:$panel)
      {
            variantid
            sku
            productid
            color
            size
            processor
            graphics
            discount
            price 
            daystoship
            pwfee
            purchasetax
            conversionrate
            frieghtrate
            duty
            taxes
            fees
            margin
            quantity
      }
        }

        }
    }
`;

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
        fontSize:"15px",
        color:"white",
        marginRight: "43px",
        marginBottom: "29px"
    }

    // var { loading, data } =  useQuery(GET_PRODUCTS, {
    //     variables: {
    //         type: type,
    //         indexFrom: 0,
    //         limit: 8
    //     }
    // });
        const loaderStyle={
        margin: "auto",
        width: "60%",
 
        padding: "10px",
    }
    
    const getURL = (data) => {
        filterContext.setselectedKeyword("");
        filterContext.setSelectedCategory("");
        filterContext.setSelectedPromaflag(data.category);
        router.push(`/shop/six_grid?&brand=&color=&size=&minPrice=&maxPrice=&promoflag=${data.category}`)
    }

    // var { loading, data } = useQuery(GET_PRODUCTS, {
    //     variables: {
    //         type: "",
    //         priceMax: 10,
    //         priceMin: 1,
    //         color: "red",
    //         brand: "max",
    //         indexFrom: 0,
    //         limit: 8,
    //         keyword:"",
    //         country:country,
    //         panel:panel,
    //         promoflag:"highlight1"
    //     }
    // });
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
                                            <div style={linkStyle} className="front" key={index} >
                                                <AutoFitImage frameWidth="200px" imgSize="contain" frameHeight="160px" imgSrc={collection.imguRL}/>
                                                <center style={lableStyle}> <a style={{color:"white"}}  href="#" onClick={() => getURL(collection)} >{collection.keyWorld} </a></center> 
                                            </div>)}
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
                                                        
                                                         <div className="pre-loader"></div>
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
                                                        
                                                         <div className="pre-loader"></div>
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
                                                        
                                                         <div className="pre-loader"></div>
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
                                                        
                                                         <div className="pre-loader"></div>
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
                                                        
                                                         <div className="pre-loader"></div>
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