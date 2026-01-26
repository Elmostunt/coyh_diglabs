# Configuración SEO - Sur Digital Labs

Este documento describe las configuraciones necesarias para optimizar el SEO del sitio web.

## 1. Redirecciones 301 (www y no-www)

### Para Google App Engine (app.yaml)

Si estás usando Google App Engine, añade estas reglas en `app.yaml`:

```yaml
handlers:
  # Redirección de www a no-www (o viceversa)
  - url: /.*
    script: auto
    secure: always
    redirect_http_response_code: 301
    headers:
      Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Para Nginx

Añade en tu configuración de Nginx:

```nginx
# Redirección www a no-www
server {
    listen 80;
    server_name www.surdigitallabs.cl;
    return 301 https://surdigitallabs.cl$request_uri;
}

server {
    listen 443 ssl;
    server_name www.surdigitallabs.cl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    return 301 https://surdigitallabs.cl$request_uri;
}
```

### Para Apache (.htaccess)

Añade en tu `.htaccess`:

```apache
# Redirección www a no-www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Redirección HTTP a HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 2. Compresión GZip/Brotli

### Para Google App Engine

App Engine comprime automáticamente las respuestas si el cliente lo soporta. Asegúrate de que tu `app.yaml` tenga:

```yaml
handlers:
  - url: /.*
    script: auto
    secure: always
    http_headers:
      X-Content-Type-Options: nosniff
      X-Frame-Options: DENY
```

### Para Nginx

Añade en tu configuración:

```nginx
# Compresión GZip
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
gzip_disable "msie6";

# Compresión Brotli (opcional, requiere módulo)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
```

### Para Apache (.htaccess)

Añade en tu `.htaccess`:

```apache
# Compresión GZip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

## 3. Verificación

### Verificar redirecciones 301

```bash
curl -I https://www.surdigitallabs.cl
# Debe retornar: HTTP/1.1 301 Moved Permanently
# Location: https://surdigitallabs.cl
```

### Verificar compresión

```bash
curl -H "Accept-Encoding: gzip" -I https://surdigitallabs.cl
# Debe incluir: Content-Encoding: gzip
```

O usar herramientas online:
- https://www.giftofspeed.com/gzip-test/
- https://tools.keycdn.com/gzip-test

## 4. Notas

- Estas configuraciones requieren acceso al servidor
- Para Google App Engine, las configuraciones se hacen en `app.yaml`
- Para servidores propios (Nginx/Apache), se requiere acceso root o de administrador
- Siempre prueba en un entorno de desarrollo antes de aplicar en producción
