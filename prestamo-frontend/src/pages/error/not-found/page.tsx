import * as React from 'react';
// import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react';

// import { config } from '@/config';

// export const metadata = { title: `Not found | Errors | ${config.site.name}` } satisfies Metadata;

export default function NotFound(): React.JSX.Element {
  return (
    <Box component="main" sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100%' }}>
      <Stack spacing={3} sx={{ alignItems: 'center', maxWidth: 'md' }}>
        <Box>
          <Box
            component="img"
            alt="Under development"
            src="./src/assets/error-404.png"
            sx={{ display: 'inline-block', height: 'auto', maxWidth: '100%', width: '400px' }}
          />
        </Box>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          404: La pagina que esta buscando no fue encontrada
        </Typography>
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center' }}>
         O bien probaste una ruta sospechosa o llegaste aquí por error. Sea como sea, intenta usar la navegación.
        </Typography>
        <Button
          href={'/'}
          startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          Go back to home
        </Button>
      </Stack>
    </Box>
  );
}