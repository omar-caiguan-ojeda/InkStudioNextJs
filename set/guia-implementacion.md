# Guía de Implementación: Formulario de Reservas de 14 Pasos

## Resumen
Esta guía te ayudará a implementar el nuevo formulario de reservas de 14 pasos que reemplazará el actual formulario de 3 pasos, manteniendo el diseño y estilos existentes.

## 📁 Archivos Incluidos

### 1. `new-BookingForm.tsx` → `components/BookingForm.tsx`
- Nuevo componente con 14 pasos completos
- Validación individual para cada paso
- Subida de archivos con validación de tamaño y tipo
- Términos y condiciones con checkboxes
- Calendario y selección de horarios (reutilizado del original)

### 2. `booking-form-additional-styles.css`
- Estilos adicionales para los nuevos componentes
- Se debe agregar al final de tu archivo `globals.css`

### 3. `send-booking-email-route.ts` → `app/api/send-booking-email/route.ts`
- Nueva API route mejorada para manejar emails
- Soporte para imágenes adjuntas
- Templates HTML profesionales para cliente y administrador

## 🚀 Pasos de Implementación

### Paso 1: Reemplazar el BookingForm
```bash
# Hacer respaldo del archivo actual
cp components/BookingForm.tsx components/BookingForm.tsx.backup

# Reemplazar con el nuevo archivo
cp new-BookingForm.tsx components/BookingForm.tsx
```

### Paso 2: Actualizar los Estilos CSS
Agregar al final de tu archivo `globals.css`:

```css
/* === ESTILOS ADICIONALES PARA BOOKING FORM === */
/* Copiar todo el contenido de booking-form-additional-styles.css aquí */
```

### Paso 3: Crear la Nueva API Route
```bash
# Crear el directorio si no existe
mkdir -p app/api/send-booking-email

# Crear la nueva route
cp send-booking-email-route.ts app/api/send-booking-email/route.ts
```

### Paso 4: Configurar Variables de Entorno
Asegúrate de que tu archivo `.env.local` tenga:

```env
RESEND_API_KEY=tu_api_key_de_resend
FROM_EMAIL=tu_email@dominio.com
ADMIN_EMAIL=admin@inkstudio.com
```

### Paso 5: Instalar Dependencias (si no están instaladas)
```bash
npm install resend
```

## 📝 Estructura de los 14 Pasos

### Pasos de Información Personal (1-3)
1. **Nombre**: Campo de texto con validación mínima de 2 caracteres
2. **Email**: Validación de formato de email
3. **Teléfono**: Validación de formato telefónico con placeholder (+56) 9 **** ****

### Pasos de Descubrimiento y Preferencias (4-5)  
4. **Cómo nos encontró**: Opciones múltiples (Instagram, Facebook, Google, etc.)
5. **Artista preferido**: Lista de todos los artistas disponibles

### Pasos de Detalles del Tatuaje (6-11)
6. **Ubicación del cuerpo**: Campo de texto libre
7. **Tamaño del tatuaje**: 4 opciones con descripciones
8. **Rango de presupuesto**: 3 opciones de precios
9. **Descripción**: Textarea con contador de caracteres
10. **Estilo de color**: Color, Negro y gris, o Ambos
11. **Imágenes de referencia**: Subida múltiple (PNG, JPG, GIF, max 10MB c/u)

### Pasos Finales (12-14)
12. **Fecha y hora**: Calendario integrado + slots de tiempo
13. **Términos y condiciones**: Checkboxes obligatorios
14. **Confirmación**: Mensaje de éxito con número de reserva

## 🎨 Características del Diseño

### Progress Bar Mejorado
- Indicadores de progreso para 13 pasos (paso 14 es confirmación)
- Animaciones suaves entre pasos
- Estados visuales: pending, active, completed

### Validación en Tiempo Real
- Validación por paso antes de continuar
- Mensajes de error específicos por campo
- Botones habilitados/deshabilitados según validación

### Subida de Archivos
- Drag & drop interface
- Preview de imágenes seleccionadas
- Validación de tipo y tamaño de archivo
- Máximo 5 imágenes por solicitud

