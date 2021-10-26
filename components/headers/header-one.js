import React, { useState, useContext, useEffect } from "react";
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import Cart from "../containers/Cart";
import CartContainer from "../containers/CartContainer";
import TopBarDark from "./common/topbar-dark";
import { Media, Container, Row, Col, Input, Button, Form } from "reactstrap";
import LogoImage from "./common/logo";
import search from "../../public/assets/images/icon/search.png";
import { useForm } from "react-hook-form";
import settings from "../../public/assets/images/icon/setting.png";
import cart from "../../public/assets/images/icon/cart.png";
import FilterContext from "../../helpers/filter/FilterContext";
import Currency from "./common/currency";
import { useRouter } from "next/router";
import classes from "./Header-one.module.css";
import Link from "next/link";
import Loader from '../../components/common/Loader';

const HeaderOne = ({
  logoName,
  headerClass,
  topClass,
  noTopBar,
  direction,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const filterContext = useContext(FilterContext);
  const selectedKeyword = filterContext.selectedKeyword;
  const selectedBrands = filterContext.selectedBrands;
  const selectedColor = filterContext.selectedColor;
  const selectedPrice = filterContext.selectedPrice;
  const selectedCategory = filterContext.state;
  const selectedSize = filterContext.selectedSize;
  const [url, setUrl] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  var gLocation = sessionStorage.getItem('geoLocation')
  if (gLocation == null) { gLocation = "" }
  const [geoLocation, setgeoLocation] = useState(gLocation);
  /*=====================
     Pre loader
     ==========================*/
  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display:none";
    }, 2000);

    setOpen(true);
    if (router.asPath !== "/layouts/Christmas")
      window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const searchInputChange = (e) => {
    if (
      e.target.value != null &&
      e.target.value != undefined
    ) {
      setSearchKeyword(e.target.value);
      console.log(searchKeyword)
    }
  }



  const onSubmit = (data, e) => {
    if (
      e.target[0].value != null &&
      e.target[0].value != undefined &&
      e.target[0].value != ""
    ) {
      const pathname = window.location.pathname;
      setUrl(pathname);
      if (pathname == geoLocation + "/s/") {
        var URL = pathname;
      } else {
        var URL = geoLocation + "/s/";
        if (geoLocation == null) {
          URL = "/s/";
        }

      }

      filterContext.setselectedKeyword(e.target[0].value);
      var category = "";
      router.push(`${URL}${selectedKeyword}`);
      closeSearch();
    }
  };
  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 300) {
      if (window.innerWidth < 576) {
        document.getElementById("sticky").classList.remove("fixed");
      } else document.getElementById("sticky").classList.add("fixed");
    } else {
      document.getElementById("sticky").classList.remove("fixed");
    }
  };

  const openAllNavs = () => {
    openNav();
    openNavMobile();
  };

  const openNav = () => {
    var openmyslidebyid = document.getElementById("mySidenav");
    if (openmyslidebyid) {
      openmyslidebyid.classList.add("open-side");
    }
  };
  const openNavMobile = () => {
    var openmyslide = document.getElementsByClassName("openHandlerSidenav");
    if (openmyslide) {
      openmyslide[1].classList.add("open-side");
    }
  };
  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  const closeSearch = () => {
    document.getElementById("search-overlay").style.display = "none";
  };

  // eslint-disable-next-line
  const load = () => {
    setIsLoading(true);
    fetch().then(() => {
      // deal with data fetched
      setIsLoading(false);
    });
  };

  return (
    <div>
      <header
        id="sticky"
        className={`sticky ${classes.desktopHeader} ${headerClass}`}
      >
        <div className="mobile-fix-option"></div>
        {/*Top Header Component*/}
        {noTopBar ? "" : <TopBarDark topClass={topClass} />}

        <Container>
          <Row>
            <Col>
              <div className="main-menu">
                <div className="menu-left">
                  <div className="navbar">
                    <a href={null} onClick={openNav}>
                      <div className="bar-style">
                        {" "}
                        <i
                          className="fa fa-bars sidebar-bar"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </a>
                    {/*SideBar Navigation Component*/}
                    <SideBar />
                  </div>
                  <div className="brand-logo">
                    <LogoImage logo={logoName} />
                  </div>
                </div>
                <div className="menu-right pull-right">
                  {/*Top Navigation Bar Component*/}
                  {/* <NavBar /> */}

                  <div>
                    <div className="icon-nav">
                      <ul className="d-flex justify-center align-items-center">
                        <li className="onhover-div mobile-search">
                          {/* <div><Media src={search} onClick={openSearch} className="img-fluid" alt="" />
														<i className="fa fa-search" onClick={openSearch}></i></div> onSubmit={handleSubmit(onSubmit)} */}
                          <section className="search-block">
                            <Container>
                              <Row>
                                <Col lg="12">
                                  <form
                                    className="form-header"

                                  >
                                    <div className="input-group">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        aria-label="Amount (to the nearest dollar)"
                                        placeholder="Search Products......"
                                        name="keyword"
                                        onChange={searchInputChange}
                                      />
                                      <Link href={`/s/${searchKeyword}`}>
                                        <div className="input-group-append">
                                          <button className="btn btn-solid"> <i className="fa fa-search"></i>Search </button>
                                        </div>
                                      </Link>
                                    </div>
                                  </form>
                                </Col>
                              </Row>
                            </Container>
                          </section>
                        </li>
                        {/* <Currency icon={settings} /> */}
                        {/*Header Cart Component */}
                        {direction === undefined ? (
                          <CartContainer layout={direction} icon={cart} />
                        ) : (
                          <Cart layout={direction} icon={cart} />
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <header
        id="sticky"
        className={`sticky ${classes.mobileHeader} ${headerClass}`}
      >
        <div className="mobile-fix-option">
          <TopBarDark topClass={topClass} />
        </div>
        <Container>
          <div className="row main-menu">
            <div className="col-6 d-flex align-items-center justify-content-start">
              <div className={classes.burgerMenuParent}>
                <a href={null} onClick={openNavMobile}>
                  <div className="bar-style">
                    {" "}
                    <i
                      className={"fa fa-bars sidebar-bar " + classes.burgerMenu}
                      aria-hidden="true"
                    ></i>
                  </div>
                </a>
                {/*SideBar Navigation Component*/}
                <SideBar />
              </div>
              <div className={classes.logoParent}>
                <LogoImage logo={logoName} />
              </div>
            </div>
            <div className="col-6 menu-right justify-content-end">
              <ul className="d-flex align-items-center justify-content-end">
                <li className={"mobile-search " + classes.customSizingAcc}></li>
                {direction === undefined ? (
                  <CartContainer layout={direction} icon={cart} />
                ) : (
                  <Cart layout={direction} icon={cart} />
                )}
              </ul>
            </div>
          </div>
          <div className="row">
            <li
              className={
                "onhover-div mobile-search " + classes.fullSizeContainer
              }
            >
              {/* onSubmit={handleSubmit(onSubmit)} */}

              <section className="search-block">
                <Container>
                  <Row>
                    <Col lg="12">
                      <form
                        className="form-header"
                      >
                        <div className="input-group">
                          <Input
                            type="text"
                            className={"form-control " + classes.inputContainer}
                            aria-label="Amount (to the nearest dollar)"
                            placeholder="Search Products......"
                            name="keyword"
                            onChange={searchInputChange}
                          />
                          <Link href={`/s/${searchKeyword}`}>
                            <div className="input-group-append">
                              <div className={classes.searchMobile}>
                                <button className={classes.mobileButton}>
                                  <i
                                    className={
                                      "fa fa-search " + classes.searchIcon
                                    }
                                  ></i>
                                </button>
                              </div>
                              <div className={classes.searchDesktop}>
                                <button className={classes.desktopButton}>
                                  <i className={"fa fa-search "}></i>Search
                                </button>
                              </div>
                            </div></Link>
                        </div>
                      </form>
                    </Col>
                  </Row>
                </Container>
              </section>
            </li>
          </div>
        </Container>
      </header>
      <div id="search-overlay" className="search-overlay">
        <div>
          <span
            className="closebtn"
            onClick={closeSearch}
            title="Close Overlay"
          >
            ×
          </span>
          <div className="overlay-content">
            <Container>
              <Row>
                <Col>
                  {/* <Form onSubmit={handleSubmit(onSubmit)}>
										<div className="form-group">
											<Input type="text" className="form-control" name="keyword" id="exampleInputPassword1" placeholder="Search a Product" />
										</div>
										<Button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></Button>
									</Form> */}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderOne;
