from datetime import date, timedelta
from hotel.src.application.use_cases import BookingService
from hotel.src.infrastructure.repositories import SQLBookingRepository, InMemoryRoomRepository, InMemoryGuestRepository
from hotel.src.domain.entities import Guest


def test_create_and_get_booking(tmp_path, monkeypatch):
    db_file = tmp_path / "hotel.db"
    monkeypatch.setenv("DATABASE_URL", f"sqlite:///{db_file}")
    service = BookingService(SQLBookingRepository(), InMemoryRoomRepository(), InMemoryGuestRepository())
    room = service.rooms.list_rooms()[0]
    guest = Guest(id=1, name="John", age=20)
    booking = service.create_booking(guest, room, date.today() + timedelta(days=1), date.today() + timedelta(days=2))
    fetched = service.get_booking(booking.reference)
    assert fetched is not None
    assert fetched.reference == booking.reference
