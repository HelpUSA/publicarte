import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, ArrowLeft, Eye, Cookie, Server, CheckCircle2 } from 'lucide-react';

export default function Privacidade() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-28 pb-16 w-full flex-1">
        {/* Banner do Topo */}
        <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white rounded-3xl shadow-xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30">
                <ShieldCheck size={16} /> LGPD - Lei nº 13.709/2018
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Política de Privacidade & Proteção de Dados
              </h1>
              <p className="text-blue-200 text-xs sm:text-sm mt-2">
                Public Arte – Comunicação Visual & HelpUS Technology
              </p>
            </div>

            <Link
              to="/"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl backdrop-blur border border-white/20 flex items-center gap-2 transition shrink-0"
            >
              <ArrowLeft size={16} /> Voltar ao Início
            </Link>
          </div>
        </div>

        {/* Conteúdo da Política */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Lock className="text-blue-700" size={20} /> 1. Quem Somos e Nosso Compromisso
            </h2>
            <p>
              A <strong>Public Arte – Comunicação Visual</strong> (em parceria de desenvolvimento com a <strong>HelpUS Technology</strong>) assume o compromisso de proteger a privacidade e os dados pessoais de seus clientes, usuários e colaboradores. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações de acordo com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong>.
            </p>
          </section>

          <section className="space-y-3 border-t pt-6">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Eye className="text-blue-700" size={20} /> 2. Dados Pessoais Coletados e Finalidade
            </h2>
            <p>Coletamos apenas os dados estritamente necessários para a prestação dos nossos serviços de comunicação visual e gestão de pedidos:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
              <li><strong>Solicitação de Orçamentos:</strong> Nome, WhatsApp/Telefone, E-mail e especificações de serviços.</li>
              <li><strong>Área Administrativa e Autenticação:</strong> E-mail de cadastro, foto de perfil (via Google OAuth) e identificadores de sessão segura.</li>
              <li><strong>Emissão de Comprovantes & Recibos:</strong> Nome ou Razão Social, CPF/CNPJ e endereço de entrega.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t pt-6">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Cookie className="text-blue-700" size={20} /> 3. Uso de Cookies e Tecnologias Semelhantes
            </h2>
            <p>
              Utilizamos cookies para manter a autenticação de login na Área Administrativa, lembrar suas preferências de idioma e garantir a navegação rápida.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600" /> Cookies Essenciais:
              </div>
              <p className="text-slate-600">Necessários para login de administradores, vendedores e salvamento temporário de preferências.</p>
            </div>
          </section>

          <section className="space-y-3 border-t pt-6">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Server className="text-blue-700" size={20} /> 4. Segurança e Armazenamento dos Dados
            </h2>
            <p>
              Todos os dados trafegados nesta plataforma utilizam criptografia SSL/TLS de alta segurança. Os acessos administrativos são restritos a usuários autorizados via senhas fortes ou autenticação via <strong>Google OAuth 2.0</strong>.
            </p>
          </section>

          <section className="space-y-3 border-t pt-6">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="text-blue-700" size={20} /> 5. Direitos dos Titulares de Dados (LGPD)
            </h2>
            <p>Você tem o direito de solicitar a qualquer momento:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>Confirmação da existência de tratamento dos seus dados;</li>
              <li>Acesso aos dados pessoais armazenados;</li>
              <li>Correção de dados incompletos ou desatualizados;</li>
              <li>Eliminação ou anonimização de dados desnecessários.</li>
            </ul>
          </section>

          <section className="bg-blue-50 border border-blue-200 p-6 rounded-2xl text-xs space-y-2">
            <h3 className="font-bold text-sm text-blue-950">📧 Dúvidas ou Contato do Encarregado de Dados (DPO)</h3>
            <p className="text-blue-900">
              Para exercer seus direitos de privacidade ou esclarecer dúvidas, entre em contato com a equipe de suporte e dados:
            </p>
            <div className="font-mono text-blue-900 pt-1 space-y-1">
              <div><strong>E-mail de Suporte:</strong> publicarte09@gmail.com</div>
              <div><strong>SuperAdmin & DPO HelpUS:</strong> helpus.ecommerce@gmail.com</div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
