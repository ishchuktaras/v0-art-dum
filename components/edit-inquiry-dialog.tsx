"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

interface EditInquiryDialogProps {
  inquiry: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    service_type?: string | null;
    status: string;
    priority?: string | null;
    message: string;
    notes?: string | null;
  };
}

export function EditInquiryDialog({ inquiry }: EditInquiryDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/inquiries/update", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Chyba při aktualizaci");

      toast.success("Poptávka byla úspěšně aktualizována");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Nepodařilo se aktualizovat poptávku");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Pencil className="h-4 w-4 mr-2" />
          Editovat poptávku
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upravit poptávku</DialogTitle>
          <DialogDescription>
            Úprava informací o poptávce od klienta {inquiry.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <input type="hidden" name="id" value={inquiry.id} />

          <div className="space-y-2">
            <Label htmlFor="name">Jméno klienta</Label>
            <Input id="name" name="name" defaultValue={inquiry.name} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={inquiry.email}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={inquiry.phone || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_type">Typ služby</Label>
            <Input
              id="service_type"
              name="service_type"
              defaultValue={inquiry.service_type || ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Stav</Label>
              <Select name="status" defaultValue={inquiry.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nová</SelectItem>
                  <SelectItem value="in_progress">Zpracovává se</SelectItem>
                  <SelectItem value="completed">Dokončeno</SelectItem>
                  <SelectItem value="rejected">Zamítnuto / Archiv</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priorita</Label>
              <Select
                name="priority"
                defaultValue={inquiry.priority || "normal"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Nízká</SelectItem>
                  <SelectItem value="normal">Normální</SelectItem>
                  <SelectItem value="high">Vysoká</SelectItem>
                  <SelectItem value="urgent">Urgentní</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Zpráva klienta</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={inquiry.message}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Interní poznámky</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={3}
              defaultValue={inquiry.notes || ""}
              placeholder="Viditelné pouze pro adminy"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Zrušit
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#D4AF37] text-[#0B192F] hover:bg-[#D4AF37]/90 font-bold"
            >
              {loading ? "Ukládání..." : "Uložit změny"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
