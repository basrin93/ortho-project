# 1. Используем официальный образ Node.js
FROM node:20-alpine

# 2. !!! ВАЖНО: Устанавливаем OpenSSL для работы Prisma !!!
RUN apk add --no-cache openssl

# 3. Создаем рабочую директорию внутри контейнера
WORKDIR /app

# 4. Копируем файлы зависимостей
COPY package*.json ./
COPY prisma ./prisma/

# 5. Устанавливаем зависимости
RUN npm install

# 6. Генерируем клиент Prisma
# (Теперь это сработает, так как OpenSSL установлен)
RUN npx prisma generate

# 7. Копируем остальной исходный код
COPY . .

# 8. Собираем проект (компилируем TS в JS)
RUN npm run build

# 9. Команда для запуска приложения
CMD [ "npm", "run", "start:prod" ]