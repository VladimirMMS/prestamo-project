import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Box, Skeleton } from '@mui/material';
import DashboardStats from '../../components/DashBoardStats/DashBoardStats';


export default function Dashboard() {
  return (
    // <div>
    //     <PageContainer>
    //       <h3>Overview:</h3>
    //       <Grid container spacing={1}>
    //         <Grid size={5} />
    //         <Grid size={12}>
    //           <Skeleton height={14} />
    //         </Grid>
    //         <Grid size={12}>
    //           <Skeleton height={14} />
    //         </Grid>
    //         <Grid size={4}>
    //           <Skeleton height={100} />
    //         </Grid>
    //         <Grid size={8}>
    //           <Skeleton height={100} />
    //         </Grid>

    //         <Grid size={12}>
    //           <Skeleton height={150} />
    //         </Grid>
    //         <Grid size={12}>
    //           <Skeleton height={14} />
    //         </Grid>

    //         <Grid size={3}>
    //           <Skeleton height={100} />
    //         </Grid>
    //         <Grid size={3}>
    //           <Skeleton height={100} />
    //         </Grid>
    //         <Grid size={3}>
    //           <Skeleton height={100} />
    //         </Grid>
    //         <Grid size={3}>
    //           <Skeleton height={100} />
    //         </Grid>
    //       </Grid>
    //     </PageContainer>
    //   </div>
    <Box>
      <DashboardStats />
      {/* Otros componentes del dashboard */}
    </Box>

  )
}
