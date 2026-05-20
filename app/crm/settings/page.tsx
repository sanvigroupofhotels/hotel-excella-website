import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CRMSidebar } from '@/components/crm/sidebar'
import { CRMHeader } from '@/components/crm/header'
import { SettingsClient } from './settings-client'

export default async function SettingsPage() {
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

  // Get all settings
  const { data: settings } = await supabase
    .from('app_settings')
    .select('*')
    .order('key')

  // Get room types
  const { data: roomTypes } = await supabase
    .from('room_types')
    .select('*')
    .order('name')

  // Get charges
  const { data: charges } = await supabase
    .from('charges')
    .select('*')
    .order('name')

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
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your CRM configuration</p>
          </div>

          <SettingsClient 
            settings={settings || []}
            roomTypes={roomTypes || []}
            charges={charges || []}
          />
        </main>
      </div>
    </div>
  )
}
