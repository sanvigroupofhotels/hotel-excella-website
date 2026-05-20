'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Building2, 
  CreditCard, 
  BedDouble, 
  Save,
  Loader2,
  CheckCircle,
} from 'lucide-react'
import type { AppSetting, RoomType, Charge } from '@/lib/types/crm'

interface SettingsClientProps {
  settings: AppSetting[]
  roomTypes: RoomType[]
  charges: Charge[]
}

export function SettingsClient({ settings, roomTypes: initialRoomTypes, charges: initialCharges }: SettingsClientProps) {
  const supabase = createClient()
  const [isSaving, setIsSaving] = useState(false)
  const [savedSection, setSavedSection] = useState<string | null>(null)
  const [roomTypes, setRoomTypes] = useState(initialRoomTypes)
  const [chargesList, setChargesList] = useState(initialCharges)

  // Get settings values
  const getSetting = (key: string) => {
    const setting = settings.find((s) => s.key === key)
    return setting?.value
  }

  const [taxRate, setTaxRate] = useState(getSetting('tax_rate') as string || '12')
  const [validityDays, setValidityDays] = useState(getSetting('quote_validity_days') as string || '14')
  
  const hotelDetails = getSetting('hotel_details') as { name: string; address: string; phone: string; email: string; website: string } || {
    name: 'Hotel Excella',
    address: '',
    phone: '',
    email: '',
    website: '',
  }
  const [hotelName, setHotelName] = useState(hotelDetails.name)
  const [hotelAddress, setHotelAddress] = useState(hotelDetails.address)
  const [hotelPhone, setHotelPhone] = useState(hotelDetails.phone)
  const [hotelEmail, setHotelEmail] = useState(hotelDetails.email)
  const [hotelWebsite, setHotelWebsite] = useState(hotelDetails.website)

  const handleSaveGeneral = async () => {
    setIsSaving(true)
    try {
      await supabase
        .from('app_settings')
        .update({ value: taxRate })
        .eq('key', 'tax_rate')

      await supabase
        .from('app_settings')
        .update({ value: validityDays })
        .eq('key', 'quote_validity_days')

      await supabase
        .from('app_settings')
        .update({ 
          value: {
            name: hotelName,
            address: hotelAddress,
            phone: hotelPhone,
            email: hotelEmail,
            website: hotelWebsite,
          }
        })
        .eq('key', 'hotel_details')

      setSavedSection('general')
      setTimeout(() => setSavedSection(null), 2000)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateRoomType = async (id: string, field: keyof RoomType, value: number | boolean) => {
    const { error } = await supabase
      .from('room_types')
      .update({ [field]: value })
      .eq('id', id)

    if (!error) {
      setRoomTypes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
      )
    }
  }

  const handleUpdateCharge = async (id: string, field: keyof Charge, value: number | boolean) => {
    const { error } = await supabase
      .from('charges')
      .update({ [field]: value })
      .eq('id', id)

    if (!error) {
      setChargesList((prev) =>
        prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
      )
    }
  }

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general" className="gap-2">
          <Building2 className="w-4 h-4" />
          General
        </TabsTrigger>
        <TabsTrigger value="rooms" className="gap-2">
          <BedDouble className="w-4 h-4" />
          Room Types
        </TabsTrigger>
        <TabsTrigger value="charges" className="gap-2">
          <CreditCard className="w-4 h-4" />
          Charges
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        {/* Hotel Details */}
        <Card>
          <CardHeader>
            <CardTitle>Hotel Details</CardTitle>
            <CardDescription>This information appears on quotes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hotelName">Hotel Name</Label>
                <Input
                  id="hotelName"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hotelPhone">Phone</Label>
                <Input
                  id="hotelPhone"
                  value={hotelPhone}
                  onChange={(e) => setHotelPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotelAddress">Address</Label>
              <Input
                id="hotelAddress"
                value={hotelAddress}
                onChange={(e) => setHotelAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hotelEmail">Email</Label>
                <Input
                  id="hotelEmail"
                  type="email"
                  value={hotelEmail}
                  onChange={(e) => setHotelEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hotelWebsite">Website</Label>
                <Input
                  id="hotelWebsite"
                  value={hotelWebsite}
                  onChange={(e) => setHotelWebsite(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Settings</CardTitle>
            <CardDescription>Configure default quote parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  min="0"
                  max="100"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="validityDays">Quote Validity (Days)</Label>
                <Input
                  id="validityDays"
                  type="number"
                  min="1"
                  value={validityDays}
                  onChange={(e) => setValidityDays(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveGeneral} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : savedSection === 'general' ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {savedSection === 'general' ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="rooms" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Room Types</CardTitle>
            <CardDescription>Manage room types and their tariffs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomTypes.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{room.name}</h4>
                      <Badge variant="outline">{room.code}</Badge>
                      {!room.is_active && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{room.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Base:</Label>
                        <Input
                          type="number"
                          className="w-24"
                          value={room.base_tariff}
                          onChange={(e) => handleUpdateRoomType(room.id, 'base_tariff', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Label className="text-sm">With Breakfast:</Label>
                        <Input
                          type="number"
                          className="w-24"
                          value={room.tariff_with_breakfast}
                          onChange={(e) => handleUpdateRoomType(room.id, 'tariff_with_breakfast', parseFloat(e.target.value))}
                        />
                      </div>
                    </div>
                    <Switch
                      checked={room.is_active}
                      onCheckedChange={(v) => handleUpdateRoomType(room.id, 'is_active', v)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="charges" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Additional Charges</CardTitle>
            <CardDescription>Manage extra charges and fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chargesList.map((charge) => (
                <div key={charge.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{charge.name}</h4>
                      <Badge variant="outline">{charge.code}</Badge>
                      {!charge.is_active && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{charge.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Amount:</Label>
                      <Input
                        type="number"
                        className="w-24"
                        value={charge.amount}
                        onChange={(e) => handleUpdateCharge(charge.id, 'amount', parseFloat(e.target.value))}
                      />
                    </div>
                    <Switch
                      checked={charge.is_active}
                      onCheckedChange={(v) => handleUpdateCharge(charge.id, 'is_active', v)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
