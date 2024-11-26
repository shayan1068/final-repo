import axios from "axios";
export const requestHandleFromAnotherUser = async (userId: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/fetch/request/education/admin/${userId}`,
    headers: {}
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (err) {
    throw err;
  }

}

export const requestHandleFromAnotherUserDonation = async (userId:any) => {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/get/request/donation/${userId}`,
    headers: {}
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (err) {
    throw err;
  }
}