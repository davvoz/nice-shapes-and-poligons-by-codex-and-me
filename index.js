/* crea una toolbar con un titolo e in cui possa aggiungere n bottoni */
var toolbar = document.createElement('div');
toolbar.style.position = 'fixed';
toolbar.style.top = '0';
toolbar.style.left = '0';
toolbar.style.width = '100%';
toolbar.style.height = '50px';
toolbar.style.backgroundColor = '#ccc';
toolbar.style.zIndex = '9999';
toolbar.style.padding = '10px';
toolbar.style.boxSizing = 'border-box';
toolbar.style.borderBottom = '1px solid #aaa';
toolbar.innerHTML = '<h1>Toolbar</h1>';
document.body.appendChild(toolbar);
/* crea una canvas e un context */
var canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '50px';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.backgroundColor = '#eee';
canvas.style.zIndex = '9998';
canvas.style.padding = '10px';
canvas.style.boxSizing = 'border-box';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
/* scrivi la funzione disegna : prende in input il disegno e lo disegna sulla canvas */
function disegna(disegno) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(disegno[0][0], disegno[0][1]);
  for (var i = 1; i < disegno.length; i++) {
    ctx.lineTo(disegno[i][0], disegno[i][1]);
  }
  ctx.stroke();
}
/* funzione forma irregolare : una forma chiusa fatta di curve e righe ha un colore interno uno esterno e uno spessore di riga */
function formaIrregolare(disegno, coloreInterno, coloreEsterno, spessore) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(disegno[0][0], disegno[0][1]);
  for (var i = 1; i < disegno.length; i++) {
    if (disegno[i].length == 2) {
      ctx.lineTo(disegno[i][0], disegno[i][1]);
    } else {
      ctx.quadraticCurveTo(disegno[i][0], disegno[i][1], disegno[i][2], disegno[i][3]);
    }
  }
  ctx.closePath();
  ctx.fillStyle = coloreInterno;
  ctx.fill();
  ctx.strokeStyle = coloreEsterno;
  ctx.lineWidth = spessore;
  ctx.stroke();
}
/* funzione disegna poligono :ha un colore interno uno esterno e uno spessore di riga */
function disegnaPoligono(disegno, coloreInterno, coloreEsterno, spessore) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(disegno[0][0], disegno[0][1]);
  for (var i = 1; i < disegno.length; i++) {
    ctx.lineTo(disegno[i][0], disegno[i][1]);
  }
  ctx.closePath();
  ctx.fillStyle = coloreInterno;
  ctx.fill();
  ctx.strokeStyle = coloreEsterno;
  ctx.lineWidth = spessore;
  ctx.stroke();
}
/* crea i bottoni per gestire i disegni */
var btnDisegna = document.createElement('button');
btnDisegna.innerHTML = 'Disegna';
btnDisegna.style.marginRight = '10px';
toolbar.appendChild(btnDisegna);
var btnFormaIrregolare = document.createElement('button');
btnFormaIrregolare.innerHTML = 'Forma Irregolare';
btnFormaIrregolare.style.marginRight = '10px';
toolbar.appendChild(btnFormaIrregolare);
var btnDisegnaPoligono = document.createElement('button');
btnDisegnaPoligono.innerHTML = 'Disegna Poligono';
btnDisegnaPoligono.style.marginRight = '10px';
toolbar.appendChild(btnDisegnaPoligono);
/* elementi animabili [] */
var elementiAnimabili = [];
/* se clicchi disegna poligono disegno un poligono con lati > 5  e lati < 20 , gli altri parametri randomici */
btnDisegnaPoligono.addEventListener('click', function() {
  var lati = Math.floor(Math.random() * 15) + 5;
  var disegno = [];
  var raggio = Math.floor(Math.random() * 100) + 50;
  var angolo = 0;
  var angoloIncremento = (2 * Math.PI) / lati;
  for (var i = 0; i < lati; i++) {
    disegno.push([
      Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
      Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio
    ]);
  }
  var coloreInterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var coloreEsterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var spessore = Math.floor(Math.random() * 10) + 1;
  disegnaPoligono(disegno, coloreInterno, coloreEsterno, spessore);
  elementiAnimabili.push({
    disegno: disegno,
    coloreInterno: coloreInterno,
    coloreEsterno: coloreEsterno,
    spessore: spessore,
    angolo: 0,
    angoloIncremento: Math.random() * 0.1 - 0.05
  });
});
/* se clicchi forma irregolare disegno una forma chiusa con lati > 2  e lati < 20 , gli altri parametri randomici , almeno metà delle righe sono curve */
btnFormaIrregolare.addEventListener('click', function() {
  var lati = Math.floor(Math.random() * 18) + 2;
  var disegno = [];
  var raggio = Math.floor(Math.random() * 100) + 50;
  var angolo = 0;
  var angoloIncremento = (2 * Math.PI) / lati;
  for (var i = 0; i < lati; i++) {
    if (i % 2 == 0) {
      disegno.push([
        Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
        Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio
      ]);
    } else {
      disegno.push([
        Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
        Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio,
        Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
        Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio
      ]);
    }
  }
  var coloreInterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var coloreEsterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var spessore = Math.floor(Math.random() * 10) + 1;
  formaIrregolare(disegno, coloreInterno, coloreEsterno, spessore);
  elementiAnimabili.push({
    disegno: disegno,
    coloreInterno: coloreInterno,
    coloreEsterno: coloreEsterno,
    spessore: spessore,
    angolo: 0,
    angoloIncremento: Math.random() * 0.1 - 0.05
  });
});
/* fixa i bottoni mettili nella toolbar  . metti a posto il titolo */
btnDisegna.addEventListener('click', function() {
  var disegno = [];
  var raggio = Math.floor(Math.random() * 100) + 50;
  var angolo = 0;
  var angoloIncremento = (2 * Math.PI) / Math.floor(Math.random() * 18) + 2;
  for (var i = 0; i < Math.floor(Math.random() * 18) + 2; i++) {
    disegno.push([
      Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
      Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio
    ]);
  }
  var coloreInterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var coloreEsterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var spessore = Math.floor(Math.random() * 10) + 1;
  disegna(disegno);
  elementiAnimabili.push({
    disegno: disegno,
    coloreInterno: coloreInterno,
    coloreEsterno: coloreEsterno,
    spessore: spessore,
    angolo: 0,
    angoloIncremento: Math.random() * 0.1 - 0.05
  });
});
/* crea un bottone e un color picker che controllino il background della canvas */
var btnColore = document.createElement('button');
btnColore.innerHTML = 'Colore canvas';
btnColore.style.marginRight = '10px';
toolbar.appendChild(btnColore);
var colorPicker = document.createElement('input');
colorPicker.type = 'color';
colorPicker.style.marginRight = '10px';
toolbar.appendChild(colorPicker);
/* se clicco colore cambio il background della canvas */
btnColore.addEventListener('click', function() {
  canvas.style.backgroundColor = colorPicker.value;
});
/* crea uno spazio dove mettere i bottoni nella toolbar a sinistra e mettili */
var spazioBottoni = document.createElement('div');
spazioBottoni.style.float = 'left';
toolbar.appendChild(spazioBottoni);
/* metti i bottoni nel loro spazio */
spazioBottoni.appendChild(btnDisegna);
spazioBottoni.appendChild(btnFormaIrregolare);
spazioBottoni.appendChild(btnDisegnaPoligono);
/* anche il color picker e il suo bottone */
spazioBottoni.appendChild(btnColore);
spazioBottoni.appendChild(colorPicker);
/* posiziona i bottoni in alto a destra */
var spazioBottoni2 = document.createElement('div');
spazioBottoni2.style.float = 'right';
toolbar.appendChild(spazioBottoni2);
/* adegua la toolbar per farci stare tutto bene dentro */
toolbar.style.height = '70px';
/* ti prego metti i bottoni in parte al titolo */
spazioBottoni2.appendChild(btnDisegna);
spazioBottoni2.appendChild(btnFormaIrregolare);
spazioBottoni2.appendChild(btnDisegnaPoligono);
spazioBottoni2.appendChild(btnColore);
spazioBottoni2.appendChild(colorPicker);
/* ti prego alzali fino alla toolbar */
spazioBottoni2.style.marginTop = '-50px';
/* crea un bottone che è capace di ridurre o ampliare in scala le dimensioni di quanto disegnato ; mettilo nel posto dei bottoni */
var btnZoom = document.createElement('button');
btnZoom.innerHTML = 'Zoom';
btnZoom.style.marginRight = '10px';
spazioBottoni2.appendChild(btnZoom);
/* raggruppa il color picker e il bottone */
var spazioColorPicker = document.createElement('div');
spazioColorPicker.style.float = 'right';
toolbar.appendChild(spazioColorPicker);
spazioColorPicker.appendChild(btnColore);
spazioColorPicker.appendChild(colorPicker);
/* inserisci spazioColorPicker  in spazio bottoni */
spazioBottoni2.appendChild(spazioColorPicker);
/* alza leggermente spazioColorPicker */
spazioColorPicker.style.marginTop = '-20px';
/* troppo */
spazioColorPicker.style.marginTop = '-10px';
/* abassa poco */
spazioColorPicker.style.marginTop = '-5px';
/* facciamo i bottoni bootstrap */
btnDisegna.className = 'btn btn-primary';
btnFormaIrregolare.className = 'btn btn-primary';
btnDisegnaPoligono.className = 'btn btn-primary';
btnColore.className = 'btn btn-primary';
btnZoom.className = 'btn btn-primary';
/* crea le classi css */
var css = document.createElement('style');
css.type = 'text/css';
css.innerHTML =
  '.btn { margin-right: 10px; } .btn-primary { background-color: #337ab7; border-color: #2e6da4; } .btn-primary:hover { background-color: #286090; border-color: #204d74; }';
