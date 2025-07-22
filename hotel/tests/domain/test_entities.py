from datetime import date, timedelta
import pytest

from hotel.src.domain.entities import Booking, Room, Guest, BookingError


def test_booking_validation():
    guest = Guest(id=1, name="John", age=20)
    room = Room(number=101, room_type="Standard", capacity=2, price=100)
    booking = Booking(
        reference="ref123",
        guest=guest,
        room=room,
        check_in=date.today() + timedelta(days=2),
        check_out=date.today() + timedelta(days=5),
    )
    booking.validate()


def test_booking_underage():
    guest = Guest(id=1, name="John", age=17)
    room = Room(number=101, room_type="Standard", capacity=2, price=100)
    booking = Booking(
        reference="ref123",
        guest=guest,
        room=room,
        check_in=date.today() + timedelta(days=2),
        check_out=date.today() + timedelta(days=5),
    )
    with pytest.raises(BookingError):
        booking.validate()
