import axios from 'axios'

const API_URL = "https://qovurxrovzstbawkswnj.supabase.co/rest/v1/appointments"
const API_KEY = "sb_publishable_JGk5Hx18sBrMOWwxuQ6Ztg_xID5Yepl"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

export const appointmentsAPI = {
    async fetchAppointments() {
        const response = await axios.get(`${API_URL}?order=id.desc`, { headers })
        return response.data
    },

    async createAppointment(data) {
        const payload = {
            patientname: data.patientName,
            service: data.service,
            date: data.date,
            status: data.status
        }
        const response = await axios.post(API_URL, payload, { headers })
        return response.data
    },

    async updateAppointment(id, data) {
        const payload = {
            patientname: data.patientName,
            service: data.service,
            date: data.date,
            status: data.status
        }
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, payload, { headers })
        return response.data
    },

    async deleteAppointment(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}
