var FLAGS = {
  ro: '<span class="flag">🇷🇴</span>',
  en: '<span class="flag">🇬🇧</span>'
};

var NAMES = {
  ro: 'Română',
  en: 'English'
};

var T = {
  ro: {
    welcome: 'Bine ai venit pe site-ul meu personal',
    title: 'Despre mine',
    text: 'Salut, sunt Dragoș. Student în anul al treilea la Robotică, cu experiență practică în sisteme în rețea, infrastructură self-hosted și programare aplicată.',
    resume: 'CV-UL MEU',
    contact: 'Contact',
    projectsTitle: 'Proiectele mele',
    footer: '© ' + new Date().getFullYear() + ' Dragos Mihaescu. Toate drepturile rezervate.'
  },
  en: {
    welcome: 'Welcome to my Personal Website',
    title: 'About Me',
    text: "Hi, I'm Dragos. A third-year Robotics student with hands-on experience in networked systems, self-hosted infrastructure, and applied programming.",
    resume: 'MY RESUME',
    contact: 'Contact',
    projectsTitle: 'My Projects',
    footer: '© ' + new Date().getFullYear() + ' Dragos Mihaescu. All rights reserved.'
  }
};

var ARROW =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">' +
    '<path d="M6 9l6 6 6-6"/>' +
  '</svg>';

var PROJECTS = [
  { title: 'PI Keeper',      img: 'PIKeeper.png',     url: 'https://github.com/Drag0s216/PiKeeper' },
  { title: 'F1 Lamp',        img: 'F1Lamp.png',        url: 'https://github.com/Drag0s216/F1Lamp' },
  { title: 'Campus Tracker', img: 'CampusTracker.png', url: 'https://github.com/Drag0s216/CampusTracker' },
  { title: 'DormTunnel',     img: 'DormTunnel.png',    url: 'https://github.com/Drag0s216/DormTunnel' },
  { title: 'DuskBeacon',     img: 'DuskBeacon.png',    url: 'https://github.com/Drag0s216/DuskBeacon' }
];

var AUTO_MS = 3500;


/* Elemente */

var nav = document.querySelector('nav');
var neon = document.getElementById('neon');
var output = document.getElementById('output');
var about = document.querySelector('.about');
var aboutTitle = document.getElementById('aboutTitle');
var aboutText = document.getElementById('aboutText');
var resume = document.getElementById('resume');
var contact = document.querySelector('.contact');
var projects = document.querySelector('.projects');
var langBtn = document.getElementById('langBtn');
var langMenu = document.getElementById('langMenu');
var slider = document.getElementById('slider');
var track = document.getElementById('track');

var lang = 'en';
var sliderIndex = 0;
var sliderOn = false;
var autoTimer;


/* Limba */

function setLang(l) {
  lang = l;
  document.documentElement.lang = l;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    if (el.hasAttribute('data-typing')) return;
    el.textContent = T[l][el.dataset.i18n];
  });

  langBtn.innerHTML = FLAGS[l] + '<span>' + l.toUpperCase() + '</span>' + ARROW;
  langMenu.classList.remove('open');
  langBtn.classList.remove('active');
}

document.querySelectorAll('#langMenu button').forEach(function (b) {
  b.innerHTML = FLAGS[b.dataset.lang] + '<span>' + NAMES[b.dataset.lang] + '</span>';

  b.addEventListener('click', function () {
    setLang(b.dataset.lang);
  });
});

langBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  var isOpen = langMenu.classList.toggle('open');
  langBtn.classList.toggle('active', isOpen);
});

document.addEventListener('click', function () {
  langMenu.classList.remove('open');
  langBtn.classList.remove('active');
});

setLang(lang);


/* Codul din console (decorativ, doar fragmente) */

var HTML_TEXT = [
  '<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '  <meta charset="UTF-8">',
  '  <meta name="viewport" content="width=device-width">',
  "  <title>DCM's Website</title>",
  '  <link rel="stylesheet" href="style.css">',
  '</head>',
  '<body>',
  '  <nav>',
  '    <div class="neon" id="neon"></div>',
  '    <div class="lang">',
  '      <button class="btn" id="langBtn"></button>',
  '      <div class="menu" id="langMenu"></div>',
  '    </div>',
  '  </nav>',
  '  <h2 class="output" id="output"></h2>',
  '  <main>',
  '    <section class="about">',
  '      <h1 id="aboutTitle"></h1>',
  '      <p id="aboutText"></p>',
  '      <a class="resume" href="resume.pdf">MY RESUME</a>',
  '    </section>',
  '    <section class="contact">',
  '      <h2>Contact</h2>',
  '      <div class="contact-grid">',
  '        <a class="contact-btn" href="#">Instagram</a>',
  '        <a class="contact-btn" href="#">GitHub</a>',
  '        <a class="contact-btn" href="#">LinkedIn</a>',
  '        <a class="contact-btn" href="#">Email</a>',
  '      </div>',
  '    </section>',
  '  </main>',
  '  <section class="projects">',
  '    <h2>My Projects</h2>',
  '    <div class="slider" id="slider"></div>',
  '  </section>',
  '  <footer class="footer"></footer>',
  '  <script src="script.js"></script>',
  '</body>',
  '</html>'
].join('\n');

