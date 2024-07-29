import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const OfferForm = ({ totalPrice, services, webDetails}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  /* nuevo*/
  const [pressuposts, setPressuposts] = useState([]);
  
  

  function savePressupost() {
    let userName = document.querySelector("#name").value;
    let userPhone = document.querySelector("#phone").value;
    let userEmail = document.querySelector("#emailAdr").value;

    /* nuevo*/
    const newOffer = {
      userName:  userName,
      userPhone: userPhone,
      userEmail: userEmail,
      totalPrice: totalPrice,
      services: services,
      webDetails: webDetails,

    };

    setPressuposts([...pressuposts, newOffer])
    setIsSaved(true);
    console.log(newOffer);
    
  }
  

      const renderPressupost = (pressupost, index) => (
        <div key={index.id} className="formSaved">
          <div className="clientDetails">
            <div className="nameResult">{pressupost.userName}</div>
            <div className="phoneResult">{pressupost.userPhone}</div>
            <div className="emailAdrResult">{pressupost.userEmail}</div>
          </div>
          
      <div className="clientServiceDetails">
        <div className="servicesChoosen">  
            
            {pressupost.services.web &&  (<div>Web</div>)} 
            {pressupost.services.web &&  (<div className="finalList">* Pages</div>)}
            {pressupost.services.web &&  (<div className="finalList">* Languages</div>)}
            {pressupost.services.ads && (<div>Ads</div>)}
            {pressupost.services.seo && (<div>Seo</div>)}
        </div>
      </div>
      <div>
        <div className="totalField">total</div>
        <div className="">{pressupost.totalPrice}</div>
      </div>
    </div>
  );

  return (
    <div className="offerForm">
      <h2>Demanar presupuesto</h2>
      <input type="text" placeholder="Name" id="name" className="userData" />
      <input type="text" placeholder="Phone" id="phone" className="userData" />
      <input
        type="text"
        placeholder="Email"
        id="emailAdr"
        className="userData"
      />
      <button className="welcomePage-solicitar" onClick={savePressupost}>
        Solicitar pressupost
      </button>

      {isSaved && (
        <>
          <div className="formSavedTitle">
            <h2>Pressupuestos en curs</h2>
            <div className="formSavedTitleIcons">
              <p>
                <FaMagnifyingGlass />
              </p>
              <p>Data</p>
              <p>Import</p>
              <p>Nom</p>
            </div>
          </div>
          <div>
          {pressuposts.map((pressupost, index) => renderPressupost(pressupost, index))}
          </div>
        </>
      )}
    </div>
  );
};
export default OfferForm;
