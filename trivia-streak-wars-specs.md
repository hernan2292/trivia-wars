# Trivia Streak Wars - Especificaciones Técnicas Completas

## 📋 Visión General del Producto

**Nombre**: Trivia Streak Wars  
**Categoría**: Gaming + Fintech  
**Plataforma**: World App Mini App  
**Tecnologías Core**: Laravel (Backend), React/Next.js (Frontend), Solidity (Smart Contracts)

### Propuesta de Valor
Plataforma de trivia con stakes reales donde usuarios compiten por conocimiento apostando pequeñas cantidades en USDC. El sistema de rachas multiplica las ganancias, creando un loop adictivo de engagement.

---

## 🎯 Características Principales

### 1. Sistema de Batallas (Duelos)

**Modalidades de Juego:**
- **1v1 Duel**: Dos jugadores, winner-takes-all (menos comisión)
- **Quick Match**: Matchmaking automático
- **Private Room**: Crea sala privada con código
- **Tournament Mode**: 8-16 jugadores, bracket elimination
- **Daily Free**: 3 partidas gratis diarias (sin stakes, premios patrocinados)

**Mecánica de Juego:**
- 10 preguntas por ronda
- 15 segundos por pregunta
- Puntuación: Corrección + Velocidad (bonus por responder rápido)
- Categorías: General, Tech, Crypto, Sports, History, Science, Pop Culture
- Dificultad: Fácil, Medio, Difícil (más stakes = más difícil)

### 2. Sistema de Stakes (Apuestas)

**Niveles de Entrada:**
- Rookie: $0.50 USDC
- Amateur: $1 USDC
- Pro: $3 USDC
- Legend: $5 USDC
- Custom: Hasta $20 USDC (solo private rooms)

**Distribución de Premios:**
- Winner: 85-90% del pool
- Platform Fee: 10-15% (ajustable)
- Streak Bonus: Opcional (de las comisiones acumuladas)

### 3. Sistema de Rachas (Streaks) 🔥

**Mecánica de Multiplicadores:**
```
Win Streak    | Multiplicador | Bonus Extra
--------------|---------------|-------------
1 win         | 1.0x          | -
3 wins        | 1.1x          | Badge
5 wins        | 1.25x         | +$0.50 bonus
10 wins       | 1.5x          | +$2 bonus
20 wins       | 2.0x          | +$5 bonus + NFT Badge
50 wins       | 3.0x          | +$20 bonus + Legendary NFT
```

**Reglas:**
- La racha se rompe con 1 derrota
- Los multiplicadores solo aplican a las ganancias netas (no al stake original)
- Los bonuses vienen de un pool especial (% de las comisiones)

### 4. Sistema de Ranking & Leaderboard

**Rankings Globales:**
- Top 100 All-Time
- Top 50 Monthly
- Top 20 Weekly
- Top 10 Daily

**Stats Públicas:**
- Win Rate %
- Total Wins
- Current Streak
- Max Streak Ever
- Total Earned
- Favorite Category
- Average Response Time

**Rewards para Top Players:**
- Top 3 Monthly: $100, $50, $25 en WLD
- Top 10 Weekly: NFT Badges exclusivos
- Hall of Fame: Reconocimiento permanente

### 5. Anti-Cheating & Fair Play

**Medidas de Seguridad:**
- World ID obligatorio (1 cuenta = 1 persona real)
- Detección de patrones sospechosos (tiempo respuesta, precisión anormal)
- Sistema de reportes de usuarios
- Revisión manual de rachas 10+
- Rate limiting en requests
- Preguntas random desde pool grande (20k+)
- Time sync server-side (no manipulación de tiempo cliente)
- Validación de respuestas en backend (nunca en frontend)

---

## 🏗️ Arquitectura Técnica

### Tech Stack

**Frontend:**
- Framework: Next.js 14 (App Router)
- UI: Tailwind CSS + shadcn/ui
- State: Zustand o React Context
- Web3: @worldcoin/minikit-js
- HTTP Client: Axios
- Animations: Framer Motion

**Backend:**
- Framework: Laravel 11
- Database: MySQL 8.0
- Cache: Redis
- Queue: Laravel Queue (Redis driver)
- WebSockets: Laravel Reverb o Pusher
- Auth: Laravel Sanctum + World ID verification

**Blockchain:**
- Network: World Chain (L2 Optimism)
- Smart Contracts: Solidity 0.8.x
- Tools: Foundry (testing), Hardhat (deployment)
- Wallet Integration: MiniKit SDK

