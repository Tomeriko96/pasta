// Italiano. Mirrors en.ts; written in the same voice (tu/noi), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const it = (f: Facts): Copy => ({
  locale: 'it_IT',
  langName: 'Italiano',
  skip: 'Vai al contenuto',
  nav: { language: "Lingua", home: 'Home', menu: 'Menu', visit: 'Dove siamo', faq: 'Domande', label: 'Navigazione principale' },
  status: {
    fallback: `Aperti tutti i giorni, dalle ${f.open} alle ${f.close}`,
    open: `Siamo aperti fino alle ${f.close}`,
    before: `Ora siamo chiusi. Apriamo alle ${f.open}`,
    after: `Ora siamo chiusi. Apriamo domani alle ${f.open}`,
  },
  actions: { label: "Collegamenti rapidi", menu: 'Vedi il menu', directions: 'Indicazioni', call: 'Chiamaci', google: 'Google Maps', apple: 'Mappe di Apple' },
  facts: { open: 'Orari', openValue: `Tutti i giorni, dalle ${f.open} alle ${f.close}`, address: 'Indirizzo', phone: 'Telefono' },
  storefrontAlt: 'L’ingresso del ristorante La Carbonara in Lange Niezel.',
  storefrontCaption: 'Cerca l’insegna rossa al neon.',
  guests: {
    title: "Le foto dei nostri ospiti",
    pomodoro: "Linguine al pomodoro e basilico.",
    ragu: "Bolognese: rigatoni al ragù bolognese con Parmigiano Reggiano.",
    bruschetta: "Bruschetta Cremosa con stracciatella e pomodorini.",
  },
  photos: {
    carbonara: "Linguine alla carbonara con guanciale, Pecorino Romano e pepe nero.",
    bruschetta: "Bruschetta Cremosa con stracciatella, pomodorini e basilico.",
    rigatoni: "Rigatoni al pomodoro con Parmigiano Reggiano e basilico.",
  },
  footer: {
    allergy: 'Allergie o esigenze alimentari? Diccelo prima di ordinare.',
    pages: 'Pagine',
    language: 'Lingua',
  },

  home: {
    title: 'Carbonara romana nel centro di Amsterdam | La Carbonara',
    description: `Carbonara romana senza panna in ${f.street}, ad Amsterdam. Aperti tutti i giorni dalle ${f.open} alle ${f.close}, senza prenotazione, anche da asporto.`,
    schema: 'Ristorante nel centro di Amsterdam con i classici della pasta romana: carbonara senza panna, Cacio e Pepe, Amatriciana e Gricia. Non si accettano prenotazioni, ma si può ordinare da asporto. Tutte le bevande sono analcoliche.',
    h1: 'Carbonara romana in Lange Niezel',
    lead: `La nostra carbonara la facciamo con guanciale, tuorlo d’uovo, Pecorino Romano e pepe nero, senza panna. Non accettiamo prenotazioni: vieni quando vuoi, oppure prendi la pasta da asporto.`,
    pastaTitle: 'La nostra pasta',
    pastaIntro: 'La maggior parte dei nostri primi è romana. La Bolognese, le Linguine al Pesto e la Quattro Formaggi vengono da altre parti d’Italia.',
    fullMenu: 'Vedi tutto il menu',
    drinksTitle: 'Da bere',
    drinksText: 'Non serviamo alcolici: gli spritz e la Birra Moretti Zero sono 0,0%. Abbiamo anche bibite frizzanti e caffè.',
    visitTitle: 'Dove siamo',
    visitText: `Ci trovi in ${f.street}, nel centro storico.`,
    lemonades: (n: number) => `Bibite frizzanti, ${n} gusti`,
    visitMore: 'Orari e come arrivare',
    faqTitle: 'Domande frequenti',
    faqMore: 'Tutte le domande',
  },

  menu: {
    title: 'Menu e prezzi | La Carbonara Amsterdam',
    description: `Pasta romana da ${f.minPasta} a ${f.maxPasta} vicino alla Stazione Centrale di Amsterdam. La carbonara costa ${f.carbonara} e ogni pasta si può avere senza glutine.`,
    h1: 'Menu',
    lead: `Possiamo preparare qualsiasi pasta senza glutine, con un supplemento di ${f.gf}.`,
    food: 'Da mangiare',
    drinks: 'Da bere',
    drinksNote: 'Tutte le nostre bevande sono analcoliche.',
    featured: 'Specialità della casa',
  },

  visit: {
    title: 'Orari e come arrivare | La Carbonara Amsterdam',
    description: `Siamo in ${f.street} ad Amsterdam, a circa ${f.walk.centraal} minuti a piedi dalla Stazione Centrale. Aperti tutti i giorni dalle ${f.open} alle ${f.close}, senza prenotazione.`,
    h1: 'Orari e come arrivare',
    hoursTitle: 'Orari di apertura',
    hoursText: `Siamo aperti tutti i giorni dalle ${f.open} alle ${f.close}.`,
    addressTitle: 'Indirizzo',
    walkTitle: 'A piedi',
    walk: [
      { place: 'Stazione Centrale', min: f.walk.centraal },
      { place: 'Piazza Dam', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `circa ${n} min`,
    comingTitle: 'Senza prenotazione o da asporto',
    comingText: 'Non accettiamo prenotazioni: vieni quando siamo aperti. Puoi anche prendere la pasta da asporto.',
    phoneTitle: 'Telefono',
  },

  faq: {
    title: 'Domande frequenti | La Carbonara Amsterdam',
    description: `Non accettiamo prenotazioni e nella nostra carbonara non c’è panna. Ogni pasta si può avere anche senza glutine, con un supplemento di ${f.gf}.`,
    h1: 'Domande frequenti',
    items: [
      { q: 'Devo prenotare un tavolo?', a: 'No. Non accettiamo prenotazioni, quindi vieni pure quando vuoi.' },
      { q: 'Posso prendere la pasta da asporto?', a: 'Sì, basta dircelo quando ordini.' },
      { q: 'C’è la panna nella carbonara?', a: 'No. La facciamo con guanciale, tuorlo d’uovo, Pecorino Romano e pepe nero, come a Roma.' },
      { q: 'Avete pasta senza glutine?', a: `Sì. Possiamo preparare qualsiasi pasta senza glutine con un supplemento di ${f.gf}. Diccelo quando ordini.` },
      { q: 'Servite alcolici?', a: 'No. Tutte le nostre bevande sono analcoliche (0,0%), compresi gli spritz e la Birra Moretti Zero.' },
      { q: 'Quanto costa la pasta?', a: `I nostri primi costano da ${f.minPasta} a ${f.maxPasta}, la carbonara ${f.carbonara}.` },
      { q: 'Quanto distate dalla Stazione Centrale?', a: `Circa circa ${f.walk.centraal} minuti a piedi. Ci trovi in ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Pagina non trovata | La Carbonara',
    h1: 'Non troviamo questa pagina',
    text: 'Questo link non porta da nessuna parte. Forse cercavi il nostro menu o gli orari di apertura?',
  },
});

export default it;
