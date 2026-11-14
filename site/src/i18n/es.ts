// Español (España). Mirrors en.ts; written in the same voice (tú, nosotros), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const es = (f: Facts): Copy => ({
  locale: 'es_ES',
  langName: 'Español',
  skip: 'Ir al contenido',
  nav: { home: 'Inicio', menu: 'Carta', visit: 'Cómo llegar', faq: 'Preguntas', label: 'Principal' },
  status: {
    fallback: `Abrimos todos los días, de ${f.open} a ${f.close}`,
    open: `Abierto ahora, hasta las ${f.close}`,
    before: `Ahora cerrado, abrimos a las ${f.open}`,
    after: `Ahora cerrado, mañana abrimos a las ${f.open}`,
  },
  actions: { menu: 'Ver la carta', directions: 'Cómo llegar', call: 'Llámanos', google: 'Google Maps', apple: 'Mapas de Apple' },
  facts: { open: 'Horario', openValue: `Todos los días, de ${f.open} a ${f.close}`, address: 'Dirección', phone: 'Teléfono' },
  storefrontAlt: 'La fachada de La Carbonara en Lange Niezel.',
  storefrontCaption: `Busca el letrero de neón rojo en ${f.street}.`,
  photos: {
    carbonara: "Carbonara con guanciale, Pecorino Romano y pimienta negra.",
    bruschetta: "Bruschetta Cremosa: pan tostado con stracciatella, tomate y albahaca.",
    rigatoni: "Rigatoni con salsa de tomate, Parmigiano Reggiano y albahaca.",
  },
  footer: {
    allergy: '¿Tienes alguna alergia o sigues una dieta especial? Dínoslo antes de pedir.',
    pages: 'Páginas',
    language: 'Idioma',
  },

  home: {
    title: 'Carbonara romana junto a la Estación Central de Ámsterdam | La Carbonara',
    description: `Carbonara a la romana, sin nata, en ${f.street}, Ámsterdam. Abrimos todos los días de ${f.open} a ${f.close}. Ven sin reservar o pide para llevar. Todas nuestras bebidas son sin alcohol.`,
    schema: 'Restaurante de pasta en el centro de Ámsterdam con clásicos romanos: carbonara sin nata, cacio e pepe, amatriciana y gricia. Sin reservas, con comida para llevar y todas las bebidas sin alcohol.',
    h1: 'Carbonara romana en Lange Niezel',
    lead: `Hacemos nuestra carbonara con guanciale, yema de huevo, Pecorino Romano y pimienta negra, sin nata. No hace falta reservar: entra sin más o llévate la pasta. Estamos a ${f.walk.centraal} minutos a pie de la Estación Central.`,
    pastaTitle: 'Nuestra pasta',
    pastaIntro: 'Casi toda nuestra pasta es romana. La Bolognese, la de pesto y la quattro formaggi vienen de otras partes de Italia.',
    fullMenu: 'Ver la carta completa',
    drinksTitle: 'Bebidas',
    drinksText: `No servimos alcohol. Nuestros spritz de Aperol, Bitter y Limoncello son sin alcohol, y la Birra Moretti también. Además tenemos refrescos con gas y café.`,
    visitTitle: 'Dónde estamos',
    visitText: `Estamos en ${f.street}, en el casco antiguo.`,
    lemonades: (n: number) => `Refrescos con gas, ${n} sabores`,
    visitMore: 'Horario y cómo llegar',
    faqTitle: 'Preguntas',
    faqMore: 'Todas las preguntas',
  },

  menu: {
    title: 'Carta y precios | La Carbonara',
    description: `Nuestra pasta, los antipasti y las bebidas sin alcohol, con sus precios. Pasta de ${f.minPasta} a ${f.maxPasta}, y cualquiera la podemos preparar sin gluten.`,
    h1: 'Carta',
    lead: `Podemos preparar cualquier pasta sin gluten por ${f.gf} más. Si tienes alguna alergia, dínoslo antes de pedir.`,
    food: 'Comida',
    drinks: 'Bebidas',
    drinksNote: 'Todas nuestras bebidas son sin alcohol.',
    featured: 'Specialità della Casa',
  },

  visit: {
    title: 'Horario y cómo llegar | La Carbonara',
    description: `Estamos en ${f.address}, a ${f.walk.centraal} minutos a pie de la Estación Central de Ámsterdam. Abrimos todos los días de ${f.open} a ${f.close} y no hace falta reservar.`,
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
    comingTitle: 'Ven sin reservar o pide para llevar',
    comingText: 'No aceptamos reservas, así que ven cuando quieras mientras estemos abiertos. También puedes llevarte la pasta.',
    phoneTitle: 'Teléfono',
  },

  faq: {
    title: 'Preguntas | La Carbonara',
    description: '¿Hay que reservar? ¿La carbonara lleva nata? ¿Tenéis pasta sin gluten? Respondemos a lo que más nos preguntan.',
    h1: 'Lo que más nos preguntan',
    items: [
      { q: '¿Tengo que reservar mesa?', a: `No. No aceptamos reservas, así que entra sin más. Abrimos todos los días de ${f.open} a ${f.close}.` },
      { q: '¿Puedo pedir la pasta para llevar?', a: 'Sí, solo tienes que decírnoslo al pedir.' },
      { q: '¿La carbonara lleva nata?', a: 'No. La hacemos con guanciale, yema de huevo, Pecorino Romano y pimienta negra, como en Roma.' },
      { q: '¿Tenéis pasta sin gluten?', a: `Sí. Podemos preparar cualquier pasta sin gluten por ${f.gf} más. Avísanos al pedir.` },
      { q: '¿Servís alcohol?', a: 'No. Todas nuestras bebidas son sin alcohol (0,0 %), también los spritz y la Birra Moretti Zero.' },
      { q: '¿Cuánto cuesta un plato de pasta?', a: `Nuestra pasta cuesta de ${f.minPasta} a ${f.maxPasta}. La carbonara cuesta ${f.carbonara}.` },
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
