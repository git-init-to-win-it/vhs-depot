import React, { useState } from "react";
import GetCartMovies from "../components/GetCartMovies";
import ClearCart from "../components/ClearCart";

const Cart = () => {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <GetCartMovies success={success} setSuccess={setSuccess} />
      <ClearCart success={success} setSuccess={setSuccess} />
    </>
  );
};

export default Cart;
