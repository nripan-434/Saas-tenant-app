import axios from 'axios'

const api=axios.create({
    baseURL:"https://orgsync-saas-tenant-app.onrender.com"
})
api.interceptors.request.use((config)=>{
    const token = JSON.parse(sessionStorage.getItem('token'))
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';
      console.log(message)

    return Promise.reject({message});
  }
);
export default api