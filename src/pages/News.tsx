import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const NEWS = [
  {
    id: 1,
    date: "Июль 2026",
    title: "Список изменений июль 2026",
    items: [
      "Колея уменьшается на 10 см. со 185 см. до 175 см. Использование нижних рычагов длинных с Нивы без переделок, на сайлентблоках с креплениями каждой стороны.",
      "Переработка верхнего рычага с пластиной под шаровую 10 мм. + добавление резьбы и контргаек для регулировки развала.",
      "Съёмные сиденья и отсек для доступа и разбора КПП и раздатки с салона (ранее не съёмное и разбор только с извлечением ДВС).",
      "Увеличенное подкапотное пространство +5 см в длину и ширину.",
      "Передние амортизаторы 2109 с чашами и пружиной под 2121 (толстая крепкая пружина) — ранее 2111 (перед/зад).",
      "Топливный бак с Газели 60 литров. Идеален в задней части (уже установлен).",
      "Чехлы/накидки на сиденья.",
      "Увеличение туннеля в салоне и установка пластикового декоративного корпуса от Нивы с подстаканниками и прикуривателем.",
      "Приборная панель на основе бортового компьютера с подключением к OBD2, полное удаление ключей и замка зажигания.",
      "Усиленный рулевой узел, встроенный в корпус (уже реализовано).",
      "Капот на газлифте (уже реализовано).",
      "Добавление пластиковой защиты двигателя по бокам и в задней части (пластик 3 мм.).",
      "Полноценный металлический корпус для бачков охлаждающей жидкости.",
      "Полная защита тормозных трубок и шлангов внутри жёстких шлангов большего диаметра.",
      "Увеличение кабины на 10 см. в ширину для установки туннеля и более удобной эксплуатации.",
      "Внедрение подножек с рифлёным металлом.",
      "Установка поручней для удобной посадки водителя и пассажира.",
      "Переработка педального узла и тормозной системы.",
      "Полная защита проводки и блоков, увеличенная масса кузова.",
    ],
  },
];

export default function News() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
          <a href="/" className="flex items-center gap-2">
            <span className="font-oswald text-xl font-bold tracking-[0.2em] text-white">ТИТАН</span>
            <span className="font-oswald text-xl font-light tracking-[0.2em] text-gold">М1</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-ibm text-sm">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </a>
        </div>
      </nav>

      <div className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Последние события</span>
          <h1 className="font-cormorant text-5xl md:text-7xl font-bold text-white mt-3 mb-16">Новости</h1>

          <div className="space-y-10">
            {NEWS.map((post) => (
              <article key={post.id} className="card-premium p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="font-oswald text-[11px] tracking-[0.3em] text-gold/70 uppercase">{post.date}</span>
                </div>
                <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-white mb-8">{post.title}</h2>
                <ol className="space-y-4">
                  {post.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="font-oswald text-sm font-semibold text-gold/60 shrink-0 w-6 text-right mt-0.5">{i + 1}.</span>
                      <span className="font-ibm text-sm text-white/65 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
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
