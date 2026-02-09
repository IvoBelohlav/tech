import styles from "./Footer.module.css";
import { SITE } from "@/content/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.title}>{SITE.name}</p>
          <p className={styles.muted}>
            Industrial thermal battery concept for process heat and steam.
          </p>
          <p className={styles.muted}>
            Contact:{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
          </p>
        </div>

        <div className={styles.links} aria-label="Footer links">
          <Link className={styles.link} href="/#contact">
            Request a pilot
          </Link>
          <Link className={styles.link} href="/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
