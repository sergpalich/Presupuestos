import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const OfferForm = ({ totalPrice, services}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  

  function savePressupost() {
    let userName = document.querySelector("#name").value;
    let userPhone = document.querySelector("#phone").value;
    let userEmail = document.querySelector("#emailAdr").value;

    setUserName(userName);
    setUserPhone(userPhone);
    setUserEmail(userEmail);
    setIsSaved(true);
    console.log(isSaved);
  }

  


  const isSavedOptions = [services.web, services.ads, services.seo];
  const renderFormSaved = (type) => (
    <div className="formSaved">
      <div className="clientDetails">
        <div className="nameResult">{userName} </div>
        <div className="phoneResult">{userPhone}</div>
        <div className="emailAdrResult">{userEmail}</div>
      </div>

      <div className="clientServiceDetails">
        <div className="servicesChoosen">
            {services.web &&  (<div>Web</div>)} 
            {services.web &&  (<div className="finalList">* Pages</div>)}
            {services.web &&  (<div className="finalList">* Languages</div>)}
            {services.ads && (<div>Ads</div>)}
            {services.seo && (<div>Seo</div>)}
        </div>
      </div>
      <div>
        <div className="totalField">total</div>
        <div className="">{totalPrice}</div>
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
            {isSavedOptions.includes(isSaved) && renderFormSaved(isSaved)}
          </div>
        </>
      )}
    </div>
  );
};
export default OfferForm;
