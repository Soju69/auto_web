# Aurum Motors Platform

Локальная демо-платформа автосалона: публичный сайт с каталогом, формами заявок, trade-in и сервисом, а также CRM-админка для обработки обращений.

## Требования

- Node.js 22 или новее
- npm

## Быстрый запуск

1. Установите зависимости:

```bash
npm install
```

2. Создайте файл `.env` в корне проекта:

```env
DATABASE_URL="file:./dev.db"
```

3. Запустите локальный сервер:

```bash
npm run dev
```

4. Откройте проект в браузере:

```text
http://localhost:3000
```

Если порт `3000` занят, Next.js предложит другой порт, например `3001`.

## Основные страницы

- Главная: `http://localhost:3000`
- Каталог: `http://localhost:3000/catalog`
- Trade-In: `http://localhost:3000/trade-in`
- Сервис: `http://localhost:3000/service`
- Контакты: `http://localhost:3000/contact`
- Админка: `http://localhost:3000/admin`

## Как проверять заявки

Заявки сохраняются в локальную SQLite-базу `storage/aurum.sqlite`. При первом запуске база создается и заполняется стартовыми данными автоматически.

- Форма контакта попадает в админку: `/admin/leads`
- Покупка, кредит и тест-драйв из карточки автомобиля попадают в: `/admin/leads`
- Запись в сервис попадает в: `/admin/service`, а также создает лид в `/admin/leads`
- Trade-In попадает в: `/admin/trade-in`, а также создает лид в `/admin/leads`
- Фото из формы Trade-In сохраняются в `public/uploads/trade-in` и отображаются в заявке в админке

Если админка уже открыта во время отправки заявки, нажмите кнопку `Обновить данные` в верхнем блоке админки.

## Проверки перед передачей

```bash
npm run lint
npm run type-check
npm run build
```

## Локальные файлы

Эти файлы не отправляются в git и создаются только на машине тестировщика:

- `.env`
- `.next/`
- `node_modules/`
- `storage/`
- `public/uploads/`
- `dev-server*.log`

## Production-сборка

Собрать проект:

```bash
npm run build
```

Запустить production-режим после сборки:

```bash
npm run start
```

