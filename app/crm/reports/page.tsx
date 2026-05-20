import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CRMSidebar } from '@/components/crm/sidebar'
import { CRMHeader } from '@/components/crm/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, TrendingUp, Users, IndianRupee } from 'lucide-react'

export default async function ReportsPage() {
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

  // Get pending follow-ups count
  const { count: pendingFollowUps } = await supabase
    .from('follow_ups')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
    .lte('scheduled_date', new Date().toISOString().split('T')[0])

  // Get overall stats
  const { count: totalQuotes } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })

  const { count: convertedQuotes } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'converted')

  const { data: revenueData } = await supabase
    .from('quotes')
    .select('total_amount')
    .eq('status', 'converted')

  const totalRevenue = revenueData?.reduce((sum, q) => sum + (q.total_amount || 0), 0) || 0

  return (
    <div className="min-h-screen bg-background">
      <CRMSidebar pendingFollowUps={pendingFollowUps || 0} />
      
      <div className="pl-64">
        <CRMHeader userName={adminUser?.name || 'Admin'} notifications={pendingFollowUps || 0} />
        
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Analytics and performance metrics</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalQuotes || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Quotes</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{convertedQuotes || 0}</p>
                  <p className="text-sm text-muted-foreground">Converted</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {totalQuotes ? Math.round(((convertedQuotes || 0) / totalQuotes) * 100) : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Detailed Analytics Coming Soon</h3>
              <p className="text-muted-foreground">
                Charts, graphs, and exportable reports will be available here.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
