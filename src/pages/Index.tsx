import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/1dba6a3c-7414-4c09-ae9e-3e818a60fbb5/files/15662f56-93f6-4a0d-8a21-27d2e739bcd2.jpg';
const DISH_IMG = 'https://cdn.poehali.dev/projects/1dba6a3c-7414-4c09-ae9e-3e818a60fbb5/files/4940a680-67c1-4cbf-a9ae-c9bf2c0a93c6.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'menu', label: 'Меню' },
  { id: 'about', label: 'О ресторане' },
  { id: 'contacts', label: 'Контакты' },
];

const MENU = [
  { name: 'King Бургер', desc: 'Сочная мраморная говядина, золотистая булочка бриошь, фирменный соус', price: '490 ₽', tag: 'Хит' },
  { name: 'Двойной Royale', desc: 'Две котлеты, чеддер, бекон, карамелизированный лук', price: '650 ₽', tag: '' },
  { name: 'Цезарь с курицей', desc: 'Хрустящий салат, томаты черри, пармезан, соус Цезарь', price: '420 ₽', tag: '' },
  { name: 'Картофель по-королевски', desc: 'Хрустящие дольки с трюфельным маслом и розмарином', price: '290 ₽', tag: '' },
  { name: 'Крылья BBQ', desc: 'Куриные крылья в дымном соусе барбекю, медовая глазурь', price: '460 ₽', tag: 'Новинка' },
  { name: 'Молочный шейк', desc: 'Натуральное мороженое, ваниль Бурбон, карамель', price: '320 ₽', tag: '' },
];

const FEATURES = [
  { icon: 'ChefHat', title: 'Авторская кухня', text: 'Каждое блюдо — результат работы шеф-повара и отборных ингредиентов' },
  { icon: 'Flame', title: 'Гриль на углях', text: 'Настоящий вкус открытого огня и аромат дымка в каждой подаче' },
  { icon: 'Leaf', title: 'Свежие продукты', text: 'Локальные фермерские поставки и ежедневные закупки' },
];

