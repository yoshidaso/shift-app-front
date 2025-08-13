'use client'

import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { CreateUserRequest } from '../api/users'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Alert, AlertDescription } from '../components/ui/alert'

export default function User() {
  const { createUser, isLoading } = useUsers()
  const [formData, setFormData] = useState<CreateUserRequest>({
    Name: '',
    Email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleInputChange = (field: keyof CreateUserRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.Name.trim() || !formData.Email.trim()) {
      setMessage({
        type: 'error',
        text: '名前とメールアドレスを入力してください',
      })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    const result = await createUser(formData)

    if (result.success) {
      setMessage({ type: 'success', text: 'ユーザーが正常に作成されました' })
      setFormData({ Name: '', Email: '' })
    } else {
      setMessage({
        type: 'error',
        text: `ユーザーの作成に失敗しました: ${
          result.error?.message || 'Unknown error'
        }`,
      })
    }

    setIsSubmitting(false)
  }

  return (
    <div className='container mx-auto py-8'>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>新しいユーザーを作成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>名前</Label>
              <Input
                id='name'
                type='text'
                value={formData.Name}
                onChange={(e) => handleInputChange('Name', e.target.value)}
                placeholder='ユーザー名を入力'
                disabled={isSubmitting || isLoading}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>メールアドレス</Label>
              <Input
                id='email'
                type='email'
                value={formData.Email}
                onChange={(e) => handleInputChange('Email', e.target.value)}
                placeholder='example@example.com'
                disabled={isSubmitting || isLoading}
              />
            </div>

            {message && (
              <Alert
                className={
                  message.type === 'error'
                    ? 'border-red-500'
                    : 'border-green-500'
                }
              >
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <Button
              type='submit'
              className='w-full'
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? '作成中...' : 'ユーザーを作成'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
