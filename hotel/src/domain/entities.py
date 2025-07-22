from dataclasses import dataclass
from datetime import date
from typing import Optional

class BookingError(Exception):
    pass

@dataclass
class Room:
    number: int
    room_type: str  # Standard, Deluxe, Suite
    capacity: int
    price: int

@dataclass
class Guest:
    id: int
    name: str
    age: int

@dataclass
class Booking:
    reference: str
    guest: Guest
    room: Room
    check_in: date
    check_out: date
    paid: bool = False

    def duration(self) -> int:
        return (self.check_out - self.check_in).days

    def validate(self) -> None:
        if self.guest.age < 18:
            raise BookingError("Guest must be at least 18")
        if self.check_in <= date.today():
            raise BookingError("Check-in must be in the future")
        if self.duration() > 30:
            raise BookingError("Stay cannot exceed 30 nights")
