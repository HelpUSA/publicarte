// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const verificarAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.user_metadata?.admin === true) {
        setAdmin(true);
      }
    };

    verificarAdmin();
  }, []);

  return (
    <nav style={{ background: '#222', padding: 10, color: 'white' }}>
      <Link to="/" style={{ marginRight: 10, color: 'white' }}>
        Início
      </Link>
      <Link to="/login" style={{ marginRight: 10, color: 'white' }}>
        Login
      </Link>
      {admin && (
        <Link to="/cadastrar-produto" style={{ color: 'white' }}>
          Cadastrar Produto
        </Link>
      )}
    </nav>
  );
}
