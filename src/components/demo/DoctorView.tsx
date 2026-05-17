import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, Activity, Users, Calendar, FileText, TrendingUp, Search,
  Clock, CheckCircle2, Download, ChevronRight, Heart, Droplet, Moon,
} from "lucide-react";

type Section = "overview" | "patients" | "alerts" | "agenda" | "reports";

const patients = [
  { name: "Maria Rossi", age: 58, diagnosis: "Carcinoma mammario", status: "stable", lastAlert: "—", trend: "stable" },
  { name: "Giuseppe Conti", age: 67, diagnosis: "Carcinoma colon-retto", status: "warning", lastAlert: "2h fa · SpO₂ basso", trend: "down" },
  { name: "Anna Greco", age: 52, diagnosis: "Linfoma Hodgkin", status: "critical", lastAlert: "15min fa · Tachicardia notturna", trend: "down" },
  { name: "Marco Ferri", age: 61, diagnosis: "Carcinoma prostatico", status: "stable", lastAlert: "—", trend: "up" },
  { name: "Lucia Russo", age: 49, diagnosis: "Melanoma", status: "stable", lastAlert: "—", trend: "stable" },
  { name: "Paolo Marini", age: 70, diagnosis: "Carcinoma polmonare", status: "warning", lastAlert: "ieri · sonno frammentato", trend: "down" },
  { name: "Elena Bruno", age: 44, diagnosis: "Carcinoma tiroideo", status: "stable", lastAlert: "—", trend: "up" },
];

const statusConfig = {
  stable: { label: "Stabile", color: "bg-success/15 text-success border-success/30" },
  warning: { label: "Attenzione", color: "bg-warning/15 text-warning border-warning/30" },
  critical: { label: "Critico", color: "bg-danger/15 text-danger border-danger/30" },
};

export function DoctorView() {
  const [section, setSection] = useState<Section>("overview");

  return (
    <div className="rounded-2xl border bg-background shadow-[var(--shadow-card)] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-[var(--gradient-hero)] flex items-center justify-center text-primary-foreground font-semibold">M</div>
          <div>
            <p className="text-sm font-semibold text-foreground">LUMI</p>
            <p className="text-xs text-muted-foreground">Dashboard Clinica</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input className="h-9 w-64 rounded-lg border bg-background pl-9 pr-3 text-sm" placeholder="Cerca paziente..." />
          </div>
          <div className="size-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-semibold">LB</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] min-h-[600px]">
        {/* Sidebar */}
        <aside className="border-r bg-card/50 p-3 lg:p-4 flex lg:block gap-1 overflow-x-auto">
          <NavItem icon={<Activity className="size-4" />} label="Panoramica" active={section === "overview"} onClick={() => setSection("overview")} />
          <NavItem icon={<Users className="size-4" />} label="Pazienti (120)" active={section === "patients"} onClick={() => setSection("patients")} />
          <NavItem icon={<AlertTriangle className="size-4" />} label="Alert" badge="3" active={section === "alerts"} onClick={() => setSection("alerts")} />
          <NavItem icon={<Calendar className="size-4" />} label="Agenda" active={section === "agenda"} onClick={() => setSection("agenda")} />
          <NavItem icon={<FileText className="size-4" />} label="Report FHIR" active={section === "reports"} onClick={() => setSection("reports")} />
        </aside>

        {/* Main */}
        <main className="p-6 space-y-6 bg-[var(--gradient-soft)]">
          <div key={section} className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
            {section === "overview" && <Overview />}
            {section === "patients" && <PatientsList />}
            {section === "alerts" && <AlertsPage />}
            {section === "agenda" && <AgendaPage />}
            {section === "reports" && <ReportsPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Buongiorno</p>
        <h1 className="text-2xl font-semibold text-foreground">Dr. Luca Bianchi</h1>
        <p className="text-sm text-muted-foreground">Hai 3 alert da rivedere e 5 visite in agenda.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Pazienti attivi" value="120" trend="+4" />
        <StatCard label="Alert oggi" value="3" tone="danger" />
        <StatCard label="Visite in settimana" value="18" />
        <StatCard label="Aderenza media" value="94%" tone="success" />
      </div>
      <Card className="p-5 border-0 shadow-[var(--shadow-card)]">
        <h3 className="text-base font-semibold text-foreground mb-1">Recap pre-visita · Maria Rossi</h3>
        <p className="text-xs text-muted-foreground mb-4">Ultimi 30 giorni · generato dall'AI</p>
        <MiniChart />
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <MiniStat label="HR media" value="74 bpm" />
          <MiniStat label="SpO₂ media" value="97%" />
          <MiniStat label="Sonno" value="7h 05" />
        </div>
      </Card>
    </>
  );
}

