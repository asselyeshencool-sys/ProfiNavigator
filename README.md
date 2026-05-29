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

## Іске қосу

```bash
npx serve . -l 3000
```

Браузерде: http://localhost:3000

## Құрылым

- `index.html` — басты лендинг
- `test.html`, `professions.html`, `analytics.html`, `cabinet.html` — негізгі беттер
- `data/` — JSON деректер
- `js/` — клиенттік логика
