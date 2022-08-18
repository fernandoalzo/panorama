// metodo para la creacion del endpoint para traer la informacion actual de los tokens especificados dentro de una lista
function config_endpoint_tokens_info(tokens, api_key) {
    let tokens_as_string = tokens.toString()
    let endpoint = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tokens_as_string}&tsyms=USD&api_key=${api_key}`
    return endpoint
}
// config endpoint to ask about individuals token
function config_endpoint_one_token_info(_config_app, token_symbol) {
    let tokens_as_string = _config_app["tokens"].toString()
    let api_key = _config_app["api_key"]
    let endpoint = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${token_symbol}&tsyms=USD&api_key=${api_key}`
    return endpoint
}
// metodo para la creacion del enpoint con el cual se consulta el historico del precio de un token
function config_endpoint_historical_data(api_key, token, numero_dias) {
    let endpoint = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${token}&tsym=USD&limit=${numero_dias}&api_key=${api_key}`
    return endpoint
}
// funcion para consultar en la api la informacion de los tokens
async function get_info_tokens(endpoint_info_tokens) {
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
// funcion para convertir el formato de hora del servidor de Timestamp a fecha.
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
// funcion para consultar el historico del precion de determinado token, retrna un diccionario con dos listas, los precios de cierre y e las fechas
async function get_historical_data(endpoint_historical_data) {
    try {
        let response_from_api = await fetch(endpoint_historical_data)
        if (response_from_api.status == 200) {
            let data = await response_from_api.json()
            let respuesta = data["Response"]
            if (respuesta == "Success") {
                let precios = []
                let fechas = []
                let datos = data["Data"]["Data"]
                for (let i = 0; i < datos.length; i++) {
                    precios.push(datos[i]["close"])
                    let timestamp = datos[i]["time"]
                    let fecha = convert_timestamp_to_date(timestamp)
                    fechas.push(fecha)
                }
                return data = {
                    "precios": precios,
                    "fechas": fechas
                }
            }
        }
    } catch (error) {
        console.log("Ocurrio un error consultando la API")
        console.log(error)
    }
}

// metodo para crear en canvas del modal
function crear_canvas_detailed_info(chart_id) {
    let chart_detailed_info = document.createElement("canvas")
    chart_detailed_info.setAttribute("id", chart_id)
    chart_detailed_info.style.width = '100%';
    chart_detailed_info.style.height = '100%';
    return chart_detailed_info
}
// informacion detallada en el modal
function info_token_modal(info_token, token_symbol) {
    // cons estas lineas iniciales se soluciona el problema de la informacion duplicada cuando se lanz el modal despues de haber modificado los checkbox
    let informacion_detallada = document.querySelector("#informacion_detallada")
    if (informacion_detallada) {
        informacion_detallada.remove()
    }
    try {
        let seccion_informacion_detallada = document.querySelector("#seccion_informacion_detallada")
        // seccion donde ira toda la info, y debe ser eliminada para crear una nueva
        let informacion_detallada = document.createElement("div")
        informacion_detallada.setAttribute("id", "informacion_detallada")
        // modal header
        // let modal_header = document.querySelector(".modal-header")
        let modal_header = document.createElement("div")
        modal_header.setAttribute("class", "modal-header")
        let h5 = document.createElement("h1")
        h5.setAttribute("class", "moddal-title")
        let nombre_criptomoneda = document.createTextNode(info_token.FROMSYMBOL)
        // div para el char
        let div_chart = document.createElement("div")
        div_chart.setAttribute("class", "zona_chart_details")
        div_chart.setAttribute("name", token_symbol)
        let chart = document.createElement("canvas")
        chart.setAttribute("id", "chart_detailed_info")
        chart.style.width = '100%';
        chart.style.height = '100%';
        // div para la informacion detallada de la cripto
        let div_info = document.createElement("div")
        div_info.setAttribute("class", "zona_de_informacion")
        let tabla_info = document.createElement("table")
        tabla_info.setAttribute("class", "table")
        tabla_info.setAttribute("cellspacing", "0")
        tabla_info.setAttribute("cellpadding", "0")
        let tbody_tabla_info = document.createElement("tbody")
        // precio
        let tr_PRICE = document.createElement("tr")
        let td_label_PRICE = document.createElement("td")
        let label_PRICE = document.createTextNode("Precio")
        let td_PRICE = document.createElement("td")
        let PRICE = document.createTextNode(info_token.PRICE)
        // precio mas alto las ultimas 24 horas HIGH24HOUR
        let tr_HIGH24HOUR = document.createElement("tr")
        let td_label_HIGH24HOUR = document.createElement("td")
        let label_HIGH24HOUR = document.createTextNode("Precio mas alto ultimas 24H  ")
        let i_HIGH24HOUR = document.createElement("i")
        i_HIGH24HOUR.setAttribute("class", "fa-solid fa-arrow-up-long")
        let td_HIGH24HOUR = document.createElement("td")
        let HIGH24HOUR = document.createTextNode(info_token.HIGH24HOUR)
        // precio mas bajo las ultimas 24 horas LOW24HOUR
        let tr_LOW24HOUR = document.createElement("tr")
        let td_label_LOW24HOUR = document.createElement("td")
        let i_LOW24HOUR = document.createElement("i")
        i_LOW24HOUR.setAttribute("class", "fa-solid fa-arrow-down-long")
        let label_LOW24HOUR = document.createTextNode("Precio mas bajo ultimas 24H  ")
        let td_LOW24HOUR = document.createElement("td")
        let LOW24HOUR = document.createTextNode(info_token.LOW24HOUR)
        // cambio del precion en 24 horas CHANGE24HOUR
        let tr_CHANGE24HOUR = document.createElement("tr")
        let td_label_CHANGE24HOUR = document.createElement("td")
        let label_CHANGE24HOUR = document.createTextNode("Cambio 24H")
        let td_CHANGE24HOUR = document.createElement("td")
        let CHANGE24HOUR = document.createTextNode(info_token.CHANGE24HOUR)
        // cambio de precio 24 horas en porcentaje CHANGEPCT24HOUR
        let tr_CHANGEPCT24HOUR = document.createElement("tr")
        let td_label_CHANGEPCT24HOUR = document.createElement("td")
        let label_CHANGEPCT24HOUR = document.createTextNode("Porcentaje cambio 24H")
        let td_CHANGEPCT24HOUR = document.createElement("td")
        let CHANGEPCT24HOUR = document.createTextNode(info_token.CHANGEPCT24HOUR + "%")
        // capitalizacion de mercado
        let tr_MKTCAP = document.createElement("tr")
        let td_label_MKTCAP = document.createElement("td")
        let label_MKTCAP = document.createTextNode("Capitalizacion del mercado")
        let td_MKTCAP = document.createElement("td")
        let MKTCAP = document.createTextNode(info_token.MKTCAP)
        // numero de tokens minados
        let tr_SUPPLY = document.createElement("tr")
        let td_label_SUPPLY = document.createElement("td")
        let label_SUPPLY = document.createTextNode("Criptomonedas Minadas")
        let td_SUPPLY = document.createElement("td")
        let SUPPLY = document.createTextNode(info_token.SUPPLY)
        // volumen en dolares de las ultimas 24 horas
        let tr_VOLUME24HOURTO = document.createElement("tr")
        let td_label_VOLUME24HOURTO = document.createElement("td")
        let labell_VOLUME24HOURTO = document.createTextNode("Volumen 24H")
        let td_VOLUME24HOURTO = document.createElement("td")
        let VOLUME24HOURT = document.createTextNode(info_token.VOLUME24HOURTO)
        // header
        h5.append(nombre_criptomoneda)
        modal_header.append(h5)
        // chart
        div_chart.append(chart)
        // info table  
        // td
        td_label_PRICE.append(label_PRICE)
        td_PRICE.append(PRICE)
        td_label_HIGH24HOUR.append(label_HIGH24HOUR, i_HIGH24HOUR)
        td_HIGH24HOUR.append(HIGH24HOUR)
        td_label_LOW24HOUR.append(label_LOW24HOUR, i_LOW24HOUR)
        td_LOW24HOUR.append(LOW24HOUR)
        td_label_CHANGE24HOUR.append(label_CHANGE24HOUR)
        td_CHANGE24HOUR.append(CHANGE24HOUR)
        td_label_CHANGEPCT24HOUR.append(label_CHANGEPCT24HOUR)
        td_CHANGEPCT24HOUR.append(CHANGEPCT24HOUR)
        td_label_MKTCAP.append(label_MKTCAP)
        td_MKTCAP.append(MKTCAP)
        td_label_SUPPLY.append(label_SUPPLY)
        td_SUPPLY.append(SUPPLY)
        td_label_VOLUME24HOURTO.append(labell_VOLUME24HOURTO)
        td_VOLUME24HOURTO.append(VOLUME24HOURT)
        // tr
        tr_PRICE.append(td_label_PRICE, td_PRICE)
        tr_HIGH24HOUR.append(td_label_HIGH24HOUR, td_HIGH24HOUR)
        tr_LOW24HOUR.append(td_label_LOW24HOUR, td_LOW24HOUR)
        tr_CHANGE24HOUR.append(td_label_CHANGE24HOUR, td_CHANGE24HOUR)
        tr_CHANGEPCT24HOUR.append(td_label_CHANGEPCT24HOUR, td_CHANGEPCT24HOUR)
        tr_MKTCAP.append(td_label_MKTCAP, td_MKTCAP)
        tr_SUPPLY.append(td_label_SUPPLY, td_SUPPLY)
        tr_VOLUME24HOURTO.append(td_label_VOLUME24HOURTO, td_VOLUME24HOURTO)
        // add tr to table
        tbody_tabla_info.append(tr_PRICE, tr_HIGH24HOUR, tr_LOW24HOUR, tr_CHANGE24HOUR, tr_CHANGEPCT24HOUR, tr_MKTCAP, tr_SUPPLY, tr_VOLUME24HOURTO)
        tabla_info.append(tbody_tabla_info)
        // add table to div info
        div_info.append(tabla_info)
        // aad to main container
        informacion_detallada.append(modal_header, div_chart, div_info)
        seccion_informacion_detallada.append(informacion_detallada)

    } catch (err) {
        console.log(err)
    }

}
// funciones para cuando se dan clicks en el dom
function function_click_chart(graficos, _config_app, graficos_canvas) {
    graficos_canvas.forEach((grafico) => {
        grafico.addEventListener("click", async (evento) => {
            let canvas_node_id = evento.target.id
            let canvas_node = document.querySelector(`#${canvas_node_id}`)
            let token_symbol = canvas_node.className
            // info from API by token
            let endpoint_info_token = config_endpoint_one_token_info(_config_app, token_symbol)
            let info_token_from_api = await get_info_tokens(endpoint_info_token)
            let info_token = info_token_from_api.DISPLAY[`${token_symbol}`].USD
            info_token_modal(info_token, token_symbol)
            // info historic data
            let endpoint_historical_data = config_endpoint_historical_data(_config_app, token_symbol, 30)
            let historical_data = await get_historical_data(endpoint_historical_data)
            graficos.create_new_chart(historical_data["fechas"], historical_data["precios"], token_symbol, 30, "chart_detailed_info")
        })
    })
}

