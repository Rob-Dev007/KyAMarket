'use client';

import { useEffect, useState } from "react";

const tabs = [
  { id: "contacto", label: "Contáctanos" },
  { id: "politica", label: "Política de compras" },
  { id: "reclamos", label: "Reclamos y reposiciones" },
];

export default function AyudaPage() {
  const [activeTab, setActiveTab] = useState("contacto");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (tabs.find((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  return (
    <main className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Centro de Ayuda
      </h1>

      <div className="flex justify-center gap-2 md:gap-6 border-b-2 pb-2 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-2 px-4 font-medium transition-all duration-200 focus:outline-none text-sm md:text-base
              ${activeTab === tab.id
                ? "text-purple-600"
                : "text-gray-500 hover:text-purple-500"}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full animate-slide-in" />
            )}
          </button>
        ))}
      </div>

      <section className="mt-8">
        <div className="bg-white shadow-md rounded-2xl p-6 transition-all duration-300">
          {activeTab === "contacto" && (
            <>
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Contáctanos</h2>
              <p className="text-gray-700">
                Puedes comunicarte con nosotros vía <strong>WhatsApp</strong>, <strong>Instagram</strong> o nuestro <strong>facebook</strong>.
                Estamos disponibles de lunes a viernes de 08h00 a 18h00.
              </p>
            </>
          )}

          {activeTab === "politica" && (
            <>
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Política de compras</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Métodos de pago aceptados: tarjeta de crédito, PayPal.</li>
                <li>Envíos en 24-72h hábiles a todo el país.</li>
                <li>Devoluciones dentro de 14 días con número de orden.</li>
              </ul>
            </>
          )}

          {activeTab === "reclamos" && (
            <>
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Reclamos y reposiciones</h2>
              <p className="text-gray-700">
                Si tu producto llegó dañado o hubo un inconveniente, contáctanos en las <strong>48 horas posteriores</strong> a la entrega.
                Nuestro equipo evaluará el caso y se comunicará contigo a la brevedad.
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
