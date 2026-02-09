import type { Metadata } from "next";
import styles from "./page.module.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const effectiveDate = "2026-02-09";
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className={styles.page}>
        <div className="container">
          <header className={styles.header}>
            <h1 className={styles.title}>Privacy policy</h1>
            <p className={styles.lead}>
              This page explains what data we collect through the Ebrix website and
              how it is used.
            </p>
          </header>

          <div className={styles.card}>
            <h2>What we collect</h2>
            <p>
              When you submit the contact / pilot request form, we collect the
              information you provide (typically: name, company, email, and optional
              details like phone, location, industry, and message).
            </p>

            <h2 style={{ marginTop: 16 }}>Why we collect it</h2>
            <p>
              We use this information to respond to your request, assess pilot fit,
              and coordinate next steps. We do not sell your data and we do not
              require it for general browsing.
            </p>

            <h2 style={{ marginTop: 16 }}>Retention</h2>
            <p>
              We retain form submissions for as long as needed to handle the
              conversation and any resulting partnership discussions, and then delete
              them when they are no longer necessary.
            </p>

            <h2 style={{ marginTop: 16 }}>Analytics</h2>
            <p>
              Analytics are optional and can be disabled. If enabled, we aim to use
              privacy-friendly, cookie-less analytics and to minimize identifiers.
            </p>

            <h2 style={{ marginTop: 16 }}>Your rights</h2>
            <ul className={styles.list}>
              <li>Request access to the data you submitted.</li>
              <li>Request correction of incorrect information.</li>
              <li>Request deletion of your submission.</li>
            </ul>

            <p style={{ marginTop: 12 }}>
              For privacy requests, contact{" "}
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
            </p>

            <div className={styles.meta}>
              Effective date: {effectiveDate}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
