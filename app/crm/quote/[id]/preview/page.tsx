import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { CRMSidebar } from '@/components/crm/sidebar'
import { CRMHeader } from '@/components/crm/header'
import { QuotePreviewClient } from './preview-client'

export default async function QuotePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
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

  // Get the quote
  const { data: quote, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !quote) {
    notFound()
  }

  // Get hotel details from settings
  const { data: hotelSetting } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', 'hotel_details')
    .single()

  const hotelDetails = hotelSetting?.value as {
    name: string
    address: string
    phone: string
    email: string
    website: string
  } | null

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
        
        <main className="p-6">
          <QuotePreviewClient 
            quote={quote} 
            hotelDetails={hotelDetails || undefined}
          />
        </main>
      </div>
    </div>
  )
}
