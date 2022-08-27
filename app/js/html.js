// funcion par creat la seccion de los logos del archivo HTML
export async function create_section_logos(symbol, logos_path, id_seccion_to_put_in) {
    // get the container en donde se pondran los logos
    let contenedor = document.querySelector(`#${id_seccion_to_put_in}`)
    // configuracion del logo dentro de la seccion de logos
    let div = document.createElement("div")
    div.setAttribute("class", "col-4 col-lg-auto mt-5 mt-lg-0")
    let img = document.createElement("img")
    img.setAttribute("src", `${logos_path}/${symbol}.png`)
    img.setAttribute("id", `img_${symbol}`)
    img.style.height = "30px"
    div.append(img)
    contenedor.append(div)
}
// funcion para crear el criptocard
export async function create_criptocard(token_symbol, PRICE, HIGH24HOUR, LOW24HOUR, MKTCAP, id_cards_container) {
    // div1contenendor principal
    let contenedor = document.querySelector(`#${id_cards_container}`)
    // div principal
    let div1 = document.createElement("div")
    div1.setAttribute("class", "col-sm-9 col-md-4 mt-3")
    div1.setAttribute("id", `card_info_${token_symbol}`)
    // div2
    let div2 = document.createElement("div")
    div2.setAttribute("class", "py-5 px-4 px-md-3 px-lg-4 rounded-1 bg-800 plans-cards mt-0")
    div2.setAttribute("id", `info_${token_symbol}`)
    // p1
    let p1 = document.createElement("p")
    p1.setAttribute("class", "fs-2 ls-2 text-warning")
    // text
    let criptomoneda_text = document.createTextNode(`${token_symbol}`)
    let h1 = document.createElement("h1")
    // h1
    h1.setAttribute("class", "display-7 ls-3")
    let span1 = document.createElement("span")
    // span
    span1.setAttribute("class", "text-600")
    let signo_dolar = document.createTextNode("$ ")
    // precio
    let precio = document.createTextNode(`${PRICE}`)
    // canvas
    // link when canvas is clicked
    let a_modal = document.createElement("a")
    a_modal.setAttribute("href", "#modal_detailed_info")
    a_modal.setAttribute("data-toggle", "modal")
    a_modal.setAttribute("data-backdrop", "static")
    let canvas = document.createElement("canvas")
    canvas.setAttribute("id", `chart_${token_symbol}`)
    canvas.setAttribute("class", token_symbol)
    canvas.setAttribute("name", "grafico")
    canvas.style.width = '100%';
    canvas.style.height = '100%';    
    // ul
    let ul = document.createElement("ul")
    ul.setAttribute("class", "mt-5 ps-0")
    // li
    let li1 = document.createElement("li")
    li1.setAttribute("class", "pricing-lists")
    let _HIGH24HOUR = document.createTextNode(`High 24H: ${HIGH24HOUR}`)
    let li2 = document.createElement("li")
    li2.setAttribute("class", "pricing-lists")
    let _LOW24HOUR = document.createTextNode(`Low 24H: ${LOW24HOUR}`)
    let li3 = document.createElement("li")
    li3.setAttribute("class", "pricing-lists")
    let _MKTCAP = document.createTextNode(`Market Cap: ${MKTCAP}`)
    let hr = document.createElement("hr")
    // link to ingo
    hr.setAttribute("class", "hr mt-6 text-1000")
    let link = document.createElement("a")
    link.setAttribute("href", `https://www.cryptocompare.com/coins/${token_symbol}/overview`)
    link.setAttribute("target", "_blank")
    // boton
    let boton = document.createElement("button")
    boton.setAttribute("class", "btn btn-gray mt-4")
    // span2
    let span_yellow = document.createElement("span")
    span_yellow.setAttribute("class", "text-warning")
    let i_mas_info = document.createElement("i")
    i_mas_info.setAttribute("class", "fa-solid fa-circle-plus")
    let texto_boton = document.createTextNode("Mas Informacion ")
    // config html
    p1.append(criptomoneda_text)
    span1.append(signo_dolar)
    h1.append(span1)
    h1.append(precio)
    // ul
    li1.append(_HIGH24HOUR)
    li2.append(_LOW24HOUR)
    li3.append(_MKTCAP)
    ul.append(li1, li2, li3)
    // boton
    boton.append(texto_boton)
    span_yellow.append(i_mas_info)
    boton.append(span_yellow)
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
    // addd to main container
    contenedor.append(div1)
}
// funcion para crear los checkbox
export async function create_checkbox_by_token(token_symbol, id_seccion_checkbox_token) {
    let seccion_checkbox_token = document.querySelector(`#${id_seccion_checkbox_token}`)
    // div
    let div_checkbox = document.createElement("div")
    div_checkbox.setAttribute("class", "form-check form-check-inline")
    div_checkbox.setAttribute("id", `div_check_${token_symbol}`)
    // input
    let input_checkbox = document.createElement("input")
    input_checkbox.setAttribute("class", "form-check-input")
    input_checkbox.setAttribute("type", "checkbox")
    input_checkbox.setAttribute("name", "select_criptos_to_show")
    input_checkbox.setAttribute("id", `check_${token_symbol}`)
    input_checkbox.setAttribute("value", token_symbol)
    input_checkbox.checked = true
    // label
    let label_checkbox = document.createElement("label")
    label_checkbox.setAttribute("class", "form-check-label")
    label_checkbox.setAttribute("for", `check_${token_symbol}`)
    // text
    let checkbox_text = document.createTextNode(token_symbol)
    // config html
    div_checkbox.append(input_checkbox)
    label_checkbox.append(checkbox_text)
    div_checkbox.append(label_checkbox)
    seccion_checkbox_token.append(div_checkbox)
}
//funcion para contruir la cripto una card independiente, con esta funcion se crea la criptocard cuando se hae click sobre un checkboox
export async function create_new_criptocard(info_token_from_api, token_symbol, token_ref) {
    // div1contenendor principal
    let contenedor = document.querySelector("#container_criptocards")
    // div principal
    let div1 = document.createElement("div")
    div1.setAttribute("class", "col-sm-9 col-md-4 mt-3")
    div1.setAttribute("id", `card_info_${info_token_from_api.RAW[`${token_symbol}`].USD.FROMSYMBOL}`)
    // div2
    let div2 = document.createElement("div")
    div2.setAttribute("class", "py-5 px-4 px-md-3 px-lg-4 rounded-1 bg-800 plans-cards mt-0")
    div2.setAttribute("id", `info_${info_token_from_api.RAW[`${token_symbol}`].USD.FROMSYMBOL}`)
    // p1
    let p1 = document.createElement("p")
    p1.setAttribute("class", "fs-2 ls-2 text-warning")
    // text
    let criptomoneda_text = document.createTextNode(`${info_token_from_api.RAW[`${token_symbol}`].USD.FROMSYMBOL}`)
    let h1 = document.createElement("h1")
    // h1
    h1.setAttribute("class", "display-7 ls-3")
    let span1 = document.createElement("span")
    // span
    span1.setAttribute("class", "text-600")
    let signo_dolar = document.createTextNode("$ ")
    // precio
    let precio = document.createTextNode(`${info_token_from_api.RAW[`${token_symbol}`].USD.PRICE}`)
    // canvas
    // link when canvas is clicked
    let a_modal = document.createElement("a")
    a_modal.setAttribute("href", "#modal_detailed_info")
    a_modal.setAttribute("data-toggle", "modal")
    a_modal.setAttribute("data-backdrop", "static")
    let canvas = document.createElement("canvas")
    canvas.setAttribute("id", `chart_${info_token_from_api.RAW[`${token_symbol}`].USD.FROMSYMBOL}`)
    canvas.setAttribute("class", info_token_from_api.RAW[`${token_symbol}`].USD.FROMSYMBOL)
    canvas.setAttribute("name", "grafico")
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ul
    let ul = document.createElement("ul")
    ul.setAttribute("class", "mt-5 ps-0")
    // li
    let li1 = document.createElement("li")
    li1.setAttribute("class", "pricing-lists")
    let HIGH24HOUR = document.createTextNode(`High 24H: ${info_token_from_api.DISPLAY[`${token_symbol}`].USD.HIGH24HOUR}`)
    let li2 = document.createElement("li")
    li2.setAttribute("class", "pricing-lists")
    let LOW24HOUR = document.createTextNode(`Low 24H: ${info_token_from_api.DISPLAY[`${token_symbol}`].USD.LOW24HOUR}`)
    let li3 = document.createElement("li")
    li3.setAttribute("class", "pricing-lists")
    let MKTCAP = document.createTextNode(`Market Cap: ${info_token_from_api.DISPLAY[`${token_symbol}`].USD.LOW24HOUR}`)
    let hr = document.createElement("hr")
    // link to ingo
    hr.setAttribute("class", "hr mt-6 text-1000")
    let link = document.createElement("a")
    link.setAttribute("href", `https://www.cryptocompare.com/coins/${token_symbol}/overview`)
    link.setAttribute("target", "_blank")
    // boton
    let boton = document.createElement("button")
    boton.setAttribute("class", "btn btn-gray mt-4")
    // span2
    let span_yellow = document.createElement("span")
    span_yellow.setAttribute("class", "text-warning")
    let i_mas_info = document.createElement("i")
    i_mas_info.setAttribute("class", "fa-solid fa-circle-plus")
    let texto_boton = document.createTextNode("Mas Informacion ")
    // config html
    p1.append(criptomoneda_text)
    span1.append(signo_dolar)
    h1.append(span1)
    h1.append(precio)
    // ul
    li1.append(HIGH24HOUR)
    li2.append(LOW24HOUR)
    li3.append(MKTCAP)
    ul.append(li1, li2, li3)
    // boton
    boton.append(texto_boton)
    span_yellow.append(i_mas_info)
    boton.append(span_yellow)
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
    // check if the card reference is the last
    let card_ref = document.querySelector(`#card_info_${token_ref}`)
    if (card_ref) {
        contenedor.insertBefore(div1, card_ref)
    } else {
        contenedor.append(div1)
    }
}
// funcion para crear las opciones de temporalidad en que se mostraran las graficas.
export async function create_temporalidad_options(config_app, id_contenedor_temporalidades) {
    let contenedor_temporalidades = document.querySelector(`#${id_contenedor_temporalidades}`)
    let temporalidades = config_app.temporalidades
    for (let temporalidad in temporalidades) {
        let dias = temporalidades[temporalidad]
        let div = document.createElement("div")
        div.setAttribute("class", "form-check form-check-inline")
        let input = document.createElement("input")
        input.setAttribute("class", "form-check-input")
        input.setAttribute("type", "radio")
        input.setAttribute("name", "temporalidad_options")
        input.setAttribute("value", `${dias}`)
        input.setAttribute("id", `${dias}d`)
        let label = document.createElement("label")
        label.setAttribute("class", "form-check-label")
        label.setAttribute("for", `${dias}d`)
        let text = document.createTextNode(`${dias} dias`)
        // build html
        div.append(input)
        label.append(text)
        div.append(label)
        contenedor_temporalidades.append(div)
    }
    let radio_default = document.getElementById(`${config_app.temporalidad_default}d`)
    radio_default.checked = true
}
// funcion para crear las opciones de temporalidad para el modal con la informacion detallada adicional
// export async function create_temporalidad_options_detailed_chart(config_app, id_seccion_temporalidades2) {
//     let seccion_temporalidades2 = document.querySelector(`#${id_seccion_temporalidades2}`)
//     // check if the container temporalidades exists
//     let check_seccion_temporalidades2 = document.querySelector("#temporalidad_options_detailed_chart")
//     if (check_seccion_temporalidades2 != null) {
//         // if exists, remove then
//         check_seccion_temporalidades2.remove()
//     }
//     let create_temporalidad_options_detailed_chart = document.createElement("div")
//     create_temporalidad_options_detailed_chart.setAttribute("id", "temporalidad_options_detailed_chart")
//     let temporalidades = config_app.temporalidades
//     for (let temporalidad in temporalidades) {
//         let dias = temporalidades[temporalidad]
//         let div = document.createElement("div")
//         div.setAttribute("class", "form-check form-check-inline")
//         let input = document.createElement("input")
//         input.setAttribute("class", "form-check-input")
//         input.setAttribute("type", "radio")
//         input.setAttribute("name", "temporalidad_options2")
//         input.setAttribute("value", `${dias}`)
//         input.setAttribute("id", `_${dias}d`)
//         let label = document.createElement("label")
//         label.setAttribute("class", "form-check-label")
//         label.setAttribute("for", `_${dias}d`)
//         let text = document.createTextNode(`${dias} dias`)
//         // build html
//         div.append(input)
//         label.append(text)
//         div.append(label)
//         create_temporalidad_options_detailed_chart.append(div)
//     }
//     seccion_temporalidades2.append(create_temporalidad_options_detailed_chart)
//     let radio_default = document.getElementById(`_${config_app.temporalidad_default}d`)
//     radio_default.checked = true
// }
// metod para la creacion del modal con los detalles del asset
export async function modal_detailed_info_by_token(info_token, token_symbol) {
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
        h5.setAttribute("class", "moddal-title text-warning")
        let nombre_criptomoneda = document.createTextNode(info_token.FROMSYMBOL)
        // div para el char
        let div_chart = document.createElement("div")
        div_chart.setAttribute("class", "zona_chart_details")
        div_chart.setAttribute("name", token_symbol)
        // grafico conla informacion del precio
        let chart_price = document.createElement("canvas")
        chart_price.setAttribute("id", "chart_detailed_info")
        chart_price.style.width = '100%';
        chart_price.style.height = '100%';
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
        div_chart.append(chart_price)
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
// crear el canvas para la seccion del modal con la informacion detallada
export async function crear_canvas_detailed_info(chart_id) {
    let chart_detailed_info = document.createElement("canvas")
    chart_detailed_info.setAttribute("id", chart_id)
    chart_detailed_info.style.width = '100%';
    chart_detailed_info.style.height = '100%';
    return chart_detailed_info
}
//funcion para crear los detaales graficos del activo
export async function create_detailed_charts(token_symbol) {
    let seccion_charts_precio_volumen = document.querySelector("#seccion_charts_precio_volumen")
    // check if contenedor_charts_precio_volumen exists, if exists remove then.
    let check_contenedor_charts_precio_volumen = document.querySelector("#contenedor_charts_precio_volumen")
    if (check_contenedor_charts_precio_volumen != null) {
        check_contenedor_charts_precio_volumen.remove()
    }
    // create contenedo contenedor_charts_precio_volumen
    let contenedor_charts_precio_volumen = document.createElement("div")
    contenedor_charts_precio_volumen.setAttribute("id", "contenedor_charts_precio_volumen")

    let div_grafico_precio = document.createElement("div")
    let label_graico_precio = document.createTextNode("Precio: " + token_symbol)
    let canvas_grafico_precio = document.createElement("canvas")
    canvas_grafico_precio.setAttribute("id", `chart_detailed_info_price_${token_symbol}`)
    canvas_grafico_precio.style.width = '100%';
    canvas_grafico_precio.style.height = '100%';

    let div_grafico_volumen_fiat = document.createElement("div")
    let label_grafico_volumen_fiat = document.createTextNode("Grafico Volumen Fiat: " + token_symbol)
    let canvas_grafico_volumen_fiat = document.createElement("canvas")
    canvas_grafico_volumen_fiat.setAttribute("id", `chart_detailed_info_vol_fiat_${token_symbol}`)
    canvas_grafico_volumen_fiat.style.width = '100%';
    canvas_grafico_volumen_fiat.style.height = '100%';

    let div_grafico_volumnen_cripto = document.createElement("div")
    let label_grafico_volumen_cripto = document.createTextNode("Grafico Volumen cripto: " + token_symbol)
    let canvas_grafico_volumen_cripto = document.createElement("canvas")
    canvas_grafico_volumen_cripto.setAttribute("id", `chart_detailed_info_vol_cripto_${token_symbol}`)
    canvas_grafico_volumen_cripto.style.width = '100%';
    canvas_grafico_volumen_cripto.style.height = '100%';

    div_grafico_precio.append(label_graico_precio, canvas_grafico_precio)
    div_grafico_volumen_fiat.append(label_grafico_volumen_fiat, canvas_grafico_volumen_fiat)
    div_grafico_volumnen_cripto.append(label_grafico_volumen_cripto, canvas_grafico_volumen_cripto)

    contenedor_charts_precio_volumen.append(div_grafico_precio, div_grafico_volumen_fiat, div_grafico_volumnen_cripto)
    seccion_charts_precio_volumen.append(contenedor_charts_precio_volumen)


}