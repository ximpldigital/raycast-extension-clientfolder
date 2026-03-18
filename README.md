# Kunde öffnen – Raycast Extension

Zeigt alle Kundenordner aus Google Drive (Geteilte Ablagen › Kunden) und öffnet sie im Finder.

## Installation

```bash
# In den Extension-Ordner wechseln
cd kunde-extension

# Dependencies installieren
npm install

# Extension in Raycast registrieren (Dev Mode)
npm run dev
```

Danach in Raycast einfach **"Kunde"** eingeben – die Liste erscheint mit Suchfeld.

## Aktionen pro Kunde

- **Enter** → Ordner im Finder öffnen
- **⌘⇧C** → Pfad kopieren
- **⌘T** → Ordner im Terminal öffnen

## Pfad anpassen

Falls der Pfad abweicht, in `src/index.tsx` die Konstante `KUNDEN_PATH` anpassen.
Aktuell: `~/Library/CloudStorage/GoogleDrive-gerold@ximpl.digital/Geteilte Ablagen/Kunden`

> **Tipp:** Falls der Ordner auf deinem Mac anders heißt (z.B. "Shared drives" statt "Geteilte Ablagen"), 
> öffne den Finder, navigiere zum Ordner und ziehe ihn ins Terminal – dort siehst du den echten Pfad.
