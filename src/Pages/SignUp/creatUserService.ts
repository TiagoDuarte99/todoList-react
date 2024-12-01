import api from '../../services/axiosConfig';

export async function CreatUser(email: string, nameUser: string, password: string, confirmPassword: string) {
  try {
    const data = { email, name : nameUser, password, confirmPassword }
    const response = await api.post('/create-user', data);
    return { success: true, message: response.data };
  } catch (error) {
    console.log(error)
    return { success: false, message: error };
  }
}
