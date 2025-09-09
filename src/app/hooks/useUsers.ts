import useSWR from 'swr'
import { fetchUsers, createUser, CreateUserRequest } from '../api/users/users'

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR('users', fetchUsers, {
    revalidateOnFocus: false,
  })

  if (data) {
    // 取得データのログ出力
    // eslint-disable-next-line no-console
    console.log('Fetched /users result:', data)
  }

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      await createUser(userData)
      // ユーザー作成後にデータを再取得
      mutate()
      return { success: true, error: null }
    } catch (error) {
      console.error('Failed to create user:', error)
      return { success: false, error: error as Error }
    }
  }

  return {
    users: data,
    error,
    isLoading,
    refresh: mutate,
    createUser: handleCreateUser,
  }
}
