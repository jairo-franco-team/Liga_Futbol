// Refuerzo de carga fresca sin caché del escudo JPEG verificado de Atlético La Luz
(function(){
  function refreshLuzCrest(){
    if (!window.ATLETICO_LA_LUZ_REAL_LOGO || window.ATLETICO_LA_LUZ_REAL_LOGO.indexOf('data:image/webp') === 0) {
      var s = document.createElement('script');
      s.src = './assets/atletico-la-luz-logo-real.js?v=15_' + Date.now();
      document.head.appendChild(s);
    }
  }
  refreshLuzCrest();
})();
