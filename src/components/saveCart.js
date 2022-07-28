
import { useSelector } from 'react-redux';
import QRCode from "qrcode.react";
import { Box } from '@mui/system';




function SavedData() {
    const getData = useSelector((cd) => cd.cartReducer)



    return (
        <>

            <Box sx={{ mt: { xl: 20, lg: 20, md: 20, sm: 20, xs: 20 }, ml: { xl: 60, lg: 60, md: 30, sm: 30, xs: 15 } }}>
                <QRCode
                    value={getData.dataQCode && getData.dataQCode} />

            </Box>


        </>
    )
}

export default SavedData





