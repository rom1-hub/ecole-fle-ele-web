/* Carga el catálogo canónico dividido en fragmentos para mantener cada blob Git por debajo del límite de transferencia. */
(async () => {
  "use strict";
  const count = 13;
  const paths = Array.from({ length: count }, (_, index) =>
    "data/verbs/catalog/part-" + String(index).padStart(2, "0") + ".js"
  );
  try {
    const responses = await Promise.all(paths.map(async path => {
      const response = await fetch(path, { cache: "force-cache" });
      if (!response.ok) throw new Error("No se pudo cargar " + path);
      return response.text();
    }));
    const script = document.createElement("script");
    script.textContent = responses.join("");
    document.head.appendChild(script);
    const followUpScripts = [
      "data/verbs/impersonal-database.js",
      "data/verbs/pronominal-database.js",
      "data/verbs/translations-es.js",
      "js/conjugation-lookup.js",
      "js/french-orthography.js",
      "js/conjugation.js"
    ];
    for (const path of followUpScripts) {
      await new Promise((resolve, reject) => {
        const element = document.createElement("script");
        element.src = path;
        element.onload = resolve;
        element.onerror = () => reject(new Error("No se pudo cargar " + path));
        document.head.appendChild(element);
      });
    }
  } catch (error) {
    console.error("COQ: error al cargar el catálogo de verbos.", error);
    const target = document.getElementById("lookup-results");
    if (target) target.textContent = "No se pudo cargar el catálogo de verbos. Recarga la página o inténtalo más tarde.";
  }
})();
