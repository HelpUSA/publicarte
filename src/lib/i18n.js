// src/lib/i18n.js
import { useState, useEffect } from 'react';

export const translations = {
  pt: {
    // Nav & Header
    appName: "Public Arte – Comunicação Visual",
    navHome: "Início",
    navAbout: "Sobre Nós",
    navContact: "Contato",
    navQuote: "Solicitar Orçamento",
    navAdmin: "Área Administrativa",

    // Hero & Home
    heroBadge: "Atendimento Rápido & Personalizado em João Pessoa",
    heroTitle: "Soluções Criativas em Comunicação Visual",
    heroSubtitle: "Adesivos, Banners, Lonas, Placas em Metalon, Serigrafia DTF, Brindes Promocionais e Gráfica Rápida",
    requestQuoteBtn: "Fazer Orçamento Rápido",
    needQuoteTitle: "Precisa de um orçamento para sua empresa?",
    needQuoteSubtitle: "Calcule a estimativa de banners, placas, adesivos ou brindes em segundos e envie via WhatsApp.",
    specialtiesTitle: "Especialidades & Soluções",
    specialtiesSubtitle: "Clique nas especialidades abaixo para ver os serviços e produtos em destaque",
    featuredProducts: "Produtos & Serviços em Destaque",
    featuredSubtitle: "Soluções em alta definição para alavancar a presença visual do seu negócio",
    searchPlaceholder: "Buscar por produto, insumo ou serviço de comunicação visual...",
    allCategories: "Todas as Categorias",
    clearFilter: "Limpar Filtro",
    noProducts: "Nenhum produto encontrado para a busca especificada.",
    viewDetails: "Ver Detalhes",

    // Categorias
    catBanners: "Banners & Lonas",
    catStickers: "Adesivos Vinílicos",
    catSigns: "Placas & Fachadas",
    catScreenprint: "Serigrafia & DTF",
    catPrintshop: "Gráfica Rápida",
    catGiveaways: "Brindes Promocionais",

    // Descrições das Especialidades
    descBanners: "Lonas de alta durabilidade com ilhós e acabamento premium",
    descStickers: "Recorte eletrônico, transparente, jateado e microperfurado",
    descSigns: "Metalon, acrílico e ACM para empresas e lojas",
    descScreenprint: "Estamparia em tecidos, camisetas e ecobags",
    descPrintshop: "Cartões de visita, panfletos, pastas e receituários",
    descGiveaways: "Canecas, copos, blocos de notas e chaveiros",

    // Orçamento Page
    quoteBadge: "Calculadora Instantânea",
    quotePageTitle: "Solicitar Orçamento Rápido",
    quotePageSubtitle: "Preencha os dados da sua ideia para receber uma estimativa instantânea e enviar diretamente para nossa equipe.",
    labelName: "Seu Nome *",
    labelPhone: "WhatsApp / Telefone *",
    labelProductType: "Tipo de Produto / Serviço *",
    labelWidth: "Largura (metros)",
    labelHeight: "Altura (metros)",
    labelQuantity: "Quantidade",
    labelEmailOpt: "Email para Contato (Opcional)",
    labelDetails: "Detalhes do Projeto / Acabamento",
    detailsPlaceholder: "Descreva cores, frases, ilhós, dobra ou envie referências...",
    estimatedTotal: "Valor Estimado do Pedido:",
    disclaimer: "*Valor sujeito à confirmação conforme complexidade da arte e acabamento.",
    sendWhatsAppBtn: "Enviar via WhatsApp",
    successQuoteTitle: "Orçamento Enviado com Sucesso!",
    successQuoteMsg: "Abrimos o WhatsApp com todos os detalhes do seu orçamento.",
    newQuoteBtn: "Fazer Outro Orçamento",

    // Sobre Page
    aboutTitle: "Sobre a Public Arte",
    aboutIntro: "A Public Arte – COMUNICAÇÃO é especializada em soluções criativas para divulgação visual em João Pessoa – PB. Atendemos clientes corporativos e comerciais com excelência.",
    aboutServicesHeader: "Nossas Soluções Incluem:",
    aboutItem1: "Adesivos vinílicos personalizados e recortes eletrônicos",
    aboutItem2: "Serigrafia têxtil e impressão digital DTF de alta definição",
    aboutItem3: "Placas estruturadas em metalon com lona tensionada e ACM",
    aboutItem4: "Ecobags, canecas, copos e brindes promocionais corporativos",
    aboutItem5: "Gráfica rápida, cartões de visita, panfletos e impressos",
    aboutConclusion: "Com anos de experiência no mercado paraibano, atuamos com agilidade, materiais de alta qualidade e compromisso com o resultado dos nossos clientes.",

    // Contato Page
    contactTitle: "Fale com a Public Arte",
    contactSubtitle: "Entre em contato conosco ou venha nos visitar em João Pessoa",
    sendMessageHeader: "Envie uma mensagem",
    formNamePlaceholder: "Seu nome",
    formEmailPlaceholder: "Seu e-mail",
    formMsgPlaceholder: "Sua mensagem",
    submitBtn: "Enviar Mensagem",

    // Footer
    footerInstitutional: "Institucional",
    footerContact: "Contato",
    footerMessage: "Envie uma mensagem",
    footerCopyright: "Todos os direitos reservados.",
    footerDevBy: "Desenvolvido por HelpUS Technology"
  },

  en: {
    // Nav & Header
    appName: "Public Arte – Visual Communication",
    navHome: "Home",
    navAbout: "About Us",
    navContact: "Contact",
    navQuote: "Request Quote",
    navAdmin: "Admin Portal",

    // Hero & Home
    heroBadge: "Fast & Customized Service in João Pessoa",
    heroTitle: "Creative Solutions in Visual Communication",
    heroSubtitle: "Stickers, Banners, Metal Frame Signs, DTF Printing, Giveaways & Fast Printing",
    requestQuoteBtn: "Get Quick Quote",
    needQuoteTitle: "Need a quote for your business?",
    needQuoteSubtitle: "Calculate instant estimates for banners, signs, stickers or giveaways and send via WhatsApp.",
    specialtiesTitle: "Specialties & Solutions",
    specialtiesSubtitle: "Click on the specialties below to view featured products and services",
    featuredProducts: "Featured Products & Services",
    featuredSubtitle: "High-definition solutions to boost your brand's visual presence",
    searchPlaceholder: "Search by product, material or printing service...",
    allCategories: "All Categories",
    clearFilter: "Clear Filter",
    noProducts: "No products found for the specified search.",
    viewDetails: "View Details",

    // Categorias
    catBanners: "Banners & Canvas",
    catStickers: "Vinyl Stickers",
    catSigns: "Signs & Facades",
    catScreenprint: "Screen Printing & DTF",
    catPrintshop: "Fast Printing",
    catGiveaways: "Promotional Giveaways",

    // Descrições das Especialidades
    descBanners: "High-durability banners with grommets and premium finishing",
    descStickers: "Electronic vinyl cutting, transparent, frosted and microperforated",
    descSigns: "Metal frame, acrylic and ACM panel signs for stores and offices",
    descScreenprint: "Textile printing on t-shirts, hoodies and tote bags",
    descPrintshop: "Business cards, flyers, folders and stationery",
    descGiveaways: "Custom mugs, cups, notepads and keychains",

    // Orçamento Page
    quoteBadge: "Instant Calculator",
    quotePageTitle: "Request Quick Quote",
    quotePageSubtitle: "Fill in your project details to get an instant cost estimate and send directly to our team.",
    labelName: "Your Name *",
    labelPhone: "WhatsApp / Phone *",
    labelProductType: "Product / Service Type *",
    labelWidth: "Width (meters)",
    labelHeight: "Height (meters)",
    labelQuantity: "Quantity",
    labelEmailOpt: "Contact Email (Optional)",
    labelDetails: "Project Details / Finishing",
    detailsPlaceholder: "Describe colors, text, grommets, folds or send references...",
    estimatedTotal: "Estimated Order Total:",
    disclaimer: "*Estimate subject to confirmation based on artwork complexity.",
    sendWhatsAppBtn: "Send via WhatsApp",
    successQuoteTitle: "Quote Sent Successfully!",
    successQuoteMsg: "We opened WhatsApp with all your quote details.",
    newQuoteBtn: "Calculate Another Quote",

    // Sobre Page
    aboutTitle: "About Public Arte",
    aboutIntro: "Public Arte Visual Communication specializes in creative advertising solutions in João Pessoa – PB. We serve corporate and retail clients with excellence.",
    aboutServicesHeader: "Our Solutions Include:",
    aboutItem1: "Custom vinyl stickers and electronic die-cut decals",
    aboutItem2: "Textile screen printing and high-definition DTF digital printing",
    aboutItem3: "Structured metal frame signs with tensioned canvas and ACM panels",
    aboutItem4: "Eco tote bags, custom mugs, cups and corporate giveaways",
    aboutItem5: "Fast print shop services, business cards, brochures and flyers",
    aboutConclusion: "With years of market experience, we deliver agility, high-quality materials, and commitment to our clients' success.",

    // Contato Page
    contactTitle: "Contact Public Arte",
    contactSubtitle: "Get in touch with our team or visit us in João Pessoa",
    sendMessageHeader: "Send us a message",
    formNamePlaceholder: "Your name",
    formEmailPlaceholder: "Your email",
    formMsgPlaceholder: "Your message",
    submitBtn: "Send Message",

    // Footer
    footerInstitutional: "Institutional",
    footerContact: "Contact",
    footerMessage: "Send a Message",
    footerCopyright: "All rights reserved.",
    footerDevBy: "Powered by HelpUS Technology"
  },

  es: {
    // Nav & Header
    appName: "Public Arte – Comunicación Visual",
    navHome: "Inicio",
    navAbout: "Sobre Nosotros",
    navContact: "Contacto",
    navQuote: "Solicitar Presupuesto",
    navAdmin: "Área Administrativa",

    // Hero & Home
    heroBadge: "Atención Rápida y Personalizada en João Pessoa",
    heroTitle: "Soluciones Creativas en Comunicación Visual",
    heroSubtitle: "Pegatinas, Banners, Lonas, Placas, Serigrafía DTF, Regalos Promocionales e Imprenta Rápida",
    requestQuoteBtn: "Pedir Presupuesto Rápido",
    needQuoteTitle: "¿Necesita un presupuesto para su empresa?",
    needQuoteSubtitle: "Calcule la estimación de banners, placas, pegatinas o regalos en segundos y envíelo por WhatsApp.",
    specialtiesTitle: "Especialidades y Soluciones",
    specialtiesSubtitle: "Haga clic en las especialidades a continuación para ver servicios y productos destacados",
    featuredProducts: "Productos y Servicios Destacados",
    featuredSubtitle: "Soluciones en alta definición para impulsar la presencia visual de su negocio",
    searchPlaceholder: "Buscar por producto, material o servicio de imprenta...",
    allCategories: "Todas las Categorías",
    clearFilter: "Limpiar Filtro",
    noProducts: "No se encontraron productos para la búsqueda especificada.",
    viewDetails: "Ver Detalles",

    // Categorias
    catBanners: "Banners y Lonas",
    catStickers: "Pegatinas Vinílicas",
    catSigns: "Placas y Fachadas",
    catScreenprint: "Serigrafía y DTF",
    catPrintshop: "Imprenta Rápida",
    catGiveaways: "Regalos Promocionales",

    // Descrições das Especialidades
    descBanners: "Lonas de alta durabilidad con ojales y acabado premium",
    descStickers: "Corte electrónico vinílico, transparente, esmerilado y microperforado",
    descSigns: "Placas con estructura de metalon, acrílico y paneles ACM",
    descScreenprint: "Estampación en camisetas, sudaderas y bolsas ecológicas",
    descPrintshop: "Tarjetas de presentación, folletos, carpetas y papelería",
    descGiveaways: "Tazas personalizadas, vasos, libretas y llaveros",

    // Orçamento Page
    quoteBadge: "Calculadora Instantánea",
    quotePageTitle: "Solicitar Presupuesto Rápido",
    quotePageSubtitle: "Complete los datos de su proyecto para recibir un cálculo instantáneo y enviarlo directamente a nuestro equipo.",
    labelName: "Su Nombre *",
    labelPhone: "WhatsApp / Teléfono *",
    labelProductType: "Tipo de Producto / Servicio *",
    labelWidth: "Ancho (metros)",
    labelHeight: "Alto (metros)",
    labelQuantity: "Cantidad",
    labelEmailOpt: "Correo de Contacto (Opcional)",
    labelDetails: "Detalles del Proyecto / Acabado",
    detailsPlaceholder: "Describa colores, frases, ojales, pliegues o envíe referencias...",
    estimatedTotal: "Valor Estimado del Pedido:",
    disclaimer: "*Estimación sujeta a confirmación según la complejidad del arte.",
    sendWhatsAppBtn: "Enviar por WhatsApp",
    successQuoteTitle: "¡Presupuesto Enviado con Éxito!",
    successQuoteMsg: "Abrimos WhatsApp con todos los detalles de su presupuesto.",
    newQuoteBtn: "Calcular Otro Presupuesto",

    // Sobre Page
    aboutTitle: "Sobre Public Arte",
    aboutIntro: "Public Arte Comunicación Visual se especializa en soluciones creativas de publicidad visual en João Pessoa – PB. Atendemos a clientes corporativos con excelencia.",
    aboutServicesHeader: "Nuestras Soluciones Incluyen:",
    aboutItem1: "Pegatinas vinílicas personalizadas y troquelado electrónico",
    aboutItem2: "Serigrafía textil e impresión digital DTF de alta definición",
    aboutItem3: "Placas estructuradas en metalon con lona tensada y paneles ACM",
    aboutItem4: "Bolsas ecológicas, tazas personalizadas y artículos promocionales",
    aboutItem5: "Imprenta rápida, tarjetas de presentación, folletos y catálogos",
    aboutConclusion: "Con años de experiencia en el mercado, trabajamos con agilidad, materiales de alta calidad y compromiso con el éxito de nuestros clientes.",

    // Contato Page
    contactTitle: "Contacto Public Arte",
    contactSubtitle: "Póngase en contacto con nuestro equipo o visítenos en João Pessoa",
    sendMessageHeader: "Envíenos un mensaje",
    formNamePlaceholder: "Su nombre",
    formEmailPlaceholder: "Su e-mail",
    formMsgPlaceholder: "Su mensaje",
    submitBtn: "Enviar Mensaje",

    // Footer
    footerInstitutional: "Institucional",
    footerContact: "Contacto",
    footerMessage: "Envíe un mensaje",
    footerCopyright: "Todos los derechos reservados.",
    footerDevBy: "Desarrollado por HelpUS Technology"
  }
};

export function useLanguage() {
  const [lang, setLang] = useState(() => localStorage.getItem('publicarte_lang') || 'pt');

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('publicarte_lang', newLang);
  };

  const t = (key) => translations[lang]?.[key] || translations['pt']?.[key] || key;

  return { lang, changeLanguage, t };
}
