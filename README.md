# Recipes

### Web-приложение - сборник кулинарных рецептов

<br />

## Frontend
Angular CLI 11.2.8 / TypeScript 4.1.5

* Типизированные Reactive Forms
* Ограничение маршрутизации (Guards)
* Reactive State (NgRx) 
<br />

## Backend
ASP.NET Web API (.NET 5) / C# 9.0 / MS SQL Server 2019 / EF 5.0.6

* Controller -> Service -> Repository
* UnitOfWork
* Отдельные Builders и Mappers
* Отдача статики отдельным Контроллером
<br />

### NGINX - проксирование запросов между frontend и backend

<br />
<br />
<br />

# Примеры

Работа приложения: [Смотреть на YouTube](https://youtu.be/e33SQ_JwbFo)

Обработка ошибок и другое: [Смотреть на YouTube](https://youtu.be/M7GrGKqoFxs)

<br />
<br />
<br />

# Запуск приложения
Кто завернёт это в Docker - Красава! (Разбераюсь в некоторых деталях)

- ## Запуск NGINX
    - Установить NGINX: [Ссылка](https://nginx.org/ru/download.html)
    - Скопировать настройки `nginx.conf` в `{установленный nginx}/conf/nginx.conf`
    - Запустить nginx: `nginx.exe`
    
- ## Запуск frontend
    - Перейти в директорию RecipesFrontend
    - Выполнить: `npm run start`

- ## Запуск backend
    - Перейти в директорию Recipes.Api
    - Выполнить: `dotnet run`
    - Создать БД `Recipes` и в `appsettings.json` указать подключение к ней (там же нужно установить путь до статики)
