import api from "./api";

export default {
  async getHealth() {
    const { data: health } = await api.get('/api/v1/health')
    /** 
     *@type {{
     * health: boolean,
     * service: string
     * }} 
     */
    return health
  }
}