**DevOps:**
- Hosting: AWS EC2 o DigitalOcean
- CDN: CloudFlare
- CI/CD: GitHub Actions
- Monitoring: Laravel Telescope + Sentry

### Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────┐
│         World App (Mini App WebView)            │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────┐    │
│  │   Next.js Frontend (React)            │    │
│  │   - MiniKit SDK Integration           │    │
│  │   - Real-time Game UI                 │    │
│  │   - Wallet Connection                 │    │
│  └───────────────┬───────────────────────┘    │
│                  │                              │
└──────────────────┼──────────────────────────────┘
                   │ HTTPS/WSS
                   ▼
┌─────────────────────────────────────────────────┐
│           Laravel Backend API                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐  ┌──────────────┐           │
│  │ REST API     │  │ WebSocket    │           │
│  │ Endpoints    │  │ Server       │           │
│  └──────────────┘  └──────────────┘           │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐           │
│  │ Game Engine  │  │ Matchmaking  │           │
│  │ Logic        │  │ Service      │           │
│  └──────────────┘  └──────────────┘           │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐           │
│  │ Questions    │  │ Streak       │           │
│  │ Manager      │  │ Calculator   │           │
│  └──────────────┘  └──────────────┘           │
│                                                 │
└─────────────┬───────────────┬───────────────────┘
              │               │
              ▼               ▼
    ┌──────────────┐  ┌──────────────┐
    │   MySQL      │  │    Redis     │
    │   Database   │  │    Cache     │
    └──────────────┘  └──────────────┘
              │
              │ Web3.js/Ethers.js
              ▼
┌─────────────────────────────────────────────────┐
│          World Chain (Blockchain)               │
├─────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐      │
│  │   Smart Contracts (Solidity)         │      │
│  │   - StakePool.sol                    │      │
│  │   - GameRegistry.sol                 │      │
│  │   - StreakRewards.sol                │      │
│  └──────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
```

---

## 💾 Modelo de Datos (Base de Datos)

### Tablas Principales

**users**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
wallet_address  VARCHAR(42) UNIQUE NOT NULL
world_id        VARCHAR(255) UNIQUE NOT NULL
username        VARCHAR(50) UNIQUE
avatar_url      VARCHAR(255)
total_games     INT DEFAULT 0
total_wins      INT DEFAULT 0
total_earned    DECIMAL(20,8) DEFAULT 0
current_streak  INT DEFAULT 0
max_streak      INT DEFAULT 0
is_verified     BOOLEAN DEFAULT FALSE
is_banned       BOOLEAN DEFAULT FALSE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**games**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
game_code       VARCHAR(10) UNIQUE
game_type       ENUM('1v1', 'tournament', 'free') NOT NULL
stake_amount    DECIMAL(20,8) NOT NULL
category        VARCHAR(50)
difficulty      ENUM('easy', 'medium', 'hard')
status          ENUM('waiting', 'in_progress', 'completed', 'cancelled')
winner_id       BIGINT UNSIGNED NULL
pool_total      DECIMAL(20,8)
platform_fee    DECIMAL(20,8)
started_at      TIMESTAMP NULL
ended_at        TIMESTAMP NULL
created_at      TIMESTAMP
updated_at      TIMESTAMP

FOREIGN KEY (winner_id) REFERENCES users(id)
INDEX idx_status (status)
INDEX idx_created_at (created_at)
```

**game_participants**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
game_id         BIGINT UNSIGNED NOT NULL
user_id         BIGINT UNSIGNED NOT NULL
score           INT DEFAULT 0
correct_answers INT DEFAULT 0
avg_response_time DECIMAL(10,2)
rank            INT
prize_amount    DECIMAL(20,8) DEFAULT 0
joined_at       TIMESTAMP
finished_at     TIMESTAMP NULL

FOREIGN KEY (game_id) REFERENCES games(id)
FOREIGN KEY (user_id) REFERENCES users(id)
UNIQUE KEY unique_game_user (game_id, user_id)
INDEX idx_game_id (game_id)
```

**questions**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
category        VARCHAR(50) NOT NULL
difficulty      ENUM('easy', 'medium', 'hard') NOT NULL
question_text   TEXT NOT NULL
correct_answer  VARCHAR(255) NOT NULL
wrong_answer_1  VARCHAR(255) NOT NULL
wrong_answer_2  VARCHAR(255) NOT NULL
wrong_answer_3  VARCHAR(255) NOT NULL
explanation     TEXT NULL
times_used      INT DEFAULT 0
correct_rate    DECIMAL(5,2)
is_active       BOOLEAN DEFAULT TRUE
created_at      TIMESTAMP
updated_at      TIMESTAMP

INDEX idx_category_difficulty (category, difficulty)
INDEX idx_active (is_active)
```

