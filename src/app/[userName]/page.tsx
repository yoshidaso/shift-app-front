'use client'

import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Clock, Save, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { useShifts } from '../hooks/useShifts'
import { useParams } from 'next/navigation'

type ShiftRecord = {
  date: string
  clockIn: string | null
  clockOut: string | null
  workContent: string
  concerns: string
}

export default function UserAttendancePage() {
  const params = useParams()
  const userName = params.userName as string

  const [currentTime, setCurrentTime] = useState('')
  const [todayRecord, setTodayRecord] = useState<ShiftRecord>({
    date: '',
    clockIn: null,
    clockOut: null,
    workContent: '',
    concerns: '',
  })

  const { shifts, createShift, isLoading, refresh } = useShifts(userName)

  const today = new Date()
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (shifts && Array.isArray(shifts)) {
      const todayData = shifts.find((shift: any) => {
        const shiftDate = new Date(shift.StartTime || shift.EndTime)
          .toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\//g, '-')
        return shiftDate === today
      })

      if (todayData) {
        setTodayRecord({
          date: today,
          clockIn: todayData.StartTime
            ? new Date(todayData.StartTime).toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : null,
          clockOut: todayData.EndTime
            ? new Date(todayData.EndTime).toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : null,
          workContent: todayData.WorkContent || '',
          concerns: todayData.Issues || '',
        })
      } else {
        setTodayRecord((prev) => ({ ...prev, date: today }))
      }
    } else {
      setTodayRecord((prev) => ({ ...prev, date: today }))
    }
  }, [shifts, today])

  const handleClockIn = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setTodayRecord((prev) => ({ ...prev, clockIn: timeString }))
  }

  const handleClockOut = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setTodayRecord((prev) => ({ ...prev, clockOut: timeString }))
  }

  const calculateWorkingHours = () => {
    if (!todayRecord.clockIn || !todayRecord.clockOut) return ''

    const [inHour, inMinute] = todayRecord.clockIn.split(':').map(Number)
    const [outHour, outMinute] = todayRecord.clockOut.split(':').map(Number)

    const inTime = inHour * 60 + inMinute
    const outTime = outHour * 60 + outMinute

    if (outTime <= inTime) return ''

    const diffMinutes = outTime - inTime
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60

    return `${hours.toString().padStart(2, '0')}時間${minutes
      .toString()
      .padStart(2, '0')}分`
  }

  const handleSave = async () => {
    if (todayRecord.clockIn && todayRecord.clockOut) {
      const shiftData = {
        StartTime: todayRecord.clockIn,
        EndTime: todayRecord.clockOut,
        WorkContent: todayRecord.workContent,
        Issues: todayRecord.concerns,
      }

      const result = await createShift({ ...shiftData, UserName: userName })

      if (result.success) {
        refresh()
        alert('保存しました')
      } else {
        alert(`保存に失敗しました: ${result.error?.message || '不明なエラー'}`)
      }
    } else {
      alert('出勤時間と退勤時間の両方が記録されていません。')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-2xl mx-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <User className='w-8 h-8 text-blue-600' />
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>勤怠管理</h1>
              <p className='text-sm text-gray-600'>{userName}さん</p>
            </div>
          </div>
          <Link href={`/${userName}/monthly`}>
            <Button
              variant='outline'
              className='flex items-center gap-2 bg-transparent'
            >
              <Calendar className='w-4 h-4' />
              月次レポート
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-sm text-gray-500 mb-2'>現在時刻</div>
              <div className='text-4xl font-mono font-bold text-blue-600'>
                {currentTime}
              </div>
              <div className='text-sm text-gray-500 mt-2'>
                {new Date().toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='w-5 h-5' />
              出退勤記録
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Button
                  onClick={handleClockIn}
                  className='w-full h-16 text-lg bg-green-600 hover:bg-green-700'
                  disabled={!!todayRecord.clockIn}
                >
                  出勤
                </Button>
                {todayRecord.clockIn && (
                  <div className='text-center mt-2 text-sm text-gray-600'>
                    出勤時間: {todayRecord.clockIn}
                  </div>
                )}
              </div>
              <div>
                <Button
                  onClick={handleClockOut}
                  className='w-full h-16 text-lg bg-red-600 hover:bg-red-700'
                  disabled={!todayRecord.clockIn || !!todayRecord.clockOut}
                >
                  退勤
                </Button>
                {todayRecord.clockOut && (
                  <div className='text-center mt-2 text-sm text-gray-600'>
                    退勤時間: {todayRecord.clockOut}
                  </div>
                )}
              </div>
            </div>

            {calculateWorkingHours() && (
              <div className='text-center p-4 bg-blue-50 rounded-lg'>
                <div className='text-sm text-gray-600'>本日の稼働時間</div>
                <div className='text-2xl font-bold text-blue-600'>
                  {calculateWorkingHours()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>作業記録</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label htmlFor='workContent'>作業内容</Label>
              <Textarea
                id='workContent'
                placeholder='本日の作業内容を入力してください'
                value={todayRecord.workContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setTodayRecord((prev) => ({
                    ...prev,
                    workContent: e.target.value,
                  }))
                }
                className='mt-2'
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor='concerns'>課題・懸念点</Label>
              <Textarea
                id='concerns'
                placeholder='課題や懸念点があれば入力してください'
                value={todayRecord.concerns}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setTodayRecord((prev) => ({
                    ...prev,
                    concerns: e.target.value,
                  }))
                }
                className='mt-2'
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          className='w-full h-12 text-lg flex items-center gap-2'
          disabled={isLoading}
        >
          <Save className='w-5 h-5' />
          {isLoading ? '保存中...' : '保存'}
        </Button>

        {isLoading && (
          <div className='text-center text-sm text-gray-500'>
            データを読み込み中...
          </div>
        )}
      </div>
    </div>
  )
}
