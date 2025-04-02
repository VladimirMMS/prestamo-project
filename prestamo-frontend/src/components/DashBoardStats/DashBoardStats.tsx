import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Assignment as TicketsIcon,
  CheckCircle as ClosedIcon,
  Email as RepliesIcon,
  People as FollowersIcon,
  AttachMoney as EarningsIcon,
  Inventory as ProductsIcon
} from '@mui/icons-material';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const DashboardStats = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const stats: StatItem[] = [
    { icon: <TicketsIcon fontSize="large" />, value: '43', label: 'New Tickets', color: 'primary' },
    { icon: <ClosedIcon fontSize="large" />, value: '17', label: 'Closed Today', color: 'success' },
    { icon: <RepliesIcon fontSize="large" />, value: '7', label: 'New Replies', color: 'info' },
    { icon: <FollowersIcon fontSize="large" />, value: '27.3k', label: 'Followers', color: 'warning' },
    { icon: <EarningsIcon fontSize="large" />, value: '$95', label: 'Daily Earnings', color: 'secondary' },
    { icon: <ProductsIcon fontSize="large" />, value: '621', label: 'Products', color: 'error' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: isSmallScreen ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: isSmallScreen ? 'space-between' : 'center',
                textAlign: 'center',
                borderLeft: `4px solid ${theme.palette[stat.color]?.main}`,
                '&:hover': {
                  transform: 'scale(1.03)',
                  transition: 'transform 0.3s ease',
                }
              }}
            >
              <Box sx={{
                color: `${stat.color}.main`,
                mb: isSmallScreen ? 0 : 2,
                mr: isSmallScreen ? 2 : 0
              }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h5" component="div" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardStats;