import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import imageHero from '/assets/images/hero.png';

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  root: {
    backgroundColor: theme.palette.common.black,
  },
  hero: {
    height: 'auto',
    minHeight: '40vh',
    animationDuration: '2000ms',
    animationName: 'fadeIn',
    '& img': {
      maxHeight: '40vh',
      pointerEvents: 'none',
    },
  },
  tagline: {
    height: 'auto',
    marginTop: theme.spacing(5),
    color: theme.palette.common.black,
    opacity: 0,
    animationFillMode: 'forwards',
    animationDelay: '500ms',
    animationDuration: '2000ms',
    animationName: 'fadeIn',
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid container alignItems="center" justify="center">
        <Grid item className={classes.hero}>
          <img src={imageHero} />
        </Grid>
        <Grid item className={classes.tagline}>
          <Typography variant="h6">
            <Box textAlign="center">
              a website built on serverless components via the serverless framework
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
