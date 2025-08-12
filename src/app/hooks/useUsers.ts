'use client'

import useSWR from 'swr'
import { fetchUsers } from '../api/users'

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR('users', fetchUsers, {
    revalidateOnFocus: false,
  })

  if (data) {
    // 取得データのログ出力
    // eslint-disable-next-line no-console
    console.log('Fetched /users result:', data)
  }

  return {
    users: data,
    error,
    isLoading,
    refresh: mutate,
  }
}

export default useUsers
