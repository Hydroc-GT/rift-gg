# ⚡ RIFT.GG — League of Legends Summoner Analytics & Meta Tier List

Una plataforma web moderna inspirada en **OP.GG** y **U.GG** para consultar estadísticas de invocadores de League of Legends en tiempo real, historial de partidas detallado, maestrías de campeones, gráficos de daño comparativo y tier list del meta actual.

Diseñada con una arquitectura modular en **React**, integración dinámica con **Data Dragon CDN** y **Riot Games API**, gestión de favoritos en `localStorage`, historial de navegación web fluido (`HTML5 History API`) y un sistema resiliente de **Modo Demo con Fallback Inteligente** para garantizar un funcionamiento continuo en portafolios y evaluaciones técnicas.

---

## 🌟 Características Principales

* 🎯 **Búsqueda Centralizada en Hero Section**: Búsqueda por `Invocador#TAG` o campeón con selector global de regiones (LAN, LAS, NA, EUW, EUNE, KR, BR, JP, OCE).
* ⚡ **Modo Demo con 1-Click Showcase**: Perfiles profesionales precargados (*Faker (KR)*, *G2 Caps (EUW)*, *Jojopyun (EUW)*) para evaluar la aplicación sin necesidad de configurar una API key.
* ⭐ **Gestión de Invocadores Favoritos**: Almacenamiento persistente en `localStorage` con acceso rápido de 1 clic en la pantalla de inicio.
* ⬅️➡️ **Navegación Web Fluida**: Integración con `HTML5 History API` (`pushState` y `popstate`) que permite usar las flechas del navegador (Atrás/Adelante) y compartir URLs directas a perfiles.
* 🛡️ **Perfil de Invocador Completo**:
  * Emblemas oficiales de rango (Hierro hasta Challenger) para Solo/Dúo y Flexible.
  * Puntos de Liga (LP), Win Rate porcentual y barra visual de victorias/derrotas.
  * Maestría de campeones con niveles, iconos dinámicos y puntos acumulados.
* ⚔️ **Historial de Partidas Avanzado**:
  * Tarjetas de partida con diferenciación visual de Victoria (azul) y Derrota (rojo).
  * KDA, ratio, participación en asesinatos (% KP) y badges de multikill (Doble, Triple, Quadra, Penta Kill, MVP).
  * Cuadrícula de 6 objetos + baratija con iconos dinámicos de Data Dragon.
  * Lista interactiva de los 10 participantes con salto directo a sus perfiles.
  * **Acordeón de Estadísticas Detalladas**: Gráficos comparativos de barras con daño total infligido a campeones por equipo.
* 📊 **Tier List & Meta Parche 26.16**: Clasificación de campeones por líneas (Top, Jungle, Mid, ADC, Support) con winrates, pickrates, banrates y peores counters.
* 🔑 **Gestión Segura de Riot API Key**: Modal para configurar llaves de Riot Games en tiempo real con persistencia en `localStorage`.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend**: React 19, JavaScript (ES6+), Vite 8
* **Iconografía & UI**: Lucide React, CSS Moderno (Vanilla CSS con variables de diseño, glassmorphism y dark gaming theme)
* **APIs & Fuentes de Datos**:
  * **Riot Games API** (Account-v1, Summoner-v4, League-v4, Champion-Mastery-v4, Match-v5)
  * **Data Dragon CDN & CommunityDragon** (Assets dinámicos de parches, campeones, items, runas y hechizos)
* **Almacenamiento Local**: `localStorage` (API Keys y favoritos)

---

## 🚀 Instalación y Uso Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/rift-gg.git
   cd rift-gg/opgg-inspired
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **(Opcional) Configurar API Key de Riot Games**:
   Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   Agrega tu llave obtenida en [Riot Developer Portal](https://developer.riotgames.com/):
   ```env
   VITE_RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
   *(Si no se configura ninguna llave, la app utilizará automáticamente el Modo Demo sin interrupciones)*.

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Autor & Contacto

Proyecto desarrollado para aprendizaje y demostración de desarrollo web moderno con React y APIs RESTful.
