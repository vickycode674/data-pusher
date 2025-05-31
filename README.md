
1. ✅ **Account CRUD**
2. ✅ **Destination CRUD (linked to account)**
3. ✅ **Data Handler (incoming data push)**

---

## 📘 API DOCUMENTATION

---

## 1️⃣ ACCOUNT MODULE (CRUD)

### 🔹 Create Account

**POST** `http://localhost:3000/accounts`  #3000 OR ANY RUNNING PORT

**Body:**

```json
{
  "email": "john.doess@example.com",
  "account_name": "John'sshere Test App",
  "website": "https://johntest.com"
}
```

**Response:**

```json
{
  "id": "57145bc4-f291-4322-9946-e706c780e3a1",
  "email": "john.doess@example.com",
  "account_name": "John'sshere Test App",
  "website": "https://johntest.com",
  "app_secret_token": "209e2d6a-9681-48a4-b4a5-3e32eed67345"
}
```

---

### 🔹 Get Account by ID

**GET** `http://localhost:3000/accounts/:id`

Example:

```
GET http://localhost:3000/accounts/57145bc4-f291-4322-9946-e706c780e3a1
```

---

### 🔹 Update Account

**PUT** `http://localhost:3000/accounts/:id`

**Body (example):**

```json
{
  "account_name": "John Updated App",
  "website": "https://john-updated.com"
}
```

---

### 🔹 Delete Account

**DELETE** `http://localhost:3000/accounts/:id`

Example:

```
DELETE http://localhost:3000/accounts/57145bc4-f291-4322-9946-e706c780e3a1
```

 *Note: Deleting an account will also delete all its destinations (CASCADE)*

## 2️⃣ DESTINATION MODULE (CRUD)

### 🔹 Create Destination

**POST** `http://localhost:3000/destinations/accounts/:accountId`

**Example URL:**

```
POST http://localhost:3000/destinations/accounts/57145bc4-f291-4322-9946-e706c780e3a1
```

**Body:**

```json
{
  "url": "https://webhook.site/7a849bbf-18d9-4504-9429-687a13cb41a2", #generate a new url link from webhook website
  "http_method": "POST",
  "headers": {
    "APP_ID": "1234APPID1234",
    "APP_SECRET": "some-secret-value",
    "ACTION": "user.update",
    "Content-Type": "application/json",
    "Accept": "*/*"
  }
}
```

**Response:**

```json
{
  "id": "9997befc-474b-4386-833f-8d773cfa35d3",
  "account_id": "57145bc4-f291-4322-9946-e706c780e3a1",
  "url": "https://webhook.site/7a849bbf-18d9-4504-9429-687a13cb41a2",
  "http_method": "POST",
  "headers": {
    "APP_ID": "1234APPID1234",
    "APP_SECRET": "some-secret-value",
    "ACTION": "user.update",
    "Content-Type": "application/json",
    "Accept": "*/*"
  }
}
```

---

### 🔹 Get Destination by ID

**GET** `http://localhost:3000/destinations/:id`

Example:

```
GET http://localhost:3000/destinations/9997befc-474b-4386-833f-8d773cfa35d3
```

---

### 🔹 Update Destination

**PUT** `http://localhost:3000/destinations/:id`

**Body:**

```json
{
  "url": "https://webhook.site/updated-url-xyz",
  "http_method": "PUT",
  "headers": {
    "Content-Type": "application/json",
    "X-Updated": "true"
  }
}
```

---

### 🔹 Delete Destination

**DELETE** `http://localhost:3000/destinations/:id`

Example:

```
DELETE http://localhost:3000/destinations/9997befc-474b-4386-833f-8d773cfa35d3
```

---


## 3️⃣ DATA HANDLER MODULE

### 🔹 Push Data to Server

**POST** `http://localhost:3000/server/incoming_data`

**Headers:**

```
CL-X-TOKEN: 209e2d6a-9681-48a4-b4a5-3e32eed67345 #make sure to copy the generated token from account
Content-Type: application/json
```

**Body:**

```json
{
  "user_id": "101",
  "event": "update",
  "name": "Johnny Blaze"
}
```

✅ If token is valid, data will be forwarded to **all destinations** of the account.

---

 ✅ Possible Responses:

| Scenario                      | Response                                                               |
| ----------------------------- | ---------------------------------------------------------------------- |
| ✅ Valid request               | `200 OK` + `{ message: "Data processed", results: [...] }`             |
| ❌ Missing or invalid token    | `401 Unauthorized` + `{ error: "Un Authentic" or "Invalid Token" }`    |
| ❌ Invalid body / not JSON     | `400 Bad Request` + `{ error: "Invalid Data" }`                        |
| ✅ No destinations for account | `200 OK` + `{ message: "No destinations found" }`                      |
| ❌ Destination URL broken      | `status: error`, `message: "Request failed with status code 404"` etc. |

---

## ✅ Flow Summary

1. **Create account** → get `account_id` + `app_secret_token`
2. **Use account\_id** to create **one or more destinations**
3. **Use app\_secret\_token** to **push data** to `/server/incoming_data`
4. Data gets **forwarded to all linked destinations**

---
If the destination Method is POST/PUT it will be return the data in json format 
else if GET METHOD It will return as query params along the request
