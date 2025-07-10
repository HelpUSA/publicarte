// src/pages/NewsletterAdmin.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function NewsletterAdmin() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase
        .from('newsletter')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setEmails(data);
    };

    fetchEmails();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">
          Assinantes da Newsletter
        </h1>
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2 border">{item.email}</td>
                <td className="px-4 py-2 border">
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
}
