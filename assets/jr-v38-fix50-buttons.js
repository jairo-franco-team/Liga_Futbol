// Inyector directo sin caché del escudo limpio v16
(function(){
  if (!window.ATLETICO_LA_LUZ_CLEAN_V16) {
    var s = document.createElement('script');
    s.src = './assets/escudo-luz-clean-v16.js?v=16_' + Date.now();
    document.head.appendChild(s);
  }
})();
