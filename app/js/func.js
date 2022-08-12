// metodo para la creacion del endpoint para traer la informacion actual de los tokens especificados dentro de una lista
function config_endpoint_tokens_info(config_app) {
    tokens_as_string = config_app["tokens"].toString()
    api_key = config_app["api_key"]
    endpoint = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tokens_as_string}&tsyms=USD&api_key=${api_key}`
    return endpoint
}
// config endpoint to ask about individuals token
function config_endpoint_one_token_info(config_app, token_symbol) {
    tokens_as_string = config_app["tokens"].toString()
    api_key = config_app["api_key"]
    endpoint = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${token_symbol}&tsyms=USD&api_key=${api_key}`
    return endpoint
}
// metodo para la creacion del enpoint con el cual se consulta el historico del precio de un token
function config_endpoint_historical_data(config_app, token, numero_dias) {
    api_key = config_app["api_key"]
    endpoint = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${token}&tsym=USD&limit=${numero_dias}&api_key=${api_key}`
    return endpoint
}
// funcion para consultar en la api la informacion de los tokens
async function get_info_tokens(endpoint_info_tokens) {
    try {
        response_from_api = await fetch(endpoint_info_tokens)
        if (response_from_api.status == 200) {
            data = response_from_api.json()
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
        milisegundos = timestamp * 1000
        date_objetc = new Date(milisegundos)
        formato_fecha = date_objetc.toLocaleString()
        // remove time from format original
        formato_fecha = formato_fecha.split(' ')[0]
        return formato_fecha
    } catch (error) {
        console.log("Ocurrio un error convirtiendo ")
    }
}
// funcion para consultar el historico del precion de determinado token
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
                for (i = 0; i < datos.length; i++) {
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
// funcion par creat la seccion de los logos del archivo HTML
function create_section_logos(info_app, logos_path) {
    let contenedor = document.querySelector("#contenedor_logos")
    for (let criptomoneda in info_app.criptomonedas) {
        let token = info_app.criptomonedas[criptomoneda].symbol
        let path_logo = `${logos_path}/${token}.png`
        div = document.createElement("div")
        div.setAttribute("class", "col-4 col-lg-auto mt-5 mt-lg-0")
        img = document.createElement("img")
        img.setAttribute("src", path_logo)
        img.setAttribute("id", `img_${token}`)
        img.style.height = "30px"
        div.append(img)
        contenedor.append(div)
    }
}
// funcion para crear las opciones de temporalidad en que se mostraran las graficas.
function create_temporalidad_options(config_app) {
    let seccion_temporalidades = document.querySelector("#seccion_temporalidades")
    let temporalidades = config_app.temporalidades
    for (let temporalidad in temporalidades) {
        let dias = temporalidades[temporalidad]
        div = document.createElement("div")
        div.setAttribute("class", "form-check form-check-inline")
        input = document.createElement("input")
        input.setAttribute("class", "form-check-input")
        input.setAttribute("type", "radio")
        input.setAttribute("name", "temporalidad")
        input.setAttribute("value", `${dias}`)
        input.setAttribute("id", `${dias}d`)
        label = document.createElement("label")
        label.setAttribute("class", "form-check-label")
        label.setAttribute("for", `${dias}d`)
        text = document.createTextNode(`${dias} dias`)
        // build html
        div.append(input)
        label.append(text)
        div.append(label)
        seccion_temporalidades.append(div)
    }
    radio_default = document.getElementById(`${config_app.temporalidad_default}d`)
    radio_default.checked = true
}
// funcion para contruir la tarjeta con laa informacion de la criptomoneda
function build_cripto_card(info_app) {
    let seccion_checkbox_token = document.querySelector("#seccion_checkbox_token")
    let contenedor = document.querySelector("#container_cards_by_token")
    for (criptomoneda in info_app.criptomonedas) {
        // div1
        let div1 = document.createElement("div")
        div1.setAttribute("class", "col-sm-9 col-md-4 mt-3")
        div1.setAttribute("id", `card_info_${info_app.criptomonedas[criptomoneda].symbol}`)
        // div2
        let div2 = document.createElement("div")
        div2.setAttribute("class", "py-5 px-4 px-md-3 px-lg-4 rounded-1 bg-800 plans-cards mt-0")
        div2.setAttribute("id", `info_${criptomoneda}`)
        // p1
        let p1 = document.createElement("p")
        p1.setAttribute("class", "fs-2 ls-2")
        // texy
        let criptomoneda_text = document.createTextNode(`${criptomoneda}`)
        let h1 = document.createElement("h1")
        // h1
        h1.setAttribute("class", "display-7 ls-3")
        let span1 = document.createElement("span")
        // span
        span1.setAttribute("class", "text-600")
        signo_dolar = document.createTextNode("$ ")
        // precio
        let precio = document.createTextNode(`${info_app.criptomonedas[criptomoneda]["info_precio"]["precio_actual"]}`)
        // canvas
        // link when canvas is clicked
        let a_modal = document.createElement("a")
        a_modal.setAttribute("href", "#exampleModal")
        a_modal.setAttribute("data-toggle", "modal")
        a_modal.setAttribute("data-backdrop", "static")
        let canvas = document.createElement("canvas")
        canvas.setAttribute("id", `chart_${criptomoneda}`)
        canvas.setAttribute("class", info_app.criptomonedas[criptomoneda].symbol)
        canvas.setAttribute("name", "grafico")
        // ul
        let ul = document.createElement("ul")
        ul.setAttribute("class", "mt-5 ps-0")
        // li
        let li1 = document.createElement("li")
        li1.setAttribute("class", "pricing-lists")
        let high_24h = document.createTextNode(`High 24H: ${info_app.criptomonedas[criptomoneda]["info_precio"]["high_24h"]}`)
        let li2 = document.createElement("li")
        li2.setAttribute("class", "pricing-lists")
        let low_24h = document.createTextNode(`Low 24H: ${info_app.criptomonedas[criptomoneda]["info_precio"]["low_24h"]}`)
        let li3 = document.createElement("li")
        li3.setAttribute("class", "pricing-lists")
        let MKTCAP = document.createTextNode(`Market Cap: ${info_app.criptomonedas[criptomoneda]["info_precio"]["MKTCAP"]}`)
        let hr = document.createElement("hr")
        // link to ingo
        hr.setAttribute("class", "hr mt-6 text-1000")
        link = document.createElement("a")
        link.setAttribute("href", `${info_app.criptomonedas[criptomoneda]["info_precio"]["data_source"]}`)
        link.setAttribute("target", "_blank")
        // boton
        let boton = document.createElement("button")
        boton.setAttribute("class", "btn btn-gray mt-4")
        // span2
        let i_mas_info = document.createElement("i")
        i_mas_info.setAttribute("class", "fa-solid fa-circle-plus")
        let texto_boton = document.createTextNode("Mas Informacion ")
        // config html
        p1.append(criptomoneda_text)
        span1.append(signo_dolar)
        h1.append(span1)
        h1.append(precio)
        // ul
        li1.append(high_24h)
        li2.append(low_24h)
        li3.append(MKTCAP)
        ul.append(li1, li2, li3)
        // boton
        boton.append(texto_boton)
        boton.append(i_mas_info)
        // div2 
        div2.append(p1)
        div2.append(h1)
        a_modal.append(canvas)
        div2.append(a_modal)
        div2.append(hr)
        div2.append(ul)
        link.append(boton)
        div2.append(link)
        // div1
        div1.append(div2)
        // add to container       
        contenedor.append(div1)
        // ---------------
        // create check box
        // div
        div_checkbox = document.createElement("div")
        div_checkbox.setAttribute("class", "form-check form-check-inline")
        div_checkbox.setAttribute("id", `div_check_${info_app.criptomonedas[criptomoneda].symbol}`)
        // input
        input_checkbox = document.createElement("input")
        input_checkbox.setAttribute("class", "form-check-input")
        input_checkbox.setAttribute("type", "checkbox")
        input_checkbox.setAttribute("name", "select_criptos_to_show")
        input_checkbox.setAttribute("id", `check_${criptomoneda}`)
        input_checkbox.setAttribute("value", info_app.criptomonedas[criptomoneda].symbol)
        input_checkbox.checked = true
        // label
        label_checkbox = document.createElement("label")
        label_checkbox.setAttribute("class", "form-check-label")
        label_checkbox.setAttribute("for", `check_${criptomoneda}`)
        // text
        checkbox_text = document.createTextNode(info_app.criptomonedas[criptomoneda].symbol)
        // config html
        div_checkbox.append(input_checkbox)
        label_checkbox.append(checkbox_text)
        div_checkbox.append(label_checkbox)
        seccion_checkbox_token.append(div_checkbox)
    }
}
// funcion para crear el grafico
function create_chart(fechas, precios, criptomoneda, num_dias) {
    let chart = document.querySelector(`#chart_${criptomoneda}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${criptomoneda} Vs USD ultimos ${num_dias} dias`,
        data: precios,
        borderColor: 'rgba(175, 175, 175, 100)',
        borderWidth: 3,
    }
    const historic_chart = new Chart(chart, {
        type: "line",
        data: {
            labels: labels,
            datasets: [datos],
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        display: false,
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        display: true,
                        color: 'rgba(175, 175, 175, 100)',
                    },
                    grid: {
                        display: false
                    }
                },
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0,
                        color: 'rgba(175, 175, 175, 100)'
                    },
                    display: true,
                    position: "bottom"
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        }
    })
}
// metodo para crear en canvas del modal
function crear_canvas_detailed_info(chart_id) {
    let chart_detailed_info = document.createElement("canvas")
    chart_detailed_info.setAttribute("id", chart_id)
    chart_detailed_info.style.width = '100%';
    chart_detailed_info.style.height = '100%';
    return chart_detailed_info
}

