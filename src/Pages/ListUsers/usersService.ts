import api from '../../services/axiosConfig';

export async function GetUsersPage(page: number) {
  const token = localStorage.getItem('token');
  console.log(token)
  try {
    const response = await api.get(
      `/users/all?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const totalCount = response.headers['x-total-count'];
    const users = response.data
    console.log(users);
    return { users, totalCount };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function deleteUser(userId: number) {
  const token = localStorage.getItem('token');
  console.log(token)
  try {
    const response = await api.delete(
      `/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    console.log(response);
    return { success: true };
  } catch (error) {
    return { success: false, message: error };
  }
}
