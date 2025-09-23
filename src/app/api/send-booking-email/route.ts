import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingData {
  name: string;
  email: string;
  phone: string;
  howFoundUs: string;
  preferredArtist: string;
  bodyLocation: string;
  tattooSize: string;
  budgetRange: string;
  description: string;
  colorStyle: string;
  referenceImages: {
    name: string;
    data: string;
    type: string;
  }[];
  date: string;
  time: string;
  isOver18: boolean;
  acceptsTerms: boolean;
  acceptsPrivacy: boolean;
}

const howFoundUsLabels: Record<string, string> = {
  "Instagram": "Instagram",
  "Facebook": "Facebook",
  "Google": "Google",
  "Recomendación": "Recomendación de un amigo",
  "TikTok": "TikTok",
  "Evento": "En un evento",
  "Otro": "Otro medio"
};

const tattooSizeLabels: Record<string, string> = {
  "small": "Pequeño (5-10 centímetros)",
  "medium": "Mediano (10-20 centímetros)",
  "large": "Grande (20-30 centímetros)",
  "xlarge": "Extra grande (+30 centímetros)"
};

const budgetLabels: Record<string, string> = {
  "budget1": "$150-$350 (Pequeño)",
  "budget2": "$350-$800 (Medio)",
  "budget3": "$800-$1800 (Grande)"
};

