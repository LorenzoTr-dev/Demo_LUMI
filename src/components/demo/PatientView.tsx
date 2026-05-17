import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart, Moon, Activity, Droplet, Calendar, MessageCircle, Smile, Pill,
  Home, HeartPulse, Pill as PillIcon, MessageSquare, Send, CheckCircle2, Clock,
} from "lucide-react";

type Tab = "home" | "health" | "therapy" | "chat";

export function PatientView() {
  const [tab, setTab] = useState<Tab>("home");
  const [mood, setMood] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-[2.5rem] border-8 border-foreground/90 bg-background shadow-[var(--shadow-card)] overflow-hidden">
        <div className="bg-[var(--gradient-soft)] min-h-[640px] flex flex-col">
          <div key={tab} className="flex-1 p-5 pt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {tab === "home" && <HomeTab mood={mood} setMood={setMood} />}
            {tab === "health" && <HealthTab />}
            {tab === "therapy" && <TherapyTab />}
            {tab === "chat" && <ChatTab />}
          </div>

          {/* Bottom tab bar */}
          <div className="border-t bg-background/80 backdrop-blur grid grid-cols-4">
            <TabButton icon={<Home className="size-5" />} label="Home" active={tab === "home"} onClick={() => setTab("home")} />
            <TabButton icon={<HeartPulse className="size-5" />} label="Salute" active={tab === "health"} onClick={() => setTab("health")} />
            <TabButton icon={<PillIcon className="size-5" />} label="Terapia" active={tab === "therapy"} onClick={() => setTab("therapy")} />
            <TabButton icon={<MessageSquare className="size-5" />} label="Chat" active={tab === "chat"} onClick={() => setTab("chat")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeTab({ mood, setMood }: { mood: number | null; setMood: (n: number) => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-sm text-muted-foreground">Buongiorno,</p>
          <h2 className="text-2xl font-semibold text-foreground">Maria</h2>
        </div>
        <div className="size-12 rounded-full bg-primary/15 flex items-center justify-center">
          <Smile className="size-6 text-primary" />
        </div>
      </div>

      <Card className="mt-5 p-5 border-0 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3">
          <span className="size-3 rounded-full bg-success animate-pulse" />
          <p className="text-base font-medium text-foreground">Tutto regolare oggi</p>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Hai dormito bene questa notte. Continua così, Maria.
        </p>
      </Card>

      <Card className="mt-5 p-4 border-0 shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-3">
          <Calendar className="size-5 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Prossima visita</p>
            <p className="text-sm text-muted-foreground">Martedì 19 Maggio · 10:30</p>
            <p className="text-xs text-muted-foreground mt-0.5">Dr. Luca Bianchi · Oncologia</p>
          </div>
        </div>
      </Card>

      <Card className="mt-3 p-4 border-0 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 mb-3">
          <Smile className="size-5 text-primary" />
          <p className="text-sm font-medium text-foreground">Come ti senti oggi?</p>
        </div>
        <div className="flex justify-between">
          {["😟", "😐", "🙂", "😊", "😄"].map((e, i) => (
            <button
              key={i}
              onClick={() => setMood(i)}
              className={`size-10 rounded-full transition text-xl ${mood === i ? "bg-primary/20 ring-2 ring-primary scale-110" : "bg-secondary hover:bg-accent"}`}
            >
              {e}
            </button>
          ))}
        </div>
        {mood !== null && <p className="text-xs text-success mt-3 text-center">Grazie! Annotato sul tuo diario.</p>}
      </Card>
    </>
  );
}

function HealthTab() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-foreground mb-1">Salute</h2>
      <p className="text-sm text-muted-foreground mb-5">Ultime 24 ore · sincronizzato</p>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard icon={<Heart className="size-5" />} label="Battito" value="72" unit="bpm" tone="success" />
        <MetricCard icon={<Droplet className="size-5" />} label="SpO₂" value="98" unit="%" tone="success" />
        <MetricCard icon={<Moon className="size-5" />} label="Sonno" value="7h 20" unit="" tone="success" />
        <MetricCard icon={<Activity className="size-5" />} label="Passi" value="2.4k" unit="" tone="warning" />
      </div>

      <Card className="mt-5 p-4 border-0 shadow-[var(--shadow-card)]">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Battito · ultime 12h</p>
        <div className="flex items-end gap-1 h-20">
          {[60, 65, 62, 70, 68, 75, 72, 80, 74, 70, 68, 72].map((v, i) => (
            <div key={i} className="flex-1 bg-primary/70 rounded-sm" style={{ height: `${v}%` }} />
          ))}
        </div>
      </Card>

      <Card className="mt-3 p-4 border-0 shadow-[var(--shadow-card)] flex items-center gap-3">
        <div className="size-10 rounded-full bg-success/15 flex items-center justify-center">
          <CheckCircle2 className="size-5 text-success" />
        </div>
        <p className="text-sm text-foreground">I tuoi parametri sono nella norma. Nessun alert inviato al medico.</p>
      </Card>
    </>
  );
}

