# JA ClaimsAssist

**JA ClaimsAssist** ist ein Prototyp für ein Schadenmanagement-System mit KI-Unterstützung für die Schenk-Unternehmensgruppe.

Der erste Prototyp bildet folgende Kernbereiche ab:

- Login mit E-Mail/Passwort-Konzept
- Dashboard
- Allgemeine Schadenfälle mit **SNR-YYYYMMDD-FIRMA-XXX**
- KFZ-Schäden nur für Schenk mit **KFS-YYYYMMDD-XXX**
- Subunternehmer-Haftbarhaltung
- Unterlagen-Upload / KI-Prüfung als Konzept
- Schadenbetrag & Versicherung
- Historie / Vermerke
- Admin / Stammdaten / Nutzerrollen

## Schnellstart: lokaler Prototyp

1. Repository klonen oder ZIP entpacken.
2. Datei `prototype/index.html` im Browser öffnen.
3. Demo-Login verwenden:

```text
E-Mail: jurijs.agafonovs@schenkspedition.de
Passwort: demo
```

Der Prototyp ist statisch und speichert keine echten Daten dauerhaft. Er dient als Click-Dummy und technische Arbeitsgrundlage.

## Empfohlene GitHub-Struktur

```text
ja-claimassist/
├── README.md
├── docs/                       # Fachliche Dokumentation
├── prototype/                  # Klickbarer HTML-Prototyp
├── database/                   # Datenmodell / SQL-Entwurf
├── tickets/                    # Ticketplan / Backlog
├── scripts/                    # Hilfsskripte
└── .github/                    # Issue- und PR-Vorlagen
```

## Projektstand

| Bereich | Status |
|---|---|
| Branding | genehmigt: JA ClaimsAssist |
| Wireframes | genehmigt: v0.3 |
| Schadenarten-Matrix | genehmigt: v0.3 / fachliche Grundlage v0.2 |
| Lastenheft | Stand: v0.5 |
| Felderkatalog | Stand: v0.3 |
| MVP-Plan | freigegeben |
| Technisches Datenmodell | erstellt |

## Hinweise zu echten Daten

Bitte im Prototyp keine echten personenbezogenen Daten, Schadenunterlagen, Kennzeichenfotos oder Versicherungsdokumente hochladen. Für den produktiven Einsatz müssen Datenschutz, Rollenrechte, Hosting, Backups und Aufbewahrungsfristen verbindlich festgelegt werden.
