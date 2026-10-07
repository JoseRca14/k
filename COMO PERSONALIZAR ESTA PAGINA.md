# 🌸 Guía Completa: Cómo Personalizar esta Página

¡Bienvenido! Este proyecto fue creado con una arquitectura limpia, profesional y moderna. Tienes **dos formas** muy sencillas de personalizar absolutamente todo:

1. **Desde la interfaz visual interactiva (`/admin`)**: Sin tocar código, con vista previa en tiempo real en móvil y computadora, guardado automático, historial de versiones y exportación a JSON.
2. **Directamente desde Visual Studio Code**: Editando los archivos en `src/config/siteConfig.ts` o en `src/content/`.

---

## 1. Cómo abrir el proyecto en Visual Studio Code

1. Abre **Visual Studio Code**.
2. Ve al menú superior: **Archivo (File) → Abrir carpeta... (Open Folder...)**.
3. Selecciona exactamente la carpeta:
   ```text
   Documentos/key
   ```
   (o en ruta completa: `C:\Users\ramon\Documents\key`).
4. ¡Listo! Verás toda la estructura de carpetas del proyecto en la barra lateral izquierda.

---

## 2. Cómo instalar dependencias

Abre la terminal integrada en Visual Studio Code presionando `Ctrl + \`` (o ve a **Terminal → Nueva Terminal**) y ejecuta:

```bash
npm install
```

---

## 3. Cómo ejecutar el proyecto

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
npm run dev
```

En la terminal aparecerá una dirección local (por ejemplo `http://localhost:5173/`).
- Haz `Ctrl + Clic` en el enlace para abrir la página pública en tu navegador.
- Para entrar al panel de administración, ve a:
  ```text
  http://localhost:5173/#/admin
  ```
  (o haz clic en el icono discreto de engranaje al final de la página).

---

