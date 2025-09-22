# 🖤 InkStudio - Arte en tu Piel

**Estudio de tatuajes profesional especializado en blackwork, fine line, geométrico y realismo**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

---

## 📋 Descripción del Proyecto

InkStudio es una plataforma web de alta gama diseñada para un estudio de tatuajes profesional. Este proyecto va más allá de una simple presencia digital, posicionándose como una herramienta integral de marketing y gestión de clientes que combina un diseño visual impactante con funcionalidades avanzadas de automatización.

### 🎯 Propósito
- **Captación de clientes**: Presentación visual impactante que refleja la calidad artística del estudio
- **Gestión optimizada**: Sistema de reservas automatizado que elimina procesos manuales
- **Experiencia premium**: Interfaz fluida y profesional que iguala la calidad del servicio

### 🌟 Características Principales

#### 🎨 **Frontend Moderno**
- **Diseño Glassmorphism**: Efectos visuales modernos con transparencias y desenfoques
- **Micro-animaciones**: Transiciones suaves y efectos de scroll para una experiencia inmersiva
- **Responsive Design**: Optimizado para todos los dispositivos
- **Internacionalización**: Soporte completo para español e inglés

#### 📅 **Sistema de Reservas Inteligente**
- **Formulario Multi-paso**: Guía interactiva para selección de servicios, artista y detalles
- **UX Optimizada**: Avances automáticos y validaciones en tiempo real
- **Integración Completa**: Conexión automática con CRM y sistema de notificaciones

#### 🔗 **Automatización Backend**
- **API RESTful**: Endpoints para envío de emails y gestión de datos
- **Integración Resend**: Servicio de email transaccional para notificaciones
- **CRM Budibase**: Gestión centralizada de clientes y citas
- **Webhooks**: Procesamiento automático de solicitudes de reserva

#### 🔍 **SEO Optimizado**
- **Schema Markup**: Estructura de datos para motores de búsqueda
- **Meta Tags**: Optimización completa para redes sociales
- **Sitemap XML**: Indexación eficiente del contenido
- **AIO Ready**: Optimizado para modelos de lenguaje (ChatGPT, etc.)

---

## 🛠️ Tecnologías Utilizadas

