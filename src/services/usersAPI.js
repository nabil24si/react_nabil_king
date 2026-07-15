import axios from 'axios'

const API_URL = "https://qovurxrovzstbawkswnj.supabase.co/rest/v1/users"
const API_KEY = "sb_publishable_JGk5Hx18sBrMOWwxuQ6Ztg_xID5Yepl"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const usersAPI = {
    // 1. Ambil semua data user
    async fetchUsers() {
        const response = await axios.get(`${API_URL}?order=id.desc`, { headers })
        return response.data
    },

    // 2. Tambah user baru (id otomatis terisi int8, created_at otomatis now())
    async createUser(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    // 3. Update user berdasarkan ID
    async updateUser(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers })
        return response.data
    },

    // 4. Hapus user berdasarkan ID
    async deleteUser(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}
