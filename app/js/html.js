export async function hello_world(){
    console.log("Hola mundo...")
}

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
    p1.setAttribute("class", "fs-2 ls-2")
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
    a_modal.setAttribute("href", "#exampleModal")
    a_modal.setAttribute("data-toggle", "modal")
    a_modal.setAttribute("data-backdrop", "static")
    let canvas = document.createElement("canvas")
    canvas.setAttribute("id", `chart_${token_symbol}`)
    canvas.setAttribute("class", token_symbol)
    canvas.setAttribute("name", "grafico")
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
    p1.setAttribute("class", "fs-2 ls-2")
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
    a_modal.setAttribute("href", "#exampleModal")
    a_modal.setAttribute("data-toggle", "modal")
    a_modal.setAttribute("data-backdrop", "static")
    let canvas = document.createElement("canvas")
    canvas.setAttribute("id", `chart_${info_token_from_api.RAW[`${token_symbol}`].USD.FROMSYMBOL}`)
    canvas.setAttribute("class", info_token_from_api.RAW[`${token_symbol}`].USD.FROMSYMBOL)
    canvas.setAttribute("name", "grafico")
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
    // check if the card reference is the last
    let card_ref = document.querySelector(`#card_info_${token_ref}`)
    if (card_ref) {
        contenedor.insertBefore(div1, card_ref)
    } else {
        contenedor.append(div1)
    }
}

// funcion para crear las opciones de temporalidad en que se mostraran las graficas.
export async function create_temporalidad_options(_config_app) {
    let seccion_temporalidades = document.querySelector("#seccion_temporalidades")
    let temporalidades = _config_app.temporalidades
    for (let temporalidad in temporalidades) {
        let dias = temporalidades[temporalidad]
        let div = document.createElement("div")
        div.setAttribute("class", "form-check form-check-inline")
        let input = document.createElement("input")
        input.setAttribute("class", "form-check-input")
        input.setAttribute("type", "radio")
        input.setAttribute("name", "temporalidad")
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
        seccion_temporalidades.append(div)
    }
    let radio_default = document.getElementById(`${_config_app.temporalidad_default}d`)
    radio_default.checked = true
}