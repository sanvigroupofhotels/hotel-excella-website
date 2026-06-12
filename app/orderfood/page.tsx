"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Minus, Plus, ShoppingBag, ChevronRight, Phone, MessageCircle } from "lucide-react"
import logoImage from "@/app/orderfood/images/logotransparent.png"

type MenuItem = {
  Sorter_by_Category: string
  Type: string
  Category: string
  Name: string
  Description: string
  Price: string
  ImageURL: string
}

type MenuData = {
  veg: Record<string, MenuItem[]>
  nonveg: Record<string, MenuItem[]>
  general: Record<string, MenuItem[]>
}

type OrderItem = {
  qty: number
  price: number
}

type CurrentOrder = Record<string, OrderItem>

function parseCSV(text: string): MenuItem[] {
  const rows: string[][] = []
  let current = ""
  let row: string[] = []
  let inQuotes = false
  const normalized = text.replace(/\r\n/g, "\n")

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i]
    const next = normalized[i + 1]
    if (char === '"' && inQuotes && next === '"') {
      current += '"'
      i++
      continue
    }
    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }
    if (char === "," && !inQuotes) {
      row.push(current.trim())
      current = ""
      continue
    }
    if (char === "\n" && !inQuotes) {
      row.push(current.trim())
      if (row.some(Boolean)) rows.push(row)
      row = []
      current = ""
      continue
    }
    current += char
  }

  if (current.length || row.length) {
    row.push(current.trim())
    if (row.some(Boolean)) rows.push(row)
  }

  const headers = (rows.shift() || []).map((h) => h.trim())
  return rows.map((values) => {
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => (obj[h] = values[i] ? values[i].trim() : ""))
    return obj as unknown as MenuItem
  })
}

const availableImages = new Set([
  "ApolloFish.jpg",
  "BabyCorn65.jpg",
  "BabyCornManchurian.jpg",
  "ButterGarlicFish.jpg",
  "ButterGarlicPrawn.jpg",
  "CashewChicken.jpg",
  "Chicken555.jpg",
  "Chicken65.jpg",
  "ChickenBonelessBiryani.jpg",
  "ChickenChillyWings.jpg",
  "ChickenDrumsticks(6Pcs).jpg",
  "ChickenDumBiryani.JPG",
  "ChickenFriedWings(9Pcs).jpg",
  "ChickenFryBiryani.jpg",
  "ChickenHotandSourceSoup.jpg",
  "ChickenLemonCorriandorSoup.jpg",
  "ChickenLollypop(6Pcs).jpg",
  "ChickenManchowSoup.jpg",
  "ChickenManchurian.JPG",
  "ChickenMughalaiBiryani.jpg",
  "ChickenSweetcornSoup.jpg",
  "ChickenTikka8pcs.jpg",
  "ChilliMushroom.jpg",
  "ChillyBabyCorn.jpg",
  "ChillyChicken.jpg",
  "ChillyGarlicPrawn.jpg",
  "CrispyAmericanCorn.jpg",
  "CrispyBabyCorn.jpg",
  "CrispyChicken.jpg",
  "CrunchyChicken.jpg",
  "DragonChicken.jpg",
  "FrenchFries.jpg",
  "GarlicChicken.jpg",
  "GingerChicken.jpg",
  "LemonChicken.jpg",
  "LemonCorriandorSoup.jpg",
  "LoosePrawns.jpg",
  "MurgMalaiKabab8pcs.jpg",
  "Mushroom65.jpg",
  "MushroomManchurian.jpg",
  "PaneerManchurian.jpg",
  "PepperChicken.jpg",
  "PrawnsRoast.jpg",
  "SchezwanChicken.jpg",
  "SchezwanPrawn.jpg",
  "TandooriChickenFull.jpg",
  "TandooriChickenHalf.jpg",
  "TandooriDoubleJointBiryani.jpg",
  "TandooriPrawn.jpg",
  "VegHotandSourceSoup.jpg",
  "VegManchowSoup.jpg",
  "VegManchurian.jpg",
  "VegSweetcornSoup.jpg",
  "chickenthangdikababfull.jpg",
  "chickenthangdikababhalf.jpg",
  "chilligarlicfish.jpg",
  "chillipaneer.jpg",
  "garlic_bread.jpg",
  "kfcpaneer.jpg",
  "muttonfry.jpg",
  "paneer65.jpg",
  "paneerfingers.jpg",
  "paneermalaitikka.jpg",
  "paneertikka.jpg",
  "spring_rolls.jpg",
])

