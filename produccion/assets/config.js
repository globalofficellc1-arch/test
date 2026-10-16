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

  // Links de pago de Stripe (Payment Links). Los botones de cada plan llevan directo al checkout.
  // Si un plan queda vacío, su botón vuelve a llevar al formulario de contacto.
  stripeLinks: {
    "esencial": "https://buy.stripe.com/3cI00jgDP8t6grz61CdIA02",
    "pro": "https://buy.stripe.com/bJecN59bn6kYdfnblWdIA03",
    "ano-cubierto": "https://buy.stripe.com/cNifZhdrDeRufnv3TudIA04"
  },

  // Mostrar debajo de cada plan la referencia de precios del benchmark de mercado.
  // Dejar en true solo en el entorno de prueba; en el sitio oficial poner false.
  showMarketRef: false
};
