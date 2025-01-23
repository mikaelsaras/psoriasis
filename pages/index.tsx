// Import dependencies
import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Button, IconButton, Select, MenuItem, Tooltip } from '@mui/material';
import { Language } from '@mui/icons-material';
import Link from 'next/link';

const App = () => {
  const [language, setLanguage] = React.useState('sv');

  const handleChangeLanguage = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <Head >
        <title>Psoriasis Mini-Räknare</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Psoriasis Mini-Räknare
          </Typography>
          <Select
            value={language}
            onChange={handleChangeLanguage}
            style={{ color: 'white' }}
          >
            <MenuItem value="sv">Svenska</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="nl">Nederlands</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
          Välkommen till Psoriasis Mini-Räknare
        </Typography>
        <Typography variant="body1" gutterBottom>
          Välj en av följande alternativ:
        </Typography>
        <div style={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" style={{ margin: '10px' }}>
            <Link href="/calculator/bsa" passHref>
              BSA, PASI, zPASI Skattning
            </Link>
          </Button>
          <Button variant="contained" color="secondary" style={{ margin: '10px' }}>
            <Link href="/info" passHref>
              Information om appen
            </Link>
          </Button>
          <Button variant="outlined" color="inherit" style={{ margin: '10px' }}>
            <Link href="/disclaimer" passHref>
              Ansvarsfriskrivning
            </Link>
          </Button>
        </div>
      </Container>
    </>
  );
};

export default App;