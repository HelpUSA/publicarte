import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FaUserCircle } from 'react-icons/fa';

export default function UserIcon() {
  const [usuarioEmail, setUsuarioEmail] = useState(null);
  const [usuarioNome, setUsuarioNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const carregarSessao = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (user) {
        setUsuarioEmail(user.email);

        const { data: perfil } = await supabase
          .from('usuarios')
          .select('nome')
          .eq('id', user.id)
          .single();

        if (perfil?.nome) {
          setUsuarioNome(perfil.nome);
        }
      }
    };

    carregarSessao();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUsuarioEmail(session.user.email);
      } else {
        setUsuarioEmail(null);
        setUsuarioNome('');
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleClick = () => {
    if (usuarioEmail) {
      navigate('/perfil'); // vai para perfil se logado
    } else {
      navigate('/login'); // vai para login se não estiver logado
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer text-center">
      <FaUserCircle className="text-3xl text-gray-700 hover:text-green-600" />
      {usuarioNome && (
        <span className="text-xs text-gray-600 block mt-1">Bem-vindo, {usuarioNome.split(' ')[0]}</span>
      )}
    </div>
  );
}
