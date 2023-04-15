import { useEffect, useState } from "react";

import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { createTheme } from '@mui/material/styles'

import chatgpt from '../services/chatgpt.js';



const apiKeyAtom = atomWithStorage('api_key', null);
const modelsAtom = atom({data:[], dirty: 1});
const themeAtom = atomWithStorage('theme', 'light');


function useProfile() {
    const [apiKey, setApiKey] = useAtom(apiKeyAtom);
    const [models, setModels] = useAtom(modelsAtom);
    const [themeName, setThemeName] = useAtom(themeAtom);

    const theme = createTheme({
		palette: {
			mode: themeName === 'dark' ? 'dark' : 'light',
		},
	});
    window.themeName = themeName;
    window.theme = theme;

    useEffect(() => {
        if (apiKey && models.dirty) {
            (async () => {
                const models = await chatgpt.models(apiKey);
                if(!models.error){
                    setModels(models);
                }else{
                    console.log('useProfile.models.error:', models.error);
                }
            })();
        }
    }, [apiKey, setModels]);

    return {
        apiKey: apiKey, 
        setApiKey: setApiKey,

        models: models,

        themeAtom: themeAtom,
        theme,
    };
}

export default useProfile;