**game_questions**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
game_id         BIGINT UNSIGNED NOT NULL
question_id     BIGINT UNSIGNED NOT NULL
question_order  TINYINT NOT NULL
time_limit      INT DEFAULT 15

FOREIGN KEY (game_id) REFERENCES games(id)
FOREIGN KEY (question_id) REFERENCES questions(id)
INDEX idx_game_id (game_id)
```

**user_answers**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
game_id         BIGINT UNSIGNED NOT NULL
user_id         BIGINT UNSIGNED NOT NULL
question_id     BIGINT UNSIGNED NOT NULL
answer_given    VARCHAR(255)
is_correct      BOOLEAN
response_time   DECIMAL(10,2)
points_earned   INT
answered_at     TIMESTAMP

FOREIGN KEY (game_id) REFERENCES games(id)
FOREIGN KEY (user_id) REFERENCES users(id)
FOREIGN KEY (question_id) REFERENCES questions(id)
INDEX idx_game_user (game_id, user_id)
```

**streaks**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
user_id         BIGINT UNSIGNED NOT NULL
current_streak  INT DEFAULT 0
max_streak      INT DEFAULT 0
last_win_at     TIMESTAMP NULL
streak_broken_at TIMESTAMP NULL
total_bonuses   DECIMAL(20,8) DEFAULT 0
updated_at      TIMESTAMP

FOREIGN KEY (user_id) REFERENCES users(id)
UNIQUE KEY unique_user (user_id)
```

**transactions**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
user_id         BIGINT UNSIGNED NOT NULL
game_id         BIGINT UNSIGNED NULL
type            ENUM('stake', 'win', 'fee', 'bonus', 'refund')
amount          DECIMAL(20,8) NOT NULL
tx_hash         VARCHAR(66) NULL
status          ENUM('pending', 'confirmed', 'failed')
created_at      TIMESTAMP
updated_at      TIMESTAMP

FOREIGN KEY (user_id) REFERENCES users(id)
FOREIGN KEY (game_id) REFERENCES games(id)
INDEX idx_user_id (user_id)
INDEX idx_tx_hash (tx_hash)
```

**leaderboards**
```sql
id              BIGINT UNSIGNED PRIMARY KEY
user_id         BIGINT UNSIGNED NOT NULL
period          ENUM('daily', 'weekly', 'monthly', 'all_time')
rank            INT NOT NULL
total_wins      INT DEFAULT 0
total_earned    DECIMAL(20,8) DEFAULT 0
games_played    INT DEFAULT 0
win_rate        DECIMAL(5,2)
snapshot_date   DATE NOT NULL
created_at      TIMESTAMP

FOREIGN KEY (user_id) REFERENCES users(id)
UNIQUE KEY unique_user_period_date (user_id, period, snapshot_date)
INDEX idx_period_rank (period, rank)
```

---

## 🔐 Smart Contracts (Solidity)

### Contratos Principales

**1. StakePool.sol**
```solidity
// Gestiona el pool de stakes y distribución de premios
contract StakePool {
    // Depositar stake para entrar a un juego
    function depositStake(bytes32 gameId, uint256 amount) external
    
    // Distribuir premios al finalizar juego
    function distributePrizes(bytes32 gameId, address[] winners, uint256[] amounts) external
    
    // Retirar ganancias acumuladas
    function withdraw() external
    
    // Obtener balance de usuario
    function getBalance(address user) external view returns (uint256)
}
```

**2. GameRegistry.sol**
```solidity
// Registro de juegos activos
contract GameRegistry {
    // Crear nuevo juego
    function createGame(bytes32 gameId, uint256 stakeAmount) external
    
    // Finalizar juego y declarar ganador
    function finalizeGame(bytes32 gameId, address winner) external
    
    // Cancelar juego (devuelve stakes)
    function cancelGame(bytes32 gameId) external
}
```

**3. StreakRewards.sol**
```solidity
// Sistema de bonos por rachas
contract StreakRewards {
    // Registrar victoria y actualizar racha
    function recordWin(address user) external
    
    // Calcular bonus según racha
    function calculateBonus(address user) external view returns (uint256)
    
    // Distribuir bonus
    function distributeBonus(address user) external
}
```