const Index = () => {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAVBAR */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-gold/20 py-3' : 'py-6'}`}>
        <div className="container flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
            <Icon name="Crown" className="text-gold transition-transform group-hover:scale-110" size={28} />
            <span className="font-display text-2xl tracking-wide">King <span className="text-gold">Food</span></span>
          </button>
          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`relative text-sm tracking-wide transition-colors hover:text-gold ${active === n.id ? 'text-gold' : 'text-foreground/80'}`}
              >
                {n.label}
                {active === n.id && <span className="absolute -bottom-1.5 left-0 w-full h-px gold-line" />}
              </button>
            ))}
          </nav>
          <button className="md:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden container mt-4 flex flex-col gap-4 pb-4 anim-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-foreground/80 hover:text-gold">
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center grain">
        <div className="absolute inset-0 anim-scale-in">
          <img src={HERO_IMG} alt="King Food интерьер" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>
        <div className="container relative z-10 py-32">
          <div className="max-w-2xl">
            <p className="anim-fade-up text-gold tracking-[0.4em] text-xs md:text-sm uppercase mb-6" style={{ animationDelay: '0.1s' }}>
              Дагомыс · Сочи
            </p>
            <h1 className="anim-fade-up font-display text-6xl md:text-8xl leading-[0.95] mb-8" style={{ animationDelay: '0.25s' }}>
              Вкус, достойный<br /><span className="gold-gradient italic">короля</span>
            </h1>
            <p className="anim-fade-up text-lg text-foreground/70 max-w-lg mb-10 leading-relaxed" style={{ animationDelay: '0.4s' }}>
              Изысканная кухня, благородная атмосфера и блюда, приготовленные с королевской заботой о каждой детали.
            </p>
            <div className="anim-fade-up flex flex-wrap gap-4" style={{ animationDelay: '0.55s' }}>
              <Button onClick={() => scrollTo('menu')} className="bg-gold text-gold-foreground hover:bg-gold-light font-medium px-8 py-6 rounded-sm text-base">
                Смотреть меню
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button onClick={() => scrollTo('contacts')} variant="outline" className="border-gold/40 text-foreground hover:bg-gold/10 hover:text-gold px-8 py-6 rounded-sm text-base bg-transparent">
                Как нас найти
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 anim-fade-in" style={{ animationDelay: '1s' }}>
          <Icon name="ChevronDown" className="text-gold/60 animate-bounce" size={28} />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 border-y border-gold/10">
        <div className="container grid md:grid-cols-3 gap-12">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/30 mb-6 transition-all group-hover:border-gold group-hover:bg-gold/5">
                <Icon name={f.icon} className="text-gold" size={26} />
              </div>
              <h3 className="font-display text-2xl mb-3">{f.title}</h3>
              <p className="text-foreground/60 leading-relaxed max-w-xs mx-auto">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-28">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Наше меню</p>
            <h2 className="font-display text-5xl md:text-6xl mb-4">Избранные блюда</h2>
            <div className="w-24 h-px gold-line mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-x-14 gap-y-10 max-w-4xl mx-auto">
            {MENU.map((item) => (
              <div key={item.name} className="group flex items-start justify-between gap-4 pb-6 border-b border-gold/10 hover:border-gold/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-display text-2xl transition-colors group-hover:text-gold">{item.name}</h3>
                    {item.tag && (
                      <span className="text-[10px] uppercase tracking-widest text-gold border border-gold/40 rounded-full px-2 py-0.5">{item.tag}</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/55 leading-relaxed pr-4">{item.desc}</p>
                </div>
                <span className="font-display text-2xl text-gold whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-card/40">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative hover-lift">
            <img src={DISH_IMG} alt="Блюдо King Food" className="w-full rounded-sm object-cover aspect-[4/3]" />
            <div className="absolute -bottom-6 -right-6 hidden md:flex flex-col items-center justify-center w-32 h-32 bg-gold text-gold-foreground rounded-sm shadow-2xl">
              <span className="font-display text-4xl leading-none">12</span>
              <span className="text-[11px] uppercase tracking-widest mt-1">лет вкуса</span>
            </div>
          </div>
          <div>
            <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">О ресторане</p>
            <h2 className="font-display text-5xl md:text-6xl mb-8 leading-tight">Где каждый гость<br /><span className="italic text-gold">желанный</span></h2>
            <p className="text-foreground/65 leading-relaxed mb-6">
              King Food в самом сердце Дагомыса — место, где уличная классика встречается с высокой гастрономией. Мы отбираем лучшие продукты и готовим с уважением к традициям и вкусу.
            </p>
            <p className="text-foreground/65 leading-relaxed mb-10">
              Тёплая атмосфера, безупречный сервис и блюда, которые хочется заказывать снова. Добро пожаловать в наш дом вкуса.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[['50+', 'блюд в меню'], ['4.8', 'рейтинг гостей'], ['100%', 'свежесть']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-4xl text-gold mb-1">{n}</div>
                  <div className="text-xs text-foreground/50 uppercase tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Контакты</p>
            <h2 className="font-display text-5xl md:text-6xl mb-4">Ждём вас в гости</h2>
            <div className="w-24 h-px gold-line mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: 'MapPin', title: 'Адрес', lines: ['пгт Дагомыс, Сочи', 'ул. Гайдара, 20А/1'] },
              { icon: 'Clock', title: 'Часы работы', lines: ['Ежедневно', '10:00 — 22:00'] },
              { icon: 'Phone', title: 'Телефон', lines: ['+7 (___) ___-__-__', 'Уточняется'] },
            ].map((c) => (
              <div key={c.title} className="text-center p-8 border border-gold/15 rounded-sm hover:border-gold/40 transition-colors bg-card/30">
                <Icon name={c.icon} className="text-gold mx-auto mb-5" size={28} />
                <h3 className="font-display text-xl mb-3">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-foreground/60 text-sm">{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto mt-8 rounded-sm overflow-hidden border border-gold/15">
            <iframe
              title="King Food на карте"
              src="https://yandex.ru/map-widget/v1/org/king_food/201384687931/"
              width="100%"
              height="360"
              frameBorder="0"
              className="grayscale-[0.3]"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/15 py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Icon name="Crown" className="text-gold" size={22} />
            <span className="font-display text-xl">King <span className="text-gold">Food</span></span>
          </div>
          <p className="text-foreground/40 text-sm">© 2026 King Food · Дагомыс, Сочи</p>
          <div className="flex gap-4">
            {['Instagram', 'Send', 'Phone'].map((s) => (
              <button key={s} className="w-10 h-10 flex items-center justify-center rounded-full border border-gold/25 text-gold hover:bg-gold/10 transition-colors">
                <Icon name={s} size={18} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
