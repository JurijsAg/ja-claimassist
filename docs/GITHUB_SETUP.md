# GitHub Setup für JA ClaimsAssist

Repository: `https://github.com/JurijsAg/ja-claimassist.git`

## Variante: Dateien manuell pushen

```bash
git clone https://github.com/JurijsAg/ja-claimassist.git
cd ja-claimassist

# Inhalt aus diesem Starter-Paket in den Repository-Ordner kopieren

git add .
git commit -m "Initial JA ClaimsAssist prototype and documentation"
git push origin main
```

## GitHub Pages aktivieren

Damit der Prototyp online klickbar ist:

1. GitHub Repository öffnen.
2. **Settings** öffnen.
3. Links **Pages** auswählen.
4. Bei Source: **Deploy from a branch** wählen.
5. Branch: `main` auswählen.
6. Folder: `/prototype` auswählen, falls verfügbar. Falls GitHub das nicht anbietet, alternativ `/docs` verwenden oder eine GitHub Action ergänzen.
7. Speichern.

Danach erscheint eine URL, unter der der Prototyp abrufbar ist.

## Empfohlene Branches

| Branch | Zweck |
|---|---|
| `main` | freigegebener Stand |
| `develop` | laufende Entwicklung |
| `feature/...` | einzelne Funktionen |

## Empfohlene Labels

- `epic`
- `frontend`
- `backend`
- `database`
- `ki`
- `documentation`
- `mvp`
- `security`
- `bug`
