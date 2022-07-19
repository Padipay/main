const dotenv = require('./dotenvConfig')()

const firebase_private_key_b64 = Buffer.from(process.env.PRIVATE_KEY, 'base64');
const firebase_private_key = firebase_private_key_b64.toString('utf8');

module.exports = {
  "project_id": process.env.PROJECT_ID,
  "private_key": firebase_private_key,
  "client_email": process.env.CLIENT_EMAIL,
}

// {
//   "project_id": "padipay-ee645",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqBv9spSjQNm0F\nreAYbPcVb5OSrHzs74tTPEL0+djv0Na9IAoBKiV0vMjjvRX8ltEi9Mtooj8LseGv\nKbp9CXvTGRdYSmWp11zTSlTOEv1SuEqu4KsPOOd3/mUI8vUI4f0lKTyGq2LXOi+p\n4HVgtneFSyRp+7S8o3/74pYAKDJfdIAbnJI7021iy+E5mwGEY1CboGiJLlMODvQc\nA0Zp44qw+Jq8+YtRyhFxZ6ZjzZd1nO1nbVXuobxwerRhmLZBVwBoqFVwH7ZjqYoN\nU7jIZFo9tnB+bpafp9fpS9l9Nttuu8cLUq/5ubU3Gr1raJsZ5o84Z5dS1iwr8Kzi\n4knyx4v7AgMBAAECggEABe3vi2zpEvXK8IdDSObH6R32ggd05dhmvfTciumJqLda\nPcc3whmjq8IHqXWHJkNmMLdjvpbl5vUBn1evsruZb1+xIjmZ+QXTLWUqtvMPlYpq\nxFV+ca302IjtIhZC+FfVOa4J99JTRJk5X02+GizS1zmrH+0QvQFgrbqVq5S7SPvb\nBNSG8evZ4kE3b2xnbdyKVdSQPnkmdETKZKB9e9esoMnLGBZHDXnN8B9u61CB9A01\nGTwq1ywsEZcbn4VWe8aDGaI42v8iXDyDkzT50rpnQrIf5iR98HRc0TRO87BmQqKR\n+sy/3qB5V5M4tlMC7ovM2Rer9ib/rm5M58hJiG0W9QKBgQDel9vdWshq15i8V0Bk\nIWuKSeuxmsXa3gOzYnPX/BnMrI1G1FuFbTxzBm4GIms1Ys+CO2MgvxSs0UD7d6U8\nEzW8Oyzn2p6LpdKSeg8Z99TJUnSeiPBEwIqD/qJ16KtMFacOVkQXwDSDAmHMRgH0\no2QIkvkmXXsxCICwn5p3+Lj8JQKBgQDDi4hHSFbrO9Q/+Z04tyWtTJ7rknWVNRzu\nr7doHneHo+5WVI3EDui/v8gOgIKrCqnk/WnpimPewYlzLEQDKAafK3xhoWD63x70\neGE8VajwD4+2fIjIm9GFsqRxafEaZ7egwGaA/xF+JMD5fFoh5F2+DCSQc/za1M7g\naz8o/CvdnwKBgQCE5zL1dXDYqiWdvpLJtlKZXQ2HG5wq1AhtoMj+Gp3k4NnxgnWq\nstA29Y3Xx9EvLPItFfxX3v8fOEmOW5+iwO2Cl+p1/MhRJQ8XOh2uKZU5JyxORAEB\na9zIds7Vi7hLU1pNayB49d/koRV3fA1K3guqOubcC1C0tBjyXDlEjJMWqQKBgBfx\nyRE5eXM6k0X2MdtVCecLn9YmzAEmTNGpcKLuQCK63x9xIR7l2HhKapvj/pwlJSKm\nKUbwrEQFnOgefoGIcC8jawqlcTOnCKpU50s1Dge/UBC/dRxjgCeH9XzxxRU/qAum\nI6ceFK1GoN6r7HmD9jqkUAHkQg0ly+NNHqHNJy3vAoGAXT9XuFGYZrZ7IdVLmhFH\npKI9G5kxwjbAcWWNALIg7A7zlRuGI40ZyC8cQfRGxardMWDzcb66iUR+G7sIg42/\nLn+7SHttzjruuI4VXAAMST+oJHkT/UfdA3xy+Jr8z/tNrME4uzNWoOTZ0tGJ+nmr\nABjLbQgEnSoFifVhfpXzyPQ=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-9246w@padipay-ee645.iam.gserviceaccount.com"
// }
