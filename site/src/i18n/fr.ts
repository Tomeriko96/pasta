// Français. Mirrors en.ts; written in the same voice (nous/vous), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const fr = (f: Facts): Copy => ({
  locale: 'fr_FR',
  langName: 'Français',
  skip: 'Aller au contenu',
  nav: { home: 'Accueil', menu: 'Carte', visit: 'Venir', faq: 'Questions', label: 'Navigation principale' },
  status: {
    fallback: `Ouvert tous les jours, de ${f.open} à ${f.close}`,
    open: `Ouvert en ce moment, jusqu’à ${f.close}`,
    before: `Fermé pour le moment, nous ouvrons à ${f.open}`,
    after: `Fermé pour le moment, nous ouvrons demain à ${f.open}`,
  },
  actions: { menu: 'Voir la carte', directions: 'Itinéraire', call: 'Nous appeler', google: 'Google Maps', apple: 'Plans' },
  facts: { open: 'Horaires', openValue: `Tous les jours, de ${f.open} à ${f.close}`, address: 'Adresse', phone: 'Téléphone' },
  storefrontAlt: 'La devanture de La Carbonara sur le Lange Niezel.',
  storefrontCaption: `Cherchez l’enseigne au néon rouge, au ${f.street}.`,
  guests: {
    title: "Les photos de nos clients",
    credit: (name: string) => `Photo : ${name}`,
    pomodoro: "Linguine à la sauce tomate et au basilic.",
    ragu: "Rigatoni à la sauce à la viande et au Parmigiano Reggiano.",
    bruschetta: "Bruschetta à la stracciatella et à la tomate.",
  },
  photos: {
    carbonara: "Linguine carbonara au guanciale, Pecorino Romano et poivre noir.",
    bruschetta: "Bruschetta Cremosa : pain grillé, stracciatella, tomates et basilic.",
    rigatoni: "Rigatoni à la sauce tomate, Parmigiano Reggiano et basilic.",
  },
  footer: {
    allergy: 'Une allergie ou un régime particulier ? Dites-le-nous avant de commander.',
    pages: 'Pages',
    language: 'Langue',
  },

  home: {
    title: 'Carbonara romaine près de la gare centrale d’Amsterdam | La Carbonara',
    description: `La carbonara comme à Rome, sans crème, au ${f.street} à Amsterdam. Ouvert tous les jours de ${f.open} à ${f.close}. Sur place ou à emporter, et toutes les boissons sont sans alcool.`,
    schema: 'Restaurant de pâtes dans le centre d’Amsterdam, avec les classiques romains : carbonara sans crème, cacio e pepe, amatriciana et gricia. Sans réservation, vente à emporter, toutes les boissons sans alcool.',
    h1: 'Carbonara romaine sur le Lange Niezel',
    lead: `Notre carbonara, nous la faisons avec du guanciale, du jaune d’œuf, du Pecorino Romano et du poivre noir, sans crème. Inutile de réserver : entrez simplement, ou emportez vos pâtes. Nous sommes à ${f.walk.centraal} minutes à pied de la gare centrale.`,
    pastaTitle: 'Nos pâtes',
    pastaIntro: 'La plupart de nos pâtes sont romaines. La Bolognese, le pesto et les quattro formaggi viennent d’autres régions d’Italie.',
    fullMenu: 'Voir toute la carte',
    drinksTitle: 'Boissons',
    drinksText: 'Nous ne servons pas d’alcool. Nos spritz Aperol, Bitter et Limoncello sont sans alcool, tout comme la Birra Moretti. Nous avons aussi des limonades pétillantes et du café.',
    visitTitle: 'Nous trouver',
    visitText: `Nous sommes au ${f.street}, dans le vieux centre.`,
    lemonades: (n: number) => `Limonades pétillantes, ${n} parfums`,
    visitMore: 'Horaires et accès',
    faqTitle: 'Questions',
    faqMore: 'Toutes les questions',
  },

  menu: {
    title: 'Carte et prix | La Carbonara',
    description: `Nos pâtes, nos antipasti et nos boissons sans alcool, avec les prix. Pâtes de ${f.minPasta} à ${f.maxPasta} ; toutes peuvent être préparées sans gluten.`,
    h1: 'Carte',
    lead: `Nous pouvons préparer toutes nos pâtes sans gluten, avec un supplément de ${f.gf}. Si vous avez une allergie, dites-le-nous avant de commander.`,
    food: 'À manger',
    drinks: 'À boire',
    drinksNote: 'Toutes nos boissons sont sans alcool.',
    featured: 'Specialità della Casa',
  },

  visit: {
    title: 'Horaires et accès | La Carbonara',
    description: `Nous sommes au ${f.address}, à ${f.walk.centraal} minutes à pied de la gare centrale d’Amsterdam. Ouvert tous les jours de ${f.open} à ${f.close}, sans réservation.`,
    h1: 'Horaires et accès',
    hoursTitle: 'Horaires d’ouverture',
    hoursText: `Nous sommes ouverts tous les jours de ${f.open} à ${f.close}.`,
    addressTitle: 'Adresse',
    walkTitle: 'Temps de marche',
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
    title: 'Questions | La Carbonara',
    description: 'Faut-il réserver, y a-t-il de la crème dans la carbonara, avez-vous des pâtes sans gluten ? Nos réponses aux questions que l’on nous pose le plus souvent.',
    h1: 'Les questions que vous nous posez',
    items: [
      { q: 'Faut-il réserver une table ?', a: `Non. Nous ne prenons pas de réservations, entrez simplement. Nous sommes ouverts tous les jours de ${f.open} à ${f.close}.` },
      { q: 'Puis-je emporter mes pâtes ?', a: 'Oui, il suffit de nous le dire quand vous commandez.' },
      { q: 'Y a-t-il de la crème dans la carbonara ?', a: 'Non. Nous la faisons avec du guanciale, du jaune d’œuf, du Pecorino Romano et du poivre noir, comme à Rome.' },
      { q: 'Avez-vous des pâtes sans gluten ?', a: `Oui. Nous pouvons préparer toutes nos pâtes sans gluten, avec un supplément de ${f.gf}. Dites-le-nous au moment de commander.` },
      { q: 'Servez-vous de l’alcool ?', a: 'Non. Toutes nos boissons sont sans alcool (0,0 %), y compris nos spritz et la Birra Moretti Zero.' },
      { q: 'Combien coûte un plat de pâtes ?', a: `Nos pâtes coûtent de ${f.minPasta} à ${f.maxPasta}. La carbonara est à ${f.carbonara}.` },
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
