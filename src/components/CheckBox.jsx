import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link } from "react-router-dom";

const CheckBox = ({ offers }) => {
  const [services, setServices] = useState({
    seo: false,
    ads: false,
    web: false,
  });

  const [webDetails, setWebDetails] = useState({
    pages: 1,
    languages: 1,
  });

  const [selectedOffers, setSelectedOffers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); 

  const addService = (id, isSelected) => {
    const selectedOffer = offers.find(offer => offer.id === id);
    setSelectedOffers((prevSelectedOffers) => {
      if (isSelected) {
        // Solo agrega si no está ya en la lista
        if (!prevSelectedOffers.includes(id)) {
          setTotalPrice(prevTotal => prevTotal + selectedOffer.price);
          return [...prevSelectedOffers, id];
        }
      } else {
        // Solo elimina si está en la lista
        if (prevSelectedOffers.includes(id)) {
          setTotalPrice(prevTotal => prevTotal - selectedOffer.price);
          return prevSelectedOffers.filter(offerId => offerId !== id);
        } 
      }

      return prevSelectedOffers;
      

    });
  };  
  
  const handleCheckboxChange = (id) => {
    const selectedOffer = offers.find((offer) => offer.id === id);
    setServices((prevServices) => {
      const newServices = {
        ...prevServices,
        [selectedOffer.service.toLowerCase()]:
          !prevServices[selectedOffer.service.toLowerCase()],
      };
      console.log("handleCheckboxChange:", id, newServices);
      // Solo llama a addService si hay un cambio de estado
      const isSelected = newServices[selectedOffer.service.toLowerCase()];
      addService(id, isSelected);
      return newServices;
    });
  };


  const handleWebDetailChange = (type, value) => {
    setWebDetails({ ...webDetails, [type]: value });
  };

  const increment = (type) => {
    setWebDetails((prevDetails) => ({
      ...prevDetails,
      [type]: prevDetails[type] + 1,
    }));
 
  };

  const decrement = (type) => {
    setWebDetails((prevDetails) => ({
      ...prevDetails,
      [type]: Math.max(1, prevDetails[type] - 1),
    }));
    
  };

  let [suplWeb,setSuplWeb] = useState(0)

  const takeSuplWeb = () =>  {
    if (services.web){
      setSuplWeb((webDetails.pages + webDetails.languages)*30)
      return setSuplWeb;
    } else {
      suplWeb === 0
    }}


  return (
    <div>
      <Link to={"/"} ><button className="welcomePage">Welcome</button></Link>
      <div className="card-container">
        {offers.map((offer, index) => (
          <Card className="card" key={index}>
            <div>
              <h2>{offer.service}</h2>
              <p className="description">
                Programación de una web responsive completa
              </p>
            </div>
            <div>
              <h2 className="price">{offer.price} €</h2>
            </div>
            <Form>
              <Form.Check
                type="checkbox"
                id={`custom-checkbox-${index}`}
                label="Añadir"
                onClick={() => handleCheckboxChange(offer.id)}
              />
            </Form>
          </Card>
        ))}
      </div>
      {services.web && (
        <div className="websupplements">
          <div>
            <p>
              <strong>Nombre Páginas</strong>
            </p>
            <button onClick={() => decrement("pages")}>-</button>
            <input
              type="number"
              value={webDetails.pages}
              onChange={(e) =>
                handleWebDetailChange("pages", Number(e.target.value))
              }
            />
            
            <button onClick={() => increment("pages")}>+</button>
          </div>
          <div>
            <p>
              <strong>Nombre de Lenguajes</strong>
            </p>
            <button onClick={() => decrement("languages")}>-</button>
            <input
              type="number"
              value={webDetails.languages}
              onChange={(e) =>
                handleWebDetailChange("languages", Number(e.target.value))
              }
            />
            <button onClick={() => increment("languages")}>+</button>
            
          </div>
        </div>
      )}
      
      <div>
        <h2 style={{ textAlign: "end", width: "664px" }}>
          Preu pressuposat {totalPrice + suplWeb}  €
        </h2>
      </div>
    </div>
  );
};


export default CheckBox;
