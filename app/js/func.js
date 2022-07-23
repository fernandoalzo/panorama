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
            console.log(response_from_api.status)
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

function build_cripto_card(info_criptos) {
    let contenedor = document.querySelector("#container_info_by_token")
    for (criptomoneda in info_criptos) {

        let div1 = document.createElement("div")
        div1.setAttribute("class", "col-sm-9 col-md-4 mt-3")
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
        let precio = document.createTextNode(`${info_criptos[criptomoneda]["info_precio"]["precio_actual"]}`)
        let canvas = document.createElement("canvas")
        canvas.setAttribute("id", `chart_${criptomoneda}`)
        let hr = document.createElement("hr")
        hr.setAttribute("class", "hr mt-6 text-1000")
        link = document.createElement("a")
        link.setAttribute("href", `${info_criptos[criptomoneda]["info_precio"]["data_source"]}`)
        link.setAttribute("target", "_blank")
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
        boton.append(texto_boton)
        boton.append(span2)
        div2.append(p1)
        div2.append(h1)
        div2.append(canvas)
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
        label: `${criptomoneda} Vs USD ultimos ${num_dias} dias`,
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

async function main() {
    let config_app = {
        "tokens": ["BTC", "ETH", "ADA", "MATIC", "VXV", "SHIB", "CAKE"],
        "api_key": "37c54e7dbca23e8f61dc3cc1b2377b5a5fd6bb79c3d5b42607501d3422891984"
    }

    let endpoint_tokens_info = config_endpoint_tokens_info(config_app)
    let token_data_from_api = await get_info_tokens(endpoint_tokens_info)

    let info_criptos = {
        "Bitcoin": {
            "symbol": "BTC",
            "info_precio": {
                "precio_actual": token_data_from_api["RAW"]["BTC"]["USD"]["PRICE"],
                "data_source" : "https://www.cryptocompare.com/coins/BTC/overview/USDT"
            }
        },
        "Ethereum": {
            "symbol": "ETH",
            "info_precio": {
                "precio_actual": token_data_from_api["RAW"]["ETH"]["USD"]["PRICE"],
                "data_source" : "https://www.cryptocompare.com/coins/ETH/overview/USDT"
            }
        },
        "Cardano": {
            "symbol": "ADA",
            "info_precio": {
                "precio_actual": token_data_from_api["RAW"]["ADA"]["USD"]["PRICE"],
                "data_source" : "https://www.cryptocompare.com/coins/ADA/overview/USDT"
            }
        },
        "Polygon": {
            "symbol": "MATIC",
            "info_precio": {
                "precio_actual": token_data_from_api["RAW"]["MATIC"]["USD"]["PRICE"],
                "data_source" : "https://www.cryptocompare.com/coins/MATIC/overview/USDT"
            }
        },
        "VectorSpace_AI": {
            "symbol": "VXV",
            "info_precio": {
                "precio_actual": token_data_from_api["RAW"]["VXV"]["USD"]["PRICE"],
                "data_source" : "https://www.cryptocompare.com/coins/VXV/overview/USDT"
            }
        },
        "ShibaInu": {
            "symbol": "SHIB",
            "info_precio": {
                "precio_actual": token_data_from_api["RAW"]["SHIB"]["USD"]["PRICE"],
                "data_source" : "https://www.cryptocompare.com/coins/SHIB/overview/USDT"
            }
        },
        "PancakeSwapp": {
            "symbol": "CAKE",
            "info_precio": {
                "precio_actual": token_data_from_api["RAW"]["CAKE"]["USD"]["PRICE"],
                "data_source" : "https://www.cryptocompare.com/coins/CAKE/overview/USDT"
            }
        }
    }
    // construir la seccion de html con la informacion de cada cripto
    build_cripto_card(info_criptos)
    // get historical data
    let num_dias = 90
    for (criptomoneda in info_criptos) {
        // create endpoint
        let token = info_criptos[criptomoneda]["symbol"]
        let endpoint_historical_data = config_endpoint_historical_data(config_app, token, num_dias)
        let historical_data = await get_historical_data(endpoint_historical_data)
        create_chart(historical_data["fechas"], historical_data["precios"], criptomoneda, num_dias)
    }


    let radios_temporalidades = document.querySelectorAll('input[name="temporalidad"]')
    radios_temporalidades.forEach((temporalidad_option) => {
        temporalidad_option.addEventListener("click", async function (evento) {
            num_dias = evento["target"]["value"]
            console.log("Grafico de los ultimos: " + num_dias + " dias")
            console.log(`aqui se debe arreglar el tema con la eliminacion de los nodos canvas para actualizarlos con la nueva info`)


            //         for (criptomoneda in info_criptos) {
            //             let token = info_criptos[criptomoneda]["symbol"]
            //             let endpoint_historical_data = config_endpoint_historical_data(config_app, token, num_dias)
            //             let historical_data = await get_historical_data(endpoint_historical_data)                
            //             console.log(historical_data)
            // remove the chart to update with de new one
            // chart = document.querySelector(`#chart_${criptomoneda}`)
            // remove child from padre
            // padre_chart = document.querySelector(`#info_${criptomoneda}`)
            // padre_chart.removeChild(chart)
            // create_chart(historical_data["fechas"], historical_data["precios"], criptomoneda)
            // console.log(historical_data)

            //         }
                })
            })

        }
main()