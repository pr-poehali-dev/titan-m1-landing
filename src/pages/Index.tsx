import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = [
  "https://cdn.poehali.dev/projects/f0c3aa81-f7bb-4a4d-8f8e-7bd2ccd52302/bucket/070e1ba5-d895-4dce-936f-c53ac036e020.jpg",
  "https://cdn.poehali.dev/projects/f0c3aa81-f7bb-4a4d-8f8e-7bd2ccd52302/bucket/dacd4e03-6891-4256-86c2-4191f2a53c54.jpg",
  "https://cdn.poehali.dev/projects/f0c3aa81-f7bb-4a4d-8f8e-7bd2ccd52302/bucket/0808a7ec-d57c-479e-b303-b48a54f381a4.jpg",
];

const SPECS = [
  { label: "Двигатель", value: "НИВА 2121, 1.7 л, 79 л.с." },
  { label: "Трансмиссия", value: "5-ст. механика + раздаточная КПП" },
  { label: "Привод", value: "Полный, постоянный 4×4" },
  { label: "Подвеска", value: "Независимая, двойные амортизаторы" },
  { label: "Колёса", value: "Cordiant Off Road 2, R16" },
  { label: "Дорожный просвет", value: "от 35 см" },
  { label: "Грузоподъёмность", value: "400 кг" },
  { label: "Лебёдка", value: "3,5 т, в комплекте" },
  { label: "Топливный бак", value: "40 л (АИ-92)" },
  { label: "Снаряжённая масса", value: "от 650 кг" },
  { label: "Длина рамы", value: "380 см" },
  { label: "Ширина по колёсам", value: "185 см" },
  { label: "Высота на колёсах", value: "180 см" },
  { label: "Кузов (Д×Ш)", value: "200 × 160 см, борта от 30 см" },
  { label: "Макс. скорость", value: "более 100 км/ч по бездорожью" },
  { label: "Тормоза", value: "Гидравлика + вакуумный усилитель" },
  { label: "Сцепление", value: "Гидравлическое" },
  { label: "Освещение", value: "LED фары + крышная балка 80 см" },
];

const ADVANTAGES = [
  { icon: "Gauge", title: "100+ км/ч", desc: "Максимальная скорость по пересечённой местности" },
  { icon: "Package", title: "400 кг груза", desc: "Грузоподъёмность без потери управляемости" },
  { icon: "Wrench", title: "Ремонтопригодность", desc: "Узлы НИВА — запчасти в любом городе России" },
  { icon: "Shield", title: "Двойное дно", desc: "Защита двигателя и всех ключевых узлов" },
  { icon: "Settings", title: "Полный привод", desc: "Раздаточная КПП + пониженная передача" },
  { icon: "Zap", title: "Всё включено", desc: "Лебёдка 3,5 т., фаркоп и оптика в базе" },
];

const BASE_PRICE = 1_350_000;

const OPTIONS = [
  { id: "doors",       label: "Двери со стеклом",                    price: 28_000 },
  { id: "windshield",  label: "Лобовое стекло + дворник + омыватель", price: 18_000 },
  { id: "heater",      label: "Отопитель (печка)",                    price: 12_000 },
  { id: "diff_mech",   label: "Самоблокирующийся дифференциал",       price: 24_000 },
  { id: "diff_elec",   label: "Электроблокировка редукторов",         price: 44_000 },
  { id: "tent",        label: "Влагозащитный тент для хранения",      price: 14_000 },
  { id: "coilovers",   label: "Койловеры (4 шт., регулируемые)",      price: 96_000 },
  { id: "eps",         label: "Электроусилитель руля",                price: 32_000 },
  { id: "damper",      label: "Демпфер рулевой рейки",                price: 11_000 },
];

