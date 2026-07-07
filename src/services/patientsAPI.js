import axios from 'axios'

const API_URL = "https://qovurxrovzstbawkswnj.supabase.co/rest/v1/patients"
const API_KEY = "sb_publishable_JGk5Hx18sBrMOWwxuQ6Ztg_xID5Yepl"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

export const patientsAPI = {
    async fetchPatients() {
        const response = await axios.get(`${API_URL}?order=id.desc`, { headers })
        return response.data
    },

    async createPatient(data) {
        // Kirim dengan field lowercase karena Supabase auto lowercase
        const payload = {
            patientname: data.patientName,
            email: data.email,
            phone: data.phone,
            treatment: data.treatment
        }
        const response = await axios.post(API_URL, payload, { headers })
        return response.data
    },

    async deletePatient(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}