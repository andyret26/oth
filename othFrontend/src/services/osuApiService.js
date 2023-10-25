import axios from 'axios'

const API_KEY = import.meta.env.VITE_OSU_API_KEY

export function getUserData(id){
    axios.get(" https://osu.ppy.sh/api/get_user",{
        params: {
            "k": API_KEY,
            "u": id,
            "m": "0",
            "type": "id"
        }
    })
    .then(respone => {
        console.log(respone.data)
        // res.send(JSON.stringify(respone.data))
    })
    .catch(error => {
        console.log(error.response)
        // res.send(JSON.stringify(error.response))
    })
}