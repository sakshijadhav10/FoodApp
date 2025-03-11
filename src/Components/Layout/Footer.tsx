import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <>
    <Box sx={{display:'flex',marginRight:20}}>
        <Typography variant='h6' sx={{marginLeft:20,marginRight:5}}><b>For better experience,download the Swiggy app now</b></Typography>
        <Button><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png" alt="" style={{height:60,width:200,display:'flex'}} /></Button>
        <Button><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png" alt="" style={{height:60,width:200,display:'flex'}}  /></Button>
       
    </Box>
     <Box sx={{marginLeft:25}}>
     <IconButton >
       <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png" alt="" style={{height:50,width:50,borderRadius:10}} />
       <Typography variant='h4' sx={{color:'darkorange'}}><b>Swiggy</b></Typography>
       

       {/* <Typography variant='h6'>© 2025 Swiggy Limited</Typography> */}
    </IconButton>
    <Typography variant='h6'>© 2025 Swiggy Limited</Typography>
   
     </Box>
     {/* <Box>
    
     </Box> */}
     </>
  )
}
