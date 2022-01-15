import React from "react";

import axios from "axios";

import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.defibit.io'));

const useGetContract = () => {
    const [contract, setContract] = React.useState<any>();
    const [error, setError] = React.useState<any>();

    const getContract = React.useCallback(async(token) => {
        if(token) {
            try {
                const {data} = await axios.get(`https://api.bscscan.com/api?module=contract&action=getabi&address=${token}&apikey=4T3F6MQAQXFKW8D14RFHI2I5V394DQXAGH`);
                
                const abi = JSON.parse(data.result);
                const temp = new web3.eth.Contract(abi, token);
    
                setContract(temp);
                setError(null);
            } catch (err) {
                setContract(null);
                setError(err);
                console.log('contract: ', err);
            }
        }
    }, []);

    return {
        contract,
        error,
        getContract
    }
};

export default useGetContract;