---

## 🔄 Flujos de Usuario

### Flujo 1: Registro e Inicio

1. Usuario abre Mini App desde World App
2. MiniKit detecta wallet y World ID
3. Backend verifica World ID (one-time)
4. Usuario crea username
5. Redirige a Dashboard

### Flujo 2: Jugar Quick Match (1v1)

1. Usuario selecciona "Quick Match" + stake amount
2. Backend busca oponente con mismo stake
3. Si encuentra match → crea game
4. Si no encuentra → espera en pool (max 60s)
5. Usuarios depositan stakes via MiniKit.pay()
6. Smart contract confirma depósito
7. Game empieza (WebSocket sync)
8. Se muestran 10 preguntas secuencialmente
9. Respuestas enviadas a backend en real-time
10. Backend calcula scores
11. Declara ganador
12. Smart contract distribuye premios
13. Actualiza streaks y stats
14. Muestra pantalla de resultados

### Flujo 3: Cobrar Ganancias

1. Usuario ve balance disponible
2. Click en "Withdraw"
3. Backend verifica balance
4. Llama a smart contract withdraw()
5. USDC se transfiere a wallet del usuario
6. Notificación de éxito

### Flujo 4: Sistema de Rachas

1. Usuario gana un juego
2. Backend actualiza `current_streak++`
3. Verifica si alcanzó milestone (3, 5, 10, 20, 50)
4. Si alcanzó milestone:
   - Calcula bonus correspondiente
   - Llama a StreakRewards.distributeBonus()
   - Otorga badge/NFT si corresponde
   - Envía notificación celebratoria
5. Si pierde: `current_streak = 0`, guarda `max_streak` si es nuevo récord

---

## 🎨 Diseño UI/UX (Key Screens)

### 1. Home Screen
- Balance USDC/WLD
- Current Streak (grande y destacado)
- Botones: Quick Match, Create Room, Tournaments
- Daily Free Plays restantes
- Mini leaderboard (top 5)

### 2. Matchmaking Screen
- Spinner "Finding opponent..."
- Timer countdown (60s)
- Opción para cancelar
- Stake amount visible

### 3. Game Screen
- Pregunta en grande
- 4 opciones (A, B, C, D)
- Timer countdown circular (15s)
- Score actual de ambos jugadores
- Pregunta X de 10

### 4. Results Screen
- Winner badge/animation
- Score breakdown
- Earnings (con multiplicador de streak si aplica)
- Botones: Play Again, View Stats, Home
- "Streak Bonus Unlocked!" si corresponde

### 5. Profile Screen
- Avatar + Username
- Stats cards: Win Rate, Total Wins, Max Streak
- Badges/NFTs coleccionados
- Transaction history
- Settings

### 6. Leaderboard Screen
- Tabs: Daily, Weekly, Monthly, All-Time
- Lista con rank, username, wins, earnings
- Highlight del usuario actual
- Scroll infinito

---

## 📊 Monetización Detallada

### Fuentes de Ingreso

**1. Comisión por Juego (Primary Revenue)**
- 10% en juegos $0.50 - $1
- 7.5% en juegos $1 - $3
- 5% en juegos $3 - $5
- 15% en juegos $5+ (premium)

**Proyección Conservadora:**
- 1,000 usuarios activos diarios
- 3 juegos promedio por usuario/día
- Stake promedio: $1.50
- Comisión promedio: 8%

```
Ingresos diarios = 1,000 users × 3 games × $1.50 × 8%
                 = $360/día
                 = $10,800/mes
                 = $129,600/año
```

**2. Torneos Premium (Secondary Revenue)**
- Entry fee: $10-20 por torneo
- Comisión: 15-20%
- 2 torneos semanales con 50 jugadores = $200-400/semana

**3. Patrocinios (Future Revenue)**
- Brands patrocinan "Daily Free" games
- $500-1000 por día patrocinado
- Questions branded

**4. NFT Badges (Optional Revenue)**
- Venta de badges especiales: $5-20
- Marketplace fee: 2.5%

### Distribución de Fondos

- 85% → Winners
- 10% → Platform (operating costs, profit)
- 3% → Streak Bonus Pool
- 2% → Tournament Prize Pool

---

## 🔒 Consideraciones de Seguridad

### Prevención de Fraude

