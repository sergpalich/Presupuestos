import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (  
        <>
        <h1 className="welcTitle">Welcome to our WebDev Agency main Page.</h1>
        <p className="welcParag">We are glad to offer to our clientes all type of services related with software application developement, Search emgine optimization (SEO) and web advertising</p>
        <p>Please, get to know our services</p>
        <Link to={"/offers"}><button className="welcomePage">Services</button></Link>
        </>
    );
}
 
export default WelcomePage





