import React from "react";
import { compose, pure } from "recompose";
import withButton from "./withButton";

import block from "bem-cn";
import "./Button.css";
const b = block("button");

export const Button = ({ handleClick, children, type, name }) => (
  <button
    className={b({
      [type]: true,
      [name]: true
    })()}
    onClick={handleClick}
  >
    {children}
  </button>
);
export default compose(pure, withButton)(Button);
