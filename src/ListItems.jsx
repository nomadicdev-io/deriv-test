import { useEffect, useState } from "react"
import { api } from "./App";

const ListItems = ({data}) => {

    useEffect(()=> {
        console.log(data)
    }, [data])

  return (
    <div className="table_body_item">
       
    </div>
  )
}

export default ListItems 