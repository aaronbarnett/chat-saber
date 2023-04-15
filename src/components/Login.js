import React, { useRef  } from "react";

import useProfile from "../hooks/useProfile";
import ThemeButton from "../components/ThemeButton";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


const Home = () => {
  const profile = useProfile();
  
  const apikeyElement = useRef();

  const handleLogin = () => {
    console.log('Login.handleLogin api-key:', apikeyElement.current.value );
    profile.setApiKey(apikeyElement.current.value);
  }

  const handleLogout = () => {
    console.log('Login.handleLogout');
    profile.setApiKey(undefined);
  }

  const LoginForm = () =>
    <>
      <div className="login">
        <TextField 
          inputRef={apikeyElement} 
          variant="filled" 
          label="ChatGPT API Key" 
          placeholder="ChatGPT API Key"
          size="small"          
        />
        <Button 
          onClick={handleLogin}
          variant="contained" 
          size="small"
        >Connect</Button>
      </div>
    </>;

  const LogoutButton = () =>
    <>
      <div className="login">
        <span>{profile.apiKey.substr(0, 3)}...{profile.apiKey.substr(-4, 4)}</span>
        <PowerSettingsNewIcon 
          onClick={handleLogout}
        />
        {/* <ThemeButton/> */}
      </div>      
    </>;
      
  return profile.apiKey ? <LogoutButton/> : <LoginForm/>;

};

export default Home;