function TherapyTab() {
  const meds = [
    { name: "Tamoxifene 20mg", time: "20:00", taken: false },
    { name: "Vitamina D 1000UI", time: "08:00", taken: true },
    { name: "Omeprazolo 20mg", time: "07:30", taken: true },
  ];
  return (
    <>
      <h2 className="text-2xl font-semibold text-foreground mb-1">Terapia</h2>
      <p className="text-sm text-muted-foreground mb-5">3 farmaci attivi · aderenza 96%</p>

      <div className="space-y-3">
        {meds.map((m) => (
          <Card key={m.name} className="p-4 border-0 shadow-[var(--shadow-card)] flex items-center gap-3">
            <div className={`size-10 rounded-full flex items-center justify-center ${m.taken ? "bg-success/15 text-success" : "bg-accent text-accent-foreground"}`}>
              {m.taken ? <CheckCircle2 className="size-5" /> : <Pill className="size-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="size-3" /> {m.time}</p>
            </div>
            <Badge variant={m.taken ? "secondary" : "default"} className="rounded-full">
              {m.taken ? "Preso" : "Da fare"}
            </Badge>
          </Card>
        ))}
      </div>

      <Card className="mt-5 p-4 border-0 shadow-[var(--shadow-card)]">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Aderenza settimanale</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-success rounded-full" style={{ width: "96%" }} />
          </div>
          <span className="text-sm font-semibold text-success">96%</span>
        </div>
      </Card>
    </>
  );
}

function ChatTab() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Ciao Maria, sono qui per te. Come posso aiutarti oggi?" },
    { from: "me", text: "Ho un po' di nausea, è normale?" },
    { from: "ai", text: "Può capitare con il Tamoxifene. Prova ad assumerlo dopo i pasti. Se persiste oltre 48h avviserò il Dr. Bianchi." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full min-h-[520px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-full bg-[var(--gradient-hero)] flex items-center justify-center text-primary-foreground">
          <MessageCircle className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Assistente LUMI</p>
          <p className="text-xs text-success">● online</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card text-foreground rounded-bl-sm shadow-[var(--shadow-card)]"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Scrivi un messaggio..."
          className="flex-1 h-11 rounded-full bg-card border px-4 text-sm"
        />
        <Button size="icon" onClick={send} className="rounded-full size-11 shrink-0"><Send className="size-4" /></Button>
      </div>
    </div>
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

function MetricCard({ icon, label, value, unit, tone }: { icon: React.ReactNode; label: string; value: string; unit: string; tone: "success" | "warning" | "danger" }) {
  const dotColor = { success: "bg-success", warning: "bg-warning", danger: "bg-danger" }[tone];
  return (
    <Card className="p-4 border-0 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-2">
        <div className="text-primary">{icon}</div>
        <span className={`size-2 rounded-full ${dotColor}`} />
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold text-foreground">
        {value} <span className="text-xs font-normal text-muted-foreground">{unit}</span>
      </p>
    </Card>
  );
}