var CSS_TEXT = [
  '/* style.css, fragment */',
  'body {',
  '  margin: 0;',
  '  min-height: 100vh;',
  "  font-family: 'Gill Sans', Calibri, sans-serif;",
  '  background: linear-gradient(90deg, #0F0721 0%, #240057 50%, #30016E 100%);',
  '}',
  '',
  '.output {',
  '  font-size: 50px;',
  '  font-weight: bold;',
  '  color: #00BBFF;',
  '  text-align: center;',
  '}',
  '',
  '.about,',
  '.contact,',
  '.projects {',
  '  padding: 28px;',
  '  border-radius: 20px;',
  '  background: rgba(255, 255, 255, 0.08);',
  '  border: 1px solid rgba(255, 255, 255, 0.18);',
  '  backdrop-filter: blur(12px);',
  '}',
  '',
  '.project {',
  '  flex: 0 0 calc((100% - 40px) / 3);',
  '  border-radius: 16px;',
  '  transition: transform 0.25s ease;',
  '}'
].join('\n');

var JS_TEXT = [
  "var lang = 'en';",
  '',
  'function setLang(l) {',
  '  lang = l;',
  '  document.documentElement.lang = l;',
  "  document.querySelectorAll('[data-i18n]').forEach(function (el) {",
  '    el.textContent = T[l][el.dataset.i18n];',
  '  });',
  '}',
  '',
  'async function typeInto(el, text, speed) {',
  '  for (var i = 1; i <= text.length; i++) {',
  '    el.textContent = text.slice(0, i);',
  '    await sleep(speed);',
  '  }',
  '}',
  '',
  'async function intro() {',
  "  nav.classList.add('in');",
  "  about.classList.add('in');",
  "  contact.classList.add('in');",
  '  await typeInto(output, t.welcome, 55);',
  "  resume.classList.add('show');",
  '}'
].join('\n');


/* Colorarea codului */

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function span(cls, text) {
  return '<span class="' + cls + '">' + text + '</span>';
}

function hlHtml(s) {
  var re = /(&lt;\/?[\w!]*)|("[^"]*"?)|(\s[\w-]+(?==))|(\/?&gt;)/g;

  return esc(s).replace(re, function (m, tag, str, attr) {
    if (tag)  return span('k', m);
    if (str)  return span('s', m);
    if (attr) return span('v', m);
    return span('k', m);
  });
}

function hlCss(s) {
  var e = esc(s);

  if (/^\s*\/\*/.test(e)) return span('c', e);

  if (/^\s/.test(e)) {
    var i = e.indexOf(':');
    if (i < 0) return span('v', e);

    var val = e.slice(i + 1).replace(/(#[0-9a-fA-F]{3,8})|('[^']*'?)|(\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s)?)/g, function (m, hex, str) {
      return span(str ? 's' : 'n', m);
    });

    return span('v', e.slice(0, i)) + ':' + val;
  }

  return span('f', e);
}

function hlJs(s) {
  var re = /(\/\/.*$)|('[^']*'?|"[^"]*"?)|\b(var|let|const|function|return|if|else|for|while|async|await|new|true|false|null)\b|\b(\d+)\b|\b([A-Za-z_$][\w$]*)(?=\()|([()\[\]{}])/g;

  return esc(s).replace(re, function (m, comment, str, keyword, number, func) {
    if (comment) return span('c', m);
    if (str)     return span('s', m);
    if (keyword) return span('k', m);
    if (number)  return span('n', m);
    if (func)    return span('f', m);
    return span('b', m);
  });
}


/* Consolele */

var consoles = [
  { box: document.getElementById('consoleHtml'), code: document.getElementById('codeHtml'), text: HTML_TEXT, hl: hlHtml },
  { box: document.getElementById('consoleCss'),  code: document.getElementById('codeCss'),  text: CSS_TEXT,  hl: hlCss },
  { box: document.getElementById('consoleJs'),   code: document.getElementById('codeJs'),   text: JS_TEXT,   hl: hlJs }
];

