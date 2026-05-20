'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MoreHorizontal, 
  Eye, 
  Download, 
  MessageCircle, 
  Edit, 
  Trash2,
  Search,
  Filter,
  FileDown,
} from 'lucide-react'
import type { Quote, QuoteStatus } from '@/lib/types/crm'
import { format, parseISO } from 'date-fns'

interface QuotesTableProps {
  quotes: Quote[]
  onStatusChange?: (quoteId: string, status: QuoteStatus) => void
  onDelete?: (quoteId: string) => void
}

const statusConfig: Record<QuoteStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'secondary' },
  sent: { label: 'Sent', variant: 'default' },
  negotiating: { label: 'Negotiating', variant: 'outline' },
  converted: { label: 'Converted', variant: 'default' },
  no_response: { label: 'No Response', variant: 'secondary' },
  failed: { label: 'Failed', variant: 'destructive' },
}

const statusColors: Record<QuoteStatus, string> = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  sent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  negotiating: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  converted: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  no_response: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function QuotesTable({ quotes: initialQuotes, onStatusChange, onDelete }: QuotesTableProps) {
  const [quotes, setQuotes] = useState(initialQuotes)
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const supabase = createClient()

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'dd MMM yyyy')
    } catch {
      return dateStr
    }
  }

  // Filter quotes
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch = 
      quote.guest_name.toLowerCase().includes(search.toLowerCase()) ||
      quote.guest_phone.includes(search) ||
      quote.quote_number.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Handle status change
  const handleStatusChange = async (quoteId: string, newStatus: QuoteStatus) => {
    const { error } = await supabase
      .from('quotes')
      .update({ status: newStatus })
      .eq('id', quoteId)

    if (!error) {
      setQuotes((prev) =>
        prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
      )
      onStatusChange?.(quoteId, newStatus)
    }
  }

  // Handle delete
  const handleDelete = async (quoteId: string) => {
    if (!confirm('Are you sure you want to delete this quote?')) return

    const { error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', quoteId)

    if (!error) {
      setQuotes((prev) => prev.filter((q) => q.id !== quoteId))
      onDelete?.(quoteId)
    }
  }

  // Toggle selection
  const toggleSelection = (quoteId: string) => {
    setSelectedQuotes((prev) =>
      prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [...prev, quoteId]
    )
  }

  // Toggle all
  const toggleAll = () => {
    if (selectedQuotes.length === filteredQuotes.length) {
      setSelectedQuotes([])
    } else {
      setSelectedQuotes(filteredQuotes.map((q) => q.id))
    }
  }

  // Send WhatsApp
  const sendWhatsApp = (quote: Quote) => {
    const message = encodeURIComponent(
      `Hello ${quote.guest_name}, Thank you for considering Hotel Excella. Your quote (${quote.quote_number}) for ₹${quote.total_amount.toLocaleString('en-IN')} is ready. We look forward to hosting you!`
    )
    const phone = quote.guest_phone.replace(/[^0-9]/g, '')
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest name, phone, quote ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(statusConfig).map(([value, config]) => (
                <SelectItem key={value} value={value}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedQuotes.length === filteredQuotes.length && filteredQuotes.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Quote ID</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Stay</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No quotes found
                </TableCell>
              </TableRow>
            ) : (
              filteredQuotes.map((quote) => (
                <TableRow key={quote.id} className="hover:bg-muted/30">
                  <TableCell>
                    <Checkbox
                      checked={selectedQuotes.includes(quote.id)}
                      onCheckedChange={() => toggleSelection(quote.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/crm/quote/${quote.id}`} className="hover:text-primary">
                      {quote.quote_number}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{quote.guest_name}</p>
                      <p className="text-sm text-muted-foreground">{quote.guest_phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{formatDate(quote.check_in)} - {formatDate(quote.check_out)}</p>
                    <p className="text-xs text-muted-foreground">{quote.num_nights} nights</p>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    {formatCurrency(quote.total_amount)}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[quote.status]} variant="outline">
                      {statusConfig[quote.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(quote.updated_at)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/crm/quote/${quote.id}/preview`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/crm/quote/${quote.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => sendWhatsApp(quote)}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <span className="text-xs text-muted-foreground">Change Status</span>
                        </DropdownMenuItem>
                        {Object.entries(statusConfig).map(([status, config]) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => handleStatusChange(quote.id, status as QuoteStatus)}
                            disabled={quote.status === status}
                          >
                            {config.label}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(quote.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bulk Actions */}
      {selectedQuotes.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium">
            {selectedQuotes.length} selected
          </span>
          <Button variant="outline" size="sm">
            Bulk Actions
          </Button>
        </div>
      )}

      {/* Status Legend */}
      <div className="flex flex-wrap gap-3 text-sm">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[status as QuoteStatus].split(' ')[0]}`} />
            <span className="text-muted-foreground">{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
