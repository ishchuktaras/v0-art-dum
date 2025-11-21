export default function ObchodniPodminkyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Obchodní podmínky</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Úvodní ustanovení</h2>
            <p>
              Tyto obchodní podmínky upravují vztahy mezi objednatelem a zhotovitelem při realizaci stavebních prací a
              služeb poskytovaných společností:
            </p>
            <p className="font-semibold">Oleh Kulish, OSVČ - ART DUM</p>
            <p className="font-semibold">IČO: 22401261</p>
            <p>se sídlem: Karlovo nám 44/33, 674 01 Třebíč</p>
            <p>Email: firma@artdum.cz, Telefon: +420 774 335 592</p>
            <p className="mt-4">(dále jen „zhotovitel")</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Předmět podnikání</h2>
            <p>Zhotovitel se zabývá poskytováním stavebních prací, zejména:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kompletní rekonstrukce bytů a domů</li>
              <li>Stavby rodinných domů na klíč</li>
              <li>Rekonstrukce koupelen</li>
              <li>Zateplení fasád</li>
              <li>Stavby garáží a přístaveb</li>
              <li>Rekonstrukce komerčních prostor</li>
              <li>Opravy a údržba nemovitostí</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Vznik smluvního vztahu</h2>
            <p>Smluvní vztah vzniká:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Podpisem písemné Smlouvy o dílo mezi objednatelem a zhotovitelem</li>
              <li>Akceptací cenové nabídky objednatelem v písemné nebo elektronické formě</li>
            </ol>
            <p className="mt-4">
              Před podpisem smlouvy je vždy provedena nezávazná prohlídka a konzultace na místě realizace, na jejímž
              základě je zpracována cenová nabídka.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Práva a povinnosti zhotovitele</h2>
            <p>Zhotovitel se zavazuje:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provést dílo řádně, včas a v kvalitě odpovídající smlouvě</li>
              <li>Provést dílo v souladu s platnými českými normami ČSN, stavebními předpisy a hygienickými normami</li>
              <li>Zajistit odbornou způsobilost pracovníků</li>
              <li>Používat kvalitní materiály a certifikované výrobky</li>
              <li>Dodržovat bezpečnost práce a ochranu zdraví</li>
              <li>Chránit majetek objednatele</li>
              <li>Informovat objednatele o průběhu prací</li>
              <li>Předat objednateli kompletní dokumentaci díla</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Práva a povinnosti objednatele</h2>
            <p>Objednatel se zavazuje:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Poskytnout zhotoviteli veškerou součinnost potřebnou k řádnému provedení díla</li>
              <li>Zajistit přístup na staveniště</li>
              <li>Poskytnout přípojky energie a vody (není-li dohodnuto jinak)</li>
              <li>Uhradit cenu díla v termínech a způsobem dohodnutým ve smlouvě</li>
              <li>Převzít dílo po jeho dokončení</li>
              <li>Oznámit bez zbytečného odkladu vady díla</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Cena a platební podmínky</h2>
            <p>Cena díla je stanovena:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>V písemné cenové nabídce schválené objednatelem</li>
              <li>Ve smlouvě o dílo</li>
            </ul>
            <p className="mt-4">Cena zahrnuje:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Veškeré práce specifikované ve smlouvě</li>
              <li>Materiál dle specifikace</li>
              <li>Odvoz stavebního odpadu</li>
              <li>Úklid staveniště po dokončení</li>
            </ul>
            <p className="mt-4">Standardní platební podmínky:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Záloha 50%</strong> - splatná před zahájením prací
              </li>
              <li>
                <strong>Doplatek 50%</strong> - splatný po dokončení a předání díla
              </li>
            </ul>
            <p className="mt-4">Platba je možná:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Bankovním převodem na účet zhotovitele</li>
              <li>V hotovosti při předání díla (do výše 270 000 Kč dle zákona)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Termíny realizace</h2>
            <p>Termín dokončení díla je stanoven ve smlouvě o dílo. Zhotovitel se zavazuje dodržet dohodnutý termín.</p>
            <p className="mt-4">Termín může být prodloužen v případě:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Změny rozsahu díla na žádost objednatele</li>
              <li>Neposkytnutí součinnosti ze strany objednatele</li>
              <li>Vyšší moci (živelné pohromy, pandemie, apod.)</li>
              <li>Nepředvídatelných okolností (skryté vady podkladu, archeologické nálezy, apod.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Změny rozsahu díla a vícepráce</h2>
            <p>Změny rozsahu díla nebo vícepráce je možné provést pouze:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Na základě písemného požadavku objednatele</li>
              <li>Po odsouhlasení cenové nabídky na vícepráce</li>
              <li>Formou dodatku ke smlouvě o dílo</li>
            </ul>
            <p className="mt-4">Vícepráce jsou účtovány hodinovou sazbou nebo dle cenové nabídky.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Předání a převzetí díla</h2>
            <p>Dílo je dokončeno, jakmile je provedeno v rozsahu vyplývajícím ze smlouvy.</p>
            <p className="mt-4">Zhotovitel je povinen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informovat objednatele o dokončení díla</li>
              <li>Umožnit objednateli prohlídku díla</li>
              <li>Předat dílo bez vad</li>
            </ul>
            <p className="mt-4">Objednatel je povinen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dílo prohlédnout a převzít</li>
              <li>Podepsat předávací protokol</li>
              <li>Uhradit doplatek ceny díla</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Záruka za jakost a reklamace</h2>
            <p>Zhotovitel poskytuje záruku na provedené práce:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Stavební práce:</strong> 60 měsíců (5 let)
              </li>
              <li>
                <strong>Instalatérské práce:</strong> 36 měsíců (3 roky)
              </li>
              <li>
                <strong>Elektroinstalace:</strong> 36 měsíců (3 roky)
              </li>
              <li>
                <strong>Malířské práce:</strong> 24 měsíců (2 roky)
              </li>
            </ul>
            <p className="mt-4">Záruka se nevztahuje na:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vady způsobené neodborným zásahem třetí strany</li>
              <li>Mechanické poškození</li>
              <li>Nedodržení návodu na údržbu</li>
              <li>Běžné opotřebení</li>
            </ul>
            <p className="mt-4">Reklamace musí být uplatněna:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Písemně nebo emailem</li>
              <li>S popisem vady a fotodokumentací</li>
              <li>V záruční době</li>
            </ul>
            <p className="mt-4">Zhotovitel odstraní vady bezplatně do 30 dnů od uplatnění reklamace.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Odstoupení od smlouvy</h2>
            <p>Objednatel může odstoupit od smlouvy:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kdykoliv před zahájením prací bez sankce</li>
              <li>Po zahájení prací s povinností uhradit provedené práce a objednané materiály</li>
            </ul>
            <p className="mt-4">Zhotovitel může odstoupit od smlouvy v případě:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prodlení objednatele s úhradou zálohy delší než 14 dnů</li>
              <li>Neposkytnutí nezbytné součinnosti objednatelem</li>
              <li>Podstatného porušení povinností objednatelem</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Odpovědnost za škodu</h2>
            <p>Zhotovitel odpovídá za škodu způsobenou objednateli při provádění díla.</p>
            <p>Zhotovitel má uzavřeno pojištění odpovědnosti za škodu s limitem pojistného plnění 5 000 000 Kč.</p>
            <p className="mt-4">Objednatel odpovídá za škodu způsobenou zhotoviteli:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Neposkytnutím součinnosti</li>
              <li>Poskytnutím nesprávných informací</li>
              <li>Zásahem do díla před jeho dokončením</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">13. Ochrana osobních údajů</h2>
            <p>
              Zpracování osobních údajů se řídí samostatným dokumentem "Zásady ochrany osobních údajů (GDPR)", který je
              dostupný na webových stránkách www.artdum.cz/gdpr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">14. Závěrečná ustanovení</h2>
            <p>Tyto obchodní podmínky jsou platné a účinné od 1. 1. 2025.</p>
            <p className="mt-4">
              Zhotovitel si vyhrazuje právo změnit tyto obchodní podmínky. Změna nabývá účinnosti dnem zveřejnění na
              webových stránkách.
            </p>
            <p className="mt-4">
              Vztahy výslovně neupravené těmito obchodními podmínkami se řídí příslušnými ustanoveními občanského
              zákoníku č. 89/2012 Sb.
            </p>
            <p className="mt-4">
              Veškeré spory vzniklé z těchto obchodních podmínek nebo v souvislosti s nimi budou řešeny obecnými soudy
              České republiky.
            </p>
          </section>

          <section className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">V Třebíči, dne 1. 1. 2025</p>
            <p className="text-sm text-muted-foreground mt-2">Oleh Kulish, OSVČ - ART DUM, zhotovitel</p>
          </section>
        </div>
      </div>
    </div>
  )
}
