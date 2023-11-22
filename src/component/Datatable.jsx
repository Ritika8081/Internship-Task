import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './datatable.css';

const Datatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: responseData } = await axios.get(
        'https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd'
      );
      setData(responseData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await fetchData();
  };

  return (
    <div>
      <button className="refresh-button" onClick={refreshData}>
        Refresh Data
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Currency Names</th>
                <th>Symbols</th>
                <th>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ slug, symbol, metrics: { market_data: { price_usd } } }, index) => (
                <tr key={index}>
                  <td>{slug}</td>
                  <td>{symbol}</td>
                  <td>{price_usd.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Datatable;
