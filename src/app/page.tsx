import styles from "./page.module.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LeadForm } from "@/components/LeadForm";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { SITE } from "@/content/site";

export default function Home() {
  return (
    <div className={styles.page}>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Header />

      <main id="main">
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div>
                <div className={styles.eyebrow}>
                  <strong>Industrial thermal battery</strong>
                  <span>for 24/7 process heat and steam</span>
                </div>
                <h1 className={styles.heroTitle}>{SITE.tagline}</h1>
                <p className={styles.heroLead}>
                  Ebrix stores excess renewable electricity as high-temperature heat and
                  delivers it back as reliable industrial heat or steam when your
                  process needs it.
                </p>

                <div className={styles.badges} aria-label="Headline claims">
                  <div className={styles.badge}>
                    <span>up to 2400C</span> storage temperature
                  </div>
                  <div className={styles.badge}>
                    <span>up to 98%</span> claimed efficiency (prototype target)
                  </div>
                  <div className={styles.badge}>
                    <span>recycled</span> materials-first
                  </div>
                  <div className={styles.badge}>
                    <span>industry</span> not single-family houses
                  </div>
                </div>

                <div className={styles.actions}>
                  <a className={styles.primaryBtn} href="#contact">
                    Request a pilot <span aria-hidden="true">→</span>
                  </a>
                  <a className={styles.secondaryBtn} href={`mailto:${SITE.contactEmail}`}>
                    Talk to the team
                  </a>
                </div>
                <p className={styles.note}>
                  We keep this site non-confidential by design. If you need deeper
                  technical detail, ask for a private call.
                </p>
              </div>

              <HeroVisual />
            </div>
          </div>
        </section>

        <section id="problem" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>The problem</h2>
              <p className={styles.sectionKicker}>Energy waste meets heat demand</p>
            </div>

            <div className={styles.grid2}>
              <div className={styles.card}>
                <h3>Grid overflow and curtailment</h3>
                <p>
                  Cheap renewable electricity is often available when industry cannot
                  use it directly. The result is curtailment and missed CO2 savings.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Process heat runs 24/7</h3>
                <p>
                  Industrial heat and steam are hard to decarbonize. Many plants need
                  high temperatures and high uptime.
                </p>
              </div>
            </div>

            <div className={styles.card} style={{ marginTop: 16 }}>
              <h3>Construction waste is underused</h3>
              <p>
                Valuable mineral materials are frequently downcycled. Ebrix explores a
                path to reuse them in high-temperature thermal storage.
              </p>
            </div>
          </div>
        </section>

        <section id="solution" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>The Ebrix approach</h2>
              <p className={styles.sectionKicker}>Charge, store, deliver</p>
            </div>

            <div className={styles.grid2}>
              <div className={styles.card}>
                <h3>Charge</h3>
                <p>
                  Convert excess renewable electricity into heat when the grid is
                  stressed and prices are low.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Store</h3>
                <p>
                  Store heat in a high-temperature medium (up to 2400C) using
                  materials that are safe to operate and scalable.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Deliver</h3>
                <p>
                  Deliver heat on demand as process heat or steam for industrial
                  users, smoothing renewable variability.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Qualify claims</h3>
                <p>
                  We label headline values as claimed or prototype targets. Ebrix does
                  not present them as certified performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>How it works (high level)</h2>
              <p className={styles.sectionKicker}>Non-confidential overview</p>
            </div>

            <div className={styles.card}>
              <p>
                Ebrix is designed around a simple loop: electricity-in, heat stored at
                high temperature, and heat/steam-out. The internal implementation is
                intentionally not disclosed publicly.
              </p>
              <ul className={styles.list}>
                <li>
                  <span className={styles.bullet} aria-hidden="true" />
                  <span>
                    <strong>Energy-in:</strong> charge using excess renewable
                    electricity.
                  </span>
                </li>
                <li>
                  <span className={styles.bullet} aria-hidden="true" />
                  <span>
                    <strong>Storage:</strong> heat a high-temperature medium (up to{" "}
                    <span style={{ fontFamily: "var(--font-mono)" }}>2400C</span>).
                  </span>
                </li>
                <li>
                  <span className={styles.bullet} aria-hidden="true" />
                  <span>
                    <strong>Energy-out:</strong> deliver heat or steam back to
                    industrial users.
                  </span>
                </li>
              </ul>
              <p className={styles.note}>
                Efficiency is shown as a claimed/prototype target (up to 98%). Exact
                performance depends on integration, operating profile, and heat
                delivery conditions.
              </p>
            </div>
          </div>
        </section>

        <section id="industries" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Who it is for</h2>
              <p className={styles.sectionKicker}>Industry-first, 24/7 heat users</p>
            </div>

            <div className={styles.grid2}>
              <div className={styles.card}>
                <h3>Target sectors</h3>
                <ul className={styles.list}>
                  <li>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>Energy companies and utilities</span>
                  </li>
                  <li>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>Paper mills (pulp &amp; paper)</span>
                  </li>
                  <li>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>Glassworks</span>
                  </li>
                  <li>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>District heating operators</span>
                  </li>
                  <li>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>Steelworks and metals processing</span>
                  </li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3>Not the target</h3>
                <p>
                  Ebrix is built for industrial sites and networks that require heat
                  and steam 24/7. It is{" "}
                  <strong>not designed for single-family houses</strong> in this MVP.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="ai" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>AI, forecasting, and control</h2>
              <p className={styles.sectionKicker}>Operate when electricity is cheap</p>
            </div>

            <div className={styles.card}>
              <p>
                Ebrix can pair thermal storage with forecasting: identify cheap
                electricity windows, plan charge/discharge schedules, and adapt to
                plant constraints. The goal is simple: maximize CO2 savings while
                maintaining reliable heat delivery.
              </p>
            </div>
          </div>
        </section>

        <section id="team" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Team</h2>
              <p className={styles.sectionKicker}>Engineering-forward, pilot-ready</p>
            </div>

            <div className={styles.grid2}>
              <div className={styles.card}>
                <h3>What we do next</h3>
                <p>
                  We validate pilot fit, define integration requirements, and plan a
                  measured rollout with clear success metrics.
                </p>
              </div>
              <div className={styles.card}>
                <h3>What you get</h3>
                <p>
                  A structured discovery call, a feasibility assessment, and a pilot
                  plan that respects site safety and operational realities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Contact</h2>
              <p className={styles.sectionKicker}>Pilot requests and partnerships</p>
            </div>

            <div className={styles.grid2}>
              <LeadForm />
              <div className={styles.card}>
                <h3>What happens next</h3>
                <ul className={styles.list}>
                  <li>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>
                      We reply within 2 business days to confirm the right contact.
                    </span>
                  </li>
                  <li>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>
                      We schedule a short call to understand heat/steam needs and site
                      constraints.
                    </span>
                  </li>
                  <li>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>
                      We assess feasibility and propose a pilot path (scope, timeline,
                      success criteria).
                    </span>
                  </li>
                </ul>
                <p className={styles.note}>
                  Prefer email? Write to{" "}
                  <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
