import { useEffect } from "react"
import ListItems from "./ListItems"

const ListingWrapper = ({data}) => {
  return (
    <div className="table_body">
        {
            data?.map((el, index)=> <ListItems data={el} key={`symb-key${index}`}/>)
        }
    </div>
  )
}

export default ListingWrapper