import {createStore , combineReducers, applyMiddleware, compose} from 'redux';
import {productListReducers} from './reducers/productListReducers';
import {productDetailsReducers} from './reducers/productListReducers';
import thunk from 'redux-thunk';
import { cartReducers } from './reducers/cartReducers';
import Cookie from 'js-cookie';
import {userSignInReducers, userRegisterReducers} from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {cart:{cartItems}, 
                     userSignIn: { userInfo }};

const reducers = combineReducers({
    productList : productListReducers, 
    productDetails : productDetailsReducers,
    cart : cartReducers,
    userSignIn : userSignInReducers ,
    userRegister :  userRegisterReducers,
});

const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;