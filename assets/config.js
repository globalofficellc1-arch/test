/* Configuración compartida por todas las landings de prueba.
   Editá estos valores en un solo lugar. */
window.GO_CONFIG = {
  // Número de WhatsApp en formato internacional, sin "+" ni espacios.
  // ⚠️ Es el placeholder que tiene hoy el sitio oficial: reemplazar por el real.
  whatsapp: "1234567890",

  // URL a la que se envían los leads (webhook de CRM, n8n, Make, etc.).
  // Vacío = modo prueba: el lead se muestra en la consola y no se envía a ningún lado.
  leadEndpoint: "",

  // Después de enviar el formulario, ¿abrir WhatsApp con el mensaje precargado?
  openWhatsAppAfterSubmit: false,

  // Mostrar debajo de cada plan la referencia de precios del benchmark de mercado.
  // Dejar en true solo en el entorno de prueba; en el sitio oficial poner false.
  showMarketRef: true
};
