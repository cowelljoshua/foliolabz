import { useEffect, useRef } from "react";
import { supabase } from "../lib/supabase.js";
import { mountWedding } from "../wedding/planner.js";
import styles from "../wedding/style.css?inline";

// The planner shares FolioLabz auth, but its notebook theme is scoped to this root.
export default function Wedding() {
  const host = useRef(null);
  useEffect(() => {
    const root =
      host.current.shadowRoot || host.current.attachShadow({ mode: "open" });
    root.innerHTML =
      '<div id="app"></div><div id="notice" role="status" aria-live="polite"></div><dialog id="dialog" aria-labelledby="dialog-title"></dialog>';
    const style = document.createElement("style");
    style.textContent = styles;
    root.prepend(style);
    // Enable after restoring FolioLabz Supabase and applying wedding_plans.sql.
    const cleanup = mountWedding(
      root,
      import.meta.env.VITE_WEDDING_BACKEND_READY === "true" ? supabase : null,
    );
    return cleanup;
  }, []);
  return <div ref={host} style={{ display: "block", minHeight: "100vh" }} />;
}
