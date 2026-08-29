# Data Models Documentation

## Overview

This document describes the TypeScript interfaces and enums used in the **Property Rental Management System**. The system manages property owners, tenants, rooms, and billing for rental properties (e.g., PGs, apartments, flats, villas).

The models are organized into four modules:

| Module | Purpose |
|---|---|
| **User** | Authentication and core user account data (Owners, Tenants, Admins) |
| **Tenant** | Tenant-specific profile and lease information |
| **Room** | Rooms within a property and their occupancy/rent details |
| **Property** | Properties owned by a user, containing one or more rooms |
| **Billing** | Monthly rent/utility bills generated per tenant/room |

Each module generally follows the same pattern:
- A **Model** interface — the full shape of the entity as stored/returned by the backend.
- A **Register/Create Request** interface — the minimal fields needed to create a new entity.
- An **Update Request** interface — the fields needed to update an existing entity.
- A **Response** interface — the shape returned by the API (usually the same as the Model, sometimes with sensitive fields like `passwordHash` omitted or restructured).

---

## 1. User Module

Handles login credentials and core profile data shared by all account types (Owner, Tenant, Admin). This is the base identity record used for authentication.

### `User`
The full user entity as stored in the backend, including the hashed password. Used server-side or in admin views — **should not be sent to the frontend as-is** since it includes `passwordHash`.

| Field | Type | Notes |
|---|---|---|
| `id` | `number` | Unique identifier |
| `username` | `string` | Login username |
| `email` | `string` | Contact email |
| `passwordHash` | `string` | Hashed password (never expose in UI) |
| `userRole` | `Roles` | OWNER / TENANT / ADMIN |
| `fullName`, `phoneNumber`, `address`, `city`, `state`, `pincode` | `string` | Profile/contact details |
| `isActive` | `boolean` | Whether the account is active |
| `createdDate`, `updatedDate` | `string` | Audit timestamps |

### `Roles` (enum)
Defines the three account types in the system: `OWNER`, `TENANT`, `ADMIN`. Used across the User and Tenant modules to control access and permissions.

### `RegisterUserRequest`
Payload sent from the **registration/sign-up form** to create a new user account. Includes `passwordHash` (the raw password to be hashed) but excludes system-generated fields like `id`, `isActive`, `createdDate`.

### `UserRequest`
Payload used to **update an existing user's profile** (e.g., an "Edit Profile" form). Omits `passwordHash` and `userRole` — role and password changes are presumably handled via separate, more restricted flows. Includes `isActive` so an admin can enable/disable an account.

### `UserResponse`
Shape returned by the API for **read operations** (e.g., "get user by id", "list users"). Same as `User` but with `passwordHash` removed for security.

---

## 2. Tenant Module

Represents a tenant's rental-specific profile — separate from the base `User` account, and containing lease/occupancy details (move-in date, ID proof, emergency contact, etc.).

### `Tenant`
The full tenant record. Links back to a `User` account (`user`) and to the `Property` they occupy, and holds identity/lease information required for renting.

| Field | Type | Notes |
|---|---|---|
| `id` | `number` | Unique tenant record id |
| `user` | `number \| null` | FK to the linked `User` account |
| `property` | `number \| null` | FK to the `Property` the tenant is associated with |
| `userName`, `passwordHash`, `role`, `fullName`, `contactPhone`, `email` | — | Duplicated identity fields (also present on `User`) |
| `moveInDate`, `moveOutDate` | `string \| null` | Lease duration |
| `emergencyContact` | `string` | Contact in case of emergency |
| `idProofType`, `idProofNumber` | `IdType`, `string` | Government ID used for verification |
| `occupation` | `string` | Tenant's occupation |
| `isActive` | `boolean` | Whether the tenant is currently active/renting |
| `createdDate`, `updatedDate` | `string` | Audit timestamps |

> **Note:** `Tenant` duplicates several fields already present on `User` (username, password, contact info). Consider whether `Tenant` should instead just reference `User` via the `user` field and avoid duplicating identity data, unless tenants can exist without a linked login account.

### `IdType` (enum)
Type of government ID used to verify a tenant: `AADHARCARD` or `PANCARD`.

### `RegisterTenantRequest`
Payload used when **onboarding a new tenant** (e.g., an owner/admin adding a tenant, or a tenant self-registering). Captures identity and verification details but not room/property assignment or lease dates — those are likely set later (e.g., at move-in).

### `TenantRequest`
Payload used to **create/update a tenant's full record**, including room/property assignment (`property`), move-in/move-out dates, and active status. Used once a tenant is being assigned to a room, or when editing an existing tenant.

### `TenantResponse`
Shape returned by the API for tenant read operations (e.g., "get tenant by id", "list tenants for a property").

---

## 3. Room Module

Represents individual rentable rooms/units within a property, their type, status, pricing, and current occupants.

### `RoomModel`
The full room entity, including occupancy and pricing details.

| Field | Type | Notes |
|---|---|---|
| `id` | `number` | Unique room id |
| `propertyId` | `number` | FK to the parent `Property` |
| `tenantId` | `number[] \| null` | Occupying tenant(s); `null` when vacant |
| `roomNumber`, `floorNumber` | `string` | Room identification |
| `roomType` | `RoomType` | SINGLE / DOUBLE / 1RK / 1BHK / 2BHK |
| `roomStatus` | `RoomStatus` | VACANT / OCCUPIED / MAINTENANCE / RESERVED |
| `baseRent` | `number` | Monthly base rent |
| `lightPerUnit` | `number` | Electricity rate per unit |
| `waterCharges` | `number` | Fixed water charge |
| `securityDeposit` | `number` | Deposit amount |
| `maxOccupancy`, `currentOccupancy` | `number \| null` | Capacity vs. actual occupants |
| `createdDate`, `updatedDate` | `string` | Audit timestamps |

