# Architektur-Kurzkonzept

## MVP-Ziel

JA ClaimsAssist soll zunächst als Web-App-Prototyp umgesetzt werden. Der aktuelle HTML-Prototyp zeigt Navigation, Masken und Beispielprozesse. Später kann daraus eine echte App mit Datenbank, Authentifizierung und KI-Dokumentenanalyse entstehen.

## Kernmodule

| Modul | Zweck |
|---|---|
| Auth | Login mit E-Mail/Passwort |
| Dashboard | Übersicht, KPI, Suche |
| Vorgänge | SNR-/KFS-Fälle anlegen und bearbeiten |
| Unterlagen | Upload, Dokumentstatus, KI-Prüfung |
| Historie | Vermerke, Kommunikation, Systemevents |
| Versicherung | KRAVAG-Daten, Policen, KRAVAG-Schadennummer |
| Subunternehmer | Haftbarhaltung erstellen und Fristen verwalten |
| Admin | Nutzer, Rollen, Firmen, Stammdaten |

## Nummernlogik

| Bereich | Format |
|---|---|
| Allgemeine Schäden | `SNR-YYYYMMDD-FIRMA-XXX` |
| KFZ-Schäden Schenk | `KFS-YYYYMMDD-XXX` |

## Sprachen

Aktuelle Spezifikation und Stammdaten bleiben auf Deutsch. Die App soll später global zwischen Deutsch, Englisch und Russisch umschaltbar sein.
