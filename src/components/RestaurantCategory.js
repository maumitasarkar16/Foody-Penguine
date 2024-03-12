import { useState } from "react"
import ItemList from "./ItemList"

const RestaurantCategory = ({resData, showItems, setShowIndex}) => {
    console.log("resData", resData)

   // const [showItems, setShowItems] = useState(false) --- uncontrolled component
   

    const handleClick = () => {
        console.log("clicked")
        setShowIndex()
        //setShowItems(!showItems) ------ updating its own state
    }

    return (
        <div>
            <div  className="w-6/12 m-auto px-[15px] py-[15px]  bg-gray-50 shadow-lg border-b-2">
                <div className="justify-between flex cursor-pointer" onClick={handleClick}>
                    <span><h2 className="font-bold">{resData.title} ({resData.itemCards.length}) </h2></span>
                    <span><img className="h-[20px]" src={require("../assets/images/down_arrow.svg")} alt="arrow" /></span>
                    
                </div>

                {/* <ul>
                    { 
                        resData.itemCards.map( (item) => (
                            <ItemList items={item} />
                        )) 
                    } 
                </ul> */}
                { showItems && <ItemList items={resData.itemCards} /> }
            </div>
            
        </div>
    )
}

export default RestaurantCategory