import React from 'react';

export default class BasketItem extends React.Component {

    render () {
        return (
            <li className="product-card">                  
                <h5 className="product-name">{this.props.name}</h5>
                <h6>Quantity: {this.props.quantity}</h6>
                <h6>Price: {this.props.price}</h6> 
                <button className="remove" onClick={(e) => this.props.onRemovePress(e, this.props.id)}>
                <svg width="20px" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" fillRule="evenodd"></path></svg>Remove
                </button>
            </li>
        )
    }
}