import * as actionTypes from '../actions/actionTypes'

const cartReducer = (state=[], action) =>{
    console.log("reducer action",action.payload)
    console.log("reducer stae",state)
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return [...state, action.payload]
        case actionTypes.REMOVE_FROM_CART:
            return state.filter(item=> item.ProductID !== action.payload.item.ProductID)
        default:
            return state;
        
    }
}

export default cartReducer