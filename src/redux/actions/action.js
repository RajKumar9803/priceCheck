export const Add = (item) => {

    return {
        type: "ADD_CART",
        payload: item
    }
}
export const qrData = (data) => {



    return {
        type: "QR_Data",
        payload: data
    }
}


