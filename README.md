[README.md](https://github.com/user-attachments/files/26478181/README.md)
# Fullerene C60 × Ритуалы Трансформации
## Landing Page для GitHub Pages

Премиальный инвестиционный лендинг для коллаборации Full Energy и Ритуалы Трансформации.

---

## 🚀 Быстрый запуск на GitHub Pages

### Способ 1: Через веб-интерфейс GitHub (рекомендуется)

1. **Создайте репозиторий:**
   - Войдите в GitHub
   - Нажмите "+" в правом верхнем углу → "New repository"
   - Имя: `c60-collaboration-landing` (или любое другое)
   - Сделайте репозиторий **Public**
   - Нажмите "Create repository"

2. **Загрузите index.html:**
   - В созданном репозитории нажмите "Add file" → "Upload files"
   - Перетащите файл `index.html` в окно
   - Нажмите "Commit changes"

3. **Включите GitHub Pages:**
   - Перейдите в "Settings" репозитория
   - В левом меню выберите "Pages"
   - В разделе "Source" выберите:
     - Branch: `main` (или `master`)
     - Folder: `/ (root)`
   - Нажмите "Save"

4. **Готово!**
   - Через 1-2 минуты сайт будет доступен по адресу:
   - `https://ваш-username.github.io/c60-collaboration-landing/`

---

### Способ 2: Через Git CLI

```bash
# Клонируйте репозиторий
git clone https://github.com/ваш-username/c60-collaboration-landing.git
cd c60-collaboration-landing

# Скопируйте index.html в папку репозитория
cp /путь/к/index.html .

# Добавьте и закоммитьте файл
git add index.html
git commit -m "Add landing page"
git push origin main

# Включите GitHub Pages в настройках репозитория (см. Способ 1, шаг 3)
```

---

## 📋 Структура проекта

```
c60-collaboration-landing/
├── index.html          # Основной файл лендинга (все стили встроены)
└── README.md           # Эта инструкция
```

---

## 🎨 Особенности дизайна

- **Стиль:** Full Energy Corporate (белый фон, оранжевые акценты)
- **Шрифт:** Golos Text (загружается с full-en.com)
- **Цвета:**
  - Primary: `#FF6B00` (оранжевый)
  - Secondary: `#E64F09` (темно-оранжевый)
  - Text: `#111111` (почти черный)
  - Background: `#FFFFFF` (белый)

- **Адаптивность:** Полностью responsive дизайн для мобильных устройств
- **Стили:** Все CSS встроены в HTML (нет внешних зависимостей)
- **Год:** 2026 используется везде

---

## 📊 Секции лендинга

1. **Hero** — Обложка с главным заголовком и CTA
2. **Проблема рынка C60** — 4 ключевые проблемы
3. **Что теряют СЕЙЧАС** — Потери без персонализации
4. **Наш метод** — Синергия C60 и ритуалов
5. **Путь трансформации** — 6 шагов клиентского опыта
6. **Бизнес-выгоды** — 6 преимуществ коллаборации
7. **Дополнительные преимущества** — 3 конкурентных преимущества
8. **KPI** — Прогнозируемые метрики
9. **Модели монетизации** — 4 источника дохода
10. **Расширенная монетизация** — 3 дополнительных канала
11. **Roadmap 2026** — Поквартальный план
12. **Путь инвестора** — Воронка от $1K до $50K+
13. **Стартовое предложение** — Детали пакета $1-2K
14. **Инвестиционные пакеты** — 4 уровня участия
15. **Контакты** — Форма связи

---

## 🔧 Настройка контактной формы

По умолчанию форма использует **Formspree** (бесплатный сервис для обработки форм).

### Подключение Formspree:

1. Перейдите на [formspree.io](https://formspree.io)
2. Зарегистрируйтесь (бесплатно)
3. Создайте новую форму
4. Скопируйте endpoint (например: `https://formspree.io/f/xyzabc123`)
5. В `index.html` замените:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   на:
   ```html
   <form action="https://formspree.io/f/xyzabc123" method="POST">
   ```

### Альтернативы:

- **Google Forms** (встраивание iframe)
- **Netlify Forms** (если хостинг на Netlify)
- **EmailJS** (отправка напрямую на email)

---

## 🌐 Кастомный домен (опционально)

Если хотите использовать свой домен (например, `c60-collaboration.com`):

1. Купите домен на регистраторе (Namecheap, GoDaddy, etc.)
2. В настройках DNS добавьте:
   ```
   CNAME  www  ваш-username.github.io
   A      @    185.199.108.153
   A      @    185.199.109.153
   A      @    185.199.110.153
   A      @    185.199.111.153
   ```
3. В репозитории создайте файл `CNAME` с содержимым:
   ```
   c60-collaboration.com
   ```
4. В Settings → Pages укажите кастомный домен

---

## 📱 Тестирование

После деплоя проверьте:

- ✅ Все секции загружаются
- ✅ Стили применены корректно (оранжевые акценты, белый фон)
- ✅ Шрифт Golos Text загружается
- ✅ Кнопки работают (якорные ссылки #pricing, #contact)
- ✅ Форма отправляется (после настройки Formspree)
- ✅ Адаптивность на мобильных (уменьшите окно браузера)

---

## 🐛 Решение проблем

### Проблема: "Сайт показывает 404"
**Решение:**
- Проверьте, что GitHub Pages включен (Settings → Pages)
- Убедитесь, что branch выбран правильно (`main` или `master`)
- Подождите 1-2 минуты после первой публикации

### Проблема: "Стили не загружаются, текст черно-белый"
**Решение:**
- Убедитесь, что используете файл с **встроенными стилями** (весь CSS внутри `<style>` в `<head>`)
- Проверьте, что файл называется **точно** `index.html`

### Проблема: "Шрифт Golos Text не загружается"
**Решение:**
- Это нормально, если full-en.com недоступен — браузер использует fallback шрифты
- Можно заменить ссылку на Google Fonts или локальный файл шрифта

### Проблема: "Форма не отправляется"
**Решение:**
- Настройте Formspree endpoint (см. раздел "Настройка контактной формы")
- Или используйте альтернативный сервис (EmailJS, Google Forms)

---

## 📊 Аналитика (опционально)

Добавьте Google Analytics или Yandex.Metrika для отслеживания трафика:

```html
<!-- Вставьте перед </head> в index.html -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Yandex.Metrika -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(XXXXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

---

## 📞 Контакты для поддержки

- **Email для инвесторов:** invest@full-energy-c60.com
- **Презентации:**
  - [Русская версия (Slides)](https://www.genspark.ai/slides?project_id=966a1602-d636-4846-96e6-235b2eca6d9e)
  - [English версия (Slides)](https://www.genspark.ai/slides?project_id=3a73cb35-76f9-45e7-b0a3-77c285fe6ace)

---

## 📝 Лицензия

© 2026 Full Energy × Ритуалы Трансформации. Все права защищены.

---

## 🎯 Следующие шаги

1. ✅ Разместите сайт на GitHub Pages
2. 📧 Настройте контактную форму (Formspree)
3. 📊 Добавьте аналитику (Google Analytics)
4. 🌐 Подключите кастомный домен (опционально)
5. 🚀 Поделитесь ссылкой с потенциальными инвесторами!

**Успешного запуска!** 🎉
