import styles from "./page.module.css";
import FilterBar from "@/components/Filter/FilterBar";

export default function Home() {
  return (
    <main className={styles.main}>
      <FilterBar />
    </main>
  );
}
