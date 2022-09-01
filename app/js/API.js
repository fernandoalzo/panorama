//----------endpoints----------//
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
//metodo para crear el enpoint para consultar el historico de la popularidad de redes sociales.
export let endpoint_historical_social_data = (api_key, coin_id, num_dias) => {
    let endpoint_historical_social_data = `https://min-api.cryptocompare.com/data/social/coin/histo/day?coinId=${coin_id}&aggregate=2&limit=${num_dias}&api_key=${api_key}`
    return endpoint_historical_social_data
}
// method to get sentiment info
export let endpoint_sentiment_info = (api_key, token_symbol)=>{
    let endpoint_sentiment_info = `https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=${token_symbol}&api_key=${api_key}`
    return endpoint_sentiment_info
}
//metodo para crear el endpoint para trer la informacion 
//----------endpoints----------//

//----------get data from API----------//
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
                    "highs": highs,
                    "lows": lows,
                    "fechas": fechas,
                    "vol_in_cripto": vol_in_cripto,
                    "vol_in_fiat": vol_in_fiat
                }
            }
        }
    } catch (error) {
        console.log("Ocurrio un error consultando la API")
        console.log(error)
    }
}
// metodo para consultar el historco de la informacion socual de un asset
export let historical_soacial_data = async (endpoint_historical_social_data) => {
    try {
        let response_from_api = await fetch(endpoint_historical_social_data)
        if (response_from_api.status == 200) {
            let response_json = await response_from_api.json()
            let respuesta = response_json["Response"]
            if (respuesta == "Success") {
                let data_from_api = await response_json["Data"]
                let puntos = []
                let fechas = []
                for (let i = 0; i < data_from_api.length; i++) {
                    puntos.push(data_from_api[i].points)
                    let timestamp = data_from_api[i].time
                    let fecha = convert_timestamp_to_date(timestamp)
                    fechas.push(fecha)
                }
                let data = {
                    "fechas": fechas,
                    "puntos": puntos
                }
                return data
            }
        }
    } catch (err) {
        console.log(err)
    }
}
export let sentiment_info = async (endpoint_sentiment_info)=>{
    try{
        let response_from_api = await fetch(endpoint_sentiment_info)
        if (response_from_api.status == 200){
            let data = await response_from_api.json()
            data = {
                "addressesNetGrowth" : {
                    "sentiment" : data.Data.addressesNetGrowth.sentiment,
                    "score" : data.Data.addressesNetGrowth.score,
                    "score_threshold_bearish" : data.Data.addressesNetGrowth.score_threshold_bearish,
                    "score_threshold_bullish" : data.Data.addressesNetGrowth.score_threshold_bullish
                },
                "concentrationVar" : {
                    "sentiment" : data.Data.addressesNetGrowth.sentiment,
                    "score" : data.Data.addressesNetGrowth.score,
                    "score_threshold_bearish" : data.Data.addressesNetGrowth.score_threshold_bearish,
                    "score_threshold_bullish" : data.Data.addressesNetGrowth.score_threshold_bullish
                },
                "inOutVar" : {
                    "sentiment" : data.Data.addressesNetGrowth.sentiment,
                    "score" : data.Data.addressesNetGrowth.score,
                    "score_threshold_bearish" : data.Data.addressesNetGrowth.score_threshold_bearish,
                    "score_threshold_bullish" : data.Data.addressesNetGrowth.score_threshold_bullish
                },
                "largetxsVar" : {
                    "sentiment" : data.Data.addressesNetGrowth.sentiment,
                    "score" : data.Data.addressesNetGrowth.score,
                    "score_threshold_bearish" : data.Data.addressesNetGrowth.score_threshold_bearish,
                    "score_threshold_bullish" : data.Data.addressesNetGrowth.score_threshold_bullish
                }
            }
            return data
        }else {
            console.log("Error consultando la API estatus code: " + response_from_api.status)            
        }
    }catch (err){
        console.log("Ocurrio un error consultnado la API")
        console.log(err)
    }

}
//----------get data from API----------//

//----------generic methods----------//
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
//----------generic methods----------//