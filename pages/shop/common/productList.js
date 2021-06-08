import React, { useState, useContext, useEffect } from 'react';
import { Col, Row, Media, Button, Spinner } from 'reactstrap';
import Menu2 from '../../../public/assets/images/mega-menu/2.jpg';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import FilterContext from '../../../helpers/filter/FilterContext';
import ProductItem from '../../../components/common/product-box/ProductBox1';
import { CurrencyContext } from '../../../helpers/Currency/CurrencyContext';
import { useRouter } from 'next/router';
import PostLoader from '../../../components/common/PostLoader';
import CartContext from '../../../helpers/cart';
import {WishlistContext} from '../../../helpers/wishlist/WishlistContext';
import {CompareContext} from '../../../helpers/Compare/CompareContext';

const GET_PRODUCTS = gql`
    query  products($type:String!,$indexFrom:Int! ,$limit:Int!,$color:String!,$brand:[String!]! ,$priceMax:Int!,$priceMin:Int!,$keyword:String!,$country:String!,$panel:String!) {
        products (type: $type ,indexFrom:$indexFrom ,limit:$limit ,color:$color ,brand:$brand  ,priceMax:$priceMax,priceMin:$priceMin,keyword:$keyword,country:$country,panel:$panel){
  total(keyword:$keyword,type:$type){
            total
        }
        hasMore(limit:$limit,indexFrom:$indexFrom,keyword:$keyword,type:$type){
            seqid
        }
        items(limit:$limit,indexFrom:$indexFrom,keyword:$keyword,type:$type){
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
      }
        }

        }
    }
`;


