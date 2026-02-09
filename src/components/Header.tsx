import styles from "./Header.module.css";
import { NAV_ITEMS, SITE } from "@/content/site";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href="/" aria-label={`${SITE.name} home`}>
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.name}>{SITE.name}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} className={styles.navLink} href={`/#${item.id}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className={styles.cta} href="/#contact">
          Request a pilot
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
