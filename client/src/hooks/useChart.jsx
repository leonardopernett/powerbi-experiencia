import { useState } from "react"
import { useEffect } from "react"

const getData = async () => {
    const response = await fetch('https://powerbi-experiencia.fly.dev/api/experience')
    const data = await response.json()
    return  data.results.features[1].additionalInfo.usage 
}

const getData2 = async () => {
  const response = await fetch('https://powerbi-experiencia.fly.dev/api/cxm')
  const data = await response.json()
  console.log(data)
  return  data.results.features[1].additionalInfo.usage 
}

export default function useChart() {
    
  const [data, setData]   = useState(null)
  const [data2, setData2] = useState(null)

  useEffect( () => {
    getData()
      .then(  (res)  => setData(res))
    getData2()
    .then( (res) => setData2(res))
  }, [])
      
  return {data, data2}
}
