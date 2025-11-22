"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plus, Trash2, Download, Loader2 } from "lucide-react"
import { generateCommercialOffer, type CommercialOfferData } from "@/lib/document-generator"

interface GenerateOfferDialogProps {
  inquiryId: string
  clientName: string
  clientEmail: string
  clientPhone?: string
}

interface ServiceItem {
  name: string
  description: string
  price: string
  quantity: number
}

export function GenerateOfferDialog({ inquiryId, clientName, clientEmail, clientPhone }: GenerateOfferDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<ServiceItem[]>([{ name: "", description: "", price: "", quantity: 1 }])
  const [validDays, setValidDays] = useState("14")
  const [notes, setNotes] = useState("")

  const addService = () => {
    setServices([...services, { name: "", description: "", price: "", quantity: 1 }])
  }

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const updateService = (index: number, field: keyof ServiceItem, value: string | number) => {
    const updated = [...services]
    updated[index] = { ...updated[index], [field]: value }
    setServices(updated)
  }

  const calculateTotal = () => {
    return services.reduce((total, service) => {
      const price = Number.parseFloat(service.price.replace(/[^\d.-]/g, "")) || 0
      return total + price * service.quantity
    }, 0)
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const validUntil = new Date()
      validUntil.setDate(validUntil.getDate() + Number.parseInt(validDays))

      const offerData: CommercialOfferData = {
        inquiryId,
        clientName,
        clientEmail,
        clientPhone,
        services: services.filter((s) => s.name && s.price),
        totalPrice: calculateTotal(),
        validUntil,
        notes,
      }

      const blob = await generateCommercialOffer(offerData)
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `nabidka_${inquiryId.slice(0, 8)}_${new Date().getTime()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setOpen(false)
    } catch (error) {
      console.error("Error generating offer:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <FileText className="h-4 w-4 mr-2" />
          Vytvořit komerční nabídku
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generování komerční nabídky</DialogTitle>
          <DialogDescription>
            Vytvořte cenovou nabídku pro klienta <span className="font-semibold">{clientName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Services */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Nabízené služby</Label>
              <Button onClick={addService} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Přidat službu
              </Button>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Služba {index + 1}</Label>
                    {services.length > 1 && (
                      <Button
                        onClick={() => removeService(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`service-name-${index}`}>Název služby</Label>
                      <Input
                        id={`service-name-${index}`}
                        value={service.name}
                        onChange={(e) => updateService(index, "name", e.target.value)}
                        placeholder="např. Malování interiéru"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`service-price-${index}`}>Cena</Label>
                        <Input
                          id={`service-price-${index}`}
                          value={service.price}
                          onChange={(e) => updateService(index, "price", e.target.value)}
                          placeholder="5000 Kč"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`service-quantity-${index}`}>Množství</Label>
                        <Input
                          id={`service-quantity-${index}`}
                          type="number"
                          min="1"
                          value={service.quantity}
                          onChange={(e) => updateService(index, "quantity", Number.parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`service-description-${index}`}>Popis služby</Label>
                    <Textarea
                      id={`service-description-${index}`}
                      value={service.description}
                      onChange={(e) => updateService(index, "description", e.target.value)}
                      placeholder="Detailní popis poskytované služby"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Price */}
          <div className="p-4 bg-gold/10 dark:bg-gold/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Celková cena:</span>
              <span className="text-2xl font-bold text-gold">{calculateTotal().toLocaleString("cs-CZ")} Kč</span>
            </div>
          </div>

          {/* Validity */}
          <div>
            <Label htmlFor="valid-days">Platnost nabídky (dny)</Label>
            <Input
              id="valid-days"
              type="number"
              min="1"
              value={validDays}
              onChange={(e) => setValidDays(e.target.value)}
              className="max-w-xs"
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Dodatečné poznámky</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Volitelné poznámky k nabídce..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Zrušit
          </Button>
          <Button onClick={handleGenerate} disabled={loading} className="bg-gold hover:bg-gold/90">
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Generovat a stáhnout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
