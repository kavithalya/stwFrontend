import Head from 'next/head';
import React, { useState, useEffect, useRef, useContext } from 'react';
import ProductTab from '../common/product-tab';
// import Service from '../common/service'
import { useRouter } from "next/router";
// import NewProduct from '../../shop/common/newProduct';
import Slider from 'react-slick';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ImageZoom from '../common/image-zoom';
import DetailsWithPrice from '../common/detail-price';
// import Filter from '../common/filter';
import { Container, Row, Col, Modal, ModalBody, ModalHeader, Media, Input } from 'reactstrap';
import { CurrencyContext } from '../../../helpers/Currency/CurrencyContext';
import CartContext from '../../../helpers/cart';
import classes from "../../../components/headers/Header-one.module.css";
import AutoFitImage from 'react-image-autofit-frame';
import Loader from '../../../components/common/Loader';

const GET_SINGLE_PRODUCTS = gql`
query($productAsin: String!, $productType: String!, $productCountry: String!, $productPanel: String!){
    product(asin: $productAsin, type: $productType, country: $productCountry, panel: $productPanel) {
      asin
      
        brandname
        bullepoints
        category
        description
        fromcountry
        height
        insertts
        isactive
        length
        packageheight
        packagelength
        packagewidth
        promoflag
        title
        weight
        width
        sku
        images {
          additionalimage1
          additionalimage2
          additionalimage3
          additionalimage4
          additionalimage5
          mainimageurl        
        }
        specifications {
          mpn
          partnumber
          screendisplaysize
          ram
          harddrive
          operatingsystem
          processorbrand
        }
        variants {
          amazonprice 
          purchasetax
          pwfee
          daystoship
          pwfee
          color
          conversionrate
          discount
          domesticfreight
          overrideprice
          isoverdcalculated
          duty
          fees
          frieghtrate
          graphics
          margin
          price
          quantity
          taxes
        
    }
  }
  }`;

