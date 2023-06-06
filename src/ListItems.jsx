import { useEffect, useState } from "react"
import { api } from "./App";

const ListItems = ({data}) => {

    useEffect(()=> {
        console.log(data)
    }, [data])

  return (
    <div className="table_body_item">
        <div className="h_item">{data?.display_name}</div>
        <div className="h_item">{data?.bid.toFixed(4)}</div>
        <div className={`h_item ${data?.average < 0 ? 'minus_' : 'plus_'}`}>{data?.average}</div>
    </div>
  )
}

export default ListItems 