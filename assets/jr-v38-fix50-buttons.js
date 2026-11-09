// Auto-aplicar escudo real de Atlético La Luz en todos los elementos de imagen
(function(){
  function applyLuzLogo(){
    var logo = window.ATLETICO_LA_LUZ_REAL_LOGO;
    if (!logo) return;
    var sw = document.getElementById('swLogoLuz');
    if (sw) sw.src = logo;
    var hero = document.getElementById('heroTeamLogo');
    var activeBtn = document.querySelector('[data-switch-team="atletico_luz"].active');
    if (hero && activeBtn) hero.src = logo;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLuzLogo);
  } else {
    applyLuzLogo();
  }
  window.addEventListener('load', applyLuzLogo);
})();
