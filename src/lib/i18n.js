// src/lib/i18n.js
import { useState, useEffect } from 'react';

export const translations = {
  pt: {
    appName: "Public Arte – Comunicação Visual",
    navHome: "Início",
    navAbout: "Sobre Nós",
    navContact: "Contato",
    navQuote: "Solicitar Orçamento",
    navAdmin: "Área Administrativa",
    heroTitle: "Soluções Criativas em Comunicação Visual",
    heroSubtitle: "Adesivos, Banners, Lonas, Placas, Serigrafia DTF, Brindes e Gráfica Rápida em João Pessoa",
    featuredProducts: "Produtos & Serviços em Destaque",
    requestQuoteBtn: "Fazer Orçamento Rápido",
    adminTitle: "Painel de Gestão da Gráfica",
    adminSubtitle: "Controle de Vendas, Comandas, Orçamentos, Financeiro e Estoque",
    noProducts: "Nenhum produto cadastrado no momento.",
    viewDetails: "Ver Detalhes",
    contactUs: "Fale Conosco",
    footerText: "© 2026 Public Arte – Comunicação Visual. Todos os direitos reservados. Desenvolvido por HelpUS Technology."
  },
  en: {
    appName: "Public Arte – Visual Communication",
    navHome: "Home",
    navAbout: "About Us",
    navContact: "Contact",
    navQuote: "Request Quote",
    navAdmin: "Admin Portal",
    heroTitle: "Creative Solutions in Visual Communication",
    heroSubtitle: "Stickers, Banners, Signs, DTF Screen Printing, Giveaways & Fast Printing in João Pessoa",
    featuredProducts: "Featured Products & Services",
    requestQuoteBtn: "Get Quick Quote",
    adminTitle: "Print Shop Management Portal",
    adminSubtitle: "Sales, Orders, Quotes, Financials & Inventory Management",
    noProducts: "No products currently available.",
    viewDetails: "View Details",
    contactUs: "Contact Us",
    footerText: "© 2026 Public Arte – Visual Communication. All rights reserved. Powered by HelpUS Technology."
  },
  es: {
    appName: "Public Arte – Comunicación Visual",
    navHome: "Inicio",
    navAbout: "Sobre Nosotros",
    navContact: "Contacto",
    navQuote: "Solicitar Presupuesto",
    navAdmin: "Área Administrativa",
    heroTitle: "Soluciones Creativas en Comunicación Visual",
    heroSubtitle: "Pegatinas, Banners, Lonas, Placas, Serigrafía DTF y Regalos Promocionales en João Pessoa",
    featuredProducts: "Productos y Servicios Destacados",
    requestQuoteBtn: "Pedir Presupuesto Rápido",
    adminTitle: "Panel de Gestión de Imprenta",
    adminSubtitle: "Control de Ventas, Comandos, Presupuestos, Finanzas e Inventario",
    noProducts: "No hay productos disponibles actualmente.",
    viewDetails: "Ver Detalles",
    contactUs: "Contáctenos",
    footerText: "© 2026 Public Arte – Comunicación Visual. Todos los derechos reservados. Desarrollado por HelpUS Technology."
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
