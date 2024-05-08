import React, { useState } from "react";
import GetCartMovies from "../components/GetCartMovies";
import ClearCart from "../components/ClearCart";
import "../styles/cart.css"

const Cart = () => {
  const [success, setSuccess] = useState(false);
  const [remove, setRemove] = useState(false);

  return (
    <> <section className="cartCard" id="poetsen-one-regular">
      <GetCartMovies success={success} setSuccess={setSuccess} remove={remove} setRemove={setRemove}/>
      <ClearCart success={success} setSuccess={setSuccess} />
      </section>
    </>
  );
};

export default Cart;