async function main() {
    const html = await import("./html.js")
    const graficos = await import("./graficos.js")
    let _config_app = {
        "tokens": ["BTC", "ETH", "ADA", "MATIC", "VXV", "SHIB", "CAKE", "VET", "TRX", "AXS"],
        "temporalidad_default": 30,
        "temporalidades": [10, 30, 60, 90],
        "path_logos": "template/img/logos/",
        "data_source": {
            "cryptocompare": {
                "url": "https://www.cryptocompare.com",
                "api_key": "99f1147d7e9a0f3b602f89fb553fa5c91885159c3397ab916a0e988777d18fc3"
            }
        }
    }
    let endpoint_tokens_info = config_endpoint_tokens_info(_config_app.tokens, _config_app.data_source.cryptocompare.api_key)
    let token_data_from_api = await get_info_tokens(endpoint_tokens_info)
    let info_by_token = [
        {
            "nombre": "Bitcoin",
            "symbol": "BTC",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.BTC.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.BTC.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.BTC.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.BTC.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/BTC/overview/USDT"
            }
        },
        {
            "nombre": "Ethereum",
            "symbol": "ETH",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.ETH.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.ETH.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.ETH.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.ETH.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.ETH.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/ETH/overview/USDT"
            }
        },
        {
            "nombre": "Cardano",
            "symbol": "ADA",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.ADA.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.ADA.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.ADA.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.ADA.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.ADA.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/ADA/overview/USDT"
            }
        },
        {
            "nombre": "Polygon",
            "symbol": "MATIC",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.MATIC.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.MATIC.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.MATIC.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.MATIC.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.MATIC.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/MATIC/overview/USDT"
            }
        },
        {
            "nombre": "Shiba Inu",
            "symbol": "SHIB",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.SHIB.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.SHIB.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.SHIB.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.SHIB.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.SHIB.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/SHIB/overview/USDT"
            }
        },
        {
            "nombre": "Packae Swap",
            "symbol": "CAKE",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.CAKE.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.CAKE.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.CAKE.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.CAKE.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.CAKE.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.CAKE.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/CAKE/overview/USDT"
            }
        },
        {
            "nombre": "Vechain",
            "symbol": "VET",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.VET.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.VET.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.VET.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.VET.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.VET.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.VET.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/VET/overview/USDT"
            }
        },
        {
            "nombre": "Tron",
            "symbol": "TRX",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.TRX.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.TRX.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.TRX.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.TRX.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.TRX.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.TRX.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/TRX/overview/USDT"
            }
        },
        {
            "nombre": "Axie Infinity",
            "symbol": "AXS",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.AXS.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.AXS.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.AXS.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.AXS.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.AXS.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.AXS.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/AXS/overview/USDT"
            }
        },]
    // inicio del programa, se crean las configuraciones y datos inicales 
    info_by_token.forEach(async (info_token) => {
        // create logos
        html.create_section_logos(info_token.symbol, _config_app.path_logos, "contenedor_logos")
        // create the criptocards
        html.create_criptocard(info_token.symbol, info_token.info_precio.PRICE, info_token.info_precio.HIGH24HOUR, info_token.info_precio.LOW24HOUR, info_token.info_precio.MKTCAP, "container_criptocards")
        // create the checbox
        html.create_checkbox_by_token(info_token.symbol, "seccion_checkbox_token")
        // config chart 
        let endpoint_historical_data = config_endpoint_historical_data(_config_app.data_source.cryptocompare.api_key, info_token.symbol, _config_app.temporalidad_default)
        let historical_data = await get_historical_data(endpoint_historical_data)
        graficos.create_chart(historical_data["fechas"], historical_data["precios"], info_token.symbol, _config_app.temporalidad_default)
        
    })
    // codigo para cuando se haga click sobre los checkbox
    let inputs_checks = document.querySelectorAll('input[name="select_criptos_to_show"]')
    let tokens = []
    for (let i = 0; i < inputs_checks.length; i++) {
        tokens.push(inputs_checks[i].value)
    }
    // eventos cuando hay cambios en los checkboxes
    inputs_checks.forEach((input_check) => {
        input_check.addEventListener("click", async (evento) => {
            let is_checked = evento.target.checked
            let token_symbol = evento.target.value
            if (is_checked) {
                // posicion del token para volver a crear la card en la misma posicion
                let posicion_token = tokens.indexOf(token_symbol)
                // get the position of token de referencia, con esta referencia se creara el criptocard antes de esa referencia
                let token_ref = tokens[posicion_token + 1]
                // get token info to create the criptocard
                let endpoint_info_token = config_endpoint_one_token_info(_config_app, token_symbol)
                let info_token_from_api = await get_info_tokens(endpoint_info_token)
                html.create_new_criptocard(info_token_from_api, token_symbol, token_ref)
                // get historical data from chart criptocard
                let endpoint_historical_data = config_endpoint_historical_data(_config_app, token_symbol, 30)
                let historical_data = await get_historical_data(endpoint_historical_data)
                graficos.create_new_chart(historical_data["fechas"], historical_data["precios"], token_symbol, 30, `chart_${token_symbol}`)
                let graficos_canvas = document.querySelectorAll('canvas[name="grafico"]')
                function_click_chart(graficos, _config_app, graficos_canvas)
            }
            if (!is_checked) {
                let card_to_delete = document.querySelector(`#card_info_${token_symbol}`)
                if (card_to_delete) {
                    card_to_delete.remove()
                }
            }
        })
    })
    // eventos cuando se haga click dentro del grafico, se abre modal con informacion detallada
    let charts = document.querySelectorAll('canvas[name="grafico"]')
    function_click_chart(graficos, _config_app, charts)

    // boton para cerrar el modal con la informacion detalla
    let boton_close_modal_info_cripto = document.querySelector("#cerrar_modal_info_cripto")
    boton_close_modal_info_cripto.addEventListener("click", async _ => {
        let informacion_detallada = document.querySelector("#informacion_detallada")
        if (informacion_detallada) {
            informacion_detallada.remove()
        }
    })
    // eventos para  cuando hay cambios en los radio buttons de las teporabilidades
    html.create_temporalidad_options(_config_app)
    let inputs_temporalidades = document.querySelectorAll('input[name="temporalidad"]')
    inputs_temporalidades.forEach((input_temporabilidad) => {
        input_temporabilidad.addEventListener("click", async function (evento) {
            let num_dias = evento.target.value
            let zona_chart_details = document.querySelector(".zona_chart_details")
            let token = zona_chart_details.getAttribute("name")
            let chart_detailed_info = document.querySelector("#chart_detailed_info")
            if (chart_detailed_info) {
                chart_detailed_info.remove()
            }
            let new_chart_detailed_info = crear_canvas_detailed_info("chart_detailed_info")
            zona_chart_details.append(new_chart_detailed_info)
            let endpoint_historical_data = config_endpoint_historical_data(_config_app, token, num_dias)
            let historical_data = await get_historical_data(endpoint_historical_data)
            graficos.create_new_chart(historical_data["fechas"], historical_data["precios"], token, num_dias, "chart_detailed_info")
        })
    })
}
main()

window.onload = _ => {
    $("#modal_mensaje_de_desarrollador").modal()
}