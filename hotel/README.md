# Hotel Booking System

This is a minimal implementation of the hotel booking system described in the assignment. It demonstrates a Domain-Driven Design approach with Clean Architecture.

## Prerequisites
- Python 3.13+
- `uv` package manager available as `uv`

## Setup
```
./scripts/setup.sh
```

## Running the Server
```
./scripts/run.sh
```

## Running Tests
```
./scripts/test.sh
```

## Example
Create a booking:
```
curl -X POST http://localhost:8000/bookings \
 -H 'Content-Type: application/json' \
 -d '{"guest_id":1,"name":"John","age":20,"room_number":100,"check_in":"2025-01-01","check_out":"2025-01-02"}'
```
