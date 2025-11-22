export interface CommercialOfferData {
  inquiryId: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  services: Array<{
    name: string
    description: string
    price: string
    quantity?: number
  }>
  totalPrice: number
  validUntil: Date
  notes?: string
}

export interface ProjectDocumentData {
  projectId: string
  projectTitle: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  startDate?: string
  endDate?: string
  budgetEstimate?: number
  actualCost?: number
  description?: string
  services: string[]
}

export async function generateCommercialOffer(data: CommercialOfferData): Promise<Blob> {
  // Generate PDF with commercial offer
  const content = `
    KOMERČNÍ NABÍDKA
    
    Společnost: Oleh Kulish, OSVČ - ART DUM
    IČO: 23874694
    Adresa: Rantířovská 123/36, 586 01 Jihlava
    Email: info@webnamiru.site
    Telefon: +420 777 596 216
    
    ---
    
    Klient: ${data.clientName}
    Email: ${data.clientEmail}
    ${data.clientPhone ? `Telefon: ${data.clientPhone}` : ""}
    
    Datum vytvoření: ${new Date().toLocaleDateString("cs-CZ")}
    Platnost nabídky do: ${data.validUntil.toLocaleDateString("cs-CZ")}
    
    ---
    
    NABÍZENÉ SLUŽBY:
    
    ${data.services
      .map(
        (service, index) => `
    ${index + 1}. ${service.name}
       ${service.description}
       ${service.quantity ? `Množství: ${service.quantity}` : ""}
       Cena: ${service.price}
    `,
      )
      .join("\n")}
    
    ---
    
    CELKOVÁ CENA: ${data.totalPrice.toLocaleString("cs-CZ")} Kč
    
    ${data.notes ? `\nPoznámky:\n${data.notes}` : ""}
    
    ---
    
    S pozdravem,
    Oleh Kulish
    ART DUM
  `

  return new Blob([content], { type: "text/plain" })
}

export async function generateInvoiceDocument(data: ProjectDocumentData): Promise<Blob> {
  // Generate invoice document
  const content = `
    FAKTURA
    
    Dodavatel:
    Oleh Kulish, OSVČ - ART DUM
    IČO: 23874694
    Adresa: Rantířovská 123/36, 586 01 Jihlava
    Email: info@webnamiru.site
    Telefon: +420 777 596 216
    
    ---
    
    Odběratel:
    ${data.clientName}
    Email: ${data.clientEmail}
    ${data.clientPhone ? `Telefon: ${data.clientPhone}` : ""}
    
    ---
    
    Projekt: ${data.projectTitle}
    Číslo faktury: ${data.projectId.slice(0, 8).toUpperCase()}
    Datum vystavení: ${new Date().toLocaleDateString("cs-CZ")}
    Datum splatnosti: ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("cs-CZ")}
    
    ---
    
    Popis projektu:
    ${data.description || "N/A"}
    
    Poskytnuté služby:
    ${data.services.join(", ")}
    
    ---
    
    Celková částka k úhradě: ${data.actualCost?.toLocaleString("cs-CZ") || data.budgetEstimate?.toLocaleString("cs-CZ") || "N/A"} Kč
    
    Platební údaje:
    Číslo účtu: [doplnit]
    Variabilní symbol: ${data.projectId.slice(0, 10)}
  `

  return new Blob([content], { type: "text/plain" })
}

export async function generateConstructionDocument(data: ProjectDocumentData): Promise<Blob> {
  // Generate construction documentation
  const content = `
    STAVEBNÍ DOKUMENTACE
    
    Projekt: ${data.projectTitle}
    Číslo projektu: ${data.projectId.slice(0, 8).toUpperCase()}
    
    ---
    
    Objednatel:
    ${data.clientName}
    Email: ${data.clientEmail}
    ${data.clientPhone ? `Telefon: ${data.clientPhone}` : ""}
    
    ---
    
    Zhotovitel:
    Oleh Kulish, OSVČ - ART DUM
    IČO: 23874694
    Oprávnění: Nostrifikované vzdělání v ČR
    
    ---
    
    Termín zahájení: ${data.startDate ? new Date(data.startDate).toLocaleDateString("cs-CZ") : "Neurčeno"}
    Termín dokončení: ${data.endDate ? new Date(data.endDate).toLocaleDateString("cs-CZ") : "Neurčeno"}
    
    ---
    
    Popis projektu:
    ${data.description || "N/A"}
    
    Rozsah prací:
    ${data.services.map((service, index) => `${index + 1}. ${service}`).join("\n")}
    
    ---
    
    Použité materiály:
    - Ekologické materiály KEIM
    - Dekorativní stěrky dle evropských značek
    - Certifikované stavební materiály
    
    ---
    
    Odpovědná osoba: Oleh Kulish
    Podpis: _______________
    Datum: ${new Date().toLocaleDateString("cs-CZ")}
  `

  return new Blob([content], { type: "text/plain" })
}

export async function generateLegalDocument(data: ProjectDocumentData): Promise<Blob> {
  // Generate legal documentation
  const content = `
    SMLOUVA O DÍLO
    
    uzavřená dle § 2586 a násl. zákona č. 89/2012 Sb., občanský zákoník, v platném znění
    
    ---
    
    I. SMLUVNÍ STRANY
    
    Objednatel:
    ${data.clientName}
    Email: ${data.clientEmail}
    ${data.clientPhone ? `Telefon: ${data.clientPhone}` : ""}
    
    Zhotovitel:
    Oleh Kulish, OSVČ - ART DUM
    IČO: 23874694
    Sídlo: Rantířovská 123/36, 586 01 Jihlava
    Email: info@webnamiru.site
    Telefon: +420 777 596 216
    
    ---
    
    II. PŘEDMĚT SMLOUVY
    
    Projekt: ${data.projectTitle}
    Číslo zakázky: ${data.projectId.slice(0, 8).toUpperCase()}
    
    Popis díla:
    ${data.description || "Viz příloha smlouvy"}
    
    ---
    
    III. CENA A PLATEBNÍ PODMÍNKY
    
    Sjednaná cena: ${data.budgetEstimate?.toLocaleString("cs-CZ") || "Dle přílohy"} Kč
    Způsob platby: Bezhotovostní převod / hotově
    Záloha: Dle dohody
    
    ---
    
    IV. TERMÍN PLNĚNÍ
    
    Zahájení prací: ${data.startDate ? new Date(data.startDate).toLocaleDateString("cs-CZ") : "Dle dohody"}
    Dokončení prací: ${data.endDate ? new Date(data.endDate).toLocaleDateString("cs-CZ") : "Dle dohody"}
    
    ---
    
    V. ZÁRUČNÍ PODMÍNKY
    
    Zhotovitel poskytuje záruku na provedené dílo v délce 24 měsíců.
    
    ---
    
    VI. ZÁVĚREČNÁ USTANOVENÍ
    
    Smlouva nabývá platnosti dnem podpisu oběma smluvními stranami.
    Smlouva je vyhotovena ve dvou stejnopisech, každá strana obdrží jedno vyhotovení.
    
    ---
    
    V Jihlavě dne: ${new Date().toLocaleDateString("cs-CZ")}
    
    ______________________          ______________________
    Podpis objednatele              Podpis zhotovitele
                                    Oleh Kulish
  `

  return new Blob([content], { type: "text/plain" })
}
