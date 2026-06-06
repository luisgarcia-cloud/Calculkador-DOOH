import React, { useState } from 'react';
import { Info, Calculator, Euro, Users, Eye, ArrowDown, MapPin, Building, Activity, Image as ImageIcon } from 'lucide-react';

const Tooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-flex items-center ml-1 z-10 cursor-help">
    <Info className="w-4 h-4 text-slate-400 hover:text-cyan-400 transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 p-2.5 bg-slate-800 text-slate-200 text-xs leading-relaxed rounded shadow-xl pointer-events-none border border-slate-700">
      {text}
      <svg className="absolute text-slate-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
    </div>
  </div>
);

export default function App() {
  const [hours, setHours] = useState([11, 11, 11, 11, 11, 11, 11]);
  const [peoplePerDay, setPeoplePerDay] = useState(5000);
  const [dwellTime, setDwellTime] = useState(30);
  const [loopFreq, setLoopFreq] = useState(10);
  const [adsPerLoop, setAdsPerLoop] = useState(4);
  
  const [showForm, setShowForm] = useState(false);

  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const handleHourChange = (index: number, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      const newHours = [...hours];
      newHours[index] = Math.max(0, Math.min(24, num));
      setHours(newHours);
    }
  };

  // Calculations
  const weeklyHours = hours.reduce((a, b) => a + b, 0);
  const loopsPerWeek = loopFreq > 0 ? (weeklyHours * 60) / loopFreq : 0;
  
  // Multiplier DOOH: Average number of viewers present at any given moment
  const doohMultiplier = weeklyHours > 0 
    ? (peoplePerDay * 7 * dwellTime) / (weeklyHours * 3600)
    : 0;
    
  const impactsPerWeekPerAd = loopsPerWeek * doohMultiplier;
  const cpm = 10;
  const costPerImpact = cpm / 1000;
  
  const weeklyCostPerAd = impactsPerWeekPerAd * costPerImpact;
  const totalWeeklyRevenue = weeklyCostPerAd * adsPerLoop;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col p-4 sm:p-8 relative overflow-x-hidden">
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col z-10 space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Calculadora DOOH</h1>
            <p className="text-slate-400 text-sm mt-1">Calcula el multiplicador potencial de tu pantalla, su rentabilidad y envíanosla para unirte a la red.</p>
          </div>
          <div className="px-4 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-mono text-cyan-400">
            WAYHOY // ESTIMATOR v2.4
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 grow min-h-0">
          
          {/* Inputs Section */}
          <section className="w-full lg:w-7/12 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800 p-6 flex flex-col gap-6">
            <h2 className="text-lg font-semibold border-b border-slate-800 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Parámetros de Operación
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hours section */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                  Horas de uso diarias
                  <Tooltip text="Horas que la pantalla emite contenido al día. Afecta al número total de spots que se pueden emitir en la semana." />
                </label>
                <div className="flex justify-between gap-1 sm:gap-2">
                  {hours.map((h, i) => (
                    <div key={i} className="flex flex-col items-center w-full">
                      <span className="text-[10px] font-semibold text-slate-500 mb-1.5 uppercase tracking-widest">{days[i]}</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="24" 
                        value={h} 
                        onChange={(e) => handleHourChange(i, e.target.value)}
                        className="w-full text-center bg-slate-800 border border-slate-700 rounded-lg py-2 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all sm:text-sm font-medium text-slate-200"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* People per day */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1" htmlFor="people">
                  Tráfico Diario (OTS)
                  <Tooltip text="Tráfico de audiencia absoluto diario frente a la pantalla." />
                </label>
                <div className="relative">
                  <input 
                    id="people"
                    type="number" 
                    min="0"
                    value={peoplePerDay}
                    onChange={(e) => setPeoplePerDay(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all text-slate-200"
                  />
                  <span className="absolute right-4 top-3 text-slate-500">pax</span>
                </div>
              </div>

              {/* Dwell time */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1" htmlFor="dwell">
                  Permanencia Media
                  <Tooltip text="¿Cuánto tiempo pasa una misma persona dentro del rango visible de la pantalla? Fundamental para calcular la atención publicitaria." />
                </label>
                <div className="relative">
                  <input 
                    id="dwell"
                    type="number" 
                    min="1"
                    value={dwellTime}
                    onChange={(e) => setDwellTime(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all text-slate-200"
                  />
                  <span className="absolute right-4 top-3 text-slate-500">seg</span>
                </div>
              </div>

              {/* Loop Frequency */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1" htmlFor="freq">
                  Frecuencia de Bucle
                  <Tooltip text="Frecuencia con la que se repite la parrilla de anunciantes." />
                </label>
                <div className="relative">
                  <input 
                    id="freq"
                    type="number" 
                    min="1"
                    value={loopFreq}
                    onChange={(e) => setLoopFreq(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all text-slate-200"
                  />
                  <span className="absolute right-4 top-3 text-slate-500">min</span>
                </div>
              </div>

              {/* Ads per loop */}
              <div className="space-y-2">
                 <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1" htmlFor="ads">
                  Anuncios (10") por bloque
                  <Tooltip text="El inventario o 'slots' que quieres vender en este formato, esto determina la suma total de ingresos por pantalla." />
                </label>
                <div className="relative">
                  <input 
                    id="ads"
                    type="number" 
                    min="1"
                    value={adsPerLoop}
                    onChange={(e) => setAdsPerLoop(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all text-slate-200"
                  />
                  <span className="absolute right-4 top-3 text-slate-500">spots</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <p className="text-sm text-cyan-200/80 leading-relaxed italic">
                  "El CPM estándar para impacto DOOH está fijado en 10,00€. Los cálculos se basan en visualizaciones reales según el multiplicador de audiencia."
                </p>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="w-full lg:w-5/12 flex flex-col gap-6 lg:sticky lg:top-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Resultados Estimados</h3>
                <span className="px-2 py-1 rounded bg-slate-800/80 text-cyan-400/80 text-[10px] font-mono border border-slate-700/50">CPM: 10 €</span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-4xl font-light text-white tracking-tight">{doohMultiplier.toFixed(2)}</span>
                  <span className="text-cyan-400 ml-2 font-mono text-sm">Multiplier</span>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Impactos reales por cada reproducción de spot</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Coste Semanal</p>
                    <p className="text-xl font-bold text-slate-100 flex items-baseline gap-1">
                      <span className="text-sm font-normal text-slate-400">€</span> {weeklyCostPerAd.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">por anunciante</p>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/20">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Ingreso Total</p>
                    <p className="text-xl font-bold text-cyan-400 flex items-baseline gap-1">
                       <span className="text-sm font-normal text-cyan-400/60">€</span> {totalWeeklyRevenue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">capacidad total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA / Form */}
            {!showForm ? (
              <button 
                onClick={() => setShowForm(true)}
                className="mt-auto w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                Da de alta tu pantalla
                <ArrowDown className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <div className="flex-1 bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col animate-in fade-in slide-in-from-top-4 duration-500">
                <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center justify-between">
                  Da de alta tu pantalla
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                </h3>
                
                <form action="https://formsubmit.co/hola@wayhoy.com" method="POST" encType="multipart/form-data" className="flex flex-col gap-3 grow">
                  {/* Hidden metadata computed values */}
                  <input type="hidden" name="_subject" value="Nueva solicitud de pantalla DOOH" />
                  <input type="hidden" name="DOOH_Multiplier" value={doohMultiplier.toFixed(2)} />
                  <input type="hidden" name="Weekly_Revenue_Est" value={totalWeeklyRevenue.toFixed(2)} />
                  <input type="hidden" name="Weekly_Cost_Per_Ad" value={weeklyCostPerAd.toFixed(2)} />
                  <input type="hidden" name="Horas_Semanales" value={weeklyHours} />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="organization" placeholder="Organización / Empresa" required className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none text-slate-200" />
                    <input type="text" name="name" placeholder="Nombre Contacto" required className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none text-slate-200" />
                  </div>
                  
                  <input type="email" name="email" placeholder="Email contacto" required className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none text-slate-200" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="location_name" placeholder="Nombre Localización" required className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none text-slate-200" />
                    <input type="text" name="screen_address" placeholder="Dirección Pantalla" required className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none text-slate-200" />
                  </div>
                  
                  <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-slate-800/30 hover:border-cyan-500/50 transition-colors group">
                     <ImageIcon className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                     <span className="text-[10px] text-slate-400 uppercase tracking-widest text-center">Adjuntar foto del entorno<br/><span className="text-slate-500 opacity-60 text-xs lowercase">png, jpg, max 10MB</span></span>
                     <input id="file-upload" name="photo" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                  </div>

                  <button type="submit" className="mt-auto w-full py-3 sm:py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    Enviar Registro
                  </button>
                  <p className="text-center text-[9px] text-slate-500 uppercase tracking-widest mt-1">Datos seguros vía wayhoy.com</p>
                </form>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-4 pb-4 shrink-0 gap-4">
          <div>© 2026 Wayhoy! Digital Signage Solutions</div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <span>Impactos verificados</span>
            <span>GDPR Compliant</span>
            <span className="text-cyan-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block animate-pulse"></span>Live Engine Active</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

