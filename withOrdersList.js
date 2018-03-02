import {
  compose,
  withHandlers,
  lifecycle,
  withState,
  mapProps,
  setPropTypes
} from "recompose";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setOrderListY } from "../../actions";

const mapState = ({ orders, selectedPage, selectedOrder, orderListY }) => ({
  orders,
  selectedPage,
  selectedOrder,
  orderListY
});
const mapDispatch = {
  setOrderListY
};
export default compose(
  connect(mapState, mapDispatch),
  withState("list", "setList", []),
  withState("listRef", "setListRef", null),
  withHandlers({
    changeList: ({ setList }) => ordersList => {
      setList(ordersList.slice(0, 20));
      setTimeout(() => {
        setList(ordersList);
      }, 50);
    },
    refSetter: ({ setListRef }) => ref => {
      setListRef(ref);
    }
  }),
  lifecycle({
    componentDidMount() {
      const { orders: { pages }, selectedPage, setList } = this.props;
      const ordersList = pages[selectedPage];
      setList(ordersList);
      setOrderListY(0);
    },
    componentWillReceiveProps({
      orders: { pages: nextPages },
      selectedPage: nextSelectedPage,
      selectedOrder: nextSelectedOrder,
      orderListY: nextOrderListY,
      listRef: nextListRef
    }) {
      const {
        selectedPage,
        changeList,
        listRef,
        selectedOrder,
        setOrderListY
      } = this.props;
      if (selectedPage !== nextSelectedPage) {
        setOrderListY(0);
        listRef.scrollTop = 0;
        changeList(nextPages[nextSelectedPage]);
      } else if (listRef !== null) {
        if (selectedOrder !== nextSelectedOrder) {
          setOrderListY(listRef.scrollTop);
        }
      }
    },
    componentDidUpdate({ listRef: prevListRef }) {
      const { listRef, orderListY } = this.props;
      if (prevListRef !== listRef && listRef.scrollTop === 0) {
        listRef.scrollTop = orderListY;
      }
    }
  }),
  mapProps(({ refSetter, list, orders, listRef }) => ({
    refSetter,
    list,
    orders,
    listRef
  })),
  setPropTypes({
    list: PropTypes.array.isRequired,
    listRef: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.number.isRequired
    ]),
    refSetter: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired
  })
);
