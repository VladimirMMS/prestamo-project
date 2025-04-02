import { Box, Typography } from "@mui/material";

export const NoRowsOverlay = ({ message }: { message: string }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    marginTop={6}
  >

    <Typography variant="body1" color="text.secondary" textAlign="center" >
      {message}
    </Typography>
  </Box>
);
