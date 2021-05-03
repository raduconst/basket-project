import './App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/placeholder.png';
import BasketItem from './Components/BasketItem';
import CatalogItem from './Components/CatalogItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      productList: [],
      basketList: [],
      lastUpdated: Date.now(),
    };
  }

  getBasket() {
    fetch("http://basket.local/app/basket.php?action=list")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            basketList: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    );
  }

  componentDidMount() {
    fetch("http://basket.local/app/products.php")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            productList: result
          });
          if ( this.state.isLoaded ) {
            this.state.productList.map(item => {
              item.quantity = 0;
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
      this.getBasket();
  }

  IncrementItem = ( event, itemId ) => {
    this.state.productList.map( item => {
      if ( item.id == itemId && item.quantity < item.stock ) {
        item.quantity += 1;
      }
    })
    this.setState({
      lastUpdated: Date.now,
    })
  }

  DecrementItem = ( event, itemId) => {
    this.state.productList.map( item => {
      if ( item.id == itemId && item.quantity > 0 ) {
        item.quantity -= 1;
      }
    })
    this.setState({
      lastUpdated: Date.now,
    }) 
  }

  addToCart = ( event, itemId, itemQuantity ) => {
    if ( itemQuantity > 0 ) {
      fetch("http://basket.local/app/basket.php?action=add&prodId=" + itemId + "&quantity=" +  itemQuantity )
        .then(res => res.json())
        .then( (result) => { console.log( result ); },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
      );
      this.state.productList.map( currItem => {
        if ( currItem.id == itemId ) {
          currItem.quantity = 0;
        }
      })
      this.setState({
        lastUpdated: Date.now,
      })
      const timer = setTimeout(() => { this.getBasket(); }, 10);
    }
  }

  removeFromCart = ( event, itemId ) => {
    fetch("http://basket.local/app/basket.php?action=delete&prodId=" + itemId )
      .then(res => res.json())
      .then( (result) => { console.log('deleted') },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    );
    const timer = setTimeout(() => { this.getBasket(); }, 10);
  }

  render() {
    const { error, isLoaded, productList, basketList } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <h2>Product Catalog</h2>
          <ul className="products catalog">
            {productList.map(item => (
                <CatalogItem 
                  key={item.id} 
                  id={item.id} 
                  name={item.name} 
                  price={item.price} 
                  stock={item.stock} 
                  quantity={item.quantity} 
                  onDecrementPress={this.DecrementItem}
                  onIncrementPress={this.IncrementItem}
                  onAddToCartPress={this.addToCart}
                />
            ))}
          </ul>
          <h2>Product Basket</h2>
          <ul className="products basket">
            {basketList.map(item => (
                <BasketItem 
                  key={item.id} 
                  id={item.prod_id} 
                  name={item.prod_name} 
                  price={item.total_price} 
                  quantity={item.qty} 
                  onRemovePress={this.removeFromCart}
                />
            ))}
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default App;