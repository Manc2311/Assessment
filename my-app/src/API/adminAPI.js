import axios from 'axios';


export const getData = ()=>{

    return axios({
        method:"GET",
        url:'http://localhost:3000/getdata'
        
    }) 
}