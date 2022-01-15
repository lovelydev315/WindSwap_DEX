import React from "react";

import axios from "axios";

const useGetTokenInfo = () => {
    const [tokenInfo, setTokenInfo] = React.useState<any>();
    const [error, setError] = React.useState<any>();

    const getTokenInfo = React.useCallback(async (token) => {
        if (!token) return;

        try {
            const {data} = await axios.get(`https://api.dex.guru/v1/tokens/${token}-bsc`);
            const {name, symbol, decimals} = data;

            setTokenInfo({name, symbol, decimals});
            setError(null);
        } catch (err) {
            setError(err);
            setTokenInfo(null);
        }
    }, []);

    return  {
        tokenInfo,
        error,
        getTokenInfo
    }
}

export default useGetTokenInfo;