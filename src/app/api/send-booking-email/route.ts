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
    <img src="https://inkstudio-tattoo.vercel.app/icon.png" alt="InkStudio Logo" width="60" class="logo">
    <h1>INKSTUDIO</h1>
    <p style="margin: 5px 0 0 0; color: #94a3b8;">Nueva Solicitud de Tatuaje</p>
  </td></tr>
  <tr><td class="content">
    <div class="booking-number"><h2>Número de Reserva: ${bookingNumber}</h2></div>
    <div class="card">
      <h2>Información Personal</h2>
      <p><strong>Nombre:</strong> ${bookingData.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${bookingData.email}" style="color: #ef4444;">${bookingData.email}</a></p>
      <p><strong>Teléfono:</strong> <a href="tel:${bookingData.phone}" style="color: #ef4444;">${bookingData.phone}</a></p>
      <p><strong>Nos encontró por:</strong> ${howFoundUsLabels[bookingData.howFoundUs] || bookingData.howFoundUs}</p>
    </div>
    <div class="card">
      <h2>Detalles del Tatuaje</h2>
      <p><strong>Artista preferido:</strong> ${bookingData.preferredArtist}</p>
      <p><strong>Ubicación:</strong> ${bookingData.bodyLocation}</p>
      <p><strong>Tamaño:</strong> ${tattooSizeLabels[bookingData.tattooSize] || bookingData.tattooSize}</p>
      <p><strong>Presupuesto:</strong> ${budgetLabels[bookingData.budgetRange] || bookingData.budgetRange}</p>
      <p><strong>Estilo:</strong> ${colorStyleLabels[bookingData.colorStyle] || bookingData.colorStyle}</p>
      <p style="margin-top: 20px;"><strong>Descripción:</strong><br>${bookingData.description}</p>
    </div>
    <div class="card">
      <h2>Cita Solicitada</h2>
      <p><strong>Fecha:</strong> ${formattedDate}</p>
      <p><strong>Hora:</strong> ${bookingData.time}</p>
    </div>
    ${bookingData.referenceImages.length > 0 ? `
    <div class="card">
      <h2>Imágenes de Referencia (${bookingData.referenceImages.length})</h2>
      <p>Las imágenes se han adjuntado a este correo.</p>
      <ul>${bookingData.referenceImages.map(img => `<li>${img.name}</li>`).join('')}</ul>
    </div>` : ''}
    <div class="card" style="background-color: rgba(34, 197, 94, 0.1); border-color: #22c55e;">
      <h2 style="color: #22c55e;">✅ Términos Aceptados</h2>
      <ul style="color: #a7f3d0;">
        <li>Confirmó ser mayor de 18 años</li>
        <li>Aceptó los términos y condiciones</li>
        <li>Aceptó la política de privacidad</li>
      </ul>
    </div>
    <div style="text-align: center; margin-top: 30px;">
      <a href="mailto:${bookingData.email}" class="button">Contactar Cliente</a>
    </div>
  </td></tr>
  <tr><td class="footer">
    <p>InkStudio - Sistema de Reservas</p>
    <p>Fecha de solicitud: ${new Date().toLocaleString('es-ES')}</p>
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
  h2 { color: #dc2626; margin-top: 0; font-size: 20px; }
  p { line-height: 1.6; color: #cbd5e1; }
  .booking-number { background-color: rgba(220, 38, 38, 0.2); color: #ef4444; padding: 20px; border-radius: 12px; text-align: center; margin: 25px 0; }
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
    <img src="https://inkstudio-tattoo.vercel.app/icon.png" alt="InkStudio Logo" width="60" class="logo">
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
    <div class="card" style="background-color: rgba(59, 130, 246, 0.1); border-color: #3b82f6;">
      <h3 style="color: #60a5fa;">🚀 Próximos Pasos</h3>
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