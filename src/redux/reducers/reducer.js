const initialState = {
    cartId: '',
    products: [],
    DeviceId: 99348702,
    dataQCode: ""
}
export const cartReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {

        case "ADD_CART":
            return {
                ...state,
                cartId: action.payload.cart_id,
                products: action.payload.products
            }

        case "QR_Data":
            console.log(action.payload, "pay")
            return {
                ...state,
                dataQCode: action.payload
            }

        default:
            return state
    }
}