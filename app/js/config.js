// configuraciones generales para la aplicacion
export let config_app = {
    "tokens": ["BTC", "ETH", "ADA", "MATIC", "VXV", "SHIB", "CAKE", "VET", "TRX", "AXS"],
    "tokens_id" : [1182, 7605, 321992, 930246, 935961, 940776, 936880, 236131, 310829, 937569],
    "temporalidad_default": 30,
    "temporalidades": [10, 30, 60, 90],
    "path_logos": "template/img/logos/",
    "data_source": {
        "cryptocompare": {
            "url": "https://www.cryptocompare.com",
            "api_key": "99f1147d7e9a0f3b602f89fb553fa5c91885159c3397ab916a0e988777d18fc3"
        }
    }
}
// informacion de cada token configurado en la aplicacion
export let info_by_token = (token_data_from_api) => {
    let info_by_token = [
        {
            "nombre": "Bitcoin",
            "symbol": "BTC",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.BTC.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.BTC.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.BTC.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.BTC.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/BTC/overview/USDT"
            }
        },
        {
            "nombre": "Ethereum",
            "symbol": "ETH",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.ETH.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.ETH.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.ETH.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.ETH.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.ETH.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/ETH/overview/USDT"
            }
        },
        {
            "nombre": "Cardano",
            "symbol": "ADA",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.ADA.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.ADA.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.ADA.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.ADA.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.ADA.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/ADA/overview/USDT"
            }
        },
        {
            "nombre": "Polygon",
            "symbol": "MATIC",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.MATIC.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.MATIC.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.MATIC.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.MATIC.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.MATIC.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/MATIC/overview/USDT"
            }
        },
        {
            "nombre": "Shiba Inu",
            "symbol": "SHIB",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.SHIB.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.SHIB.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.SHIB.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.SHIB.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.BTC.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.SHIB.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/SHIB/overview/USDT"
            }
        },
        {
            "nombre": "Packae Swap",
            "symbol": "CAKE",
            "info_precio": {
                "PRICE": token_data_from_api.RAW.CAKE.USD.PRICE,
                "HIGH24HOUR": token_data_from_api.DISPLAY.CAKE.USD.HIGH24HOUR,
                "LOW24HOUR": token_data_from_api.DISPLAY.CAKE.USD.LOW24HOUR,
                "TOTALVOLUME24H": token_data_from_api.DISPLAY.CAKE.USD.TOTALVOLUME24H,
                "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.CAKE.USD.TOTALVOLUME24HTO,
                "MKTCAP": token_data_from_api.DISPLAY.CAKE.USD.MKTCAP,
                "data_source": "https://www.cryptocompare.com/coins/CAKE/overview/USDT"
            }
        },
        // {
        //     "nombre": "Vechain",
        //     "symbol": "VET",
        //     "info_precio": {
        //         "PRICE": token_data_from_api.RAW.VET.USD.PRICE,
        //         "HIGH24HOUR": token_data_from_api.DISPLAY.VET.USD.HIGH24HOUR,
        //         "LOW24HOUR": token_data_from_api.DISPLAY.VET.USD.LOW24HOUR,
        //         "TOTALVOLUME24H": token_data_from_api.DISPLAY.VET.USD.TOTALVOLUME24H,
        //         "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.VET.USD.TOTALVOLUME24HTO,
        //         "MKTCAP": token_data_from_api.DISPLAY.VET.USD.MKTCAP,
        //         "data_source": "https://www.cryptocompare.com/coins/VET/overview/USDT"
        //     }
        // },
        // {
        //     "nombre": "Tron",
        //     "symbol": "TRX",
        //     "info_precio": {
        //         "PRICE": token_data_from_api.RAW.TRX.USD.PRICE,
        //         "HIGH24HOUR": token_data_from_api.DISPLAY.TRX.USD.HIGH24HOUR,
        //         "LOW24HOUR": token_data_from_api.DISPLAY.TRX.USD.LOW24HOUR,
        //         "TOTALVOLUME24H": token_data_from_api.DISPLAY.TRX.USD.TOTALVOLUME24H,
        //         "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.TRX.USD.TOTALVOLUME24HTO,
        //         "MKTCAP": token_data_from_api.DISPLAY.TRX.USD.MKTCAP,
        //         "data_source": "https://www.cryptocompare.com/coins/TRX/overview/USDT"
        //     }
        // },
        // {
        //     "nombre": "Axie Infinity",
        //     "symbol": "AXS",
        //     "info_precio": {
        //         "PRICE": token_data_from_api.RAW.AXS.USD.PRICE,
        //         "HIGH24HOUR": token_data_from_api.DISPLAY.AXS.USD.HIGH24HOUR,
        //         "LOW24HOUR": token_data_from_api.DISPLAY.AXS.USD.LOW24HOUR,
        //         "TOTALVOLUME24H": token_data_from_api.DISPLAY.AXS.USD.TOTALVOLUME24H,
        //         "TOTALVOLUME24HTO": token_data_from_api.DISPLAY.AXS.USD.TOTALVOLUME24HTO,
        //         "MKTCAP": token_data_from_api.DISPLAY.AXS.USD.MKTCAP,
        //         "data_source": "https://www.cryptocompare.com/coins/AXS/overview/USDT"
        //     }
        // },
    ]
    return info_by_token
}