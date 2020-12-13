import React, { useState, useEffect } from 'react';
import { authService } from '../../services';
import Cards from '../../components/cards/index';
import './style.css';

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState([]);
  const [search, setSearch] = useState([]);

  const getProduct = (product) => {
    authService
      .getProduct(product)
      .then((res) => {
        console.log(res);
        setDataProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProduct('');
  }, []);

  return (
    <div class="containerProduct">
      {isLoading ? <p>loading...</p> : <h2 align="center">Data Product</h2>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getProduct(search);
        }}
      >
        <br />
        <label htmlFor="search">
          Search :
          <input
            className="form-search"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="search" />
      </form>
      <div className="content">
        {dataProduct.map((product) => {
          return (
            <div className="detailProduct">
              <Cards key={[product.id]}>
                <h3 className="product">{product.name}</h3>
                <div>
                  <div className="discount">
                    <p>
                      Discount :{product.display_promo_price_percentage} off
                    </p>
                  </div>
                  <h4>{product.display_normal_price}</h4>
                </div>
                <h5>{product.display_price}</h5>
                <p>{product.description}</p>
              </Cards>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
