using API.Application.Common.Services;
using Resend;

namespace API.Application.Services.System.Email
{
    public class EmailService : IEmailService
    {
        private readonly IResend _resend;

        public EmailService(IResend resend)
        {
            _resend = resend;
        }

        public async Task SendVerificationCodeAsync(string email, string code)
        {
            try
            {
                var emailRequest = new EmailMessage
                {
                    From = "onboarding@resend.dev",
                    To = "juancajas1905@gmail.com",
                    Subject = "Código de verificación - Plataforma de Adopción",
                    HtmlBody = GetEmailTemplate(code)
                };

                var response = await _resend.EmailSendAsync(emailRequest);

                if (response == null)
                {
                    throw new Exception("No se recibió respuesta de Resend");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en SendVerificationCodeAsync: {ex.Message}");
                throw;
            }
        }

        private string GetEmailTemplate(string code)
        {
            return $@"
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Código de Verificación</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .header {{
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #007bff;
        }}
        .header h1 {{
            color: #007bff;
            margin: 0;
        }}
        .content {{
            padding: 20px 0;
            text-align: center;
        }}
        .code {{
            font-size: 32px;
            font-weight: bold;
            color: #007bff;
            letter-spacing: 5px;
            padding: 20px;
            background-color: #f0f8ff;
            border-radius: 6px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }}
        .footer {{
            text-align: center;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
            font-size: 12px;
            color: #999;
        }}
        .warning {{
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            padding: 10px;
            border-radius: 4px;
            margin: 15px 0;
            font-size: 12px;
            color: #856404;
        }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Verificación de Email</h1>
        </div>
        <div class='content'>
            <p>¡Bienvenido a la Plataforma de Adopción!</p>
            <p>Tu código de verificación es:</p>
            <div class='code'>{code}</div>
            <p>Este código expirará en 15 minutos.</p>
            <div class='warning'>
                <strong>Importante:</strong> No compartas este código con nadie. Nunca te lo pediremos por email o teléfono.
            </div>
        </div>
        <div class='footer'>
            <p>&copy; 2025 Plataforma de Adopción. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>";
        }
    }
}
