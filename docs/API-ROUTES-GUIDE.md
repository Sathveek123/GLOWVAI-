# GLOW VAI: REST API Routes & Schema Reference

This document provides exhaustive documentation of all Next.js Route Handlers (`app/api/*`) powering GLOW VAI, detailing endpoints, payload structures, Zod validation rules, and HTTP response specs.

---

## Endpoint Matrix

| Method | Endpoint | Description | Target Google Sheet Tab |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/lead` | Creates initial pending lead record | `Leads` |
| `PATCH` | `/api/lead` | Updates completed skin scores for session | `Leads` |
| `POST` | `/api/newsletter` | Registers email newsletter subscription | `Newsletter` |
| `POST` | `/api/waitlist` | Logs pincode waitlist & shop gate unlock | `Waitlist` |
| `POST` | `/api/contact` | Submits user inquiry message | `Contacts` |
| `POST` | `/api/feedback` | Submits customer review | `Feedback` |
| `POST` | `/api/data-request` | Processes DPDP Act data download/erasure | `DataRequests` |

---

## Endpoint Details

### 1. `POST /api/lead`
Creates a new lead session prior to initiating the camera scan.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Payload
```json
{
  "name": "Ananya Sharma",
  "phone": "9876543210",
  "email": "ananya@example.com",
  "city": "Bengaluru",
  "skin_goals": ["hydration", "brightening"],
  "consent": true
}
```

#### Zod Validation Schema ([lib/schemas.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/schemas.ts))
- `name`: String, minimum 2 characters.
- `phone`: String, 10-digit Indian phone number format.
- `email`: String, valid email format.
- `consent`: Boolean, must be `true`.

#### Success Response (`200 OK`)
```json
{
  "ok": true,
  "session_id": "8f3b2a19-4c12-4d7a-8b9e-0123456789ab",
  "message": "Lead session created successfully"
}
```

---

### 2. `PATCH /api/lead`
Updates skin analysis results upon completion of the canvas scan.

#### Request Payload
```json
{
  "session_id": "8f3b2a19-4c12-4d7a-8b9e-0123456789ab",
  "overall_score": 82,
  "sub_scores": {
    "hydration": 78,
    "texture": 85,
    "tone": 80,
    "clarity": 84
  }
}
```

#### Success Response (`200 OK`)
```json
{
  "ok": true,
  "session_id": "8f3b2a19-4c12-4d7a-8b9e-0123456789ab",
  "status": "completed"
}
```

---

### 3. `POST /api/newsletter`
Captures newsletter subscriptions from footer and overlay forms.

#### Request Payload
```json
{
  "email": "user@example.com",
  "source": "footer_cta",
  "consent": true
}
```

#### Success Response (`200 OK`)
```json
{
  "ok": true,
  "message": "Subscribed to GLOW VAI newsletter"
}
```

---

### 4. `POST /api/waitlist`
Captures pincode availability inquiries and early access shop unlock emails.

#### Request Payload
```json
{
  "email": "user@example.com",
  "pincode": "560001",
  "city": "Bengaluru",
  "source": "shop_gate"
}
```

#### Success Response (`200 OK`)
```json
{
  "ok": true,
  "message": "Waitlist submission recorded"
}
```

---

### 5. `POST /api/contact`
Handles contact page inquiries.

#### Request Payload
```json
{
  "name": "Rohan Verma",
  "email": "rohan@example.com",
  "subject": "Order status inquiry",
  "message": "How do I update my delivery address for order #1042?"
}
```

#### Success Response (`200 OK`)
```json
{
  "ok": true,
  "message": "Contact message received"
}
```

---

### 6. `POST /api/data-request`
Handles DPDP Act compliance requests (Data Erasure / Export).

#### Request Payload
```json
{
  "email": "user@example.com",
  "request_type": "erasure",
  "details": "Please delete all recorded lead sessions associated with my email."
}
```

#### Success Response (`200 OK`)
```json
{
  "ok": true,
  "message": "Data request submitted for DPDP audit processing"
}
```
