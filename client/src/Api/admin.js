import axios from "axios"
import { convertTime } from "../utils/convertTime"

export default class AdminApi {
    static getTodayAppointments = async() => {
        return axios.get("http://localhost:5000/api/appointments/today")
        .then(res=>  res.data)
    }
    static  getPastAppointments = async() => {
        return axios.get(`http://localhost:5000/api/appointments/past`)
        .then(res=>  res.data)

        
    }
    static  getupcomingAppointments = async() => {
        return axios.get(`http://localhost:5000/api/appointments/upcoming`)
        .then(res=>  res.data)

    }
    static  getDateRangeAppointments = async(start,end) => {
        const stDate = convertTime(start);
        const endDate = convertTime(end);
        console.log(stDate,endDate,"ssssssladaslk");
        return axios.get(`http://localhost:5000/api/appointments?st=${stDate}&end=${endDate}`)
        .then(res=>  res.data)
        
    }



}
