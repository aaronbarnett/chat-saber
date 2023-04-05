import { useEffect, useState } from "react";

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'


const apiKeyAtom = atomWithStorage('api_key', null);


function useApiKey() {
    const [apiKey, setApiKey] = useAtom(apiKeyAtom);

    useEffect(() => {
        console.log("useApiKey apiKey changed:", apiKey);
    }, [apiKey]);

    return [apiKey, setApiKey];
}

export default useApiKey;



