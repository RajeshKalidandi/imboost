'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Calendar } from "../../components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Skeleton } from "../../components/ui/skeleton"

// Custom Toast component
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed bottom-4 right-4 p-4 rounded-md ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
    {message}
    <button onClick={onClose} className="ml-2 font-bold">×</button>
  </div>
)

export default function Dashboard() {
  const { data: session } = useSession()
  const [topic, setTopic] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [scheduledDate, setScheduledDate] = useState(new Date())
  const [scheduledTime, setScheduledTime] = useState('')
  const [analyticsData, setAnalyticsData] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  const fetchAnalyticsData = useCallback(async (userId) => {
    try {
      const res = await fetch(`/api/analytics?userId=${userId}`)
      if (!res.ok) throw new Error('Failed to fetch analytics data')
      const data = await res.json()
      setAnalyticsData(data)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      showToast('Failed to fetch analytics data', 'error')
    }
  }, [])

  useEffect(() => {
    if (session?.user?.id) fetchAnalyticsData(session.user.id)
  }, [session, fetchAnalyticsData])

  const handleGenerateContent = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })
      if (!res.ok) throw new Error('Failed to generate content')
      const data = await res.json()
      setGeneratedContent(data.content)
      showToast('Content generated successfully', 'success')
    } catch (error) {
      console.error('Error generating content:', error)
      showToast('Failed to generate content', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSchedulePost = async () => {
    setIsScheduling(true)
    try {
      const scheduledFor = new Date(scheduledDate)
      scheduledFor.setHours(parseInt(scheduledTime.split(':')[0]), parseInt(scheduledTime.split(':')[1]))
      
      const res = await fetch('/api/schedule-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: generatedContent,
          scheduledFor,
          userId: session?.user?.id,
        }),
      })
      if (!res.ok) throw new Error('Failed to schedule post')
      const data = await res.json()
      console.log('Post scheduled:', data)
      resetForm()
      showToast('Post scheduled successfully', 'success')
    } catch (error) {
      console.error('Error scheduling post:', error)
      showToast('Failed to schedule post', 'error')
    } finally {
      setIsScheduling(false)
    }
  }

  const resetForm = () => {
    setGeneratedContent('')
    setTopic('')
    setScheduledDate(new Date())
    setScheduledTime('')
  }

  const showToast = (message, type) => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Tabs defaultValue="generate">
        <TabsList>
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Post</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic">Enter a topic</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Digital Marketing Trends"
                  />
                </div>
                <Button onClick={handleGenerateContent} disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Generate Content'}
                </Button>
                {generatedContent && (
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    rows={8}
                    className="mt-4"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Post Scheduler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Date</Label>
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
                <Button onClick={handleSchedulePost} disabled={isScheduling || !generatedContent}>
                  {isScheduling ? 'Scheduling...' : 'Schedule Post'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" />
                    <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="shares" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Skeleton className="w-full h-[300px]" />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  )
}