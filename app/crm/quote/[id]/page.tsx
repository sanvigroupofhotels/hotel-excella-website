import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { CRMSidebar } from '@/components/crm/sidebar'
import { CRMHeader } from '@/components/crm/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Eye, 
  Edit, 
  MessageCircle, 
  Download,
  User,
  Phone,
  Mail,
  Calendar,
  BedDouble,
  IndianRupee,
  Clock,
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import type { QuoteStatus } from '@/lib/types/crm'

const statusColors: Record<QuoteStatus, string> = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  sent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  negotiating: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  converted: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  no_response: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default async function QuoteDetailPage({
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

  // Get activity log
  const { data: activities } = await supabase
    .from('quote_activity_log')
    .select('*')
    .eq('quote_id', id)
    .order('created_at', { ascending: false })

  // Get pending follow-ups count
  const { count: pendingFollowUps } = await supabase
    .from('follow_ups')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
    .lte('scheduled_date', new Date().toISOString().split('T')[0])

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'dd MMM yyyy')
    } catch {
      return dateStr
    }
  }

  const formatDateTime = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'dd MMM yyyy, hh:mm a')
    } catch {
      return dateStr
    }
  }

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <div className="min-h-screen bg-background">
      <CRMSidebar pendingFollowUps={pendingFollowUps || 0} />
      
      <div className="pl-64">
        <CRMHeader userName={adminUser?.name || 'Admin'} notifications={pendingFollowUps || 0} />
        
        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/crm/quotes">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{quote.quote_number}</h1>
                  <Badge className={statusColors[quote.status as QuoteStatus]} variant="outline">
                    {quote.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">Created {formatDateTime(quote.created_at)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/crm/quote/${id}/preview`}>
                <Button variant="outline" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </Link>
              <Link href={`/crm/quote/${id}/edit`}>
                <Button variant="outline" className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              </Link>
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <MessageCircle className="w-4 h-4" />
                Send WhatsApp
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Guest Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Guest Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{quote.guest_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {quote.guest_phone}
                    </p>
                  </div>
                  {quote.guest_email && (
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {quote.guest_email}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Group Size</p>
                    <p className="font-medium">{quote.group_size} {quote.group_size === 1 ? 'Adult' : 'Adults'}</p>
                  </div>
                  {quote.lead_source && (
                    <div>
                      <p className="text-sm text-muted-foreground">Lead Source</p>
                      <p className="font-medium">{quote.lead_source}</p>
                    </div>
                  )}
                  {quote.special_requests && (
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Special Requests</p>
                      <p className="font-medium">{quote.special_requests}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stay Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Stay Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Check-in</p>
                    <p className="font-medium">{formatDate(quote.check_in)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Check-out</p>
                    <p className="font-medium">{formatDate(quote.check_out)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{quote.num_nights} {quote.num_nights === 1 ? 'Night' : 'Nights'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Room Type</p>
                    <p className="font-medium flex items-center gap-2">
                      <BedDouble className="w-4 h-4" />
                      {quote.room_type_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rooms</p>
                    <p className="font-medium">{quote.num_rooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Breakfast</p>
                    <p className="font-medium">{quote.include_breakfast ? 'Included' : 'Not Included'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Pricing Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room Tariff ({quote.num_nights} nights)</span>
                    <span>{formatCurrency(quote.room_tariff)}</span>
                  </div>
                  {quote.extra_bed_charge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Extra Bed ({quote.extra_bed_count})</span>
                      <span>{formatCurrency(quote.extra_bed_charge)}</span>
                    </div>
                  )}
                  {quote.early_checkin_charge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Early Check-in</span>
                      <span>{formatCurrency(quote.early_checkin_charge)}</span>
                    </div>
                  )}
                  {quote.late_checkout_charge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Late Check-out</span>
                      <span>{formatCurrency(quote.late_checkout_charge)}</span>
                    </div>
                  )}
                  {quote.pet_charges > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pet Charges</span>
                      <span>{formatCurrency(quote.pet_charges)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(quote.subtotal)}</span>
                  </div>
                  {quote.discount_amount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-500">
                      <span>Discount</span>
                      <span>-{formatCurrency(quote.discount_amount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax ({quote.tax_percentage}%)</span>
                    <span>{formatCurrency(quote.tax_amount)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">{formatCurrency(quote.total_amount)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quote Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quote Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Valid Until</p>
                    <p className="font-medium">{quote.valid_until ? formatDate(quote.valid_until) : 'N/A'}</p>
                  </div>
                  {quote.whatsapp_sent_at && (
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp Sent</p>
                      <p className="font-medium">{formatDateTime(quote.whatsapp_sent_at)}</p>
                    </div>
                  )}
                  {quote.pdf_generated_at && (
                    <div>
                      <p className="text-sm text-muted-foreground">PDF Generated</p>
                      <p className="font-medium">{formatDateTime(quote.pdf_generated_at)}</p>
                    </div>
                  )}
                  {quote.internal_notes && (
                    <div>
                      <p className="text-sm text-muted-foreground">Internal Notes</p>
                      <p className="font-medium">{quote.internal_notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Activity Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activities && activities.length > 0 ? (
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex gap-3">
                          <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                          <div>
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{formatDateTime(activity.created_at)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No activity recorded yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
