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
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #374151 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
              <span style="background-color: #dc2626; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 24px;">I</span>
              <div>
                <h1 style="margin: 0; font-size: 28px;">INKSTUDIO</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 16px;">Nueva Solicitud de Tatuaje</p>
              </div>
            </div>
            <div style="background: rgba(220, 38, 38, 0.2); padding: 15px; border-radius: 8px; margin-top: 20px;">
              <h2 style="margin: 0; color: #dc2626; font-size: 20px;">Número de Reserva: ${bookingNumber}</h2>
            </div>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            
            <!-- Información Personal -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #1a1a1a; margin-top: 0; font-size: 20px; display: flex; align-items: center; gap: 10px;">
                <span style="background: #dc2626; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">👤</span>
                Información Personal
              </h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
                <div><strong>Nombre:</strong> ${bookingData.name}</div>
                <div><strong>Email:</strong> <a href="mailto:${bookingData.email}" style="color: #dc2626;">${bookingData.email}</a></div>
                <div><strong>Teléfono:</strong> <a href="tel:${bookingData.phone}" style="color: #dc2626;">${bookingData.phone}</a></div>
                <div><strong>Nos encontró por:</strong> ${howFoundUsLabels[bookingData.howFoundUs] || bookingData.howFoundUs}</div>
              </div>
            </div>
            
            <!-- Detalles del Tatuaje -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #1a1a1a; margin-top: 0; font-size: 20px; display: flex; align-items: center; gap: 10px;">
                <span style="background: #dc2626; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">🎨</span>
                Detalles del Tatuaje
              </h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
                <div><strong>Artista preferido:</strong> ${bookingData.preferredArtist}</div>
                <div><strong>Ubicación:</strong> ${bookingData.bodyLocation}</div>
                <div><strong>Tamaño:</strong> ${tattooSizeLabels[bookingData.tattooSize] || bookingData.tattooSize}</div>
                <div><strong>Presupuesto:</strong> ${budgetLabels[bookingData.budgetRange] || bookingData.budgetRange}</div>
                <div><strong>Estilo:</strong> ${colorStyleLabels[bookingData.colorStyle] || bookingData.colorStyle}</div>
              </div>
              
              <div style="margin-top: 20px;">
                <strong>Descripción:</strong>
                <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e5e7eb;">
                  ${bookingData.description}
                </div>
              </div>
            </div>
            
            <!-- Cita Programada -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #1a1a1a; margin-top: 0; font-size: 20px; display: flex; align-items: center; gap: 10px;">
                <span style="background: #dc2626; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">📅</span>
                Cita Solicitada
              </h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                <div><strong>Fecha:</strong> ${formattedDate}</div>
                <div><strong>Hora:</strong> ${bookingData.time}</div>
              </div>
            </div>

            ${bookingData.referenceImages.length > 0 ? `
            <!-- Imágenes de Referencia -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #1a1a1a; margin-top: 0; font-size: 20px; display: flex; align-items: center; gap: 10px;">
                <span style="background: #dc2626; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">🖼️</span>
                Imágenes de Referencia (${bookingData.referenceImages.length})
              </h3>
              <p>Se han adjuntado ${bookingData.referenceImages.length} imagen(es) de referencia a este email.</p>
              <div style="margin-top: 10px;">
                ${bookingData.referenceImages.map((img) => 
                  `<span style="display: inline-block; background: white; padding: 8px 12px; border-radius: 6px; margin: 4px; border: 1px solid #e5e7eb;">📎 ${img.name}</span>`
                ).join('')}
              </div>
            </div>
            ` : ''}
            
            <!-- Términos Aceptados -->
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #bae6fd;">
              <h3 style="color: #0369a1; margin-top: 0; font-size: 18px;">✅ Términos Aceptados</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Confirmó ser mayor de 18 años</li>
                <li>Aceptó los términos y condiciones</li>
                <li>Aceptó la política de privacidad</li>
              </ul>
            </div>
            
            <!-- Acción Requerida -->
            <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
              <h3 style="margin-top: 0; color: white; font-size: 20px;">🚨 ACCIÓN REQUERIDA</h3>
              <p style="margin: 10px 0; font-size: 16px;">Contactar al cliente dentro de las próximas 4-8 horas para confirmar disponibilidad y finalizar los detalles.</p>
              <div style="margin-top: 20px;">
                <a href="mailto:${bookingData.email}" style="background: white; color: #dc2626; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-right: 10px;">📧 Enviar Email</a>
                <a href="tel:${bookingData.phone}" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold;">📞 Llamar</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
              <p><strong>InkStudio - Sistema de Reservas</strong></p>
              <p>Fecha de solicitud: ${new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined
    };

    // Confirmation email to client  
    const clientEmailData = {
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [bookingData.email],
      subject: `🎨 Solicitud Recibida - InkStudio - ${bookingNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #374151 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
              <span style="background-color: #dc2626; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 24px;">I</span>
              <div>
                <h1 style="margin: 0; font-size: 28px;">INKSTUDIO</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 16px;">Arte en tu Piel</p>
              </div>
            </div>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 40px;">✓</div>
              <h2 style="color: #dc2626; margin: 0 0 10px 0;">¡Solicitud Recibida!</h2>
              <p style="color: #6b7280; font-size: 18px;">Hola <strong>${bookingData.name}</strong>, hemos recibido tu solicitud de tatuaje.</p>
            </div>

            <!-- Booking Number -->
            <div style="background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%); border: 2px solid rgba(220, 38, 38, 0.3); border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: 600;">TU NÚMERO DE RESERVA</p>
              <h3 style="margin: 0; color: #dc2626; font-size: 28px; font-weight: 800; font-family: 'Courier New', monospace; letter-spacing: 2px;">${bookingNumber}</h3>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px;">Guarda este número para futuras referencias</p>
            </div>
            
            <!-- Resumen de la Solicitud -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📋 Resumen de tu Solicitud</h3>
              
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280;">Artista preferido:</span>
                  <span style="font-weight: 600;">${bookingData.preferredArtist}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280;">Ubicación:</span>
                  <span style="font-weight: 600;">${bookingData.bodyLocation}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280;">Tamaño:</span>
                  <span style="font-weight: 600;">${tattooSizeLabels[bookingData.tattooSize] || bookingData.tattooSize}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280;">Presupuesto:</span>
                  <span style="font-weight: 600; color: #dc2626;">${budgetLabels[bookingData.budgetRange] || bookingData.budgetRange}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280;">Fecha solicitada:</span>
                  <span style="font-weight: 600;">${formattedDate}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                  <span style="color: #6b7280;">Hora solicitada:</span>
                  <span style="font-weight: 600;">${bookingData.time}</span>
                </div>
              </div>
            </div>
            
            <!-- Próximos Pasos -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 25px; border-radius: 12px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: white; font-size: 20px;">🚀 Próximos Pasos</h3>
              <div style="display: grid; gap: 15px; margin-top: 15px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <span style="background: rgba(255,255,255,0.2); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
                  <span>Revisaremos tu solicitud en detalle</span>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                  <span style="background: rgba(255,255,255,0.2); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
                  <span>Te contactaremos dentro de 4-8 horas</span>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                  <span style="background: rgba(255,255,255,0.2); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                  <span>Confirmaremos fecha, hora y detalles finales</span>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                  <span style="background: rgba(255,255,255,0.2); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</span>
                  <span>Te enviaremos las instrucciones de preparación</span>
                </div>
              </div>
            </div>
            
            <!-- Información Importante -->
            <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 20px; margin: 25px 0;">
              <h4 style="color: #92400e; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">⚠️</span>
                Información Importante
              </h4>
              <ul style="margin: 10px 0; padding-left: 20px; color: #92400e;">
                <li style="margin-bottom: 8px;">Se requiere un depósito no reembolsable para asegurar tu reserva</li>
                <li style="margin-bottom: 8px;">Las citas requieren aviso mínimo de 48 horas para reprogramación</li>
                <li style="margin-bottom: 8px;">Debes venir bien hidratado y haber comido antes de la sesión</li>
                <li>Evita el alcohol y medicamentos anticoagulantes 24 horas antes</li>
              </ul>
            </div>
            
            <!-- Contacto -->
            <div style="border-top: 2px solid #f0f0f0; padding-top: 25px; margin-top: 30px; text-align: center;">
              <h4 style="color: #1a1a1a; margin-bottom: 15px;">¿Preguntas? ¡Contáctanos!</h4>
              <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
                <a href="mailto:info@inkstudio.com" style="color: #dc2626; text-decoration: none; font-weight: 600;">📧 info@inkstudio.com</a>
                <a href="tel:+1234567890" style="color: #dc2626; text-decoration: none; font-weight: 600;">📞 +1 (234) 567-8890</a>
              </div>
              <p style="color: #6b7280; margin: 0;">📍 123 Arte Street, Ciudad</p>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 14px; border-top: 1px solid #e5e7eb; margin-top: 25px;">
              <p style="margin: 0 0 10px 0;"><strong>InkStudio - Arte en tu Piel</strong></p>
              <p style="margin: 0;">¡Estamos emocionados de crear tu próxima obra de arte!</p>
            </div>
          </div>
        </div>
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