
import { useState } from 'react';

// import { useAtom } from "jotai";

import { ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'

import useProfile from "./hooks/useProfile";
import Home from "./components/Home";



function App() {
  const profile = useProfile();
  // const [themeName, setThemeName] = useAtom(profile.themeAtom);

	return (
		<div className="App">
			<ThemeProvider theme={profile.theme}>
				<CssBaseline />
        <Home />
			</ThemeProvider>

		</div>
	);
}

export default App;

// import ThemeButton from "./components/ThemeButton";