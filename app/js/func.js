function config_endpoint_tokens_info(config_app) {
    tokens_as_string = config_app["tokens"].toString()
    api_key = config_app["api_key"]
    endpoint = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tokens_as_string}&tsyms=USD&api_key=${api_key}`
    return endpoint
}

function config_endpoint_historical_data(config_app, token, numero_dias) {
    api_key = config_app["api_key"]
    endpoint = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${token}&tsym=USD&limit=${numero_dias}&api_key=${api_key}`
    return endpoint
}

async function get_info_tokens(endpoint_info_tokens) {
    try {
        response_from_api = await fetch(endpoint_info_tokens)
        if (response_from_api.status == 200) {
            data = response_from_api.json()
            return data
        } else {
            console.log(response_from_api.status)
        }
    } catch (error) {
        console.log("Error consultando la API")
        console.log(error)
    }
}

function convert_timestamp_to_date(timestamp) {
    milisegundos = timestamp * 1000
    date_objetc = new Date(milisegundos)
    formato_fecha = date_objetc.toLocaleString()
    // remove time from format original
    formato_fecha = formato_fecha.split(' ')[0]
    return formato_fecha
}

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

function create_section_logos(config_app) {
    let contenedor = document.querySelector("#contenedor_logos")
    for (let key in config_app["tokens"]) {
        let token = config_app["tokens"][key]
        let path_logo = `${config_app["path_logos"]}/${token}.png`
        div = document.createElement("div")
        div.setAttribute("class", "col-4 col-lg-auto mt-5 mt-lg-0")
        img = document.createElement("img")
        img.setAttribute("src", path_logo)
        img.style.height = "30px"
        div.append(img)
        contenedor.append(div)
    }
}

function create_temporalidad_options(config_app) {
    let seccion_temporalidades = document.querySelector("#seccion_temporalidades")
    let temporalidades = config_app["temporalidades"]
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
    radio_default = document.getElementById("30d")
    radio_default.checked = true
}

function build_cripto_card(info_criptos) {
    let contenedor = document.querySelector("#container_info_by_token")
    for (criptomoneda in info_criptos) {
        // div1
        let div1 = document.createElement("div")
        div1.setAttribute("class", "col-sm-9 col-md-4 mt-3")
        div1.setAttribute("id", `contenedor_info_${criptomoneda}`)
        // div2
        let div2 = document.createElement("div")
        div2.setAttribute("class", "py-5 px-4 px-md-3 px-lg-4 rounded-1 bg-800 plans-cards mt-0")
        div2.setAttribute("id", `info_${criptomoneda}`)
        let p1 = document.createElement("p")
        p1.setAttribute("class", "fs-2 ls-2")
        let criptomoneda_text = document.createTextNode(`${criptomoneda}`)
        let h1 = document.createElement("h1")
        h1.setAttribute("class", "display-7 ls-3")
        let span1 = document.createElement("span")
        span1.setAttribute("class", "text-600")
        signo_dolar = document.createTextNode("$ ")
        // precio
        let precio = document.createTextNode(`${info_criptos[criptomoneda]["info_precio"]["precio_actual"]}`)
        // canvas      
        let canvas = document.createElement("canvas")
        canvas.setAttribute("id", `chart_${criptomoneda}`)
        // ul
        let ul = document.createElement("ul")
        ul.setAttribute("class", "mt-5 ps-0")
        let li1 = document.createElement("li")
        li1.setAttribute("class", "pricing-lists")
        let high_24h = document.createTextNode(`High 24H: ${info_criptos[criptomoneda]["info_precio"]["high_24h"]}`)
        let li2 = document.createElement("li")
        li2.setAttribute("class", "pricing-lists")
        let low_24h = document.createTextNode(`Low 24H: ${info_criptos[criptomoneda]["info_precio"]["low_24h"]}`)
        let li3 = document.createElement("li")
        li3.setAttribute("class", "pricing-lists")
        let MKTCAP = document.createTextNode(`Market Cap: ${info_criptos[criptomoneda]["info_precio"]["MKTCAP"]}`)
        let hr = document.createElement("hr")
        // link to ingo
        hr.setAttribute("class", "hr mt-6 text-1000")
        link = document.createElement("a")
        link.setAttribute("href", `${info_criptos[criptomoneda]["info_precio"]["data_source"]}`)
        link.setAttribute("target", "_blank")
        // boton
        let boton = document.createElement("button")
        boton.setAttribute("class", "btn btn-gray mt-4")
        let span2 = document.createElement("span")
        span2.setAttribute("class", "fas fa-arrow-right")
        let texto_boton = document.createTextNode("Mas Informacion ")
        // div2 
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
        boton.append(span2)
        // div2 
        div2.append(p1)
        div2.append(h1)
        div2.append(canvas)
        div2.append(hr)
        div2.append(ul)
        link.append(boton)
        div2.append(link)
        // div1
        div1.append(div2)
        // add to container
        contenedor.append(div1)
    }
}

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
//---------------------------------------------------------------------------------

