function doPost(e) {
  // --- CONFIGURAÇÕES DE SEGURANÇA ---
  const SECURITY_TOKEN = [TOKEN_HANDSHAKE]; // A "senha" entre o seu site e o Google
  const CONFIG = {
    subdominio: "[SUBDOMAIN_ZENDESK]",
    email: "[USER ZENDESK]/token",
    token: [TOKEN_API], // NOVO
    fieldId: 39182752125335
  };

  try {
    const data = JSON.parse(e.postData.contents);

    // 1. VALIDAÇÃO DA CHAVE DE SEGURANÇA
    if (data.security_token !== SECURITY_TOKEN) {
      return ContentService.createTextOutput("Acesso Negado").setMimeType(ContentService.MimeType.TEXT);
    }

    // 2. VALIDAÇÃO DOS DADOS
    const ticketId = data.ticket_id;
    const nota = parseInt(data.nota);

    if (isNaN(nota) || nota < 1 || nota > 5 || !ticketId) {
      return ContentService.createTextOutput("Dados Inválidos").setMimeType(ContentService.MimeType.TEXT);
    }

    // 3. MONTAGEM DO PAYLOAD PARA O ZENDESK
    const zendeskPayload = {
      "tickets": [{
        "id": ticketId,
        "custom_fields": [{ "id": CONFIG.fieldId, "value": nota }]
      }]
    };

    const authHeader = "Basic " + Utilities.base64Encode(CONFIG.email + ":" + CONFIG.token);
    const url = `https://${CONFIG.subdominio}.zendesk.com/api/v2/tickets/update_many.json`;

    const options = {
      "method": "put",
      "contentType": "application/json",
      "headers": { "Authorization": authHeader },
      "payload": JSON.stringify(zendeskPayload),
      "muteHttpExceptions": true
    };

    const response = UrlFetchApp.fetch(url, options);
    
    return ContentService.createTextOutput("Processado").setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService.createTextOutput("Erro Interno").setMimeType(ContentService.MimeType.TEXT);
  }
}
