import { useEffect } from "react"
import ListItems from "./ListItems"

const ListingWrapper = ({data}) => {

    useEffect(()=> {
        console.log(data.length)
    }, [])

  return (
    <div className="table_body">
        {
            data?.map((el, index)=> <ListItems data={el} key={`symb-key${index}`}/>)
        }
    </div>
  )
}

export default ListingWrapper