function renderCode(c, written) {
  var lines = written.split('\n');

  c.code.innerHTML = lines.map(function (line, i) {
    var cursor = (i === lines.length - 1) ? '<span class="cur"></span>' : '';

    return '<div class="ln">' +
             '<span class="num">' + (i + 1) + '</span>' +
             '<span>' + c.hl(line) + cursor + '</span>' +
           '</div>';
  }).join('');

  c.code.scrollTop = c.code.scrollHeight;
}

function typeCode(c) {
  return new Promise(function (resolve) {
    var pos = 0;
    var total = c.text.length;
    var step = Math.ceil(total / 100);

    var timer = setInterval(function () {
      pos = Math.min(total, pos + step);
      renderCode(c, c.text.slice(0, pos));

      if (pos >= total) {
        clearInterval(timer);
        resolve();
      }
    }, 18);
  });
}


/* Logo neon */

'DCM'.split('').forEach(function (ch) {
  var s = document.createElement('span');

  s.className = 'letter';
  s.textContent = ch;
  s.style.animationDelay = (Math.random() * 0.8).toFixed(2) + 's';
  s.style.animationDuration = (1.2 + Math.random() * 1.2).toFixed(2) + 's';

  neon.appendChild(s);
});


/* Slider proiecte */

PROJECTS.forEach(function (p) {
  var a = document.createElement('a');

  a.className = 'project';
  a.href = p.url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.innerHTML =
    '<img src="' + p.img + '" alt="' + p.title + '">' +
    '<div class="project-name">' + p.title + '</div>';

  track.appendChild(a);
});

function visibleCount() {
  return window.innerWidth <= 820 ? 1 : 3;
}

function maxIndex() {
  return Math.max(0, PROJECTS.length - visibleCount());
}

function goTo(i) {
  var max = maxIndex();

  if (i > max) i = 0;
  if (i < 0) i = max;

  sliderIndex = i;
  track.style.transform = 'translateX(-' + track.children[i].offsetLeft + 'px)';
}

function startAuto() {
  stopAuto();
  autoTimer = setInterval(function () {
    goTo(sliderIndex + 1);
  }, AUTO_MS);
}

function stopAuto() {
  clearInterval(autoTimer);
}

function move(step) {
  goTo(sliderIndex + step);
  startAuto();
}

function showSlider() {
  sliderOn = true;
  startAuto();
}

document.getElementById('prevBtn').addEventListener('click', function () { move(-1); });
document.getElementById('nextBtn').addEventListener('click', function () { move(1); });

slider.addEventListener('mouseenter', function () { if (sliderOn) stopAuto(); });
slider.addEventListener('mouseleave', function () { if (sliderOn) startAuto(); });

window.addEventListener('resize', function () {
  goTo(Math.min(sliderIndex, maxIndex()));
});


/* Intro */

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function typeInto(el, text, speed) {
  var cur = document.createElement('span');
  cur.className = 'cur';

  for (var i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    el.appendChild(cur);
    await sleep(speed);
  }

  el.textContent = text;
}

async function intro() {
  var t = T[lang];

  nav.classList.add('in');
  about.classList.add('in');
  contact.classList.add('in');
  projects.classList.add('in');
  document.body.classList.add('revealed');

  setTimeout(function () { neon.classList.add('lit'); }, 900);
  setTimeout(showSlider, 1400);

  // Welcome si About Me se scriu in paralel
  await Promise.all([
    typeInto(output, t.welcome, 55),
    (async function () {
      await typeInto(aboutTitle, t.title, 70);
      await typeInto(aboutText, t.text, 22);
    })()
  ]);

  resume.classList.add('show');

  // Textele devin normale, deci selectorul de limba le poate schimba
  aboutTitle.removeAttribute('data-typing');
  aboutText.removeAttribute('data-typing');
  output.removeAttribute('data-typing');
  setLang(lang);
}

async function run() {
  await sleep(200);

  consoles[0].box.classList.add('open');
  var p1 = typeCode(consoles[0]);

  await sleep(200);
  consoles[1].box.classList.add('open');
  consoles[2].box.classList.add('open');
  var p2 = typeCode(consoles[1]);
  var p3 = typeCode(consoles[2]);

  await Promise.all([p1, p2, p3]);
  await sleep(300);

  consoles[0].box.classList.remove('open');
  await sleep(200);
  consoles[1].box.classList.remove('open');
  consoles[2].box.classList.remove('open');
  await sleep(700);

  await intro();
}

run();
