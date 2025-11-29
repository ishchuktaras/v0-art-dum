// app/admin/inquiries/[id]/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react";
import { CreateProjectDialog } from "@/components/create-project-dialog";
import { GenerateOfferDialog } from "@/components/generate-offer-dialog";
import { EditInquiryDialog } from "@/components/edit-inquiry-dialog";
import { DeleteInquiryButton } from "@/components/delete-inquiry-button";
import { ArchiveInquiryButton } from "@/components/archive-inquiry-button"; // NOVÉ: Import tlačítka

interface InquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({
  params,
}: InquiryDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "owner"].includes(profile.role)) {
    redirect("/403");
  }

  const { data: inquiry } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (!inquiry) {
    redirect("/404");
  }

  // Barvy statusů (přidal jsem 'archived' pro jistotu)
  const statusColors = {
    new: "bg-gold text-primary",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    archived: "bg-gray-100 text-gray-700", // Barva pro archivováno
  };

  const statusLabels = {
    new: "Nová",
    in_progress: "Zpracovává se",
    completed: "Dokončeno",
    rejected: "Odmítnuto",
    archived: "Archivováno",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-700",
    normal: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
    urgent: "bg-red-100 text-red-700",
  };

  const priorityLabels = {
    low: "Nízká",
    normal: "Normální",
    high: "Vysoká",
    urgent: "Urgentní",
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/inquiries">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zpět na poptávky
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-black">Detail poptávky</h1>
              <p className="text-sm text-muted-foreground">
                Úplné informace o poptávce
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Kontaktní informace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <User className="h-4 w-4" />
                    <Label>Jméno</Label>
                  </div>
                  <p className="font-medium text-lg">{inquiry.name}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Mail className="h-4 w-4" />
                    <Label>Email</Label>
                  </div>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="font-medium text-lg text-gold hover:underline"
                  >
                    {inquiry.email}
                  </a>
                </div>

                {inquiry.phone && (
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Phone className="h-4 w-4" />
                      <Label>Telefon</Label>
                    </div>
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="font-medium text-lg text-gold hover:underline"
                    >
                      {inquiry.phone}
                    </a>
                  </div>
                )}

                {inquiry.service_type && (
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <FileText className="h-4 w-4" />
                      <Label>Typ služby</Label>
                    </div>
                    <p className="font-medium text-lg capitalize">
                      {inquiry.service_type}
                    </p>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <Label>Datum vytvoření</Label>
                  </div>
                  <p className="font-medium">
                    {new Date(inquiry.created_at).toLocaleDateString("cs-CZ", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Zpráva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {inquiry.message}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interní poznámky</CardTitle>
              </CardHeader>
              <CardContent>
                <form action="/api/inquiries/update" method="POST">
                  <input type="hidden" name="id" value={inquiry.id} />
                  <Textarea
                    name="notes"
                    placeholder="Přidejte interní poznámky k této poptávce..."
                    defaultValue={inquiry.notes || ""}
                    rows={6}
                    className="mb-4"
                  />
                  <Button type="submit">Uložit poznámky</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stav a priorita</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Stav</Label>
                  <div className="mt-2">
                    <Badge
                      className={
                        statusColors[
                          inquiry.status as keyof typeof statusColors
                        ] || "bg-gray-100"
                      }
                    >
                      {statusLabels[
                        inquiry.status as keyof typeof statusLabels
                      ] || inquiry.status}
                    </Badge>
                  </div>
                </div>

                {inquiry.priority && (
                  <div>
                    <Label htmlFor="priority">Priorita</Label>
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className={
                          priorityColors[
                            inquiry.priority as keyof typeof priorityColors
                          ]
                        }
                      >
                        {
                          priorityLabels[
                            inquiry.priority as keyof typeof priorityLabels
                          ]
                        }
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rychlé akce</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <a href={`mailto:${inquiry.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Odpovědět emailem
                  </a>
                </Button>
                {inquiry.phone && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <a href={`tel:${inquiry.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Zavolat
                    </a>
                  </Button>
                )}
                <GenerateOfferDialog
                  inquiryId={inquiry.id}
                  clientName={inquiry.name}
                  clientEmail={inquiry.email}
                  clientPhone={inquiry.phone}
                />
                <CreateProjectDialog
                  inquiryId={inquiry.id}
                  clientName={inquiry.name}
                  inquiryMessage={inquiry.message}
                />
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Správa záznamu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <EditInquiryDialog inquiry={inquiry} />

                {/* NOVÉ: Komponenta pro archivaci */}
                <ArchiveInquiryButton id={inquiry.id} />

                {/* Komponenta pro smazání (již implementováno) */}
                <DeleteInquiryButton id={inquiry.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
