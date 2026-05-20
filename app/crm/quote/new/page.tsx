import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CRMSidebar } from '@/components/crm/sidebar'
import { CRMHeader } from '@/components/crm/header'
import { QuoteFormClient } from './quote-form-client'

export default async function GenerateQuotePage() {
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

  // Get room types
  const { data: roomTypes } = await supabase
    .from('room_types')
    .select('*')
    .eq('is_active', true)
    .order('name')

  // Get charges
  const { data: charges } = await supabase
    .from('charges')
    .select('*')
    .eq('is_active', true)

  // Get tax rate from settings
  const { data: taxSetting } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', 'tax_rate')
    .single()

  const taxRate = taxSetting?.value ? parseFloat(JSON.parse(JSON.stringify(taxSetting.value))) : 12

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
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Generate Quote</h1>
            <p className="text-muted-foreground">Create a new quote for a guest inquiry</p>
          </div>

          <QuoteFormClient
            roomTypes={roomTypes || []}
            charges={charges || []}
            taxRate={taxRate}
          />
        </main>
      </div>
    </div>
  )
}
