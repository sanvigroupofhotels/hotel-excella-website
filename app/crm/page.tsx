import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CRMSidebar } from '@/components/crm/sidebar'
import { CRMHeader } from '@/components/crm/header'
import { KPIGrid } from '@/components/crm/kpi-cards'
import { QuotesTable } from '@/components/crm/quotes-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle, TrendingUp, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

export default async function CRMDashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/crm/login')
  }

  // Get admin user info
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Get today's date for filtering
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Get KPI data - today's quotes
  const { data: todayQuotes } = await supabase
    .from('quotes')
    .select('id, status, total_amount')
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)

  const totalQuotes = todayQuotes?.length || 0
  const pending = todayQuotes?.filter((q) => q.status === 'pending').length || 0
  const converted = todayQuotes?.filter((q) => q.status === 'converted').length || 0
  const estimatedRevenue = todayQuotes?.reduce((sum, q) => sum + (q.total_amount || 0), 0) || 0

  // Get recent quotes
  const { data: recentQuotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  // Get pending follow-ups count
  const { count: pendingFollowUps } = await supabase
    .from('follow_ups')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
    .lte('scheduled_date', new Date().toISOString().split('T')[0])

  return (
    <div className="min-h-screen bg-background">
      <CRMSidebar pendingFollowUps={pendingFollowUps || 0} />
      
      <div className="pl-64">
        <CRMHeader userName={adminUser?.name || 'Admin'} notifications={pendingFollowUps || 0} />
        
        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {adminUser?.name || 'Admin'}</p>
            </div>
            <Link href="/crm/quote/new">
              <Button className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Generate Quote
              </Button>
            </Link>
          </div>

          {/* Today's KPIs */}
          <Card className="bg-secondary/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Today&apos;s KPIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <KPIGrid
                totalQuotes={totalQuotes}
                pending={pending}
                converted={converted}
                estimatedRevenue={estimatedRevenue}
              />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalQuotes}</p>
                  <p className="text-sm text-muted-foreground">New Inquiries Today</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingFollowUps || 0}</p>
                  <p className="text-sm text-muted-foreground">Pending Follow-ups</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {totalQuotes > 0 ? Math.round((converted / totalQuotes) * 100) : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Quotes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Quotes</CardTitle>
              <Link href="/crm/quotes">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <QuotesTable quotes={recentQuotes || []} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
