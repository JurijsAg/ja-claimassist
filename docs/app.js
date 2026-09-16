const demoClaims = [
  {number:'SNR-20260630-STL-001', company:'STL', type:'Transportbeschädigung Ware', status:'In Prüfung / Ermittlung', docs:'Unvollständig', amount:'2.500,00 EUR'},
  {number:'KFS-20260630-001', company:'SCH', type:'KFZ-Schaden / Verkehrsunfall', status:'In Prüfung', docs:'Teilweise vollständig', amount:'4.800,00 EUR'},
  {number:'SNR-20260701-SUB-001', company:'SUB', type:'Subunternehmer-Haftbarhaltung', status:'Haftbarhaltung vorzubereiten', docs:'Unvollständig', amount:'offen'},
  {number:'SNR-20260702-BTS-001', company:'BTS', type:'Diebstahl / Raub', status:'Unterlagen unvollständig', docs:'Fehlt', amount:'offen'}
];

const pageTitles = {
  dashboard: ['Dashboard','Übersicht über offene Schadenfälle, Fristen und Unterlagenstatus.'],
  'new-snr': ['Neuer SNR-Schaden','Allgemeinen Schadenfall für die Unternehmensgruppe erfassen.'],
  sub: ['Subunternehmer-Haftbarhaltung','Externe Haftbarhaltung an Subunternehmer vorbereiten.'],
  kfs: ['Neuer KFS-Schaden','KFZ-Schaden nur für Schenk Spedition & Transporte GmbH erfassen.'],
  detail: ['Schadenakte','Detailansicht eines Vorgangs mit Tabs und nächstem Schritt.'],
  documents: ['Unterlagen & KI-Prüfung','Dateien hochladen, Dokumentstatus prüfen und fehlende Unterlagen erkennen.'],
  amount: ['Betrag & Versicherung','Schadenbetrag, KRAVAG-Daten und Versicherungsstatus verwalten.'],
  history: ['Historie / Vermerke','Kommunikation, Telefonnotizen und Systemereignisse dokumentieren.'],
  admin: ['Admin / Stammdaten','Firmen, Nutzer, Rollen und Stammdaten verwalten.']
};

function login(){
  document.getElementById('login').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  renderClaims();
}

function showPage(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
  document.querySelectorAll('.nav').forEach(n => n.classList.toggle('active', n.dataset.page === id));
  const title = pageTitles[id] || ['JA ClaimsAssist',''];
  document.getElementById('pageTitle').textContent = title[0];
  document.getElementById('pageSub').textContent = title[1];
}

document.querySelectorAll('.nav').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.page)));

function badge(value){
  if(value.includes('vollständig') && !value.includes('Unvollständig')) return `<span class="badge-ok">${value}</span>`;
  if(value.includes('Fehlt') || value.includes('Unvollständig')) return `<span class="badge-bad">${value}</span>`;
  return `<span class="badge-warn">${value}</span>`;
}

function renderClaims(){
  const tbody = document.getElementById('claimsTable');
  tbody.innerHTML = demoClaims.map(c => `
    <tr onclick="showPage('detail')" style="cursor:pointer">
      <td><b>${c.number}</b></td>
      <td>${c.company}</td>
      <td>${c.type}</td>
      <td><span class="badge-warn">${c.status}</span></td>
      <td>${badge(c.docs)}</td>
      <td>${c.amount}</td>
    </tr>`).join('');
}
