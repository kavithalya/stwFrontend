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
import cImg from '../../../public/assets/images/Category/Desktops.jpg';
import Link from "next/link";
import { getInitialProps } from 'react-i18next';
import Loader from '../../../components/common/Loader';


const CategoryCollection = ({ type, categoryData, title, subtitle, designClass, noSlider, cartClass, productSlider, titleClass, noTitle, innerClass, inner, backImage }) => {

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
    
    // const getURL = (data) => {
    //     filterContext.setselectedKeyword("");
    //     filterContext.setSelectedCategory("");
    //     filterContext.setSelectedPromaflag(data.category);
    //     router.push(`${geoLocation}/shop/six_grid?&brand=&color=&size=&minPrice=&maxPrice=&promoflag=${data.category}`)
    // }

 

    const getProps=(category)=>{

        var pros = JSON.parse(JSON.stringify(productSlider)); 
        if(category.subCategoryList == undefined && category.length > 0)
        {
            
            
            if(pros.slidesToShow > category.length)
                pros.slidesToShow = category.length;

            for(var i=0; i < pros.responsive.length; i++){
                if(pros.responsive[i].settings.slidesToShow > category.length)
                    pros.responsive[i].settings.slidesToShow = category.length; 
            }

        }
        else if(category.length == undefined && category.subCategoryList.length > 0)
        {

            if(pros.slidesToShow > category.subCategoryList.length)
                pros.slidesToShow = category.subCategoryList.length;


            for(var i=0; i < pros.responsive.length; i++){
                
                if(pros.responsive[i].settings.slidesToShow > category.subCategoryList.length)
                pros.responsive[i].settings.slidesToShow = category.subCategoryList.length;
            }
            
        }
        return pros;
    }


    const getImage=(data)=>{
        var templateStringForImage = `../../../public/assets/images/Category/${data}.jpg`
        return require(templateStringForImage);
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
                            <Col style={{marginTop:"10px",marginBottom:"10px"}}>
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

                                {(categoryData.subCategoryList && categoryData.subCategoryList!=undefined && categoryData.subCategoryList.length>0) || 
                                    (categoryData  && categoryData.length>0) ?
                                                                
                                <Slider {...getProps(categoryData)} className="product-m no-arrow">
                                        
                                        {categoryData.subCategoryList && categoryData.subCategoryList.map((collection, index) =>
                                            <div style={linkStyle} className="front" key={index}  >
                                                {/* <center> 
                                                <AutoFitImage frameWidth="150px" imgSize="contain" frameHeight="160px" imgSrc={collection.imguRL}/> 
                                                </center>  */}
                                                 <Link href={`/category/${collection.ParentMenuKey}/${collection.MenuKey}`}><div className="categoreCollection">
                                                     {collection.SubCategoryName}
                                                     {/* <AutoFitImage frameWidth="72px" imgSize="contain" frameHeight="53px" imgSrc={getImage("Desktops")}/>  */}
                                                </div></Link> 
                                                {/* <center style={lableStyle}> <a style={{color:"white"}}  href="#" onClick={() => getURL(collection)} >{collection.keyWorld} </a></center>  */}
                                            </div>)}
                                            {categoryData  && categoryData.length>0 && categoryData.map((collection, index) =>
                                            <div style={linkStyle} className="front" key={index}  >
                                                {/* <center> 
                                                <AutoFitImage frameWidth="150px" imgSize="contain" frameHeight="160px" imgSrc={collection.imguRL}/> 
                                                </center>  */}
                                                 <Link href={`/category/${collection.ParentMenuKey}/${collection.SubMenuKey}/${collection.MenuKey}`}><div className="categoreCollection">
                                                     {collection.LeafCategory}
                                                     {/* <AutoFitImage frameWidth="72px" imgSize="contain" frameHeight="53px" imgSrc={getImage("Desktops")}/>  */}
                                                </div></Link> 
                                                {/* <center style={lableStyle}> <a style={{color:"white"}}  href="#" onClick={() => getURL(collection)} >{collection.keyWorld} </a></center>  */}
                                            </div>)}
                                </Slider>

                                : ""
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
                                                        
                                                         {/* <div className="pre-loader"></div> */}
                                                         <Loader />
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


export default CategoryCollection;