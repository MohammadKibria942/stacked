from datetime import date
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from hotel.src.application.use_cases import BookingService
from hotel.src.infrastructure.repositories import SQLBookingRepository, InMemoryRoomRepository, InMemoryGuestRepository
from hotel.src.domain.entities import Guest

app = FastAPI()
service = BookingService(SQLBookingRepository(), InMemoryRoomRepository(), InMemoryGuestRepository())

class BookingRequest(BaseModel):
    guest_id: int
    name: str
    age: int
    room_number: int
    check_in: date
    check_out: date

class BookingResponse(BaseModel):
    reference: str
    room_number: int

@app.post("/bookings", response_model=BookingResponse)
def create_booking(req: BookingRequest):
    room = next((r for r in service.rooms.list_rooms() if r.number == req.room_number), None)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    booking = service.create_booking(
        guest=Guest(id=req.guest_id, name=req.name, age=req.age),
        room=room,
        check_in=req.check_in,
        check_out=req.check_out,
    )
    return BookingResponse(reference=booking.reference, room_number=booking.room.number)

@app.get("/bookings/{reference}", response_model=BookingResponse)
def get_booking(reference: str):
    booking = service.get_booking(reference)
    if not booking:
        raise HTTPException(status_code=404, detail="Not found")
    return BookingResponse(reference=booking.reference, room_number=booking.room.number)
