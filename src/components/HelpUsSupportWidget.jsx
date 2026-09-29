import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  X,
  Send,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileText,
  ArrowLeft,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';

export default function HelpUsSupportWidget({
  tenantId = 'publicarte',
  clientName = 'Public Arte',
  userEmail = 'tercio@publicarte.com.br',
  userName = 'Tércio',
  apiUrl = 'https://support.helpusbr.com/api',
  primaryColor = '#6366f1',
  position = 'bottom-right',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('support');
  const [priority, setPriority] = useState('medium');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [compressionNotice, setCompressionNotice] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Tickets List State
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [newMessageAttachments, setNewMessageAttachments] = useState([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${apiUrl}/tickets?tenantId=${tenantId}`);
      const data = await res.json();
      if (data.success) {
        setTickets(data.data);
      }
    } catch (e) {
      console.error('Error fetching widget tickets:', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTickets();
    }
  }, [isOpen]);

  // Compress Image in Canvas
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const maxWidth = 1920;
        const maxHeight = 1080;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve({
          id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: file.name || 'captura.jpg',
          url: dataUrl,
          type: 'image/jpeg',
          size: Math.round((dataUrl.length * 3) / 4),
        });
      };
      img.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handlePaste = async (e, targetList) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          await processFile(file, targetList);
        }
      }
    }
  };

  const processFile = async (file, targetList) => {
    try {
      const compressed = await compressImage(file);
      setCompressionNotice(`⚡ Imagem comprimida automaticamente!`);
      setTimeout(() => setCompressionNotice(null), 3000);

      if (targetList === 'form') {
        setAttachments((prev) => [...prev, compressed]);
      } else {
        setNewMessageAttachments((prev) => [...prev, compressed]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async (e, targetList) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      await processFile(files[i], targetList);
    }
  };

  const removeAttachment = (id, targetList) => {
    if (targetList === 'form') {
      setAttachments((prev) => prev.filter((a) => a.id !== id));
    } else {
      setNewMessageAttachments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    try {
      const contextData = {
        url: window.location.href,
        userEmail,
        userName,
        userAgent: navigator.userAgent,
        os: 'Windows 11',
      };

      const res = await fetch(`${apiUrl}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId,
          title,
          description,
          category,
          priority,
          createdByEmail: userEmail,
          createdByName: userName,
          contextData,
          attachments,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Chamado ${data.data.code} criado! Alertas de WhatsApp e E-mail disparados.`);
        setTitle('');
        setDescription('');
        setAttachments([]);
        fetchTickets();
        setTimeout(() => {
          setSuccessMessage(null);
          setActiveTab('list');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!newMessageContent && newMessageAttachments.length === 0) || !selectedTicket) return;

    setIsSendingMessage(true);
    try {
      const res = await fetch(`${apiUrl}/tickets/${selectedTicket.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: userEmail,
          senderName: userName,
          senderRole: 'client',
          isInternalNote: false,
          content: newMessageContent || 'Anexo enviado.',
          attachments: newMessageAttachments,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewMessageContent('');
        setNewMessageAttachments([]);
        const ticketRes = await fetch(`${apiUrl}/tickets/${selectedTicket.id}`);
        const ticketData = await ticketRes.json();
        if (ticketData.success) {
          setSelectedTicket(ticketData.data);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Triagem</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3" /> Em Atendimento</span>;
      case 'waiting_client':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Aguardando Você</span>;
      case 'resolved':
      case 'closed':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Concluído</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold bg-slate-800 text-slate-300 rounded-full">{status}</span>;
    }
  };

  const posClass = position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6';

  return (
    <div className={`fixed ${posClass} z-[9999] font-sans`}>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: primaryColor }}
          className="flex items-center gap-2.5 px-4 py-3 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer border border-white/20"
        >
          <div className="relative">
            <LifeBuoy className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="font-medium text-sm tracking-wide">Suporte & Chamados</span>
        </button>
      )}

      {/* Widget Panel */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[610px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
          {/* Header */}
          <div
            style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #1e1b4b 100%)` }}
            className="p-4 text-white flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                <LifeBuoy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Suporte — {clientName}</h3>
                <p className="text-xs text-indigo-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> HelpUS Desk Multi-tenant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/50 p-1">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'create'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Novo Chamado
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'list' || activeTab === 'detail'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Meus Chamados ({tickets.length})
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-900/90 text-slate-200">
            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {compressionNotice && (
              <div className="mb-3 p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 text-[11px]">
                {compressionNotice}
              </div>
            )}

            {/* TAB 1: Create Ticket */}
            {activeTab === 'create' && (
              <form onSubmit={handleSubmitTicket} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Tipo de Solicitação</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="bug">🐞 Correção de Erro / Bug</option>
                    <option value="feature">🚀 Pedido de Nova Funcionalidade</option>
                    <option value="question">❓ Dúvida sobre o Sistema</option>
                    <option value="support">🛠️ Suporte Técnico Geral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Assunto / Título</label>
                  <input
                    type="text"
                    required
                    placeholder="Resumo da solicitação..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Prioridade</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['low', 'medium', 'high', 'urgent'].map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`py-1.5 rounded-lg font-medium border text-center transition-all ${
                          priority === p
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {p === 'low' && 'Baixa'}
                        {p === 'medium' && 'Média'}
                        {p === 'high' && 'Alta'}
                        {p === 'urgent' && 'Urgente'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Descrição Detalhada</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Cole capturas de tela com Ctrl+V ou descreva seu problema..."
                    value={description}
                    onPaste={(e) => handlePaste(e, 'form')}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2 p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5 text-indigo-400" /> Anexar / Colar
                    </span>
                    <label className="px-2 py-0.5 bg-indigo-600/20 text-indigo-300 text-[10px] font-bold rounded hover:bg-indigo-600/30 cursor-pointer">
                      Anexar Arquivo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'form')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    📸 Cole imagens com Ctrl+V (Compressão automática ativa, máx. 10MB).
                  </p>

                  {attachments.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {attachments.map((att) => (
                        <div key={att.id} className="relative group">
                          <img src={att.url} alt={att.name} className="w-full h-14 object-cover rounded-lg border border-slate-700" />
                          <button
                            type="button"
                            onClick={() => removeAttachment(att.id, 'form')}
                            className="absolute top-1 right-1 p-0.5 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-2 bg-slate-950/40 border border-slate-800/60 rounded-xl text-[10px] text-slate-400">
                  👤 Solicitante: <span className="text-slate-300">{userName}</span> ({userEmail})
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full py-2.5 text-white font-medium rounded-xl shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  {isSubmitting ? (
                    <span>Enviando chamado...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Enviar Solicitação de Suporte
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: List */}
            {activeTab === 'list' && (
              <div className="space-y-2.5">
                {tickets.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    Nenhum chamado aberto ainda.
                  </div>
                ) : (
                  tickets.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTicket(t);
                        setActiveTab('detail');
                      }}
                      className="p-3 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-indigo-300 rounded">
                          {t.code}
                        </span>
                        {getStatusBadge(t.status)}
                      </div>
                      <h4 className="font-semibold text-xs text-slate-200 line-clamp-1">{t.title}</h4>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                        <span>{new Date(t.createdAt).toLocaleDateString('pt-BR')}</span>
                        <span className="flex items-center gap-1 text-indigo-400">
                          Ver mensagens <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: Detail */}
            {activeTab === 'detail' && selectedTicket && (
              <div className="flex flex-col h-full space-y-3">
                <button
                  onClick={() => setActiveTab('list')}
                  className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar para lista
                </button>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-indigo-400">{selectedTicket.code}</span>
                    {getStatusBadge(selectedTicket.status)}
                  </div>
                  <h3 className="font-bold text-sm text-slate-100">{selectedTicket.title}</h3>
                  <p className="text-slate-400 text-xs">{selectedTicket.description}</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 text-xs">
                  {selectedTicket.messages.map((m) => {
                    if (m.isInternalNote) return null;
                    const isMe = m.senderId === userEmail || m.senderRole === 'client';
                    return (
                      <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className="text-[10px] text-slate-500 mb-0.5">{m.senderName}</div>
                        <div
                          className={`p-2.5 rounded-2xl max-w-[85%] ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-br-none'
                              : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                          }`}
                        >
                          <p>{m.content}</p>
                          {m.attachments && m.attachments.length > 0 && (
                            <div className="pt-1.5 space-y-1">
                              {m.attachments.map((att) => (
                                <img key={att.id} src={att.url} alt={att.name} className="rounded max-h-36 object-cover border border-white/20" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Escreva uma mensagem ou cole imagem com Ctrl+V..."
                    value={newMessageContent}
                    onPaste={(e) => handlePaste(e, 'reply')}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isSendingMessage}
                    style={{ backgroundColor: primaryColor }}
                    className="p-2 text-white rounded-xl cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
