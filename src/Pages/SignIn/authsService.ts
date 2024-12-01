import api from '../../services/axiosConfig';

export async function AuthenticateUser(email: string, password: string) {
  try {
    const data = { email, password }
    const response = await api.post('/login', data);
    return { success: true, message: response.data };
  } catch (error) {
    console.log(error)
    return { success: false, message: error };
  }
}
