'use client'

import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Label } from './components/ui/label'
import { Clock, Calendar, User } from 'lucide-react'

export default function Home() {
  const [userName, setUserName] = useState('')

  const handleUserAccess = () => {
    if (userName.trim()) {
      window.location.href = `/${encodeURIComponent(userName.trim())}`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUserAccess()
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-2xl mx-auto space-y-6'>
        <div className='text-center mt-20'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>勤怠管理システム</h1>
          <p className='text-gray-600 mb-8'>ユーザー名を入力してください</p>
        </div>

        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 mb-4'>
                <User className='w-5 h-5 text-blue-600' />
                <Label htmlFor='userName' className='text-sm font-medium'>
                  ユーザー名
                </Label>
              </div>
              <div className='flex gap-2'>
                <input
                  id='userName'
                  type='text'
                  placeholder='ユーザー名を入力'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <Button 
                  onClick={handleUserAccess}
                  disabled={!userName.trim()}
                  className='px-6'
                >
                  アクセス
                </Button>
              </div>
              <p className='text-xs text-gray-500 mt-2'>
                例: /john → johnさんの勤怠管理画面
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>システム概要</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3 text-sm text-gray-600'>
              <div className='flex items-start gap-2'>
                <Clock className='w-4 h-4 mt-0.5' />
                <div>
                  <strong>出退勤記録:</strong> 日々の出勤・退勤時間を記録
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <Calendar className='w-4 h-4 mt-0.5' />
                <div>
                  <strong>月次レポート:</strong> 月別の勤怠データを確認
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <User className='w-4 h-4 mt-0.5' />
                <div>
                  <strong>ユーザー別管理:</strong> 各ユーザーの勤怠情報を個別管理
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='text-center text-xs text-gray-500'>
          将来的にログイン認証機能を追加予定です
        </div>
      </div>
    </div>
  )
}
