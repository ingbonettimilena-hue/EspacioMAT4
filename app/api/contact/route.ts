import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, mensaje } = body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Enviar email usando Resend
    const data = await resend.emails.send({
      from: 'Espacio MAT <contacto@espaciomat.com>',
      to: ['contacto@espaciomat.com'],
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #f4f4f4;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
              }
              .content {
                background-color: #fff;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #555;
              }
              .value {
                margin-top: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0; color: #333;">Nuevo mensaje de contacto</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Nombre:</div>
                  <div class="value">${nombre}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Mensaje:</div>
                  <div class="value">${mensaje.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: 'Email enviado correctamente', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' },
      { status: 500 }
    );
  }
}

// Made with Bob
