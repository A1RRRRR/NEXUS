# TikTok Developer Setup Guide

Follow these steps **once** to get your TikTok API credentials.

---

## 1. Create a TikTok Developer Account

1. Go to **https://developers.tiktok.com**
2. Click **"Login"** and sign in with any TikTok account (this is your developer account, not a posting account)
3. Click **"My Apps"** → **"Connect an app"**

---

## 2. Create Your App

Fill in:
| Field | Value |
|---|---|
| App name | `NEXUS Auto Post` (or anything) |
| App category | `Content publishing` |
| Platform | `Web` |
| Redirect URI | `http://localhost:8080/callback` |

Click **"Submit for review"**.

> **Note:** Basic review takes 1–3 business days. You can test with a sandbox
> environment immediately while waiting.

---

## 3. Get Your Credentials

After approval:

1. Go to **My Apps → your app → "Keys & credentials"**
2. Copy **Client key** and **Client secret**
3. Paste them into your `.env` file:

```env
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
TIKTOK_REDIRECT_URI=http://localhost:8080/callback
```

---

## 4. Enable Required Scopes

In your app settings, enable:
- `user.info.basic`
- `video.publish`
- `video.upload`

---

## 5. Add Posting Accounts

Each account that will post videos must be authorized separately.
Run this for **each account**:

```bash
python scripts/add_account.py
```

This opens a browser, lets you log in to TikTok, and stores the tokens securely.

---

## How Many Accounts Do You Need?

TikTok has a soft limit of **~5 posts per day** per account before triggering
spam detection. To post 150–350 videos per day:

| Daily target | Accounts needed |
|---|---|
| 150/day | 30 accounts |
| 200/day | 40 accounts |
| 350/day | 70 accounts |

Each account needs to authorize the app once via `scripts/add_account.py`.

---

## Token Refresh

- **Access tokens** expire every 24 hours — refreshed automatically by NEXUS
- **Refresh tokens** last 365 days — you'll get a warning email when they approach expiry
- If a refresh fails (token revoked), the account is deactivated and you'll see it in the dashboard

---

## Sandbox Testing

While waiting for app approval, TikTok provides a sandbox where you can test
the full API flow without a real account. The sandbox does not actually post
to TikTok — it just validates the API calls.

Enable sandbox in your developer app settings.
