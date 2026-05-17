import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart, Bell, Phone, MapPin, Shield, Activity, History, MessageCircle,
  Video, Mail, CheckCircle2, AlertTriangle,
} from "lucide-react";

type Tab = "status" | "history" | "contact";

export function FamilyView() {
  const [tab, setTab] = useState<Tab>("status");

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-[2.5rem] border-8 border-foreground/90 bg-background shadow-[var(--shadow-card)] overflow-hidden">
        <div className="bg-[var(--gradient-soft)] min-h-[640px] flex flex-col">
          <div className="px-5 pt-8 pb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ciao Giulia</p>
              <h2 className="text-xl font-semibold text-foreground">Stato di mamma</h2>
            </div>
            <Shield className="size-5 text-primary" />
          </div>

          <div key={tab} className="flex-1 px-5 pb-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {tab === "status" && <StatusTab />}
            {tab === "history" && <HistoryTab />}
            {tab === "contact" && <ContactTab />}
          </div>

          <div className="border-t bg-background/80 backdrop-blur grid grid-cols-3">
            <TabButton icon={<Activity className="size-5" />} label="Stato" active={tab === "status"} onClick={() => setTab("status")} />
            <TabButton icon={<History className="size-5" />} label="Storico" active={tab === "history"} onClick={() => setTab("history")} />
            <TabButton icon={<MessageCircle className="size-5" />} label="Contatti" active={tab === "contact"} onClick={() => setTab("contact")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusTab() {
  return (
    <>
      <Card className="p-6 border-0 shadow-[var(--shadow-card)] text-center">
        <div className="mx-auto size-32 rounded-full bg-success/15 flex items-center justify-center relative">
          <div className="absolute inset-3 rounded-full bg-success/25 animate-pulse" />
          <div className="size-20 rounded-full bg-success flex items-center justify-center relative">
            <Heart className="size-10 text-primary-foreground" fill="currentColor" />
          </div>
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-foreground">Sta bene</h3>
        <p className="mt-1 text-sm text-muted-foreground">Aggiornato 5 minuti fa</p>
      </Card>

      <Card className="mt-4 p-4 border-0 shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-full bg-success/15 flex items-center justify-center shrink-0">
            <Bell className="size-5 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Nessuna anomalia oggi</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Riceverai una notifica solo se qualcosa richiede la tua attenzione.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mt-3 p-4 border-0 shadow-[var(--shadow-card)] flex items-center gap-3">
        <MapPin className="size-5 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">A casa</p>
          <p className="text-xs text-muted-foreground">Posizione condivisa</p>
        </div>
      </Card>
    </>
  );
}

function HistoryTab() {
  const days = [
    { d: "Lun", t: "success" },
    { d: "Mar", t: "success" },
    { d: "Mer", t: "warning" },
    { d: "Gio", t: "success" },
    { d: "Ven", t: "success" },
    { d: "Sab", t: "success" },
    { d: "Dom", t: "success" },
  ];
  const events = [
    { date: "Mer 14 Mag", text: "Sonno frammentato segnalato", tone: "warning" },
    { date: "Mar 13 Mag", text: "Visita di controllo · ok", tone: "success" },
    { date: "Lun 12 Mag", text: "Terapia assunta regolarmente", tone: "success" },
    { date: "Sab 10 Mag", text: "Aderenza settimanale 96%", tone: "success" },
  ];
  return (
    <>
      <Card className="p-4 border-0 shadow-[var(--shadow-card)]">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Ultimi 7 giorni</p>
        <div className="flex items-end justify-between gap-2 h-20">
          {days.map((day) => (
            <div key={day.d} className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`w-full rounded-md ${day.t === "success" ? "bg-success" : day.t === "warning" ? "bg-warning" : "bg-danger"}`}
                style={{ height: day.t === "warning" ? "55%" : "75%" }}
              />
              <span className="text-[10px] text-muted-foreground">{day.d}</span>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-5 mb-2 px-1">Eventi recenti</p>
      <div className="space-y-2">
        {events.map((e, i) => (
          <Card key={i} className="p-3 border-0 shadow-[var(--shadow-card)] flex items-center gap-3">
            <div className={`size-8 rounded-full flex items-center justify-center ${e.tone === "warning" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>
              {e.tone === "warning" ? <AlertTriangle className="size-4" /> : <CheckCircle2 className="size-4" />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground">{e.text}</p>
              <p className="text-xs text-muted-foreground">{e.date}</p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function ContactTab() {
  return (
    <>
      <Card className="p-5 border-0 shadow-[var(--shadow-card)] text-center">
        <div className="mx-auto size-20 rounded-full bg-primary/15 flex items-center justify-center text-primary text-2xl font-semibold">
          M
        </div>
        <h3 className="mt-3 text-lg font-semibold text-foreground">Maria Rossi</h3>
        <p className="text-xs text-muted-foreground">Mamma · 58 anni</p>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button className="h-14 rounded-xl flex-col gap-1" variant="default">
          <Phone className="size-5" />
          <span className="text-xs">Chiama</span>
        </Button>
        <Button className="h-14 rounded-xl flex-col gap-1" variant="outline">
          <Video className="size-5" />
          <span className="text-xs">Videochiama</span>
        </Button>
        <Button className="h-14 rounded-xl flex-col gap-1" variant="outline">
          <MessageCircle className="size-5" />
          <span className="text-xs">Messaggio</span>
        </Button>
        <Button className="h-14 rounded-xl flex-col gap-1" variant="outline">
          <Mail className="size-5" />
          <span className="text-xs">Email</span>
        </Button>
      </div>

      <Card className="mt-4 p-4 border-0 shadow-[var(--shadow-card)]">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Team di cura</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-semibold">LB</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Dr. Luca Bianchi</p>
              <p className="text-xs text-muted-foreground">Oncologo</p>
            </div>
            <Phone className="size-4 text-primary" />
          </div>
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-semibold">SM</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Sara Martelli</p>
              <p className="text-xs text-muted-foreground">Infermiera referente</p>
            </div>
            <Phone className="size-4 text-primary" />
          </div>
        </div>
      </Card>
    </>
  );
}

function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 py-3 transition ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}