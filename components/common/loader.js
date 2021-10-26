import React from "react"
import ContentLoader from "react-content-loader"
import gif from '../../public/assets/loader/GIF-320-320.gif'
// import classes from './loader.css';

const loadingGif = {
    position: "absolute",
    left: "50%",
    top: "35%",
    width: "100px ",
    height: "100px ",
    boxSizing: "border-box",
    borderRadius: "50%",
    // border: "1px solid" ,
    // position: "relative",
    
    alignItems: "center",
    // justifyContent: "center",
    // backgroundrepeat: "no-repeat !important ",
    // borderradius:" 0% !important",
    // borderradius: "50%",
    // margin: "-128px 0 0 -128px",
}

// const loaderStyle = {
// body : {
//     margin:"0",
//     padding:"0",
//     background:"#34495e",
//     height:"100vh",
//     display:"flex",
//     alignItems:"center",
//     justifyContent:"center",
//     fontFamily:"\"montserrat\",sans-serif"
//  },
// loading:{
//     width:"200px",
//     height:"200px",
//     boxSizing:"border-box",
//     borderRadius:"50%",
//     borderTop:"10px solid #e74c3c",
//     position:"relative",
//     animation:"a1 2s linear infinite"
//     },
//    loading__before:{
//        borderTop:"10px solid #e67e22",
//        transform:"rotate(120deg)"
//     },
//    loading__after:{
//        borderTop:"10px solid #3498db",
//        transform:"rotate(240deg)"
//     },
//    loading_span:{
//        position:"absolute",
//        width:"200px",
//        height:"200px",
//        color:"#fff",
//        textAlign:"center",
//        lineHeight:"200px",
//        animation:"a2 2s linear infinite"
//     }
// }
const Loader = () => {
    return (
        <>
            {/* <Spinner animation="border" role="status"> */}
            {/* <div class="loading" style={loaderStyle}> */}
            {/* <div class="spinner-icon"> */}
            {/* <div className={classes.loading}> */}
{/* <div textAlign= "center" > */}
            <img src={gif} style={loadingGif} />
            {/* </div> */}
            {/* </div> */}
            {/* </Spinner> */}
        </>
    )

}


export default Loader