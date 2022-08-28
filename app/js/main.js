async function main() {
    const html = await import("./html.js")
    const graficos = await import("./graficos.js")
    const config = await import("./config.js")
    const API = await import("./API.js")

    let config_app = config.config_app
    let endpoint_tokens_info = API.endpoint_tokens_info(config_app.tokens, config_app.data_source.cryptocompare.api_key)
    let token_data_from_api = await API.token_data_from_api(endpoint_tokens_info)
    let info_by_token = config.info_by_token(token_data_from_api)
    // inicio del programa, se crean las configuraciones y datos inicales 
    info_by_token.forEach(async (info_token) => {
        // create logos
        html.create_section_logos(info_token.symbol, config_app.path_logos, "contenedor_logos")
        // create the criptocards
        html.create_criptocard(info_token.symbol, info_token.info_precio.PRICE, info_token.info_precio.HIGH24HOUR, info_token.info_precio.LOW24HOUR, info_token.info_precio.MKTCAP, "container_criptocards")
        // create the checbox
        html.create_checkbox_by_token(info_token.symbol, "seccion_checkbox_token")
        // config chart 
        let endpoint_historical_data = API.endpoint_historical_data(config_app.data_source.cryptocompare.api_key, info_token.symbol, config_app.temporalidad_default)
        let historical_data = await API.historical_data(endpoint_historical_data)
        graficos.create_basic_line_chart(historical_data["fechas"], historical_data["precios"], info_token.symbol, config_app.temporalidad_default)
    })
    // get elablelement for each token available
    let inputs_checks = document.querySelectorAll('input[name="select_criptos_to_show"]')
    let tokens = []
    for (let i = 0; i < inputs_checks.length; i++) {
        tokens.push(inputs_checks[i].value)
    }
    // events when checks buttons is clicked
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
                let endpoint_info_token = API.endpoint_token_info(config_app, token_symbol)
                let info_token_from_api = await API.token_data_from_api(endpoint_info_token)
                html.create_new_criptocard(info_token_from_api, token_symbol, token_ref)
                // get historical data for chart criptocard
                let endpoint_historical_data = API.endpoint_historical_data(config_app.data_source.cryptocompare.api_key, token_symbol, config_app.temporalidad_default)
                let historical_data = await API.historical_data(endpoint_historical_data)
                graficos.create_price_line_chart(historical_data["fechas"], historical_data["precios"], token_symbol, 30, `chart_${token_symbol}`)
                //---
                // here was necessary repeat the code tha was used in events when chart is clicked
                let charts = document.querySelectorAll('canvas[name="grafico"]')
                charts.forEach((chart) => {
                    chart.addEventListener("click", async (evento) => {
                        let canvas_node_id = evento.target.id
                        let canvas_node = document.querySelector(`#${canvas_node_id}`)
                        // return the token symbol that was clicked
                        let token_symbol = canvas_node.className
                        // get info token from API 
                        let endpoint_info_token = API.endpoint_token_info(config_app, token_symbol)
                        let info_token_from_api = await API.token_data_from_api(endpoint_info_token)
                        let info_token = info_token_from_api.DISPLAY[`${token_symbol}`].USD
                        html.modal_detailed_info_by_token(info_token, token_symbol)
                        // creacion del grafico
                        let endpoint_historical_data = API.endpoint_historical_data(config_app.data_source.cryptocompare.api_key, token_symbol, config_app.temporalidad_default)
                        let historical_data = await API.historical_data(endpoint_historical_data)
                        graficos.create_price_line_chart(historical_data["fechas"], historical_data["precios"], token_symbol, 30, "chart_detailed_info")
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
    // events when chart is clicked
    let charts = document.querySelectorAll('canvas[name="grafico"]')
    charts.forEach((chart) => {
        chart.addEventListener("click", async (evento) => {
            let canvas_node = document.querySelector(`#${evento.target.id}`)
            // return the token symbol of chart that was clicked
            let token_symbol = canvas_node.className
            // get info token from API 
            let endpoint_info_token = API.endpoint_token_info(config_app, token_symbol)
            let info_token_from_api = await API.token_data_from_api(endpoint_info_token)
            let info_token = info_token_from_api.DISPLAY[`${token_symbol}`].USD
            html.modal_detailed_info_by_token(info_token, token_symbol)
            // creacion del grafico
            let endpoint_historical_data = API.endpoint_historical_data(config_app.data_source.cryptocompare.api_key, token_symbol, config_app.temporalidad_default)
            let historical_data = await API.historical_data(endpoint_historical_data)
            graficos.create_price_line_chart(historical_data["fechas"], historical_data["precios"], token_symbol, 30, "chart_detailed_info")

            // evento cuando se presione el boton de mas informacion
            let btn_mas_info = document.querySelector("#btn_mas_info")
            btn_mas_info.addEventListener("click", async _ => {
                let temporabilidad = document.querySelectorAll('input[name="temporalidad_options"]:checked')[0].value
                html.create_detailed_charts(token_symbol)
                // get the historical data
                let endpoint_historical_data_for_detailed_chart = API.endpoint_historical_data(config_app.data_source.cryptocompare.api_key, token_symbol, temporabilidad)
                let historical_data_for_detailed_chart = await API.historical_data(endpoint_historical_data_for_detailed_chart)
                // create charts price
                graficos.create_price_detailed_line_chart(historical_data_for_detailed_chart.fechas, historical_data_for_detailed_chart.precios, token_symbol, temporabilidad, `chart_detailed_info_price_${token_symbol}`)
                graficos.create_volume_fiat_detailed_line_chart(historical_data_for_detailed_chart.fechas, historical_data_for_detailed_chart.vol_in_fiat, token_symbol, temporabilidad, `chart_detailed_info_vol_fiat_${token_symbol}`)
                graficos.create_volume_cripto_detailed_line_chart(historical_data_for_detailed_chart.fechas, historical_data_for_detailed_chart.vol_in_cripto, token_symbol, temporabilidad, `chart_detailed_info_vol_cripto_${token_symbol}`)
                
                //get the historical data about social points
                let indice = config_app.tokens.indexOf(token_symbol)
                let token_id = config_app.tokens_id[indice]
                let endpoint_historical_social_data = API.endpoint_historical_social_data(config_app.data_source.cryptocompare.api_key, token_id, 500)
                let historical_soacial_data = await API.historical_soacial_data(endpoint_historical_social_data)
                // create charts about social
                graficos.create_social_points_detailed_line_chart(historical_soacial_data.fechas, historical_soacial_data.puntos, token_symbol, 500, `chart_punto_sociales_${token_symbol}`)

            })
            // cuando se preione el boton cerrar del modal con los charts detallados, borrar el contenedor de esos graficos
            let btn_cerrar_modal_info_cripto = document.querySelector("#btn_cerrar_modal_info_cripto")
            btn_cerrar_modal_info_cripto.addEventListener("click", _ => {
                // remover el contenedr con los grafido del precio y volumen del modal de mas informacion
                let contenedor_charts_precio_volumen = document.querySelector("#contenedor_charts_precio_volumen")
                if (contenedor_charts_precio_volumen != null) {
                    contenedor_charts_precio_volumen.remove()
                }
            })
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
    // eventos para  cuando hay cambios en los radio buttons de las teporabilidades en el modal con los detalles del precio
    html.create_temporalidad_options(config_app, "seccion_temporalidades")
    // events when temporalidad option is clicked
    let inputs_temporalidades = document.querySelectorAll('input[name="temporalidad_options"]')
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
            let endpoint_historical_data = API.endpoint_historical_data(config_app, token, num_dias)
            let historical_data = await API.historical_data(endpoint_historical_data)
            graficos.create_price_line_chart(historical_data["fechas"], historical_data["precios"], token, num_dias, "chart_detailed_info")
        })
    })
}
main()

window.onload = _ => {
    // $("#modal_mensaje_de_desarrollador").modal()
}