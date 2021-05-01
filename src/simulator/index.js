//==============================================================================
// Name:        simulator/index
// Project:     TuringTrader.js
// Description: simulator core.
// History:     FUB, 2021iv30, created
//==============================================================================

import { createTradingCalendarUS } from "./trading-calendar-us"

//import { loadData as _loadData } from "../data"
//import { clearCache, cacheData as _cacheData } from "./cache"

export const createSimulator = (algo) => {
    const data = {
        tradingCalendar: createTradingCalendarUS(),
    }

    //========== internal interface: methods called inside algorithms

    const internalInterface = {
        //----- properties
        get startDate() {
            return getProperty("startDate")
        },
        set startDate(d) {
            setProperty("startDate", d)
        },
        get endDate() {
            return getProperty("endDate")
        },
        set endDate(d) {
            setProperty("endDate", d)
        },
        get tradingDays() {
            const c = getProperty("tradingCalendar")
            c.startDate = getProperty("startDate")
            c.endDate = getProperty("endDate")
            return c.tradingDays
        },

        //----- methods
        // hoisting functions to provide access from everywhere
        getProperty: (name) => getProperty(name),
        setProperty: (name, value) => setProperty(name, value),
        info: (...args) => info(args),
    }

    const setProperty = (name, value) => data[name] = value
    const getProperty = (name) => data[name]
    const info = (args) => console.log("INFO: ", args)

    //========== external interface: methods called on simulator instance

    const externalInterface = {
        run: (sim) => run(sim),
        report: (sim) => report(sim),
    }

    const run = (sim) => algo.run(internalInterface)
    const report = (sim) => algo.report(internalInterface)

    return externalInterface
}

//==============================================================================
// end of file