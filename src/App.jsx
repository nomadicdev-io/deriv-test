import { useEffect, useState } from 'react'
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { atom, useAtom } from 'jotai';
import './App.css'
import ListingWrapper from './ListingWrapper';

export const api = new DerivAPIBasic({endpoint: 'ws.binaryws.com', app_id: 1089});

const activeSymbols = atom({
  data: [],
  isCompleted: false,
  error: []
})

function App() {
  
  const [data, setData] = useAtom(activeSymbols);
  const [x, setX] = useState(null)

  const getActiveSymbols = async ()=> {
    try{
      const res = await api.activeSymbols({active_symbols: 'brief',product_type: 'basic'});
      let tickArray = []
      setX(res.active_symbols)


      if(!res.error){

        res.active_symbols.map(async (item, index)=> {

          try{
            if(item.exchange_is_open){
              const symbol = item.symbol;
              const tick = await api.subscribe({ticks: symbol});

              tick.subscribe((event)=> {
                  tickArray[index] = {index: index, price: event.tick.bid}
              })
            }
          }catch(error){
            console.log(error)
          }
          // 
          // const his = await api.ticksHistory({
          //   ticks_history: item.symbol,
          //   count: 20, 
          //   style: 'candles', 
          //   start: 1, 
          //   end: 'latest', 
          //   granularity: 7200
          // })

          // if(his){
          //   let prices = [...his.candles.map(x=> x.close)]
          //   let average = (prices[prices?.length - 1] - prices[0]) / ((prices[prices?.length - 1] + prices[0])/2)
          // }

         
          // }    

        })

        console.log(tickArray)
        setX(x)

      }

    }catch(error) {
      console.log(error)
      setData({
        ...data,
        error: 'Some Error',
        isCompleted: true,
      })
    }
  }

  useEffect(()=> {
    getActiveSymbols();
    console.log(data)
  }, [data])

  return (
    <>
     <div className='container_'>
        <div className='table_wrapper'>
          <div className='table_header'>
            <div className='h_item'>Name</div>
            <div className='h_item'>Price</div>
            <div className='h_item'>24h Change</div>
          </div>
          {
            data.isCompleted &&
            <>
              {
              //  <ListingWrapper data={data.data}/>
              }
            </>
          }
        </div>
     </div>
    </>
  )
}

export default App
