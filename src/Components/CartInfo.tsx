import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { CDN_URL } from '../utils/constant'

const CartInfo = () => {
  // const {cloudinaryImageId}=resData?.info
  return (
    <Box sx={{border:2,backgroundColor:'lightgrey',width:300,justifyContent:'center',marginLeft:55,marginTop:10,height:400}}>
      <Box sx={{display:'flex'}}>
      <img src={CDN_URL + "436cf521b4dd83bcda1bc6089e5ddd51"} style={{height:40,width:50}}></img>
      <Typography>Coffe name</Typography>
      
      <Typography>address</Typography>
      </Box>

      <Box sx={{display:'flex',marginTop:5}}>
        <Typography>Item Name</Typography>
        <Button>-</Button>
        <Typography>1</Typography>
        <Button>+</Button>
      
      </Box>
      <Box>
        <Typography>Bill Details</Typography>
    <Box sx={{display:'flex', gap:13,marginTop:5}}>
        <Typography>Item Total</Typography>
        <Typography>price</Typography>
        </Box>
        <Box sx={{display:'flex',gap:10}}>
        <Typography>Delivery Fee</Typography>
        <Typography>price</Typography>
        </Box>
        <Box sx={{display:'flex',gap:15,marginTop:5}}>
        <Typography>ToPay</Typography>
        <Typography>Total Price</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default CartInfo