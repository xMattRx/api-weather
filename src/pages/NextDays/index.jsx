import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, GenericContainer } from '../../components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import MainNextDays from '../../components/MainNextDays'
import { nextDays } from '../../redux/dataSlice'

export default function CityWeather() {

  const {data, language, scale} = useSelector((state) => state)
  const dispatch = useDispatch()

  // console.log(data.nextDays)

  const addZero = (str) =>{
    if(str.length === 1){
      return `0${str}`
    }
  }

  const FiveDays = () =>{
    const arrayDate = []
    const today = new Date()
    const tomorrow = new Date(today)


    for (let index = 0; index < 5; index++) {
      tomorrow.setDate(tomorrow.getDate() + 1)
      let dayMonth = tomorrow.getDate()
      if(dayMonth === 1){
        tomorrow.setMonth(tomorrow.getMonth() + 1)
      }
      dayMonth = dayMonth.toString()
      let month = tomorrow.getMonth().toString()
      let year = tomorrow.getFullYear().toString()
      // let string = `${year}-${addZero(month)}-${addZero(dayMonth)}`
      let string = `${year}-${addZero(month)}-${addZero(dayMonth)}`
      arrayDate.push(string)
    }
    // console.log(arrayDate)
    return arrayDate

  }

  const Data = async (array) => {
    try{
    let arrayFive = []
    let dataNextDays = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?&q=${data.value.name}&appid=${process.env.REACT_APP_WEATHER_KEY}&lang=${language.value.api}&units=${scale.value === false ? "imperial": "metric"}`)
    // console.log(dataNextDays.data.list)
    let filterArray = (dataNextDays.data.list).filter((each)=>{
      return (array[0] === each.dt_txt.split(' ')[0] || array[1] === each.dt_txt.split(' ')[0] || array[2] === each.dt_txt.split(' ')[0] || array[3] === each.dt_txt.split(' ')[0] || array[4] === each.dt_txt.split(' ')[0])
    })

    array.forEach((each)=>{
      let compare = each + " 00:00:00"
      filterArray.forEach((filter)=>{
        if(compare === filter.dt_txt){
          arrayFive.push(filter)
        }
      })
    })

    // console.log(arrayFive)
    return arrayFive


    }catch(err) {
      console.log("Error to get weather data")
    }
  }

  useEffect(()=>{
    let array = FiveDays()
    Data(array).then((arrayFive)=>{
      dispatch(nextDays(arrayFive))
    })
 

  },[data.nextDays, language.value, scale.value])

  



  return (
    <GenericContainer>
      <Container>
        <Header/>
        {data.nextDays &&
          <MainNextDays data={data.nextDays}/>
        }
        <Footer/>
      </Container>
    </GenericContainer>
  )
}


