import React, { useContext, useEffect } from "react"
import { CartContext } from "../Cart/CartContext"
import Item from "./Item"
import URL from "../../config"

const MenuItems = ({ menuItems, id }) => {
  const [cart, dispatch] = useContext(CartContext)

  const fetchData = async cart => {
    try {
      let res = await fetch(`${URL}/cart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          restaurantId: cart.restaurantId,
          cartItems: cart.cartItems
        })
      })
      await res.json()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData(cart)
  }, [cart])

  return (
    <div className="itemList">
      {menuItems.map(item => (
        <Item {...item} restaurantId={id} key={item.id} quantity={1} />
      ))}
    </div>
  )
}

export default MenuItems