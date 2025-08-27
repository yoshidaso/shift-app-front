import useSWR from 'swr'
import {
  fetchShifts,
  createShift,
  CreateShiftRequest,
} from '../api/shifts/shifts'

export function useShifts() {
  const { data, error, isLoading, mutate } = useSWR('shifts', fetchShifts, {
    revalidateOnFocus: false,
  })

  const handleCreateShift = async (shiftData: CreateShiftRequest) => {
    try {
      await createShift(shiftData)
      // シフト作成後にデータを再取得
      mutate()
      return { success: true, error: null }
    } catch (error) {
      console.error('Failed to create shift:', error)
      return { success: false, error: error as Error }
    }
  }

  return {
    shifts: data,
    error,
    isLoading,
    refresh: mutate,
    createShift: handleCreateShift,
  }
}
