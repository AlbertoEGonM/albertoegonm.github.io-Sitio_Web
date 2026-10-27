const languageButton = document.querySelector('#language');
let language = 'es';
try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'es'; } catch {}
function renderCertificates() {
  const list = document.querySelector('#certificate-list');
  list.replaceChildren();
  const certificates = window.portfolioCertificates || [];
  document.querySelector('#certificate-empty').hidden = certificates.length > 0;
  certificates.forEach(certificate => {
    const article = document.createElement('article'); article.className = 'certificate-entry';
    if (certificate.image) {const image = document.createElement('img'); image.src = certificate.image; image.alt = certificate.title[language]; image.loading = 'lazy'; article.append(image);}
    const details = document.createElement('div');
    const heading = document.createElement('h3'); heading.textContent = certificate.title[language];
    const date = certificate.date ? new Intl.DateTimeFormat(language === 'es' ? 'es-MX' : 'en-US', {dateStyle:'long',timeZone:'UTC'}).format(new Date(certificate.date + 'T00:00:00Z')) : '';
    const info = document.createElement('p'); info.textContent = certificate.issuer + (date ? ' · ' + date : '');
    details.append(heading, info);
    if (certificate.duration) {const duration = document.createElement('p'); duration.textContent = certificate.duration[language]; details.append(duration);}
    if (certificate.url && /^(https:\/\/|\.\/assets\/)/.test(certificate.url)) {
      const link = document.createElement('a'); link.href = certificate.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = language === 'es' ? 'Consultar certificado (PDF) ↗' : 'View certificate (PDF) ↗'; details.append(link);
    }
    article.append(details); list.append(article);
  });
}
function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-es]').forEach(element => {
    const value = element.dataset[language];
    if (element.tagName === 'H2' && value.includes('<br>')) {
      element.replaceChildren(); value.split('<br>').forEach((line, index) => {if (index) element.append(document.createElement('br')); element.append(document.createTextNode(line));});
    } else element.textContent = value;
  });
  languageButton.replaceChildren(document.createTextNode(language === 'es' ? 'EN ↗' : 'ES ↗'));
  languageButton.setAttribute('aria-label', language === 'es' ? 'Switch to English' : 'Cambiar a español');
  document.querySelector('nav').setAttribute('aria-label', language === 'es' ? 'Principal' : 'Main');
  document.querySelector('.brand').setAttribute('aria-label', language === 'es' ? 'Inicio' : 'Home');
  renderCertificates();
}
languageButton.addEventListener('click', () => {language = language === 'es' ? 'en' : 'es'; try {localStorage.setItem('portfolio-language',language);} catch {} applyLanguage();});
document.querySelector('#year').textContent = new Date().getFullYear();
applyLanguage();
