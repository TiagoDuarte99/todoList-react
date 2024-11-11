import api from '../../services/axiosConfig';

export async function AuthenticateUser(email: string, password: string) {
  try {
    const data = {email, password}
    const response = await api.post('/auths/signin', data); 
    return response.data; 
  } catch (error) {
    return error; 
  }
}
