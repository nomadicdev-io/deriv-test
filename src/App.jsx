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
  
  const getActiveSymbols = async ()=> {
    
    let symbolsArray = [];

    try{
      const res = await api.activeSymbols({active_symbols: 'brief',product_type: 'basic'});

      if(res){
        res.active_symbols.map(async (el)=> {
          try {
            if(el.market == 'forex'){
              setData({
                ...data,
                data: data.data.push(el)
              })
            }
          }catch(error){
            console.log(error)
            setData({
              ...data,
              error: 'Some Error',
              isCompleted: true,
            })
          }
        });
      }

      setData({
        ...data,
        symbols: symbolsArray,
        isCompleted: true
      })
      

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
    
  }, [])

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
                <ListingWrapper data={data.data}/>
              }
            </>
          }
        </div>
     </div>
    </>
  )
}

export default App
