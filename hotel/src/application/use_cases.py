from datetime import date
from typing import List
import secrets

from hotel.src.domain.entities import Booking, BookingError, Room, Guest
from hotel.src.application.interfaces import BookingRepository, RoomRepository, GuestRepository

class BookingService:
    def __init__(self, bookings: BookingRepository, rooms: RoomRepository, guests: GuestRepository):
        self.bookings = bookings
        self.rooms = rooms
        self.guests = guests

    def create_booking(self, guest: Guest, room: Room, check_in: date, check_out: date) -> Booking:
        booking = Booking(reference=secrets.token_hex(5), guest=guest, room=room, check_in=check_in, check_out=check_out)
        booking.validate()
        self.guests.add(guest)
        booking.paid = True
        self.bookings.add(booking)
        return booking

    def get_booking(self, reference: str) -> Booking | None:
        return self.bookings.get(reference)
