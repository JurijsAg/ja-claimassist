const defaultClaims = [
  {number:'SNR-20260630-STL-001', company:'STL', type:'Transportbeschädigung Ware', status:'In Prüfung / Ermittlung', docs:'Unvollständig', amount:'2.500,00 EUR', damageDate:'30.06.2026', place:'Lyon, Frankreich', plates:'CZ-12345 / CZ-67890', client:'Beispielkunde A', nextStep:'Handelsrechnung und Haftbarhaltung beim Kunden anfordern.'},
  {number:'KFS-20260630-001', company:'SCH', type:'KFZ-Schaden / Verkehrsunfall', status:'In Prüfung', docs:'Teilweise vollständig', amount:'4.800,00 EUR', damageDate:'30.06.2026', place:'A8 bei Karlsruhe', plates:'PF-ST 123 / PF-ST 456', client:'Schenk Spedition & Transporte GmbH', nextStep:'KFZ-Gutachten und Schadenanzeige prüfen.'},
  {number:'SNR-20260701-SUB-001', company:'SUB', type:'Subunternehmer-Haftbarhaltung', status:'Haftbarhaltung vorzubereiten', docs:'Unvollständig', amount:'offen', damageDate:'01.07.2026', place:'Transportstrecke', plates:'Subunternehmer-Fahrzeug', client:'Beispielkunde B', nextStep:'Haftbarhaltung an Subunternehmer erstellen.'},
  {number:'SNR-20260702-BTS-001', company:'BTS', type:'Diebstahl / Raub', status:'Unterlagen unvollständig', docs:'Fehlt', amount:'offen', damageDate:'02.07.2026', place:'Parkplatz / Rastplatz', plates:'LT-12345 / LT-67890', client:'Beispielkunde C', nextStep:'Polizeiprotokoll, Stehliste und Diebstahlfragebogen anfordern.'}
];

let demoClaims = loadClaims();
let selectedClaim = demoClaims[0];

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

function loadClaims(){
  try{
    const stored = localStorage.getItem('jaClaimsAssistClaims');
    return stored ? JSON.parse(stored) : [...defaultClaims];
  } catch(error){
    console.warn('Demo-Daten konnten nicht geladen werden.', error);
    return [...defaultClaims];
  }
}

function saveClaims(){
  localStorage.setItem('jaClaimsAssistClaims', JSON.stringify(demoClaims));
}

function login(){
  document.getElementById('login').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  renderClaims();
  updateDetail(selectedClaim);
}

function showPage(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
  document.querySelectorAll('.nav').forEach(n => n.classList.toggle('active', n.dataset.page === id));
  const title = pageTitles[id] || ['JA ClaimsAssist',''];
  document.getElementById('pageTitle').textContent = title[0];
  document.getElementById('pageSub').textContent = title[1];
  if(id === 'detail') updateDetail(selectedClaim);
}

document.querySelectorAll('.nav').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.page)));

function badge(value){
  if(value.includes('vollständig') && !value.includes('Unvollständig')) return `<span class="badge-ok">${value}</span>`;
  if(value.includes('Fehlt') || value.includes('Unvollständig')) return `<span class="badge-bad">${value}</span>`;
  return `<span class="badge-warn">${value}</span>`;
}

function renderClaims(){
  const tbody = document.getElementById('claimsTable');
  tbody.innerHTML = demoClaims.map((c, index) => `
    <tr onclick="openClaim(${index})" style="cursor:pointer">
      <td><b>${c.number}</b></td>
      <td>${c.company}</td>
      <td>${c.type}</td>
      <td><span class="badge-warn">${c.status}</span></td>
      <td>${badge(c.docs)}</td>
      <td>${c.amount}</td>
    </tr>`).join('');
}

function openClaim(index){
  selectedClaim = demoClaims[index];
  updateDetail(selectedClaim);
  showPage('detail');
}

function updateDetail(claim){
  if(!claim) return;
  setText('detailNumber', claim.number);
  setText('detailSubtitle', `${claim.type} · ${companyName(claim.company)}`);
  setText('detailStatus', claim.status);
  setText('detailDamageDate', claim.damageDate || 'noch nicht angegeben');
  setText('detailPlace', claim.place || 'noch nicht angegeben');
  setText('detailPlates', claim.plates || 'noch nicht angegeben');
  setText('detailClient', claim.client || 'noch nicht angegeben');
  setText('detailNextStep', claim.nextStep || 'Vorgang prüfen und Unterlagenstatus aktualisieren.');
}

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value;
}

