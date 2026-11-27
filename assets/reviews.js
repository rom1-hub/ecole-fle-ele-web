
(() => {
  const reviews = [
    {text:"Llevo 2 años con Romain Bouisson como profesor de francés. Gran profesional. Mi balance es muy positivo. Estoy contenta porque es muy respetuoso y se comunica siempre de forma clara y concisa. Además fomenta la participación y valora el esfuerzo del alumno dentro de las circunstancias de cada uno.",name:"Encar Q.",source:"Google"},
    {text:"Romain es un profesor excepcional. Metódico, responsable, y realmente eficiente. Ha dado clases a mi hijo y ha aprobado su examen con nota. Por supuesto, ahora está dando clases a mi hija y está muy contenta. Sin duda, muy recomendable.",name:"Ana M.",source:"Google"},
    {text:"¡100% RECOMENDABLE! Da gusto aprender un idioma con un profesional como Romain. Las clases son muy amenas y él siempre se asegura de que lo hayas entendido. Lo recomendaría a todo el mundo. ¡¡Muchísimas gracias Romain!!",name:"NA",source:"Google"},
    {text:"Llevo años ya con Romain y como profesor es un 10. Aprendes a la vez que disfrutas del idioma, trabajando tanto la gramática y vocabulario como conversación. He tenido varios profesores de francés y nunca nadie me ha explicado el francés para que pudiera entenderlo y mejorar mi nivel como Romain.",name:"Gabri",source:"Google"},
    {text:"Romain es un profesor excepcional. Es paciente, metódico y explica muy bien tanto lo fácil como lo difícil.",name:"Alumno/a",source:"Google"},
    {text:"Las clases de Romain son increíbles, 100% recomendadas.",name:"Alumno/a",source:"Google"},
    {text:"He aprendido mucho de gramática, de vocabulario y sobre todo de conversación. Da muy buenos consejos y tiene mucha paciencia.",name:"Alumno/a",source:"Infoidiomas"}
  ];
  document.querySelectorAll("[data-reviews-widget]").forEach(widget => {
    const track = widget.querySelector("[data-reviews-track]");
    const prev = widget.querySelector(".reviews-prev");
    const next = widget.querySelector(".reviews-next");
    const counter = widget.querySelector("[data-reviews-counter]");
    const dots = widget.querySelector("[data-reviews-dots]");
    if (!track || !prev || !next || !counter || !dots) return;
    reviews.forEach(review => {
      const card = document.createElement("article");
      card.className = "review-card";
      card.setAttribute("role","group");
      card.setAttribute("aria-label","Opinión de " + review.name + " en " + review.source);
      const stars = document.createElement("div");
      stars.className = "review-card-stars";
      stars.setAttribute("aria-label","5 de 5 estrellas");
      stars.textContent = "★★★★★";
      const quote = document.createElement("blockquote");
      quote.textContent = "«" + review.text + "»";
      const cite = document.createElement("cite");
      cite.textContent = review.name;
      const source = document.createElement("span");
      source.className = "review-card-source";
      source.textContent = "Opinión publicada en " + review.source;
      cite.appendChild(source);
      card.append(stars,quote,cite);
      track.appendChild(card);
    });
    let index = 0;
    let perView = 3;
    const getPerView = () => window.matchMedia("(max-width:600px)").matches ? 1 : window.matchMedia("(max-width:850px)").matches ? 2 : 3;
    const maxIndex = () => Math.max(0,reviews.length-perView);
    const render = () => {
      perView = getPerView();
      index = Math.min(index,maxIndex());
      const card = track.querySelector(".review-card");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      track.style.transform = "translateX(-" + (index*step) + "px)";
      prev.disabled = index === 0;
      next.disabled = index >= maxIndex();
      counter.textContent = (index+1) + "–" + Math.min(index+perView,reviews.length) + " de " + reviews.length + " testimonios disponibles";
      dots.replaceChildren();
      for(let i=0;i<=maxIndex();i++){
        const dot=document.createElement("button");
        dot.type="button";dot.className="reviews-dot";
        dot.setAttribute("aria-label","Mostrar opiniones desde la posición "+(i+1));
        dot.setAttribute("aria-current",i===index?"true":"false");
        dot.addEventListener("click",()=>{index=i;render()});
        dots.appendChild(dot);
      }
    };
    prev.addEventListener("click",()=>{index=Math.max(0,index-1);render()});
    next.addEventListener("click",()=>{index=Math.min(maxIndex(),index+1);render()});
    let resizeTimer;
    window.addEventListener("resize",()=>{window.clearTimeout(resizeTimer);resizeTimer=window.setTimeout(render,100)});
    render();
  });
})();
