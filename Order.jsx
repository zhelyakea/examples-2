import React, { Fragment } from "react";
import withOrder from "./withOrder";
import { compose, branch, renderComponent } from "recompose";

import EditableOrder from "./EditableOrder";
import NotEditableOrder from "./NotEditableOrder";

export const Order = ({ children }) => <Fragment>{children}</Fragment>;

export const enhance = compose(
  withOrder,
  branch(
    ({ isEditable }) => isEditable,
    renderComponent(({ isEditable, ...otherProps }) => (
      <EditableOrder {...otherProps} />
    )),
    renderComponent(({ isEditable, ...otherProps }) => (
      <NotEditableOrder {...otherProps} />
    ))
  )
);
export default enhance(Order);
