# 🎂 Aplicación Web de Cumpleaños (Álbum & Scrapbook Interactivo)

Una experiencia web personal, interactiva y emocional con estética **Pastel + Moderna + Scrapbook Editorial**, construida con React 19, TypeScript, Vite y Tailwind CSS.

---

## 🚀 Inicio Rápido

### 1. Abrir en Visual Studio Code
Abre la carpeta:
```text
Documentos/key
```
(o `C:\Users\ramon\Documents\key`).

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:5173/`.

### 4. Acceder al Panel de Control / Editor
Visita:
```text
http://localhost:5173/#/admin
```
o haz clic en el icono discreto de ajustes en la parte inferior de la página.

---

## 🎨 Características Principales

- **Diseño Pastel Moderno:** Colores armoniosos (#F7C8D8, #DCCEF9, #C9E7F5, #CDEDDC, #F9E7A8, #FFD5C2, #FFF9F1) sin ninguna estética tradicional de boda.
- **Pantalla Intro Respetuosa con Autoplay:** Inicia la música suavemente al tocar "Entrar →".
- **Reproductor Flotante:** Con fallback de sintetizador ambiental Web Audio API para que siempre haya melodía aunque no se haya subido un archivo MP3.
- **Composición Editorial Hero:** Fotografía grande, insignias, blobs orgánicos e información editable.
- **Contador en Tiempo Real:** Años, meses, días, horas, minutos y segundos de relación.
- **Nuestra Historia (Scrapbook):** Recuerdos con composiciones visuales dinámicas, washi tapes y polariods.
- **Una Foto, Una Historia:** Revelación interactiva de la anécdota detrás de la imagen.
- **Galería Scrapbook con Lightbox:** Rotaciones sutiles (tilt), zoom, teclado (Esc, Flechas) y captions.
- **Nuestra Banda Sonora:** Playlist con canciones, anécdotas y previsualización.
- **Carta Personal:** Diseño crema espacioso con apertura y lectura progresiva.
- **Razones Editorial:** Lista numerada `01`, `02`, `03` con colores pastel.
- **Nota de Voz:** Reproductor waveform de audio personalizado.
- **Video Cinematográfico:** Reproductor para momentos especiales.
- **Random Memory:** Selector aleatorio animado de recuerdos.
- **¿Te Acuerdas? (Foto Borrosa):** Desafío de memoria interactivo con botón de revelado y confeti.
- **Calendario de Recuerdos:** Navegación por meses.
- **Estadísticas de Pareja:** Días juntos, amaneceres, recuerdos y momentos infinitos.
- **Sección Secreta:** Desbloqueo mediante contraseña o palabra secreta.
- **Sorpresas Finales:** Revelaciones progresivas con confeti.
- **Mini CMS `/admin` Completo:**
  - Vista previa en tiempo real (modo Móvil con marco de teléfono y modo Computadora).
  - Selector de paletas y color picker individual.
  - Guardado automático (Autosave) + Guardado manual.
  - Deshacer / Rehacer (Undo / Redo).
  - Historial de versiones y puntos de restauración.
  - Exportación e importación de `birthday-config.json`.
  - Control de visibilidad para cada sección.

---

## 📂 Estructura del Proyecto

```text
key/
├── public/
│   ├── assets/
│   │   ├── images/       # hero.jpg y fotografías
│   │   │   └── gallery/  # fotos del álbum scrapbook
│   │   ├── music/        # background.mp3 (música de fondo)
│   │   ├── audio/        # message.mp3 (nota de voz)
│   │   └── video/        # memory.mp4 (video cinematográfico)
│   └── favicon.svg       # Favicon pastel
├── src/
│   ├── admin/            # Mini CMS visual (/admin)
│   │   ├── tabs/         # Pestañas de configuración
│   │   ├── AdminCMS.tsx
│   │   └── PreviewPane.tsx
│   ├── components/       # Componentes de las secciones públicas
│   │   ├── IntroScreen.tsx
│   │   ├── FloatingMusicPlayer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CounterSection.tsx
│   │   ├── OurStorySection.tsx
│   │   ├── ScrapbookGallerySection.tsx
│   │   ├── LightboxModal.tsx
│   │   ├── LetterSection.tsx
│   │   ├── ReasonsSection.tsx
│   │   ├── VoiceMessageSection.tsx
│   │   └── ...
│   ├── config/           # Configuración central (siteConfig.ts, presets.ts)
│   ├── content/          # Datos por defecto (personal, recuerdos, cartas...)
│   ├── context/          # Estado reactivo, autosave y undo/redo (ConfigContext)
│   ├── styles/           # Variables CSS, temas, animaciones y responsive
│   ├── types/            # Tipos de TypeScript (SiteConfig, MemoryItem...)
│   ├── utils/            # Sintetizador ambiental Web Audio API
│   ├── App.tsx
│   └── main.tsx
├── COMO PERSONALIZAR ESTA PAGINA.md  # Guía detallada paso a paso
├── package.json
└── vite.config.ts
```

---

## 📖 Documentación para Personalizar
Para aprender a personalizar nombres, fotos, cartas, música, colores y sorpresas paso a paso, consulta el archivo:
👉 **[COMO PERSONALIZAR ESTA PAGINA.md](file:///C:/Users/ramon/Documents/key/COMO%20PERSONALIZAR%20ESTA%20PAGINA.md)**
