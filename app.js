
// Header shadow on scroll
const hdr=document.getElementById('hdr');
if(hdr){addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>10),{passive:true});}

// Mobile menu
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
if(burger&&menu){
  burger.addEventListener('click',()=>menu.classList.toggle('show'));
  document.addEventListener('click',(e)=>{if(menu.classList.contains('show')&&!menu.contains(e.target)&&!burger.contains(e.target)){menu.classList.remove('show')}});
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


// Interactive battery poll
function vote(btn,option){
  document.querySelectorAll('.poll-options button').forEach(b=>b.classList.remove('picked'));
  if(btn)btn.classList.add('picked');
  const msgs={
    'A':'الصديق قد يتأخر أو ما يعرف يشغّل البطارية صح.',
    'B':'الكيبل يحتاج سيارة ثانية وخبرة، وأحياناً يضر البطارية.',
    'C':'الخيار الأذكى! نوصلك بسرعة ونشغّل سيارتك بأمان.',
    'D':'لا تحتار! نحن جاهزون على مدار 24 ساعة.'
  };
  const r=document.getElementById('pollResult');
  if(r)r.innerHTML='✅ شكراً لمشاركتك! اخترت: '+option+'<br>'+(msgs[option]||'')+'<br>تحتاج مساعدة فورية؟ اتصل بنا الآن على 60601740.';
}

// Share location via WhatsApp
function shareLocation(){
  const btn=document.getElementById('locBtn');
  if(!navigator.geolocation){
    window.open('https://wa.me/96560601740?text='+encodeURIComponent('مرحباً، أحتاج ونش وموقعي هو: (لم يتمكن المتصفح من تحديد الموقع تلقائياً)'),'_blank');
    return;
  }
  if(btn){btn.classList.add('loading');}
  navigator.geolocation.getCurrentPosition(
    (pos)=>{
      const lat=pos.coords.latitude.toFixed(6), lng=pos.coords.longitude.toFixed(6);
      const maps='https://maps.google.com/?q='+lat+','+lng;
      const msg='مرحباً، أحتاج خدمة ونش 🚗\nموقعي الحالي:\n'+maps;
      window.open('https://wa.me/96560601740?text='+encodeURIComponent(msg),'_blank');
      if(btn){btn.classList.remove('loading');}
    },
    (err)=>{
      if(btn){btn.classList.remove('loading');}
      alert('لتفعيل الموقع، يرجى السماح بالوصول للموقع في المتصفح. سيتم فتح واتساب لإرسال موقعك يدوياً.');
      window.open('https://wa.me/96560601740?text='+encodeURIComponent('مرحباً، أحتاج ونش. موقعي هو:'),'_blank');
    },
    {enableHighAccuracy:true,timeout:10000,maximumAge:0}
  );
}

// Close floating panel when touching/clicking outside
document.addEventListener('click',(e)=>{
  const panel=document.getElementById('floatPanel'),openBtn=document.getElementById('floatOpen');
  if(!panel||!openBtn)return;
  if(!panel.classList.contains('hidden')&&!panel.contains(e.target)&&!openBtn.contains(e.target)){
    panel.classList.add('hidden');
    openBtn.classList.add('show');
  }
},true);
