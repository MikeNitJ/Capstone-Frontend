const URL = "http://localhost:7000"

const token = localStorage.getItem('accessToken');

const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  

//indexLoader => get all todos for index route
export const foodIndexLoader = async () => {
    
    const response = await fetch(URL + "/food", {
      headers: commonHeaders, // Include the Authorization header
    });
  
    const foodList = await response.json();
    return foodList;
  };
  