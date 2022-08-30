import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./Components/Coin";
function App() {
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )

      .then((res) => {
        setCoin(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoin = coin.filter((coin) => {
    coin.name.toLowerCase().includes(search.toLowerCase());
    
  });
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoin.map((coin) => {
        return (
          <Coin
            key={coin.id}
            image={coin.image}
            name={coin.name}
            volume={coin.market_cap}
            price={coin.current_price}
            symbol={coin.symbol}
          />
        );
      })}
    </div>
  );
}

export default App;
