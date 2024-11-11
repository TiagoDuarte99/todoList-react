import api from '../../services/axiosConfig';

export async function CreatUser(email: string, password: string, confirmPassword: string) {
  try {
    const data = { email, password, confirmPassword }
    const response = await api.post('/auths/signup', data);
    return { success: true, message: response.data};
  }catch (error) {
    console.log(error)
    return { success: false, message: error};
  }
}
