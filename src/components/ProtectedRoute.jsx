// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute({ children, permitido = [] }) {
  const [carregando, setCarregando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const verificarPermissao = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const usuario = sessionData?.session?.user;

        if (!usuario) {
          setAutorizado(false);
          return;
        }

        const { data: perfil, error } = await supabase
          .from('usuarios')
          .select('tipo')
          .eq('id', usuario.id)
          .single();

        if (error) {
          console.error('Erro ao buscar perfil do usuário:', error.message);
          setAutorizado(false);
          return;
        }

        if (perfil && permitido.includes(perfil.tipo)) {
          setAutorizado(true);
        } else {
          setAutorizado(false);
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
        setAutorizado(false);
      } finally {
        setCarregando(false);
      }
    };

    verificarPermissao();
  }, [permitido]);

  if (carregando) {
    // Opcional: exibir um spinner ou mensagem de carregamento
    return <div className="text-center p-6 text-gray-500">Verificando permissão...</div>;
  }

  if (!autorizado) {
    return <Navigate to="/login" />;
  }

  return children;
}
