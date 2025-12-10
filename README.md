# Trivia Streak Wars

**Trivia Streak Wars** es una Mini App para World App donde los usuarios compiten en batallas de trivia, apostando USDC y ganando premios basados en sus conocimientos y rachas de victorias.

## 🚀 Stack Tecnológico

### Backend
- **Framework**: Laravel 11.x (PHP 8.2+)
- **Base de Datos**: MySQL 8.0
- **Cache/Queue**: Redis 7.x
- **WebSockets**: Laravel Reverb
- **Autenticación**: Laravel Sanctum + World ID

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 3.4
- **Internacionalización**: next-intl (Soporte EN/ES)
- **Web3**: @worldcoin/minikit-js

### Blockchain & Smart Contracts
- **Red**: World Chain Testnet (Sepolia)
- **Herramientas**: Foundry (Forge, Anvil)

### Infraestructura Local
- **Docker Compose**: MySQL, Redis, Mailhog

## 📂 Estructura del Proyecto

```
trivia-streak-wars/
├── backend/           # API Laravel
├── frontend/          # Aplicación Next.js
├── contracts/         # Smart Contracts (Foundry)
├── docker-compose.yml # Configuración de servicios locales
└── README.md          # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Docker & Docker Compose
- PHP 8.2+ & Composer
- Node.js 18+ & npm
- Foundry (para contratos inteligentes)

### 1. Iniciar Servicios de Infraestructura
Levanta las bases de datos y servicios auxiliares con Docker:

```bash
docker-compose up -d
```

### 2. Configuración del Backend (Laravel)

```bash
cd backend

# Instalar dependencias
composer install

# Configurar variables de entorno
cp .env.example .env
# Editar .env para conectar a la DB del docker (DB_HOST=127.0.0.1, DB_PORT=3306, etc.)

# Generar llave de aplicación
php artisan key:generate

# Ejecutar migraciones
php artisan migrate

# Iniciar servidor de desarrollo
php artisan serve
```

### 3. Configuración del Frontend (Next.js)

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.
- Versión en Inglés: `http://localhost:3000/en`
- Versión en Español: `http://localhost:3000/es`

## 🌍 Internacionalización (i18n)

El frontend soporta múltiples idiomas utilizando `next-intl`.
- Los archivos de traducción se encuentran en `frontend/messages/`.
- El middleware detecta automáticamente el idioma o utiliza el prefijo en la URL.

## 🧪 Testing

- **Backend**: `php artisan test` (Pest PHP)
- **Smart Contracts**: `forge test`

---
Desarrollado para el ecosistema World App.
