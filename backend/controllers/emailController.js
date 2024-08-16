import postmark from "postmark";

const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN;
const EMAIL_FROM = process.env.EMAIL_FROM || 'gabbie@myeventlink.co';

// Send an email:
let client;
const init = () => {
  if (client) {
    return client;
  }

  if (!POSTMARK_API_TOKEN) {
    console.warn('POSTMARK_API_KEY not set');

    return;
  }

  client = new postmark.ServerClient(POSTMARK_API_TOKEN);

  return client;
}


/**
 * Send an email, using the postmark API
 *
 * @param {*} destiny
 * @param {*} data
 * @param {*} template_alias
 * @returns {Promise}
 */
export const sendEmail = (destiny, data, template_alias) => {
  console.log('sending email to', { destiny, template_id: template_alias });

  const client = init();

  if (!client) {
    console.warn('Could not send email, client not initialized', { client });
    return;
  }

  console.log('Sending email with template', { destiny, template_alias });

  const result = client.sendEmailWithTemplate({
    From: EMAIL_FROM,
    To: 'test@blackhole.postmarkapp.com', // destiny,
    TemplateAlias: template_alias,
    TemplateModel: { ...data },
  });

  console.log('Sent email', { result });

  return result;
};