function PatientsList() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Pazienti</h1>
          <p className="text-sm text-muted-foreground">120 pazienti totali · 3 con alert attivi</p>
        </div>
        <Button size="sm">+ Nuovo paziente</Button>
      </div>
      <Card className="p-5 border-0 shadow-[var(--shadow-card)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground border-b">
                <th className="py-2 pr-4 font-medium">Paziente</th>
                <th className="py-2 pr-4 font-medium hidden md:table-cell">Diagnosi</th>
                <th className="py-2 pr-4 font-medium">Stato</th>
                <th className="py-2 pr-4 font-medium hidden md:table-cell">Ultimo alert</th>
                <th className="py-2 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => {
                const cfg = statusConfig[p.status as keyof typeof statusConfig];
                return (
                  <tr key={p.name} className="border-b last:border-0 hover:bg-secondary/40 transition cursor-pointer">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.age} anni</p>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground hidden md:table-cell">{p.diagnosis}</td>
                    <td className="py-3 pr-4">
                      <Badge className={`rounded-full border ${cfg.color}`} variant="outline">{cfg.label}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground hidden md:table-cell">{p.lastAlert}</td>
                    <td className="py-3"><TrendingUp className={`size-4 ${p.trend === "down" ? "text-danger rotate-180" : p.trend === "up" ? "text-success" : "text-muted-foreground"}`} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function AlertsPage() {
  const alerts = [
    { patient: "Anna Greco", reason: "Tachicardia notturna · 112 bpm", time: "15 min fa", severity: "critical" },
    { patient: "Giuseppe Conti", reason: "SpO₂ sotto soglia · 91%", time: "2h fa", severity: "warning" },
    { patient: "Paolo Marini", reason: "Sonno frammentato (3 risvegli)", time: "ieri", severity: "warning" },
  ];
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Alert clinici</h1>
        <p className="text-sm text-muted-foreground">Filtrati per rilevanza · ordinati per priorità</p>
      </div>
      <div className="space-y-3">
        {alerts.map((a) => (
          <Card key={a.patient} className="p-4 border-0 shadow-[var(--shadow-card)] flex items-center gap-4">
            <div className={`size-11 rounded-full flex items-center justify-center ${a.severity === "critical" ? "bg-danger/15 text-danger" : "bg-warning/15 text-warning"}`}>
              <AlertTriangle className="size-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{a.patient}</p>
              <p className="text-sm text-muted-foreground">{a.reason}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end"><Clock className="size-3" /> {a.time}</p>
              <Button size="sm" variant="outline" className="mt-2">Apri caso</Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function AgendaPage() {
  const slots = [
    { time: "09:00", patient: "Maria Rossi", type: "Controllo trimestrale" },
    { time: "10:30", patient: "Marco Ferri", type: "Refertazione esami" },
    { time: "11:15", patient: "Lucia Russo", type: "Prima visita" },
    { time: "14:00", patient: "Elena Bruno", type: "Follow-up" },
    { time: "15:30", patient: "Giuseppe Conti", type: "Visita urgente · alert" },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Agenda · Oggi</h1>
          <p className="text-sm text-muted-foreground">Martedì 19 Maggio · 5 appuntamenti</p>
        </div>
        <Button size="sm" variant="outline"><Calendar className="size-4" /> Cambia giorno</Button>
      </div>
      <Card className="p-2 border-0 shadow-[var(--shadow-card)]">
        {slots.map((s, i) => (
          <div key={s.time} className={`flex items-center gap-4 p-3 ${i !== slots.length - 1 ? "border-b" : ""}`}>
            <div className="text-center w-14">
              <p className="text-base font-semibold text-primary">{s.time}</p>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{s.patient}</p>
              <p className="text-xs text-muted-foreground">{s.type}</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </div>
        ))}
      </Card>
    </>
  );
}

function ReportsPage() {
  const reports = [
    { name: "Maria Rossi · Bundle FHIR", date: "18 Mag 2026", size: "124 KB" },
    { name: "Giuseppe Conti · Observation", date: "17 Mag 2026", size: "88 KB" },
    { name: "Anna Greco · Care Plan", date: "15 Mag 2026", size: "210 KB" },
    { name: "Marco Ferri · Bundle FHIR", date: "12 Mag 2026", size: "96 KB" },
  ];
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Report FHIR</h1>
        <p className="text-sm text-muted-foreground">Documenti clinici interoperabili pronti per l'invio</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {reports.map((r) => (
          <Card key={r.name} className="p-4 border-0 shadow-[var(--shadow-card)] flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
              <FileText className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.date} · {r.size}</p>
            </div>
            <Button size="icon" variant="ghost"><Download className="size-4" /></Button>
          </Card>
        ))}
      </div>
      <Card className="p-4 border-0 shadow-[var(--shadow-card)] flex items-center gap-3 bg-success/5">
        <CheckCircle2 className="size-5 text-success" />
        <p className="text-sm text-foreground">Tutti i report sono firmati digitalmente e conformi a HL7 FHIR R4.</p>
      </Card>
    </>
  );
}

function NavItem({ icon, label, active, badge, onClick }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`shrink-0 lg:w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary"}`}>
      {icon}<span className="flex-1 text-left whitespace-nowrap">{label}</span>
      {badge && <span className="text-xs bg-danger text-destructive-foreground rounded-full px-2 py-0.5">{badge}</span>}
    </button>
  );
}

function StatCard({ label, value, trend, tone }: { label: string; value: string; trend?: string; tone?: "danger" | "success" }) {
  const valueColor = tone === "danger" ? "text-danger" : tone === "success" ? "text-success" : "text-foreground";
  return (
    <Card className="p-4 border-0 shadow-[var(--shadow-card)]">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${valueColor}`}>{value}</p>
      {trend && <p className="text-xs text-success mt-1">{trend} vs sett. scorsa</p>}
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/50 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

function MiniChart() {
  const points = [40, 55, 48, 60, 52, 65, 58, 70, 62, 68, 60, 72, 65, 70];
  const max = 80;
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * 100} ${100 - (p / max) * 100}`).join(" ");
  return (
    <div className="relative h-32 w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.15 220)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.55 0.15 220)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L 100 100 L 0 100 Z`} fill="url(#g)" />
        <path d={path} fill="none" stroke="oklch(0.55 0.15 220)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

// re-export icons used in subviews to keep tree-shaking happy
export { Heart, Droplet, Moon };