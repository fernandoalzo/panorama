// este metodo me crea el endpoint para la consilta de la informacion de varios tokens
export let endpoint_tokens_info = (tokens, api_key) => {
    let tokens_as_string = tokens.toString()
    let endpoint_tokens_info = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tokens_as_string}&tsyms=USD&api_key=${api_key}`
    return endpoint_tokens_info
}
// este metodo me crea el endpoint para la consilta de la informacion de un solo token
export let endpoint_token_info = (config_app, token_symbol) => {
    // let tokens_as_string = config_app["tokens"].toString()
    let api_key = config_app["api_key"]
    let endpoint = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${token_symbol}&tsyms=USD&api_key=${api_key}`
    return endpoint
}
// este metodo me crea el endpoint para la consulta del historico el precio
export let endpoint_historical_data = (api_key, token, numero_dias) => {
    let endpoint_historical_data = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${token}&tsym=USD&limit=${numero_dias}&api_key=${api_key}`
    return endpoint_historical_data
}
// metodo para la consulta dela informacion de los tokens usando la API
export let token_data_from_api = async (endpoint_info_tokens) => {
    try {
        let response_from_api = await fetch(endpoint_info_tokens)
        if (response_from_api.status == 200) {
            let data = response_from_api.json()
            return data
        } else {
            console.log("Ocurrio un error consultando la API")
            console.log("Codigo de respuesta:" + response_from_api.status)
        }
    } catch (error) {
        console.log("Error consultando la API")
        console.log(error)
    }
}
// metodo para la consulta de la informacion del historico del precio de un token
export let historical_data = async (endpoint_historical_data) => {
    try {
        let response_from_api = await fetch(endpoint_historical_data)
        if (response_from_api.status == 200) {
            let data = await response_from_api.json()
            let respuesta = data["Response"]
            if (respuesta == "Success") {
                let precios = []
                let highs = []
                let lows = []
                let fechas = []
                let vol_in_cripto = []
                let vol_in_fiat = []
                let datos = data["Data"]["Data"]
                for (let i = 0; i < datos.length; i++) {
                    precios.push(datos[i]["close"])
                    highs.push(datos[i]["high"])
                    lows.push(datos[i]["lows"])
                    let timestamp = datos[i]["time"]
                    let fecha = convert_timestamp_to_date(timestamp)
                    fechas.push(fecha)
                    vol_in_cripto.push(datos[i]["volumefrom"])
                    vol_in_fiat.push(datos[i]["volumeto"])                    
                }
                return data = {
                    "precios": precios,
                    "highs" : highs,
                    "lows" : lows,
                    "fechas": fechas,
                    "vol_in_cripto" : vol_in_cripto,
                    "vol_in_fiat" : vol_in_fiat
                }
            }
        }
    } catch (error) {
        console.log("Ocurrio un error consultando la API")
        console.log(error)
    }
}
// metodo para convertir el formato Timestamp hacia un formato legible
function convert_timestamp_to_date(timestamp) {
    try {
        let milisegundos = timestamp * 1000
        let date_objetc = new Date(milisegundos)
        let formato_fecha = date_objetc.toLocaleString()
        // remove time from format original
        formato_fecha = formato_fecha.split(' ')[0]
        return formato_fecha
    } catch (error) {
        console.log("Ocurrio un error convirtiendo ")
    }
}
