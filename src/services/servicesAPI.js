import axios from 'axios'

const API_URL = "https://qovurxrovzstbawkswnj.supabase.co/rest/v1/services"
const API_KEY = "sb_publishable_JGk5Hx18sBrMOWwxuQ6Ztg_xID5Yepl"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

export const servicesAPI = {
    async fetchServices() {
        const response = await axios.get(`${API_URL}?order=id.desc`, { headers })
        return response.data
    },

    async createService(data) {
        const payload = {
            servicename: data.serviceName,
            category: data.category,
            duration: data.duration,
            price: data.price
        }
        const response = await axios.post(API_URL, payload, { headers })
        return response.data
    },

    async deleteService(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}