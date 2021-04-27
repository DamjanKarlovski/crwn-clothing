import React from 'react';
import { connect } from 'react-redux';
import {toggleCartHidden } from '../../redux/cart/cart.actions'
import { ReactComponent as ShopppingIcon } from '../../assets/shopping-bag.svg';
import './CartIcon.styles.scss';
import CartItem from '../cart-item/Cart-Item';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShopppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = ({ cart: {cartItems }}) => ({
    itemCount: cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
         0)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)