### **Core Framework**
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework con App Router
- **[React 19.1.0](https://reactjs.org/)** - Biblioteca para interfaces de usuario
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipado estático para JavaScript

### **Styling & UI**
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitario
- **CSS3** - Estilos personalizados con glassmorphism
- **PostCSS** - Procesamiento de CSS

### **Funcionalidades**
- **[Resend](https://resend.com/)** - Servicio de email transaccional
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Renderizado de contenido
- **Intersection Observer API** - Animaciones de scroll

### **Desarrollo**
- **[ESLint](https://eslint.org/)** - Linting de código
- **[TypeScript Compiler](https://www.typescriptlang.org/)** - Verificación de tipos
- **Turbopack** - Bundling optimizado

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- **Node.js** 18.x o superior
- **npm** o **yarn** o **pnpm** o **bun**

### **Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd inkstudio-next
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```

   Editar `.env.local` con tus credenciales:
   ```env
   # Resend API Key (para envío de emails)
   RESEND_API_KEY=your_resend_api_key

   # Budibase Configuration (opcional)
   BUDIBASE_API_KEY=your_budibase_api_key
   BUDIBASE_WEBHOOK_URL=your_webhook_url
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### **Scripts Disponibles**

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con Turbopack |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |
| `npm run lint:fix` | Ejecuta ESLint y corrige automáticamente los errores |
| `npm run type-check` | Verifica los tipos TypeScript |
| `npm run build-check` | Script personalizado de verificación de construcción |

---

## 📁 Estructura del Proyecto

```
inkstudio-next/
├── 📄 package.json                 # Dependencias y scripts
├── 📄 next.config.ts              # Configuración de Next.js
├── 📄 tailwind.config.ts          # Configuración de Tailwind CSS
├── 📄 tsconfig.json               # Configuración de TypeScript
├── 📄 README.md                   # Documentación del proyecto
├── 📄 project_summary_and_seo.md  # Resumen y estrategias SEO
│
├── 📁 public/                     # Archivos estáticos
│   ├── icon.png                   # Icono de la aplicación
│   ├── client_*.jpg              # Portafolio de clientes
│   ├── tattoo_*.jpg              # Trabajos realizados
│   └── perfil_*.jpg              # Fotos de artistas
│
├── 📁 src/
│   ├── 📁 app/                    # App Router de Next.js
│   │   ├── layout.tsx             # Layout principal
│   │   ├── page.tsx               # Página de inicio
│   │   ├── globals.css            # Estilos globales
│   │   ├── 📁 api/                # API Routes
│   │   │   ├── send-booking-email/
│   │   │   └── test-budibase/
│   │   ├── 📁 crm/                # Página del CRM
│   │   ├── 📁 faq/                # Página de FAQ
│   │   ├── 📁 privacidad/         # Política de privacidad
│   │   └── 📁 terminos/           # Términos y condiciones
│   │
│   ├── 📁 components/             # Componentes React
│   │   ├── Header.tsx             # Cabecera con navegación
│   │   ├── HeroSection.tsx        # Sección hero con animaciones
│   │   ├── About.tsx              # Sección "Sobre Nosotros"
│   │   ├── Artists.tsx            # Perfiles de artistas
│   │   ├── Carrousel.tsx          # Galería de trabajos
│   │   ├── Services.tsx           # Servicios ofrecidos
│   │   ├── BookingForm.tsx        # Formulario de reservas
│   │   ├── Contact.tsx            # Información de contacto
│   │   ├── FaqSection.tsx         # Preguntas frecuentes
│   │   └── Footer.tsx             # Pie de página
│   │
│   ├── 📁 data/                   # Datos de la aplicación
│   │   ├── text_es.json           # Textos en español
│   │   └── text_en.json           # Textos en inglés
│   │
│   ├── 📁 lib/                    # Utilidades y configuraciones
│   │   ├── appData.ts             # Datos de la aplicación
│   │   └── utils.ts               # Funciones utilitarias
│   │
│   └── 📁 styles/                 # Estilos adicionales
│       └── improved_styles.css    # Estilos mejorados
│
└── 📁 set/                        # Scripts y configuraciones
    ├── script.py                  # Script de automatización
    └── guia-implementacion.md     # Guía de implementación
```

---

## 🎨 Características del Diseño

### **Secciones Principales**
1. **Header** - Navegación con efectos dinámicos
2. **Hero Section** - Presentación impactante con textos rotativos
3. **About** - Historia y filosofía del estudio
4. **Artists** - Perfiles detallados de los tatuadores
5. **Portfolio** - Galería interactiva de trabajos realizados
6. **Services** - Catálogo de servicios y precios
7. **FAQ** - Preguntas frecuentes optimizadas para SEO
8. **Contact** - Información de contacto y ubicación
9. **Booking Form** - Sistema de reservas integrado
10. **Footer** - Enlaces y redes sociales

### **Efectos Visuales**
- **Glassmorphism**: Elementos translúcidos con efectos de vidrio
- **Scroll Animations**: Animaciones al hacer scroll
- **Hover Effects**: Interacciones sutiles en elementos
- **Gradient Backgrounds**: Fondos degradados dinámicos
- **Typography**: Fuentes modernas y legibles

---

## 🔧 Configuración Avanzada

### **Optimización de Rendimiento**
- **Image Optimization**: Imágenes optimizadas automáticamente por Next.js
- **Code Splitting**: Carga diferida de componentes
- **Caching**: Estrategias de cache optimizadas
- **Bundle Analysis**: Análisis del tamaño del bundle

### **SEO y Metadatos**
- **Dynamic Metadata**: Metadatos dinámicos por página
- **Open Graph**: Optimización para redes sociales
- **Twitter Cards**: Integración con Twitter
- **Schema.org**: Marcado estructurado para motores de búsqueda

### **Internacionalización**
- **Language Toggle**: Selector de idioma flotante
- **Local Storage**: Persistencia de preferencias de idioma
- **SEO Multi-idioma**: Optimización para múltiples idiomas

---

## 🤝 Contribución

### **Proceso de Contribución**
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### **Estándares de Código**
- **TypeScript**: Tipado estricto habilitado
- **ESLint**: Configuración estándar de Next.js
- **Prettier**: Formateo de código automático
- **Conventional Commits**: Mensajes de commit estandarizados

---

## 📄 Licencia

Este proyecto es propietario y está protegido por derechos de autor.

**© 2024 InkStudio. Todos los derechos reservados.**

---

## 📞 Contacto y Soporte

### **Información del Estudio**
- **Sitio Web**: [https://inkstudio-tattoo.vercel.app](https://inkstudio-tattoo.vercel.app)
- **Email**: contacto@inkstudio.com
- **Teléfono**: +54-11-4567-8900
- **Dirección**: Av. Libertador 1234, Buenos Aires, Argentina

### **Horarios de Atención**
- **Lunes a Sábado**: 10:00 - 20:00
- **Domingos**: Cerrado

### **Redes Sociales**
- **Instagram**: [@inkstudio_tattoo](https://instagram.com/inkstudio_tattoo)
- **Facebook**: [InkStudio Tattoo](https://facebook.com/inkstudio)

---

## 🙏 Agradecimientos

- **Next.js Team** - Por el excelente framework
- **Vercel** - Por la plataforma de despliegue
- **Tailwind CSS** - Por el framework de estilos
- **Resend** - Por el servicio de email
- **Comunidad Open Source** - Por las herramientas y bibliotecas

---

**Desarrollado con ❤️ por el equipo de InkStudio**

*Para más información sobre el proyecto y estrategias SEO, consulta el archivo [`project_summary_and_seo.md`](project_summary_and_seo.md)*
