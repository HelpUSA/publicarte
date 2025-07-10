// src/components/NewsletterForm.jsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErro(true);
      setMensagem('Digite um e-mail válido.');
      return;
    }

    try {
      const { data: existente, error: erroExistente } = await supabase
        .from('newsletter')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (erroExistente) throw erroExistente;

      if (existente) {
        setErro(true);
        setMensagem('Este e-mail já está cadastrado.');
        return;
      }

      const { error } = await supabase.from('newsletter').insert([{ email }]);

      if (error) {
        console.error('Erro ao cadastrar:', error.message);
        setErro(true);
        setMensagem('Erro ao cadastrar. Tente novamente.');
      } else {
        setErro(false);
        setMensagem('Cadastro realizado com sucesso!');
        setEmail('');
      }
    } catch (err) {
      console.error('Erro inesperado:', err.message);
      setErro(true);
      setMensagem('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <section className="bg-green-700 text-white py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Assine nossa Newsletter
        </h2>
        <p className="mb-6 text-sm md:text-base">
          Receba ofertas, novidades e dicas direto no seu e-mail.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-800 w-full sm:w-1/2"
          />
          <button
            type="submit"
            className="bg-white text-green-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Assinar
          </button>
        </form>

        {mensagem && (
          <p className={`mt-4 text-sm ${erro ? 'text-red-300' : 'text-green-200'}`}>
            {mensagem}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterForm;
