import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

export default function Kit() {
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

      <div className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="font-oswald text-[11px] tracking-[0.35em] text-gold uppercase">Самостоятельная сборка</span>
          <h1 className="font-cormorant text-5xl md:text-7xl font-bold text-white mt-3 mb-6">КИТ-комплекты</h1>
          <p className="font-ibm text-base text-white/40 max-w-xl leading-relaxed">
            Раздел находится в разработке. Здесь будет информация о КИТ-комплектах для самостоятельной сборки ТИТАН М1.
          </p>

          <div className="mt-20 card-premium p-12 flex flex-col items-center justify-center text-center max-w-lg">
            <div className="w-16 h-16 bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
              <Icon name="Package" size={28} className="text-gold" />
            </div>
            <h2 className="font-cormorant text-3xl font-bold text-white mb-3">Скоро</h2>
            <p className="font-ibm text-sm text-white/35 leading-relaxed">
              Контент этой страницы готовится. Следите за обновлениями.
            </p>
            <a href="/#/" className="btn-gold px-8 py-3 text-sm mt-8 inline-block">
              <span>Вернуться на главную</span>
            </a>
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