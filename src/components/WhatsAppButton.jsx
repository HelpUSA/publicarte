import React from 'react';

const WhatsAppButton = () => {
  const numero = '5583986104153';
  const mensagem = 'Olá! Gostaria de mais informações sobre os serviços da Public Arte.';

  return (
    <a
      href={`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
    >
      <img
        src="/whatsapp-icon.png"
        alt="WhatsApp"
        className="w-14 h-14 animate-bounce drop-shadow-lg hover:scale-110 transition-transform duration-300"
      />
    </a>
  );
};

export default WhatsAppButton;
