/*eslint-disable*/
export const Config = {
    host: "",
    Get_token_list_new: "",
    Get_last_50_transactions: "",
}

Config.host = "http://168.119.111.227:3007"
// Config.host = " http://localhost:3007"

Config.Get_token_list_new = Config.host + "/api/v1/get_token_prices"
Config.Get_last_50_transactions = Config.host + "/api/v1/get_last_50_transactions"
