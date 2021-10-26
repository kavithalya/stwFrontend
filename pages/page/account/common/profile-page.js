import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';
import firebase, { googleProvider, facebookProvider } from '../../../../config/base'
import { useForm } from "react-hook-form";
// import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_CUSTOMER = gql`
query($customerId: String){
    getCustomerByID(customerID: $customerId){
      address1
      address2
      city
      country
      customerid
      customerlastname
      customername
      customerredid
      emailid
      facebookid
      googleid
      phonenumber
      pincode
      state 
    }
  }
`
const UPDATE_CUSTOMER = gql`
mutation($customerid: String, $customername: String, $address1: String, $address2: String, $city: String, $country: String, $customerlastname: String, $phonenumber: String, $pincode: String, $state: String){
    updateCustomerDetails(customerid: $customerid,customername: $customername,address1: $address1,address2: $address2,city: $city,country: $country,customerlastname: $customerlastname,phonenumber: $phonenumber,pincode: $pincode,state: $state){
      address1
      address2
      city
      country
      customerid
      customerlastname
      customername
      phonenumber
      pincode
      state
    }
  }
  `

const ProfilePage = () => {

    const [obj, setObj] = useState({});
    const [state, setState] = useState({});
    const [userId, setUserId] = useState(null);
    const [mailId, setMailId] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [displayName, setDisplayName] = useState(null);
    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const router = useRouter();

    // var { loading, data, error} = useQuery(GET_CUSTOMER, {
    //     variables: {
    //         customerId: userId
    //     }
    // });
    const [orderObj, setOrderObj] = useState(
        sessionStorage.getItem('orderObj')
    );

    const [customerId, setCustomerId] = useState(
        localStorage.getItem('CustomerId')
    );


    useEffect(() => {
        sessionStorage.setItem('orderObj', orderObj);
        //   if(data!=undefined && (data.getCustomerByID!=null && data.getCustomerByID!=undefined))
        //   {
        //     setState({first_name:data.getCustomerByID.customername})
        //   }

        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;
        console.log(user);
        if (user != null) {

            if (user.displayName != null)
                setDisplayName(user.displayName)
            else
                setDisplayName(user.email)

            // displayName = ;
            setMailId(user.email);
            //   mailId = user.email;

            setPhoneNumber(user.phoneNumber);
            //   phoneNumber = user.phoneNumber/

            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            setUserId(user.uid)
            //   userId = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.

        }

    }, []);

    // function customerData(id){
    var { loading, data, error } = useQuery(GET_CUSTOMER, {
        variables: {
            customerId: customerId
        }
    });
    console.log("DATAAAAA", data);
    // console.log("data", data.getCustomerByID);
    // if(data != undefined)
    //  let customerData =data.getCustomerByID;

    //     return customerData

    // }

    const [UpdateCustomer, { CustomerData }] = useMutation(UPDATE_CUSTOMER);

    var customerData = {
        first_name: (obj.first_name == undefined || obj.first_name == null || obj.first_name == "") ? "" : obj.first_name,
        last_name: obj.last_name == undefined ? "" : obj.last_name,
        phone: obj.phone == undefined ? "" : obj.phone,
        email: obj.email == undefined ? "" : obj.email,
        // country: country,
        address1: obj.address1 == undefined ? "" : obj.address1,
        address2: obj.address2 == undefined ? "" : obj.address2,
        country: obj.country == undefined ? "" : obj.country,
        city: obj.city == undefined ? "" : obj.city,
        state: obj.state == undefined ? "" : obj.state,
        pincode: obj.pincode == undefined ? "" : obj.pincode,

    }

    if (data != undefined) {
        customerData = {
            first_name: (obj.first_name == undefined || obj.first_name == null || obj.first_name == "") ? data.getCustomerByID.customername : obj.first_name,
            last_name: obj.last_name == undefined ? data.getCustomerByID.customerlastname : obj.last_name,
            phone: obj.phone == undefined ? data.getCustomerByID.phonenumber : obj.phone,
            email: obj.email == undefined ? data.getCustomerByID.emailid : obj.email,
            // country: country,
            address1: obj.address1 == undefined ? data.getCustomerByID.address1 : obj.address1,
            address2: obj.address2 == undefined ? data.getCustomerByID.address2 : obj.address2,
            city: obj.city == undefined ? data.getCustomerByID.city : obj.city,
            state: obj.state == undefined ? data.getCustomerByID.state : obj.state,
            pincode: obj.pincode == undefined ? data.getCustomerByID.pincode : obj.pincode,
            country: obj.country == undefined ? data.getCustomerByID.country : obj.country
        }
    }
    // const Label ={
    //     /* Other styling... */
    //     textAlign: "right",
    //     clear: "both",
    //     float:"left",
    //     marginRight:"15px"
    // }

    const setStateFromInput = (event) => {

        obj[event.target.name] = event.target.value;


        if (event.target.name == "first_name") {
            setState({ first_name: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.customername = event.target.value;
        }

        if (event.target.name == "last_name") {
            setState({ last_name: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.customerlastname = event.target.value;
        }

        if (event.target.name == "phone") {
            setState({ phone: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.phonenumber = event.target.value;
        }

        if (event.target.name == "email") {
            setState({ email: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.emailid = event.target.value;

        }

        // setState({ country: country })
        // if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
        //     data.getCustomerByID.country = country;

        if (event.target.name == "address1") {
            setState({ address1: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.address1 = event.target.value;
        }

        if (event.target.name == "address2") {
            setState({ address2: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.address2 = event.target.value;
        }

        if (event.target.name == "city") {
            setState({ city: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.city = event.target.value;
        }

        if (event.target.name == "state") {
            setState({ state: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.state = event.target.value;
        }

        if (event.target.name == "country") {
            setState({ country: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.country = event.target.value;
        }

        if (event.target.name == "pincode") {
            setState({ pincode: event.target.value })
            if (data != undefined && (data.getCustomerByID != null && data.getCustomerByID != undefined))
                data.getCustomerByID.pincode = event.target.value;
        }



        setObj(obj);
    };
    const onSubmit = (event) => {

        // console.log("@@@@@@@@@@@@@@", customerData)
        var NewCustomerData = {
            customerid: customerId,
            customername: customerData.first_name,
            address1: customerData.address1,
            address2: customerData.address2,
            city: customerData.city,
            country: customerData.country,
            customerlastname: customerData.last_name,
            phonenumber: customerData.phone,
            pincode: customerData.pincode,
            state: customerData.state,
        }

        var CustomerData = UpdateCustomer({
            variables: { ...NewCustomerData },
        });

        alert('Hi ' + customerData.first_name + '!!! ,your details updated successfully ', { keepAfterRouteChange: true });
        router.push('/');
        // window.location.reload()
    }


    // const onSubmit = (data, e) => {
    // if(data !== "" )

    // //country code plus your phone number excluding leading 0 if exists.
    // var phoneNumber = "+91 7299693937"; //you could provide a prompt/modal or other field in your UX to replace this phone number.

    // // let phoneNumber = "+441234567890"; //testing number, ideally you should set this in your firebase auth settings
    // // var verificationCode = "123456";

    // // Turn off phone auth app verification.
    // // firebase.auth().settings.appVerificationDisabledForTesting = true;

    // // This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
    // // This will resolve after rendering without app verification.
    // var appVerifier = new firebase.auth.RecaptchaVerifier(
    //     "recaptcha-container",
    //     {
    //         size: "invisible"
    //     }
    // );

    // var provider = new firebase.auth.PhoneAuthProvider();
    // provider.verifyPhoneNumber(phoneNumber, appVerifier)
    //     .then(function (verificationId) {
    //         var verificationCode = window.prompt('Please enter the verification ' +
    //             'code that was sent to your mobile device.');
    //         phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    //         user.currentUser.updatePhoneNumber(phoneCredential);
    //     })
    //     .then((result) => {
    //         // Phone credential now linked to current user.
    //         // User now can sign in with new phone upon logging out.
    //         console.log(result);
    //     })
    //     .catch((error) => {
    //         // Error occurred.
    //         console.log(error);
    //     });
    // };

    return (
        <>
            <section className="contact-page register-page ">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>PERSONAL DETAIL</h3>
                            <Form className="theme-form" onSubmit={handleSubmit(onSubmit)} >
                                <Row>
                                    {data != undefined && (data.getCustomerByID != undefined && data.getCustomerByID != null) ?
                                        <div className="row check-out">
                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="firstname">First Name</Label>
                                                {(data.getCustomerByID.customername != "" && data.getCustomerByID.customername != null) ? <input
                                                    type="text"
                                                    className={`${errors.first_name ? "error_border form-control" : " form-control"}`}
                                                    name="first_name"
                                                    onChange={setStateFromInput}
                                                    value={data.getCustomerByID.customername}
                                                    ref={register({ required: true })}
                                                /> : <input
                                                    type="text"
                                                    className={`${errors.first_name ? "error_border form-control" : "form-control"}`}
                                                    name="first_name"
                                                    value={data.getCustomerByID.customername}
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true })}
                                                />}
                                                <span className="error-message">
                                                    {errors.first_name && "First name is required"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="lastname">Last Name</Label>
                                                {(data.getCustomerByID.customerlastname != "" && data.getCustomerByID.customerlastname != null) ? <input
                                                    type="text"
                                                    className={`${errors.last_name ? "error_border form-control" : "form-control"}`}
                                                    value={data.getCustomerByID.customerlastname}
                                                    name="last_name"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true })}
                                                /> : <input
                                                    type="text"
                                                    className={`${errors.last_name ? "error_border form-control" : "form-control"}`}
                                                    name="last_name"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true })}
                                                />}
                                                <span className="error-message">
                                                    {errors.last_name && "Last name is required"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="phone">Phone</Label>
                                                {(data.getCustomerByID.phonenumber != "" && data.getCustomerByID.customerlastname != null) ? <input
                                                    type="text"
                                                    name="phone"
                                                    onChange={setStateFromInput}
                                                    value={data.getCustomerByID.phonenumber}
                                                    className={`${errors.phone ? "error_border form-control" : "form-control"}`}
                                                    ref={register({ pattern: /\d+/ })}
                                                /> : <input
                                                    type="text"
                                                    name="phone"
                                                    onChange={setStateFromInput}
                                                    className={`${errors.phone ? "error_border form-control" : "form-control"}`}
                                                    ref={register({ pattern: /\d+/ })}
                                                />}

                                                <span className="error-message">
                                                    {errors.phone && "Please enter number for phone."}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="emailid">Email Address</Label>

                                                {(data.getCustomerByID.emailid != "" && data.getCustomerByID.emailid != null) ? <input
                                                    className={`${errors.email ? "error_border form-control" : " form-control"}`}
                                                    type="text"
                                                    name="email"
                                                    // onBlur={emailVarification}
                                                    autocomplete="off"
                                                    // onChange={setStateFromInput}
                                                    value={data.getCustomerByID.emailid}
                                                    ref={register({
                                                        required: true,
                                                        pattern: /^\S+@\S+$/i,
                                                    })}
                                                /> : <input
                                                    className={`${errors.email ? "error_border form-control" : " form-control"}`}
                                                    type="text"
                                                    name="email"
                                                    // onBlur={emailVarification}
                                                    autocomplete="off"
                                                    // onChange={setStateFromInput}
                                                    ref={register({
                                                        required: true,
                                                        pattern: /^\S+@\S+$/i,
                                                    })}
                                                />}
                                                <span className="error-message">
                                                    {errors.email && "Please enter proper email address ."}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="address">Address</Label>
                                                {(data.getCustomerByID.address1 != "" && data.getCustomerByID.address1 != null) ? <input
                                                    className={`${errors.address1 ? "error_border form-control" : "form-control"}`}
                                                    type="text"
                                                    name="address1"
                                                    onChange={setStateFromInput}
                                                    value={data.getCustomerByID.address1}
                                                    ref={register({ required: true, min: 20, max: 120 })}
                                                    placeholder="Street address"
                                                /> : <input
                                                    className={`${errors.address ? "error_border form-control" : " form-control"}`}
                                                    type="text"
                                                    name="address1"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true, min: 20, max: 120 })}
                                                    placeholder="Street address"
                                                />}
                                                <span className="error-message">
                                                    {errors.address && "Please enter your correct address ."}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="address1">Confirm Address</Label>

                                                {(data.getCustomerByID.address2 != "" && data.getCustomerByID.address2 != null) ? <input
                                                    className={`${errors.address ? "error_border form-control" : " form-control"}`}
                                                    type="text"
                                                    name="address2"
                                                    onChange={setStateFromInput}
                                                    value={data.getCustomerByID.address2}
                                                    ref={register({ required: true, min: 20, max: 120 })}
                                                    placeholder="Street address"
                                                /> : <input
                                                    className={`${errors.address2 ? "error_border form-control" : "form-control"}`}
                                                    type="text"
                                                    name="address2"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true, min: 20, max: 120 })}
                                                    placeholder="Street address"
                                                />}
                                                <span className="error-message">
                                                    {errors.address2 && "Please enter your correct address ."}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="city">Town/City</Label>
                                                {(data.getCustomerByID.city != "" && data.getCustomerByID.city != null) ? <input
                                                    type="text"
                                                    className={`${errors.city ? "error_border form-control" : " form-control"}`}
                                                    value={data.getCustomerByID.city}
                                                    name="city"
                                                    ref={register({ required: true })}
                                                    onChange={setStateFromInput}
                                                /> : <input
                                                    type="text"
                                                    className={`${errors.city ? "error_border form-control" : " form-control"}`}
                                                    name="city"
                                                    ref={register({ required: true })}
                                                    onChange={setStateFromInput}
                                                />}
                                                <span className="error-message">
                                                    {errors.city && "select one city"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="state">State </Label>
                                                {(data.getCustomerByID.state != "" && data.getCustomerByID.state != null) ? <input
                                                    type="text"
                                                    className={`${errors.state ? "error_border form-control" : " form-control"}`}
                                                    name="state"
                                                    value={data.getCustomerByID.state}
                                                    ref={register({ required: true })}
                                                    onChange={setStateFromInput}
                                                /> : <input
                                                    type="text"
                                                    className={`${errors.state ? "error_border form-control" : " form-control"}`}
                                                    name="state"
                                                    ref={register({ required: true })}
                                                    onChange={setStateFromInput}
                                                />}
                                                <span className="error-message">
                                                    {errors.state && "select one state"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="country">Country</Label>
                                                {(data.getCustomerByID.country != "" && data.getCustomerByID.country != null) ? <input
                                                    type="text"
                                                    className={`${errors.country ? "error_border form-control" : " form-control"}`}
                                                    name="country"
                                                    value={data.getCustomerByID.country}
                                                    ref={register({ required: true })}
                                                    onChange={setStateFromInput}
                                                /> : <input
                                                    type="text"
                                                    className={`${errors.country ? "error_border form-control" : " form-control"}`}
                                                    name="country"
                                                    ref={register({ required: true })}
                                                    onChange={setStateFromInput}
                                                />}
                                                <span className="error-message">
                                                    {errors.country && "select one country"}
                                                </span>
                                            </div>

                                            {/* <div className="form-group row">
                                            <Label for="country">Country</Label>
                                                <Label  for="firstname">Country</div>
                                                <select name="country" ref={register({ required: true })}>
                                                    <option>{country}</option>
                                                    <option>India</option>
                                                    <option>South Africa</option>
                                                    <option>United State</option>
                                                    <option>Australia</option>
                                                </select>
                                            </Col> */}

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="pincode">Postal Code</Label>

                                                {(data.getCustomerByID.pincode != "" && data.getCustomerByID.pincode != null) ? <input
                                                    type="text"
                                                    name="pincode"
                                                    onChange={setStateFromInput}
                                                    value={data.getCustomerByID.pincode}
                                                    className={`${errors.pincode ? "error_border form-control" : " form-control"}`}
                                                    ref={register({ pattern: /\d+/ })}
                                                /> : <input
                                                    type="text"
                                                    name="pincode"
                                                    onChange={setStateFromInput}
                                                    className={`${errors.pincode ? "error_border form-control" : " form-control"}`}
                                                    ref={register({ pattern: /\d+/ })}
                                                />}
                                                <span className="error-message">
                                                    {errors.pincode && "Required integer"}
                                                </span>
                                            </div>
                                        </div>

                                        :
                                        <div className="row check-out">
                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="firstname">First Name</Label>
                                                <input
                                                    type="text"
                                                    className={`${errors.first_name ? "error_border form-control" : " form-control"}`}
                                                    name="first_name"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true })}
                                                />
                                                <span className="error-message">
                                                    {errors.first_name && "First name is required"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="lasttname">Last Name</Label>
                                                <input
                                                    type="text"
                                                    className={`${errors.last_name ? "error_border form-control" : "form-control"}`}
                                                    name="last_name"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true })}
                                                />
                                                <span className="error-message">
                                                    {errors.last_name && "Last name is required"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="phone">Phone</Label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    onChange={setStateFromInput}
                                                    className={`${errors.phone ? "error_border form-control" : " form-control"}`}
                                                    ref={register({ pattern: /\d+/ })}
                                                />
                                                <span className="error-message">
                                                    {errors.phone && "Please enter number for phone."}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="address">Address</Label>
                                                <input
                                                    type="text"
                                                    className={`${errors.adress1 ? "error_border form-control" : " form-control"}`}
                                                    name="adress1"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true, min: 20, max: 120 })}
                                                />
                                                <span className="error-message">
                                                    {errors.adress1 && "Address is required"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="address1">Confirm Address</Label>

                                                <input
                                                    type="text"
                                                    className={`${errors.adress2 ? "error_border form-control" : " form-control"}`}
                                                    name="adress2"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true, min: 20, max: 120 })}
                                                />
                                                <span className="error-message">
                                                    {errors.adress2 && "Address is required"}
                                                </span>
                                            </div>

                                            {/* <div className="form-group row">
                                            <Label for="firstname">First Name</Label>
                                                // <Label  for="firstname">Country</div>
                                                <select name="country" ref={register({ required: true })}>
                                                    <option>{country}</option>
                                                    <option>India</option>
                                                    <option>South Africa</option>
                                                    <option>United State</option>
                                                    <option>Australia</option>
                                                </select>
                                            </div> */}


                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="city">Town/City</Label>
                                                <input
                                                    type="text"
                                                    className={`${errors.city ? "error_border form-control" : " form-control"}`}
                                                    name="city"
                                                    ref={register({ required: true })}
                                                    onChange={setStateFromInput}
                                                />
                                                <span className="error-message">
                                                    {errors.city && "select one city"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="state">State</Label>
                                                <input
                                                    type="text"
                                                    className={`${errors.state ? "error_border form-control" : " form-control"}`}
                                                    name="state"
                                                    ref={register({ required: true })}
                                                    onChange={setStateFromInput}
                                                />
                                                <span className="error-message">
                                                    {errors.state && "select one state"}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="country">Country</Label>
                                                <input
                                                    className={`${errors.country ? "error_border form-control" : " form-control"}`}
                                                    type="text"
                                                    name="country"
                                                    onChange={setStateFromInput}
                                                    ref={register({ required: true })}
                                                    placeholder="Street country"
                                                />
                                                <span className="error-message">
                                                    {errors.country && "Please enter your country ."}
                                                </span>
                                            </div>

                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <Label for="pincode">Postal Code</Label>

                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    onChange={setStateFromInput}
                                                    className={`${errors.pincode ? "error_border form-control" : " form-control"}`}
                                                    ref={register({ pattern: /\d+/ })}
                                                />
                                                <span className="error-message">
                                                    {errors.pincode && "Required integer"}
                                                </span>
                                            </div>

                                        </div>}

                                    {/* <Col md="6">
                                        <Label for="firstname">First Name</Label>
                                            // value={customerData.first_name}
                                            // value={displayName}
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="lastname">Last Name</Label>
                                        <Input type="text" className="form-control" id="lastname" placeholder="Enter Your lastname" required=""
                                        // value={customerData.last_name}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label for="phone">Phone number</Label>
                                        <Input type="text" className="form-control" id="phone" placeholder="Enter your number"
                                            // value={customerData.phone}
                                            required="" />
                                        <div id="recaptcha-container" visibility="hidden"></div>
                                    </Col>
                                    <Col md="6">
                                        <Label for="email">Email</Label>
                                        <Input type="text" className="form-control" id="email" placeholder="Enter your Email"
                                            value={mailId} required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="address">Address</Label>
                                        <Input type="text" className="form-control" id="address" placeholder="Enter your Address" required=""
                                        // value={customerData.address}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label for="address1">Confirm Address</Label>
                                        <Input type="text" className="form-control" id="address1" placeholder="Confirm your Address" required=""
                                        // value={customerData.address1}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label for="city">City</Label>
                                        <Input type="text" className="form-control" id="city" placeholder="Enter your City" required=""
                                        // value={customerData.city}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label for="state">State</Label>
                                        <Input type="text" className="form-control" id="state" placeholder="Enter Your State" required=""
                                        // value={customerData.state}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label for="country">Country</Label>
                                        <Input type="text" className="form-control" id="country" placeholder="Enter Your country" required=""
                                        // value={customerData.country}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label for="pincode">Pincode</Label>
                                        <Input type="text" className="form-control" id="pincode" placeholder="Enter Your pincode" required=""
                                        // value={customerData.pincode}
                                        />
                                    </Col> */}
                                    {/* <Col md="6">
                                        <Label for="googleid">GoogleID</Label>
                                        <Input type="text" className="form-control" id="googleid" placeholder="Enter Your googleid" required=""  value={displayName} />
                                    </Col>
                                    <Col md="6">
                                        <Label for="facebookid">FacebookID</Label>
                                        <Input type="text" className="form-control" id="facebookid" placeholder="Enter Your facebookid" required=""  value={displayName} />
                                    </Col>
                                    <Col md="6">
                                        <Label for="customerredid">CustomerredID</Label>
                                        <Input type="text" className="form-control" id="customerredid" placeholder="Enter Your customerredid" required=""  value={displayName} />
                                    </Col> */}
                                </Row>
                                <div className="col-md-12">
                                    <button className="btn btn-success" type="submit">Save setting</button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section >
            <section className="contact-page register-page section-b-space">
                <Container>
                    <Row>
                        <Col sm="12">
                            {/* <h3>SHIPPING ADDRESS</h3> */}
                            {/* <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}> */}
                            <Row>
                                {/* <Col md="6">
                                        <Label for="name">flat / plot</Label>
                                        <Input type="text" className="form-control" id="home-ploat" placeholder="company name"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="name">Address *</Label>
                                        <Input type="text" className="form-control" id="address-two" placeholder="Address"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="email">Zip Code *</Label>
                                        <Input type="text" className="form-control" id="zip-code" placeholder="zip-code"
                                            required="" />
                                    </Col>
                                    <Col md="6" className="select_input">
                                        <Label for="review">Country *</Label>
                                        <select className="form-control" size="1">
                                            <option value="India">India</option>
                                            <option value="UAE">UAE</option>
                                            <option value="U.K">U.K</option>
                                            <option value="US">US</option>
                                        </select>
                                    </Col>
                                    <Col md="6">
                                        <Label for="review">City *</Label>
                                        <Input type="text" className="form-control" id="city" placeholder="City" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="review">Region/State *</Label>
                                        <Input type="text" className="form-control" id="region-state" placeholder="Region/state"
                                            required="" />
                                    </Col> */}

                            </Row>
                            {/* </Form> */}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ProfilePage;