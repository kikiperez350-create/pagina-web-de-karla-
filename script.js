(function(){
  /* Precios de ejemplo en RD$. Cámbialos por los reales. */
  var D = {
    sets:[
      {id:1,name:'Set Hidratación Total',price:2450,tag:'Nuevo',bg:'#F5BDD3',c:'#B8165A',k:'box'},
      {id:2,name:'Set Brillo y Control del Frizz',price:2890,bg:'#FFE3D0',c:'#D97706',k:'box'},
      {id:3,name:'Set Reparación Profunda',price:3250,bg:'#E4F0D2',c:'#5C7A1F',k:'box'},
      {id:4,name:'Set Viaje, 5 minis',price:1490,bg:'#DCE8F7',c:'#2F6DB0',k:'box'},
      {id:5,name:'Set Rizos Definidos',price:2990,tag:'Nuevo',bg:'#EAD9F5',c:'#7B2FA3',k:'box'},
      {id:6,name:'Set Raíz Fuerte',price:3490,bg:'#F3E2C8',c:'#7A4A1B',k:'box'}
    ],
    bundles:[
      {id:7,name:'Rutina Hidratante Completa',old:2230,price:2007,off:10,bg:'#CFE8D8',c:'#2E8B6A',k:'bottle'},
      {id:8,name:'Trío Anti-frizz',old:2060,price:1854,off:10,bg:'#FFE3D0',c:'#D97706',k:'bottle'},
      {id:9,name:'Dúo Reparación',old:1580,price:1343,off:15,bg:'#E4F0D2',c:'#5C7A1F',k:'bottle'},
      {id:10,name:'Rutina Rizos Completa',old:3100,price:2728,off:12,bg:'#EAD9F5',c:'#7B2FA3',k:'bottle'},
      {id:11,name:'Kit Raíz Fuerte',old:1950,price:1755,off:10,bg:'#F3E2C8',c:'#7A4A1B',k:'bottle'},
      {id:12,name:'Rutina Protección Térmica',old:1840,price:1693,off:8,bg:'#DCE8F7',c:'#2F6DB0',k:'bottle'}
    ],
    nuevo:[
      {id:13,name:'Shampoo Hidratante Aloe y Coco',price:650,tag:'Nuevo',bg:'#CFE8D8',c:'#2E8B6A',k:'bottle'},
      {id:14,name:'Acondicionador Reparador Karité',price:690,bg:'#FFE3D0',c:'#D97706',k:'bottle'},
      {id:15,name:'Mascarilla de Aguacate',price:890,tag:'Nuevo',bg:'#E4F0D2',c:'#5C7A1F',k:'jar'},
      {id:16,name:'Aceite de Ricino y Romero',price:520,bg:'#F3E2C8',c:'#4A2E1B',k:'bottle'},
      {id:17,name:'Sérum Anti-frizz de Argán',price:780,tag:'Nuevo',bg:'#FBEFB8',c:'#C79A13',k:'bottle'},
      {id:18,name:'Protector Térmico en Spray',price:590,bg:'#DCE8F7',c:'#2F6DB0',k:'bottle'}
    ]
  };
  var ALL = [].concat(D.sets,D.bundles,D.nuevo), cart = {};
  try{ var s=localStorage.getItem('rv-cart2'); if(s) cart=JSON.parse(s)||{}; }catch(e){}

  function $(id){return document.getElementById(id)}
  function money(n){return 'RD$ '+n.toLocaleString('es-DO')}
  function byId(id){return ALL.filter(function(p){return p.id===+id})[0]}
  function art(p){
    var M={
      aloe:'<path d="M0 18 C-4 0 -3 -14 0 -22 C3 -14 4 0 0 18Z" fill="#2E8B6A"/><path d="M-2 18 C-14 6 -18 -6 -16 -16 C-8 -8 -2 4 -2 18Z" fill="#3FA77F"/><path d="M2 18 C14 6 18 -6 16 -16 C8 -8 2 4 2 18Z" fill="#3FA77F"/>',
      coconut:'<circle r="17" fill="#5A3A22"/><circle r="12" fill="#FFF4F8"/><circle cx="-3" cy="-3" r="3" fill="#E8D9CC"/>',
      avocado:'<path d="M0 -22 C10 -22 18 -4 18 6 C18 16 10 22 0 22 C-10 22 -18 16 -18 6 C-18 -4 -10 -22 0 -22Z" fill="#3E6B1F"/><path d="M0 -17 C7 -17 13 -3 13 6 C13 13 7 17 0 17 C-7 17 -13 13 -13 6 C-13 -3 -7 -17 0 -17Z" fill="#CFE08A"/><circle cx="0" cy="7" r="7" fill="#7A4A1B"/>',
      sprig:'<path d="M0 22 L0 -22" stroke="#3E6B1F" stroke-width="2"/><ellipse cx="7" cy="-14" rx="8" ry="2.5" transform="rotate(-30 7 -14)" fill="#4F8A3A"/><ellipse cx="-7" cy="-14" rx="8" ry="2.5" transform="rotate(30 -7 -14)" fill="#4F8A3A"/><ellipse cx="7" cy="-3" rx="8" ry="2.5" transform="rotate(-30 7 -3)" fill="#4F8A3A"/><ellipse cx="-7" cy="-3" rx="8" ry="2.5" transform="rotate(30 -7 -3)" fill="#4F8A3A"/><ellipse cx="7" cy="8" rx="8" ry="2.5" transform="rotate(-30 7 8)" fill="#4F8A3A"/><ellipse cx="-7" cy="8" rx="8" ry="2.5" transform="rotate(30 -7 8)" fill="#4F8A3A"/>',
      drop:'<path d="M0 -20 C10 -6 14 0 14 7 C14 15 8 20 0 20 C-8 20 -14 15 -14 7 C-14 0 -10 -6 0 -20Z" fill="#3B9AD9"/><path d="M-5 6 C-5 11 -2 14 2 14" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>',
      sparkle:'<path d="M0 -22 C2 -6 6 -2 22 0 C6 2 2 6 0 22 C-2 6 -6 2 -22 0 C-6 -2 -2 -6 0 -22Z" fill="#F2B705"/>',
      flower:'<circle cx="0" cy="-11" r="8" fill="#F28DB2"/><circle cx="10.5" cy="-3.4" r="8" fill="#F28DB2"/><circle cx="6.5" cy="8.9" r="8" fill="#F28DB2"/><circle cx="-6.5" cy="8.9" r="8" fill="#F28DB2"/><circle cx="-10.5" cy="-3.4" r="8" fill="#F28DB2"/><circle r="5" fill="#F2B705"/>',
      nut:'<ellipse rx="14" ry="18" fill="#7A4A1B"/><ellipse cx="-4" cy="-6" rx="4" ry="7" fill="#A8703A" opacity=".8"/><path d="M0 -18 L0 -24" stroke="#3E6B1F" stroke-width="3"/>',
      shield:'<path d="M0 -22 L18 -15 V2 C18 13 9 20 0 24 C-9 20 -18 13 -18 2 V-15Z" fill="#2F6DB0"/><path d="M0 -10 C6 -2 6 4 0 12 C-6 4 -6 -2 0 -10Z" fill="#FFB347"/>',
      curl:'<path d="M-14 16 C-14 -14 14 -14 14 2 C14 12 2 12 2 4 C2 -2 8 -2 8 2" stroke="#7B2FA3" stroke-width="4" fill="none" stroke-linecap="round"/>',
      sprout:'<path d="M0 22 V0" stroke="#3E6B1F" stroke-width="3"/><path d="M0 4 C-18 6 -20 -8 -16 -16 C-6 -14 0 -8 0 4Z" fill="#5FAE3E"/><path d="M0 -2 C16 0 20 -14 16 -22 C6 -20 0 -14 0 -2Z" fill="#7BC95A"/>'
    };
    var MOT={1:['drop','aloe'],2:['sparkle','flower'],3:['sprout','nut'],4:['drop','sparkle'],5:['curl','coconut'],6:['sprout','sprig'],
      7:['drop','aloe','coconut'],8:['sparkle','flower'],9:['nut','avocado'],10:['curl','coconut'],11:['sprig','sprout'],12:['shield','sparkle'],
      13:['aloe','coconut'],14:['nut','drop'],15:['avocado'],16:['sprig','drop'],17:['flower','drop'],18:['shield','sparkle']};
    var KIND={7:'trio',8:'trio',9:'duo',10:'trio',11:'trio',12:'trio'};
    function mo(k,x,y,s,r,o){return '<g transform="translate('+x+' '+y+') rotate('+(r||0)+') scale('+s+')"'+(o?' opacity="'+o+'"':'')+'>'+M[k]+'</g>';}
    function bt(c,m,x,y,s){return '<g transform="translate('+x+' '+y+') scale('+s+')"><rect x="28" y="4" width="24" height="16" rx="4" fill="#3B1024"/><rect x="34" y="20" width="12" height="8" fill="#3B1024"/><rect x="12" y="28" width="56" height="106" rx="16" fill="'+c+'"/><rect x="20" y="58" width="40" height="56" rx="7" fill="#FFF4F8" opacity=".95"/>'+mo(m,40,86,.75)+'</g>';}
    var ms=MOT[p.id]||['drop'], kind=KIND[p.id]||p.k, bg='', body='';
    [[34,46,-18],[168,52,14],[160,162,-10],[40,160,20]].forEach(function(q,i){bg+=mo(ms[i%ms.length],q[0],q[1],2,q[2],.3);});
    if(kind==='box') body='<g transform="translate(28 38) scale(1.2)"><rect x="8" y="34" width="104" height="70" rx="8" fill="'+p.c+'"/><rect x="8" y="34" width="104" height="18" rx="6" fill="#3B1024" opacity=".2"/><rect x="54" y="34" width="12" height="70" fill="#FFF4F8"/><path d="M60 34 C38 4 14 24 60 34 C106 24 82 4 60 34Z" fill="#FFF4F8"/><circle cx="60" cy="80" r="17" fill="#FFF4F8" opacity=".95"/>'+mo(ms[0],60,80,.7)+'</g>';
    else if(kind==='jar') body='<g transform="translate(34 48) scale(1.1)"><rect x="14" y="8" width="92" height="26" rx="8" fill="#3B1024"/><rect x="10" y="30" width="100" height="62" rx="14" fill="'+p.c+'"/><rect x="26" y="46" width="68" height="32" rx="6" fill="#FFF4F8" opacity=".95"/>'+mo(ms[0],60,62,.55)+'</g>';
    else if(kind==='trio') body=bt(p.c,ms[1]||ms[0],10,70,.7)+bt(p.c,ms[1]||ms[0],134,70,.7)+bt(p.c,ms[0],60,30,1);
    else if(kind==='duo') body=bt(p.c,ms[0],18,36,.95)+bt(p.c,ms[1]||ms[0],106,36,.95);
    else body=bt(p.c,ms[0],60,30,1);
    return '<svg viewBox="0 0 200 200" aria-hidden="true">'+bg+body+'</svg>';
  }
  function save(){ try{localStorage.setItem('rv-cart2',JSON.stringify(cart))}catch(e){} }
  function toast(m){ var t=$('toast'); t.textContent=m; t.classList.add('show'); clearTimeout(toast.h); toast.h=setTimeout(function(){t.classList.remove('show')},1800); }

  function card(p){
    var tag = p.off ? '<span class="tag off">Oferta -'+p.off+'%</span>' : (p.tag ? '<span class="tag">'+p.tag+'</span>' : '');
    return '<article class="card"><div class="pic" style="background:'+p.bg+'">'+tag+art(p)+'</div><div class="body"><span class="brand">Raíz Viva</span><h3>'+p.name+'</h3><div class="prices"><span class="price">'+money(p.price)+'</span>'+(p.old?'<span class="old">'+money(p.old)+'</span>':'')+'</div><button class="add" data-add="'+p.id+'" aria-label="Agregar '+p.name+' al carrito">Agregar</button></div></article>';
  }
  Object.keys(D).forEach(function(k){ $('track-'+k).innerHTML = D[k].map(card).join(''); });

  function renderCart(){
    var ids=Object.keys(cart).filter(function(k){return cart[k]>0}), total=0, count=0;
    $('items').innerHTML = ids.length ? ids.map(function(k){
      var p=byId(k), q=cart[k]; total+=p.price*q; count+=q;
      return '<div class="crow"><div class="sw" style="background:'+p.bg+'">'+art(p)+'</div><div><b>'+p.name+'</b><small>'+money(p.price)+'</small><div class="qty"><button data-dec="'+k+'" aria-label="Quitar uno">−</button><span>'+q+'</span><button data-inc="'+k+'" aria-label="Agregar uno">+</button></div></div><b>'+money(p.price*q)+'</b></div>';
    }).join('') : '<p class="empty">Tu carrito está vacío. Agrega un producto para empezar.</p>';
    $('total').textContent=money(total); $('count').textContent=count;
    $('checkout').disabled=!ids.length; $('checkout').style.opacity=ids.length?1:.5;
    var free=3000-total;
    $('note').textContent = ids.length ? (free>0 ? 'Te faltan '+money(free)+' para envío gratis.' : 'Tu pedido tiene envío gratis.') : '';
    save();
  }
  function openCart(o){
    $('drawer').classList.toggle('open',o); $('scrim').classList.toggle('open',o); $('drawer').setAttribute('aria-hidden',!o);
    (o?$('closeCart'):$('openCart')).focus();
  }

  document.addEventListener('click',function(e){
    var t=e.target.closest('button'); if(!t) return;
    if(t.dataset.add){ cart[t.dataset.add]=(cart[t.dataset.add]||0)+1; renderCart(); toast(byId(t.dataset.add).name+' agregado al carrito'); }
    else if(t.dataset.inc){ cart[t.dataset.inc]++; renderCart(); }
    else if(t.dataset.dec){ cart[t.dataset.dec]=Math.max(0,cart[t.dataset.dec]-1); renderCart(); }
    else if(t.dataset.next||t.dataset.prev){
      var tr=$('track-'+(t.dataset.next||t.dataset.prev)), step=tr.firstElementChild.getBoundingClientRect().width+20;
      tr.scrollBy({left:(t.dataset.next?1:-1)*step*2, behavior:'smooth'});
    }
  });
  $('openCart').onclick=function(){openCart(true)};
  $('closeCart').onclick=function(){openCart(false)};
  $('scrim').onclick=function(){openCart(false)};
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') openCart(false); });
  $('checkout').onclick=function(){
    if(!Object.keys(cart).some(function(k){return cart[k]>0})) return;
    cart={}; renderCart(); openCart(false); toast('¡Pedido recibido! Te contactaremos para confirmar.');
  };
  $('newsForm').addEventListener('submit',function(e){
    e.preventDefault(); var v=$('email').value.trim(), m=$('newsMsg');
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){ m.textContent='¡Listo! Revisa tu correo para tu código del 10%.'; $('email').value=''; }
    else m.textContent='Escribe un correo válido, por ejemplo nombre@correo.com.';
  });

  var msgs=['Realizamos envíos nacionales','Paga contra entrega en zonas con cobertura','Envío gratis en compras desde RD$ 3,000'], mi=0;
  setInterval(function(){ mi=(mi+1)%msgs.length; $('announce').textContent=msgs[mi]; },3500);
  renderCart();
})();