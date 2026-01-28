
import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import { Comment, Project, Experience } from './types';

// Icons using SVG for simplicity and consistency
const CarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 16V8a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2zM5 16l-2 2v2a1 1 0 001 1h18a1 1 0 001-1v-2l-2-2M5 8l2-2h10l2 2" /></svg>
);
const CodeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
);
const HeartIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
);
const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);

const App: React.FC = () => {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isExpModalOpen, setExpModalOpen] = useState(false);
  const [isEduModalOpen, setEduModalOpen] = useState(false);
  
  // Stats & Interactions State
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const experiences: (Experience & { skills: string[] })[] = [
    { 
      year: '2012', 
      title: 'Payvanchi (Welder)', 
      company: 'UzAutoMotors', 
      description: 'Chevrolet Matiz, Nexia, Lacetti, Cobalt modellarida payvandlash ishlari. Yuqori aniqlik va texnik chizmalar bilan ishlash.',
      skills: ['Texnik chizmalar', 'Sifat nazorati', 'Jamoada ishlash']
    },
    { 
      year: '2016', 
      title: 'Umumiy bo\'lim mutaxassisi', 
      company: 'UzAutoMotors', 
      description: 'Korxonaning ichki hujjat aylanishi va umumiy bo\'lim operatsiyalarini boshqarish.',
      skills: ['Hujjatlar bilan ishlash', 'Kompyuter savodxonligi', 'Logistika']
    },
    { 
      year: '2017', 
      title: 'Yig\'uvchi chilangar', 
      company: 'UzAutoMotors', 
      description: 'Yig\'uv sehida murakkab avtomobil agregatlarini yig\'ish va sozlash ishlari.',
      skills: ['Mexanik bilimlar', 'Diagnostika', 'Mantiqiy fikrlash']
    },
    { 
      year: '2022', 
      title: 'Haydovchi (B toifa)', 
      company: 'UzAutoMotors', 
      description: 'Mashinalar yuklash maydonida logistika jarayonlarini boshqarish va transport vositalarini boshqarish.',
      skills: ['Transport logistikasi', 'Mas\'uliyat', 'Tezkor qaror qabul qilish']
    },
  ];

  const educations = [
    { year: '2000', title: '18-o\'rta ta\'lim maktabi', place: 'Asaka tumani, Qadim' },
    { year: '2009', title: 'Avtomobilsozlik kasb-hunar kolleji', place: 'Asaka (3 yil)' },
    { year: '2022-hozir', title: 'Namangan Business and Science University', place: 'Axborot Texnologiyalari (Sirtqi)' },
  ];

  const projects: Project[] = [
    { 
      id: 1, 
      title: 'Modern Portfolio System', 
      description: 'React va TypeScript yordamida yaratilgan, foydalanuvchilar bilan interaktiv aloqa qiluvchi portfolio.', 
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800', 
      tech: ['React', 'Tailwind', 'TypeScript', 'LocalStorage'] 
    },
    { 
      id: 2, 
      title: 'E-Commerce Platform Concept', 
      description: 'Bootstrap va JavaScript yordamida yaratilgan zamonaviy internet do\'kon shabloni.', 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', 
      tech: ['HTML', 'CSS', 'Bootstrap', 'JS'] 
    },
    { 
      id: 3, 
      title: 'Data Dashboard Visualization', 
      description: 'Python (Django/Flask) va React yordamida ma\'lumotlarni vizuallashtirish loyihasi (ish jarayonida).', 
      image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800', 
      tech: ['Python', 'React', 'Chart.js'] 
    },
  ];

  // Initialize data from LocalStorage
  useEffect(() => {
    const storedViews = localStorage.getItem('behzod_views');
    const newViews = (Number(storedViews) || 0) + 1;
    setViews(newViews);
    localStorage.setItem('behzod_views', newViews.toString());

    setLikes(Number(localStorage.getItem('behzod_likes')) || 0);
    setDislikes(Number(localStorage.getItem('behzod_dislikes')) || 0);
    setComments(JSON.parse(localStorage.getItem('behzod_comments') || '[]'));
  }, []);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem('behzod_likes', newLikes.toString());
  };

  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    localStorage.setItem('behzod_dislikes', newDislikes.toString());
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      name: newCommentName,
      text: newCommentText,
      date: new Date().toLocaleDateString('uz-UZ'),
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('behzod_comments', JSON.stringify(updatedComments));
    setNewCommentName('');
    setNewCommentText('');
  };

  return (
    <div className="min-h-screen selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass-morphism border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Behzod.dev
          </span>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#hero" className="hover:text-emerald-400 transition-colors">Bosh sahifa</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Tajriba</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Texnologiyalar</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Loyihalar</a>
          </div>
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm bg-emerald-500/10 px-3 py-1 rounded-full">
            <EyeIcon />
            <span>{views} ko'rish</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left relative z-10">
            <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4 animate-pulse">
              Professional Portfolio
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Zuhriddinov <br /> <span className="text-emerald-400">Behzodbek</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              14 yillik ishlab chiqarish tajribasidan IT dunyosiga o'tgan, bugungi kunda 
              <span className="text-white font-medium"> Namangan Business and Science University</span> talabasi va dasturchi.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <button 
                onClick={() => setAboutModalOpen(true)}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                Men haqimda batafsil
              </button>
              <a 
                href="https://t.me/Behzodbek_uz" 
                target="_blank"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all active:scale-95"
              >
                Telegram: @Behzodbek_uz
              </a>
            </div>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-square max-w-md mx-auto">
              <img 
                src="https://i.pinimg.com/736x/87/f2/ec/87f2ec93e7e4d9b4a9331a8b7042fae1.jpg " 
                alt="Automotive Manufacturing to IT" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-morphism p-4 rounded-xl">
                  <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Hozirgi maqsad</p>
                  <p className="text-sm text-white font-medium">Axborot Texnologiyalari bo'yicha yuqori malakali mutaxassis bo'lish.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & stats Summary */}
      <section id="experience" className="py-20 px-4 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Ish faoliyatim va Tajriba</h2>
            <div className="h-1.5 w-24 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              2012-yildan beri UzAutoMotors tizimida to'plangan boy texnik tajriba va mantiqiy fikrlash IT sohasidagi muvaffaqiyatlarim garovidir.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              onClick={() => setExpModalOpen(true)}
              className="glass-morphism p-8 rounded-3xl cursor-pointer hover:bg-emerald-500/5 hover:border-emerald-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:rotate-12 transition-transform">
                <CarIcon />
              </div>
              <h3 className="text-2xl font-bold mb-2">UzAutoMotors</h3>
              <p className="text-gray-400 text-sm leading-relaxed">14 yillik professional faoliyat: Payvanchilikdan to logistika haydovchiligigacha bo'lgan yo'l.</p>
              <span className="mt-6 inline-flex items-center text-emerald-400 text-sm font-bold uppercase tracking-wider">
                Barcha bosqichlar <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>

            <div 
              onClick={() => setEduModalOpen(true)}
              className="glass-morphism p-8 rounded-3xl cursor-pointer hover:bg-cyan-500/5 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:rotate-12 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Ta'lim yo'li</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Asaka kollejidan boshlab bugungi kunda Oliy ta'lim (Namangan University) darajasigacha.</p>
              <span className="mt-6 inline-flex items-center text-cyan-400 text-sm font-bold uppercase tracking-wider">
                O'quv maskanlari <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>

            <div className="glass-morphism p-8 rounded-3xl border-emerald-500/20 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-pink-500/5 rounded-full"></div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400">
                  <HeartIcon />
                </div>
                <div className="flex gap-2 relative z-10">
                  <button onClick={handleLike} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg text-emerald-400 transition-colors border border-emerald-500/10">
                    👍 <span>{likes}</span>
                  </button>
                  <button onClick={handleDislike} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors border border-red-500/10">
                    👎 <span>{dislikes}</span>
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Interaktivlik</h3>
              <p className="text-gray-400 text-sm">Saytga bo'lgan munosabatingizni like/dislike orqali bildiring. Har bir fikr muhim!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap">Texnologik Stack</h2>
            <div className="h-px w-full bg-white/10"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { name: 'HTML5', color: 'from-orange-500 to-red-500' },
              { name: 'CSS3', color: 'from-blue-500 to-cyan-500' },
              { name: 'Bootstrap', color: 'from-purple-500 to-indigo-500' },
              { name: 'Tailwind', color: 'from-cyan-400 to-blue-400' },
              { name: 'JavaScript', color: 'from-yellow-400 to-orange-400' },
              { name: 'React.js', color: 'from-blue-400 to-indigo-400' },
              { name: 'Python', color: 'from-blue-600 to-yellow-500' },
            ].map((skill) => (
              <div key={skill.name} className="group glass-morphism p-6 rounded-2xl text-center hover:scale-105 transition-all cursor-default">
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <CodeIcon />
                </div>
                <span className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold">Mening Loyihalarim</h2>
              <p className="text-gray-400 mt-3 max-w-xl">
                O'rgangan bilimlarimni amaliy loyihalarda sinab ko'raman. Har bir loyiha men uchun yangi tajriba.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                Ongoing Learning
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div key={p.id} className="glass-morphism rounded-3xl overflow-hidden group border border-white/5 hover:border-emerald-500/30 transition-all">
                <div className="h-56 overflow-hidden relative">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute top-4 right-4">
                    
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                      Featured
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="text-[10px] font-bold px-2.5 py-1 bg-white/5 rounded-lg text-gray-300 border border-white/5 uppercase tracking-tighter">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="glass-morphism rounded-3xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center p-8 text-center h-full min-h-[400px] hover:border-emerald-500/30 transition-colors group cursor-pointer">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all group-hover:rotate-90">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-400 group-hover:text-white transition-colors">Keyingi Loyiha</h3>
              <p className="text-gray-500 text-sm mt-3 max-w-[200px] leading-relaxed">Tez orada bu yerda yangi qiziqarli loyihalarim paydo bo'ladi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactions (Comments) Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 text-emerald-500/10">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21C14.017 19.8954 13.1216 19 12.017 19H9.017C7.91238 19 7.017 19.8954 7.017 21V23H12.017C13.1216 23 14.017 22.1046 14.017 21ZM7.017 21C7.017 22.1046 6.12158 23 5.017 23H2.017C0.912384 23 0.0169983 22.1046 0.0169983 21V18C0.0169983 16.8954 0.912384 16 2.017 16H5.017C6.12158 16 7.017 16.8954 7.017 18V21Z" fillOpacity="0.1"/></svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-10">Fikr va Mulohazalar</h2>
            
            <form onSubmit={handleAddComment} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative z-10">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Ismingiz</label>
                  <input 
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-600"
                    placeholder="Masalan: Azizbek"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/10 active:scale-[0.98]">
                  Izohni yuborish
                </button>
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Fikringiz</label>
                <textarea 
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 h-[124px] focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none transition-all placeholder:text-gray-600"
                  placeholder="Loyihalar va portfolio haqida fikringizni yozing..."
                  required
                />
              </div>
            </form>

            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-bold">Mavjud izohlar</h3>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">{comments.length} ta</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {comments.map((c) => (
                  <div key={c.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold uppercase">
                          {c.name.charAt(0)}
                        </div>
                        <h4 className="font-bold text-white">{c.name}</h4>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">{c.date}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed ml-[52px]">{c.text}</p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-gray-500 text-sm italic font-medium">Hozircha hech kim izoh qoldirmadi. Birinchi bo'lib fikr bildiring!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">Zuhriddinov Behzod</h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                14 yillik professional tajribani zamonaviy axborot texnologiyalari bilan uyg'unlashtirib, yangi cho'qqilarni zabt etish maqsadida.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navigatsiya</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Asosiy</a></li>
                <li><a href="#experience" className="hover:text-emerald-400 transition-colors">Tajriba</a></li>
                <li><a href="#skills" className="hover:text-emerald-400 transition-colors">Texnologiyalar</a></li>
                <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Loyihalar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Murojaat uchun</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-medium">
                <li>
                  <a href="tel:+998339720507" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                    <span className="w-5 text-emerald-500/50">📞</span> +998 33 972 05 07
                  </a>
                </li>
                <li>
                  <a href="https://t.me/Behzodbek_uz" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                    <span className="w-5 text-emerald-500/50">✈️</span> @Behzodbek_uz
                  </a>
                </li>
                <li>
                  <a href="mailto:behzodzuhriddinov@gmail.com" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                    <span className="w-5 text-emerald-500/50">📧</span> behzodzuhriddinov@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-[10px] uppercase tracking-widest font-black">
            <span>&copy; {new Date().getFullYear()} BEHZOD ZUHRIDDINOV PORTFOLIO</span>
            <div className="flex gap-6">
              <span className="hover:text-emerald-500 transition-colors cursor-help">PRIVACY POLICY</span>
              <span className="hover:text-emerald-500 transition-colors cursor-help">TERMS OF USE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={isAboutModalOpen} onClose={() => setAboutModalOpen(false)} title="BIOGRAFIYA">
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl italic">
            "Hayot - bu doimiy rivojlanish demakdir. Men uchun 14 yil avtomobilsozlikda o'tgan bo'lsa, IT bu mening yangi ufqimdir."
          </div>
          <p>
            Men, Zuhriddinov Behzod, UzAutoMotors korxonasida 14 yillik ish tajribasiga ega professionalman. Mening yo'lim 2012-yilda payvandchilikdan boshlangan. UzAutoMotors dagi faoliyatim davomida men Chevrolet kompaniyasining eng ommabop modellari: Matiz, Nexia, Lacetti, Cobalt kabilarni ishlab chiqarishda bevosita ishtirok etdim.
          </p>
          <p>
            Keyinchalik Umumiy bo'lim mutaxassisi, Yig'uv sehida chilangar va logistika yo'nalishida haydovchi bo'lib ishladim. Bu davr mobaynida men texnik bilimlar, intizom va jamoada ishlashning eng yuqori darajalarini egalladim.
          </p>
          <p>
            Hozirda men o'z hayotimda yangi bobni ochdim - Axborot Texnologiyalari. Namangan Business and Science University talabasi sifatida men dasturlash olamiga sho'ng'iganman. Men HTML, CSS, JavaScript va React.js kabi texnologiyalarni chuqur o'rganish orqali zamonaviy muammolarga texnologik yechimlar yaratishni maqsad qilganman.
          </p>
        </div>
      </Modal>

      <Modal isOpen={isExpModalOpen} onClose={() => setExpModalOpen(false)} title="ISH TAJRIBASI (UZAUTOMOTORS)">
        <div className="relative border-l-2 border-emerald-500/30 ml-4 space-y-12 py-4">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-10 group">
              <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-black text-xl tracking-tighter">{exp.year}</span>
                <span className="h-px w-8 bg-emerald-500/20"></span>
              </div>
              <h4 className="text-2xl font-bold mt-2 text-white group-hover:text-emerald-400 transition-colors">{exp.title}</h4>
              <p className="text-emerald-500/80 text-xs font-black uppercase tracking-widest mt-1">{exp.company}</p>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed border-l-2 border-white/5 pl-4">{exp.description}</p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {exp.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded text-[10px] font-bold text-emerald-400 uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal isOpen={isEduModalOpen} onClose={() => setEduModalOpen(false)} title="TA'LIM VA MALAKA">
        <div className="space-y-8">
          {educations.map((edu, idx) => (
            <div key={idx} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-cyan-400 font-black text-lg tracking-tighter">{edu.year}</span>
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/></svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{edu.title}</h4>
              <p className="text-gray-500 text-sm font-medium">{edu.place}</p>
              {edu.title.includes('University') && (
                <div className="mt-6 p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/10">
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Yo'nalish</p>
                  <p className="text-white text-sm font-medium italic">Axborot Texnologiyalari (Informatics & Computer Science)</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default App;
