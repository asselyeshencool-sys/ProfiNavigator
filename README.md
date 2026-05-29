# ProfiNavigator

Кәсіптік бағдар беру платформасы — мектеп түлектері, студенттер және мансабын ауыстырушыларға арналған веб-қосымша.

## Мүмкіндіктер

- Кәсіби бағдар тесті (RIASEC)
- Мамандықтар каталогы және салыстыру
- Нарық аналитикасы (жалақы, сұраныс)
- Skills Roadmap жүктеу
- Жеке кабинет (localStorage)

## Технологиялар

HTML, CSS, JavaScript (ES modules), Chart.js

## Іске қосу (локальды)

```bash
npm install
npm start
```

Браузерде: http://localhost:3000

## Railway-де деплой

1. [railway.com](https://railway.com) → **New Project** → **Deploy from GitHub repo**
2. Репозиторий: `asselyeshencool-sys/ProfiNavigator`
3. Railway автоматты түрде `npm start` іске қосады (`serve` статикалық файлдарды береді)
4. **Settings** → **Networking** → **Generate Domain** — публичный URL алыңыз

Қолмен (Railway CLI):

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## Құрылым

- `index.html` — басты лендинг
- `test.html`, `professions.html`, `analytics.html`, `cabinet.html` — негізгі беттер
- `data/` — JSON деректер
- `js/` — клиенттік логика
