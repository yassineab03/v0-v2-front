"use client";
import { useState } from "react";
import styles from "./dashboard.module.css";

// ── Types (diagramme de classes) ──────────────────────────────────────────────
type ProjectStatus = "Actif" | "En pause" | "Terminé";
type TicketStatus = "ToDo" | "InProgress" | "Done";
type TicketType = "UserStory" | "Task" | "Bug";
type RiskStatus = "Identifié" | "En cours" | "Mitigé" | "Clos";
type DeliverableStatus = "En attente" | "Livré" | "En retard";

interface Project {
  refProjet: string; nom: string; description: string;
  dateDebut: string; dateFin: string;
  budgetPrevu: number; budgetReel: number;
  statut: ProjectStatus; membres: number; tickets: number; progress: number;
}
interface Ticket {
  refTicket: string; titre: string; type: TicketType;
  priorite: "Critique" | "Haute" | "Moyenne" | "Basse";
  statut: TicketStatus; storyPoints: number; assignee: string;
}
interface Risk {
  refRisque: string; description: string;
  probabilite: number; impact: number; criticite: number; statut: RiskStatus;
}
interface Deliverable {
  refLivrable: string; nom: string; datePrevue: string; statut: DeliverableStatus;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  { refProjet: "PRJ-001", nom: "ProjAI Platform", description: "Plateforme Agile avec IA Gemini", dateDebut: "2025-01-15", dateFin: "2025-05-30", budgetPrevu: 45000, budgetReel: 32000, statut: "Actif", membres: 4, tickets: 24, progress: 68 },
  { refProjet: "PRJ-002", nom: "E-Commerce Refonte", description: "Refonte complète boutique en ligne", dateDebut: "2025-02-01", dateFin: "2025-07-15", budgetPrevu: 72000, budgetReel: 18000, statut: "Actif", membres: 6, tickets: 41, progress: 31 },
  { refProjet: "PRJ-003", nom: "API Gateway v2", description: "Migration microservices", dateDebut: "2024-10-01", dateFin: "2025-02-28", budgetPrevu: 28000, budgetReel: 29500, statut: "Terminé", membres: 3, tickets: 18, progress: 100 },
];
const TICKETS: Ticket[] = [
  { refTicket: "TK-001", titre: "Setup Auth JWT", type: "Task", priorite: "Critique", statut: "Done", storyPoints: 3, assignee: "Y.A" },
  { refTicket: "TK-002", titre: "Board Kanban UI", type: "UserStory", priorite: "Haute", statut: "InProgress", storyPoints: 8, assignee: "A.G" },
  { refTicket: "TK-003", titre: "Intégration Gemini API", type: "Task", priorite: "Haute", statut: "InProgress", storyPoints: 5, assignee: "S.E" },
  { refTicket: "TK-004", titre: "Fix login redirect bug", type: "Bug", priorite: "Critique", statut: "ToDo", storyPoints: 2, assignee: "Y.A" },
  { refTicket: "TK-005", titre: "Module Registre Risques", type: "UserStory", priorite: "Moyenne", statut: "ToDo", storyPoints: 5, assignee: "A.G" },
  { refTicket: "TK-006", titre: "Docker Compose setup", type: "Task", priorite: "Haute", statut: "Done", storyPoints: 3, assignee: "S.E" },
];
const RISKS: Risk[] = [
  { refRisque: "RSK-001", description: "Indisponibilité API Gemini", probabilite: 2, impact: 5, criticite: 10, statut: "En cours" },
  { refRisque: "RSK-002", description: "Dépassement planning (2 mois)", probabilite: 3, impact: 4, criticite: 12, statut: "Identifié" },
  { refRisque: "RSK-003", description: "Réponses IA incorrectes JSON", probabilite: 3, impact: 3, criticite: 9, statut: "Mitigé" },
  { refRisque: "RSK-004", description: "Mauvaise intégration front/back", probabilite: 2, impact: 3, criticite: 6, statut: "Clos" },
];
const DELIVERABLES: Deliverable[] = [
  { refLivrable: "LIV-001", nom: "Rapport tests JUnit Sprint 1", datePrevue: "2025-02-15", statut: "Livré" },
  { refLivrable: "LIV-002", nom: "Swagger API Documentation", datePrevue: "2025-03-01", statut: "En attente" },
  { refLivrable: "LIV-003", nom: "Docker Compose Final", datePrevue: "2025-01-30", statut: "En retard" },
  { refLivrable: "LIV-004", nom: "Slides Soutenance PDF", datePrevue: "2025-05-25", statut: "En attente" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusColors: Record<ProjectStatus, string> = { "Actif": "badge-green", "En pause": "badge-amber", "Terminé": "badge-gray" };
const ticketTypeColors: Record<TicketType, string> = { UserStory: "badge-purple", Task: "badge-blue", Bug: "badge-red" };
const ticketPrioColors: Record<string, string> = { Critique: "badge-red", Haute: "badge-amber", Moyenne: "badge-purple", Basse: "badge-gray" };
const riskStatusColors: Record<RiskStatus, string> = { "Identifié": "badge-amber", "En cours": "badge-blue", "Mitigé": "badge-green", "Clos": "badge-gray" };
const delivStatusColors: Record<DeliverableStatus, string> = { "Livré": "badge-green", "En attente": "badge-amber", "En retard": "badge-red" };
function criticitéLabel(c: number) { return c >= 10 ? "badge-red" : c >= 6 ? "badge-amber" : "badge-green"; }

// ── Sub-components ────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className={`${styles.statCard} ${accent ? styles[accent] : ""}`} style={{
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(22, 163, 74, 0.15)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)"
    }}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {sub && <p className={styles.statSub}>{sub}</p>}
    </div>
  );
}
function ProgressBar({ value }: { value: number }) {
  return (
    <div className={styles.progressTrack}>
      <div className={styles.progressFill} style={{ width: `${value}%` }} />
    </div>
  );
}
function Badge({ text, cls }: { text: string; cls: string }) {
  return <span className={`${styles.badge} ${styles[cls]}`}>{text}</span>;
}

