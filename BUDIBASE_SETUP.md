# Configuración de Budibase CRM para InkStudio

## Resumen
Esta documentación explica cómo configurar la integración entre el formulario de reservas de InkStudio y Budibase CRM para gestionar leads automáticamente.

## Variables de Entorno Requeridas

```env
BUDIBASE_WEBHOOK_URL=https://omarcaiguan.budibase.app/api/webhooks/schema/app_dev_omarcaiguan_d26e5294c5d948aca190eaca11ca4638/wh_5ea3f814c4274fe1b7c31946705aeede
BUDIBASE_API_KEY=83faff66dbe69e5acb322ac9ca68b2c5-31ed1e72d4a6b5095f55033331636f60307021358b46bc32844760f950265e2066d3a8bcb29d570420284a25
```

## Configuración en Budibase

### 1. Crear la Tabla de Leads

En tu app de Budibase, crea una tabla llamada `leads` con los siguientes campos:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | Text | Sí | Nombre completo del cliente |
| `email` | Text | Sí | Email del cliente |
| `telefono` | Text | Sí | Teléfono del cliente |
| `como_nos_encontro` | Options | No | Instagram, Facebook, Google, etc. |
| `artista_preferido` | Text | No | Artista seleccionado |
| `ubicacion_tatuaje` | Text | No | Parte del cuerpo para el tatuaje |
| `tamano` | Options | No | small, medium, large, xlarge |
| `presupuesto` | Options | No | budget1, budget2, budget3 |
| `descripcion` | Long Form Text | No | Descripción del tatuaje deseado |
| `estilo_color` | Options | No | color, blackgray, both |
| `fecha_solicitada` | Date | No | Fecha preferida para la cita |
| `hora_solicitada` | Text | No | Hora preferida |
| `numero_reserva` | Text | Sí | Número único de reserva |
| `estado` | Options | Sí | pendiente, contactado, confirmado, completado |
| `fecha_creacion` | Date | Sí | Timestamp de creación |
| `mayor_edad` | Boolean | Sí | Confirmación de mayoría de edad |
| `imagenes_referencia` | JSON | No | Array de objetos con info de imágenes |
| `notas_admin` | Long Form Text | No | Notas internas |
| `fecha_contacto` | Date | No | Cuándo se contactó al cliente |
| `fecha_confirmacion` | Date | No | Cuándo se confirmó la cita |

### 2. Configurar el Webhook

1. Ve a **Settings** > **Webhooks** en tu app de Budibase
2. Crea un nuevo webhook con:
   - **Trigger**: Manual
   - **Action**: Create Row
   - **Table**: leads
   - **Method**: POST

### 3. Configurar Autenticación (Opcional)

Si usas API Key:
1. Ve a **Settings** > **API Keys**
2. Genera una nueva API Key
3. Asigna permisos de escritura a la tabla `leads`

## Estructura de Datos Enviados

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+56912345678",
  "como_nos_encontro": "Instagram",
  "artista_preferido": "Carlos Guzmán",
  "ubicacion_tatuaje": "Brazo izquierdo",
  "tamano": "medium",
  "presupuesto": "budget2",
  "descripcion": "Quiero un tatuaje de un león en estilo realista",
  "estilo_color": "blackgray",
  "fecha_solicitada": "2024-01-15",
  "hora_solicitada": "14:00",
  "numero_reserva": "INK123456",
  "estado": "pendiente",
  "fecha_creacion": "2024-01-10T10:30:00.000Z",
  "mayor_edad": true,
  "imagenes_referencia": [
    {
      "nombre": "referencia1.jpg",
      "tipo": "image/jpeg",
      "tamano_kb": 245
    }
  ],
  "notas_admin": "Lead generado automáticamente desde el formulario web. Cliente interesado en Mediano (10-20 centímetros) en Brazo izquierdo.",
  "fecha_contacto": null,
  "fecha_confirmacion": null
}
```

## Testing y Verificación

### 1. Endpoint de Test
Usa el endpoint de test para verificar la conexión:

```bash
# Test básico
GET http://localhost:3000/api/test-budibase

# Test solo webhook (sin autenticación)
POST http://localhost:3000/api/test-budibase
Content-Type: application/json

{
  "testType": "webhook-only"
}
```

### 2. Verificar Logs
Revisa los logs del servidor para ver:
- ✅ Conexión exitosa
- ❌ Errores de autenticación
- 🔍 Problemas de URL
- 📝 Errores de estructura de datos

## Troubleshooting

### Error 401 - No autorizado
- Verifica que `BUDIBASE_API_KEY` esté correctamente configurada
- Asegúrate de que la API Key tenga permisos de escritura
- Revisa que la API Key no haya expirado

### Error 404 - Webhook no encontrado
- Verifica que `BUDIBASE_WEBHOOK_URL` sea correcta
- Asegúrate de que el webhook esté activo en Budibase
- Revisa que la app de Budibase esté publicada

### Error 400 - Datos inválidos
- Verifica que los campos requeridos estén presentes
- Revisa que los tipos de datos coincidan
- Asegúrate de que los campos Options tengan valores válidos

### Error de Red
- Verifica la conectividad a internet
- Revisa que la URL de Budibase sea accesible
- Comprueba que no haya firewalls bloqueando la conexión

## Configuración Alternativa: Solo Webhook

Si prefieres usar solo el webhook sin autenticación:

1. Configura el webhook en Budibase para aceptar requests sin autenticación
2. Elimina `BUDIBASE_API_KEY` del archivo `.env`
3. El sistema automáticamente enviará sin header de Authorization

## Monitoreo y Mantenimiento

### Logs Importantes
- `🔗 BUDIBASE URL`: Confirma la URL utilizada
- `📤 ENVIANDO A BUDIBASE`: Datos enviados
- `📥 BUDIBASE RESPONSE`: Respuesta recibida
- `✅ Lead enviado exitosamente`: Confirmación de éxito
- `❌ Error con Budibase CRM`: Errores capturados

### Métricas Recomendadas
- Tasa de éxito de envío a Budibase
- Tiempo de respuesta del webhook
- Errores por tipo (401, 404, 400, etc.)
- Volumen de leads procesados

## Campos Opcionales Adicionales

Puedes agregar estos campos a tu tabla de Budibase para mejor gestión:

- `fuente_lead`: Para tracking de marketing
- `prioridad`: Alta, media, baja
- `valor_estimado`: Valor monetario estimado
- `seguimiento_requerido`: Boolean para follow-up
- `notas_cliente`: Notas del cliente
- `historial_contacto`: JSON con historial de comunicación
