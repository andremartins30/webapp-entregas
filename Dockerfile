# Estágio de build
FROM node:18.17.0

WORKDIR /app

# Instalar corepack e yarn
RUN corepack enable && \
    corepack prepare yarn@4.8.1 --activate

# Copiar arquivos de configuração
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Instalar dependências
RUN yarn install

# Copiar o resto do código
COPY . .

# Build da aplicação
RUN yarn build

# Estágio de produção
FROM nginx:alpine

# Copiar os arquivos buildados para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]

# Expor a porta
EXPOSE 4173

# Comando para iniciar
CMD ["yarn", "preview", "--host"] 