// ── AI Brain Panel ────────────────────────────────────────────────────────────
function AIBrainPanel() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const handleRun = () => {
    setRunning(true); setDone(false);
    setTimeout(() => { setRunning(false); setDone(true); }, 2800);
  };
  return (
    <div className={styles.aiPanel} style={{
      background: "rgba(9, 9, 11, 0.95)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(34, 197, 94, 0.25)",
      boxShadow: "0 8px 32px rgba(34, 197, 94, 0.08)"
    }}>
      <div className={styles.aiPanelHeader}>
        <div className={styles.aiIconWrap} style={{
          background: "rgba(34, 197, 94, 0.15)",
          border: "1px solid rgba(34, 197, 94, 0.3)",
          boxShadow: "0 0 20px rgba(34, 197, 94, 0.1)"
        }}><span className={styles.aiIcon}>✦</span></div>
        <div>
          <h3 className={styles.aiTitle}>Assistant IA — Gemini</h3>
          <p className={styles.aiSub}>Analyse CDC · M3</p>
        </div>
        <button className={styles.aiRunBtn} onClick={handleRun} disabled={running}
          style={{
            background: running ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            boxShadow: "0 0 12px rgba(34, 197, 94, 0.05)"
          }}>
          {running ? "Analyse…" : "Analyser CDC"}
        </button>
      </div>
      <div className={styles.aiTerminal}>
        <div className={styles.terminalBar}>
          <span className={`${styles.dot} ${styles.red}`} /><span className={`${styles.dot} ${styles.amber}`} /><span className={`${styles.dot} ${styles.green}`} />
          <span className={styles.terminalTitle}>gemini-1.5-flash · M3 Analysis</span>
        </div>
        <div className={styles.terminalBody}>
          {!running && !done && <p className={`${styles.termLine} ${styles.muted}`}>{"> Prêt. Lancez l'analyse…"}</p>}
          {running && <>
            <p className={`${styles.termLine} ${styles.termGreen}`}>{"> Envoi du CDC à Gemini…"}</p>
            <p className={`${styles.termLine} ${styles.termGreen} ${styles.pulse}`}>{"> Analyse en cours"}<span className={styles.cursor}>█</span></p>
          </>}
          {done && <>
            <p className={`${styles.termLine} ${styles.termGreen}`}>{"> Réponse reçue (1 247ms)"}</p>
            <p className={`${styles.termLine} ${styles.muted}`}>{"{"}</p>
            <p className={`${styles.termLine} ${styles.termCyan}`}>&nbsp;&nbsp;&quot;tasks&quot;: [</p>
            <p className={`${styles.termLine} ${styles.muted}`}>&nbsp;&nbsp;&nbsp;&nbsp;{"{ \"title\": \"Auth JWT\", \"estimated_days\": "}<span className={styles.termNum}>3</span>{" },"}</p>
            <p className={`${styles.termLine} ${styles.muted}`}>&nbsp;&nbsp;&nbsp;&nbsp;{"{ \"title\": \"Kanban Board\", \"estimated_days\": "}<span className={styles.termNum}>4</span>{" }"}</p>
            <p className={`${styles.termLine} ${styles.termCyan}`}>&nbsp;&nbsp;],</p>
            <p className={`${styles.termLine} ${styles.termCyan}`}>&nbsp;&nbsp;&quot;total_days&quot;: <span className={styles.termNum}>14</span>,</p>
            <p className={`${styles.termLine} ${styles.termCyan}`}>&nbsp;&nbsp;&quot;complexity&quot;: <span className={styles.termStr}>&quot;Moyenne&quot;</span></p>
            <p className={`${styles.termLine} ${styles.muted}`}>{"}"}</p>
            <div className={styles.aiActions}>
              <button className={styles.aiConfirm}>✓ Confirmer l&apos;estimation</button>
              <button className={styles.aiReject}>✕ Saisie manuelle</button>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

// ── Kanban Board ──────────────────────────────────────────────────────────────
function KanbanBoard() {
  const [tickets, setTickets] = useState<Ticket[]>(TICKETS);
  const advance = (ref: string) => {
    setTickets(prev => prev.map(t => {
      if (t.refTicket !== ref) return t;
      const next: Record<TicketStatus, TicketStatus> = { ToDo: "InProgress", InProgress: "Done", Done: "Done" };
      return { ...t, statut: next[t.statut] };
    }));
  };
  const cols: { key: TicketStatus; label: string }[] = [
    { key: "ToDo", label: "To Do" }, { key: "InProgress", label: "In Progress" }, { key: "Done", label: "Done" }
  ];
  return (
    <div className={styles.kanbanGrid}>
      {cols.map(col => {
        const colTickets = tickets.filter(t => t.statut === col.key);
        return (
          <div key={col.key} className={styles.kanbanCol} style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(22, 163, 74, 0.1)"
          }}>
            <div className={styles.kanbanColHeader}>
              <span className={styles.kanbanColLabel}>{col.label}</span>
              <span className={styles.kanbanCount} style={{
                background: "rgba(22, 163, 74, 0.15)",
                border: "1px solid rgba(22, 163, 74, 0.2)"
              }}>{colTickets.length}</span>
            </div>
            <div className={styles.kanbanCards}>
              {colTickets.map(t => (
                <div key={t.refTicket} className={`${styles.kanbanCard} hover-lift`} style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(22, 163, 74, 0.12)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                  opacity: col.key === "Done" ? 0.7 : 1
                }}>
                  <div className={styles.kanbanCardTop}>
                    <Badge text={t.type} cls={ticketTypeColors[t.type]} />
                    <Badge text={t.priorite} cls={ticketPrioColors[t.priorite]} />
                  </div>
                  <p className={styles.kanbanTitle}>{t.titre}</p>
                  <div className={styles.kanbanCardFoot}>
                    <div className={styles.avatar}>{t.assignee}</div>
                    <span className={styles.sp}>{t.storyPoints} pts</span>
                    {col.key !== "Done" && (
                      <button className={styles.advanceBtn} onClick={() => advance(t.refTicket)}>Avancer →</button>
                    )}
                  </div>
                </div>
              ))}
              {colTickets.length === 0 && <div className={styles.kanbanEmpty}>Aucun ticket</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "kanban" | "risks" | "costs">("overview");
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  const totalBudgetPrevu = PROJECTS.reduce((s, p) => s + p.budgetPrevu, 0);
  const totalBudgetReel = PROJECTS.reduce((s, p) => s + p.budgetReel, 0);
  const activeProjects = PROJECTS.filter(p => p.statut === "Actif").length;
  const doneTickets = TICKETS.filter(t => t.statut === "Done").length;

  const tabs = [
    { key: "overview", label: "Vue d'ensemble" },
    { key: "kanban", label: "Board Kanban" },
    { key: "risks", label: "Registre Risques" },
    { key: "costs", label: "Suivi Coûts" },
  ] as const;

  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.bgGrid} />
      <div className={`${styles.bgGlow} ${styles.glow1}`} />
      <div className={`${styles.bgGlow} ${styles.glow2}`} />

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} glass`}>
        <div className={styles.sidebarLogo}>
          <span className={`${styles.logoText} gradient-text`}>ProjAI</span>
          <span className={styles.logoDot}>✦</span>
        </div>
        <nav className={styles.sidebarNav}>
          {tabs.map(tab => (
            <button key={tab.key} className={`${styles.navItem} ${activeTab === tab.key ? styles.active : ""}`} onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarProjects}>
          <p className={styles.sidebarSectionLabel}>Projets actifs</p>
          {PROJECTS.filter(p => p.statut === "Actif").map(p => (
            <button key={p.refProjet} className={`${styles.projectPill} ${activeProject.refProjet === p.refProjet ? styles.active : ""}`} onClick={() => setActiveProject(p)}>
              <span className={styles.pillDot} />
              <span className={styles.pillName}>{p.nom}</span>
              <span className={styles.pillPct}>{p.progress}%</span>
            </button>
          ))}
        </div>
        <div className={styles.sidebarUser}>
          <div className={styles.userAvatar}>YA</div>
          <div><p className={styles.userName}>Yassine A.</p><p className={styles.userRole}>Manager</p></div>
        </div>
      </aside>

      {/* MAIN */}
      <main className={styles.mainContent}>
        <header className={styles.dashHeader}>
          <div>
            <h1 className={`${styles.dashTitle} gradient-text`}>Tableau de bord</h1>
            <p className={styles.dashSub}>Sprint S2 en cours · {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnSecondary}>+ Nouveau projet</button>
            <button className={styles.btnPrimary}>✦ Analyser CDC</button>
          </div>
        </header>

        {/* KPIs */}
        <div className={styles.kpiStrip}>
          <StatCard label="Projets actifs" value={activeProjects} sub={`sur ${PROJECTS.length} total`} />
          <StatCard label="Tickets complétés" value={`${doneTickets}/${TICKETS.length}`} sub={`${Math.round(doneTickets / TICKETS.length * 100)}% terminés`} accent="accentGreen" />
          <StatCard label="Budget consommé" value={`${Math.round(totalBudgetReel / 1000)}k€`} sub={`/ ${Math.round(totalBudgetPrevu / 1000)}k€ prévu`} />
          <StatCard label="Risques ouverts" value={RISKS.filter(r => r.statut !== "Clos").length} sub="à surveiller" accent="accentAmber" />
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className={styles.tabContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Projets</h2>
              <div className={styles.projectsList}>
                {PROJECTS.map(p => (
                  <div key={p.refProjet} className={`${styles.projectCard} hover-lift ${activeProject.refProjet === p.refProjet ? styles.selected : ""}`} onClick={() => setActiveProject(p)} style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(12px)",
                    border: activeProject.refProjet === p.refProjet ? "1px solid rgba(22, 163, 74, 0.4)" : "1px solid rgba(22, 163, 74, 0.1)",
                    boxShadow: activeProject.refProjet === p.refProjet ? "0 8px 32px rgba(34, 197, 94, 0.12)" : "0 4px 16px rgba(0, 0, 0, 0.04)"
                  }}>
                    <div className={styles.projectCardTop}>
                      <div>
                        <div className={styles.projectRef}>{p.refProjet}</div>
                        <div className={styles.projectName}>{p.nom}</div>
                        <div className={styles.projectDesc}>{p.description}</div>
                      </div>
                      <Badge text={p.statut} cls={statusColors[p.statut]} />
                    </div>
                    <ProgressBar value={p.progress} />
                    <div className={styles.projectCardFoot}>
                      <span className={styles.footItem}>👥 {p.membres} membres</span>
                      <span className={styles.footItem}>🎫 {p.tickets} tickets</span>
                      <span className={`${styles.footItem} ${p.budgetReel > p.budgetPrevu ? styles.overBudget : ""}`}>💰 {Math.round(p.budgetReel / 1000)}k / {Math.round(p.budgetPrevu / 1000)}k€</span>
                      <span className={styles.footPct}>{p.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className={styles.twoCol}>
              <AIBrainPanel />
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Livrables — {activeProject.nom}</h2>
                <div className={styles.deliverablesList} style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(22, 163, 74, 0.1)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)"
                }}>
                  {DELIVERABLES.map(d => (
                    <div key={d.refLivrable} className={styles.deliverableRow}>
                      <div><p className={styles.delivName}>{d.nom}</p><p className={styles.delivDate}>{d.datePrevue}</p></div>
                      <Badge text={d.statut} cls={delivStatusColors[d.statut]} />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Kanban */}
        {activeTab === "kanban" && (
          <div className={styles.tabContent}>
            <div className={styles.kanbanHeader}>
              <h2 className={styles.sectionTitle}>Board Kanban — {activeProject.nom}</h2>
              <div className={styles.kanbanHeaderActions}>
                <span className={styles.sprintBadge}>Sprint S2</span>
                <button className={`${styles.btnSecondary} ${styles.small}`}>+ Ticket</button>
              </div>
            </div>
            <KanbanBoard />
          </div>
        )}

        {/* Risks */}
        {activeTab === "risks" && (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Registre des Risques</h2>
            <div className={styles.risksTable} style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(22, 163, 74, 0.1)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)"
            }}>
              <div className={styles.tableHeader}><span>Réf.</span><span>Description</span><span>P</span><span>I</span><span>Criticité</span><span>Statut</span></div>
              {RISKS.sort((a, b) => b.criticite - a.criticite).map(r => (
                <div key={r.refRisque} className={styles.tableRow}>
                  <span className={styles.mono}>{r.refRisque}</span>
                  <span className={styles.riskDesc}>{r.description}</span>
                  <span className={styles.center}>{r.probabilite}</span>
                  <span className={styles.center}>{r.impact}</span>
                  <span className={styles.center}><Badge text={String(r.criticite)} cls={criticitéLabel(r.criticite)} /></span>
                  <span><Badge text={r.statut} cls={riskStatusColors[r.statut]} /></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Costs */}
        {activeTab === "costs" && (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Suivi des Coûts</h2>
            <div className={styles.costsGrid}>
              {PROJECTS.map(p => {
                const ecart = p.budgetPrevu - p.budgetReel;
                const pct = Math.round((p.budgetReel / p.budgetPrevu) * 100);
                return (
                  <div key={p.refProjet} className={styles.costCard} style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(22, 163, 74, 0.1)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)"
                  }}>
                    <div className={styles.costCardHeader}><span className={styles.costName}>{p.nom}</span><Badge text={p.statut} cls={statusColors[p.statut]} /></div>
                    <div className={styles.costRow}><span className={styles.costLabel}>Prévu</span><span className={styles.costVal}>{p.budgetPrevu.toLocaleString("fr-FR")} €</span></div>
                    <div className={styles.costRow}><span className={styles.costLabel}>Réel</span><span className={styles.costVal}>{p.budgetReel.toLocaleString("fr-FR")} €</span></div>
                    <ProgressBar value={Math.min(pct, 100)} />
                    <div className={styles.costEcart}><span className={styles.costLabel}>Écart</span><span className={ecart < 0 ? styles.negative : styles.positive}>{ecart > 0 ? "+" : ""}{ecart.toLocaleString("fr-FR")} €</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
