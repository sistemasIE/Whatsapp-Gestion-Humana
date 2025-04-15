# Usa una imagen oficial de Node.js
FROM node:22

# Crea el directorio de la app
WORKDIR /usr/app

# Copia los archivos de tu bot
COPY . .

# Instala dependencias
RUN npm install

# Expone el puerto que uses (si aplica)
EXPOSE 3001

# Comando para iniciar tu bot
CMD ["node", "index.js"]
