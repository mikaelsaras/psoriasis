// Import dependencies
import React, { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Button, Select, MenuItem, Tooltip, IconButton, Box, Grid, Slider } from '@mui/material';
import { Language } from '@mui/icons-material';

type BodyPart = 'head' | 'arms' | 'torso' | 'legs';

const PsoriasisCalculator = () => {
  const [language, setLanguage] = useState('sv');
  const [bodyPart, setBodyPart] = useState<BodyPart | ''>('');
  const [redness, setRedness] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [scaling, setScaling] = useState(0);
  const [bsa, setBsa] = useState(0);
  const [pasi, setPasi] = useState(0);
  const [zPasi, setZPasi] = useState(0);

  const handleChangeLanguage = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setLanguage(event.target.value);
  };

  const calculateScores = () => {
    // Define constants for each body part's weight and surface area percentages
    const bodyPartWeights = {
      head: 0.1,
      arms: 0.2,
      torso: 0.3,
      legs: 0.4,
    };

    const bodyPartMaxHandPrints = {
      head: 20,
      arms: 40,
      torso: 60,
      legs: 80,
    };

    // Calculate BSA based on selected body part and affected area
    const affectedAreaPercentage = (redness + thickness + scaling) * 0.5; // Placeholder for hand area calculations
    const bodyPartWeight = bodyPart  ? bodyPartWeights[bodyPart] : 0;
    const affectedHandPrints = Math.min(
      affectedAreaPercentage / 0.5,
      bodyPart  ? bodyPartMaxHandPrints[bodyPart] : 0
    );
    const bodySurfaceArea = affectedHandPrints * 0.5; // Each handprint is 0.5% of the total body area

    // Calculate PASI using formula
    const pasiScore = bodySurfaceArea * bodyPartWeight * (redness + thickness + scaling);

    // Calculate zPASI using the modified formula
    const zPasiScore = bodySurfaceArea * bodyPartWeight * (redness + thickness + scaling);

    setBsa(parseFloat(bodySurfaceArea.toFixed(2)));
    setPasi(parseFloat(pasiScore.toFixed(2)));
    setZPasi(parseFloat(zPasiScore.toFixed(2)));
    // alert(`BSA: ${bodySurfaceArea.toFixed(2)}, PASI: ${pasiScore.toFixed(2)}, zPASI: ${zPasiScore.toFixed(2)}`);
  };

  return (
    <>
      <Head>
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
          Psoriasisskattning
        </Typography>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Typography variant="body1">Välj kroppsdel:</Typography>
            <Select
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value)}
              fullWidth
            >
              <MenuItem value="head">Huvud</MenuItem>
              <MenuItem value="arms">Armar</MenuItem>
              <MenuItem value="torso">Bål</MenuItem>
              <MenuItem value="legs">Ben</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Rodnad:</Typography>
            <Slider
              value={redness}
              onChange={(e, val) => setRedness(val)}
              step={1}
              marks
              min={0}
              max={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Tjocklek:</Typography>
            <Slider
              value={thickness}
              onChange={(e, val) => setThickness(val)}
              step={1}
              marks
              min={0}
              max={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Fjällning:</Typography>
            <Slider
              value={scaling}
              onChange={(e, val) => setScaling(val)}
              step={1}
              marks
              min={0}
              max={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateScores}
            >
              Beräkna
            </Button>
          </Grid>
        </Grid>
        <Box style={{ marginTop: '20px' }}>
          <Typography variant="h6">Resultat:</Typography>
          <Typography variant="body1">BSA: {bsa}%</Typography>
          <Typography variant="body1">PASI: {pasi}</Typography>
          <Typography variant="body1">zPASI: {zPasi}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default PsoriasisCalculator;
