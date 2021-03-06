import React, {useState, useContext,Fragment} from 'react';
import FilterContext from '../../../../helpers/filter/FilterContext';
import Slider from 'react-slick';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'reactstrap';
import { homeSlider,CategorySlider,CategoryList } from '../../../../services/script';
import MainCategoryCollection from '../../../../components/common/Collections/MainCategoryCollection'


const Banner = () => {

  const filterContext = useContext(FilterContext);
	const selectedKeyword = filterContext.selectedKeyword;
    const selectedBrands = filterContext.selectedBrands;
    const selectedColor = filterContext.selectedColor;
    const selectedPrice = filterContext.selectedPrice;
    const selectedCategory = filterContext.state;
    const selectedSize = filterContext.selectedSize;
    const [url, setUrl] = useState();
    const router = useRouter();
    var gLocation = sessionStorage.getItem('geoLocation')
    if(gLocation==null){gLocation=""}
    const [geoLocation, setgeoLocation] = useState(gLocation);


//   const CategoryList=[
//     { CategoryName:"Electronics"},
//     { CategoryName:"Fashion"},
//     { CategoryName:"Home & Kitchen"},
//     { CategoryName:"Beauty & Personal Care"},
//     { CategoryName:"Health & Wellness"},
//     { CategoryName:"Grocery"},
//     { CategoryName:"Sports & Outdoors"},
//     { CategoryName:"Baby & Toys"},
//     { CategoryName:"Next Day Delivery"},
// ]

  const CategoryFilter = (category) => {
    // router.push(`/p/${product.id}` + '-' + `${titleProps}`);
  const pathname = window.location.pathname;
  setUrl(pathname);
  if(pathname==geoLocation+"/shop/six_grid")
  {
    var URL = pathname;	
  }
  else 
  {
    if(geoLocation==null)
    var URL = geoLocation+"/shop/six_grid";
            else
            var URL = "/shop/six_grid";
  }
        filterContext.setSelectedCategory(category)
        console.log(selectedCategory);
      router.push(`${URL}?${selectedCategory}&brand=${selectedBrands}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}&keyword=${selectedKeyword}`)
}



  return (
    <Fragment>
      <section className="p-0">
        <Slider {...homeSlider} className="slide-1 home-slider">
          <div>
          <Link href={`/category/electronics`}>
          <div className="home home1 text-center">
              <Container>
                <Row>
                  <Col>
                    <div className="slider-contain">
                      <div>
                        <h4  style={{color:"white"}}>Welcome to Shop The World</h4>
                        <h1 style={{color:"white"}}>Electronics</h1>
                           <a className="btn btn-solid">shop now </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Link> 
          </div>
          <div>
          <Link href={`/category/beauty-and-personal-care/makeup`}>
          <div className="home home2 text-center">
              <Container>
                <Row>
                  <Col>
                    <div className="slider-contain">
                      <div>
                      <h4 style={{color:"white"}}>The World of Savings</h4>
                      <br/>
                        <h2 style={{color:"white"}}>Beauty & Personal Care</h2>
                           <a className="btn btn-solid">shop now </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Link>
          </div>
          <div>
          <Link href={`/category/home-and-kitchen`}>
          <div className="home home3 text-center">
              <Container>
                <Row>
                  <Col>
                    <div className="slider-contain">
                      <div>
                      <h4 style={{color:"Orange"}}>The World of Savings</h4>
                        <h1 style={{color:"Orange"}}>Home & Kitchen</h1>
                           <a className="btn btn-solid">shop now </a> 
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Link>
          </div>
          <div>
          <Link href={`/category/fashion`}>
          <div className="home home4 text-center">
              <Container>
                <Row>
                  <Col>
                    <div className="slider-contain">
                      <div>
                      <h4 style={{color:"White"}}>The World of Savings</h4>
                        <h1 style={{color:"White"}}>Fashion</h1>
                           <a className="btn btn-solid">shop now </a> 
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Link>
          </div>
          <div>
          <Link href={`/category/baby-and-toys`}>
          <div className="home home5 text-center">
              <Container>
                <Row>
                  <Col>
                    <div className="slider-contain">
                      <div>
                      <h4 style={{color:"White"}}>The World of Savings</h4>
                        <h1 style={{color:"White"}}>Baby & Toys</h1>
                           <a className="btn btn-solid">shop now </a> 
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Link>
          </div>
          <div>
          <Link href={`/category/grocery`}>
          <div className="home home6 text-center">
              <Container>
                <Row>
                  <Col>
                    <div className="slider-contain">
                      <div>
                      <h4 style={{color:"Orange"}}>The World of Savings</h4>
                        <h1 style={{color:"Orange"}}>Grocery</h1>
                           <a className="btn btn-solid">shop now </a> 
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Link>
          </div>
          <div>
          <Link href={`/category/health-and-wellness`}>
          <div className="home home7 text-center">
              <Container>
                <Row>
                  <Col>
                    <div className="slider-contain">
                      <div>
                      <h4 style={{color:"White"}}>The World of Savings</h4>
                        <h1 style={{color:"White"}}>Health & Wellness</h1>
                           <a className="btn btn-solid">shop now </a> 
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Link>
          </div>
        </Slider>
        <MainCategoryCollection backImage={true} type="fashion"  categoryData={CategoryList} productSlider={CategorySlider} designClass="ratio_asos" noSlider="false" cartClass="cart-info cart-wrap" />
      </section>
    </Fragment>
  )
}

export default Banner