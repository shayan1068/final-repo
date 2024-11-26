import axios from "axios";
export const deleteUserPostedPost = async(serviceId:string,userId:string)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://final-repo-k8c4.onrender.com/api/detete/userPost/${serviceId}/user/${userId}`,
      };
      
      try {
        const response = await axios(config);
        return response.data;
     } catch (err) {
        throw err;
     }
}

