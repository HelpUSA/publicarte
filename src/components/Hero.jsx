// src/components/Hero.jsx
import React from 'react';

export default function Hero({
  videoUrl = '/video-publicarte.mp4',
  altTexto = 'ATENDIMENTO EXPRESSO EM JOÃO PESSOA',
  instagram = 'terciograssi'
}) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Altura do vídeo reduzida pela metade */}
      <div className="relative h-[225px] sm:h-[250px] md:h-[275px]">
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-1">{altTexto}</h1>
          <p className="text-xs md:text-base mb-4">
            Gráfica, adesivos, serigrafia, ecobags, placas em metalon, DTF e mais.
          </p>
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-full shadow text-sm"
          >
            Acompanhe no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
