# Teamorientiertes Praktikum

Im Rahmen des Teamorientierten Praktikums haben wir uns dafür entschieden, den SB-Service zu überarbeiten.

## System starten

Um das Backend zu starten müssen folgende Schritte ausgeführt werden:

```bash
# Dependencies installieren
npm install

# Entwicklungsumgebung starten
npm run dev
```

Für eine erfolgreiche Verbindung mit der Datenbank sind noch Login-Daten in `src/database/database.js` notwendig.

## System exportieren

Hier ist kein eigener Bauprozess notwendig. Das Backend kann einfach gestartet werden, zum Beispiel:

```bash
# Mit Node starten
node index.js

# Oder mit PM2
pm2 start index.js --name TOP-Backend
```

Dann ist die API erreichbar.
