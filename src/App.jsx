import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { obs } from "host_app/store";

function App({ count = 0 }) {
  const handleIncrement = () => {
    obs?.counter.increaseCounter();
  };

  const handleDecrement = () => {
    obs?.counter.decreaseCounter();
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 140,
              backgroundColor: "secondary.light",
            }}
          >
            <Typography
              component="h3"
              variant="h3"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, p: 2 }}
            >
              {count}
            </Typography>
            <Box justifyContent={"space-between"}>
              <Button
                variant="contained"
                sx={{ mx: 3 }}
                onClick={handleDecrement}
              >
                -
              </Button>
              Test
              <Button
                variant="contained"
                sx={{ mx: 3 }}
                onClick={handleIncrement}
              >
                +
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              minHeight: 140,
            }}
          >
            <Typography component="h4" variant="h6">
              Github:
            </Typography>
            <a
              href={"https://github.com/RashCD/react-micro-app-b"}
              target="_blank"
            >
              {"https://github.com/RashCD/react-micro-app-b"}
            </a>
            <Typography component="h4" variant="h6">
              Website Link:
            </Typography>
            <a href={"https://react-micro-app-b.vercel.app/"} target="_blank">
              {"https://react-micro-app-b.vercel.app/"}
            </a>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