function create_chart2(fechas, precios, criptomoneda, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${criptomoneda} Vs USD ultimos ${num_dias} dias`,
        data: precios,
        borderColor: 'rgba(175, 175, 175, 100)',
        borderWidth: 3,
    }
    const historic_chart = new Chart(chart, {
        type: "line",
        data: {
            labels: labels,
            datasets: [datos],
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        display: false,
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        display: true,
                        color: 'rgba(175, 175, 175, 100)',
                    },
                    grid: {
                        display: false
                    }
                },
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0,
                        color: 'rgba(175, 175, 175, 100)'
                    },
                    display: true,
                    position: "bottom"
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        }
    })
}
// informacion detallada en el modal
function info_token_modal(info_token, historical_data, token_symbol) {
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
        i_HIGH24HOUR = document.createElement("i")
        i_HIGH24HOUR.setAttribute("class", "fa-solid fa-arrow-up-long")
        let td_HIGH24HOUR = document.createElement("td")
        let HIGH24HOUR = document.createTextNode(info_token.HIGH24HOUR)
        // precio mas bajo las ultimas 24 horas LOW24HOUR
        let tr_LOW24HOUR = document.createElement("tr")
        let td_label_LOW24HOUR = document.createElement("td")
        i_LOW24HOUR = document.createElement("i")
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
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------

async function main() {
    let config_app = {
        "tokens": ["BTC", "ETH", "ADA", "MATIC", "VXV", "SHIB", "CAKE", "VET", "TRX", "DOGE"],
        "api_key": "99f1147d7e9a0f3b602f89fb553fa5c91885159c3397ab916a0e988777d18fc3",
        "temporalidad_default": 30,
        "temporalidades": [10, 30, 60, 90],
        "path_logos": "template/img/logos/"
    }
    let endpoint_tokens_info = config_endpoint_tokens_info(config_app)
    let token_data_from_api = await get_info_tokens(endpoint_tokens_info)
    let info_app = {
        "criptomonedas": {
            "Bitcoin": {
                "symbol": "BTC",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["BTC"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["DISPLAY"]["BTC"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["DISPLAY"]["BTC"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["DISPLAY"]["BTC"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["DISPLAY"]["BTC"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["BTC"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/BTC/overview/USDT"
                }
            },
            "Ethereum": {
                "symbol": "ETH",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["ETH"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["RAW"]["ETH"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["RAW"]["ETH"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["RAW"]["ETH"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["RAW"]["ETH"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["ETH"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/ETH/overview/USDT"
                }
            },
            "Cardano": {
                "symbol": "ADA",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["ADA"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["RAW"]["ADA"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["RAW"]["ADA"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["RAW"]["ADA"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["RAW"]["ADA"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["ADA"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/ADA/overview/USDT"
                }
            },
            "Polygon": {
                "symbol": "MATIC",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["MATIC"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["RAW"]["MATIC"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["RAW"]["MATIC"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["RAW"]["MATIC"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["RAW"]["MATIC"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["MATIC"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/MATIC/overview/USDT"
                }
            },
            "VectorSpace_AI": {
                "symbol": "VXV",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["VXV"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["RAW"]["VXV"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["RAW"]["VXV"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["RAW"]["VXV"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["RAW"]["VXV"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["VXV"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/VXV/overview/USDT"
                }
            },
            "ShibaInu": {
                "symbol": "SHIB",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["SHIB"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["RAW"]["SHIB"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["RAW"]["SHIB"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["RAW"]["SHIB"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["RAW"]["SHIB"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["SHIB"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/SHIB/overview/USDT"
                }
            },
            "PancakeSwapp": {
                "symbol": "CAKE",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["CAKE"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["RAW"]["CAKE"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["RAW"]["CAKE"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["RAW"]["CAKE"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["RAW"]["CAKE"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["CAKE"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/CAKE/overview/USDT"
                }
            },
            "Vechain": {
                "symbol": "VET",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["VET"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["RAW"]["VET"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["RAW"]["VET"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["RAW"]["VET"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["RAW"]["VET"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["VET"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/VET/overview/USDT"
                }
            },
            "Tron": {
                "symbol": "TRX",
                "info_precio": {
                    "precio_actual": token_data_from_api["RAW"]["TRX"]["USD"]["PRICE"],
                    "high_24h": token_data_from_api["RAW"]["TRX"]["USD"]["HIGH24HOUR"],
                    "low_24h": token_data_from_api["RAW"]["TRX"]["USD"]["LOW24HOUR"],
                    "volume_24": token_data_from_api["RAW"]["TRX"]["USD"]["TOTALVOLUME24H"],
                    "volume_24_usd": token_data_from_api["RAW"]["TRX"]["USD"]["TOTALVOLUME24HTO"],
                    "MKTCAP": token_data_from_api["DISPLAY"]["TRX"]["USD"]["MKTCAP"],
                    "data_source": "https://www.cryptocompare.com/coins/TRX/overview/USDT"
                }
            },
            // "DogeCoin": {
            //     "symbol": "DOGE",
            //     "info_precio": {
            //         "precio_actual": token_data_from_api["RAW"]["DOGE"]["USD"]["PRICE"],
            //         "high_24h": token_data_from_api["RAW"]["DOGE"]["USD"]["HIGH24HOUR"],
            //         "low_24h": token_data_from_api["RAW"]["DOGE"]["USD"]["LOW24HOUR"],
            //         "volume_24": token_data_from_api["RAW"]["DOGE"]["USD"]["TOTALVOLUME24H"],
            //         "volume_24_usd": token_data_from_api["RAW"]["DOGE"]["USD"]["TOTALVOLUME24HTO"],
            //         "MKTCAP": token_data_from_api["DISPLAY"]["DOGE"]["USD"]["MKTCAP"],
            //         "data_source": "https://www.cryptocompare.com/coins/DOGE/overview/USDT"
            //     }
            // }
        }

    }
    // create section logs
    create_section_logos(info_app, config_app.path_logos)
    // construir la seccion de html con la informacion de cada cripto
    build_cripto_card(info_app)
    // get historical data
    for (criptomoneda in info_app.criptomonedas) {
        // create endpoint
        let token = info_app.criptomonedas[criptomoneda]["symbol"]
        let endpoint_historical_data = config_endpoint_historical_data(config_app, token, config_app.temporalidad_default)
        let historical_data = await get_historical_data(endpoint_historical_data)
        create_chart(historical_data["fechas"], historical_data["precios"], criptomoneda, config_app.temporalidad_default)
    }
    // seccion de checkbox para selecion que Cripto ver en pantalla
    let inputs_checks = document.querySelectorAll('input[name="select_criptos_to_show"]')
    let tokens = []
    for (let i = 0; i < inputs_checks.length; i++){
        tokens.push(inputs_checks[i].value)
    }
    inputs_checks.forEach((input_check) => {
        input_check.addEventListener("click", async function (evento) {
            let is_checked = evento.target.checked
            let token_symbol = evento.target.value
            if (is_checked) {
                console.log("Crear card para: " + token_symbol)
                // posicion del token para volver a crear la card en la misma posicion
                posicion_token = tokens.indexOf(token_symbol)
                let endpoint_info_token = config_endpoint_one_token_info(config_app, token_symbol)
                let endpoint_historical_data = config_endpoint_historical_data(config_app, token_symbol, 30)
            }
            if (!is_checked) {
                card_to_delete = document.querySelector(`#card_info_${token_symbol}`)
                if (card_to_delete){
                    card_to_delete.remove()
                }                
            }
        })
    })
    // open chart on modal with details about 
    let graficos = document.querySelectorAll('canvas[name="grafico"]')
    graficos.forEach((grafico) => {
        grafico.addEventListener("click", async (evento) => {
            let canvas_node_id = evento.target.id
            let canvas_node = document.querySelector(`#${canvas_node_id}`)
            let token_symbol = canvas_node.className
            // info from API by token
            let endpoint_info_token = config_endpoint_one_token_info(config_app, token_symbol)
            // console.log(endpoint_info_token)
            let info_token_from_api = await get_info_tokens(endpoint_info_token)
            let info_token = info_token_from_api.DISPLAY[`${token_symbol}`].USD
            // info historic data
            let endpoint_historical_data = config_endpoint_historical_data(config_app, token_symbol, 30)
            // console.log(endpoint_historical_data)
            let historical_data = await get_historical_data(endpoint_historical_data)
            info_token_modal(info_token, historical_data, token_symbol)
            create_chart2(historical_data["fechas"], historical_data["precios"], token_symbol, 30, "chart_detailed_info")
        })
    })
    // boton para cerrar el modal y borrar la info de la cripto
    let boton_close_modal_info_cripto = document.querySelector("#cerrar_modal_info_cripto")
    boton_close_modal_info_cripto.addEventListener("click", _ => {
        let informacion_detallada = document.querySelector("#informacion_detallada")
        if (informacion_detallada) {
            informacion_detallada.remove()
        }
    })
    // configuracion temporalidades
    // info_app de temporalidades a traves de los radio buttons
    // crear las opciones de temporalidad en que se ven los graficos
    create_temporalidad_options(config_app)
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
            let endpoint_historical_data = config_endpoint_historical_data(config_app, token, num_dias)
            let historical_data = await get_historical_data(endpoint_historical_data)
            create_chart2(historical_data["fechas"], historical_data["precios"], token, num_dias, "chart_detailed_info")
        })
    })
}
main()