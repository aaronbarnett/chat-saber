import { useEffect, useState } from "react";

import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import chatgpt from '../services/chatgpt.js';



const apiKeyAtom = atomWithStorage('api_key', null);

const modelsAtom = atom({data:[], dirty: 1});


function useProfile() {
    const [apiKey, setApiKey] = useAtom(apiKeyAtom);
    const [models, setModels] = useAtom(modelsAtom);

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
    };
}

export default useProfile;

