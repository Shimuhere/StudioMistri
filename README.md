# StudioMistri (স্টুডিও মিস্ত্রি)

> **Neobrutalism 3D Printing Studio Management OS & Client Portal**
> Full-Stack Django + PostgreSQL Backend with Real-Time Financial Split Architecture (3 Tk/g Company Fund & Maker Salary Distribution).

---

## 🌟 Architecture & Features

1. **Django REST Framework + PostgreSQL Backend**:
   - Models for `Filament`, `Order`, and `StudioSetting`.
   - Customized **Django Admin Portal (`/admin/`)** with color swatch previews, quick actions, stock badges, and transaction logs.
   - REST API endpoints for inventory CRUD, stock adjustments (`POST /api/filaments/<id>/adjust_stock/`), real-time financial splits, and reports.
   - **Admin Authentication**: Secure login endpoint (`/api/auth/login/`) and session management.

2. **Core Financial Rule (Enforced on Backend & Frontend)**:
   - **Company Fund**: $\text{Model Weight (g)} \times 3.00\text{ ৳}$ (Allocated to machine maintenance, nozzles, and electricity reserve).
   - **Salary Remainder**: $(\text{Total Price} - \text{Company Share})$ (Distributed to makers and operators).
   - **Net Profit**: $\text{Total Revenue} - \text{Raw Spool Material Cost}$.

3. **Neobrutalism Design Aesthetics**:
   - Bold, high-contrast black borders (`3px solid #000`), hard solid offset drop shadows (`4px 4px 0px #000`), and tactile physical compression.
   - Saturated pop colors (Flame Orange `#FF5500`, Cyber Yellow `#FFE600`, Electric Cyan `#00D2FF`, Neo Mint `#22C55E`).
   - Printable & downloadable **Swiss / Neobrutalist Tax Invoices** via `html2pdf.js`.

---

## 🔐 Admin Login Credentials

| Role | Username | Password | Email | Access |
|---|---|---|---|---|
| **Super Admin** | `admin` | `adminpassword123` | `admin@studiomistri.com` | Full Django Admin (`/admin/`) & Studio OS |

---

## 🚀 Quick Start Guide

### 1. Start Django Backend Server

Activate the virtual environment and start Django:
```bash
# Using the pre-configured virtual environment:
./venv/bin/python manage.py runserver 8000
```
- **Backend API**: `http://127.0.0.1:8000/api/`
- **Django Admin Portal**: `http://127.0.0.1:8000/admin/` (Login with `admin` / `adminpassword123`)

---

### 2. PostgreSQL Database Setup (Optional / Production)

The project includes `psycopg2-binary` and automatically connects to PostgreSQL when available.
To use a local or cloud PostgreSQL database:

1. Create a database:
   ```sql
   CREATE DATABASE studiomistri_db;
   ```
2. Update `.env`:
   ```env
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=studiomistri_db
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   DB_PORT=5432
   # Or DATABASE_URL=postgres://postgres:postgres@localhost:5432/studiomistri_db
   ```
3. Run migrations and seed data:
   ```bash
   ./venv/bin/python manage.py migrate
   ./venv/bin/python seed_db.py
   ```

*(Note: If PostgreSQL is not currently running locally, Django automatically uses `db.sqlite3` as a graceful fallback so all development features work out of the box).*

---

### 3. Start Frontend Client

In a separate terminal:
```bash
npm run dev
# Or:
npx serve . -l 3000
```
Visit `http://localhost:3000` in your browser.

---

## 📡 REST API Documentation

| Endpoint | Method | Description |
|---|---|---|
| `/api/filaments/` | `GET`, `POST` | List & create filament spools |
| `/api/filaments/<id>/` | `GET`, `PUT`, `DELETE` | Retrieve, update, or delete a spool |
| `/api/filaments/<id>/adjust_stock/` | `POST` | Quick stepper stock adjust (`delta_grams: +50 / -50`) |
| `/api/orders/` | `GET`, `POST` | List & create 3D print orders |
| `/api/orders/<id>/update_status/` | `POST` | Fast status transition (`Printing`, `Paid`, `Delivered`) |
| `/api/orders/<id>/invoice/` | `GET` | Structured tax invoice payload for PDF export |
| `/api/sales/reports/` | `GET` | Aggregate financials (Revenue, Material Cost, Profit, 3 Tk/g Split) |
| `/api/settings/` | `GET`, `POST` | Studio settings & pricing presets |
| `/api/auth/login/` | `POST` | Admin authentication |
| `/api/auth/user/` | `GET` | Current authenticated admin profile |
| `/api/auth/logout/` | `POST` | Logout session |
| `/admin/` | Web GUI | Official Django Admin Dashboard |
