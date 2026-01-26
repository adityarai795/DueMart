import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cartReducers";
const dispatch = useDispatch();

dispatch(
  addToCart({
    id: 101,
    name: "iPhone 15",
    price: 120000,
  }),
);
