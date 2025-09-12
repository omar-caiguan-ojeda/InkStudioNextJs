import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.BUDIBASE_WEBHOOK_URL) {
      return NextResponse.json({
        success: false,
        error: 'BUDIBASE_WEBHOOK_URL no está configurado'
      }, { status: 400 });
    }

    // Datos de prueba
    const testData = {
      nombre: "Test Usuario",
      email: "test@example.com",
      telefono: "+56912345678",
      como_nos_encontro: "Test",
      artista_preferido: "Test Artist",
      ubicacion_tatuaje: "Brazo",
      tamano: "small",
      presupuesto: "budget1",
      descripcion: "Test de conexión con Budibase",
      estilo_color: "color",
      fecha_solicitada: new Date().toISOString().split('T')[0],
      hora_solicitada: "10:00",
      numero_reserva: `TEST${Date.now()}`,
      estado: 'test',
      fecha_creacion: new Date().toISOString(),
      mayor_edad: true,
      imagenes_referencia: [],
      notas_admin: "Test de conexión automático",
      fecha_contacto: null,
      fecha_confirmacion: null
    };

    console.log('🧪 TESTING BUDIBASE CONNECTION');
    console.log('🔗 URL:', process.env.BUDIBASE_WEBHOOK_URL);
    console.log('📤 Test Data:', JSON.stringify(testData, null, 2));

    // Intentar enviar a Budibase
    const response = await fetch(process.env.BUDIBASE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.BUDIBASE_API_KEY && {
          'Authorization': `Bearer ${process.env.BUDIBASE_API_KEY}`
        })
      },
      body: JSON.stringify(testData)
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    console.log('📥 BUDIBASE RESPONSE STATUS:', response.status);
    console.log('📥 BUDIBASE RESPONSE:', responseData);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: 'Error en la respuesta de Budibase',
        details: {
          status: response.status,
          statusText: response.statusText,
          response: responseData,
          headers: Object.fromEntries(response.headers.entries())
        }
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Conexión con Budibase exitosa',
      details: {
        status: response.status,
        response: responseData,
        testData: testData
      }
    });

  } catch (error) {
    console.error('❌ ERROR TESTING BUDIBASE:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error al conectar con Budibase',
      details: {
        message: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : undefined
      }
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testType } = await request.json();
    
    if (testType === 'webhook-only') {
      // Test sin autenticación (solo webhook)
      const testData = { test: true, timestamp: new Date().toISOString() };
      
      const response = await fetch(process.env.BUDIBASE_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
      });

      const responseText = await response.text();
      
      return NextResponse.json({
        success: response.ok,
        method: 'webhook-only',
        status: response.status,
        response: responseText
      });
    }

    return NextResponse.json({
      error: 'Tipo de test no válido'
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
