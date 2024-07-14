import "./assets/App.css";
import HeaderBanner from "./components/HeaderBanner";
import CheckBox from "./components/CheckBox";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import { Link } from "react-router-dom";

function App() {
  const offers = [
    {
      service: "Seo",
      description: "Programacio de una web <br></br>responsive completa",
      price: 300,
      id: 1,
    },

    {
      service: "Ads",
      description: "Programacio de una web <br></br>responsive completa",
      price: 400,
      id: 2,
    },

    {
      service: "Web",
      description: "Programacio de una web <br></br>responsive completa",
      price: 500,
      id: 3,
    },
  ];

  return (
    <>
      
      <HeaderBanner />
      <Routes>
        <Route path="/offers" element={<CheckBox offers={offers} />} />
        <Route path="/" element={<WelcomePage />} /> 
      </Routes>
    </>
  );
}

export default App;