function select_criptos_to_show() {
    let select_criptos_to_show = document.querySelectorAll("input[name=select_criptos_to_show]")
    select_criptos_to_show.forEach((token) => {
        token.addEventListener("click", function (token) {
            let select_criptos_to_show = document.querySelectorAll("input[name=select_criptos_to_show]")
            for (let i = 0; i <= select_criptos_to_show.length; i++) {
                if (select_criptos_to_show[i] != undefined) {
                    if (!select_criptos_to_show[i].checked) {
                        let card_to_delete = document.querySelector(`#contenedor_info_${select_criptos_to_show[i].value}`)
                        if (card_to_delete != null) {
                            console.log(card_to_delete)
                            card_to_delete.remove()
                        }
                    } if (select_criptos_to_show[i].checked) {
                        console.log(select_criptos_to_show[i].value)

                    }
                }
            }
        })
    })
}

//---------------------------------------------------------------------------------

async function main() {
    let config_app = {
        "tokens": ["BTC", "ETH", "ADA", "MATIC", "VXV", "SHIB", "CAKE", "VET", "TRX"],
        "api_key": "99f1147d7e9a0f3b602f89fb553fa5c91885159c3397ab916a0e988777d18fc3",
        "path_logos": "template/img/logos/",
        "temporalidades": [10, 30, 60, 90]
    }
    let endpoint_tokens_info = config_endpoint_tokens_info(config_app)
    let token_data_from_api = await get_info_tokens(endpoint_tokens_info)
    let info_criptos = {
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
        }
    }
    // create section logs
    create_section_logos(config_app)
    // create temporalidad options 
    create_temporalidad_options(config_app)
    //construir check box para la seleccion de los toens para mostrar en patalla
    select_criptos_to_show()
    // construir la seccion de html con la informacion de cada cripto
    build_cripto_card(info_criptos)
    // get historical data
    let num_dias = 30
    for (criptomoneda in info_criptos) {
        // create endpoint
        let token = info_criptos[criptomoneda]["symbol"]
        let endpoint_historical_data = config_endpoint_historical_data(config_app, token, num_dias)
        let historical_data = await get_historical_data(endpoint_historical_data)
        create_chart(historical_data["fechas"], historical_data["precios"], criptomoneda, num_dias)
    }

    // configuracion de temporalidades a traves de los radio buttons
    let radios_temporalidades = document.querySelectorAll('input[name="temporalidad"]')
    radios_temporalidades.forEach((temporalidad_option) => {
        temporalidad_option.addEventListener("click", async function (evento) {
            let num_dias = evento["target"]["value"]
            for (criptomoneda in info_criptos) {
                // remove the card
                let contenedor_info = document.querySelector(`#contenedor_info_${criptomoneda}`)
                contenedor_info.remove()
            }
            // volver a construir las cards con la informacion
            build_cripto_card(info_criptos)
            for (criptomoneda in info_criptos) {
                // create endpoint
                let token = info_criptos[criptomoneda]["symbol"]
                let endpoint_historical_data = config_endpoint_historical_data(config_app, token, num_dias)
                let historical_data = await get_historical_data(endpoint_historical_data)
                create_chart(historical_data["fechas"], historical_data["precios"], criptomoneda, num_dias)
            }
        })
    })
    // metodo para actualizar la informacion del precio 
    setInterval(async () => {
        let token_data_from_api_update = await get_info_tokens(endpoint_tokens_info)
        for (let token in config_app["tokens"]) {
            let symbol = config_app["tokens"][token]
            // console.log(token_data_from_api_update["RAW"][symbol]["USD"]["PRICE"])
        }
        // 

    }, 25000)
}

main()