1. **World ID Obligatorio**
   - Verificación en cada login
   - No se puede crear múltiples cuentas

2. **Validación Server-Side**
   - Todas las respuestas se validan en backend
   - Frontend solo display, no lógica

3. **Time Sync**
   - Server timestamp authoritative
   - Cliente no puede manipular timer

4. **Rate Limiting**
   - Max 1 respuesta por pregunta
   - Max 50 requests por minuto por IP

5. **Pattern Detection**
   - Monitoreo de win rate anormal (>95%)
   - Detección de response time sospechoso (<1s promedio)
   - Flagging automático para revisión

6. **Smart Contract Security**
   - Auditoría antes de mainnet
   - Multisig wallet para admin functions
   - Emergency pause function
   - Reentrancy guards

### Manejo de Disputas

- Sistema de reportes
- Review manual para streaks 20+
- Refund policy clara
- Soporte via Telegram/Discord

---

## 🚀 Plan de Desarrollo por Fases

### Fase 1: MVP (4-6 semanas)
**Objetivo**: Validar concepto con features mínimas

**Deliverables:**
- [ ] Backend Laravel con API REST básica
- [ ] Frontend Next.js con UI simple
- [ ] Integración MiniKit (wallet, World ID)
- [ ] Smart contracts básicos (Testnet)
- [ ] Quick Match 1v1 (categoría General)
- [ ] 500 preguntas seeded
- [ ] Sistema básico de streaks (sin bonos)
- [ ] Leaderboard simple

**No incluye:**
- Torneos
- NFT Badges
- Daily Free
- Categorías múltiples

### Fase 2: Beta Pública (2-3 semanas)
**Objetivo**: Feedback de usuarios reales

**Nuevas Features:**
- [ ] 2000+ preguntas (múltiples categorías)
- [ ] Private Rooms con códigos
- [ ] Streak bonuses activados
- [ ] Transaction history
- [ ] Profile stats completos
- [ ] Smart contracts en Mainnet
- [ ] Deploy producción

**Testing:**
- 100 beta testers invitados
- Bug bounty programa
- Recolección de feedback

### Fase 3: Lanzamiento Completo (3-4 semanas)
**Objetivo**: Feature-complete para público general

**Nuevas Features:**
- [ ] Tournaments (8-16 jugadores)
- [ ] Daily Free games (3 diarias)
- [ ] NFT Badge system
- [ ] Enhanced leaderboards (multi-period)
- [ ] Referral system
- [ ] Push notifications
- [ ] Multi-idioma (ES, EN, PT)

### Fase 4: Growth & Optimization (Ongoing)
**Objetivo**: Escalar usuarios y mejorar retención

**Actividades:**
- Marketing en comunidades crypto
- Partnerships con sponsors
- AI para generar preguntas
- Mobile app nativa (opcional)
- Cross-platform tournaments
- Seasonal events
- VIP tier con benefits

---

## 📈 KPIs y Métricas

### Métricas de Usuario
- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- Retention Rate (D1, D7, D30)
- Avg. Games per User per Day
- Avg. Session Duration
- Churn Rate

### Métricas de Engagement
- Total Games Played
- Avg. Stake Amount
- Win Rate Distribution
- Streak Distribution (% usuarios con streak 5+)
- Category Popularity

### Métricas Financieras
- Daily Revenue
- Monthly Recurring Revenue (MRR)
- Avg. Revenue per User (ARPU)
- Total Value Locked (TVL) en smart contracts
- Platform Fee collected
- Payout to Users

### Métricas Técnicas
- API Response Time (p95)
- WebSocket latency
- Smart Contract Gas Costs
- Database Query Performance
- Error Rate
- Uptime %

---

## 🛠️ APIs Externas Necesarias

### 1. World App APIs
- **World ID Verification**: Para validar identidad
- **MiniKit Wallet**: Para pagos USDC
- **MiniKit Notifications**: Para alertas push

### 2. Blockchain APIs
- **Alchemy/Infura**: RPC node para World Chain
- **Etherscan API**: Para verificar transacciones

### 3. Contenido (Opcional Future)
- **OpenTriviaDB**: Base de datos de preguntas (free)
- **OpenAI API**: Generar preguntas únicas (paid)
- **Unsplash API**: Imágenes para preguntas visuales

### 4. Monitoring & Analytics
- **Sentry**: Error tracking
- **PostHog/Mixpanel**: User analytics
- **Google Analytics**: Web analytics

---

