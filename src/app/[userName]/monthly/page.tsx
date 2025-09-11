'use client'

import { Label } from '../../components/ui/label'

import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useUserShifts } from '../../hooks/useShifts'

interface AttendanceRecord {
  date: string
  clockIn: string | null
  clockOut: string | null
  workContent: string
  concerns: string
}

export default function UserMonthlyReportPage() {
  const params = useParams()
  const userName = params.userName as string
  
  const [selectedMonth, setSelectedMonth] = useState('')
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([])

  // Use userName directly for API requests to /api/shifts/[userName]  
  const { shifts, isLoading, error } = useUserShifts(userName)

  useEffect(() => {
    // Set current month as default
    const currentMonth = new Date().toISOString().slice(0, 7)
    setSelectedMonth(currentMonth)
  }, [])

  useEffect(() => {
    if (selectedMonth && shifts && Array.isArray(shifts)) {
      // Convert database shifts (via API) to AttendanceRecord format and filter by month
      const converted = shifts
        .map((shift: any) => {
          const startDate = new Date(shift.StartTime)
          const endDate = new Date(shift.EndTime)
          const dateString = startDate.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).replace(/\//g, '-')

          return {
            date: dateString,
            clockIn: startDate.toLocaleTimeString('ja-JP', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            clockOut: endDate.toLocaleTimeString('ja-JP', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            workContent: shift.WorkContent || '',
            concerns: shift.Issues || '',
          }
        })
        .filter((record: AttendanceRecord) => record.date.startsWith(selectedMonth))
        .sort((a: AttendanceRecord, b: AttendanceRecord) => a.date.localeCompare(b.date))

      setFilteredRecords(converted)
    } else {
      setFilteredRecords([])
    }
  }, [selectedMonth, shifts])

  const calculateWorkingHours = (
    clockIn: string | null,
    clockOut: string | null
  ) => {
    if (!clockIn || !clockOut) return 0

    const [inHour, inMinute] = clockIn.split(':').map(Number)
    const [outHour, outMinute] = clockOut.split(':').map(Number)

    const inTime = inHour * 60 + inMinute
    const outTime = outHour * 60 + outMinute

    if (outTime <= inTime) return 0

    return outTime - inTime
  }

  const formatMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}時間${mins
      .toString()
      .padStart(2, '0')}分`
  }

  const totalWorkingMinutes = filteredRecords.reduce((total, record) => {
    return total + calculateWorkingHours(record.clockIn, record.clockOut)
  }, 0)

  const getAvailableMonths = () => {
    if (!shifts || !Array.isArray(shifts)) return []
    
    const months = new Set(
      shifts.map((shift: any) => {
        const date = new Date(shift.StartTime)
        return date.toISOString().slice(0, 7)
      })
    )
    return Array.from(months).sort().reverse()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('ja-JP', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    })
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 p-4'>
        <div className='max-w-4xl mx-auto space-y-6'>
          <div className='text-center text-red-600'>
            データの読み込みに失敗しました: {error.message}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <Link href={`/${userName}`}>
              <Button variant='outline' size='sm'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                戻る
              </Button>
            </Link>
            <div className='flex items-center gap-3'>
              <User className='w-8 h-8 text-blue-600' />
              <div>
                <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
                  <Calendar className='w-8 h-8' />
                  月次レポート
                </h1>
                <p className='text-sm text-gray-600'>{userName}さん</p>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <Card>
            <CardContent className='pt-6'>
              <div className='text-center text-gray-500'>
                データを読み込み中...
              </div>
            </CardContent>
          </Card>
        )}

        {/* 月選択 */}
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              <Label htmlFor='month-select' className='text-sm font-medium'>
                表示月:
              </Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className='w-48'>
                  <SelectValue placeholder='月を選択' />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableMonths().map((month) => (
                    <SelectItem key={month} value={month}>
                      {new Date(month + '-01').toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {selectedMonth && !isLoading && (
          <>
            {/* 月次サマリー */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Clock className='w-5 h-5' />
                  {new Date(selectedMonth + '-01').toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                  })}{' '}
                  サマリー
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='text-center p-4 bg-blue-50 rounded-lg'>
                    <div className='text-sm text-gray-600'>出勤日数</div>
                    <div className='text-2xl font-bold text-blue-600'>
                      {
                        filteredRecords.filter((r) => r.clockIn && r.clockOut)
                          .length
                      }
                      日
                    </div>
                  </div>
                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <div className='text-sm text-gray-600'>総稼働時間</div>
                    <div className='text-2xl font-bold text-green-600'>
                      {formatMinutesToHours(totalWorkingMinutes)}
                    </div>
                  </div>
                  <div className='text-center p-4 bg-purple-50 rounded-lg'>
                    <div className='text-sm text-gray-600'>平均稼働時間</div>
                    <div className='text-2xl font-bold text-purple-600'>
                      {filteredRecords.filter((r) => r.clockIn && r.clockOut)
                        .length > 0
                        ? formatMinutesToHours(
                            Math.round(
                              totalWorkingMinutes /
                                filteredRecords.filter(
                                  (r) => r.clockIn && r.clockOut
                                ).length
                            )
                          )
                        : '0時間00分'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 日別詳細 */}
            <div className='space-y-4'>
              {filteredRecords.map((record, index) => (
                <Card key={index}>
                  <CardHeader className='pb-3'>
                    <div className='flex justify-between items-center'>
                      <CardTitle className='text-lg'>
                        {formatDate(record.date)}
                      </CardTitle>
                      {record.clockIn && record.clockOut && (
                        <div className='text-sm font-medium text-blue-600'>
                          {formatMinutesToHours(
                            calculateWorkingHours(
                              record.clockIn,
                              record.clockOut
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {/* 出退勤時間 */}
                    <div className='grid grid-cols-2 gap-4 text-sm'>
                      <div>
                        <span className='text-gray-500'>出勤:</span>
                        <span className='ml-2 font-medium'>
                          {record.clockIn || '未記録'}
                        </span>
                      </div>
                      <div>
                        <span className='text-gray-500'>退勤:</span>
                        <span className='ml-2 font-medium'>
                          {record.clockOut || '未記録'}
                        </span>
                      </div>
                    </div>

                    {/* 作業内容 */}
                    {record.workContent && (
                      <div>
                        <div className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
                          <FileText className='w-4 h-4' />
                          作業内容
                        </div>
                        <div className='text-sm text-gray-600 bg-gray-50 p-3 rounded'>
                          {record.workContent}
                        </div>
                      </div>
                    )}

                    {/* 課題・懸念点 */}
                    {record.concerns && (
                      <div>
                        <div className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
                          <AlertTriangle className='w-4 h-4' />
                          課題・懸念点
                        </div>
                        <div className='text-sm text-gray-600 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400'>
                          {record.concerns}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecords.length === 0 && !isLoading && (
              <Card>
                <CardContent className='pt-6'>
                  <div className='text-center text-gray-500'>
                    選択した月の記録がありません
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}