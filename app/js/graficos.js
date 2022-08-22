// funcion para crear el grafico
export async function create_basic_line_chart(fechas, precios, token, num_dias) {
    let chart = document.querySelector(`#chart_${token}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token} Vs USD ultimos ${num_dias} dias`,
        data: precios,
        borderColor: '#f0ad4e',
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
export async function create_price_line_chart(fechas, precios, token_symbol, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token_symbol} Vs USD ultimos ${num_dias} dias`,
        data: precios,
        borderColor: '#f0ad4e',
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

export async function create_price_detailed_line_chart(fechas, precios, token_symbol, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token_symbol} Vs USD ultimos ${num_dias} dias`,
        data: precios,
        borderColor: '#f0ad4e',
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

export async function create_volume_fiat_detailed_line_chart(fechas, vol_values, token_symbol, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token_symbol} Vs USD ultimos ${num_dias} dias`,
        data: vol_values,
        borderColor: '#f0ad4e',
        borderWidth: 10,
    }
    const historic_chart = new Chart(chart, {
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

export async function create_volume_cripto_detailed_line_chart(fechas, vol_values, token_symbol, num_dias, canvas_id) {
    let chart = document.querySelector(`#${canvas_id}`)
    let labels = fechas
    let datos = {
        label: `Grafico de ${token_symbol} Vs USD ultimos ${num_dias} dias`,
        data: vol_values,
        borderColor: '#f0ad4e',
        borderWidth: 10,
    }
    const historic_chart = new Chart(chart, {
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