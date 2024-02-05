import axios from 'axios'

const searchImages = async (term)=>{
   const response= await axios.get('https://api.unsplash.com/search/photos', {
        headers:{
            Authorization: 'Client-ID aVf8Pvv5vEURsLA9RHWEeR1Iz7-oYfmKf4dyC_xhcDU',
        },
        params: {
            query:term,
        }
    })
    
    return response.data.results;

}
export default searchImages