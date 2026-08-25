const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.menu');
if(toggle&&menu){
  toggle.addEventListener('click',()=>{
    const open=menu.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });
}
