import React from 'react'
import './Checkout.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect'

import { selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors'

import CheckoutItem from '../../components/checkoutItem/CheckoutItem'
const CheckoutPage = ({cartItems, total}) => {
    return(
        <div className="checkout-page">

            <div className='checkout-header'>
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map( cartItem => 
                    <CheckoutItem cartItem={cartItem} key={cartItem.id} />
                 )
                 }
            <div className='total'>
                <span>TOTAL: ${total}</span>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);