const ProductList = ({ colClass, layoutList,openSidebar,noSidebar }) => {
    const cartContext = useContext(CartContext);
    const quantity = cartContext.quantity;
    const wishlistContext = useContext(WishlistContext);
    const compareContext = useContext(CompareContext);
    const router = useRouter();
    const [limit, setLimit] = useState(10)
    const curContext = useContext(CurrencyContext);
    const [grid, setGrid] = useState(colClass)
    const symbol = curContext.state.symbol;
    const IsRight = curContext.state.IsRight;
    const country = curContext.state.country;
    const panel = curContext.state.panel;
    const filterContext = useContext(FilterContext);
    const selectedKeyword = filterContext.selectedKeyword;
    const selectedBrands = filterContext.selectedBrands;
    const selectedColor = filterContext.selectedColor;
    const selectedPrice = filterContext.selectedPrice;
    const selectedCategory = filterContext.state;
    const selectedSize = filterContext.selectedSize
    const [sortBy, setSortBy] = useState('AscOrder');
    const [isLoading, setIsLoading] = useState(false);
    const [layout, setLayout] = useState(layoutList);
    const [url, setUrl] = useState();
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


    useEffect(() => {
        const pathname = window.location.pathname;
        setUrl(pathname);
        router.push(`${pathname}?${filterContext.state}&brand=${selectedBrands}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`)
        
    }, [selectedBrands, selectedColor, selectedSize, selectedPrice]);

    var limitSet = 10;
    if(selectedKeyword)
        limitSet = 15;
 
    var { loading, data, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: {
            type: selectedCategory,
            priceMax: 10,
            priceMin: 1,
            color: "red",
            brand: "max",
            indexFrom: 0,
            limit: limitSet,
            keyword:selectedKeyword,
            country:country,
            panel:panel
        }
    });
    
    if(data!=undefined)
    {
        if(data.products.total.total==0)
        {
            // router.push("/page/coming-soon")
        }
    }



    const handlePagination = () => {
        setIsLoading(true);
        setTimeout(() =>
            fetchMore({
                variables: {
                    indexFrom: data.products.items.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    setIsLoading(false)
                    return {
                        products: {
                            __typename: prev.products.__typename,
                            total: prev.products.total,
                            items: [...prev.products.items, ...fetchMoreResult.products.items],
                            hasMore: fetchMoreResult.products.hasMore,
                        },
                    };
                }
            }), 1000)
    }

    const removeBrand = (val) => {
        const temp = [...selectedBrands];
        temp.splice(selectedBrands.indexOf(val), 1);
        filterContext.setSelectedBrands(temp)

        router.push(`${url}?${filterContext.state}&brand=${temp}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`)

    }

    const removeSize = (val) => {
        const temp = [...selectedSize];
        temp.splice(selectedSize.indexOf(val), 1);
        filterContext.setSelectedSize(temp)

        router.push(`${url}?${filterContext.state}&brand=${temp}&color=${selectedColor}&size=${temp}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`)

    }

    const removeColor = () => {
        filterContext.setSelectedColor("")
        router.push(`${url}?${filterContext.state}&brand=${selectedBrands}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`)
    }
   
    return (
        <Col className="collection-content">
            <div className="page-main-content">
                <Row>
                    <Col sm="12">
                        <div className="top-banner-wrapper">
                            
                            {data && data.products.total.total>0? 
                             
                            <div className="top-banner-content small-section">
                                {/* <h4>{selectedCategory}</h4> */}
                                <h5>{data ? `${selectedCategory}  1-${data.products.items.length} of ${data.products.total.total}` : 'loading'}</h5>
                            </div>
                            
                            :  [( data && data.products.total.total==0? 
                            <div>
                <div className="container">
                    <div id="container" className="text-center">
                        <div>
                            <div id="login">
                                <div>
                                    <div className="logo mb-4">
                                        <a href="#">
                                            {/* <img src="../assets/images/icon/logo.png" alt="Multikart_fashion" className="img-fluid" /> */}
                                        </a>
                                    </div>
                                    <h2 className="mb-3">
                                     Will be Coming Soon!
                            </h2>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <form action="#" className="theme-form">
                                            <div className="col-md-12 mt-2">
                                                <h3>Enter Your Email: </h3>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-12">
                                                    <input type="password" name="password" id="password" className="form-control"
                                                        autoFocus="" />
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="actions">
                                                        <button type="submit" className="btn btn-solid">notify me</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div id="footer" className="mt-4">
                                    <div id="owner">
                                        <a href="#">Log in here</a> or <a href="#">change your password
                                    settings</a>
                                    </div>
                                </div>
                            </div>
                            <div id="powered">
                                <p>© 2021, Powered by Shop The World.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:
             
            <div className="typography_section"> 
            <div className="typography-box"> 
            <div  className="custom-load typo-content loader-typo">
                                    <div className="pre-loader"></div>
                                </div>
                                </div>
                                </div>
                                )]
                            }
                        </div>
                       {data && data.products.total.total>0? 
                       <Row>
                                    <Col xs="12">
                                        <ul className="product-filter-tags">
                                            {
                                                selectedBrands.map((brand, i) =>
                                                    <li key={i}>
                                                        <a href={null} className="filter_tag">
                                                            {brand}
                                                            <i className="fa fa-close" onClick={() => removeBrand(brand)} ></i>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            {selectedColor?
                                                <li>
                                                    <a href={null} className="filter_tag">
                                                        {selectedColor}
                                                        <i className="fa fa-close" onClick={removeColor}></i>
                                                    </a>
                                                </li>
                                                :''
                                            }
                                            {
                                                selectedSize.map((size, i) =>
                                                    <li key={i}>
                                                        <a href={null} className="filter_tag">
                                                            {size}
                                                            <i className="fa fa-close" onClick={() => removeSize(size)}></i>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            {/* {
                                               
                                                    <li>
                                                        <a href={null} className="filter_tag">
                                                           price: {selectedPrice.min}- {selectedPrice.max}
                                                        </a>
                                                    </li>
                                            } */}
                                        </ul>
                                    </Col>
                                </Row>
                                : data ? "":""
                                }
                                {data && data.products.total.total>0? 
                                 <div className="collection-product-wrapper">
                            <div>
                                {!noSidebar?
                                <Row>
                                    <Col xl="12">
                                        <div className="filter-main-btn" onClick={() => openSidebar()}>
                                            <span className="filter-btn btn btn-theme">
                                                <i className="fa fa-filter" aria-hidden="true"></i> Filter
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                                :""
                                }   
                                {/* <Row>
                                    <Col>
                                        <div className="product-filter-content">
                                            <div className="search-count">
                                                <h5>{data ? `Showing Products 1-${data.products.items.length} of ${data.products.total.total}` : 'loading'} Result</h5>
                                            </div>
                                            <div className="collection-view">
                                                <ul>
                                                    <li><i
                                                        className="fa fa-th grid-layout-view" onClick={() => { setLayout(''); setGrid('col-lg-3') }}></i>
                                                    </li>
                                                    <li><i
                                                        className="fa fa-list-ul list-layout-view" onClick={() => { setLayout('list-view'); setGrid('col-lg-12') }}></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="collection-grid-view" style={layout === 'list-view' ? { 'opacity': 0 } : { 'opacity': 1 }}>
                                                <ul>
                                                    <li>
                                                        <Media
                                                            src={`/assets/images/icon/2.png`}
                                                            alt=""
                                                            className="product-2-layout-view" onClick={() => setGrid('col-lg-6')} />
                                                    </li>
                                                    <li>
                                                        <Media
                                                            src={`/assets/images/icon/3.png`}
                                                            alt=""
                                                            className="product-3-layout-view"  onClick={() => setGrid('col-lg-4')} />
                                                    </li>
                                                    <li>
                                                        <Media
                                                             src={`/assets/images/icon/4.png`}
                                                            alt=""
                                                            className="product-4-layout-view" onClick={() => setGrid('col-lg-3')} />
                                                    </li>
                                                    <li>
                                                        <Media
                                                            src={`/assets/images/icon/6.png`}
                                                            alt=""
                                                            className="product-6-layout-view" onClick={() => setGrid('col-lg-2')} />
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="product-page-per-view">
                                                <select onChange={(e) => setLimit(parseInt(e.target.value))}>
                                                    <option value="10">10 Products Par Page</option>
                                                    <option value="15">15 Products Par Page</option>
                                                    <option value="20">20 Products Par Page</option>
                                                </select>
                                            </div>
                                            <div className="product-page-filter">
                                                <select onChange={(e) => setSortBy(e.target.value)}>
                                                    <option value="AscOrder">Sorting items</option>
                                                    <option value="HighToLow">High To Low</option>
                                                    <option value="LowToHigh">Low To High</option>
                                                    <option value="Newest">Newest</option>
                                                    <option value="AscOrder">Asc Order</option>
                                                    <option value="DescOrder">Desc Order</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Col>
                                </Row> */}
                            </div>
                            <div className={`product-wrapper-grid ${layout}`}>
                                <Row>
                                    {/* Product Box */}
                                    {(!data || !data.products || !data.products || data.products.length === 0 || loading) ?
                                        (data && data.products && data.products && data.products.length === 0) ?
                                            <Col xs="12">
                                                <div>
                                                    <div className="col-sm-12 empty-cart-cls text-center">
                                                        <img src={`/assets/images/empty-search.jpg`} className="img-fluid mb-4 mx-auto" alt="" />
                                                        <h3><strong>Your Cart is Empty</strong></h3>
                                                        <h4>Explore more shortlist some items.</h4>
                                                    </div>
                                                </div>
                                            </Col>
                                            :
                                            <div className="row mx-0 margin-default mt-4">
                                         <div className="col-xl-3 col-lg-4 col-6">
                                             <PostLoader />
                                         </div>
                                         <div className="col-xl-3 col-lg-4 col-6">
                                             <PostLoader />
                                         </div>
                                         <div className="col-xl-3 col-lg-4 col-6">
                                             <PostLoader />
                                         </div>
                                         <div className="col-xl-3 col-lg-4 col-6">
                                             <PostLoader />
                                         </div>
                                     </div>
                                        : data && data.products.items.map((product, i) =>
                                            <div className={grid} key={i}>
                                            <div className="product-top-filter"></div>
                                                <div className="product">
                                                    <div>
                                                        <ProductItem des={true} product={product} symbol={symbol} cartClass="cart-info cart-wrap"
                                                            addCompare={() => compareContext.addToCompare(product)}
                                                            addWishlist={() => wishlistContext.addToWish(product)}
                                                            addCart={() => cartContext.addToCart(product,quantity)} />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        )}
                                </Row>
                            </div>
                            <div className="section-t-space">
                                <div className="text-center">
                                    <Row>
                                        <Col xl="12" md="12" sm="12">
                                            {data && data.products && data.products.hasMore!=null &&
                                                <Button onClick={() => handlePagination()}>
                                                    {isLoading &&
                                                        <Spinner animation="border" variant="light" />}
                                                    Load More
                                                </Button>}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        : data ? "":""
                                }
                    </Col>
                </Row>
                
            </div>
        </Col>
    )
}

export default ProductList;