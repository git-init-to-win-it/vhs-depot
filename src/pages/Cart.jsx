import React, { useState } from "react";
import GetCartMovies from "../components/GetCartMovies";
import ClearCart from "../components/ClearCart";
import "../styles/cart.css"

const Cart = () => {
  const [success, setSuccess] = useState(false);

  return (
    <> <section className="cartCard">
      <GetCartMovies success={success} setSuccess={setSuccess} />
      <ClearCart success={success} setSuccess={setSuccess} />
      </section>
    </>
  );
};

export default Cart;
