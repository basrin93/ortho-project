# 1. Используем официальный образ Node.js
FROM node:20-alpine

# 2. Создаем рабочую директорию внутри контейнера
WORKDIR /app

# 3. Копируем файлы зависимостей
COPY package*.json ./
COPY prisma ./prisma/

# 4. Устанавливаем зависимости
RUN npm install

# 5. Генерируем клиент Prisma
RUN npx prisma generate

# 6. Копируем остальной исходный код
COPY . .

# 7. Собираем проект (компилируем TS в JS)
RUN npm run build

# 8. Команда для запуска приложения
CMD [ "npm", "run", "start:prod" ]