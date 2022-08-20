async function main() {
    const html = await import("./html.js")
    const graficos = await import("./graficos.js")
    const config = await import("./config.js")
    const API = await import("./API.js")

    let _config_app = config._config_app
    let endpoint_tokens_info = API.endpoint_tokens_info(_config_app.tokens, _config_app.data_source.cryptocompare.api_key)
    let token_data_from_api = await API.token_data_from_api(endpoint_tokens_info)
    let info_by_token = config.info_by_token(token_data_from_api)
    // inicio del programa, se crean las configuraciones y datos inicales 
    info_by_token.forEach(async (info_token) => {
        // create logos
        html.create_section_logos(info_token.symbol, _config_app.path_logos, "contenedor_logos")
        // create the criptocards
        html.create_criptocard(info_token.symbol, info_token.info_precio.PRICE, info_token.info_precio.HIGH24HOUR, info_token.info_precio.LOW24HOUR, info_token.info_precio.MKTCAP, "container_criptocards")
        // create the checbox
        html.create_checkbox_by_token(info_token.symbol, "seccion_checkbox_token")
        // config chart 
        let endpoint_historical_data = API.endpoint_historical_data(_config_app.data_source.cryptocompare.api_key, info_token.symbol, _config_app.temporalidad_default)
        let historical_data = await API.historical_data(endpoint_historical_data)
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
                let endpoint_info_token = API.endpoint_token_info(_config_app, token_symbol)
                let info_token_from_api = await API.token_data_from_api(endpoint_info_token)
                html.create_new_criptocard(info_token_from_api, token_symbol, token_ref)
                // get historical data for chart criptocard
                let endpoint_historical_data = API.endpoint_historical_data(_config_app.data_source.cryptocompare.api_key, token_symbol, _config_app.temporalidad_default)
                let historical_data = await API.historical_data(endpoint_historical_data)
                graficos.create_new_chart(historical_data["fechas"], historical_data["precios"], token_symbol, 30, `chart_${token_symbol}`)
                // estas lineas tengo que mirar la forma de hacer que no se vean tan feas aqui, buscar la formar de crear un metodo
                let charts = document.querySelectorAll('canvas[name="grafico"]')
                charts.forEach((chart) => {
                    chart.addEventListener("click", async (evento) => {
                        let canvas_node_id = evento.target.id
                        let canvas_node = document.querySelector(`#${canvas_node_id}`)
                        let token_symbol = canvas_node.className
                        let endpoint_info_token = API.endpoint_token_info(_config_app, token_symbol)
                        let info_token_from_api = await API.token_data_from_api(endpoint_info_token)
                        let info_token = info_token_from_api.DISPLAY[`${token_symbol}`].USD
                        html.info_token_modal(info_token, token_symbol)
                        // creacion del grafico
                        let endpoint_historical_data = API.endpoint_historical_data(_config_app.data_source.cryptocompare.api_key, token_symbol, _config_app.temporalidad_default)
                        let historical_data = await API.historical_data(endpoint_historical_data)
                        graficos.create_new_chart(historical_data["fechas"], historical_data["precios"], token_symbol, 30, "chart_detailed_info")
                    })
                })
            }
            if (!is_checked) {
                let card_to_delete = document.querySelector(`#card_info_${token_symbol}`)
                if (card_to_delete) {
                    card_to_delete.remove()
                }
            }
        })
    })
    // eventos cuando se haga click dentro de alguno de los graficos, abre un modal con informacion detallada
    let charts = document.querySelectorAll('canvas[name="grafico"]')
    charts.forEach((chart) => {
        chart.addEventListener("click", async (evento) => {
            let canvas_node_id = evento.target.id
            let canvas_node = document.querySelector(`#${canvas_node_id}`)
            let token_symbol = canvas_node.className
            let endpoint_info_token = API.endpoint_token_info(_config_app, token_symbol)
            let info_token_from_api = await API.token_data_from_api(endpoint_info_token)
            let info_token = info_token_from_api.DISPLAY[`${token_symbol}`].USD
            html.info_token_modal(info_token, token_symbol)
            // creacion del grafico
            let endpoint_historical_data = API.endpoint_historical_data(_config_app.data_source.cryptocompare.api_key, token_symbol, _config_app.temporalidad_default)
            let historical_data = await API.historical_data(endpoint_historical_data)
            graficos.create_new_chart(historical_data["fechas"], historical_data["precios"], token_symbol, 30, "chart_detailed_info")
        })

    })
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
            let new_chart_detailed_info = await html.crear_canvas_detailed_info("chart_detailed_info")
            zona_chart_details.append(new_chart_detailed_info)
            let endpoint_historical_data = API.endpoint_historical_data(_config_app, token, num_dias)
            let historical_data = await API.historical_data(endpoint_historical_data)
            graficos.create_new_chart(historical_data["fechas"], historical_data["precios"], token, num_dias, "chart_detailed_info")
        })
    })
}
main()

window.onload = _ => {
    // $("#modal_mensaje_de_desarrollador").modal()
}