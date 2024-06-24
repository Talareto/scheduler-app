import React from "react";
import SchedulerComponent from "./Scheduler";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SchedulerComponent />
  </ThemeProvider>
);
export default App;
