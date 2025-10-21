from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, unique = True)
    password = db.Column(db.String(30))

    last_scraped_page = db.Column(db.Integer, default=1)
    last_scraped_index = db.Column(db.Integer, default=0)

    saved_posts = db.relationship('SavedPost', back_populates='user', cascade='all, delete-orphan')

