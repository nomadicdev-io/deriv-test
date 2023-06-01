import { useEffect, useState } from "react"
import { api } from "./App";

const ListItems = ({data}) => {

    const [tick, setTick] = useState();
    const [history, setHistory] = useState();

    const getTick = async ()=> {
        try{
            const tick = await api.subscribe({ticks: data.symbol});
            const his = await api.ticksHistory({count: 10, style: 'candles', start: 1, end: 'latest', ticks_history: data.symbol, granularity: 14400})
            if(tick){
                tick.subscribe((event)=> {
                    setTick(event.tick)
                })

                setHistory({
                    history: his.candles
                })

            }               
        }catch(error){
            console.log(error)
        }
    }

    const getAverage = async ()=> {
        if(history){
            let average = (tick.bid - history.history[0].close) / ((tick.bid + history.history[0].close)/2)
            let v =  (average*100).toFixed(5)
            setHistory({
                ...history,
                average: v
            })
        }
    }

    useEffect(()=> {
        getTick();
    }, [])

    useEffect(()=> {
        getAverage();
    }, [tick])

  return (
    <div className="table_body_item">
        <div className="h_item">{data.display_name}</div>
        <div className={`h_item`}>{tick?.bid.toFixed(4)}</div>
        <div className={`h_item ${history?.average < 0 ? 'minus_' : 'plus_'}`}>{history?.average}</div>
    </div>
  )
}

export default ListItems 