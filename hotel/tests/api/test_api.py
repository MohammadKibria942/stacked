from datetime import date, timedelta
from fastapi.testclient import TestClient

from hotel.src.api.main import app

client = TestClient(app)

def test_create_and_get_booking_api():
    data = {
        "guest_id": 1,
        "name": "John",
        "age": 20,
        "room_number": 100,
        "check_in": str(date.today() + timedelta(days=2)),
        "check_out": str(date.today() + timedelta(days=3))
    }
    resp = client.post("/bookings", json=data)
    assert resp.status_code == 200
    ref = resp.json()["reference"]
    resp_get = client.get(f"/bookings/{ref}")
    assert resp_get.status_code == 200
