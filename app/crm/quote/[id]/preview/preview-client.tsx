'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { QuotePreview } from '@/components/crm/quote-preview'
import { ArrowLeft, Download, MessageCircle, Edit, Loader2 } from 'lucide-react'
import type { Quote, HotelDetails } from '@/lib/types/crm'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface QuotePreviewClientProps {
  quote: Quote
  hotelDetails?: HotelDetails
}

export function QuotePreviewClient({ quote, hotelDetails }: QuotePreviewClientProps) {
  const router = useRouter()
  const supabase = createClient()
  const previewRef = useRef<HTMLDivElement>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false)

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return
    
    setIsGeneratingPDF(true)
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })
      
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`Your_Quote_${quote.quote_number}.pdf`)

      // Update quote to mark PDF as generated
      await supabase
        .from('quotes')
        .update({ pdf_generated_at: new Date().toISOString() })
        .eq('id', quote.id)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleSendWhatsApp = async () => {
    setIsSendingWhatsApp(true)
    
    try {
      // First generate and download PDF
      await handleDownloadPDF()
      
      // Construct WhatsApp message
      const message = encodeURIComponent(
        `Hello ${quote.guest_name},\n\nThank you for considering Hotel Excella.\n\nPlease find your quote attached (${quote.quote_number}).\n\nQuote Details:\n` +
        `- Check-in: ${new Date(quote.check_in).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n` +
        `- Check-out: ${new Date(quote.check_out).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n` +
        `- Room: ${quote.room_type_name}\n` +
        `- Total Amount: ₹${quote.total_amount.toLocaleString('en-IN')}\n\n` +
        `We look forward to hosting you at Hotel Excella!`
      )
      
      // Clean phone number
      const phone = quote.guest_phone.replace(/[^0-9]/g, '')
      const whatsappPhone = phone.startsWith('91') ? phone : `91${phone}`
      
      // Open WhatsApp
      window.open(`https://wa.me/${whatsappPhone}?text=${message}`, '_blank')
      
      // Update quote status to sent
      await supabase
        .from('quotes')
        .update({ 
          status: 'sent',
          whatsapp_sent_at: new Date().toISOString() 
        })
        .eq('id', quote.id)
      
    } catch (error) {
      console.error('Error sending WhatsApp:', error)
    } finally {
      setIsSendingWhatsApp(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Edit
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download PDF
          </Button>
          
          <Button
            onClick={handleSendWhatsApp}
            disabled={isSendingWhatsApp}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isSendingWhatsApp ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <MessageCircle className="w-4 h-4 mr-2" />
            )}
            Send via WhatsApp
          </Button>
        </div>
      </div>

      {/* Quote Preview */}
      <div className="flex justify-center">
        <QuotePreview ref={previewRef} quote={quote} hotelDetails={hotelDetails} />
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-center gap-4 pb-8">
        <Button variant="outline" onClick={() => router.push(`/crm/quote/${quote.id}/edit`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Quote
        </Button>
        <Button onClick={() => router.push('/crm/quote/new')}>
          Create New Quote
        </Button>
      </div>
    </div>
  )
}
