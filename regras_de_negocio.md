# PROJETO CSAT - CX

**Integração Automatizada: Zendesk ↔ GitHub ↔ Google Apps Script**

Este projeto consiste na implantação de um sistema automatizado para coleta, validação e registro de notas de satisfação (CSAT) dos clientes, garantindo a integridade dos dados e otimizando o fechamento de tickets no Zendesk.

---

## 📋 Resumo do Projeto
O fluxo automatiza a jornada da pesquisa desde o envio do link pelo atendente até o encerramento definitivo do chamado. O diferencial desta solução é a camada de segurança, que utiliza bloqueios de IP e verificações de sistema para impedir autoavaliações ou fraudes internas.

* **Responsável:** Luiz Torres Nascimento
* **Contato:** [luiz.nascimento@kingstarcolchoes.com.br](mailto:luiz.nascimento@kingstarcolchoes.com.br)

---

## ⚙️ Fluxo de Operação (As 4 Fases)

| Fase | Plataforma | Descrição da Ação |
| :--- | :--- | :--- |
| **1** | **Zendesk** | O atendente executa a macro "Enviar CSAT". O sistema insere a tag `csat_enviada`, altera o status para Resolvido e envia o link dinâmico ao cliente. |
| **2** | **GitHub** | Hospeda o formulário web. O sistema captura o `{{ticket.id}}` da URL e apresenta a escala de 1 a 5 para o cliente. |
| **3** | **Apps Script** | Motor de integração. Recebe a nota via POST, autentica-se na API do Zendesk e atualiza o campo customizado "Nota CSAT". |
| **4** | **Zendesk** | Um gatilho identifica a atualização da nota e altera o status do ticket de Resolvido para Fechado/Finalizado. |

---

## 🚀 Regras de Negócio e Métricas
* **Prazo de Resposta:** O cliente tem até 4 dias corridos para atribuir a nota.
* **Encerramento Automático:** Se não houver interação em 4 dias, o ticket transita para "Fechado" sem nota.
* **Validação de Nota:** O preenchimento do campo "Nota CSAT" dispara o encerramento imediato do atendimento.

---

## 🛡️ Segurança e Auditoria
Para garantir a confiabilidade das métricas, implementei camadas de proteção contra acessos indevidos:

* **Bloqueio de IP:** Restrição de acesso a redes externas, bloqueando o IP de saída da King Star (incluindo Wi-Fi corporativo).
* **Assinatura Zendesk:** Bloqueio de redirecionamentos originados diretamente da interface do agente.
* **Logs de Auditoria:** Tentativas de acesso interno são registradas e bloqueadas com a mensagem "Acesso Não Permitido".

---

## 🛠️ Gestão e Manutenção

### Acessos
* **Relatórios:** A visibilidade das notas é restrita a Líderes, Qualidade e Gestão. Agentes não visualizam notas individuais.
* **Backend (Apps Script):** Projeto "Pesquisa KSC" de propriedade da TI. Alterações devem ser registradas em "Gerenciar Implantações".

### Repositório
* **Organização:** `KING-STAR-COLCHOES`
* **Fluxo:** Alterações de código devem seguir o padrão Commit e Push via GitHub Desktop ou CLI.
