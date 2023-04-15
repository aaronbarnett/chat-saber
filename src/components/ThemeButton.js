
// import { useState } from 'react';

import { useAtom } from "jotai";

import { Switch } from '@mui/material';

import useProfile from "../hooks/useProfile";


import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


function ThemeButton() {
  const profile = useProfile();
  const [themeName, setThemeName] = useAtom(profile.themeAtom);

    
    if(themeName === 'dark'){
        return <DarkModeIcon onClick={() => setThemeName('light')} />
    }else{
        return <LightModeIcon onClick={() => setThemeName('dark')} />
    }
	// 	<Switch
    //   checked={theme}
    //   color='success'
    //   onChange={setTheme} />

}

export default ThemeButton;