const EQUIPMENT = [
  "Бензиновый двигатель НИВА 1.7 л, 79 л.с.",
  "Карбюратор или инжектор — на выбор",
  "5-ступенчатая механическая КПП НИВА",
  "Раздаточная КПП с пониженной передачей",
  "Стандартные карданы без доп. токарных работ",
  "Привода и ШРУСы на все колёса (НИВА)",
  "Независимая подвеска всех 4 колёс",
  "Двойные амортизаторы (осн. + дополнительный)",
  "Грязевая резина Cordiant Off Road 2 R16",
  "Лебёдка 3,5 т в передней части",
  "Фаркоп в комплекте",
  "Светодиодные фары + крышная фара 80 см",
  "Габариты и стоп-сигналы",
  "Полный электропакет, приборная панель",
  "Защищённый от влаги блок управления",
  "Спортивные регулируемые сиденья-ковши",
  "Боковые зеркала и зеркало заднего вида",
  "Гидравлические тормоза с вакуумным усилителем",
  "Гидравлическое сцепление",
  "Топливный бак 40 л (АИ-92)",
  "Кузов 200×160 см, борта от 30 см",
  "Откидной задний борт",
  "Ровный пол без колёсных арок",
  "Множество точек крепления для такелажа",
  "Доп. багажный отсек под кузовом",
  "Тент-укрытие для груза",
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroFade, setHeroFade] = useState(true);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroFade(false);
      setTimeout(() => {
        setHeroSlide((p) => (p + 1) % IMAGES.length);
        setHeroFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goSlide = (i: number) => {
    setHeroFade(false);
    setTimeout(() => { setHeroSlide(i); setHeroFade(true); }, 300);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const totalPrice =
    BASE_PRICE +
    selectedOptions.reduce((s, id) => s + (OPTIONS.find((o) => o.id === id)?.price ?? 0), 0);

  const toggleOption = (id: string) =>
    setSelectedOptions((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { label: "Характеристики", id: "specs" },
    { label: "Преимущества",   id: "advantages" },
    { label: "Комплектация",   id: "equipment" },
    { label: "Опции",          id: "calculator" },
    { label: "Галерея",        id: "gallery" },
    { label: "Контакты",       id: "contacts" },
  ];

  return (
    <div className="min-h-screen bg-titan-black overflow-x-hidden">

      {/* ── NAVBAR ───────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-titan-black/96 backdrop-blur-md border-b border-titan-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <span className="font-oswald text-xl font-bold tracking-[0.2em] text-white">ТИТАН</span>
            <span className="font-oswald text-xl font-light tracking-[0.2em] text-gold">М1</span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link">
                {n.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block btn-gold px-6 py-2.5 text-xs rounded-none"
          >
            <span>Получить КП</span>
          </button>

          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-titan-dark/98 border-t border-titan-border px-6 py-5 flex flex-col gap-5">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link text-left">
                {n.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contacts")} className="btn-gold px-6 py-3 text-xs mt-1">
              <span>Получить коммерческое предложение</span>
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG slider */}
        <div className="absolute inset-0">
          <img
            src={IMAGES[heroSlide]}
            alt="ТИТАН М1"
            className="w-full h-full object-cover object-center"
            style={{ opacity: heroFade ? 1 : 0, transition: "opacity 0.4s ease" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-titan-black via-titan-black/80 to-titan-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-titan-black via-transparent to-titan-black/40" />
        </div>

        {/* Gold glow */}
        <div className="absolute left-[35%] top-[30%] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
          <div className="max-w-xl">
            <div style={{ animation: "fade-up 0.7s ease-out 0.1s both" }}>
              <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">
                Производство · Краснодар
              </span>
            </div>

            <h1
              className="font-cormorant font-bold leading-[0.9] mt-4 mb-6"
              style={{ fontSize: "clamp(72px, 10vw, 130px)", animation: "fade-up 0.8s ease-out 0.25s both" }}
            >
              <span className="block text-white">ТИТАН</span>
              <span className="block text-gradient-gold">М1</span>
            </h1>

            <p
              className="font-ibm text-base md:text-lg text-white/65 leading-relaxed mb-10 max-w-md"
              style={{ animation: "fade-up 0.8s ease-out 0.45s both" }}
            >
              Багги-вездеход для тех, кто не признаёт ограничений.
              Полный привод, 79 л.с., 400 кг груза —
              создан покорять крайнее бездорожье.
            </p>

            <div className="flex flex-wrap gap-4" style={{ animation: "fade-up 0.8s ease-out 0.6s both" }}>
              <button onClick={() => scrollTo("calculator")} className="btn-gold px-10 py-4 text-sm">
                <span>Рассчитать стоимость</span>
              </button>
              <button onClick={() => scrollTo("specs")} className="btn-outline-gold px-10 py-4 text-sm">
                Характеристики
              </button>
            </div>

            {/* Stats row */}
            <div
              className="mt-16 flex flex-wrap gap-8"
              style={{ animation: "fade-up 0.8s ease-out 0.8s both" }}
            >
              {[
                { val: "100+", label: "км/ч" },
                { val: "400",  label: "кг груза" },
                { val: "35",   label: "см клиренс" },
                { val: "3.5т", label: "лебёдка" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-2xl font-bold text-gold-light leading-none">{s.val}</div>
                  <div className="font-ibm text-[10px] text-white/35 mt-1 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-20 right-8 md:right-12 flex flex-col gap-2 z-20">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goSlide(i)}
              className="w-1.5 rounded-full transition-all duration-300"
              style={{
                height: heroSlide === i ? "28px" : "8px",
                background: heroSlide === i ? "#C9A84C" : "rgba(201,168,76,0.3)",
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-oswald text-[9px] tracking-[0.35em] text-white/40 uppercase">Прокрутите вниз</span>
          <Icon name="ChevronDown" size={16} className="text-gold animate-bounce" />
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SPECS ────────────────────────────────────────────── */}
      <section id="specs" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Технические данные</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mt-3 mb-16">
              Характеристики
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-20">
            {SPECS.map((s, i) => (
              <Reveal key={s.label} delay={i * 25}>
                <div className="spec-row flex justify-between items-center py-4">
                  <span className="font-ibm text-sm text-white/45">{s.label}</span>
                  <span className="font-oswald text-sm font-medium text-white/85 text-right max-w-[55%]">
                    {s.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── ADVANTAGES ───────────────────────────────────────── */}
      <section id="advantages" className="py-24 px-6 bg-titan-surface">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Почему выбирают</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mt-3">Преимущества</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className="card-premium p-8 h-full">
                  <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                    <Icon name={a.icon} size={20} className="text-gold" />
                  </div>
                  <h3 className="font-oswald text-xl font-semibold text-gold-light tracking-wide mb-2">{a.title}</h3>
                  <p className="font-ibm text-sm text-white/50 leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── EQUIPMENT ────────────────────────────────────────── */}
      <section id="equipment" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Базовая</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mt-3 mb-16">Комплектация</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
            {EQUIPMENT.map((item, i) => (
              <Reveal key={i} delay={i * 20}>
                <div className="flex items-start gap-3 py-3 px-4 border-l-2 border-titan-border hover:border-gold/50 transition-colors duration-200">
                  <Icon name="Check" size={13} className="text-gold mt-0.5 shrink-0" />
                  <span className="font-ibm text-sm text-white/65 leading-snug">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CALCULATOR ───────────────────────────────────────── */}
      <section id="calculator" className="py-24 px-6 bg-titan-surface">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Конфигуратор</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mt-3 mb-3">
              Рассчитать стоимость
            </h2>
            <p className="font-ibm text-sm text-white/40 mb-14">
              Выберите опции — итоговая цена обновится автоматически
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Options grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
              {OPTIONS.map((opt, i) => {
                const active = selectedOptions.includes(opt.id);
                return (
                  <Reveal key={opt.id} delay={i * 50}>
                    <button
                      onClick={() => toggleOption(opt.id)}
                      className={`option-card w-full text-left p-5 ${active ? "selected" : ""}`}
                    >
                      <div className="flex justify-between gap-3">
                        <span className="font-ibm text-sm text-white/75 leading-snug">{opt.label}</span>
                        <div
                          className={`w-5 h-5 shrink-0 border flex items-center justify-center transition-all ${
                            active ? "bg-gold border-gold" : "border-titan-muted"
                          }`}
                        >
                          {active && <Icon name="Check" size={11} className="text-titan-black" />}
                        </div>
                      </div>
                      <div className="mt-3 font-oswald text-base font-semibold text-gold">
                        + {opt.price.toLocaleString("ru-RU")} ₽
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {/* Price card */}
            <Reveal className="lg:sticky lg:top-24">
              <div className="card-premium p-8">
                <div className="font-oswald text-[10px] tracking-[0.3em] text-gold/60 uppercase mb-6">
                  Ваша конфигурация
                </div>

                <div className="space-y-3 mb-6 min-h-[80px]">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/45 font-ibm">Базовая цена</span>
                    <span className="text-white font-oswald">{BASE_PRICE.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  {selectedOptions.map((id) => {
                    const o = OPTIONS.find((x) => x.id === id);
                    if (!o) return null;
                    return (
                      <div key={id} className="flex justify-between">
                        <span className="font-ibm text-xs text-white/35 max-w-[55%] leading-snug">{o.label}</span>
                        <span className="font-oswald text-xs text-gold/70">+{o.price.toLocaleString("ru-RU")} ₽</span>
                      </div>
                    );
                  })}
                </div>

                <div className="section-divider mb-6" />

                <div className="mb-8">
                  <div className="font-ibm text-[10px] text-white/35 uppercase tracking-widest mb-1">Итого</div>
                  <div
                    className="font-cormorant font-bold text-gradient-gold"
                    style={{ fontSize: "clamp(32px, 4vw, 44px)", lineHeight: 1 }}
                  >
                    {totalPrice.toLocaleString("ru-RU")} ₽
                  </div>
                </div>

                <button
                  onClick={() => scrollTo("contacts")}
                  className="btn-gold w-full py-4 text-sm"
                >
                  <span>Заказать с этими опциями</span>
                </button>

                {selectedOptions.length > 0 && (
                  <button
                    onClick={() => setSelectedOptions([])}
                    className="w-full mt-3 text-xs text-white/25 font-ibm hover:text-white/50 transition-colors py-2"
                  >
                    Сбросить выбор
                  </button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── GALLERY ──────────────────────────────────────────── */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Визуал</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mt-3 mb-16">Галерея</h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Main large — front view */}
            <Reveal className="col-span-2 row-span-2">
              <div className="gallery-item w-full h-full min-h-[320px] overflow-hidden cursor-pointer">
                <img src={IMAGES[0]} alt="ТИТАН М1 — вид спереди" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            {/* Small — back view */}
            <Reveal delay={80}>
              <div className="gallery-item aspect-square overflow-hidden cursor-pointer">
                <img src={IMAGES[1]} alt="ТИТАН М1 — вид сзади" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            {/* Small — side view */}
            <Reveal delay={160}>
              <div className="gallery-item aspect-square overflow-hidden cursor-pointer">
                <img src={IMAGES[2]} alt="ТИТАН М1 — вид сбоку" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            {/* Wide bottom banner */}
            <Reveal delay={240} className="col-span-2">
              <div className="gallery-item aspect-video overflow-hidden cursor-pointer">
                <img src={IMAGES[1]} alt="ТИТАН М1 — кузов" className="w-full h-full object-cover object-bottom" />
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="text-center text-xs font-ibm text-white/20 mt-8">
              Реальные фотографии и видео — по запросу. Свяжитесь с нами.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CONTACTS ─────────────────────────────────────────── */}
      <section id="contacts" className="py-24 px-6 bg-titan-surface">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Краснодар</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mt-3">Связаться с нами</h2>
            <p className="font-ibm text-sm text-white/40 mt-3 max-w-sm mx-auto">
              Отвечаем в течение часа, консультируем и согласуем комплектацию
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Form */}
            <Reveal>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: "Ваше имя",  type: "text", placeholder: "Александр" },
                  { label: "Телефон",   type: "tel",  placeholder: "+7 (___) ___-__-__" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-[10px] font-oswald tracking-[0.2em] text-white/35 uppercase mb-2">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full bg-titan-card border border-titan-border text-white/80 px-4 py-3.5 text-sm font-ibm focus:border-gold/50 focus:outline-none transition-colors placeholder:text-white/18"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-oswald tracking-[0.2em] text-white/35 uppercase mb-2">
                    Пожелания по комплектации
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Опишите ваши пожелания..."
                    className="w-full bg-titan-card border border-titan-border text-white/80 px-4 py-3.5 text-sm font-ibm focus:border-gold/50 focus:outline-none transition-colors placeholder:text-white/18 resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full py-4 text-sm mt-2">
                  <span>Отправить заявку</span>
                </button>
              </form>
            </Reveal>

            {/* Info block */}
            <Reveal delay={150}>
              <div className="space-y-7">
                <div className="space-y-4">
                  {[
                    { icon: "Phone",   label: "Телефон",        value: "+7 (XXX) XXX-XX-XX" },
                    { icon: "MapPin",  label: "Город",           value: "Краснодар" },
                    { icon: "Clock",   label: "Режим работы",    value: "Пн–Сб, 9:00–19:00" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0">
                        <Icon name={c.icon} size={16} className="text-gold" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/28 font-ibm uppercase tracking-wider">{c.label}</div>
                        <div className="text-sm text-white/80 font-ibm mt-0.5">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="section-divider" />

                <div>
                  <div className="text-[10px] font-oswald tracking-[0.25em] text-gold/60 uppercase mb-3">Мессенджеры</div>
                  <div className="flex gap-3">
                    {[
                      { icon: "MessageCircle", label: "WhatsApp" },
                      { icon: "Send",          label: "Telegram"  },
                    ].map((s) => (
                      <button key={s.label} className="btn-outline-gold flex items-center gap-2 px-5 py-2.5 text-xs">
                        <Icon name={s.icon} size={14} />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card-premium p-5 mt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-gold" />
                    <span className="text-xs text-white/45 font-ibm">Производство в Краснодаре</span>
                  </div>
                  <p className="text-xs text-white/30 font-ibm leading-relaxed">
                    Каждый ТИТАН М1 изготавливается под заказ.
                    Возможны индивидуальные доработки — обсудим до подписания договора.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-titan-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-oswald text-lg font-bold tracking-[0.2em] text-white">ТИТАН</span>
            <span className="font-oswald text-lg font-light tracking-[0.2em] text-gold">М1</span>
          </div>
          <p className="text-xs text-white/18 font-ibm">© 2024 Багги-вездеход ТИТАН М1 · Краснодар</p>
          <div className="flex gap-6">
            {navItems.slice(0, 3).map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link text-xs">
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}