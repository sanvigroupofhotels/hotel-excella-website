'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Calendar,
  User,
  IndianRupee,
} from 'lucide-react'
import type { FollowUp, Quote } from '@/lib/types/crm'
import { format, parseISO, isToday, isPast, isFuture } from 'date-fns'

interface FollowUpWithQuote extends FollowUp {
  quote: Quote
}

interface FollowUpsClientProps {
  followUps: FollowUpWithQuote[]
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  skipped: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  rescheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export function FollowUpsClient({ followUps: initialFollowUps }: FollowUpsClientProps) {
  const [followUps, setFollowUps] = useState(initialFollowUps)
  const supabase = createClient()

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'dd MMM yyyy')
    } catch {
      return dateStr
    }
  }

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  // Categorize follow-ups
  const todayFollowUps = followUps.filter((f) => f.status === 'pending' && isToday(parseISO(f.scheduled_date)))
  const overdueFollowUps = followUps.filter((f) => f.status === 'pending' && isPast(parseISO(f.scheduled_date)) && !isToday(parseISO(f.scheduled_date)))
  const upcomingFollowUps = followUps.filter((f) => f.status === 'pending' && isFuture(parseISO(f.scheduled_date)))
  const completedFollowUps = followUps.filter((f) => f.status === 'completed')

  const handleMarkComplete = async (followUpId: string, outcome: string) => {
    const { error } = await supabase
      .from('follow_ups')
      .update({ 
        status: 'completed',
        outcome,
        completed_at: new Date().toISOString()
      })
      .eq('id', followUpId)

    if (!error) {
      setFollowUps((prev) =>
        prev.map((f) => (f.id === followUpId ? { ...f, status: 'completed' as const, outcome, completed_at: new Date().toISOString() } : f))
      )
    }
  }

  const handleSkip = async (followUpId: string) => {
    const { error } = await supabase
      .from('follow_ups')
      .update({ status: 'skipped' })
      .eq('id', followUpId)

    if (!error) {
      setFollowUps((prev) =>
        prev.map((f) => (f.id === followUpId ? { ...f, status: 'skipped' as const } : f))
      )
    }
  }

  const sendWhatsApp = (followUp: FollowUpWithQuote) => {
    const quote = followUp.quote
    const message = encodeURIComponent(
      `Hello ${quote.guest_name}, following up on your quote (${quote.quote_number}) for ₹${quote.total_amount.toLocaleString('en-IN')}. Please let us know if you have any questions. We look forward to hosting you at Hotel Excella!`
    )
    const phone = quote.guest_phone.replace(/[^0-9]/g, '')
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  const FollowUpCard = ({ followUp, isOverdue = false }: { followUp: FollowUpWithQuote; isOverdue?: boolean }) => (
    <Card className={`${isOverdue ? 'border-destructive/50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Link href={`/crm/quote/${followUp.quote.id}/preview`} className="font-semibold hover:text-primary">
                {followUp.quote.guest_name}
              </Link>
              <Badge className={statusColors[followUp.status]} variant="outline">
                {followUp.status}
              </Badge>
              {isOverdue && (
                <Badge variant="destructive" className="text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Overdue
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {followUp.quote.guest_phone}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(followUp.scheduled_date)}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {formatCurrency(followUp.quote.total_amount)}
              </span>
            </div>

            {followUp.notes && (
              <p className="text-sm text-muted-foreground">{followUp.notes}</p>
            )}
          </div>

          {followUp.status === 'pending' && (
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline" onClick={() => sendWhatsApp(followUp)}>
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleMarkComplete(followUp.id, 'Contacted')}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Complete
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-muted-foreground"
                onClick={() => handleSkip(followUp.id)}
              >
                Skip
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Tabs defaultValue="today" className="space-y-4">
      <TabsList>
        <TabsTrigger value="today" className="gap-2">
          <Clock className="w-4 h-4" />
          Today
          {todayFollowUps.length > 0 && (
            <Badge variant="secondary" className="ml-1">{todayFollowUps.length}</Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="overdue" className="gap-2">
          <AlertCircle className="w-4 h-4" />
          Overdue
          {overdueFollowUps.length > 0 && (
            <Badge variant="destructive" className="ml-1">{overdueFollowUps.length}</Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="gap-2">
          <Calendar className="w-4 h-4" />
          Upcoming
          {upcomingFollowUps.length > 0 && (
            <Badge variant="secondary" className="ml-1">{upcomingFollowUps.length}</Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="completed" className="gap-2">
          <CheckCircle className="w-4 h-4" />
          Completed
        </TabsTrigger>
      </TabsList>

      <TabsContent value="today" className="space-y-4">
        {todayFollowUps.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No follow-ups scheduled for today</p>
            </CardContent>
          </Card>
        ) : (
          todayFollowUps.map((followUp) => (
            <FollowUpCard key={followUp.id} followUp={followUp} />
          ))
        )}
      </TabsContent>

      <TabsContent value="overdue" className="space-y-4">
        {overdueFollowUps.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No overdue follow-ups</p>
            </CardContent>
          </Card>
        ) : (
          overdueFollowUps.map((followUp) => (
            <FollowUpCard key={followUp.id} followUp={followUp} isOverdue />
          ))
        )}
      </TabsContent>

      <TabsContent value="upcoming" className="space-y-4">
        {upcomingFollowUps.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming follow-ups scheduled</p>
            </CardContent>
          </Card>
        ) : (
          upcomingFollowUps.map((followUp) => (
            <FollowUpCard key={followUp.id} followUp={followUp} />
          ))
        )}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4">
        {completedFollowUps.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No completed follow-ups yet</p>
            </CardContent>
          </Card>
        ) : (
          completedFollowUps.map((followUp) => (
            <FollowUpCard key={followUp.id} followUp={followUp} />
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}
