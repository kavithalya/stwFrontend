import React, { Fragment ,useEffect } from 'react';
import CopyRight from './common/copyright';
import {Container, Col ,Row } from 'reactstrap';
import { SlideUpDown } from "../../services/script"
import LogoImage from './../headers/common/logo'

const FooterFive = ({layoutClass, logoName}) => {

    useEffect(() => {
        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown('footer-title');
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function (elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }
    }, [])

    return (
        <Fragment>
            <footer className="jewel-footer">
                <div className="white-layout">
                    <section className="p-0 ">
                        <Container fluid={true}>
                            <Row className="footer-theme2 section-light footer-border">
                                <Col>
                                    <div className=" footer-block">
                                        <div className="footer-container">
                                            <div className="footer-title footer-mobile-title">
                                                <h4>about</h4>
                                            </div>
                                            <div className="footer-contant">
                                                <div className="footer-logo">
                                                       <LogoImage logo={logoName} />
                                                </div>
                                                <div className="social-white">
                                                    <ul>
                                                        <li>
                                                            <a href="https://www.facebook.com/shoptheworldstore/" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                                        </li>
                                                         
                                                        <li>
                                                            <a href="https://twitter.com" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.instagram.com/stw_insta_in/" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                                        </li>
                                                         
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col className="form-p p-0">
                                    <div className="footer-block">
                                        <div className="subscribe-white">
                                            <h2 className="text-white">newsletter</h2>
                                            <form>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="exampleFormControlInput" placeholder="Enter your email" />
                                                    <button type="submit" className="btn btn-solid black-btn">subscribe</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className=" footer-block">
                                        <div className="footer-container">
                                            <div className="footer-title">
                                                <h4>store information</h4>
                                            </div>
                                            <div className="footer-contant">
                                                <ul className="contact-details">
                                                <li><i className="fa fa-map-marker"></i>Shop The World
                                            </li>
                                        <li><i className="fa fa-phone"></i>Call Us: +91 9820168421</li>
                                        <li><i className="fa fa-fax"></i>WhatsApp: +91 9820168421</li>
                                        <li><i className="fa fa-envelope-o"></i>Email Us: <a
                                            href="#">care@shoptheworldonline.com</a></li>
                                      
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
                <div className="white-layout box-layout">
                    <Container>
                        <section className="small-section">
                            <Row className="footer-theme2">
                                <Col>
                                    <div className="footer-link link-white">
                                        <div className="footer-title">
                                            <h4>my account</h4>
                                        </div>
                                        <div className="footer-contant">
                                            <ul>
                                                <li><a href="#">mens</a></li>
                                                <li><a href="#">womens</a></li>
                                                <li><a href="#">clothing</a></li>
                                                <li><a href="#">accessories</a></li>
                                                <li><a href="#">featured</a></li>
                                                <li><a href="#">service</a></li>
                                                <li><a href="#">cart</a></li>
                                                <li><a href="#">my order</a></li>
                                                <li><a href="#">FAQ</a></li>
                                                <li><a href="#">new product</a></li>
                                                <li><a href="#">featured product</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                    </Container>
                </div>
               <CopyRight layout={layoutClass} />
            </footer>
        </Fragment>
    );
}

export default FooterFive;