document.body.appendChild(css);
/* quando clicco zoom scalo la figura */
btnZoom.addEventListener('click', function() {
  var scala = Math.random() * 2;
  for (var i = 0; i < elementiAnimabili.length; i++) {
    for (var j = 0; j < elementiAnimabili[i].disegno.length; j++) {
      elementiAnimabili[i].disegno[j][0] *= scala;
      elementiAnimabili[i].disegno[j][1] *= scala;
    }
  }
});
/* i bottoni disegnano e aggiungono elementi animabili */
btnDisegna.addEventListener('click', function() {
  var disegno = [];
  var raggio = Math.floor(Math.random() * 100) + 50;
  var angolo = 0;
  var angoloIncremento = (2 * Math.PI) / Math.floor(Math.random() * 18) + 2;
  for (var i = 0; i < Math.floor(Math.random() * 18) + 2; i++) {
    disegno.push([
      Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
      Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio
    ]);
  }
  var coloreInterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var coloreEsterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var spessore = Math.floor(Math.random() * 10) + 1;
  disegna(disegno);
  elementiAnimabili.push({
    disegno: disegno,
    coloreInterno: coloreInterno,
    coloreEsterno: coloreEsterno,
    spessore: spessore,
    angolo: 0,
    angoloIncremento: Math.random() * 0.1 - 0.05
  });
});
/* elimina il bottone zoom e tutti i riferimenti */
btnZoom.parentNode.removeChild(btnZoom);
/* il colore della toolbar è plain */
toolbar.style.backgroundColor = '#e6b800';
/* disegna può disegnare anche righe curve e cambiare il colore */
btnDisegna.addEventListener('click', function() {
  var disegno = [];
  var raggio = Math.floor(Math.random() * 100) + 50;
  var angolo = 0;
  var angoloIncremento = (2 * Math.PI) / Math.floor(Math.random() * 18) + 2;
  for (var i = 0; i < Math.floor(Math.random() * 18) + 2; i++) {
    if (Math.random() > 0.5) {
      disegno.push([
        Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
        Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio
      ]);
    } else {
      disegno.push([
        Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
        Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio,
        Math.floor(Math.random() * (canvas.width - raggio * 2)) + raggio,
        Math.floor(Math.random() * (canvas.height - raggio * 2)) + raggio
      ]);
    }
  }
  var coloreInterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var coloreEsterno = '#' + Math.floor(Math.random() * 16777215).toString(16);
  var spessore = Math.floor(Math.random() * 10) + 1;
  disegna(disegno);
  elementiAnimabili.push({
    disegno: disegno,
    coloreInterno: coloreInterno,
    coloreEsterno: coloreEsterno,
    spessore: spessore,
    angolo: 0,
    angoloIncremento: Math.random() * 0.1 - 0.05
  });
});
/* crea una funzione rotazione */
function rotazione(disegno, angolo) {
  var disegnoRotato = [];
  for (var i = 0; i < disegno.length; i++) {
    disegnoRotato.push([
      disegno[i][0] * Math.cos(angolo) - disegno[i][1] * Math.sin(angolo),
      disegno[i][0] * Math.sin(angolo) + disegno[i][1] * Math.cos(angolo)
    ]);
  }
  return disegnoRotato;
}
/* crea la funzione movimento */
function movimento(disegno, x, y) {
  var disegnoSpostato = [];
  for (var i = 0; i < disegno.length; i++) {
    disegnoSpostato.push([disegno[i][0] + x, disegno[i][1] + y]);
  }
  return disegnoSpostato;
}
/* crea la funzione blocca : evita di uscire dal canvas */
function blocca(disegno) {
  var disegnoBloccato = [];
  for (var i = 0; i < disegno.length; i++) {
    disegnoBloccato.push([
      Math.min(Math.max(disegno[i][0], 0), canvas.width),
      Math.min(Math.max(disegno[i][1], 0), canvas.height)
    ]);
  }
  return disegnoBloccato;
}
/* inventa un animazione con start stop step ed elementi disegnabili */
var animazione = {
  start: function() {
    this.interval = setInterval(this.step.bind(this), 1000 / 60);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  step: function() {
    for (var i = 0; i < this.elementiDisegnabili.length; i++) {
      this.elementiDisegnabili[i].angolo += this.elementiDisegnabili[i].angoloIncremento;
      this.elementiDisegnabili[i].disegno = movimento(
        rotazione(this.elementiDisegnabili[i].disegno, this.elementiDisegnabili[i].angolo),
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
      this.elementiDisegnabili[i].disegno = blocca(this.elementiDisegnabili[i].disegno);
      disegnaPoligono(
        this.elementiDisegnabili[i].disegno,
        this.elementiDisegnabili[i].coloreInterno,
        this.elementiDisegnabili[i].coloreEsterno,
        this.elementiDisegnabili[i].spessore
      );
    }
  },
  elementiDisegnabili: []
};
/* crea il toggle per gestire start e stop , usa bootstrap */
var btnToggle = document.createElement('button');
btnToggle.innerHTML = 'Start';
btnToggle.className = 'btn btn-primary';
spazioBottoni2.appendChild(btnToggle);
/* modifica il bottone start in modo che possas gestire l'animazione */
btnToggle.addEventListener('click', function() {
  if (btnToggle.innerHTML == 'Start') {
    btnToggle.innerHTML = 'Stop';
    animazione.elementiDisegnabili = elementiAnimabili;
    animazione.start();
  } else {
    btnToggle.innerHTML = 'Start';
    animazione.stop();
  }
});
/* modifica lo step : non ruota */
animazione.step = function() {
  for (var i = 0; i < this.elementiDisegnabili.length; i++) {
    this.elementiDisegnabili[i].disegno = movimento(
      this.elementiDisegnabili[i].disegno,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );
    this.elementiDisegnabili[i].disegno = blocca(this.elementiDisegnabili[i].disegno);
    disegnaPoligono(
      this.elementiDisegnabili[i].disegno,
      this.elementiDisegnabili[i].coloreInterno,
      this.elementiDisegnabili[i].coloreEsterno,
      this.elementiDisegnabili[i].spessore
    );
  }
};
