import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OfferForm from "./OfferForm";

const CheckBox = ({ offers }) => {
  const [services, setServices] = useState({
    seo: false,
    ads: false,
    web: false,
  });
  /* ---------- Establece la lista con servicios add de Web y su estado inicial -------*/
  const [webDetails, setWebDetails] = useState({
    pages: 1,
    languages: 1,
  });

  /* ---------- Establece la lista de offertas escogidas y su estado inicial -------*/
  const [selectedOffers, setSelectedOffers] = useState([]);
  /* ---------- Establece precio total y su estado inicial -------*/
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    let suplemento =
      services.web && (webDetails.pages + webDetails.languages) * 30;
    let total =
      (services.web && 500) + 
      (services.seo && 300) +
      (services.ads && 400) +
      suplemento;


    setTotalPrice(total);
  }, [services, webDetails]);

  const addService = (id, isSelected) => {
    const selectedOffer = offers.find((offer) => offer.id === id);
    setSelectedOffers((prevSelectedOffers) => {
      if (isSelected) {
        // Solo agrega si no está ya en la lista
        if (!prevSelectedOffers.includes(id)) {
          setTotalPrice((prevTotal) => prevTotal + selectedOffer.price);
          return [...prevSelectedOffers, id];
        }
      } else {
        // Solo elimina si está en la lista
        if (prevSelectedOffers.includes(id)) {
          setTotalPrice((prevTotal) => prevTotal - selectedOffer.price);
          return prevSelectedOffers.filter((offerId) => offerId !== id);
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

  return (
    <div>
      <Link to={"/"}>
        <button className="welcomePage">Welcome</button>
      </Link>
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
          Preu pressuposat {totalPrice} €
        </h2>
      </div>
      
      {(services.web || services.ads || services.seo) && (
        <OfferForm totalPrice={totalPrice} services={services} prevSelectedOffers={selectedOffers} offers={offers} webdetails={webDetails}/>
      )}
    </div>
  );
};

export default CheckBox;