const LeftSidebarPage = ({ pathId, type }) => {

 

    var asinData = "";
    if(type == "url")
    {
        asinData = pathId;
    }
    else
    {
        pathId = pathId.toUpperCase();
        if(pathId.search("-")==-1){
            asinData = pathId;
        }
        else
        asinData =  pathId.slice(0,pathId.search("-"));
    }

    const buyNow = (product, productQty) => {
        context.addToCart(product, productQty);
        router.push({
            pathname: "/page/account/checkout",
          });
    };

    const asin = asinData;
    const curContext = useContext(CurrencyContext);
    const context = useContext(CartContext);
    const symbol = curContext.state.symbol;
    const IsRight = curContext.state.IsRight;
    const country = curContext.state.country;
    const panel = curContext.state.panel;
    const currency = curContext.state.currency
    const [productQty, setproductQty] = useState(1);
    // const setproductQty = context.setproductQty;
    const [stock, setStock] = useState('InStock');
    const withDiscount = context.withDiscount
    const router = useRouter();
    let leftSymbol=null;
    let rightSymbol = null;
    if(IsRight ==true)
    {
        rightSymbol = symbol;
    }
    else
    {
        leftSymbol = symbol;
    }
    var { loading, data, error} = useQuery(GET_SINGLE_PRODUCTS, {
        variables: {
                productAsin: asin,
                productType: "",  
                productCountry: country,
                productPanel: panel
        }
    });

    // const getUrl = (data.product.title) => {
        
    // }

    const smallredobj={
        fontSize: "15px",
        fontWeight: "bold",
        color: "red"
    }
    const titleSize={
        fontSize: "14px"
    }
    
    const changeQty = (e) => {
        if(e.target.value != "")
        {
            if(e.target.value <=product.variants[0].quantity )
            {
                setproductQty(parseInt(e.target.value));
            }
            else
            {
                e.preventDefault();
                e.target.value = product.variants[0].quantity;
            }
        }
        else
        setproductQty("");
    }
 
    const minusProductQty = () =>{
        if (productQty > 1) {
              setproductQty(productQty - 1);
              setStock('InStock')
          }
    }
    const plusQty = (item) =>{
        if (item.quantity > productQty) {
            setproductQty(productQty + 1);
          } else {
            setStock("Out of Stock !")
          }
    }

    const getUrl = (product) => {
        
        var domain = window.location.hostname;
        var titleProps = product.asin;
        if(product.title!=null && product.title!=undefined && product.title!="")
        {
            titleProps = product.title.split(' ').join('-');
            titleProps = titleProps.replace(/[^\w\s]/gi, '-');
            titleProps = titleProps.replace(/---/gi, '-');
            titleProps = titleProps.replace(/--/gi, '-');
            titleProps = titleProps.slice(0, titleProps.length - 1);
        }
        var url = domain + '/p/'+ product.asin  + '-' + titleProps.toLowerCase();
        
        return url;
    }

    const getMetaInfo = (product) => {
        var metaInfo={
            metatitle:"Buy "+product.title+" Online at Lowest Price Ever in "+ country +" | Check Reviews & Ratings - Shop The World",
            metadesc:" Shop The World: Buy " + product.title + " online at the lowest price in " + country +" on Shop The World. Check out " + product.title + " reviews, ratings, features, specifications online at the best prices on Shop The World",
        }
         
        return metaInfo;
    }



    const [state, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();

    var products = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        fade: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                }
            }
        ]
    };
    
    const getProps  = (Product)=>{
        var productsnav = {
            slidesToShow: 3,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };
        if(Product.images[0].additionalimage5 != null || Product.images[0].additionalimage4 != null || Product.images[0].additionalimage3!=null )
        productsnav.slidesToShow = 3;
        else if(Product.images[0].additionalimage2 != null) 
        productsnav.slidesToShow = 2;
        else if(Product.images[0].additionalimage1 != null) 
        productsnav.slidesToShow = 1;

        return productsnav


    }
    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
        }); 
    }, [data]);

    const { nav1, nav2 } = state;

    const filterClick = () => {
        document.getElementById("filter").style.left = "-15px";
    }

    const changeColorVar = (img_id) => {
        slider2.current.slickGoTo(img_id)
    }

    const loaderStyle={
        margin: "auto",
        width: "60%",
 
        padding: "10px",
    }

    return (
        <section className="">
            <div className="collection-wrapper">
            {(!data || !data.product || data.product.length === 0|| data.product==null || loading) ?'':
            <Head>
        <title>{getMetaInfo(data.product).metatitle}</title>
        <meta property="description" content={getMetaInfo(data.product).metadesc}/>
        <meta data-react-helmet="true" name="viewport" content="width=device-width, initial-scale=1"/>
        <meta data-react-helmet="true" name="copyright" content="Shop The World"/>
        <meta data-react-helmet="true" name="author" content="Shop The World"/>
        <meta data-react-helmet="true" name="country" content={country}/>
        <meta data-react-helmet="true" name="language" content="en-US"/>
        <meta data-react-helmet="true" name="currency" content={currency}/>
        <meta data-react-helmet="true" name="robots" content="index, follow"/>
        <meta data-react-helmet="true" name="description" content={getMetaInfo(data.product).metadesc}/>
        <meta property="og:type" content="product"/>
        <meta property="og:title" content={getMetaInfo(data.product).metatitle}/>
        <meta property="og:url" content={getUrl(data.product)}/>
        <meta property="og:description" content={getMetaInfo(data.product).metadesc}/>
        <meta data-react-helmet="true" property="product:sku" content={data.product.sku}/>
        <meta data-react-helmet="true" property="product:condition" content="new"/>
        <meta data-react-helmet="true" property="product:brand" content={data.product.brandname}/>
        <meta data-react-helmet="true" property="product:retailer_item_id" content={data.product.asin}/>
        <meta data-react-helmet="true" property="product:price:currency" content={currency}/>
        {/* <meta data-react-helmet="true" property="og:image" content="https://shoptheworld.vtexassets.com/arquivos/ids/156142/image_1.jpg?v=637397231439730000"/>
        <meta data-react-helmet="true" property="og:image" content="https://shoptheworld.vtexassets.com/arquivos/ids/160165/image_2.jpg?v=637397237219400000"/>
        <meta data-react-helmet="true" property="og:image" content="https://shoptheworld.vtexassets.com/arquivos/ids/162518/image_3.jpg?v=637397240736970000"/> */}
        <meta data-react-helmet="true" property="product:availability" content="instock"/>
        <meta data-react-helmet="true" property="product:price:amount" content="228"/>

        <link data-react-helmet="true" rel="canonical" href={`${getUrl(data.product)}`}/>
        <link data-react-helmet="true" rel="preload" as="image" href={`${data.product.images[0].additionalimage4}`} crossOrigin="anonymous"/>
             </Head> }

                <Container>
                    <Row>
                        
                        <Col lg="9" sm="12" xs="12" >
                            <Container fluid={true}>
                                {/* <Row>
                                    <Col cl="12">
                                        <div className="filter-main-btn mb-2">
                                            <span onClick={filterClick} className="filter-btn" >
                                                <i className="fa fa-filter" aria-hidden="true"></i> filter</span>
                                        </div>
                                    </Col>
                                </Row> */}
                                {(!data || loading) && error == null ?
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
                                    :[(!data || !data.product || data.product == null || error != null ? 
                                        <section className="p-0">
                                            <Container>
                                                <Row>
                                                    <Col sm="12">
                                                        <div className="error-section">
                                                            <h1>404</h1>
                                                            <h2>page not found</h2>
                                                            <a href="/" className="btn btn-solid">back to home</a>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </section>
                                    :
                                    <Row>
                                        <Col lg="6"   className={`product-thumbnail`}>
                                        <Slider {...products} asNavFor={nav2} ref={slider => (slider1.current = slider)} className="product-slick">
{/*                                     
                                        <Media src={`${data.product.images[0].mainimageurl}`}   className="img-fluid image_zoom_cls-0" />
                                                {data.product.variants.length > 0 ?
                                                    data.product.images.map((vari, index) =>
                                                        <div key={index}>
                                                            <ImageZoom image={vari} />
                                                        </div>
                                                    ) :
                                                    data.product.images.map((vari, index) =>
                                                        <div key={index}>
                                                            <ImageZoom image={vari} />
                                                        </div>
                                                    )
                                                } */}
                                                {data.product.images[0].mainimageurl?
                                                    <div>
                                                          {/* <Media src={`${data.product.images[0].mainimageurl}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} className="img-fluid" /> */}
                                                          <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="316px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].mainimageurl}`}/>
                                                  </div>
                                                    :
                                                    ''}
                                                    {/* {data.product.images[0].additionalimage1?
                                                    <div>
                                                    <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="316px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage1}`}/>
                                                          <Media src={`${data.product.images[0].additionalimage1}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" />
                                                  </div>
                                                    :
                                                    ''} */}
                                                    {data.product.images[0].additionalimage2?
                                                    <div>
                                                    <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="316px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage2}`}/>
                                                          {/* <Media src={`${data.product.images[0].additionalimage2}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" /> */}
                                                  </div>
                                                    :
                                                    ''}
                                                    {data.product.images[0].additionalimage3?
                                                    <div>
                                                    <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="316px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage3}`}/>
                                                          {/* <Media src={`${data.product.images[0].additionalimage3}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" /> */}
                                                  </div>
                                                    :
                                                    ''}
                                                    {data.product.images[0].additionalimage4?
                                                    <div>
                                                          {/* <Media src={`${data.product.images[0].additionalimage4}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" /> */}
                                                          <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="316px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage4}`}/>
                                                  </div>
                                                    :
                                                    ''}
                                                    {data.product.images[0].additionalimage5?
                                                    <div>
                                                    <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="316px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage5}`}/>
                                                          {/* <Media src={`${data.product.images[0].additionalimage5}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" /> */}
                                                  </div>
                                                    :
                                                    ''}
                                            </Slider>

                                            <Slider className={`slider-nav ${classes.desktopHeader}`} {...getProps(data.product)} asNavFor={nav1} ref={slider => (slider2.current = slider)}>

                                                {data.product.images[0].mainimageurl?
                                                    <div>
                                                          {/* <Media src={`${data.product.images[0].mainimageurl}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}  className="img-fluid" /> */}
                                                          <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="120px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].mainimageurl}`}/>
                                                  </div>
                                                    :
                                                    ''}
                                                    {/* {data.product.images[0].additionalimage1?
                                                    <div>
                                                    <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="120px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage1}`}/>
                                                          <Media src={`${data.product.images[0].additionalimage1}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" />
                                                  </div>
                                                    :
                                                    ''} */}
                                                    {data.product.images[0].additionalimage2?
                                                    <div>
                                                          {/* <Media src={`${data.product.images[0].additionalimage2}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" /> */}
                                                          <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="120px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage2}`}/>
                                                  </div>
                                                    :
                                                    ''}
                                                    {data.product.images[0].additionalimage3?
                                                    <div>
                                                          {/* <Media src={`${data.product.images[0].additionalimage3}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" /> */}
                                                          <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="120px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage3}`}/>
                                                  </div>
                                                    :
                                                    ''}
                                                    {data.product.images[0].additionalimage4?
                                                    <div>
                                                          {/* <Media src={`${data.product.images[0].additionalimage4}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" /> */}
                                                          <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="120px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage4}`}/>
                                                  </div>
                                                    :
                                                    ''}
                                                    {data.product.images[0].additionalimage5?
                                                    <div>
                                                          {/* <Media src={`${data.product.images[0].additionalimage5}`} alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title}   className="img-fluid" /> */}
                                                          <AutoFitImage frameWidth="auto" imgSize="contain" frameHeight="120px" alt={"Buy "+`${data.product.title}`+" Online"} title={data.product.title} imgSrc={`${data.product.images[0].additionalimage5}`}/>
                                                  </div>
                                                    :
                                                    ''}


                                          
                                          
                                                {/* {data.product.variants ?
                                                    data.product.images.map((vari, index) =>
                                                        <div key={index}>
                                                            <Media src={`${vari.src}`} key={index} alt={vari.alt} className="img-fluid" />
                                                        </div>
                                                    ) 
                                                    :
                                                    ''} */}
                                            </Slider>
                                        </Col>
                                        <Col lg="6" className="rtl-text">
                                            <DetailsWithPrice symbol={symbol} item={data.product} changeColorVar={changeColorVar} navOne={state.nav1}  />
                                        </Col>
                                        {/* <Loader /> */}

                                    </Row>
                                    )]
                                }

                            </Container>

                            {(!data || !data.product || data.product.length === 0 || data.product==null) ? "" :  <ProductTab selectedItem={data} /> }
                          
                        </Col>
                        <Col sm="3" className={`collection-filter ${classes.desktopHeader}`} >
                        {!data || !data.product || data.product == null || error != null ?"":<div>
                        {(data.product.variants.length > 0 && data.product.variants[0].quantity > 0) && (withDiscount(data.product.variants) > 0)  ?  
                <div className="productPriceCont">
                    <div className="product-description border-product">
                    {/* {product.variants ?
                        <div>
                            <h6 className="product-title size-text">select size
                                    <span><a href={null} data-toggle="modal"
                                    data-target="#sizemodal" onClick={toggle} >size chart</a></span></h6>
                            <Modal isOpen={modal} toggle={toggle} centered>
                                <ModalHeader toggle={toggle}>Sheer Straight Kurta
                                    </ModalHeader>
                                <ModalBody>
                                    <Media src={sizeChart} alt="size" className="img-fluid" />
                                </ModalBody>
                            </Modal>
                            <div className="size-box">
                                <ul>
                                    {uniqueSize.map((data, i) => {
                                        return <li key={i}><a href={null}>{data}</a></li>
                                    })}
                                </ul>
                            </div>
                        </div> : ''} */}
                        {(data.product.variants.length > 0 && data.product.variants[0].quantity > 0)  ?   
                        <div >
                       <center> {stock=="InStock"? <span className="instock-cls">     <i className="fa fa-check"></i>{stock}</span> : <span className="instock-cls-red">     <i class="fa fa-times"></i>{stock}</span> } </center>
                        <center> <h6 className="product-title">quantity</h6></center>
                    <div className="qty-box">
                        <div className="input-group text-center">
                            <span className="input-group-prepend">
                                <button type="button" className="btn quantity-left-minus" onClick={() => minusProductQty()} data-type="minus" data-field="">
                                    <i className="fa fa-minus"></i>
                                </button>
                            </span>
                            <Input type="text" name="quantity" value={productQty} onChange={changeQty} className="form-control input-number" />
                            <span className="input-group-prepend">
                                <button type="button" className="btn quantity-right-plus" onClick={() => plusQty(data.product.variants[0])} data-type="plus" data-field="">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </span>
                        </div>
                    </div> </div>
                            : ""}
                            </div>
                   <div className="product-buttons" >
                   <center> <a href={null} className="btn btn-solid new-btncls" onClick={() => context.addToCart(data.product, productQty)}> <i class="fa fa-shopping-cart"></i> add to cart</a></center>
                   <center> <a className="btn btn-solid new-btncls" onClick={() => buyNow(data.product, productQty)}  ><i class="fa fa-shopping-bag"></i>  buy now</a> </center>
                     <center><i class="fa fa-lock"></i> Secure transaction</center>
                </div> </div> :
                <div> <h5 style={smallredobj}> Sold out...! </h5> <h6><a href="javascript:void(Tawk_API.toggle())"> Connect with our customer support</a></h6></div> }
                        </div>}
                            {/* <Filter />   */}
                            {/* <Service /> */}
                            {/* <!-- side-bar single product slider start --> */}
                            {/* <NewProduct /> */}
                            {/* <!-- side-bar single product slider end --> */}
                        </Col>
                    </Row>

                </Container>
            </div>
        </section>
    )
}

export default LeftSidebarPage;