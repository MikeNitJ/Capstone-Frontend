
const URL = "http://localhost:7000"

const token = localStorage.getItem('accessToken');

const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  

// //indexLoader => get all todos for index route
// export const foodIndexLoader = async () => {
    
//     const response = await fetch(URL + "/food", {
//       headers: commonHeaders, // Include the Authorization header
//     });
  
//     const foodList = await response.json();
//     return foodList;
//   };
  

  export const foodIndexLoader = async ({params}) => {
    
    const {id} = params
    try {
      const response = await fetch(URL + "/food", {
        headers: commonHeaders,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const orderresponse = await fetch(URL + `/order/${id}`, {
        headers: commonHeaders,
      });

      if (!orderresponse.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const foodListData = await response.json();
      const orderListData = await orderresponse.json();
      console.log(foodListData,orderListData);
      return {foodListData, orderListData};
    } catch (error) {
      console.error('Error fetching food data:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };