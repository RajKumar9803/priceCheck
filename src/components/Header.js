import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Avatar, Typography, Box, IconButton, Badge, Menu, CardMedia, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid } from '@mui/material'
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Container } from '@mui/system'
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { qrData } from '../redux/actions/action'



function Header() {
    const storeReduxData = useSelector((state) => state.cartReducer);
    console.log(storeReduxData, "storeReduxData")


    const deviceId = storeReduxData.DeviceId

    const cartsId = storeReduxData.cartId;
    const dispatch = useDispatch()


    const [updateCartData, setUpdateCartData] = useState();


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteApi = (id) => {
        axios.delete(`http://65.0.101.211:8090/deleteproduct/${deviceId}/${cartsId}/${id}`)
            .then((response) => {
                setUpdateCartData(response?.data)
                getTotalPrice(response?.data)
            })


    };

    const [total, setTotal] = useState(0)
    const getTotalPrice = (e) => {
        let price = 0;
        e.products.map((cv) => {
            price = cv.item_quantity * cv.item_price + price
        }

        )
        setTotal(price)




    }
    console.log(total, "pt")

    const saveData = () => {
        axios.get(`http://65.0.101.211:8090/generateQrCode/${deviceId}/${cartsId}`)

            .then((resp) => dispatch(qrData(resp && resp.data)))


    }





    useEffect(() => {
        setUpdateCartData(storeReduxData && storeReduxData)
        getTotalPrice(storeReduxData && storeReduxData)

    }, [storeReduxData])

    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: "white", height: "50px" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Avatar
                            alt="company logo"
                            src="\logo123.png"
                            sx={{
                                width: "25px",
                                height: "24.08px",
                                display: { xs: "none", md: "flex" },
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "Sans-serif",
                                fontWeight: 700,
                                size: "14px",
                                textDecoration: "none",
                            }}
                        >
                            PriceChecker
                        </Typography>
                        <Avatar
                            alt="company logo"
                            src="\logo123.png"
                            sx={{
                                width: "25px",
                                height: "24.08px",
                                display: { xs: "flex", md: "none" },
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "Sans-serif",
                                fontWeight: 700,
                                size: "14px",
                                textDecoration: "none",
                            }}
                        >
                            PriceChecker
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    sx={{
                                        p: 0,
                                        display: { xs: "flex", md: "flex" },
                                        marginLeft: { md: 120 },
                                        mr: 1,
                                    }}

                                >
                                    <Badge
                                        badgeContent={updateCartData && updateCartData?.products.length}
                                        color="primary"
                                        id="basic-button"
                                        aria-controls={open ? "basic-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                    >
                                        <ShoppingCartIcon sx={{ color: "#212121" }} />
                                    </Badge>


                                </IconButton>

                            </Tooltip>


                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >

                                {updateCartData?.products && updateCartData?.products.length ? (
                                    <Box
                                        component={"div"}
                                        sx={{
                                            width: { xl: 800, lg: 800, md: 650, sm: 600, xs: 300 },
                                            paddingBottom: "10px"



                                        }}
                                    >

                                        <Grid lg={12} Container sx={{ display: { lg: "flex", md: "flex", sm: "flex", xs: "flex  " } }} justifyContent={"space-around"} >
                                            <Grid lg={2} item>Item_Code</Grid>
                                            <Grid lg={2} item>Item_Description</Grid>
                                            <Grid lg={2} item >Item_quantity</Grid>
                                            <Grid lg={2} item>Item_Price</Grid>
                                            <Grid lg={2} item>Remove_Item</Grid>

                                        </Grid>
                                        {
                                            updateCartData && updateCartData?.products?.map((cd) => {

                                                return (
                                                    <Grid lg={12} Container sx={{ display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" }, textAlign: "center" }} justifyContent={"space-around"} mt={2} key={cd.id} >
                                                        <Grid lg={2} item>{cd.item_code}</Grid>
                                                        <Grid lg={2} item>{cd.item_desc}</Grid>
                                                        <Grid lg={1} item>{cd.item_quantity}</Grid>
                                                        <Grid lg={2} item>₹: {cd.item_price}</Grid>
                                                        <Grid lg={2} item
                                                            sx={{
                                                                color: "red",
                                                                fontSize: 20,
                                                                cursor: "pointer",

                                                            }}
                                                            onClick={() => deleteApi(cd.id)}

                                                        ><DeleteIcon /></Grid>

                                                    </Grid>






                                                )
                                            })
                                        }


                                        <Grid lg={12} Container sx={{ display: { lg: "flex", md: "flex", sm: "flex", xs: "block" }, marginTop: 5 }} justifyContent={"space-around"}>

                                            <Grid lg={6} item>
                                                <Typography>Total_Amount ₹ :{total}</Typography>
                                            </Grid>
                                            <Grid lg={6} item>
                                                <Link to="/qrCode" onClick={handleClose}>
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        sx={{ float: "right" }}
                                                        onClick={saveData}
                                                    >
                                                        SaveCart
                                                    </Button>
                                                </Link>

                                            </Grid>
                                        </Grid>


                                    </Box>
                                ) : (
                                    <Card sx={{ display: { lg: "flex", sm: "block", xs: "block" } }}>
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            width="400"
                                            image="\noitem.png"
                                            alt="green iguana"
                                            onClick={handleClose}
                                        />
                                    </Card>
                                )}







                            </Menu>

                        </Box>




                    </Toolbar>

                </Container>
            </AppBar >


        </>
    )
}

export default Header