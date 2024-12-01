import api from '../../services/axiosConfig';

export async function GetUsersPage(page: number) {
  const token = localStorage.getItem('token');
  console.log(token)
  try {
    const response = await api.get(
      `/find-users?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const totalCount = response.headers['x-total-count'];
    const {users} = response.data
    console.log(users, totalCount);
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
      `/delete-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    console.log(response);
    return { success: true, message: response.data };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function editUser({
  userId,
  newEmail,
  password,
  newPassword,
  confirmNewPassword,
  active
}: {
  userId: number;
  newEmail: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  active : boolean;
}) {
  const data = {
    ...(newEmail ? { newEmail } : {}),
    ...(active !== undefined ? { active } : {}),
    ...(password ? { password } : {}),
    ...(newPassword ? { newPassword } : {}),
    ...(confirmNewPassword ? { confirmNewPassword } : {}),
  }
  const token = localStorage.getItem('token');
  try {
    const response = await api.put(
      `/update-user/${userId}`,
      data, // Dados da requisição (corpo)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response, 'responseservice');
    return { success: true, message: response.data };
  } catch (error) {
    return { success: false, message: error };
  }
}