const colorStyleLabels: Record<string, string> = {
  "color": "A color",
  "blackgray": "Negro y gris",
  "both": "Ambos/No estoy seguro"
};

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'howFoundUs', 'preferredArtist', 
                           'bodyLocation', 'tattooSize', 'budgetRange', 'description', 
                           'colorStyle', 'date', 'time'];
    
    for (const field of requiredFields) {
      if (!bookingData[field as keyof BookingData]) {
        return NextResponse.json(
          { error: `El campo ${field} es requerido` },
          { status: 400 }
        );
      }
    }

    // Validate terms acceptance
    if (!bookingData.isOver18 || !bookingData.acceptsTerms || !bookingData.acceptsPrivacy) {
      return NextResponse.json(
        { error: 'Debe aceptar todos los términos y condiciones' },
        { status: 400 }
      );
    }

    // Prepare image attachments for email
    const attachments = bookingData.referenceImages.map((img) => ({
      filename: `referencia_${img.name}`,
      content: img.data.split(',')[1], // Remove data:image/jpeg;base64, prefix
      type: img.type,
      disposition: 'attachment'
    }));

    // Generate booking number
    const bookingNumber = `INK${Date.now().toString().slice(-6)}`;
    const formattedDate = new Date(bookingData.date).toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Email to admin
    const adminEmailData = {
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.ADMIN_EMAIL || 'omar.caiguan@gmail.com'],
      subject: `🎨 Nueva Solicitud de Tatuaje - ${bookingData.name} - ${bookingNumber}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nueva Solicitud de Tatuaje - ${bookingNumber}</title>
<style>
  body { margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
  .container { max-width: 700px; margin: 0 auto; background-color: #1e293b; color: #f1f5f9; }
  .header { padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #374151 100%); border-bottom: 3px solid #dc2626; }
  .content { padding: 40px; }
  .card { background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 30px; margin-bottom: 25px; border: 1px solid #334155; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
  .card-header { color: #dc2626; font-size: 22px; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #dc2626; }
  .data-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid #334155; }
  .data-row:last-child { border-bottom: none; }
  .data-label { font-weight: 600; color: #94a3b8; min-width: 160px; flex-shrink: 0; }
  .data-value { font-weight: 500; color: #f1f5f9; text-align: right; flex-grow: 1; }
  .booking-number { background: linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%); color: #ef4444; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px; border: 2px solid rgba(220, 38, 38, 0.3); }
  .booking-number h2 { margin: 0; font-size: 24px; font-weight: 700; }
  .success-card { background: linear-gradient(145deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%); border: 2px solid rgba(34, 197, 94, 0.3); }
  .success-header { color: #22c55e; font-size: 20px; font-weight: 700; }
  .footer { text-align: center; padding: 30px; font-size: 13px; color: #64748b; background-color: #0f172a; border-top: 1px solid #334155; }
  .button { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 700; display: inline-block; box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3); transition: all 0.3s ease; }
  .button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4); }
  .description-box { background-color: rgba(51, 65, 85, 0.5); padding: 20px; border-radius: 10px; margin-top: 20px; border-left: 4px solid #dc2626; }
  .description-text { white-space: pre-wrap; line-height: 1.6; margin: 0; }
  .images-list { background-color: rgba(51, 65, 85, 0.5); padding: 20px; border-radius: 10px; }
  .image-item { padding: 8px 0; border-bottom: 1px solid rgba(148, 163, 184, 0.2); }
  .image-item:last-child { border-bottom: none; }
  .terms-list { list-style: none; padding: 0; margin: 0; }
  .terms-item { padding: 8px 0; display: flex; align-items: center; }
  .terms-item::before { content: "✓"; color: #22c55e; font-weight: bold; margin-right: 10px; }
  @media screen and (max-width: 600px) {
    .content { padding: 20px; }
    .header { padding: 30px 20px; }
    .data-row { flex-direction: column; align-items: flex-start; }
    .data-value { text-align: left; margin-top: 5px; }
  }
</style>
</head>
<body>
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
<tr><td align="center" style="padding: 20px 0; background-color: #0f172a;">
<table class="container" role="presentation" width="700" border="0" cellspacing="0" cellpadding="0">
  <tr><td class="header">
    <h1 style="color: #f1f5f9; margin: 15px 0 5px 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">INKSTUDIO</h1>
    <p style="margin: 0; color: #94a3b8; font-size: 16px;">Sistema Profesional de Reservas</p>
  </td></tr>
  <tr><td class="content">
    <div class="booking-number">
      <h2>NÚMERO DE RESERVA: ${bookingNumber}</h2>
    </div>

    <div class="card">
      <h2 class="card-header">👤 INFORMACIÓN DEL CLIENTE</h2>
      <div class="data-row">
        <span class="data-label">Nombre completo:</span>
        <span class="data-value">${bookingData.name}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Email:</span>
        <span class="data-value"><a href="mailto:${bookingData.email}" style="color: #ef4444; text-decoration: none;">${bookingData.email}</a></span>
      </div>
      <div class="data-row">
        <span class="data-label">Teléfono:</span>
        <span class="data-value"><a href="tel:${bookingData.phone}" style="color: #ef4444; text-decoration: none;">${bookingData.phone}</a></span>
      </div>
      <div class="data-row">
        <span class="data-label">Fuente de referencia:</span>
        <span class="data-value">${howFoundUsLabels[bookingData.howFoundUs] || bookingData.howFoundUs}</span>
      </div>
    </div>

    <div class="card">
      <h2 class="card-header">🎨 DETALLES DEL TATUAJE</h2>
      <div class="data-row">
        <span class="data-label">Artista preferido:</span>
        <span class="data-value">${bookingData.preferredArtist}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Ubicación en el cuerpo:</span>
        <span class="data-value">${bookingData.bodyLocation}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Tamaño estimado:</span>
        <span class="data-value">${tattooSizeLabels[bookingData.tattooSize] || bookingData.tattooSize}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Rango de presupuesto:</span>
        <span class="data-value">${budgetLabels[bookingData.budgetRange] || bookingData.budgetRange}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Estilo de color:</span>
        <span class="data-value">${colorStyleLabels[bookingData.colorStyle] || bookingData.colorStyle}</span>
      </div>
      <div class="description-box">
        <h3 style="margin: 0 0 15px 0; color: #dc2626; font-size: 18px;">📝 Descripción del diseño:</h3>
        <div class="description-text">${bookingData.description}</div>
      </div>
    </div>

    <div class="card">
      <h2 class="card-header">📅 CITA SOLICITADA</h2>
      <div class="data-row">
        <span class="data-label">Fecha:</span>
        <span class="data-value" style="font-size: 18px; font-weight: 600;">${formattedDate}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Hora:</span>
        <span class="data-value" style="font-size: 18px; font-weight: 600;">${bookingData.time}</span>
      </div>
    </div>

    ${bookingData.referenceImages.length > 0 ? `
    <div class="card">
      <h2 class="card-header">📎 IMÁGENES DE REFERENCIA (${bookingData.referenceImages.length})</h2>
      <div class="images-list">
        ${bookingData.referenceImages.map((img, index) => `
          <div class="image-item">
            <strong>📷 ${img.name}</strong> - ${img.type.toUpperCase()}
          </div>
        `).join('')}
        <p style="margin: 15px 0 0 0; padding: 15px; background-color: rgba(59, 130, 246, 0.1); border-radius: 8px; border-left: 4px solid #3b82f6;">
          💡 Las imágenes han sido adjuntadas como archivos separados a este correo electrónico.
        </p>
      </div>
    </div>` : ''}

    <div class="card success-card">
      <h2 class="success-header">✅ TÉRMINOS Y CONDICIONES ACEPTADOS</h2>
      <ul class="terms-list" style="color: #a7f3d0;">
        <li class="terms-item">Confirmó ser mayor de 18 años</li>
        <li class="terms-item">Aceptó los términos y condiciones generales</li>
        <li class="terms-item">Aceptó la política de privacidad y tratamiento de datos</li>
        <li class="terms-item">Está de acuerdo con los requisitos de depósito y cancelación</li>
      </ul>
    </div>

    <div style="text-align: center; margin-top: 40px; padding: 30px; background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%); border-radius: 12px;">
      <a href="mailto:${bookingData.email}" class="button">📧 Contactar Cliente</a>
      <p style="margin: 15px 0 0 0; font-size: 14px; color: #94a3b8;">
        Recomendamos contactar al cliente dentro de las próximas 4-8 horas para confirmar disponibilidad.
      </p>
    </div>
  </td></tr>
  <tr><td class="footer">
    <p><strong>InkStudio - Sistema Profesional de Reservas</strong></p>
    <p>📅 Fecha de solicitud: ${new Date().toLocaleString('es-ES')}</p>
    <p>⏰ Procesado automáticamente por el sistema de reservas</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>
      `,
      attachments: attachments.length > 0 ? attachments : undefined
    };

    // Confirmation email to client  
    const clientEmailData = {
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [bookingData.email],
      subject: `🎨 Solicitud Recibida - InkStudio - ${bookingNumber}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Solicitud Recibida - ${bookingNumber}</title>
<style>
  body { margin: 0; padding: 0; background-color: #0f172a; font-family: Arial, sans-serif; }
  .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; color: #f1f5f9; }
  .header { padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #374151 100%); }
  .logo { display: inline-block; margin-bottom: 15px; }
  .content { padding: 30px; }
  .card { background-color: #0f172a; border-radius: 12px; padding: 25px; margin-bottom: 20px; border: 1px solid #334155; }
  h1 { color: #f1f5f9; margin: 0; font-size: 24px; }
  h2 { color: #dc2626; margin-top: 0; font-size: 20px; border-bottom: 1px solid #334155; padding-bottom: 10px; }
  p { line-height: 1.6; }
  .booking-number { background-color: rgba(220, 38, 38, 0.2); color: #ef4444; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
  .footer { text-align: center; padding: 20px; font-size: 12px; color: #64748b; }
  .button { background-color: #dc2626; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; }
  @media screen and (max-width: 600px) {
    .content { padding: 20px; }
    .header { padding: 30px 20px; }
  }
</style>
</head>
<body>
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
<tr><td align="center" style="padding: 20px 0; background-color: #0f172a;">
<table class="container" role="presentation" width="600" border="0" cellspacing="0" cellpadding="0">
  <tr><td class="header">
    <img src="https://inkstudio.protoly.lat/icon.png" alt="InkStudio Logo" width="60" class="logo">
    <h1>INKSTUDIO</h1>
    <p style="margin: 5px 0 0 0; color: #94a3b8;">Arte en tu Piel</p>
  </td></tr>
  <tr><td class="content">
    <h2 style="text-align: center;">¡Solicitud Recibida!</h2>
    <p style="text-align: center;">Hola <strong>${bookingData.name}</strong>, hemos recibido tu solicitud de tatuaje. ¡Gracias por confiar en nosotros!</p>
    <div class="booking-number">
      <p style="margin: 0 0 10px 0; color: #f1f5f9; font-size: 14px;">TU NÚMERO DE RESERVA</p>
      <h3 style="margin: 0; color: #ef4444; font-size: 28px; font-family: 'Courier New', monospace;">${bookingNumber}</h3>
    </div>
    <div class="card">
      <h3>📋 Resumen de tu Solicitud</h3>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #334155;">Artista preferido:</td><td align="right" style="font-weight: bold;">${bookingData.preferredArtist}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #334155;">Tamaño:</td><td align="right" style="font-weight: bold;">${tattooSizeLabels[bookingData.tattooSize] || bookingData.tattooSize}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #334155;">Fecha solicitada:</td><td align="right" style="font-weight: bold;">${formattedDate}</td></tr>
        <tr><td style="padding: 10px 0;">Hora solicitada:</td><td align="right" style="font-weight: bold;">${bookingData.time}</td></tr>
      </table>
    </div>
    <div class="card" style="background-color: rgba(34, 197, 94, 0.1); border-color: #22c55e;">
      <h3 style="color: #22c55e;">🚀 Próximos Pasos</h3>
      <p>1. <strong>Revisión:</strong> Nuestro equipo revisará tu solicitud.</p>
      <p>2. <strong>Contacto:</strong> Te contactaremos en las próximas 4-8 horas para confirmar los detalles.</p>
      <p>3. <strong>Confirmación:</strong> Finalizaremos la fecha, hora y te enviaremos las instrucciones para el depósito.</p>
    </div>
    <div style="text-align: center; margin-top: 30px;">
      <a href="https://inkstudio-tattoo.vercel.app" class="button">Visitar Nuestro Sitio</a>
    </div>
  </td></tr>
  <tr><td class="footer">
    <p><strong>InkStudio - Arte en tu Piel</strong></p>
    <p>📍 123 Arte Street, Ciudad | 📧 info@inkstudio.com</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>
      `
    };

    // Send both emails
    try {
      const emailResults = await Promise.allSettled([
        resend.emails.send(adminEmailData),
        resend.emails.send(clientEmailData)
      ]);

      // Check email results
      const adminEmailResult = emailResults[0];
      const clientEmailResult = emailResults[1];

      console.log('Admin email result:', adminEmailResult);
      console.log('Client email result:', clientEmailResult);

    } catch (emailError) {
      console.error('Error sending emails:', emailError);
    }

    // =====================================
    // NUEVA INTEGRACIÓN CON BUDIBASE CRM
    // =====================================
    
    try {
      if (process.env.BUDIBASE_WEBHOOK_URL) {
        // --- Combinar fecha y hora para Budibase ---
        const appointmentDateTime = new Date(`${bookingData.date}T${bookingData.time}:00`);

        // Verificar si la fecha es válida
        if (isNaN(appointmentDateTime.getTime())) {
          console.error('Fecha u hora inválida:', bookingData.date, bookingData.time);
          // Opcional: retornar un error si la fecha no es válida
        }

        // Preparar datos para Budibase (Versión Final Enriquecida)
        const budibaseData = {
          nombre: bookingData.name,
          email: bookingData.email,
          telefono: bookingData.phone,
          como_nos_encontro: howFoundUsLabels[bookingData.howFoundUs] || bookingData.howFoundUs,
          artista_preferido: bookingData.preferredArtist,
          ubicacion_tatuaje: bookingData.bodyLocation,
          tamano: tattooSizeLabels[bookingData.tattooSize] || bookingData.tattooSize,
          presupuesto: budgetLabels[bookingData.budgetRange] || bookingData.budgetRange,
          descripcion: bookingData.description,
          estilo_color: colorStyleLabels[bookingData.colorStyle] || bookingData.colorStyle,
          fecha_hora_cita: appointmentDateTime.toISOString(),
          numero_reserva: bookingNumber,
          estado: 'pendiente',
          fecha_creacion: new Date().toISOString(),
          mayor_edad: bookingData.isOver18,
          notas_admin: `Lead generado automáticamente desde el formulario web. Cliente interesado en ${tattooSizeLabels[bookingData.tattooSize]} en ${bookingData.bodyLocation}.`
        };

        console.log('🔗 BUDIBASE URL:', process.env.BUDIBASE_WEBHOOK_URL);
        console.log('📤 ENVIANDO A BUDIBASE (ENRIQUECIDO):', JSON.stringify(budibaseData, null, 2));

        // Enviar a Budibase
        const budibaseResponse = await fetch(process.env.BUDIBASE_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(process.env.BUDIBASE_API_KEY && {
              'Authorization': `Bearer ${process.env.BUDIBASE_API_KEY}`,
              'x-budibase-api-key': process.env.BUDIBASE_API_KEY
            })
          },
          body: JSON.stringify(budibaseData) // Corregido: Enviar objeto plano
        });

        // --- Depuración Mejorada ---
        const responseStatus = budibaseResponse.status;
        const responseText = await budibaseResponse.text();
        
        console.log('📥 BUDIBASE RESPONSE STATUS:', responseStatus);
        console.log('📥 BUDIBASE RESPONSE TEXT:', responseText);

        if (!budibaseResponse.ok) {
          console.error('❌ ERROR AL ENVIAR A BUDIBASE ❌');
          console.error('STATUS:', responseStatus);
          console.error('RESPONSE:', responseText);
          
          // Loguear el payload que se intentó enviar
          console.error('PAYLOAD ENVIADO:', JSON.stringify(budibaseData, null, 2));

          // No interrumpir el flujo, pero dejar un registro claro del error.
        } else {
          console.log('✅ Lead enviado a Budibase CRM exitosamente');
          try {
            const responseData = JSON.parse(responseText);
            console.log('📊 Respuesta de Budibase:', responseData);
          } catch {
            console.log('📊 Respuesta de Budibase (no es JSON):', responseText);
          }
        }
      } else {
        console.log('⚠️ BUDIBASE_WEBHOOK_URL no configurado, saltando integración CRM');
      }

    } catch (budibaseError) {
      console.error('❌ ERROR CRÍTICO CON BUDIBASE CRM ❌', budibaseError);
      if (budibaseError instanceof Error) {
        console.error('Stack:', budibaseError.stack);
      }
    }

    // Return successful response
    return NextResponse.json({
      message: 'Solicitud enviada exitosamente. Te contactaremos pronto.',
      bookingNumber: bookingNumber,
      status: 'success'
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json({
      error: 'Error interno del servidor. Por favor intenta nuevamente.'
    }, { status: 500 });
  }
}