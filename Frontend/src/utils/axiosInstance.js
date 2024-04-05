import axios from 'axios'


const getUserDetails = async () => {
    const token = JSON.parse(localStorage.getItem('blog-token'))
    try {
        const {data} = await axios.get('http://localhost:8000/api/v1/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getUserDetails