import { useEffect, useState } from 'react';
import { Box, Drawer, CssBaseline, AppBar, Toolbar, Typography, Button, Grid, Paper, styled } from '@mui/material';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart, removeSingleItems, emptyCarts } from "./redux/slices/cardSlice";
import { toast } from "react-toastify";
import { CDN_URL } from '../utils/constant';

interface CartItem {
  id: number;
  qnty: number;
  imgdata: string;
  name: string;
  cuisines: string;
  price: number;
}

interface RootState {
  allCart: {
    carts: CartItem[];
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const drawerWidth = 900;

const CartDesc: React.FC<{ resData: { info: { name: string; cuisines: string; cloudinaryImageId: string } } }> = ({ resData }) => {
  const { name, cuisines } = resData.info;
  const { carts } = useSelector((state: RootState) => state.allCart);
  const dispatch = useDispatch();
  const [totalPrice, setPrice] = useState(0);
  const [totalQty, setQuantity] = useState(0);

  useEffect(() => {
    const newTotalPrice = carts.reduce((total, item) => total + item.price * item.qnty, 0);
    const newTotalQty = carts.reduce((total, item) => total + item.qnty, 0);
    setPrice(newTotalPrice);
    setQuantity(newTotalQty);
  }, [carts]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>
            <Box sx={{ height: 300, backgroundColor: 'black', color: 'white', padding: 2 }}>
              <Typography variant="h6">Account</Typography>
              <Typography sx={{ mb: 2 }}>
                To place your order now, log in to your existing account or sign up.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                Log In
              </Button>
              <Button variant="contained" color="secondary">
                Sign Up
              </Button>
            </Box>
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: 100, backgroundColor: 'white', mt: 2 }}
            >
              <Toolbar>
                <img src={`${CDN_URL}436cf521b4dd83bcda1bc6089e5ddd51`} alt="restaurant-logo" style={{ height: 60, width: 70, marginTop: 20 }} />
                <Box sx={{ mt: 2 }}>
                  <Typography variant='body1' sx={{ color: 'black', fontWeight: 'bold' }}>{name}</Typography>
                  <Typography variant='body1' sx={{ color: 'grey' }}>{cuisines}</Typography>
                </Box>
              </Toolbar>
            </AppBar>

            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
              }}
              variant="permanent"
              anchor="left"
            >
              <Toolbar />
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
              <Toolbar />
              {carts.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', marginTop: 1, ml: 30 }}>
                  <RadioButtonCheckedRoundedIcon sx={{ color: 'green' }} />
                  <Typography variant='body1' sx={{ ml: 1 }}>{item.name}</Typography>
                  <Box sx={{ display: 'flex', border: 1, ml: 2, mr: 1, padding: '2px 8px' }}>
                    <Button size="small" onClick={item.qnty <= 1 ? () => dispatch(removeCart(item.id)) : () => dispatch(removeSingleItems(item.id))}>
                      -
                    </Button>
                    <Typography variant='body1' sx={{ color: 'green', fontWeight: 'bold', mx: 1 }}>{item.qnty}</Typography>
                    <Button size="small" onClick={() => dispatch(addToCart(item))}>+</Button>
                  </Box>
                  <Typography variant='body1' sx={{ ml: 2 }}>Rs. {item.price * item.qnty}</Typography>
                </Box>
              ))}

              <Box sx={{ mt: 2, ml: 30 }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold', mt: 2 }}>Bill Details</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant='body2' sx={{ color: 'grey' }}>Item Total</Typography>
                  <Typography variant='body2' sx={{ color: 'grey' }}>Rs. {totalPrice}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='body2' sx={{ color: 'grey' }}>Delivery Fee</Typography>
                  <Typography variant='body2' sx={{ color: 'grey' }}>Rs. 50</Typography>
                </Box>
                <hr />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='body2' sx={{ color: 'black', fontWeight: 'bold' }}>To Pay</Typography>
                  <Typography variant='body2' sx={{ color: 'black', fontWeight: 'bold' }}>Rs. {totalPrice + 50}</Typography>
                </Box>
              </Box>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartDesc;
