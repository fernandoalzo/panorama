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
    console.log(endpoint_info_tokens)
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
        response_from_api = await fetch(endpoint_historical_data)
        if (response_from_api.status == 200) {
            data = await response_from_api.json()
            respuesta = data["Response"]
            if (respuesta == "Success") {
                precios = []
                fechas = []
                datos = data["Data"]["Data"]
                for (i = 0; i < datos.length; i++) {
                    precios.push(datos[i]["close"])
                    timestamp = datos[i]["time"]
                    fecha = convert_timestamp_to_date(timestamp)
                    fechas.push(fecha)
                }
                data = {
                    "precios": precios,
                    "fechas": fechas
                }
                return data
            }
        }
    } catch (error) {
        console.log("Ocurrio un error consultando la API")
        console.log(error)
    }
}

function build_cripto_card(info_criptos) {
    // console.log(info_criptos)
    for (criptomoneda in info_criptos) {
        contenedor = document.querySelector("#container_info_by_token")
        div1 = document.createElement("div")
        div1.setAttribute("class", "col-sm-9 col-md-4 mt-3")
        div2 = document.createElement("div")
        div2.setAttribute("class", "py-5 px-4 px-md-3 px-lg-4 rounded-1 bg-800 plans-cards mt-0")
        p1 = document.createElement("p")
        p1.setAttribute("class", "fs-2 ls-2")
        criptomoneda_text = document.createTextNode(`${criptomoneda}`)
        h1 = document.createElement("h1")
        h1.setAttribute("class", "display-7 ls-3")
        span1 = document.createElement("span")
        span1.setAttribute("class", "text-600")
        signo_dolar = document.createTextNode("$ ")
        precio = document.createTextNode(`${info_criptos[criptomoneda]["precio"]}`)
        canvas = document.createElement("canvas")
        canvas.setAttribute("id", `chart_${criptomoneda}`)
        hr = document.createElement("hr")
        hr.setAttribute("class", "hr mt-6 text-1000")
        boton = document.createElement("button")
        boton.setAttribute("class", "btn btn-gray mt-4")
        span2 = document.createElement("span")
        span2.setAttribute("class", "fas fa-arrow-right")
        texto_boton = document.createTextNode("Mas Informacion ")

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
        div2.append(boton)
        // div1
        div1.append(div2)
        // add to container
        contenedor.append(div1)
    }
}

function create_chart(fechas, precios, criptomoneda) {
    chart = document.querySelector(`#chart_${criptomoneda}`)
    labels = fechas
    datos = {
        label: `${criptomoneda} Vs USD ultimos 120 dias`,
        data: precios,
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 3,
    }
    new Chart(chart, {
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
                        color: 'rgba(0, 0, 0, 1)',
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
                        color: 'rgba(0, 0, 0, 1)'
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
    config_app = {
        "tokens": ["BTC", "ETH", "ADA", "MATIC", "VXV", "SHIB", "CAKE"],
        "api_key": "37c54e7dbca23e8f61dc3cc1b2377b5a5fd6bb79c3d5b42607501d3422891984"
    }

    endpoint_tokens_info = config_endpoint_tokens_info(config_app)
    token_data_from_api = await get_info_tokens(endpoint_tokens_info)

    info_criptos = {
        "Bitcoin": {
            "symbol": "BTC",
            "precio": token_data_from_api["RAW"]["BTC"]["USD"]["PRICE"]
        },
        "Ethereum": {
            "symbol": "ETH",
            "precio": token_data_from_api["RAW"]["ETH"]["USD"]["PRICE"]
        },
        "Cardano": {
            "symbol": "ADA",
            "precio": token_data_from_api["RAW"]["ADA"]["USD"]["PRICE"]
        },
        "Polygon": {
            "symbol": "MATIC",
            "precio": token_data_from_api["RAW"]["MATIC"]["USD"]["PRICE"]
        },
        "VectorSpace_AI": {
            "symbol": "VXV",
            "precio": token_data_from_api["RAW"]["VXV"]["USD"]["PRICE"]
        },
        "ShibaInu": {
            "symbol": "SHIB",
            "precio": token_data_from_api["RAW"]["SHIB"]["USD"]["PRICE"]
        },
        "PancakeSwapp": {
            "symbol": "CAKE",
            "precio": token_data_from_api["RAW"]["CAKE"]["USD"]["PRICE"]
        }
    }

    build_cripto_card(info_criptos)

    for (key in info_criptos){ 
        // create endpoint
        token = info_criptos[key]["symbol"]
        endpoint_historical_data = config_endpoint_historical_data(config_app, token, 120)
        historical_data = await get_historical_data(endpoint_historical_data)
        create_chart(historical_data["fechas"], historical_data["precios"], key)
    }   
}
main()