### `RoomStatus` (enum)
Current availability state of a room: `VACANT`, `OCCUPIED`, `MAINTENANCE`, `RESERVED`. Used to drive room-listing/availability UI.

### `RoomType` (enum)
The layout/category of a room: `SINGLE`, `DOUBLE`, `ONE_RK`, `ONE_BHK`, `TWO_BHK`.

### `RegirsterRoomRequest`
*(Note: contains a typo — "Regirster" — kept as-is to match the source code.)*
Payload used when an **owner adds a new room** to a property. Excludes `tenantId` and `currentOccupancy` since a newly created room has no occupants yet.

### `RoomRequest`
Payload used to **update an existing room** — e.g., changing status, rent, or assigning a tenant (`tenantId`, `currentOccupancy`). Used in an "Edit Room" form or when assigning/removing tenants.

### `RoomResponse`
Shape returned by the API for room read operations (e.g., "list rooms in a property", "get room details").

---

## 4. Property Module

Represents a property (building/PG/villa/etc.) owned by a user, which contains multiple rooms.

### `Property`
The full property entity, tracking room counts for quick occupancy summaries (e.g., dashboard cards).

| Field | Type | Notes |
|---|---|---|
| `id` | `number` | Unique property id |
| `owner` | `number` | FK to the `User` (with role `OWNER`) who owns this property |
| `propertyName`, `address`, `city`, `state`, `pincode` | `string` | Location/identity details |
| `propertyType` | `string` | e.g., Apartment, PG, Villa, Flat (see `PropertyType`) |
| `totalRooms`, `occupiedRooms`, `availableRooms` | `number` | Aggregate room counts |
| `createdDate`, `updatedDate` | `string` | Audit timestamps |

### `PropertyType` (enum)
The category of property: `APARTMENT`, `PG`, `VILLA`, `FLAT`.
*(Note: the `APERTMENT` member name contains a typo but its value is the correctly spelled `'APARTMENT'`.)*

> **Note:** `Property`, `PropertyRequest`, and `PropertyResponse` type `propertyType` as `string` rather than `PropertyType`. Consider using the `PropertyType` enum directly for consistency and type safety.

### `RegiesterPropertyRequest`
*(Note: contains a typo — "Regiester" — kept as-is to match the source code.)*
Payload used when an **owner registers a new property**. Excludes computed fields like `occupiedRooms`/`availableRooms`, which are derived from the property's rooms.

### `PropertyRequest`
Payload used to **update an existing property's** details (name, address, room count, etc.).

### `PropertyResponse`
Shape returned by the API for property read operations (e.g., "list my properties", "get property by id"), including live occupancy counts.

---

## 5. Billing Module

Represents monthly bills generated for a tenant/room, covering rent and utility charges.

### `BillingModel`
The full billing record for a given tenant, room, and billing period.

| Field | Type | Notes |
|---|---|---|
| `id` | `number` | Unique bill id |
| `tenantId`, `roomId` | `number` | Who and what the bill is for |
| `billingMonth`, `billingYear` | `string` | Billing period |
| `rentAmount` | `number` | Base rent charged |
| `electricity`, `water` | `string` | Utility charges for the period |
| `maintenance`, `otherCharges`, `otherChargesDescription` | `string \| null` | Optional additional charges |
| `totalAmount` | `number` | Sum of all charges |
| `paymentStatus` | `string` | e.g., Paid / Pending / Overdue |
| `amountPaind` | `string \| null` | Amount paid so far *(note: likely a typo for `amountPaid`)* |
| `paymentDueDate`, `paymentDate` | `string`, `string \| null` | Due date vs. actual payment date |
| `note` | `string \| null` | Free-text note on the bill |
| `entryDate`, `updatedDate` | `string` | Audit timestamps |

### `BillingRequest`
A lightweight **filter/query** payload (both fields optional) — used to fetch bills for a specific tenant and/or room, e.g., "get billing history for this tenant."

### `GenerateBillRequest`
Payload used to **trigger generation of a new bill** for a room, based on the electricity meter reading for the period (`electricityUnit`). Rent, water, and other charges are presumably calculated server-side from the room's configured rates.

### `BillingResponse`
Shape returned by the API for billing read operations (e.g., "list bills", "get bill by id"). Identical in shape to `BillingModel`.

---

## Suggested Follow-ups

A few inconsistencies worth revisiting as the models mature:

1. **Typos in type names**: `RegirsterRoomRequest` → `RegisterRoomRequest`, `RegiesterPropertyRequest` → `RegisterPropertyRequest`, `amountPaind` → `amountPaid`, `APERTMENT` → `APARTMENT` (enum key). Renaming now is easiest before more code depends on them.
2. **`propertyType` typing**: Currently `string` in `Property`/`PropertyRequest`/`PropertyResponse` — consider switching to the `PropertyType` enum.
3. **`Tenant` vs `User` field duplication**: `Tenant` re-declares `userName`, `passwordHash`, `role`, `fullName`, `contactPhone`, `email`, which already exist on the linked `User`. Worth confirming whether this duplication is intentional (denormalized for read performance) or should be removed in favor of always joining through `user`.
4. **`RoomModel.tenantId` (array) vs `RoomRequest.tenantId` (single number)**: The model supports multiple tenants per room, but the update request only allows assigning one. Confirm whether shared/multi-occupancy rooms need array support in the request too.
