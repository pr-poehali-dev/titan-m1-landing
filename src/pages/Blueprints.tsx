import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_URL = "https://functions.poehali.dev/532ced8c-50c8-4078-9e04-5b3be46d3afb";

const INCLUDES = [
  { icon: "FileText",   text: "Полный набор чертежей в формате PDF — все узлы и детали" },
  { icon: "BookOpen",   text: "Подробная инструкция по сборке с пошаговым описанием" },
  { icon: "List",       text: "Перечень материалов и запчастей с точными размерами" },
  { icon: "Layers",     text: "Файлы для лазерной / плазменной резки креплений ДВС, КПП, раздатки и др." },
];

const ALSO = [
  "Готовая техника ТИТАН М1 под заказ",
  "Рамы для багги",
  "КИТ-комплекты для самостоятельной сборки",
  "Консультации по сборке и подбору запчастей",
];

export default function Blueprints() {
  const [scrolled, setScrolled] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setFormStatus("sending");
    try {
      const res = await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          comment: `[Чертежи] ${formComment}`,
          options: ["Заявка на чертежи"],
          total_price: 0,
        }),
      });
      if (res.ok) {
        setFormStatus("ok");
        setFormName(""); setFormPhone(""); setFormComment("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-titan-black overflow-x-hidden">
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-titan-black/96 backdrop-blur-md border-b border-titan-border"
            : "bg-titan-black/80 backdrop-blur-sm border-b border-titan-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/#/" className="flex items-center gap-2">
            <span className="font-oswald text-xl font-bold tracking-[0.2em] text-white">ТИТАН</span>
            <span className="font-oswald text-xl font-light tracking-[0.2em] text-gold">М1</span>
          </a>
          <a href="/#/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-ibm text-sm">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </a>
        </div>
      </nav>

      {/* HERO */}
      <div className="pt-32 pb-0 px-6 bg-titan-surface border-b border-titan-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div className="pb-16">
              <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Техническая документация</span>
              <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white mt-3 mb-6 leading-tight">
                Чертежи багги<br />
                <span className="text-gradient-gold">ТИТАН М1</span> в продаже
              </h1>
              <p className="font-ibm text-base text-white/55 leading-relaxed max-w-lg mb-8">
                Профессиональный набор чертежей с инструкцией — всё необходимое для самостоятельного изготовления
                багги-вездехода ТИТАН М1 в вашей мастерской.
              </p>
              <a
                href="#order"
                className="btn-gold px-10 py-4 text-sm inline-block"
                onClick={(e) => { e.preventDefault(); document.getElementById("order")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <span>Оставить заявку</span>
              </a>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/f0c3aa81-f7bb-4a4d-8f8e-7bd2ccd52302/bucket/a1b75aae-498e-4b12-a758-970bd9ee83ad.jpg"
                alt="Чертёж багги ТИТАН М1"
                className="w-full object-cover"
                style={{ maxHeight: "420px", objectPosition: "top" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-titan-surface via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* INCLUDES */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Состав пакета</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-white mt-3 mb-12">Что входит в комплект</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-20">
            {INCLUDES.map((item, i) => (
              <div key={i} className="card-premium p-6 flex items-start gap-5">
                <div className="w-11 h-11 bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <Icon name={item.icon} size={18} className="text-gold" />
                </div>
                <span className="font-ibm text-sm text-white/65 leading-relaxed mt-1">{item.text}</span>
              </div>
            ))}
          </div>

          {/* ALSO */}
          <div className="card-premium p-8 md:p-10">
            <span className="font-oswald text-[11px] tracking-[0.35em] text-gold/70 uppercase">Также от нас</span>
            <h3 className="font-cormorant text-3xl font-bold text-white mt-2 mb-8">
              Производим и продаём
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {ALSO.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon name="Check" size={13} className="text-gold mt-0.5 shrink-0" />
                  <span className="font-ibm text-sm text-white/60 leading-snug">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-titan-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <p className="font-ibm text-sm text-white/35">Краснодар · Пн–Сб 9:00–18:00 · +7 (995) 258-80-80</p>
              <a href="https://vk.com/s_techno_krd" target="_blank" rel="noopener noreferrer"
                className="btn-outline-gold flex items-center gap-2 px-5 py-2.5 text-xs">
                <Icon name="Users" size={14} />
                Группа ВКонтакте
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER FORM */}
      <div id="order" className="py-20 px-6 bg-titan-surface border-t border-titan-border">
        <div className="max-w-2xl mx-auto">
          <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Заявка</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-white mt-3 mb-3">Оставить заявку</h2>
          <p className="font-ibm text-sm text-white/40 mb-10">
            Свяжемся в течение часа, ответим на вопросы и вышлем реквизиты для оплаты
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-oswald tracking-[0.2em] text-white/35 uppercase mb-2">Ваше имя</label>
              <input
                type="text"
                placeholder="Александр"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full bg-titan-card border border-titan-border text-white/80 px-4 py-3.5 text-sm font-ibm focus:border-gold/50 focus:outline-none transition-colors placeholder:text-white/18"
              />
            </div>
            <div>
              <label className="block text-[10px] font-oswald tracking-[0.2em] text-white/35 uppercase mb-2">Телефон</label>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                required
                className="w-full bg-titan-card border border-titan-border text-white/80 px-4 py-3.5 text-sm font-ibm focus:border-gold/50 focus:outline-none transition-colors placeholder:text-white/18"
              />
            </div>
            <div>
              <label className="block text-[10px] font-oswald tracking-[0.2em] text-white/35 uppercase mb-2">Вопрос или комментарий</label>
              <textarea
                rows={4}
                placeholder="Интересует полный комплект чертежей..."
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full bg-titan-card border border-titan-border text-white/80 px-4 py-3.5 text-sm font-ibm focus:border-gold/50 focus:outline-none transition-colors placeholder:text-white/18 resize-none"
              />
            </div>
            {formStatus === "ok" && (
              <div className="bg-emerald-900/30 border border-emerald-700/40 px-4 py-3 text-sm text-emerald-400 font-ibm">
                Заявка отправлена! Свяжемся с вами в течение часа.
              </div>
            )}
            {formStatus === "error" && (
              <div className="bg-red-900/30 border border-red-700/40 px-4 py-3 text-sm text-red-400 font-ibm">
                Ошибка отправки. Позвоните нам: +7 (995) 258-80-80
              </div>
            )}
            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="btn-gold w-full py-4 text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{formStatus === "sending" ? "Отправляем..." : "Отправить заявку"}</span>
            </button>
          </form>
        </div>
      </div>

      <footer className="border-t border-titan-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-oswald text-lg font-bold tracking-[0.2em] text-white">ТИТАН</span>
            <span className="font-oswald text-lg font-light tracking-[0.2em] text-gold">М1</span>
          </div>
          <p className="text-xs text-white/18 font-ibm">© 2025–2026 Багги-вездеход ТИТАН М1 · Краснодар</p>
        </div>
      </footer>
    </div>
  );
}
