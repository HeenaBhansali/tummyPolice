import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import Itemimg from "./images/item.webp"

const Item = props => {
  const [cartItems, setCartItems] = useContext(CartContext)
  const [fetchStatus, setFetchStatus] = useState(false)

  const addToCart = () => {
    let key = props.id
    if (key in cartItems.cart) {
      let { quantity, price } = cartItems.cart[key]
      quantity += 1
      price = props.price * quantity
      let cartValue = {
        restaurantId: props.restaurantId,
        cart: Object.assign(cartItems.cart, {
          [props.id]: { name: props.name, price: price, quantity: quantity }
        })
      }
      setCartItems(cartValue)
    } else {
      let cartValue = {
        restaurantId: props.restaurantId,
        cart: Object.assign(cartItems.cart, {
          [props.id]: {
            name: props.name,
            price: props.price,
            quantity: props.quantity
          }
        })
      }
      setCartItems(cartValue)
    }
  }

  const fetchData = async () => {
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          restaurantId: props.restaurantId,
          cart: cartItems.cart
        })
      })
      let result = await res.json()
      setFetchStatus(res.ok)
      // console.log("result",result)
      // console.log('res', res.ok)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [cartItems])

  return { fetchStatus } ? (
    <div className="item">
      <img src={Itemimg} />
      <h3>{props.name}</h3>
      <h5>{props.category}</h5>
      <h4>{props.price}</h4>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  ) : (
    <div>Unable to fetch items</div>
  )
}
export default Item
