'use client'

import { useState } from 'react'

const Dashboard: React.FC = () => {
  const [attendance, setAttendance] = useState<string>('')
  const [workContent, setWorkContent] = useState<string>('')
  const [issues, setIssues] = useState<string>('')
  const [timestamp, setTimestamp] = useState<string | null>(null)

  const handleClockIn = () => {
    setAttendance('出勤')
    setTimestamp(new Date().toLocaleTimeString())
  }

  const handleClockOut = () => {
    setAttendance('退勤')
    setTimestamp(new Date().toLocaleTimeString())
  }

  const handleSave = () => {
    alert('作業内容と課題が保存されました。')
    // 保存処理（API接続など）をここで実装
  }

  return (
    <div style={styles.container}>
      <h1>ダッシュボード</h1>

      <div style={styles.attendanceSection}>
        <h2>今日の勤怠ステータス: {attendance}</h2>
        <p>打刻時間: {timestamp}</p>
        <button onClick={handleClockIn} style={styles.button}>
          出勤
        </button>
        <button onClick={handleClockOut} style={styles.button}>
          退勤
        </button>
      </div>

      <div style={styles.inputSection}>
        <h2>作業内容</h2>
        <textarea
          value={workContent}
          onChange={(e) => setWorkContent(e.target.value)}
          placeholder='作業内容を入力してください'
          style={styles.textarea}
        />
        <h2>課題・懸念点</h2>
        <textarea
          value={issues}
          onChange={(e) => setIssues(e.target.value)}
          placeholder='課題や懸念点を入力してください'
          style={styles.textarea}
        />
        <button onClick={handleSave} style={styles.saveButton}>
          保存
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '20px' },
  attendanceSection: { marginBottom: '20px' },
  inputSection: { marginTop: '20px' },
  button: { marginRight: '10px', padding: '10px 20px' },
  textarea: {
    width: '100%',
    height: '100px',
    marginBottom: '20px',
    padding: '10px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
}

export default Dashboard
