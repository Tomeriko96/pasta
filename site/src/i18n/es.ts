// Español (España). Mirrors en.ts; written in the same voice (tú, nosotros), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const es = (f: Facts): Copy => ({
  locale: 'es_ES',
  langName: 'Español',
  skip: 'Ir al contenido',
  nav: { language: "Idioma", home: 'Inicio', menu: 'Carta', visit: 'Dónde estamos', faq: 'Preguntas', label: 'Principal' },
  status: {
    fallback: `Abrimos todos los días de ${f.open} a ${f.close}`,
    open: `Ahora estamos abiertos hasta las ${f.close}`,
    before: `Ahora estamos cerrados. Abrimos a las ${f.open}`,
    after: `Ahora estamos cerrados. Mañana abrimos a las ${f.open}`,
  },
  actions: { label: "Accesos rápidos", menu: 'Ver la carta', directions: 'Cómo llegar', call: 'Llámanos', google: 'Google Maps', apple: 'Mapas de Apple' },
  facts: { open: 'Horario', openValue: `Todos los días de ${f.open} a ${f.close}`, address: 'Dirección', phone: 'Teléfono' },
  storefrontAlt: 'La fachada de La Carbonara en Lange Niezel.',
  storefrontCaption: 'Busca el rótulo de neón rojo.',
  guests: {
    title: "Fotos de nuestros clientes",
    pomodoro: "Linguine con salsa de tomate y albahaca.",
    ragu: "Bolognese: rigatoni con salsa boloñesa y Parmigiano Reggiano.",
    bruschetta: "Bruschetta Cremosa con stracciatella y tomate.",
  },
  photos: {
    carbonara: "Linguine a la carbonara con guanciale, Pecorino Romano y pimienta negra.",
    bruschetta: "Bruschetta Cremosa: pan tostado con stracciatella, tomate y albahaca.",
    rigatoni: "Pomodoro: rigatoni con salsa de tomate, Parmigiano Reggiano y albahaca.",
  },
  footer: {
    allergy: '¿Tienes alguna alergia o sigues una dieta especial? Dínoslo antes de pedir.',
    pages: 'Páginas',
    language: 'Idioma',
  },

  home: {
    title: 'Carbonara romana cerca de Ámsterdam Centraal | La Carbonara',
    description: `Carbonara romana sin nata en ${f.street}, Ámsterdam. Abrimos todos los días de ${f.open} a ${f.close}, sin reservas y para llevar. Bebidas sin alcohol.`,
    schema: 'Restaurante de pasta en el centro de Ámsterdam con clásicos romanos: carbonara sin nata, Cacio e Pepe, Amatriciana y Gricia. Sin reservas, con comida para llevar y todas las bebidas sin alcohol.',
    h1: 'Carbonara romana en Lange Niezel',
    lead: `Hacemos nuestra carbonara con guanciale, yema de huevo, Pecorino Romano y pimienta negra, sin nata. No aceptamos reservas, así que pásate cuando quieras o llévate la pasta.`,
    pastaTitle: 'Nuestra pasta',
    pastaIntro: 'La mayoría de nuestros platos de pasta son romanos. La Bolognese, los Linguine al Pesto y la Quattro Formaggi vienen de otras partes de Italia.',
    fullMenu: 'Ver la carta completa',
    drinksTitle: 'Bebidas',
    drinksText: `No servimos alcohol. Los spritz y la Birra Moretti Zero son 0,0 %, y también tenemos limonadas con gas y café.`,
    visitTitle: 'Dónde estamos',
    visitText: `Estamos en ${f.street}, en el casco antiguo.`,
    lemonades: (n: number) => `Limonadas con gas, ${n} sabores`,
    visitMore: 'Horario y cómo llegar',
    faqTitle: 'Preguntas',
    faqMore: 'Todas las preguntas',
  },

  menu: {
    title: 'Carta y precios | La Carbonara Ámsterdam',
    description: `Pasta romana de ${f.minPasta} a ${f.maxPasta} cerca de la Estación Central de Ámsterdam. La carbonara cuesta ${f.carbonara} y podemos hacer cualquier pasta sin gluten.`,
    h1: 'Carta',
    lead: `Podemos preparar cualquier pasta sin gluten por ${f.gf} más.`,
    food: 'Comida',
    drinks: 'Bebidas',
    drinksNote: 'Todas nuestras bebidas son sin alcohol.',
    featured: 'Specialità della casa',
  },

  visit: {
    title: 'Horario y cómo llegar | La Carbonara Ámsterdam',
    description: `Estamos en ${f.street}, Ámsterdam, a ${f.walk.centraal} minutos a pie de la Estación Central. Abrimos todos los días de ${f.open} a ${f.close}, sin reservas.`,
    h1: 'Horario y cómo llegar',
    hoursTitle: 'Horario',
    hoursText: `Abrimos todos los días de ${f.open} a ${f.close}.`,
    addressTitle: 'Dirección',
    walkTitle: 'A pie',
    walk: [
      { place: 'Estación Central', min: f.walk.centraal },
      { place: 'Plaza Dam', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `${n} min`,
    comingTitle: 'Reservas y comida para llevar',
    comingText: 'No aceptamos reservas, así que ven cuando quieras mientras estemos abiertos. También puedes llevarte la pasta.',
    phoneTitle: 'Teléfono',
  },

  faq: {
    title: 'Preguntas frecuentes | La Carbonara Ámsterdam',
    description: 'No aceptamos reservas y nuestra carbonara no lleva nata. Respuestas sobre pasta sin gluten, comida para llevar, precios y cómo llegar desde la estación.',
    h1: 'Preguntas frecuentes',
    items: [
      { q: '¿Tengo que reservar mesa?', a: 'No hace falta: no aceptamos reservas, así que ven cuando quieras.' },
      { q: '¿Puedo llevarme la pasta?', a: 'Sí, solo tienes que decírnoslo al pedir.' },
      { q: '¿La carbonara lleva nata?', a: 'No. La hacemos con guanciale, yema de huevo, Pecorino Romano y pimienta negra, como en Roma.' },
      { q: '¿Tenéis pasta sin gluten?', a: `Sí. Podemos preparar cualquier pasta sin gluten por ${f.gf} más. Avísanos al pedir.` },
      { q: '¿Servís alcohol?', a: 'No. Todas nuestras bebidas son sin alcohol (0,0 %), también los spritz y la Birra Moretti Zero.' },
      { q: '¿Cuánto cuesta la pasta?', a: `Los platos de pasta van de ${f.minPasta} a ${f.maxPasta}, y la carbonara cuesta ${f.carbonara}.` },
      { q: '¿A qué distancia estáis de la Estación Central?', a: `A unos ${f.walk.centraal} minutos a pie. Estamos en ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Página no encontrada | La Carbonara',
    h1: 'No encontramos esta página',
    text: 'Este enlace no lleva a ninguna parte. ¿Buscabas nuestra carta o el horario?',
  },
});

export default es;