## 🌍 Internacionalización (i18n)

### Idiomas Objetivo (Fase 3+)
1. Español (primary)
2. Inglés (primary)
3. Portugués (mercado Brasil)
4. Francés (África francófona)

### Consideraciones
- Preguntas traducidas o localizadas
- UI strings en JSON
- Currency display según región
- Timezone handling

---

## ⚖️ Compliance Legal

### Consideraciones Regulatorias

**Gambling Laws:**
- Skill-based game (no azar) → Generalmente legal
- Pero varía por jurisdicción
- Consultar abogado especializado

**Recomendaciones:**
- Terms of Service claros
- Age restriction (18+)
- Geoblocking para jurisdicciones prohibidas
- KYC opcional para high rollers ($100+)

**Protección al Consumidor:**
- Responsible gaming features
- Limits de stakes diarios ($50-100 max)
- Self-exclusion option
- Transparent odds disclosure

---

## 📱 Estrategia de Lanzamiento

### Pre-Launch (2 semanas antes)
- [ ] Landing page con waitlist
- [ ] Social media presence (Twitter, Telegram)
- [ ] Partnerships con World App influencers
- [ ] Beta tester recruitment
- [ ] Press kit preparado

### Launch Day
- [ ] Submit a World App Store
- [ ] Post en World Discord/Telegram
- [ ] Tweet announcement
- [ ] Free USDC airdrops para primeros 100 usuarios
- [ ] Launch tournament con $500 prize pool

### Post-Launch (1 mes)
- [ ] Daily engagement en communities
- [ ] Weekly tournaments
- [ ] User-generated content contests
- [ ] Referral program activado
- [ ] Feature en World App newsletter (si posible)

---

## 🔮 Roadmap Futuro (Post-Launch)

### Q1 Post-Launch
- Modo "Team Battles" (2v2, 3v3)
- Custom question packs (user-created)
- Seasonal themes & events
- Integration con World ID badges

### Q2 Post-Launch
- Native mobile apps (iOS/Android)
- Streaming integration (Twitch)
- Creator tools (make your own trivia)
- Scholarship program (play-to-earn for students)

### Q3 Post-Launch
- Cross-chain support (other L2s)
- DAO governance token
- Staking mechanisms
- B2B licensing (white-label)

---

## 💡 Diferenciadores vs. Competencia

**vs. HQ Trivia (RIP):**
- ✅ Crypto-native payouts
- ✅ 1v1 skill matches (no solo broadcasts)
- ✅ Streak system para engagement
- ✅ Anti-bot via World ID

**vs. Kahoot:**
- ✅ Real money stakes
- ✅ Adult-focused content
- ✅ Competitive leaderboards
- ✅ Peer-to-peer matches

**vs. Web3 Gambling dApps:**
- ✅ Skill-based (no pure luck)
- ✅ Integrated en super app (World)
- ✅ Humans-only (no bots)
- ✅ Educational value

---

## 📞 Soporte & Comunidad

### Canales de Soporte
- Telegram grupo oficial
- Discord server
- Email: support@triviastreakwars.com
- FAQ in-app
- Video tutorials

### Construcción de Comunidad
- Weekly AMA con developers
- Featured player of the week
- Community tournaments
- Bug bounty program
- Ambassador program

---

## ✅ Criterios de Éxito (3 meses post-launch)

### Mínimo Viable
- 1,000 DAU
- 5,000 MAU
- 70% D1 retention
- 40% D7 retention
- $5,000 MRR

### Target Ambicioso
- 5,000 DAU
- 25,000 MAU
- 80% D1 retention
- 50% D7 retention
- $25,000 MRR
- Featured in World App Store

### Stretch Goals
- 10,000+ DAU
- Partnership con brands
- Media coverage (TechCrunch, etc)
- $50,000+ MRR

---

## 📝 Notas Finales

Esta especificación es un living document que debe actualizarse conforme avanza el desarrollo. Priorizar MVP rápido para validar el concepto antes de invertir en features avanzadas.

**Next Steps:**
1. ✅ Specs completas (este documento)
2. ⏭️ Crear prompt técnico para Claude Code
3. ⏭️ Setup repos (frontend, backend, contracts)
4. ⏭️ Comenzar desarrollo MVP

---

**Documento creado**: Diciembre 2025  
**Versión**: 1.0  
**Autor**: Hernan (PHP/Laravel Developer)  
**Para**: Trivia Streak Wars - World App Mini App
