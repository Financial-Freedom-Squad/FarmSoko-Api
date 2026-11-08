# FarmSoko-Api 🌾

A RESTful API backend for the **FarmSoko** agricultural marketplace platform, built using modern **Node.js** and **Express.js** (ES Modules).

---

## 🚀 Features

- **Modern ES Modules (`"type": "module"`)**: Native `import` / `export` syntax without transpilation steps.
- **Express.js 5+**: Latest robust HTTP server routing and middleware handling.
- **Agricultural Marketplace Domain**:
  - **Produce Categories**: Grains & Cereals, Fresh Vegetables, Fruits, Dairy & Poultry, Roots & Tubers.
  - **Products / Produce Listings**: Full CRUD with search, category filtering, price range filter, stock status, sorting, and pagination.
- **Security Middlewares**:
  - `helmet`: Secure HTTP headers protection.
  - `cors`: Configurable Cross-Origin Resource Sharing.
- **Centralized Error Handling**: Standardized operational `ApiError` class and global error handling middleware.
- **Consistent Response Formatting**: Unified JSON response structure (`successResponse`) across all endpoints.
- **Environment Management**: Configured via `dotenv` with sensible fallbacks.
- **Logging**: HTTP request logging powered by `morgan`.
- **Live Reload**: Fast development workflow using `nodemon`.
- **Automated Testing**: Fast integration testing using Node's native test runner (`node --test`) and `supertest`.

---

## 📁 Project Architecture

```
FarmSoko-Api/
├── src/
│   ├── config/
│   │   └── env.js                     # Environment variable validation & exports
│   ├── controllers/
│   │   ├── category.controller.js     # Category endpoints handler
│   │   ├── health.controller.js       # Health and system stats controller
│   │   ├── info.controller.js         # API overview & root controller
│   │   └── product.controller.js      # Farm produce CRUD controller
│   ├── middlewares/
│   │   ├── error.middleware.js        # Global error handling middleware
│   │   ├── logger.middleware.js       # Morgan request logger
│   │   ├── notFound.middleware.js     # 404 Route-not-found middleware
│   │   └── validate.middleware.js     # Request validation middleware
│   ├── routes/
│   │   ├── api.router.js              # Aggregated v1 API router (/api/v1)
│   │   ├── category.router.js         # Category routes (/api/v1/categories)
│   │   ├── health.router.js           # Health check route (/api/v1/health)
│   │   └── product.router.js          # Product routes (/api/v1/products)
│   ├── services/
│   │   ├── category.service.js        # Categories data service & business logic
│   │   └── product.service.js         # Farm produce data service & search/filtering
│   ├── utils/
│   │   ├── apiError.js                # Custom ApiError class for operational errors
│   │   └── apiResponse.js             # Standard JSON API response helper
│   ├── app.js                         # Express application setup
│   └── server.js                      # Server entry point & graceful shutdown
├── tests/
│   ├── health.test.js                 # API health & 404 integration tests
│   └── products.test.js               # Products & categories integration tests
├── .editorconfig                      # Editor indentation & formatting rules
├── .env                               # Local environment variables (ignored by git)
├── .env.example                       # Template for environment variables
├── .gitignore                         # Ignored git files and directories
├── .prettierrc                        # Code formatting configuration
├── package.json                       # Dependencies, metadata, and scripts
└── README.md                          # Project documentation
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v20+ or v24+ recommended
- **npm**: v10+ or v11+

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy the sample environment file and configure variables as needed:

```bash
cp .env.example .env
```

Default variables in `.env`:

| Variable | Default Value | Description |
|---|---|---|
| `PORT` | `5000` | Port on which the API server runs |
| `NODE_ENV` | `development` | Runtime environment (`development`, `production`, `test`) |
| `CLIENT_URL` | `http://localhost:3000` | Allowed client origin for CORS |
| `API_PREFIX` | `/api/v1` | Base prefix for versioned API routes |

### 3. Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the API server in development mode with `nodemon` auto-reload |
| `npm start` | Runs the API server in production mode using Node.js |
| `npm test` | Runs the test suite via Node's native test runner (`node --test`) |

---

## 📡 API Endpoints

### Root & Health
- **`GET /`**: Welcome message and active resource links
- **`GET /api/v1/health`**: Service status, system uptime, and memory statistics

### Categories (`/api/v1/categories`)
- **`GET /api/v1/categories`**: List all produce categories
- **`GET /api/v1/categories/:id`**: Get single category by ID or slug

### Products (`/api/v1/products`)
- **`GET /api/v1/products`**: List farm produce with optional query parameters:
  - `search`: Filter by produce name, description, or farmer location (e.g., `?search=Maize`)
  - `category`: Filter by category ID or slug (e.g., `?category=cat_veg`)
  - `minPrice` & `maxPrice`: Filter by price range
  - `sort`: `latest`, `price_asc`, `price_desc`, `name_asc`
  - `page` & `limit`: Pagination parameters (default: `page=1`, `limit=10`)
- **`GET /api/v1/products/:id`**: Get single product by ID or slug
- **`POST /api/v1/products`**: Create a new farm produce listing
- **`PUT /api/v1/products/:id`**: Update product details, price, or stock
- **`DELETE /api/v1/products/:id`**: Delete a product listing