function resolveImageSource(fileName: string | undefined): string | null {
  if (!fileName) return null
  const base = fileName.replace(/^images\//i, "").trim()
  const extIndex = base.lastIndexOf(".")
  if (extIndex < 0) return null

  const nameOnly = base.slice(0, extIndex)
  const ext = base.slice(extIndex + 1)
  const variants = [
    base,
    `${nameOnly}.${ext.toLowerCase()}`,
    `${nameOnly}.${ext.toUpperCase()}`,
    `${nameOnly.replace(/\s+/g, "")}.${ext}`,
    `${nameOnly.replace(/\s+/g, "")}.${ext.toLowerCase()}`,
    `${nameOnly.replace(/\s+/g, "")}.${ext.toUpperCase()}`,
  ]

  const validName = variants.find((name) => availableImages.has(name))
  if (validName) return `/orderfood/data/images/${encodeURIComponent(validName)}`
  return variants[0] ? `/orderfood/data/images/${encodeURIComponent(variants[0])}` : null
}

function isValidRoomNumber(room: string): boolean {
  const validRooms: number[] = []
  ;[100, 200, 300, 400].forEach((floor) => {
    for (let i = 1; i <= 6; i++) validRooms.push(floor + i)
  })
  return validRooms.includes(parseInt(room, 10))
}

function isValidPhoneNumber(number: string): boolean {
  return /^[6-9]\d{9}$/.test(number)
}

export default function OrderFoodPage() {
  const [menuData, setMenuData] = useState<MenuData>({ veg: {}, nonveg: {}, general: {} })
  const [currentTab, setCurrentTab] = useState<"veg" | "nonveg" | "general">("veg")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder>({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null)
  
  // Form state
  const [guestName, setGuestName] = useState("")
  const [roomNumber, setRoomNumber] = useState("")
  const [guestWhatsApp, setGuestWhatsApp] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  
  const categoryScrollRef = useRef<HTMLDivElement>(null)

  // Load menu data
  useEffect(() => {
    fetch("/orderfood/data/menu.csv")
      .then((r) => r.text())
      .then((text) => {
        const rows = parseCSV(text)
        const data: MenuData = { veg: {}, nonveg: {}, general: {} }
        rows.forEach((row) => {
          const type = row.Type.toLowerCase() as "veg" | "nonveg" | "general"
          const category = row.Category || "Misc"
          if (!data[type]) data[type] = {}
          if (!data[type][category]) data[type][category] = []
          data[type][category].push(row)
        })
        setMenuData(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  // Load saved order from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("hotel_excella_order")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && typeof parsed === "object") {
          setCurrentOrder(parsed)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Save order to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("hotel_excella_order", JSON.stringify(currentOrder))
  }, [currentOrder])

  // Set initial category
  useEffect(() => {
    const categories = Object.keys(menuData[currentTab])
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0])
    } else if (categories.length > 0 && !menuData[currentTab][activeCategory!]) {
      setActiveCategory(categories[0])
    }
  }, [menuData, currentTab, activeCategory])

  const categories = useMemo(() => Object.keys(menuData[currentTab]), [menuData, currentTab])
  const items = useMemo(
    () => (activeCategory ? menuData[currentTab][activeCategory] || [] : []),
    [menuData, currentTab, activeCategory]
  )

  const totalItems = useMemo(
    () => Object.values(currentOrder).reduce((sum, item) => sum + item.qty, 0),
    [currentOrder]
  )

  const subtotal = useMemo(
    () => Object.values(currentOrder).reduce((sum, item) => sum + item.qty * item.price, 0),
    [currentOrder]
  )

  const gst = subtotal * 0.05
  const grandTotal = subtotal + gst

  const addItem = (name: string, price: number) => {
    setCurrentOrder((prev) => ({
      ...prev,
      [name]: { qty: (prev[name]?.qty || 0) + 1, price },
    }))
  }

  const removeItem = (name: string) => {
    setCurrentOrder((prev) => {
      const newOrder = { ...prev }
      if (newOrder[name]) {
        newOrder[name] = { ...newOrder[name], qty: newOrder[name].qty - 1 }
        if (newOrder[name].qty <= 0) {
          delete newOrder[name]
        }
      }
      return newOrder
    })
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!guestName.trim()) {
      errors.guestName = "Guest name is required"
    }

    if (!roomNumber.trim()) {
      errors.roomNumber = "Room number is required"
    } else if (!isValidRoomNumber(roomNumber)) {
      errors.roomNumber = "Valid rooms: 101-106, 201-206, 301-306, 401-406"
    }

    if (!guestWhatsApp.trim()) {
      errors.guestWhatsApp = "WhatsApp number is required"
    } else if (!isValidPhoneNumber(guestWhatsApp)) {
      errors.guestWhatsApp = "Enter a valid 10-digit Indian mobile number"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleConfirmOrder = () => {
    if (!validateForm()) return
    if (Object.keys(currentOrder).length === 0) {
      alert("Please add at least one item to your order.")
      return
    }

    const orderDetails = Object.entries(currentOrder)
      .map(([name, item]) => `${name} x ${item.qty}`)
      .join("\n")

    const msg = `Guest: ${guestName.trim()}\nRoom: ${roomNumber.trim()}\nWhatsApp: ${guestWhatsApp.trim()}\nOrder:\n${orderDetails}\nTotal: ₹${grandTotal.toFixed(2)}`
    window.open(`https://wa.me/919985908131?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#060606]/90 backdrop-blur-xl border-b border-[#c8a45c]/20">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/guest" className="flex items-center gap-2">
            <Image
              src={logoImage}
              alt="Hotel Excella"
              width={36}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg border border-[#c8a45c]/40 text-[#c8a45c]"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Page Title */}
      <div className="pt-16 pb-2 px-4 max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold text-[#d7b35f]">Order Food</h1>
        <p className="text-sm text-white/60">Fresh food delivered to your room</p>
      </div>

      {/* Type Tabs - Veg/NonVeg/General */}
      <div className="sticky top-14 z-40 bg-[#060606]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <div className="flex gap-2 p-1 rounded-full bg-white/5 border border-white/10">
            {(["veg", "nonveg", "general"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setCurrentTab(tab)
                  setActiveCategory(null)
                }}
                className={`flex-1 py-2 px-3 rounded-full text-sm font-medium transition-all ${
                  currentTab === tab
                    ? "bg-gradient-to-r from-[#d7b35f] to-[#c8a45c] text-[#0a0a0a] shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tab === "veg" ? "Veg" : tab === "nonveg" ? "Non Veg" : "General"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="sticky top-[7.5rem] z-30 bg-[#060606]/95 backdrop-blur-xl">
        <div
          ref={categoryScrollRef}
          className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-[#c8a45c]/20 text-[#d7b35f] border border-[#c8a45c]/50"
                  : "text-white/60 hover:text-white border border-transparent hover:border-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <main className="max-w-5xl mx-auto px-4 pb-32">
        {isLoading ? (
          <div className="py-12 text-center text-white/50">Loading menu...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-white/50">No items in this category</div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item, index) => {
              const imageSrc = resolveImageSource(item.ImageURL)
              const price = parseFloat(item.Price || "0")
              const qty = currentOrder[item.Name]?.qty || 0

              return (
                <div key={`${item.Name}-${index}`} className="py-4 flex gap-4">
                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white leading-tight">{item.Name}</h3>
                    <p className="text-[#d7b35f] font-semibold mt-1">₹{price.toFixed(0)}</p>
                    {item.Description && (
                      <p className="text-sm text-white/50 mt-1 line-clamp-2">{item.Description}</p>
                    )}
                  </div>

                  {/* Image + Add Button */}
                  <div className="flex-shrink-0 relative">
                    {imageSrc ? (
                      <button
                        onClick={() => setPreviewImage({ src: imageSrc, alt: item.Name })}
                        className="block"
                      >
                        <img
                          src={imageSrc}
                          alt={item.Name}
                          className="w-[104px] h-[96px] object-cover rounded-lg"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                        />
                      </button>
                    ) : (
                      <div className="w-[104px] h-[96px] rounded-lg bg-white/5" />
                    )}
                    
                    {/* Add/Quantity Control */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      {qty > 0 ? (
                        <div className="flex items-center gap-1 bg-[#0a0a0a] border border-[#c8a45c] rounded-lg shadow-lg">
                          <button
                            onClick={() => removeItem(item.Name)}
                            className="w-8 h-8 flex items-center justify-center text-[#c8a45c] hover:bg-white/5 rounded-l-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-[#d7b35f]">
                            {qty}
                          </span>
                          <button
                            onClick={() => addItem(item.Name, price)}
                            className="w-8 h-8 flex items-center justify-center text-[#c8a45c] hover:bg-white/5 rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem(item.Name, price)}
                          className="px-5 py-1.5 bg-[#0a0a0a] border border-[#c8a45c] rounded-lg text-[#d7b35f] text-sm font-semibold shadow-lg hover:bg-[#c8a45c]/10 transition-colors"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Info Notes */}
        <div className="mt-8 space-y-2 text-sm text-white/40">
          <p>Food is freshly prepared in our Cloud Kitchen; items subject to availability.</p>
          <p>Delivery time: Approx 45 mins.</p>
          <p>
            Feedback/concerns:{" "}
            <a
              href="https://wa.me/919985908131?text=Hello%20team%2C%20I%20found%20this%20link%20on%20Food%20Ordering%20page%20and%20I%20have%20a%20suggestion/feedback/concern%20please"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d7b35f] hover:underline"
            >
              WhatsApp
            </a>{" "}
            or{" "}
            <a href="tel:+919985908131" className="text-[#d7b35f] hover:underline">
              Call
            </a>
          </p>
        </div>
      </main>

      {/* Floating Cart Button */}
      {totalItems > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#d7b35f] to-[#c8a45c] text-[#0a0a0a] rounded-2xl shadow-2xl shadow-[#c8a45c]/30 font-semibold"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{totalItems} item{totalItems > 1 ? "s" : ""}</span>
          <span className="text-[#0a0a0a]/60">|</span>
          <span>₹{grandTotal.toFixed(0)}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Cart / Order Summary Sheet */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-[#0a0a0a] rounded-t-3xl border-t border-[#c8a45c]/30 overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Cart Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-[#d7b35f]">Your Order</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {Object.keys(currentOrder).length === 0 ? (
                <p className="text-center text-white/50 py-8">No items in cart</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(currentOrder).map(([name, item]) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{name}</p>
                        <p className="text-sm text-white/50">₹{(item.price * item.qty).toFixed(0)}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-white/5 rounded-lg">
                        <button
                          onClick={() => removeItem(name)}
                          className="w-7 h-7 flex items-center justify-center text-[#c8a45c]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-medium">{item.qty}</span>
                        <button
                          onClick={() => addItem(name, item.price)}
                          className="w-7 h-7 flex items-center justify-center text-[#c8a45c]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bill Details */}
              {Object.keys(currentOrder).length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-[#d7b35f]">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Guest Info Form */}
              {Object.keys(currentOrder).length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
                  <h3 className="text-sm font-medium text-white/80">Guest Information</h3>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Guest Name *"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value)
                        if (formErrors.guestName) setFormErrors((p) => ({ ...p, guestName: "" }))
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/40 text-sm outline-none transition-colors ${
                        formErrors.guestName ? "border-red-500/50" : "border-white/10 focus:border-[#c8a45c]/50"
                      }`}
                    />
                    {formErrors.guestName && (
                      <p className="text-xs text-red-400 mt-1">{formErrors.guestName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Room Number *"
                      value={roomNumber}
                      onChange={(e) => {
                        setRoomNumber(e.target.value)
                        if (formErrors.roomNumber) setFormErrors((p) => ({ ...p, roomNumber: "" }))
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/40 text-sm outline-none transition-colors ${
                        formErrors.roomNumber ? "border-red-500/50" : "border-white/10 focus:border-[#c8a45c]/50"
                      }`}
                    />
                    {formErrors.roomNumber && (
                      <p className="text-xs text-red-400 mt-1">{formErrors.roomNumber}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp Number *"
                      value={guestWhatsApp}
                      onChange={(e) => {
                        setGuestWhatsApp(e.target.value)
                        if (formErrors.guestWhatsApp) setFormErrors((p) => ({ ...p, guestWhatsApp: "" }))
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/40 text-sm outline-none transition-colors ${
                        formErrors.guestWhatsApp ? "border-red-500/50" : "border-white/10 focus:border-[#c8a45c]/50"
                      }`}
                    />
                    {formErrors.guestWhatsApp && (
                      <p className="text-xs text-red-400 mt-1">{formErrors.guestWhatsApp}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Button */}
            {Object.keys(currentOrder).length > 0 && (
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleConfirmOrder}
                  className="w-full py-3.5 bg-gradient-to-r from-[#d7b35f] to-[#c8a45c] text-[#0a0a0a] rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Confirm via WhatsApp
                </button>
                <p className="text-xs text-white/40 text-center mt-2">
                  Opens WhatsApp with your order details
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Mobile Navigation Sidebar */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/70"
            onClick={() => setIsMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-72 bg-[#0a0a0a] border-l border-[#c8a45c]/30 p-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-[#d7b35f]">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-2">
              <Link
                href="/guest"
                className="block px-4 py-3 rounded-xl border border-white/10 text-white/80 hover:border-[#c8a45c]/30"
              >
                Guest Portal
              </Link>
              <Link
                href="/review"
                className="block px-4 py-3 rounded-xl border border-white/10 text-white/80 hover:border-[#c8a45c]/30"
              >
                Review Us
              </Link>
              <a
                href="tel:+919985908131"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/80 hover:border-[#c8a45c]/30"
              >
                <Phone className="w-4 h-4" />
                Call Reception
              </a>
            </nav>
          </aside>
        </>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
            onClick={() => setPreviewImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={previewImage.src}
            alt={previewImage.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-xs text-white/30 pb-4">
        2022 Hotel Excella - All rights reserved.
      </footer>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
