from __future__ import annotations
from abc import ABC, abstractmethod
from datetime import date
from typing import List

from hotel.src.domain.entities import Booking, Room, Guest

class BookingRepository(ABC):
    @abstractmethod
    def add(self, booking: Booking) -> None: ...

    @abstractmethod
    def get(self, reference: str) -> Booking | None: ...

class RoomRepository(ABC):
    @abstractmethod
    def list_rooms(self) -> List[Room]: ...

class GuestRepository(ABC):
    @abstractmethod
    def add(self, guest: Guest) -> None: ...

    @abstractmethod
    def get(self, guest_id: int) -> Guest | None: ...
