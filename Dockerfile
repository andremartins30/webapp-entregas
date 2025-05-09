# Estágio de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de configuração
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Instalar dependências
RUN yarn install --immutable

# Copiar código fonte
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