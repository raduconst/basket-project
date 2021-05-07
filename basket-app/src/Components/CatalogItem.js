import React from 'react';
import logo from './../assets/placeholder.png';

export default class CatalogItem extends React.Component {

    render () {
        return (
            <li className="product-card">
                <div className="product-image">
                    <img src={logo} />
                </div>
                <h5>{this.props.name}</h5>
                {this.props.stock != 0 ? <h6>{this.props.price} lei</h6> : <h6 className="warning">Out of stock</h6>} 
                <div className={`buy-options${(this.props.stock == 0) ? " hide" : ""}`}>
                <button onClick={(e) => this.props.onDecrementPress(e, this.props.id)}>-</button>
                <div className="quantity">{(this.props.quantity) ? this.props.quantity : '0'}</div>
                <button onClick={(e) => this.props.onIncrementPress(e, this.props.id)}>+</button>
                <button className="add-to-cart" onClick={(e) => this.props.onAddToCartPress(e, this.props.id, this.props.quantity)}>
                    <svg width="20px" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" fillRule="evenodd"></path></svg>Add to basket
                </button>
                </div>
            </li>
        )
    }
}