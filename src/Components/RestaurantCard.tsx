import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { CDN_URL } from '../utils/constant';
import { CardItem } from '../Interface';
import StarsIcon from '@mui/icons-material/Stars';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const RestaurantCard: React.FC<{ resData: CardItem }> = ({ resData }) => {
  const { name, avgRating, costForTwo, sla, cloudinaryImageId, cuisines } = resData.info;

  return (
    <Box sx={{ width: 270, borderRadius: 3, border:'none',transition: '0.3s', '&:hover': {  transform: "scale(0.97)",
      transformOrigin: "top bottom", } ,marginRight:0.5,mt:5,ml:4}}>
      <Box>
        <img
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12 }}
        />
      </Box>
      <CardContent sx={{ paddingTop: '1px',mt:0 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold',color:'black',wordSpacing:-2,fontSize:18,mt:0}}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
           <StarsIcon sx={{ color: 'green', fontSize: 16, marginRight: 0.5 }} /><Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            {avgRating}
          </Typography>
          
       
          <FiberManualRecordIcon sx={{ fontSize: 8, marginX: 1, color: 'gray' }} />
          <Typography variant="body2" sx={{ color: 'gray' }}>{sla.slaString}</Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, marginX: 1, color: 'gray' }} />
          <Typography variant="body2" sx={{ color: 'gray' }}>{costForTwo}</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'gray', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {cuisines.join(', ')}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default RestaurantCard;
