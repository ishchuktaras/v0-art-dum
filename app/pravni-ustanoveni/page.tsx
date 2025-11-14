export default function PravniUstanoveniPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Právní ustanovení</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Autorská práva</h2>
            <p>Veškerý obsah těchto webových stránek, včetně textů, fotografií, grafiky a loga, je chráněn autorským právem a je majetkem společnosti Oleh Kulish nebo třetích stran, které poskytly souhlas k použití.</p>
            <p className="mt-4">Jakékoli užití obsahu, včetně jeho kopírování, šíření, přepracování nebo veřejného sdělování, je bez předchozího písemného souhlasu zakázáno.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Odpovědnost za obsah webu</h2>
            <p>Provozovatel webu se snaží, aby informace zveřejněné na těchto stránkách byly aktuální, úplné a přesné. Provozovatel však nepřebírá odpovědnost za případné nepřesnosti nebo chyby.</p>
            <p className="mt-4">Provozovatel si vyhrazuje právo kdykoli změnit nebo aktualizovat informace na těchto stránkách bez předchozího upozornění.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Externí odkazy</h2>
            <p>Tyto webové stránky mohou obsahovat odkazy na externí webové stránky třetích stran. Za obsah těchto externích stránek nepřebírá provozovatel žádnou odpovědnost.</p>
            <p className="mt-4">Odkazy jsou poskytovány pouze pro informační účely a neznamená to, že provozovatel schvaluje obsah externích stránek.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
            <p>Tyto webové stránky používají cookies pro zajištění správné funkčnosti webu a pro analýzu návštěvnosti.</p>
            <p className="mt-4">Používáním těchto stránek souhlasíte s používáním cookies v souladu s našimi Zásadami ochrany osobních údajů.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Omezení odpovědnosti</h2>
            <p>Provozovatel nenese odpovědnost za:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Škody vzniklé v důsledku používání nebo nemožnosti použití těchto webových stránek</li>
              <li>Ztrátu dat nebo zisku</li>
              <li>Přerušení provozu webu</li>
              <li>Virové útoky nebo neoprávněný přístup k systémům</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Ochranné známky</h2>
            <p>Všechny ochranné známky, loga a obchodní názvy zobrazené na těchto stránkách jsou majetkem jejich příslušných vlastníků.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Platné právní předpisy</h2>
            <p>Tyto webové stránky a jejich obsah se řídí právním řádem České republiky, zejména:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Zákon č. 89/2012 Sb., občanský zákoník</li>
              <li>Zákon č. 121/2000 Sb., autorský zákon</li>
              <li>Zákon č. 480/2004 Sb., o některých službách informační společnosti</li>
              <li>Nařízení EU 2016/679 (GDPR)</li>
              <li>Zákon č. 110/2019 Sb., o zpracování osobních údajů</li>
              <li>Zákon č. 183/2006 Sb., stavební zákon</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Kontakt</h2>
            <p>V případě jakýchkoliv dotazů týkajících se těchto právních ustanovení nás prosím kontaktujte:</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold">Oleh Kulish</p>
              <p>IČO: 22401261</p>
              <p>Karlovo nám 44/33, 674 01 Třebíč</p>
              <p>Email: firma@artdum.cz</p>
              <p>Telefon: +420 774 335 592</p>
            </div>
          </section>

          <section className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">Tato právní ustanovení nabývají účinnosti dnem 1. 1. 2025.</p>
            <p className="text-sm text-muted-foreground mt-2">Poslední aktualizace: 11. 11. 2025</p>
          </section>
        </div>
      </div>
    </div>
  )
}
