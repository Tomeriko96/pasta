// Français. Mirrors en.ts; written in the same voice (nous/vous), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const fr = (f: Facts): Copy => ({
  locale: 'fr_FR',
  langName: 'Français',
  skip: 'Aller au contenu',
  nav: { language: "Langue", home: 'Accueil', menu: 'Carte', visit: 'Accès', faq: 'Questions', label: 'Navigation principale' },
  status: {
    fallback: `Ouvert tous les jours, de ${f.open} à ${f.close}`,
    open: `Ouvert jusqu’à ${f.close}`,
    before: `Fermé pour le moment. Nous ouvrons à ${f.open}`,
    after: `Fermé pour le moment. Nous ouvrons demain à ${f.open}`,
  },
  actions: { label: "Accès rapide", menu: 'Voir la carte', directions: 'Itinéraire', call: 'Nous appeler', google: 'Google Maps', apple: 'Apple Plans' },
  facts: { open: 'Horaires', openValue: `Tous les jours, de ${f.open} à ${f.close}`, address: 'Adresse', phone: 'Téléphone' },
  storefrontAlt: `La devanture de La Carbonara, ${f.street}.`,
  storefrontCaption: 'Cherchez l’enseigne au néon rouge.',
  guests: {
    title: "Les photos de nos clients",
    credit: (name: string) => `Photo : ${name}`,
    pomodoro: "Linguine à la sauce tomate et au basilic.",
    ragu: "Bolognese : rigatoni à la sauce bolognaise et au Parmigiano Reggiano.",
    bruschetta: "Bruschetta Cremosa à la stracciatella et à la tomate.",
  },
  photos: {
    carbonara: "Linguine carbonara au guanciale, Pecorino Romano et poivre noir.",
    bruschetta: "Bruschetta Cremosa : pain grillé, stracciatella, tomates et basilic.",
    rigatoni: "Pomodoro : rigatoni à la sauce tomate, au Parmigiano Reggiano et au basilic.",
  },
  footer: {
    allergy: 'Une allergie ou un régime particulier ? Dites-le-nous avant de commander.',
    pages: 'Pages',
    language: 'Langue',
  },

  home: {
    title: 'Carbonara romaine, centre d’Amsterdam | La Carbonara',
    description: `Carbonara romaine sans crème au ${f.street} à Amsterdam. Ouvert tous les jours de ${f.open} à ${f.close}, sans réservation. Toutes nos boissons sont sans alcool.`,
    schema: 'Restaurant de pâtes dans le centre d’Amsterdam, avec les classiques romains : carbonara sans crème, Cacio e Pepe, Amatriciana et Gricia. Sans réservation, vente à emporter, toutes les boissons sans alcool.',
    h1: `Carbonara romaine à Amsterdam, ${f.street}`,
    lead: `Notre carbonara, nous la faisons avec du guanciale, du jaune d’œuf, du Pecorino Romano et du poivre noir, sans crème. Nous ne prenons pas de réservations : venez directement, ou prenez vos pâtes à emporter.`,
    pastaTitle: 'Nos pâtes',
    pastaIntro: 'La plupart de nos recettes sont romaines. La Bolognese, les Linguine al Pesto et les Quattro Formaggi viennent d’autres régions d’Italie.',
    fullMenu: 'Voir toute la carte',
    drinksTitle: 'Boissons',
    drinksText: 'Nous ne servons pas d’alcool. Nos spritz et la Birra Moretti Zero sont à 0,0 %, et nous avons aussi des limonades pétillantes et du café.',
    visitTitle: 'Accès',
    visitText: `Nous sommes au ${f.street}, dans le vieux centre.`,
    lemonades: (n: number) => `Limonades pétillantes, ${n} parfums`,
    visitMore: 'Horaires et accès',
    faqTitle: 'Questions',
    faqMore: 'Toutes les questions',
  },

  menu: {
    title: 'Carte et prix | La Carbonara Amsterdam',
    description: `Pâtes romaines de ${f.minPasta} à ${f.maxPasta}, près de la gare centrale d’Amsterdam. La carbonara est à ${f.carbonara}, et toutes nos pâtes peuvent être préparées sans gluten.`,
    h1: 'Carte',
    lead: `Nous pouvons préparer toutes nos pâtes sans gluten, avec un supplément de ${f.gf}.`,
    food: 'À manger',
    drinks: 'À boire',
    drinksNote: 'Toutes nos boissons sont sans alcool.',
    featured: 'Specialità della casa',
  },

  visit: {
    title: 'Horaires et accès | La Carbonara Amsterdam',
    description: `Nous sommes au ${f.street} à Amsterdam, à ${f.walk.centraal} minutes à pied de la gare centrale. Ouvert tous les jours de ${f.open} à ${f.close}, sans réservation.`,
    h1: 'Horaires et accès',
    hoursTitle: 'Horaires d’ouverture',
    hoursText: `Nous sommes ouverts tous les jours de ${f.open} à ${f.close}.`,
    addressTitle: 'Adresse',
    walkTitle: 'À pied',
    walk: [
      { place: 'Gare centrale', min: f.walk.centraal },
      { place: 'Place du Dam', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `${n} min`,
    comingTitle: 'Sur place ou à emporter',
    comingText: 'Nous ne prenons pas de réservations : passez quand nous sommes ouverts. Vous pouvez aussi emporter vos pâtes.',
    phoneTitle: 'Téléphone',
  },

  faq: {
    title: 'Questions fréquentes | La Carbonara Amsterdam',
    description: 'Pas besoin de réserver, et notre carbonara est sans crème. Nos réponses sur le sans gluten, la vente à emporter, les prix et le trajet depuis la gare.',
    h1: 'Vos questions',
    items: [
      { q: 'Faut-il réserver une table ?', a: 'Non. Nous ne prenons pas de réservations, alors venez directement.' },
      { q: 'Puis-je emporter mes pâtes ?', a: 'Oui, il suffit de nous le dire quand vous commandez.' },
      { q: 'Y a-t-il de la crème dans la carbonara ?', a: 'Non. Nous la faisons avec du guanciale, du jaune d’œuf, du Pecorino Romano et du poivre noir, comme à Rome.' },
      { q: 'Avez-vous des pâtes sans gluten ?', a: `Oui. Nous pouvons préparer toutes nos pâtes sans gluten, avec un supplément de ${f.gf}. Dites-le-nous au moment de commander.` },
      { q: 'Servez-vous de l’alcool ?', a: 'Non. Toutes nos boissons sont sans alcool (0,0 %), y compris nos spritz et la Birra Moretti Zero.' },
      { q: 'Combien coûtent les pâtes ?', a: `Nos plats de pâtes vont de ${f.minPasta} à ${f.maxPasta}, et la carbonara est à ${f.carbonara}.` },
      { q: 'À quelle distance êtes-vous de la gare centrale ?', a: `À environ ${f.walk.centraal} minutes à pied. Vous nous trouverez au ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Page introuvable | La Carbonara',
    h1: 'Nous ne trouvons pas cette page',
    text: 'Ce lien ne mène nulle part. Vous cherchiez peut-être notre carte ou nos horaires ?',
  },
});

export default fr;
