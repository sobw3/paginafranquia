import React, { useState } from 'react';
import { 
  CheckCircle2, Crown, Zap, ShieldCheck, ArrowRight, Smartphone, 
  Package, Lock, Refrigerator, Box, IceCream, LayoutDashboard, 
  Database, Menu, X, Rocket, BarChart3, Users, CreditCard, 
  ChevronDown, Instagram, MessageSquare, MapPin, Phone, Mail, 
  ChevronLeft, ChevronRight, Check, Play, Flame, PieChart, Timer, 
  Wallet, Repeat, Ban, TrendingUp, DollarSign, Calendar, CheckCircle, ShoppingCart, QrCode 
} from 'lucide-react';


const PolicyModal = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Isso impede que a página role enquanto o modal está aberto
  document.body.style.overflow = 'hidden';

  const handleClose = () => {
    document.body.style.overflow = 'unset';
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={handleClose}></div>
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[30px] p-8 md:p-12 shadow-2xl">
        <button onClick={handleClose} className="absolute top-6 right-6 text-slate-500 hover:text-orange-500 transition">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-black font-heading italic uppercase text-white mb-6 tracking-tighter italic border-b border-orange-500/20 pb-4">
          {title}
        </h2>
        <div className="text-slate-400 font-sans text-sm leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

const legalContent = {
terms: (
    <div className="space-y-4 text-left">
      <p className="text-orange-500 font-black italic uppercase text-[10px] tracking-widest">1. ESCOPO DO SERVIÇO</p>
      <p>A Pronto24h fornece a licença do software e o kit de hardware. A operação comercial, reposição e a segurança física do local são de inteira responsabilidade do operador do ponto.</p>
      
      <p className="text-orange-500 font-black italic uppercase text-[10px] tracking-widest">2. GARANTIA E SUPORTE</p>
      <p>O kit possui **garantia total de 30 dias**. Após esse prazo, manutenções no sistema ou hardware serão realizadas apenas mediante plano ativo de manutenção ou pagamento de taxa de chamado individual.</p>
      
      <p className="text-orange-500 font-black italic uppercase text-[10px] tracking-widest">3. ISENÇÃO OPERACIONAL</p>
      <p>A Pronto24h não interfere, monitora ou se responsabiliza por perdas, furtos ou divergências de estoque. Toda a gestão de segurança e auditoria através das câmeras é de responsabilidade exclusiva do operador.</p>
    </div>
  ),
  privacy: (
    <div className="space-y-4 text-left">
      <p className="text-orange-500 font-black italic uppercase text-[10px] tracking-widest">1. GESTÃO DE DADOS DO USUÁRIO</p>
      <p>A Pronto24h fornece a infraestrutura, mas **não possui acesso aos dados pessoais ou históricos de compra** dos usuários finais das operações. Esses dados pertencem e são geridos exclusivamente pelo operador do ponto através de sua instância do sistema.</p>
      
      <p className="text-orange-500 font-black italic uppercase text-[10px] tracking-widest">2. IMAGENS E MONITORAMENTO</p>
      <p>O processamento de imagens e o uso de dados para identificação em casos de furtos ou erros de estoque são de **responsabilidade única do operador**. A Pronto24h não armazena, visualiza ou processa essas imagens em seus servidores centrais.</p>
      
      <p className="text-orange-500 font-black italic uppercase text-[10px] tracking-widest">3. AUTONOMIA FINANCEIRA</p>
      <p>Não intermediamos pagamentos. O fluxo financeiro ocorre diretamente entre o usuário e o operador, sem custódia de valores pela Pronto24h.</p>
    </div>
  )
};

const ROICalculator = () => {
  const SYSTEM_PRICE = 2990; 
  const [dailyFlow, setDailyFlow] = useState(500);
  
  // A venda diária agora é calculada baseada no fluxo (Conversão de ~5% com ticket de R$ 15)
  // Mas permitimos que o usuário ajuste essa "eficiência"
  const [efficiency, setEfficiency] = useState(1); // Multiplicador de desempenho

  const margin = 0.30;
  const daysInMonth = 31;
  
  // Lógica: Fluxo * 5% de conversão * R$ 15,00 ticket médio * eficiência
  const estimatedDailySales = (dailyFlow * 0.05 * 15 * efficiency);
  
  const monthlyRevenue = estimatedDailySales * daysInMonth;
  const monthlyProfit = monthlyRevenue * margin;
  const monthsToPayback = monthlyProfit > 0 ? (SYSTEM_PRICE / monthlyProfit) : 0;

  return (
    <section id="investimento-calc" className="py-32 px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black font-heading italic uppercase leading-[0.8] mb-6 tracking-tighter">
            PROJEÇÃO DE <br/> <span className="text-orange-500 text-glow">RESULTADOS.</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">O fluxo do seu ponto determina o seu lucro</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Esquerdo: Controles */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass p-10 rounded-[40px] border-white/5 space-y-12">
              
              {/* Controle de Fluxo */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <label className="text-white font-black italic uppercase tracking-tighter text-lg flex items-center gap-3">
                    <Users size={20} className="text-orange-500" /> Fluxo Diário no Local
                  </label>
                  <span className="text-3xl font-black text-white italic">{dailyFlow} <span className="text-xs text-slate-500 not-italic">PESSOAS</span></span>
                </div>
                <input 
                  type="range" min="100" max="3000" step="50" value={dailyFlow}
                  onChange={(e) => setDailyFlow(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <p className="text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-widest">
                  *Pessoas que passam ou frequentam o ambiente diariamente
                </p>
              </div>

              {/* Controle de Eficiência de Venda */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <label className="text-white font-black italic uppercase tracking-tighter text-lg flex items-center gap-3">
                    <Zap size={20} className="text-orange-500" /> Performance de Venda
                  </label>
                  <span className="text-xl font-black text-orange-500 italic uppercase">
                    {efficiency < 1 ? 'Conservadora' : efficiency > 1.5 ? 'Agressiva' : 'Equilibrada'}
                  </span>
                </div>
                <input 
                  type="range" min="0.5" max="2.5" step="0.1" value={efficiency}
                  onChange={(e) => setEfficiency(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between mt-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  <span>Pouco mix de produtos</span>
                  <span>Mix completo de produtos</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/20 rounded-[30px] p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">
                <BarChart3 className="text-orange-500" size={30} />
              </div>
              <div>
                <h4 className="text-white font-black italic uppercase text-sm tracking-tighter">Venda Diária Estimada</h4>
                <p className="text-3xl font-black text-orange-500 italic leading-none">R$ {estimatedDailySales.toFixed(0)}</p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Resultados */}
          <div className="lg:col-span-5 grid gap-6">
            <div className="glass p-8 rounded-[40px] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition duration-500"><DollarSign size={80} /></div>
              <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest mb-2">Faturamento Mensal (31 dias)</p>
              <div className="text-4xl font-black text-white italic font-heading tracking-tighter">
                R$ {monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="glass p-8 rounded-[40px] border-l-4 border-l-orange-500 bg-orange-500/5">
              <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-2">Lucro Líquido Real (30%)</p>
              <div className="text-5xl font-black text-white italic font-heading tracking-tighter text-glow">
                R$ {monthlyProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-orange-500 p-10 rounded-[40px] text-black shadow-[0_20px_60px_rgba(249,115,22,0.3)] relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition duration-700"><Timer size={150} /></div>
              <p className="font-black uppercase text-[10px] tracking-widest mb-4 opacity-70 italic">Retorno Total do Investimento</p>
              <div className="text-6xl font-black italic font-heading tracking-tighter leading-none">
                {monthsToPayback <= 1 ? 'NO 1º MÊS' : `${monthsToPayback.toFixed(1)} MESES`}
              </div>
              <div className="mt-6 flex items-center gap-2">
                 <CheckCircle size={16} />
                 <span className="font-bold text-[10px] uppercase tracking-tighter">Investimento R$ 2.990,00 pago com lucro real</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const LandingPagePronto24h = () => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [activeModal, setActiveModal] = useState(null);
const [email, setEmail] = useState('');
const [enviado, setEnviado] = useState(false);
const [parcelas, setParcelas] = useState(1);
const valorBase = 1290.00;

const handleWhatsAppClick = (tipo, parcelas = 1) => {
  const fone = "556182037442"; // COLOQUE SEU NÚMERO AQUI (com DDD e sem espaços)
  
  const mensagem = tipo === 'pix' 
    ? "Olá! Gostaria de adquirir o Hardware da Pronto24h pelo valor promocional de R$ 1.290,00 no PIX."
    : `Olá! Gostaria de adquirir o Hardware da Pronto24h parcelado em ${parcelas}x no cartão de crédito.`;
    
  const url = `https://api.whatsapp.com/send?phone=${fone}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
};

const taxas = {
  1: 1356.99, 2: 2.01, 3: 3.02, 4: 4.03, 5: 5.04, 6: 6.06,
  7: 9.6, 8: 10.65, 9: 11.72, 10: 12.79, 11: 13.87, 12: 14.77
};

const handleFakeSubmit = (e) => {
  e.preventDefault();
  if (!email) return;
  setEnviado(true);
  // Simula um reset após 5 segundos
  setTimeout(() => {
    setEnviado(false);
    setEmail('');
  }, 5000);
};

  // Componente de Título de Seção
  const SectionTitle = ({ children, subtitle, dark = false }) => (
    <div className="text-center mb-16">
      <h2 className={`text-4xl md:text-7xl font-black font-heading italic uppercase tracking-tighter leading-none ${dark ? 'text-white' : 'text-slate-950'}`}>
        {children}
      </h2>
      {subtitle && <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-bold uppercase text-xs tracking-widest">{subtitle}</p>}
      <div className="w-24 h-2 bg-orange-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-orange-500 font-heading tracking-tighter italic">PRONTO</span>
            <span className="text-2xl font-light text-white font-heading tracking-tighter italic">24H</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">
            <a href="#solucao" className="hover:text-orange-500 transition">A Solução</a>
            <a href="#gestao" className="hover:text-orange-500 transition">Gestão 360</a>
            <a href="#carteira" className="hover:text-orange-500 transition text-green-400">Fintech</a>
            <a href="#investimento" className="hover:text-orange-500 transition text-orange-500">Investimento</a>
          </div>

          <a href="https://wa.me/556182037442" target="_blank" rel="noreferrer" className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-3 rounded-xl font-black text-xs transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hidden md:block uppercase tracking-widest">
            Falar com Consultor
          </a>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 font-bold uppercase text-xs tracking-widest">
            <a href="#solucao" onClick={() => setIsMobileMenuOpen(false)}>A Solução</a>
            <a href="#gestao" onClick={() => setIsMobileMenuOpen(false)}>Gestão</a>
            <a href="#carteira" onClick={() => setIsMobileMenuOpen(false)}>Fintech</a>
            <a href="#investimento" onClick={() => setIsMobileMenuOpen(false)}>Investimento</a>
            <a href="https://wa.me/556182037442" className="text-orange-500">WhatsApp Oficial</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-orange-100 text-[10px] font-black uppercase tracking-[0.2em]">Pioneirismo em Pontos de Venda Autônomos</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-8 font-heading italic uppercase tracking-tighter">
            VENDA <span className="text-orange-500 text-glow">24 HORAS</span> <br/>
            SEM FUNCIONÁRIOS.
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Nós não vendemos geladeiras. Vendemos o <span className="text-white font-bold underline decoration-orange-500 italic">sistema, a trava e a gestão</span> que transformam seu equipamento em uma máquina de lucro.
          </p>

          <a href="https://wa.me/556182037442" className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-black px-12 py-6 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-2xl shadow-orange-500/30 flex items-center justify-center gap-3 italic uppercase tracking-tighter">
            QUERO MEU PONTO DE VENDA <ArrowRight size={24} />
          </a>
        </div>
      </section>

      {/* --- NOVO: SEÇÃO GESTÃO 360 (Diferencial de Abastecimento/Validade) --- */}
      <section id="gestao" className="py-24 px-6 bg-slate-900/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle dark subtitle="O controle que nenhuma outra franquia entrega">Domínio Total do Negócio</SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass p-8 rounded-[40px] border-l-4 border-orange-500">
              <PieChart className="text-orange-500 mb-6" size={32} />
              <h4 className="text-xl font-black italic uppercase mb-3 tracking-tighter leading-none">Abastecimento Inteligente</h4>
              <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed">O sistema calcula exatamente o que comprar. Saiba o que vende e o que encalha para eliminar desperdícios.</p>
            </div>
            
            <div className="glass p-8 rounded-[40px] border-l-4 border-red-500">
              <Timer className="text-red-500 mb-6" size={32} />
              <h4 className="text-xl font-black italic uppercase mb-3 tracking-tighter leading-none">Controle de Validade</h4>
              <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed">Alertas automáticos por antecedência. Você nunca mais terá prejuízo com produtos vencidos na prateleira.</p>
            </div>

            <div className="glass p-8 rounded-[40px] border-l-4 border-blue-500">
              <BarChart3 className="text-blue-500 mb-6" size={32} />
              <h4 className="text-xl font-black italic uppercase mb-3 tracking-tighter leading-none">Financeiro de Ponta</h4>
              <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed">Custo de mercado, lucro líquido e despesas. Um DRE completo gerado automaticamente no seu celular.</p>
            </div>

            <div className="glass p-8 rounded-[40px] border-l-4 border-yellow-500">
              <Ban className="text-yellow-500 mb-6" size={32} />
              <h4 className="text-xl font-black italic uppercase mb-3 tracking-tighter leading-none">Gestão de Usuários</h4>
              <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed">Monitore quem compra, onde e quando. Bloqueie usuários malfeitores instantaneamente pelo Admin.</p>
            </div>
          </div>
        </div>
      </section>


      {/* --- NOVO: SEÇÃO CARTEIRA DIGITAL (Fintech) --- */}
      <section id="carteira" className="py-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-500/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center italic">
             <div className="md:w-1/2 order-2 md:order-1">
                <div className="relative glass p-10 rounded-[60px] border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.15)] overflow-hidden">
                   <div className="flex justify-between items-center mb-10">
                      <Wallet size={48} className="text-green-500" />
                      <div className="text-right">
                         <p className="text-[10px] uppercase font-bold text-slate-500 not-italic tracking-widest">Receita Antecipada</p>
                         <p className="text-4xl font-black text-green-500 font-heading tracking-tighter">FINTECH PRONTO</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between p-5 bg-white/5 rounded-2xl border border-white/5 items-center">
                         <div className="flex items-center gap-3"><Repeat size={20} className="text-blue-400"/> <span className="text-sm font-black uppercase tracking-tighter">PIX ENTRE USUÁRIOS</span></div>
                         <span className="bg-green-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase">LIBERADO</span>
                      </div>
                      <div className="flex justify-between p-5 bg-white/5 rounded-2xl border border-white/5 items-center">
                         <div className="flex items-center gap-3"><CreditCard size={20} className="text-orange-400"/> <span className="text-sm font-black uppercase tracking-tighter">RECARGA DE SALDO</span></div>
                         <span className="bg-green-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase">LIBERADO</span>
                      </div>
                   </div>
                </div>
             </div>
             <div className="md:w-1/2 order-1 md:order-2">
                <h2 className="text-5xl md:text-8xl font-black font-heading uppercase leading-none mb-8 tracking-tighter">
                  CARTEIRA <span className="text-green-500">DIGITAL.</span>
                </h2>
                <p className="text-slate-400 text-xl mb-8 leading-relaxed font-medium">
                  Gere <span className="text-white font-bold underline decoration-green-500 uppercase">Receita Passiva Antecipada.</span> O cliente deposita saldo para consumir depois, garantindo fluxo de caixa para sua operação antes mesmo da venda ser realizada.
                </p>
                <div className="space-y-4 font-bold uppercase text-xs tracking-widest text-slate-300">
                  <p className="flex items-center gap-3 italic"><Check className="text-green-500" /> Sistema de Pix interno entre clientes do app</p>
                  <p className="flex items-center gap-3 italic"><Check className="text-green-500" /> Fidelização extrema através de saldo pré-pago</p>
                  <p className="flex items-center gap-3 italic"><Check className="text-green-500" /> Relatórios de consumo: Quem, Onde e Quando</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: JORNADA DO CLIENTE (PASSO A PASSO) --- */}
      <section id="como-funciona" className="py-32 px-6 bg-slate-900/20 relative">
        <div className="max-w-7xl mx-auto">
          <SectionTitle dark subtitle="Experiência fluida, segura e 100% autônoma">Como seu cliente compra</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            
            {/* Linha conectora (visível apenas em desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent -translate-y-24"></div>

            {/* Passo 1 */}
            <div className="glass p-8 rounded-[40px] border-white/5 relative group hover:border-orange-500/30 transition-all">
              <div className="text-6xl font-black font-heading italic text-white/5 absolute top-4 right-8 group-hover:text-orange-500/10 transition-colors">01</div>
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-black mb-8 shadow-lg shadow-orange-500/20">
                <Smartphone size={32} />
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-white">Escaneou, Entrou</h4>
              <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed">
                O cliente escaneia o QR Code no equipamento, acessa o site instantaneamente e realiza seu cadastro rápido.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="glass p-8 rounded-[40px] border-white/5 relative group hover:border-orange-500/30 transition-all">
              <div className="text-6xl font-black font-heading italic text-white/5 absolute top-4 right-8 group-hover:text-orange-500/10 transition-colors">02</div>
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-black mb-8 shadow-lg shadow-orange-500/20">
                <Wallet size={32} />
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-white">Carteira Digital</h4>
              <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed">
                Ele deposita saldo na carteira via Pix ou Cartão de Crédito de forma segura e rápida.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="glass p-8 rounded-[40px] border-white/5 relative group hover:border-orange-500/30 transition-all">
              <div className="text-6xl font-black font-heading italic text-white/5 absolute top-4 right-8 group-hover:text-orange-500/10 transition-colors">03</div>
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-black mb-8 shadow-lg shadow-orange-500/20">
                <Package size={32} />
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-white">Escolha e Pague</h4>
              <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed">
                Escolhe o produto no catálogo digital e confirma o pagamento com apenas um clique.
              </p>
            </div>

            {/* Passo 4 - DESTAQUE: SINAL SONORO */}
            <div className="glass p-8 rounded-[40px] border-orange-500/20 bg-orange-500/5 relative group hover:border-orange-500/40 transition-all lg:col-span-1">
              <div className="text-6xl font-black font-heading italic text-white/5 absolute top-4 right-8 group-hover:text-orange-500/10 transition-colors">04</div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black mb-8 animate-pulse shadow-lg shadow-white/10">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-orange-500">Porta Liberada</h4>
              <p className="text-slate-300 text-xs font-bold uppercase leading-relaxed">
                O equipamento emite um <span className="text-white underline">sinal sonoro</span> e o site exibe uma mensagem clara de "Porta Liberada".
              </p>
            </div>

            {/* Passo 5 */}
            <div className="glass p-8 rounded-[40px] border-white/5 relative group hover:border-orange-500/30 transition-all">
              <div className="text-6xl font-black font-heading italic text-white/5 absolute top-4 right-8 group-hover:text-orange-500/10 transition-colors">05</div>
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-black mb-8 shadow-lg shadow-orange-500/20">
                <Refrigerator size={32} />
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-white">Retirada Livre</h4>
              <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed">
                O cliente abre a porta, retira seu produto gelado e fecha o equipamento.
              </p>
            </div>

            {/* Passo 6 - DESTAQUE: TRAVA AUTOMÁTICA */}
            <div className="glass p-8 rounded-[40px] border-l-4 border-l-emerald-500 relative group hover:border-emerald-500/30 transition-all bg-emerald-500/5">
              <div className="text-6xl font-black font-heading italic text-white/5 absolute top-4 right-8 group-hover:text-emerald-500/10 transition-colors">06</div>
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black mb-8 shadow-lg shadow-emerald-500/20">
                <Lock size={32} />
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-emerald-400">Trava em 10s</h4>
              <p className="text-slate-300 text-xs font-bold uppercase leading-relaxed">
                Segurança Máxima: Após fechar, o sistema aguarda 10 segundos e trava a porta automaticamente. Pronto para a próxima venda!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SEÇÃO VÍDEO: OPERAÇÃO EM TEMPO REAL --- */}
      <section className="py-24 px-6 bg-slate-900/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full mb-6 font-black text-[10px] uppercase tracking-widest border border-orange-500/20">
                <Play size={12} fill="currentColor" /> Operação em Tempo Real
              </div>
              <h2 className="text-5xl md:text-7xl font-black font-heading italic uppercase leading-none mb-8 tracking-tighter">
                TECNOLOGIA <br/> <span className="text-orange-500 text-glow">PRÁTICA.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
                Assista ao Pronto24h em ação. Veja como a nossa <span className="text-white font-bold underline decoration-orange-500">trava exclusiva</span> reage instantaneamente ao comando do cliente. Segurança total com Split de Pagamentos automático.
              </p>
              <div className="glass p-6 rounded-3xl border-l-4 border-l-orange-500">
                 <p className="text-orange-500 font-black text-3xl mb-1 italic">12s</p>
                 <p className="text-xs font-bold uppercase text-slate-400 tracking-tighter leading-tight">Tempo de resposta recorde entre pagamento e liberação física.</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-orange-500/20 rounded-[40px] blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative aspect-video bg-black rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/watch?v=<iframe width="560" height="315" src="https://www.youtube.com/embed/k5j5WD8OiW4?si=5ZSf501GqWYK3dQB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>" 
                  title="Pronto24h em Ação"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPATIBILIDADE --- */}
      <section id="equipamentos" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle dark subtitle="A trava inteligente que se adapta a qualquer cenário">Sua Estrutura, Nossa Mente.</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Refrigerator, t: "GELADEIRAS", d: "Expositoras de bebidas e alimentos frescos." },
              { icon: Box, t: "ARMÁRIOS", d: "Conveniência de snacks e itens secos." },
              { icon: IceCream, t: "FREEZERS", d: "Sorvetes e produtos congelados." }
            ].map((item, i) => (
              <div key={i} className="glass p-12 rounded-[50px] text-center group hover:border-orange-500/50 transition-all duration-500">
                <item.icon size={64} className="mx-auto mb-8 text-orange-500 group-hover:scale-110 transition duration-500" />
                <h4 className="text-3xl font-black mb-3 font-heading italic tracking-tighter uppercase">{item.t}</h4>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-tight">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- SEÇÃO COMPARATIVA: SUPERIORIDADE --- */}
<section className="py-24 px-6 bg-white text-slate-950 relative overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4">
        EFICIÊNCIA <span className="text-orange-500">SUPERIOR.</span>
      </h2>
      <p className="text-slate-500 font-black uppercase text-xs tracking-[0.3em]">
        Por que pagar R$ 11k se você pode ter a mesma tecnologia por uma fração do preço?
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* 1. CONCORRÊNCIA (O Lado Ruim) */}
      <div className="p-10 rounded-[40px] bg-slate-100 border border-slate-200 opacity-60 flex flex-col h-full">
        <h4 className="text-lg font-black italic uppercase mb-8 opacity-50 tracking-widest text-slate-900">Franquias Tradicionais</h4>
        <ul className="space-y-6 flex-grow">
          <li className="flex items-start gap-3 text-slate-400 line-through font-bold text-[11px] italic uppercase tracking-tighter">
            <X size={18} className="mt-1 flex-shrink-0" /> Investimento inicial: R$ 11.000,00+
          </li>
          <li className="flex items-start gap-3 text-slate-400 line-through font-bold text-[11px] italic uppercase tracking-tighter">
            <X size={18} className="mt-1 flex-shrink-0" /> Exige compra de geladeira nova
          </li>
          <li className="flex items-start gap-3 text-slate-400 line-through font-bold text-[11px] italic uppercase tracking-tighter">
            <X size={18} className="mt-1 flex-shrink-0" /> Taxas de royalties sobre vendas
          </li>
          <li className="flex items-start gap-3 text-slate-400 line-through font-bold text-[11px] italic uppercase tracking-tighter">
            <X size={18} className="mt-1 flex-shrink-0" /> Negócio preso à marca deles
          </li>
        </ul>
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-[10px] font-black uppercase text-slate-400 italic">Custo de entrada inacessível</p>
        </div>
      </div>

      {/* 2. PRONTO24H - MODELO HÍBRIDO (Nova Opção Aluguel) */}
      <div className="p-10 rounded-[40px] bg-white border-2 border-slate-200 shadow-xl flex flex-col h-full relative group hover:border-orange-500 transition-all">
        <div className="absolute top-6 right-6 text-orange-500 opacity-20 group-hover:opacity-100 transition-opacity">
          <Zap size={32} />
        </div>
        <h4 className="text-lg font-black italic uppercase mb-2 tracking-tighter text-slate-900">Modelo Híbrido</h4>
        <p className="text-[10px] font-black text-orange-500 uppercase mb-8 tracking-widest">Hardware + Aluguel</p>
        
        <ul className="space-y-6 flex-grow">
          <li className="flex items-start gap-3 font-black text-slate-800 text-xs italic uppercase">
            <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" /> Trava Física: R$ 1.290 (Pix)
          </li>
          <li className="flex items-start gap-3 font-bold text-slate-500 text-[11px] italic uppercase">
            <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" /> Sistema: R$ 290 / mensal
          </li>
          <li className="flex items-start gap-3 font-bold text-slate-500 text-[11px] italic uppercase">
            <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" /> Garantia Permanente inclusa
          </li>
          <li className="flex items-start gap-3 font-bold text-slate-500 text-[11px] italic uppercase text-orange-500">
            <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" /> 30 Dias de Carência Total
          </li>
        </ul>
        <div className="mt-10 pt-6 border-t border-slate-100">
          <p className="text-[10px] font-black uppercase text-slate-900 italic">Ideal para escalar rápido</p>
        </div>
      </div>

      {/* 3. PRONTO24H - ACESSO TOTAL (O "Cérebro" Vitalício) */}
      <div className="p-10 rounded-[40px] bg-slate-950 text-white border-[6px] border-orange-500 shadow-2xl flex flex-col h-full relative overflow-hidden transform lg:-translate-y-8">
        <div className="absolute top-0 right-0 bg-orange-500 text-black font-black px-6 py-2 text-[9px] uppercase italic tracking-widest">Lucro Máximo</div>
        
        <h4 className="text-lg font-black italic uppercase mb-2 tracking-tighter text-orange-500">Acesso Vitalício</h4>
        <p className="text-[10px] font-black text-white/50 uppercase mb-8 tracking-widest text-white">Taxa Zero • Sem Mensalidade</p>
        
        <ul className="space-y-6 flex-grow">
          <li className="flex items-start gap-3 font-black text-white text-sm italic uppercase tracking-tighter">
            <CheckCircle2 size={20} className="text-orange-500 flex-shrink-0" /> Investimento Único: R$ 2.990
          </li>
          <li className="flex items-start gap-3 font-bold text-slate-300 text-[11px] italic uppercase">
            <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" /> Trava + Licença Vitalícia
          </li>
          <li className="flex items-start gap-3 font-bold text-slate-300 text-[11px] italic uppercase">
            <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" /> Carteira Digital e Pix Próprio
          </li>
          <li className="flex items-start gap-3 font-bold text-slate-300 text-[11px] italic uppercase">
            <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" /> 100% Livre de Assinaturas
          </li>
        </ul>
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-[10px] font-black uppercase text-orange-500 italic">O melhor custo-benefício do mercado</p>
        </div>
      </div>

    </div>
  </div>
</section>

{/* --- SHOWROOM REAL (CORRIGIDO PARA MOBILE) --- */}
      <section id="showroom" className="py-24 md:py-32 px-6 bg-white text-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-8xl font-black font-heading italic uppercase leading-[0.8] mb-6 tracking-tighter">
                CONTROLE <br/> <span className="text-orange-500">MÓVEL.</span>
              </h2>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Gerencie toda a sua rede de pontos de venda pelo seu smartphone.</p>
            </div>
          </div>

          {/* Removido h-[750px] fixo para não quebrar no mobile */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Bloco da Imagem Principal */}
            <div className="md:col-span-8 group relative overflow-hidden rounded-[40px] md:rounded-[60px] bg-slate-200 shadow-2xl border-4 border-slate-950">
              <img 
                src="https://i.imgur.com/9Xv75Oc.png" 
                // h-auto e object-contain no mobile para não comer a imagem, h-full e cover no desktop
                className="w-full h-auto md:h-full object-contain md:object-cover transition duration-1000 group-hover:scale-105" 
                alt="Showroom Admin"
              />
              {/* Overlay só aparece no hover ou no desktop para não poluir o mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent flex flex-col justify-end p-6 md:p-12 opacity-0 group-hover:opacity-100 transition-all duration-700">
                <span className="bg-orange-500 text-black text-[10px] font-black px-5 py-2 rounded-full w-fit mb-4 uppercase italic">Interface Admin 2026</span>
                <h4 className="text-white text-2xl md:text-4xl font-black italic uppercase font-heading tracking-tighter">Monitoramento Real</h4>
              </div>
            </div>
            
            {/* Coluna Lateral */}
            <div className="md:col-span-4 flex flex-col gap-8">
              {/* Imagem Secundária - Ajustada para não sumir no mobile */}
              <div className="relative overflow-hidden rounded-[40px] md:rounded-[60px] bg-slate-200 shadow-xl aspect-square md:flex-1">
                <img 
                  src="https://i.imgur.com/Du5MMmc.png" 
                  className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" 
                  alt="Showroom Admin 2"
                />
              </div>

              {/* Card Laranja */}
              <div className="bg-orange-500 rounded-[40px] md:rounded-[60px] p-10 md:p-12 flex flex-col justify-center items-center text-center italic md:flex-1">
                  <Smartphone size={48} className="mb-4 text-black animate-bounce" />
                  <h4 className="font-heading font-black text-2xl md:text-3xl uppercase leading-none mb-4 tracking-tighter italic">Altere Preços <br/> na hora.</h4>
                  <p className="text-black/70 font-bold text-[10px] uppercase tracking-widest leading-tight not-italic max-w-[200px]">Gestão remota de verdade para quem não perde tempo.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO: SHOWCASE DE MERCADOS --- */}
      <section id="mercados" className="py-32 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-8xl font-black font-heading italic uppercase leading-[0.8] mb-6 tracking-tighter">
              DOMINANDO O <br/> <span className="text-orange-500">MERCADO.</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Tecnologia validada em diversos nichos de alta lucratividade.</p>
          </div>

          {/* Grid de Fotos e Argumentos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Condomínios */}
            <div className="group relative h-[450px] overflow-hidden rounded-[40px] border border-white/5">
              <img src="https://i.imgur.com/JvwxLiE.jpeg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="Mercados" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Condomínios</h4>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Conveniência 24h a poucos passos do elevador.(Armário e geladeira)</p>
              </div>
            </div>

            {/* Card 1: Condomínios */}
            <div className="group relative h-[450px] overflow-hidden rounded-[40px] border border-white/5">
              <img src="https://i.imgur.com/EOdl6eH.jpeg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="Mercados" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Condomínios</h4>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Facilita a vida do morador.(Somente geladeira)</p>
              </div>
            </div>


            {/* Card 2: Argumento de Venda (Texto) */}
            <div className="bg-orange-500 rounded-[40px] p-10 flex flex-col justify-center italic">
              <Flame size={40} className="mb-6 text-black" />
              <h4 className="text-3xl font-black text-black uppercase leading-none mb-4 tracking-tighter">POR QUE ELES ESCOLHEM?</h4>
              <p className="text-black/80 font-bold text-xs uppercase tracking-tight leading-relaxed">
                Nossa tecnologia elimina a necessidade de vigias. O próprio morador se serve, paga e a trava libera. É lucro líquido sem passivo trabalhista.
              </p>
            </div>

            {/* Card 3: Academias */}
            <div className="group relative h-[450px] overflow-hidden rounded-[40px] border border-white/5">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="Academias" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Academias & Box</h4>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Suplementação imediata pós-treino.</p>
              </div>
            </div>

            {/* Card 4: Coworking */}
            <div className="group relative h-[450px] overflow-hidden rounded-[40px] border border-white/5">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="Escritórios" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Corporativo</h4>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Energia para quem não para de produzir.</p>
              </div>
            </div>

            {/* Card 5: Hotéis */}
            <div className="group relative h-[450px] overflow-hidden rounded-[40px] border border-white/5">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="Hoteis" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Hotéis & Pousadas</h4>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Frigobar inteligente no lobby.</p>
              </div>
            </div>

            {/* Card 6: Argumento Final (Call to Action) */}
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-center text-center items-center group hover:border-orange-500 transition-all duration-500">
              <Package size={48} className="text-orange-500 mb-6 group-hover:scale-125 transition" />
              <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-4">SEU PONTO AQUI?</h4>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">
                Instalação rápida em menos de 48 horas.
              </p>
              <a href="https://wa.me/556182037442" className="text-orange-500 font-black italic uppercase text-sm border-b-2 border-orange-500 pb-1 hover:text-white hover:border-white transition">
                Consultar Viabilidade
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* --- SEÇÃO: DIFERENCIAL SEGURANÇA ANTIFURTO --- */}
      <section id="seguranca" className="py-32 px-6 bg-black relative overflow-hidden">
        {/* Efeito de Scanner de Segurança no fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Lado Esquerdo: Imagem com Overlay de Segurança */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative rounded-[40px] overflow-hidden border border-white/10">
                <img 
                  src="https://i.imgur.com/cHFL1pD.jpeg" 
                  alt="Segurança e Monitoramento" 
                  className="w-full h-[600px] object-cover scale-105 group-hover:scale-100 transition duration-700"
                />
                {/* Overlay de Interface de Segurança */}
                <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md border border-orange-500/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter text-orange-500">Sistema Anti-Fraude Ativo</span>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-8 left-8 bg-slate-950/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase text-slate-500">Rastreamento de Inventário</span>
                    <ShieldCheck className="text-orange-500" size={20} />
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-[100%] animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <p className="text-[9px] font-bold text-white uppercase italic tracking-widest text-center">Conferência em tempo real: 0% Divergência</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito: Conteúdo Persuasivo */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 w-fit mb-8">
                <Lock size={14} className="text-orange-500" />
                <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.2em]">Tecnologia Blindada</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black font-heading italic uppercase leading-[0.9] mb-8 tracking-tighter">
                O FIM DOS <br/> <span className="text-orange-500 text-stroke-thin">FURTOS.</span>
              </h2>

              <div className="space-y-8">
                <p className="text-slate-400 font-medium text-lg leading-relaxed">
                  Eliminamos o maior gargalo dos mercados autônomos. Nosso sistema trava o acesso e só libera o produto <span className="text-white font-bold italic underline decoration-orange-500">após a conclusão do pagamento.</span>
                </p>

                <div className="grid grid-cols-1 gap-6">
                  <div className="flex gap-6 items-start p-6 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0">
                      <Database size={24} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-black italic uppercase mb-2 tracking-tighter">Inventário Inteligente</h4>
                      <p className="text-slate-500 text-sm font-bold leading-tight uppercase">Baixa automática e conferência exata. Se algo sair sem registro, o sistema aponta o erro na hora do abastecimento.</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start p-6 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0">
                      <Users size={24} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-black italic uppercase mb-2 tracking-tighter">Identificação Total</h4>
                      <p className="text-slate-500 text-sm font-bold leading-tight uppercase">Saiba exatamente quem, quando e onde. Tenha acesso ao CPF e endereço para bloqueios imediatos.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <div className="p-1 rounded-full bg-gradient-to-r from-orange-500 to-transparent w-fit">
                    <div className="bg-black px-8 py-4 rounded-full flex items-center gap-4">
                       <Ban className="text-red-500" size={20} />
                       <span className="text-white font-black italic uppercase text-xs tracking-widest">Tolerância Zero para Inadimplência</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ROICalculator />

     {/* --- SEÇÃO DE INVESTIMENTO FINAL: FOCO EM ESCALABILIDADE --- */}
      <section id="investimento" className="py-32 px-6 relative bg-slate-950">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Zap size={14} className="text-orange-500" />
              <span className="text-orange-100 text-[10px] font-black uppercase tracking-[0.2em]">Tecnologia Validada em Diversos Estados</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black font-heading italic uppercase leading-[0.8] mb-6 tracking-tighter text-glow">
              INVESTIMENTO <br/> <span className="text-orange-500 text-stroke-thin">DEFINITIVO.</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">A tecnologia que você precisa com a liberdade que você merece</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* CARD PRINCIPAL: SISTEMA E HARDWARE */}
            <div className="lg:col-span-7 glass rounded-[60px] p-8 md:p-16 border-orange-500/30 relative overflow-hidden flex flex-col justify-between shadow-[0_0_100px_rgba(249,115,22,0.1)]">
              
              <div>
                <div className="flex flex-wrap gap-3 mb-10">
                  <span className="bg-orange-500 text-black text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-2">
                    <Package size={14} /> +2 CÂMERAS GRATUITAS
                  </span>
                  <span className="bg-white/5 text-white text-[10px] font-black px-4 py-2 rounded-full border border-white/10 italic">
                    INSTALAÇÃO GRÁTIS (DF E ENTORNO)
                  </span>
                </div>

                <h3 className="text-4xl font-black italic uppercase font-heading tracking-tighter mb-8 leading-none">
                  SISTEMA PRONTO24H <br/> <span className="text-orange-500">+ KIT HARDWARE</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  <div className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] italic">
                    <Check size={18} className="text-orange-500" /> Tutorial de Instalação Completo
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] italic">
                    <Check size={18} className="text-orange-500" /> Treinamento de Gestão
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] italic">
                    <Check size={18} className="text-orange-500" /> Enviamos para todo o Brasil
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] italic">
                    <Check size={18} className="text-orange-500" /> Suporte Técnico Dedicado
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-end gap-6 border-t border-white/5 pt-10">
                <div className="text-left italic">
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2 not-italic">Valor Único de Acesso</p>
                  <div className="flex items-center gap-2">
                    <span className="text-8xl md:text-9xl font-black text-white font-heading tracking-tighter text-glow">2.990</span>
                    <span className="text-4xl font-black text-orange-500 italic mb-14 tracking-tighter">,00</span>
                  </div>
                </div>
                <a href="https://wa.me/556182037442" className="flex-1 w-full bg-orange-500 hover:bg-orange-400 text-black py-8 rounded-[30px] font-black text-2xl transition-all hover:scale-105 shadow-2xl uppercase italic font-heading tracking-tighter text-center">
                  Quero Iniciar
                </a>
              </div>
            </div>

            {/* CARDS DE MANUTENÇÃO (LOGÍSTICA TÉCNICA) */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              
              {/* Plano Essencial */}
              <div className="glass p-8 rounded-[40px] border-white/5 relative group">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-orange-500">
                    <Database size={24} />
                  </div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic font-sans">Backend & DB</span>
                </div>
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">Manutenção Mensal</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase leading-tight mb-6 font-sans">Serviço de infraestrutura: Banco de Dados e Backend gerenciado.</p>
                <div className="flex items-end gap-1 font-heading italic">
                  <span className="text-4xl font-black text-white tracking-tighter">R$ 79,90</span>
                  <span className="text-slate-600 text-[10px] font-bold uppercase mb-1">/mês</span>
                </div>
              </div>

              {/* Plano com Garantia */}
              <div className="glass p-8 rounded-[40px] border-orange-500/20 bg-orange-500/5 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-orange-500/10 rotate-12 transition group-hover:scale-110"><ShieldCheck size={120} /></div>
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-black">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest italic font-sans">Garantia Total</span>
                </div>
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2 relative z-10">Suporte + Garantia</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase leading-tight mb-6 relative z-10 font-sans">Infraestrutura técnica inclusa + Cobertura contra danos físicos do kit.</p>
                <div className="flex items-end gap-1 font-heading italic relative z-10">
                  <span className="text-4xl font-black text-orange-500 tracking-tighter text-glow">R$ 149,90</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase mb-1">/mês</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed italic font-sans">
                  *Flexibilidade técnica: Você decide entre gerenciar seu próprio servidor ou contar com nossa gestão completa de infraestrutura.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

{/* 2. MODELO HARDWARE + SOFTWARE */}
      <section className="py-24 bg-slate-950 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
              Modelo <span className="text-orange-500">Hardware + Software</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">A forma mais inteligente de começar seu negócio.</p>
          </div>

          {/* GUIA DE PASSOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { step: "01", title: "Adquira a Trava", desc: "Hardware robusto com valor reduzido (R$ 1.290 no Pix). Compra vitalícia." },
              { step: "02", title: "Alugue o Sistema", desc: "Ative a inteligência remota e o controle via celular (R$ 290/mês)." },
              { step: "03", title: "30 Dias Grátis", desc: "Instale, venda e lucre. A primeira mensalidade é por nossa conta.", special: true }
            ].map((item, idx) => (
              <div key={idx} className={`${item.special ? 'bg-orange-500/10 border-orange-500/20' : 'bg-white/5 border-white/5'} p-8 rounded-[32px] border relative overflow-hidden group`}>
                <span className={`text-5xl font-black ${item.special ? 'text-orange-500/20' : 'text-white/5'} absolute right-6 top-6 italic transition-transform group-hover:scale-110`}>{item.step}</span>
                <h4 className={`font-black uppercase text-base mb-3 italic ${item.special ? 'text-orange-500' : 'text-white'}`}>{item.title}</h4>
                <p className="text-slate-500 text-[11px] font-bold uppercase leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* PLANO DE TECNOLOGIA TURBINADO */}
            <div className="bg-slate-900/50 p-8 md:p-12 rounded-[40px] border border-white/10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black italic uppercase mb-2">Tecnologia Pronto24h</h3>
                <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10 italic">O que sua mensalidade cobre:</p>
                
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: <Database size={20}/>, title: "Gestão em Nuvem", desc: "Dashboard completo para controle de vendas e estoque." },
                    { icon: <Smartphone size={20}/>, title: "App do Cliente", desc: "Interface intuitiva para abertura via QR Code ou Link." },
                    { icon: <ShieldCheck size={20}/>, title: "Segurança Ativa", desc: "Monitoramento de status da trava e logs de acesso 24h." },
                    { icon: <Zap size={20}/>, title: "Update Automático", desc: "Sua tecnologia sempre atualizada com novas funções." },
                    { icon: <Phone size={20}/>, title: "Suporte VIP", desc: "Atendimento prioritário para qualquer ajuste técnico." }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="bg-orange-500/10 p-3 rounded-2xl text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                        {feature.icon}
                      </div>
                      <div>
                        <h5 className="text-xs font-black uppercase text-white tracking-wide">{feature.title}</h5>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 p-8 bg-orange-500 rounded-[35px] text-black shadow-2xl shadow-orange-500/20 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="font-black uppercase text-[10px] tracking-widest opacity-80 italic">Investimento Mensal</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black italic tracking-tighter">R$ 290,00</span>
                    <span className="text-xs font-black uppercase italic">/mês</span>
                  </div>
                  <p className="font-bold text-[9px] uppercase mt-2">*Sem multas ou fidelidade abusiva.</p>
                </div>
                <Flame className="absolute -right-6 -bottom-6 text-black/10" size={120} />
              </div>
            </div>

{/* Lado Direito: Simulador de Hardware */}
<div className="bg-gradient-to-br from-slate-950 to-slate-900 p-8 md:p-12 rounded-[50px] border border-white/10 shadow-2xl">
  <div className="flex items-center gap-2 mb-8">
    <CreditCard className="text-orange-500" size={24} />
    <h3 className="font-black italic uppercase text-xl text-white">Pagamento do Hardware</h3>
  </div>

  <div className="space-y-6">
    {/* ÁREA DO PIX COM BOTÃO ÓBVIO */}
    <div className="relative group">
      <div className="absolute -top-3 left-6 bg-orange-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter z-20 animate-bounce">
        Melhor Preço
      </div>
      <button 
        onClick={() => handleWhatsAppClick('pix')}
        className="w-full p-8 bg-orange-500/5 border-2 border-orange-500/20 rounded-[35px] flex flex-col gap-4 hover:border-orange-500 hover:bg-orange-500/10 transition-all text-left relative overflow-hidden shadow-2xl shadow-orange-500/5"
      >
        <div className="flex justify-between items-start w-full relative z-10">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase italic mb-1">Pagamento à vista</p>
            <p className="text-4xl font-black italic text-orange-500 tracking-tighter">No PIX</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black italic text-white leading-none tracking-tighter">R$ 1.290,00</p>
            <p className="text-[10px] font-bold text-orange-500 uppercase mt-2 italic">Liberte seu lucro agora</p>
          </div>
        </div>
        
        <div className="w-full bg-orange-500 text-black font-black uppercase italic py-3 rounded-xl flex items-center justify-center gap-2 text-xs group-hover:bg-orange-400 transition-colors">
          <QrCode size={16} />
          Comprar com desconto PIX
        </div>
        
        {/* Detalhe visual de fundo */}
        <QrCode className="absolute -right-4 -bottom-4 text-orange-500/5 rotate-12" size={120} />
      </button>
    </div>

    <div className="relative py-4 flex items-center">
      <div className="flex-grow border-t border-white/5"></div>
      <span className="flex-shrink mx-4 text-slate-600 text-[9px] font-black uppercase">OU PARCELE NO CARTÃO</span>
      <div className="flex-grow border-t border-white/5"></div>
    </div>

    {/* ÁREA DO CARTÃO */}
    <div className="space-y-4">
      <div className="relative">
        <select 
          className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm font-bold text-white focus:border-orange-500 outline-none transition-all cursor-pointer appearance-none shadow-inner"
          value={parcelas}
          onChange={(e) => setParcelas(Number(e.target.value))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1}x no Cartão de Crédito</option>
          ))}
        </select>
        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
      </div>

      <div className="bg-black/60 p-8 rounded-[40px] border border-white/5 relative overflow-hidden">
        <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-6">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1 tracking-widest text-left">Valor da Parcela</p>
            <p className="text-4xl font-black italic text-white tracking-tighter text-left">
              R$ {((parcelas === 1 ? 1356.99 : 1356.99 * (1 + taxas[parcelas]/100)) / parcelas).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-orange-500 uppercase mb-1">Total Cartão</p>
            <p className="text-lg font-black italic text-white opacity-60">
              R$ {((parcelas === 1 ? 1356.99 : 1356.99 * (1 + taxas[parcelas]/100))).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => handleWhatsAppClick('cartao', parcelas)}
          className="w-full bg-white text-black font-black uppercase italic py-6 rounded-2xl hover:bg-orange-500 transition-all shadow-xl flex items-center justify-center gap-3 group active:scale-95"
        >
          <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
          Comprar no Cartão
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionTitle dark subtitle="Dúvidas sobre a implementação?">FAQ Técnica</SectionTitle>
          <div className="space-y-6">
            {[
               { q: "O que eu preciso ter?", a: "Basta uma geladeira expositora, freezer de somente uma porta ou qualquer armário de sua preferência. Nossa tecnologia se adapta ao seu equipamento." },
              { q: "Como funciona a carteira digital?", a: "Seus clientes recarregam saldo via Pix ou Cartão. O dinheiro entra antecipadamente para você e eles utilizam o saldo para abrir a geladeira e comprar os produtos." },
              { q: "Posso gerenciar mais de um ponto?", a: "Sim! Nosso Admin é preparado para gerenciar redes. Você monitora estoque e financeiro de todas as suas unidades em uma única tela." },
              { q: "O sistema avisa sobre o estoque?", a: "Sim. O sistema monitora as saídas em tempo real e te avisa quando um item está acabando ou quando um lote está próximo do vencimento." },
              { q: "Como funciona o Co-Branding?", a: "Você utiliza sua própria marca e logomarca no ponto de venda e na interface do app, enquanto nós garantimos que toda a tecnologia e segurança rodem nos bastidores." }
            ].map((item, i) => (
              <details key={i} className="glass rounded-[35px] p-8 md:p-10 cursor-pointer group hover:border-orange-500/40 transition-all duration-300">
                <summary className="font-black italic uppercase text-xl md:text-2xl flex justify-between items-center list-none tracking-tighter">
                  {item.q}
                  <ChevronDown className="group-open:rotate-180 transition text-orange-500" />
                </summary>
                <p className="text-slate-500 text-base mt-8 leading-relaxed font-bold italic uppercase tracking-tight">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

{/* --- FOOTER PROFISSIONAL ATUALIZADO --- */}
      <footer className="bg-slate-950 pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Elemento Decorativo de Fundo */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            
            {/* Coluna 1: Branding & Manifesto */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-1 mb-8 group cursor-default">
                <span className="text-4xl font-black text-orange-500 font-heading tracking-tighter italic transition-transform group-hover:-skew-x-12">PRONTO</span>
                <span className="text-4xl font-light text-white font-heading tracking-tighter italic">24H</span>
              </div>
              <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8 max-w-sm text-center md:text-left">
                Líder em tecnologia para pontos de venda autônomos. Transformamos equipamentos comuns em unidades de negócio inteligentes com gestão 360º e solução fintech integrada.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, link: "#" },
                  { icon: MessageSquare, link: "https://wa.me/556182037442" },
                  { icon: Phone, link: "tel:556182037442" }
                ].map((social, i) => (
                  <a key={i} href={social.link} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all duration-300 hover:-translate-y-1">
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Coluna 2: Navegação Rápida */}
            <div className="md:col-span-2 flex flex-col gap-6 items-center md:items-start">
              <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-2">Ecossistema</h4>
              <ul className="space-y-4 text-center md:text-left">
                <li><a href="#solucao" className="text-slate-500 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition">A Solução</a></li>
                <li><a href="#gestao" className="text-slate-500 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition">Gestão 360</a></li>
                <li><a href="#carteira" className="text-slate-500 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition">Fintech</a></li>
                <li><a href="#investimento" className="text-slate-500 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition">Investimento</a></li>
              </ul>
            </div>

            {/* Coluna 3: Contato & Suporte */}
            <div className="md:col-span-3 flex flex-col gap-6 items-center md:items-start">
              <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-2">Atendimento</h4>
              <div className="space-y-4">
                <a href="https://wa.me/556182037442" className="flex items-center gap-3 text-slate-400 hover:text-white transition group">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition">
                    <Phone size={14} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-tighter">(61) 8203-7442</span>
                </a>
                <a href="mailto:franquia@pronto24h.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition group">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition">
                    <Mail size={14} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-tighter">contatopronto24h@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin size={14} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-tighter">Brasília, DF - Brasil</span>
                </div>
              </div>
            </div>

            {/* Coluna 4: Newsletter / CTA Small */}
<div className="md:col-span-3">
  <div className="p-8 rounded-[32px] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group h-full">
    <div className="relative z-10">
      <h4 className="text-white font-black italic uppercase text-lg mb-2 tracking-tighter">Seja um parceiro</h4>
      <p className="text-slate-500 text-[10px] font-bold uppercase mb-6 leading-tight">Receba materiais exclusivos sobre o mercado autônomo.</p>
      
      {!enviado ? (
        <form onSubmit={handleFakeSubmit} className="relative">
          <input 
            type="email" 
            placeholder="SEU E-MAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black focus:outline-none focus:border-orange-500 transition" 
            required
          />
          <button 
            type="submit" 
            className="absolute right-2 top-2 bottom-2 bg-orange-500 hover:bg-orange-600 text-black px-3 rounded-lg transition"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      ) : (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 flex items-center gap-2 animate-in fade-in zoom-in duration-300">
          <Check size={14} className="text-orange-500" />
          <span className="text-orange-500 text-[9px] font-black uppercase tracking-widest">Enviado com sucesso!</span>
        </div>
      )}
    </div>
    <Zap className="absolute -right-4 -bottom-4 text-orange-500/10 rotate-12 group-hover:scale-110 transition duration-700" size={120} />
  </div>
</div>

          </div>

          {/* --- BOTTOM BAR (AQUI ESTAVA O ERRO) --- */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">© 2026 Pronto24h Tecnologia</span>
              <div className="flex gap-6">
  <button 
    type="button"
    onClick={(e) => {
      e.preventDefault();
      setActiveModal('terms');
    }}
    className="text-[10px] text-slate-600 hover:text-orange-500 font-black uppercase tracking-widest transition cursor-pointer border-none bg-transparent"
  >
    Termos de Uso
  </button>
                <button 
    type="button"
    onClick={(e) => {
      e.preventDefault();
      setActiveModal('privacy');
    }}
    className="text-[10px] text-slate-600 hover:text-orange-500 font-black uppercase tracking-widest transition cursor-pointer border-none bg-transparent"
  >
    Privacidade
  </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-800 font-black uppercase tracking-[0.5em] hidden lg:block">O CÉREBRO DA CONVENIÊNCIA</p>
            <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-500">
              <ShieldCheck size={16} className="text-green-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ambiente 100% Seguro</span>
            </div>
          </div>
          {/* Fim da Bottom Bar */}
        </div>
        {/* Fim do max-w-7xl */}
      </footer>
      {/* Fim do footer */}

      {/* --- WHATSAPP FLOATING MELHORADO --- */}
      <a 
        href="https://wa.me/556182037442" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[200] group"
      >
        <div className="absolute bottom-full right-0 mb-4 bg-white text-black text-[10px] font-black py-2 px-4 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl uppercase tracking-tighter italic translate-y-2 group-hover:translate-y-0">
          Fale com um especialista 🟢
        </div>
        <div className="bg-[#25D366] p-5 rounded-[24px] shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all relative overflow-hidden">
           <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
           <MessageSquare size={32} color="white" fill="white" className="relative z-10" />
        </div>
      </a>

{/* --- MODAIS LEGAIS --- */}
      <PolicyModal 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)}
        title="Termos de Uso"
        content={legalContent.terms}
      />

      <PolicyModal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)}
        title="Privacidade"
        content={legalContent.privacy}
      />

      {/* --- CSS CUSTOM --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Montserrat:ital,wght@1,900&display=swap');
        .font-heading { font-family: 'Montserrat', sans-serif !important; }
        .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .text-glow { text-shadow: 0 0 40px rgba(249, 115, 22, 0.4); }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>



    </div>
  );
};

export default LandingPagePronto24h;
