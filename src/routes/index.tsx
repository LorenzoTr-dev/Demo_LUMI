import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PatientView } from "@/components/demo/PatientView";
import { DoctorView } from "@/components/demo/DoctorView";
import { FamilyView } from "@/components/demo/FamilyView";
import { Heart, Stethoscope, Users } from "lucide-react";
import lumiIcon from "@/assets/lumi-icon.png";
import lumiWordmark from "@/assets/lumi-wordmark.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMI — Demo interattiva" },
      { name: "description", content: "Demo della piattaforma LUMI di monitoraggio oncologico remoto. Esplora le tre viste: paziente, medico e familiare." },
    ],
  }),
  component: Index,
});

const views = [
  { id: "patient", label: "Paziente", subtitle: "Maria, 58 anni", icon: Heart, component: PatientView },
  { id: "doctor", label: "Medico", subtitle: "Dr. Luca, oncologo", icon: Stethoscope, component: DoctorView },
  { id: "family", label: "Familiare", subtitle: "Giulia, caregiver", icon: Users, component: FamilyView },
] as const;

function Index() {
  const [active, setActive] = useState<(typeof views)[number]["id"]>("patient");
  const ActiveView = views.find((v) => v.id === active)!.component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={lumiIcon} alt="LUMI logo" className="size-12 object-contain" />
            <img src={lumiWordmark} alt="LUMI" className="h-9 w-auto object-contain" />
          </div>
          <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">
            Demo interattiva
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-primary font-medium">Bando IO SONO FUTURO · 2026</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight max-w-2xl mx-auto">
          Una piattaforma. Tre persone. Una continuità di cura.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Cambia visuale per esplorare l'esperienza del paziente, del medico e del familiare.
        </p>
      </section>

      {/* View switcher */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="inline-flex w-full sm:w-auto mx-auto rounded-2xl border bg-card p-1.5 shadow-[var(--shadow-card)] flex-col sm:flex-row gap-1">
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = active === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setActive(v.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl text-left transition-all ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <Icon className={`size-5 shrink-0 ${isActive ? "text-primary" : ""}`} />
                <div>
                  <p className={`text-sm leading-tight ${isActive ? "font-bold text-foreground" : "font-semibold"}`}>
                    {v.label}
                  </p>
                  <p className="text-xs leading-tight text-muted-foreground">
                    {v.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active view */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div key={active} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          <ActiveView />
        </div>
      </main>

      <footer className="border-t mt-10 py-6 text-center text-xs text-muted-foreground">
        Demo concept · LUMI © 2026 · Lorenzo Troia & Achraf Nefzaoui
      </footer>
    </div>
  );
}
