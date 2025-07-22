from sqlalchemy import Column, Integer, String, Date, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class BookingModel(Base):
    __tablename__ = "bookings"
    reference = Column(String(10), primary_key=True)
    guest_id = Column(Integer)
    guest_name = Column(String)
    guest_age = Column(Integer)
    room_number = Column(Integer)
    room_type = Column(String)
    capacity = Column(Integer)
    price = Column(Integer)
    check_in = Column(Date)
    check_out = Column(Date)
    paid = Column(Boolean)