### Responsive Design
- Adaptado para móviles y tablets
- Grillas flexibles para opciones
- Typography escalable

## 📧 Mejoras en el Sistema de Email

### Para el Administrador
- **Diseño profesional** con branding de InkStudio
- **Información completa** organizada en secciones
- **Imágenes adjuntas** automáticamente
- **Botones de acción** para llamar o enviar email
- **Número de reserva** único generado

### Para el Cliente
- **Email de confirmación** inmediato
- **Resumen detallado** de la solicitud
- **Próximos pasos** claramente explicados
- **Información de contacto** prominente
- **Avisos importantes** destacados

## ⚠️ Consideraciones Importantes

### Validación de Archivos
```typescript
// Tipos permitidos
const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];

// Tamaño máximo por archivo: 10MB
const maxSize = 10 * 1024 * 1024;

// Máximo 5 archivos por solicitud
const maxFiles = 5;
```

### Términos y Condiciones
- Se requiere crear páginas `/terminos` y `/privacidad`
- Los checkboxes son obligatorios para enviar
- Validación del mayor de edad obligatoria

### Gestión de Estado
- Estado persistente entre pasos
- Validación progresiva
- Navegación hacia atrás permitida
- Reset completo al finalizar

## 🔄 Migración de Datos

El nuevo formulario es compatible con el sistema actual ya que:
- Mantiene los campos básicos existentes (nombre, email, teléfono, fecha, hora)
- Agrega información adicional sin afectar funcionalidad existente
- El número de reserva sigue el mismo formato: `INK######`

## 🧪 Testing

### Pruebas Recomendadas
1. **Validación por paso**: Verificar que cada paso valide correctamente
2. **Subida de archivos**: Probar con diferentes tipos y tamaños
3. **Email delivery**: Confirmar que ambos emails se envían
4. **Responsive**: Probar en móviles y tablets
5. **Error handling**: Verificar manejo de errores de API

### Casos Edge a Probar
- Archivos muy grandes (>10MB)
- Tipos de archivo no permitidos
- Email inválidos
- Teléfonos en formato incorrecto
- Navegación hacia atrás en el formulario

## 🚨 Troubleshooting

### Problema: Estilos no se cargan
**Solución**: Verificar que los estilos adicionales se agregaron al final de `globals.css`

### Problema: Imágenes no se envían por email
**Solución**: Verificar configuración de Resend y límites de tamaño de attachment

### Problema: Validación de teléfono falla
**Solución**: Ajustar regex en `validateStep` según formato local

### Problema: API route no responde
**Solución**: Verificar que la ruta esté en `app/api/send-booking-email/route.ts`

## 📱 Integración Futura con Budibase CRM

El formulario está preparado para integración con Budibase:

### Estructura de Datos
```typescript
// Los datos se pueden mapear directamente a Budibase
interface BookingData {
  // Campos personales
  name: string;
  email: string; 
  phone: string;
  
  // Campos de marketing
  howFoundUs: string;
  
  // Campos del proyecto
  preferredArtist: string;
  bodyLocation: string;
  tattooSize: string;
  budgetRange: string;
  description: string;
  colorStyle: string;
  
  // Archivos
  referenceImages: File[];
  
  // Scheduling
  date: string;
  time: string;
  
  // Compliance
  isOver18: boolean;
  acceptsTerms: boolean;
  acceptsPrivacy: boolean;
}
```

### Webhook para Budibase
Para integrar con Budibase, simplemente agregar al final de la función POST:

```typescript
// Enviar a Budibase CRM
const budibaseData = {
  ...bookingData,
  bookingNumber,
  status: 'pending',
  createdAt: new Date().toISOString()
};

await fetch(process.env.BUDIBASE_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(budibaseData)
});
```

## 🎯 Próximos Pasos

1. **Implementar los archivos** según esta guía
2. **Crear las páginas** de términos y condiciones
3. **Probar completamente** el flujo end-to-end
4. **Configurar Budibase** para recibir los datos
5. **Implementar analytics** para trackear abandono por paso
6. **A/B testing** de diferentes versiones del formulario

---

¡El nuevo formulario está listo para mejorar significativamente la experiencia del cliente y la gestión de leads para InkStudio! 🎨✨