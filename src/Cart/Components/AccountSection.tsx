import { Box, Button, Typography } from "@mui/material";

const AccountSection = () => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        Account
      </Typography>
      <Typography variant="body2" color="textSecondary">
        To place your order now, log in to your existing account or sign up.
      </Typography>
      <Box mt={2}>
        <Button variant="outlined" color="success" sx={{ mr: 2 }}>
          Sign In
        </Button>

        <Button variant="contained" color="success">
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default AccountSection;