## 4. Cómo cambiar el nombre de tu novia
- **Desde `/admin`**: Ve a la pestaña **Contenido General** y cambia el campo **"Nombre de tu novia"**.
- **Desde VS Code**: Abre [src/content/personal.ts](file:///C:/Users/ramon/Documents/key/src/content/personal.ts) y edita `recipientName: 'Sofía'`.

---

## 5. Cómo cambiar tu nombre
- **Desde `/admin`**: Pestaña **Contenido General** → campo **"Tu nombre"**.
- **Desde VS Code**: Abre [src/content/personal.ts](file:///C:/Users/ramon/Documents/key/src/content/personal.ts) y edita `senderName: 'Ramón'`.

---

## 6. Cómo cambiar las fechas
- **Cumpleaños**: Pestaña **Contenido General** → **Fecha de Cumpleaños** (ej: `14 de Octubre`).
- **Fecha de Inicio de Relación (Contador)**: Cambia la fecha en formato año-mes-día (`YYYY-MM-DD`, ej: `2023-04-15`). El contador calculará automáticamente años, meses, días, horas y segundos exactos.
- **En VS Code**: Edita `birthDate` y `relationshipStartDate` en [src/content/personal.ts](file:///C:/Users/ramon/Documents/key/src/content/personal.ts).

---

## 7. Cómo escribir y editar cartas
- **Desde `/admin`**: Ve a la pestaña **Carta Personal**. Puedes cambiar el título, subtítulo, fecha de cierre y agregar, editar o eliminar cada párrafo de la carta con el botón **+ Agregar párrafo**.
- **Desde VS Code**: Abre [src/content/letters.ts](file:///C:/Users/ramon/Documents/key/src/content/letters.ts) y edita el arreglo `paragraphs: [...]`.

---

## 8. Cómo cambiar colores y paletas pastel
- **Desde `/admin`**: Ve a la pestaña **Apariencia & Colores**.
  - Puedes hacer clic en cualquiera de los presets pastel:
    * **Pastel Mix** (Predeterminado)
    * **Soft Pink**
    * **Lavender Dream**
    * **Sky Blue**
    * **Mint & Sage**
    * **Warm Peach**
  - O usar el **Color Picker** para afinar tonos específicos (`Rosa`, `Lavanda`, `Cielo`, `Menta`, `Amarillo`, `Durazno`, etc.).
- **Desde VS Code**: Edita los valores hexadecimales en [src/styles/variables.css](file:///C:/Users/ramon/Documents/key/src/styles/variables.css) o en [src/config/presets.ts](file:///C:/Users/ramon/Documents/key/src/config/presets.ts).

---

## 9. Cómo cambiar tipografías
- **Desde `/admin`**: Pestaña **Apariencia & Colores** → **Tipografías & Textos**. Selecciona la fuente sans-serif para la interfaz y la fuente serif editorial para frases.
- **Desde VS Code**: Puedes cambiar las variables en [src/styles/variables.css](file:///C:/Users/ramon/Documents/key/src/styles/variables.css) (`--font-sans` y `--font-serif`).

---

## 10. Cómo agregar fotos
Tienes dos opciones:
1. **Subir archivos directamente**: En el panel `/admin` (en **Galería Scrapbook** o **Recuerdos**), usa el botón **Subir** para cargar fotos desde tu computadora o celular.
2. **Copiar archivos a la carpeta**:
   - Guarda tu foto principal en `public/assets/images/hero.jpg`.
   - Guarda las fotos de recuerdos en `public/assets/images/gallery/` (ej: `photo1.jpg`, `photo2.jpg`, etc.).

---

## 11. Cómo agregar y reordenar recuerdos
- **Desde `/admin`**: Ve a la pestaña **Recuerdos (Historia)**.
  - Haz clic en **+ Agregar recuerdo**.
  - Define la fecha, título, historia, color pastel y foto.
  - Puedes usar las flechas **↑** y **↓** para cambiar el orden en que aparecen.
- **Desde VS Code**: Edita el arreglo `defaultMemories` en [src/content/memories.ts](file:///C:/Users/ramon/Documents/key/src/content/memories.ts).

---

## 12. Cómo agregar canciones (Playlist)
- **Desde `/admin`**: Ve a la pestaña **Banda Sonora**.
  - Haz clic en **+ Agregar canción**.
  - Ingresa título, artista, descripción del recuerdo y carátula.
  - Puedes ingresar la ruta a un archivo `.mp3` en `public/assets/music/` o una URL de audio.
- **Desde VS Code**: Edita [src/content/songs.ts](file:///C:/Users/ramon/Documents/key/src/content/songs.ts).

---

## 13. Cómo agregar nota de voz personal
1. Graba un audio en tu teléfono (felicitación, mensaje especial o saludo).
2. Guarda el archivo en `public/assets/audio/message.mp3` o súbelo desde `/admin` en la pestaña **Música & Audio → Nota de Voz Personal**.
3. El reproductor mostrará automáticamente la animación de ondas de audio personalizadas.

---

## 14. Cómo agregar videos
1. Guarda tu video favorito en `public/assets/video/memory.mp4` o usa un enlace.
2. Desde `/admin` (pestaña **Música & Audio → Video Cinematográfico**), activa la sección y escribe el título y pie de video.

---

## 15. Cómo agregar razones por las que la quieres
- **Desde `/admin`**: Ve a la pestaña **Razones**.
  - Haz clic en **+ Agregar razón**.
  - Puedes cambiar el número (`01`, `02`...), el texto y el color pastel de cada ficha.
- **Desde VS Code**: Edita [src/content/reasons.ts](file:///C:/Users/ramon/Documents/key/src/content/reasons.ts).

---

## 16. Cómo crear Easter Eggs (Secretos interactivos)
- En la pestaña **Secretos & Sorpresas**:
  * **Estrella oculta**: Haz clic 3 veces en la estrella superior derecha para disparar confeti y un mensaje especial.
  * **Palabra secreta por teclado**: Si ella escribe una palabra (ej. `siempre`) en cualquier momento, se abrirá una tarjeta secreta.

---

## 17. Cómo crear y modificar la Sección Secreta
- Pestaña **Secretos & Sorpresas → Sección Secreta (Protegida con Palabra)**.
- Define la **palabra secreta** (por defecto `siempre`), el mensaje que se desbloqueará y la imagen adjunta.

---

## 18. Cómo cambiar las sorpresas finales
- Pestaña **Secretos & Sorpresas**:
  * **Sorpresa interactiva**: Cambia el texto del teaser y el mensaje que aparece al pulsar "Abrir sorpresa ✨".
  * **Última sorpresa**: Configura la pregunta teaser (*"¿Creíste que ya habíamos terminado?"*) y el emotivo mensaje final.

---

## 19. Cómo modificar animaciones
- Las animaciones están diseñadas con CSS moderno en [src/styles/animations.css](file:///C:/Users/ramon/Documents/key/src/styles/animations.css).
- Incluyen flotación suave (`animate-float-slow`), morphing de blobs pastel (`animate-blob`) y destellos (`animate-twinkle`).
- Respetan automáticamente la preferencia `prefers-reduced-motion` de los navegadores.

---

## 20. Cómo activar o desactivar secciones
- **Desde `/admin`**: Ve a la pestaña **Secciones**.
- Puedes activar o desactivar con un solo clic cualquiera de las 18 secciones (Hero, Contador, Galería, Carta, Playlist, Video, Calendario, etc.).
- Los cambios se reflejan inmediatamente en la vista previa.

---

## 21. Cómo exportar tu configuración
- Ve a la pestaña **Respaldo & Versiones** en `/admin`.
- Haz clic en **"Exportar birthday-config.json"**.
- Se descargará un archivo JSON con todos los textos, fotos, colores y configuración para tener una copia de seguridad o transferirlo.

---

## 22. Cómo importar tu configuración
- En la misma pestaña **Respaldo & Versiones**, haz clic en **"Importar archivo JSON"** y selecciona tu archivo `birthday-config.json`.
- La aplicación validará la estructura y aplicará todos los cambios al instante.
