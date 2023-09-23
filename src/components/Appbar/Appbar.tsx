import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Logo from '../../assets/logo.png'
import { IconButton } from '@mui/material'

function Appbar() {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <IconButton sx={{ ml: 8 }}>
              <Avatar
                alt='Logo'
                src={Logo}
                sx={{
                  width: 50,
                  height: 50,
                }}
              />
            </IconButton>
          </Typography>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <IconButton sx={{ ml: 8 }}>
              <Avatar
                alt='Logo'
                src={Logo}
                sx={{
                  width: 50,
                  height: 50,
                }}
              />
            </IconButton>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Appbar
