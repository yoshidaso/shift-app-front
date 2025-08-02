'use client'

import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Clock, Save, Calendar } from 'lucide-react'
import Link from 'next/link'

interface AttendanceRecord {
  date: string
  clockIn: string | null
  clockOut: string | null
  workContent: string
  concerns: string
}

export default function AttendancePage() {
  const [currentTime, setCurrentTime] = useState('')
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord>({
    date: '',
    clockIn: null,
    clockOut: null,
    workContent: '',
    concerns: '',
  })

  const today = new Date()
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')

  useEffect(() => {
    // 現在時刻を更新
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

    // 今日の記録を読み込み
    const savedRecords = localStorage.getItem('attendanceRecords')
    if (savedRecords) {
      const records: AttendanceRecord[] = JSON.parse(savedRecords)
      const todayData = records.find((record) => record.date === today)
      if (todayData) {
        setTodayRecord(todayData)
      } else {
        setTodayRecord((prev) => ({ ...prev, date: today }))
      }
    } else {
      setTodayRecord((prev) => ({ ...prev, date: today }))
    }

    return () => clearInterval(interval)
  }, [today])

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

  const handleSave = () => {
    const savedRecords = localStorage.getItem('attendanceRecords')
    const records: AttendanceRecord[] = savedRecords
      ? JSON.parse(savedRecords)
      : []

    // 既存の記録を更新または新規追加
    const existingIndex = records.findIndex((record) => record.date === today)
    if (existingIndex >= 0) {
      records[existingIndex] = todayRecord
    } else {
      records.push(todayRecord)
    }

    localStorage.setItem('attendanceRecords', JSON.stringify(records))
    alert('保存しました')
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-2xl mx-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-gray-900'>勤怠管理</h1>
          <Link href='/monthly'>
            <Button
              variant='outline'
              className='flex items-center gap-2 bg-transparent'
            >
              <Calendar className='w-4 h-4' />
              月次レポート
            </Button>
          </Link>
        </div>

        {/* 現在時刻表示 */}
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

        {/* 出退勤ボタン */}
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

        {/* 作業内容・課題入力 */}
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

        {/* 保存ボタン */}
        <Button
          onClick={handleSave}
          className='w-full h-12 text-lg flex items-center gap-2'
        >
          <Save className='w-5 h-5' />
          保存
        </Button>
      </div>
    </div>
  )
}
