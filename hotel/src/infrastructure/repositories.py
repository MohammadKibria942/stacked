from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from hotel.src.domain.entities import Booking, Room, Guest
from hotel.src.application.interfaces import BookingRepository, RoomRepository, GuestRepository
from hotel.src.infrastructure.models import Base, BookingModel

ENGINE = create_engine("sqlite:///hotel.db", future=True)
Base.metadata.create_all(ENGINE)

class SQLBookingRepository(BookingRepository):
    def __init__(self):
        self.engine = ENGINE

    def add(self, booking: Booking) -> None:
        with Session(self.engine) as session:
            model = BookingModel(
                reference=booking.reference,
                guest_id=booking.guest.id,
                guest_name=booking.guest.name,
                guest_age=booking.guest.age,
                room_number=booking.room.number,
                room_type=booking.room.room_type,
                capacity=booking.room.capacity,
                price=booking.room.price,
                check_in=booking.check_in,
                check_out=booking.check_out,
                paid=booking.paid,
            )
            session.add(model)
            session.commit()

    def get(self, reference: str) -> Booking | None:
        with Session(self.engine) as session:
            model = session.get(BookingModel, reference)
            if not model:
                return None
            return Booking(
                reference=model.reference,
                guest=Guest(id=model.guest_id, name=model.guest_name, age=model.guest_age),
                room=Room(number=model.room_number, room_type=model.room_type, capacity=model.capacity, price=model.price),
                check_in=model.check_in,
                check_out=model.check_out,
                paid=model.paid,
            )

class InMemoryRoomRepository(RoomRepository):
    def __init__(self):
        self.rooms = [
            Room(number=i+100, room_type="Standard", capacity=2, price=100) for i in range(50)
        ] + [
            Room(number=200+i, room_type="Deluxe", capacity=3, price=200) for i in range(40)
        ] + [
            Room(number=300+i, room_type="Suite", capacity=4, price=300) for i in range(10)
        ]

    def list_rooms(self):
        return self.rooms

class InMemoryGuestRepository(GuestRepository):
    def __init__(self):
        self.guests = {}

    def add(self, guest: Guest) -> None:
        self.guests[guest.id] = guest

    def get(self, guest_id: int) -> Guest | None:
        return self.guests.get(guest_id)
