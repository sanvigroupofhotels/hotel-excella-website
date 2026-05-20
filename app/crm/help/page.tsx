import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CRMSidebar } from '@/components/crm/sidebar'
import { CRMHeader } from '@/components/crm/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react'

export default async function HelpPage() {
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

  return (
    <div className="min-h-screen bg-background">
      <CRMSidebar pendingFollowUps={pendingFollowUps || 0} />
      
      <div className="pl-64">
        <CRMHeader userName={adminUser?.name || 'Admin'} notifications={pendingFollowUps || 0} />
        
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-muted-foreground">Get help with using the CRM</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Send us an email for assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:support@hotelexcella.com" className="text-primary hover:underline">
                  support@hotelexcella.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-emerald-500" />
                </div>
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>Call us during business hours</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="tel:+919985908131" className="text-primary hover:underline">
                  +91 99859 08131
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>WhatsApp</CardTitle>
                <CardDescription>Quick support via WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://wa.me/919985908131" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Creating a Quote</h4>
                <p className="text-sm text-muted-foreground">
                  Go to Generate Quote from the sidebar, fill in guest details and stay information, 
                  then preview and send via WhatsApp.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Managing Follow-ups</h4>
                <p className="text-sm text-muted-foreground">
                  Set follow-up dates when creating quotes. Access pending follow-ups from the 
                  Follow-ups section in the sidebar.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Tracking Quote Status</h4>
                <p className="text-sm text-muted-foreground">
                  Update quote status from Quotes History by clicking the actions menu on any quote. 
                  Track conversions and revenue from the Reports page.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
