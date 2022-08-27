// funcion para crear el grafico
export async function create_basic_line_chart(fechas, precios, token, num_dias) {
    let chart = document.querySelector(`#chart_${token}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token} Vs USD ultimos ${num_dias} dias`,
        data: precios,
        borderColor: '#FFA024',
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
//funcion para crear el grafico especificando el ID
let historic_chart_by_id
export async function create_price_line_chart(fechas, precios, token_symbol, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token_symbol} Vs USD ultimos ${num_dias} dias`,
        data: precios,
        borderColor: '#FFA024',
        borderWidth: 3,
    }
    if (historic_chart_by_id){
        historic_chart_by_id.destroy()
    }
    historic_chart_by_id = new Chart(chart, {
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
let historic_detailed_chart_price
export async function create_price_detailed_line_chart(fechas, precios, token_symbol, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token_symbol} Vs USD ultimos ${num_dias} dias`,
        data: precios,
        borderColor: '#FFA024',
        borderWidth: 3,
    }
    if (historic_detailed_chart_price){
        historic_detailed_chart_price.destroy()        
    }
    historic_detailed_chart_price = new Chart(chart, {
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
let historic_chart_vol_fiat
export async function create_volume_fiat_detailed_line_chart(fechas, vol_values, token_symbol, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token_symbol} Vs USD ultimos ${num_dias} dias`,
        data: vol_values,
        borderColor: '#f0ad4e',
        borderWidth: 10,
    }
    if (historic_chart_vol_fiat){
        historic_chart_vol_fiat.destroy()
    }
    historic_chart_vol_fiat = new Chart(chart, {
        type: "bar",
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
let historic_chart_vol_cripto
export async function create_volume_cripto_detailed_line_chart(fechas, vol_values, token_symbol, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token_symbol} Vs USD ultimos ${num_dias} dias`,
        data: vol_values,
        borderColor: '#f0ad4e',
        borderWidth: 10,
    }
    if (historic_chart_vol_cripto){
        historic_chart_vol_cripto.destroy()
    }
    historic_chart_vol_cripto = new Chart(chart, {
        type: "bar",
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