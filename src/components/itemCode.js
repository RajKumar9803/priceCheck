import React, { useEffect, useState } from 'react'
import { Card, CardMedia, CardContent, Typography, Grid, TextField, Button } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { Add } from '../redux/actions/action'
import { useSelector } from 'react-redux'

function Items() {
    //device id
    const storeDeviceId = useSelector((cv) => cv.cartReducer)


    const [inputData, setInputData] = useState("");
    const [cartId, setCartId] = useState("")
    const [getData, setGetData] = useState([])
    const dispatch = useDispatch()


    const host = "http://52.66.79.128:8090";
    //getCartId
    const getCartApi = () => {
        axios.get(`${host}/getcart/${storeDeviceId.DeviceId}`)
            .then((e) => {
                setCartId(e.data.cart_id)
            })
    }
    //getbtitemCode
    const sendGetRequest = (itemCode) => {
        axios.get(`${host}/itemCode/${itemCode}`)
            .then((cv) => {

                axios.post(`${host}/addproduct/${storeDeviceId.DeviceId}/${cartId}`, {
                    item_code: cv.data.item_code,
                    item_quantity: 1,
                    item_price: cv.data.promotional_price,
                    item_desc: cv.data.item_desc,
                    item_image: cv.data.item_image

                }).then((resp) => {
                    dispatch(Add(resp.data))

                })

                setGetData(cv.data)
            }



            )
    }



    const changeHandler = (e) => {
        const store = e.target.value;
        setInputData(store)
    };
    const handleClick = (e) => {
        e.preventDefault()
        sendGetRequest(inputData)

    }

    useEffect(() => {
        getCartApi()
    }, [])


    return (
        <>
            <Card sx={{ maxWidth: 1300, mt: 7 }}>
                <CardMedia
                    component="img"
                    sx={{ height: { lg: 360, md: 300, sm: 250, xs: 250 } }}

                    image="\WhatsApp Image 2022-07-02 at 10.17.56 PM.jpeg"
                    alt="green iguana"
                />
                <CardContent >
                    <Grid lg={12} Container sx={{ display: { xl: "flex", lg: "flex", md: "flex", sm: "flex", xs: "block", justifyContent: "space-between" }, alignItems: "center" }}>
                        <Grid lg={4} Items>
                            <Typography style={{ border: "1px solid black", textAlign: "center", color: "#bdbdbd", padding: 4 }} variant='h5'>Scan or type Here</Typography>
                        </Grid>
                        <Grid lg={4} Items>
                            <TextField
                                label="Enter itemCode "
                                id="filled-start-adornment"
                                fullWidth
                                onChange={changeHandler}
                                value={inputData}
                                variant="filled"

                            />
                        </Grid>
                        <Grid lg={4} Items>
                            <Button fullWidth variant='outlined' sx={{ background: "#009688", color: "white", borderRadius: "5px" }} onClick={handleClick} >getItemCode</Button>
                        </Grid>
                    </Grid>

                </CardContent>
                <CardContent >
                    <Grid lg={12} Container sx={{ display: { xl: "flex", lg: "flex", md: "flex", sm: "flex", xs: "block", justifyContent: "space-between" }, alignItems: "center" }}>
                        <Grid Items lg={10} sx={{ width: { xl: "60%", lg: "60%", md: "60%", sm: "60%" }, background: "#ff8a80" }}>
                            <Typography variant="h5" textAlign={"center"}>{getData.item_desc}</Typography>

                        </Grid>
                        <Grid Items lg={10} sx={{ border: "1px solid black", width: { xl: "40%", lg: "40%", md: "40%", sm: "40%" }, background: "#ffc107" }}>
                            <Typography variant="h5" textAlign={"center"}>Promotional_Price: {getData.promotional_price}</Typography>

                        </Grid>

                    </Grid>
                </CardContent>

            </Card>

        </>

    )
}

export default Items