function companyName(code){
  const names = {
    SCH:'Schenk Spedition & Transporte GmbH',
    STL:'STL Express s.r.o.',
    BTS:'UAB Baltijos transporto sistemos',
    TRC:'UAB Transcargo express',
    LTM:'LTM Express sp. z o.o.',
    TCL:'TCL Trans s.r.o.',
    RTS:'SARL Royal Trans Solutions',
    SUB:'Subunternehmer'
  };
  return names[code] || code;
}

function todayKey(){
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function dateToGerman(value){
  if(!value) return 'noch nicht angegeben';
  const [y, m, d] = value.split('-');
  return `${d}.${m}.${y}`;
}

function nextRunningNumber(prefix){
  const existing = demoClaims
    .map(c => c.number)
    .filter(number => number.startsWith(prefix))
    .map(number => parseInt(number.split('-').pop(), 10))
    .filter(number => !Number.isNaN(number));
  const next = existing.length ? Math.max(...existing) + 1 : 1;
  return String(next).padStart(3, '0');
}

function generateSNR(company){
  const prefix = `SNR-${todayKey()}-${company}`;
  return `${prefix}-${nextRunningNumber(prefix)}`;
}

function generateKFS(){
  const prefix = `KFS-${todayKey()}`;
  return `${prefix}-${nextRunningNumber(prefix)}`;
}

function value(id){
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function showResult(id, message){
  const el = document.getElementById(id);
  if(!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
}

function saveSNRClaim(){
  const company = value('snrCompany') || 'STL';
  const type = value('snrDamageType') || 'Transportbeschädigung Ware';
  const number = generateSNR(company);
  const newClaim = {
    number,
    company,
    type,
    status:'Neu gemeldet',
    docs:'Unvollständig',
    amount:'offen',
    damageDate: dateToGerman(value('snrDamageDate')),
    place: value('snrLocation') || 'noch nicht angegeben',
    plates: `${value('snrTruckPlate') || 'LKW offen'} / ${value('snrTrailerPlate') || 'Auflieger offen'}`,
    client: value('snrClient') || 'noch nicht angegeben',
    nextStep:'Unterlagen hochladen und KI-Unterlagenprüfung durchführen.'
  };
  demoClaims.unshift(newClaim);
  selectedClaim = newClaim;
  saveClaims();
  renderClaims();
  updateDetail(newClaim);
  showResult('snrResult', `Vorgang gespeichert. Interne Schadennummer: ${number}`);
  showPage('detail');
}

function saveSubClaim(){
  const number = generateSNR('SUB');
  const newClaim = {
    number,
    company:'SUB',
    type:'Subunternehmer-Haftbarhaltung',
    status:'Haftbarhaltung vorzubereiten',
    docs:'Unvollständig',
    amount:'offen',
    damageDate: dateToGerman(value('subLoadingDate')),
    place:`${value('subTransportFrom') || 'Start offen'} → ${value('subTransportTo') || 'Ziel offen'}`,
    plates:'Subunternehmer-Fahrzeug',
    client:value('subCompany') || 'Subunternehmer',
    nextStep:'Haftbarhaltung prüfen, PDF erzeugen und an Subunternehmer senden.'
  };
  demoClaims.unshift(newClaim);
  selectedClaim = newClaim;
  saveClaims();
  renderClaims();
  updateDetail(newClaim);
  showResult('subResult', `Vorgang gespeichert. Interne Schadennummer: ${number}`);
  showPage('detail');
}

function saveKFSClaim(){
  const number = generateKFS();
  const newClaim = {
    number,
    company:'SCH',
    type:'KFZ-Schaden / Verkehrsunfall',
    status:'Neu gemeldet',
    docs:'Unvollständig',
    amount:'offen',
    damageDate: dateToGerman(value('kfsAccidentDate')),
    place:value('kfsAccidentPlace') || 'noch nicht angegeben',
    plates:`${value('kfsTruckPlate') || 'PF-ST offen'} / ${value('kfsTrailerPlate') || 'PF-ST offen'}`,
    client:'Schenk Spedition & Transporte GmbH',
    nextStep:'Unfallunterlagen hochladen: Fotos, Unfallmitteilungsblatt, Schadenanzeige und ggf. Gutachten/Kostenvoranschlag.'
  };
  demoClaims.unshift(newClaim);
  selectedClaim = newClaim;
  saveClaims();
  renderClaims();
  updateDetail(newClaim);
  showResult('kfsResult', `KFZ-Schaden gespeichert. Interne Nummer: ${number}`);
  showPage('detail');
}

function initDefaults(){
  const today = new Date().toISOString().slice(0,10);
  ['snrDamageDate','subLoadingDate','subUnloadingDate','kfsAccidentDate'].forEach(id => {
    const el = document.getElementById(id);
    if(el && !el.value) el.value = today;
  });
}

initDefaults();
