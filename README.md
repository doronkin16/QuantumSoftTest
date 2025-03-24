Это приложение состоит из двух частей:
- **Фронтенд**: React-приложение, запускаемое через `npm`.
- **Бекенд**: Spring Boot приложение, предоставляющее REST API.

## Требования

- **Node.js** (версия 20.15.0 или выше)
- **npm** (версия 10.7.0)
- **Java** (версия 21 или выше)
- **Gradle** (версия 8.x или выше)

## Установка и запуск

### 1. Запуск бекенда (Spring Boot)

1. Перейдите в корневую директорию модуля backend.
```bash
   cd backend
```   
2. Соберите проект с помощью Gradle:
```bash
   ./gradlew clean bootRun
```   
Бекенд будет доступен по адресу: http://localhost:8080.

### 2. Запуск фронтенда (React)
1. Перейдите в корневую директорию модуля frontend.
```bash
   cd ..\frontend
``` 
2. Установите зависимости:
```bash
   npm install
```
3. Запустите фронтенд:
```bash
  npm start
```
Фронтенд будет доступен по адресу: http://localhost:3000.

