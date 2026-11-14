// Italiano. Mirrors en.ts; written in the same voice (tu/noi), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const it = (f: Facts): Copy => ({
  locale: 'it_IT',
  langName: 'Italiano',
  skip: 'Vai al contenuto',
  nav: { home: 'Home', menu: 'Menu', visit: 'Dove siamo', faq: 'Domande', label: 'Navigazione principale' },
  status: {
    fallback: `Aperti tutti i giorni, dalle ${f.open} alle ${f.close}`,
    open: `Aperti ora, fino alle ${f.close}`,
    before: `Ora siamo chiusi, apriamo alle ${f.open}`,
    after: `Ora siamo chiusi, apriamo domani alle ${f.open}`,
  },
  actions: { menu: 'Vedi il menu', directions: 'Indicazioni', call: 'Chiamaci', google: 'Google Maps', apple: 'Mappe di Apple' },
  facts: { open: 'Orari', openValue: `Tutti i giorni, dalle ${f.open} alle ${f.close}`, address: 'Indirizzo', phone: 'Telefono' },
  storefrontAlt: 'L’ingresso de La Carbonara in Lange Niezel.',
  storefrontCaption: `Cerca l’insegna rossa al neon in ${f.street}.`,
  guests: {
    title: "Le foto dei nostri ospiti",
    credit: (name: string) => `Foto di ${name}`,
    pomodoro: "Linguine al sugo di pomodoro e basilico.",
    ragu: "Rigatoni al ragù con Parmigiano Reggiano.",
    bruschetta: "Bruschetta con stracciatella e pomodoro.",
  },
  photos: {
    carbonara: "Linguine alla carbonara con guanciale, Pecorino Romano e pepe nero.",
    bruschetta: "Bruschetta Cremosa: pane tostato con stracciatella, pomodori e basilico.",
    rigatoni: "Rigatoni al sugo di pomodoro con Parmigiano Reggiano e basilico.",
  },
  footer: {
    allergy: 'Allergie o esigenze alimentari? Diccelo prima di ordinare.',
    pages: 'Pagine',
    language: 'Lingua',
  },

  home: {
    title: 'Carbonara romana vicino alla Stazione Centrale di Amsterdam | La Carbonara',
    description: `La carbonara come si fa a Roma, senza panna, in ${f.street} ad Amsterdam. Aperti tutti i giorni dalle ${f.open} alle ${f.close}. Vieni senza prenotare o prendila da asporto, e tutte le bevande sono analcoliche.`,
    schema: 'Ristorante di pasta nel centro di Amsterdam con i classici romani: carbonara senza panna, cacio e pepe, amatriciana e gricia. Niente prenotazioni, anche da asporto, tutte le bevande analcoliche.',
    h1: 'Carbonara romana in Lange Niezel',
    lead: `La nostra carbonara la facciamo con guanciale, tuorlo d’uovo, Pecorino Romano e pepe nero, senza panna. Non serve prenotare: vieni quando vuoi, oppure prendi la pasta da asporto. Siamo a ${f.walk.centraal} minuti a piedi dalla Stazione Centrale.`,
    pastaTitle: 'La nostra pasta',
    pastaIntro: 'Quasi tutti i nostri primi sono romani. La bolognese, il pesto e i quattro formaggi vengono da altre parti d’Italia.',
    fullMenu: 'Vedi tutto il menu',
    drinksTitle: 'Da bere',
    drinksText: 'Non serviamo alcolici. I nostri spritz Aperol, Bitter e Limoncello sono analcolici, e così la Birra Moretti. Poi ci sono bibite frizzanti e caffè.',
    visitTitle: 'Come trovarci',
    visitText: `Siamo in ${f.street}, nel centro storico.`,
    lemonades: (n: number) => `Bibite frizzanti, ${n} gusti`,
    visitMore: 'Orari e come arrivare',
    faqTitle: 'Domande',
    faqMore: 'Tutte le domande',
  },

  menu: {
    title: 'Menu e prezzi | La Carbonara',
    description: `La nostra pasta, gli antipasti e le bevande analcoliche, con i prezzi. Pasta da ${f.minPasta} a ${f.maxPasta}. Ogni pasta si può fare senza glutine.`,
    h1: 'Menu',
    lead: `Possiamo fare qualsiasi pasta senza glutine con un supplemento di ${f.gf}. Se hai un’allergia, diccelo prima di ordinare.`,
    food: 'Da mangiare',
    drinks: 'Da bere',
    drinksNote: 'Tutte le nostre bevande sono analcoliche.',
    featured: 'Specialità della Casa',
  },

  visit: {
    title: 'Orari e come arrivare | La Carbonara',
    description: `Siamo in ${f.address}, a ${f.walk.centraal} minuti a piedi dalla Stazione Centrale di Amsterdam. Aperti tutti i giorni dalle ${f.open} alle ${f.close}, senza bisogno di prenotare.`,
    h1: 'Orari e come arrivare',
    hoursTitle: 'Orari di apertura',
    hoursText: `Siamo aperti tutti i giorni dalle ${f.open} alle ${f.close}.`,
    addressTitle: 'Indirizzo',
    walkTitle: 'Tempi a piedi',
    walk: [
      { place: 'Stazione Centrale', min: f.walk.centraal },
      { place: 'Piazza Dam', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `${n} min`,
    comingTitle: 'Senza prenotazione o da asporto',
    comingText: 'Non prendiamo prenotazioni, quindi vieni quando siamo aperti. Puoi anche prendere la pasta da asporto.',
    phoneTitle: 'Telefono',
  },

  faq: {
    title: 'Domande | La Carbonara',
    description: 'Bisogna prenotare? C’è la panna nella carbonara? Avete pasta senza glutine? Le nostre risposte alle domande che ci fanno più spesso.',
    h1: 'Le domande che ci fanno',
    items: [
      { q: 'Devo prenotare un tavolo?', a: `No. Non prendiamo prenotazioni, vieni pure direttamente. Siamo aperti tutti i giorni dalle ${f.open} alle ${f.close}.` },
      { q: 'Posso prendere la pasta da asporto?', a: 'Sì, basta dircelo quando ordini.' },
      { q: 'C’è la panna nella carbonara?', a: 'No. La facciamo con guanciale, tuorlo d’uovo, Pecorino Romano e pepe nero, come a Roma.' },
      { q: 'Avete pasta senza glutine?', a: `Sì. Possiamo fare qualsiasi pasta senza glutine con un supplemento di ${f.gf}. Diccelo quando ordini.` },
      { q: 'Servite alcolici?', a: 'No. Tutte le nostre bevande sono analcoliche (0,0%), compresi gli spritz e la Birra Moretti Zero.' },
      { q: 'Quanto costa un piatto di pasta?', a: `La nostra pasta costa da ${f.minPasta} a ${f.maxPasta}. La carbonara costa ${f.carbonara}.` },
      { q: 'Quanto siete lontani dalla Stazione Centrale?', a: `Circa ${f.walk.centraal} minuti a piedi. Ci trovi in ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Pagina non trovata | La Carbonara',
    h1: 'Non troviamo questa pagina',
    text: 'Questo link non porta da nessuna parte. Forse cercavi il nostro menu o gli orari di apertura?',
  },
});

export default it;
