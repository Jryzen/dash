# Power Dash - Instruções de Deploy

## 📋 Informações do Servidor

- **Domínio:** juliorayser.great-site.net
- **Host MySQL:** sql209.infinityfree.com
- **Banco de Dados:** if0_39228567_portifolio
- **Usuário:** if0_39228567

## 🚀 Passos para Deploy

### 1. Preparar o Build da Aplicação

```bash
# No seu computador, execute:
npm run build
```

### 2. Upload dos Arquivos

#### Frontend (Pasta `dist/`)

Fazer upload de todos os arquivos da pasta `dist/` para:

```
/htdocs/
```

#### Backend PHP

Fazer upload da pasta `backend/` para:

```
/htdocs/backend/
```

### 3. Configurar o Banco de Dados

1. Acesse o phpMyAdmin em: https://if0.infinityfree.com/sql/
2. Faça login com suas credenciais
3. Selecione o banco `if0_39228567_portifolio`
4. Execute o arquivo `database/schema.sql` para criar as tabelas

### 4. Configurar a Senha do Banco

Edite o arquivo `/htdocs/backend/config/database.php` e adicione sua senha:

```php
private $password = "SUA_SENHA_AQUI";
```

### 5. Estrutura Final de Arquivos

```
/htdocs/
├── index.html                 # Página principal
├── favicon.svg               # Favicon do Power Dash
├── assets/                   # CSS, JS e outros assets
├── backend/
│   ├── api/
│   │   └── index.php        # API endpoints
│   ├── config/
│   │   └── database.php     # Configuração do banco
│   └── .htaccess           # Regras de reescrita
└── .htaccess               # Configuração do servidor
```

### 6. Configurar .htaccess Principal

Crie um arquivo `.htaccess` na raiz (`/htdocs/`) com:

```apache
RewriteEngine On

# Redirect to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/backend/
RewriteRule . /index.html [L]

# CORS Headers
Header always set Access-Control-Allow-Origin "https://juliorayser.great-site.net"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"

# Cache Control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 7. Testar a Aplicação

1. Acesse: https://juliorayser.great-site.net
2. Verifique se o dashboard carrega corretamente
3. Teste as funcionalidades de navegação
4. Verifique se a API está funcionando

### 8. Solução de Problemas

#### Se a API não funcionar:

1. Verifique se a senha do banco está correta
2. Confirme se os arquivos PHP têm permissão de execução
3. Verifique os logs de erro do servidor

#### Se o roteamento não funcionar:

1. Verifique se o `.htaccess` está na raiz
2. Confirme se o mod_rewrite está ativo

#### Se houver problemas de CORS:

1. Verifique os headers no `.htaccess`
2. Confirme se o domínio está correto na API

## 🔧 Configurações Adicionais

### Backup Automático

Configure backups regulares do banco de dados através do painel de controle.

### Monitoramento

Use as ferramentas do InfinityFree para monitorar o desempenho e uso de recursos.

### SSL/HTTPS

O InfinityFree fornece SSL gratuito. Certifique-se de que está ativado no painel de controle.

## 📞 Suporte

Se encontrar problemas, verifique:

1. Documentação do InfinityFree
2. Logs de erro no painel de controle
3. Console do navegador para erros JavaScript
