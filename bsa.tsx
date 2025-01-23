// Import dependencies
import React, { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Button, Select, MenuItem, Tooltip, IconButton, Box, Grid, Slider, Modal } from '@mui/material';
import { Language, HelpOutline, ArrowBack, ThreeSixty } from '@mui/icons-material';

const PsoriasisCalculator = () => {
  const [language, setLanguage] = useState('sv');
  const [bodyPart, setBodyPart] = useState('');
  const [redness, setRedness] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [scaling, setScaling] = useState(0);
  const [results, setResults] = useState({ head: {}, arms: {}, torso: {}, legs: {} });
  const [helpOpen, setHelpOpen] = useState(false);

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const calculateScores = () => {
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

    const affectedAreaPercentage = (redness + thickness + scaling) * 0.5;
    const bodyPartWeight = bodyPartWeights[bodyPart] || 0;
    const affectedHandPrints = Math.min(
      affectedAreaPercentage / 0.5,
      bodyPartMaxHandPrints[bodyPart] || 0
    );
    const bodySurfaceArea = affectedHandPrints * 0.5;

    const pasiScore = bodySurfaceArea * bodyPartWeight * (redness + thickness + scaling);
    const zPasiScore = bodySurfaceArea * bodyPartWeight * (redness + thickness + scaling);

    setResults((prevResults) => ({
      ...prevResults,
      [bodyPart]: {
        bsa: bodySurfaceArea.toFixed(2),
        pasi: pasiScore.toFixed(2),
        zPasi: zPasiScore.toFixed(2),
      },
    }));

    alert(`BSA: ${bodySurfaceArea.toFixed(2)}, PASI: ${pasiScore.toFixed(2)}, zPASI: ${zPasiScore.toFixed(2)}`);
  };

  const toggleHelp = () => {
    setHelpOpen(!helpOpen);
  };

  const handleBodyPartClick = (part) => {
    setBodyPart(part);
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
        <Tooltip title="Hjälp">
          <IconButton onClick={toggleHelp}>
            <HelpOutline />
          </IconButton>
        </Tooltip>
        <Modal
          open={helpOpen}
          onClose={toggleHelp}
          aria-labelledby="help-modal-title"
          aria-describedby="help-modal-description"
        >
          <Box style={{ backgroundColor: 'white', padding: '20px', margin: '10% auto', maxWidth: '500px' }}>
            <Typography id="help-modal-title" variant="h6">
              Hjälp
            </Typography>
            <Typography id="help-modal-description" variant="body1">
              Här kan du välja en kroppsdel, justera rodnad, tjocklek och fjällning för att beräkna BSA, PASI och zPASI. Klicka på 360-ikonen för att visa kroppen från olika vinklar.
            </Typography>
            <Button onClick={toggleHelp} style={{ marginTop: '10px' }} variant="contained" color="primary">
              Stäng
            </Button>
          </Box>
        </Modal>
        <Box style={{ display: 'flex', marginTop: '20px' }}>
          <Box style={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="h6">Kroppsväljare</Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 400"
              width="200px"
              height="400px"
              style={{ margin: '0 auto', cursor: 'pointer' }}
            >
              <circle
                cx="100"
                cy="40"
                r="30"
                fill={bodyPart === 'head' ? 'blue' : 'lightgray'}
                onClick={() => handleBodyPartClick('head')}
              />
              <rect
                x="45"
                y="80"
                width="20"
                height="100"
                fill={bodyPart === 'arms' ? 'blue' : 'lightgray'}
                onClick={() => handleBodyPartClick('arms')}
              />
              <rect
                x="135"
                y="80"
                width="20"
                height="100"
                fill={bodyPart === 'arms' ? 'blue' : 'lightgray'}
                onClick={() => handleBodyPartClick('arms')}
              />
              <rect
                x="75"
                y="80"
                width="50"
                height="120"
                fill={bodyPart === 'torso' ? 'blue' : 'lightgray'}
                onClick={() => handleBodyPartClick('torso')}
              />
              <rect
                x="75"
                y="210"
                width="20"
                height="100"
                fill={bodyPart === 'legs' ? 'blue' : 'lightgray'}
                onClick={() => handleBodyPartClick('legs')}
              />
              <rect
                x="105"
                y="210"
                width="20"
                height="100"
                fill={bodyPart === 'legs' ? 'blue' : 'lightgray'}
                onClick={() => handleBodyPartClick('legs')}
              />
            </svg>
          </Box>
          <Box style={{ flex: 2, marginLeft: '20px' }}>
            <Grid container spacing={3}>
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
          </Box>
        </Box>
        <Box style={{ marginTop: '20px' }}>
          <Typography variant="h6">Resultat:</Typography>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Typography variant="body1" style={{ fontWeight: 'bold', flex: 1 }}>Värde</Typography>
              <Typography variant="body1" style={{ flex: 1 }}>Huvud</Typography>
              <Typography variant="body1" style={{ flex: 1 }}>Armar</Typography>
              <Typography variant="body1" style={{ flex: 1 }}>Bål</Typography>
              <Typography variant="body1" style={{ flex: 1 }}>Ben</Typography>
            </Box>
            {['bsa', 'pasi', 'zPasi'].map((key) => (
              <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }} key={key}>
                <Typography variant="body1" style={{ fontWeight: 'bold', flex: 1 }}>{key.toUpperCase()}</Typography>
                <Typography variant="body1" style={{ flex: 1 }}>{results.head[key] || '0'}%</Typography>
                <Typography variant="body1" style={{ flex: 1 }}>{results.arms[key] || '0'}%</Typography>
                <Typography variant="body1" style={{ flex: 1 }}>{results.torso[key] || '0'}%</Typography>
                <Typography variant="body1" style={{ flex: 1 }}>{results.legs[key] || '0'}%</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PsoriasisCalculator;
