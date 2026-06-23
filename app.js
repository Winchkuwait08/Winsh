
// Header shadow on scroll
const hdr=document.getElementById('hdr');
if(hdr){addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>10),{passive:true});}

// Mobile menu
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
if(burger&&menu){
  burger.addEventListener('click',()=>menu.classList.toggle('show'));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('show')));
}

// FAQ accordion
document.querySelectorAll('.qa button').forEach(b=>{
  b.addEventListener('click',()=>{
    const qa=b.parentElement,ans=qa.querySelector('.ans'),open=qa.classList.contains('open');
    document.querySelectorAll('.qa').forEach(x=>{x.classList.remove('open');x.querySelector('.ans').style.maxHeight=null});
    if(!open){qa.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px'}
  });
});

// Reveal on scroll
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Close floating panel when touching/clicking outside
document.addEventListener('click',(e)=>{
  const panel=document.getElementById('floatPanel'),openBtn=document.getElementById('floatOpen');
  if(!panel||!openBtn)return;
  // اگر پنل باز است و کلیک بیرون از پنل و بیرون از دکمه باز کردن بود
  if(!panel.classList.contains('hidden')&&!panel.contains(e.target)&&!openBtn.contains(e.target)){
    panel.classList.add('hidden');
    openBtn.classList.add('show');
  }
},true);
