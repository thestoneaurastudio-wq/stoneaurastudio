# 🔑 Razorpay Setup Guide

## Current Status
✅ Environment variables are set up  
✅ Code is ready for both Test and Live modes  

---

## For Testing (अभी के लिए)

1. `.env` file में यह है:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
   ```

2. अभी test mode में काम कर रहा है
3. Real payment नहीं होगा

---

## Going Live (जब website live करनी हो)

### Step 1: Razorpay Account बनाएं
1. Visit: https://dashboard.razorpay.com/signup
2. Business details भरें
3. KYC complete करें

### Step 2: Live API Key लें
1. Dashboard में login करें
2. **Settings** > **API Keys** पर जाएं
3. "Generate Live Key" click करें
4. **Key ID** copy करें (जैसे: `rzp_live_ABC123XYZ`)

### Step 3: .env File Update करें
1. `.env` file खोलें
2. यह line बदलें:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_live_ABC123XYZ
   ```
   (अपनी actual live key डालें)

### Step 4: Website Redeploy करें
```bash
npm run build
```

---

## 🔒 Security Notes

- ✅ `.env` file git में commit नहीं होगी (safe है)
- ✅ `.env.example` में example values हैं
- ⚠️ कभी भी live keys को publicly share मत करें

---

## WhatsApp Number Update करना

`.env` file में:
```
VITE_WHATSAPP_NUMBER=919876543210
```
अपना actual WhatsApp number डालें (country code के साथ, बिना +)

---

## Testing Razorpay

Test Mode में ये test cards use कर सकते हैं:
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

---

## Support

अगर कोई problem हो तो:
- Razorpay Docs: https://razorpay.com/docs/
- Support: support@razorpay.com
