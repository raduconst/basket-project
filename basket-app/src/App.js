import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/placeholder.png';

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

  addToCart = ( event, item ) => {
    console.log(item.id, item.quantity);
    fetch("http://basket.local/app/basket.php?action=add&prodId=" + item.id + "&quantity=" +  item.quantity )
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
      if ( currItem.id == item.id ) {
        currItem.quantity = 0;
      }
    })
    this.setState({
      lastUpdated: Date.now,
    })
    const timer = setTimeout(() => { this.getBasket(); }, 10);
  }

  removeFromCart = ( event, itemId ) => {
    console.log(itemId);
    fetch("http://basket.local/app/basket.php?action=delete&prodId=" + itemId )
      .then(res => res.json())
      .then( (result) => { this.setState({ lastUpdated: Date.now }) },
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
      console.log(this.state.productList);
      return (
        <React.Fragment>
          <h2>Product Catalog</h2>
          <ul className="products catalog">
            {productList.map(item => (
                <li key={item.id} className="product-card">
                  <div className="product-image">
                    <img src={logo} />
                  </div>
                    <h5>{item.name}</h5>
                    {item.stock != 0 ? <h6>{item.price} lei</h6> : <h6 className="warning">Out of stock</h6>} 
                  <div className={`buy-options${(item.stock == 0) ? " hide" : ""}`}>
                    <button onClick={(e) => this.DecrementItem(e, item.id)}>-</button>
                    <div className="quantity">{(item.quantity) ? item.quantity : '0'}</div>
                    <button onClick={(e) => this.IncrementItem(e, item.id)}>+</button>
                    <button className="add-to-cart" onClick={(e) => this.addToCart(e, item)}>
                    <svg width="20px" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" fillRule="evenodd"></path></svg>Add to basket
                    </button>
                  </div>
                </li>
            ))}
          </ul>
          <h2>Product Basket</h2>
          <ul className="products basket">
            {basketList.map(item => (
                <li key={item.id} className="product-card">                  
                  <h5 className="product-name">{item.prod_name}</h5>
                  <h6>Quantity: {item.qty}</h6>
                  <h6>Price: {item.total_price}</h6> 
                  <button className="remove" onClick={(e) => this.removeFromCart(e, item.prod_id)}>
                  <svg width="20px" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" fillRule="evenodd"></path></svg>Remove
                  </button>
                </li>
            ))}
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default App;