import axios from 'axios';
import APIURL from '../APIURL';

export const getData = ()=>{

    return axios({
        method:"GET",
        url:`${APIURL.url}//getdata`
        
    }) 
}