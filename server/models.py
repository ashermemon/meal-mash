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
<<<<<<< Updated upstream
=======

    saved_posts = db.relationship('SavedPost', back_populates='user', cascade='all, delete-orphan')

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)  # Title
    url = db.Column(db.String, unique=True)
    price = db.Column(db.Float)
    total = db.Column(db.Float)
    shipping = db.Column(db.Float)
    photo = db.Column(db.String)
>>>>>>> Stashed changes

    saved_posts = db.relationship('SavedPost', back_populates='user', cascade='all, delete-orphan')


    saved_by = db.relationship('SavedPost', back_populates='post', cascade='all, delete-orphan')



class SavedPost(db.Model):
    __tablename__ = 'saved_post'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    postId = db.Column(db.Integer)
    index = db.Column(db.Integer)
    
    user = db.relationship('User', back_populates='saved_posts')
    post = db.relationship('Post', back_populates='saved_by')

    __table_args__ = (db.UniqueConstraint('user_id', 'post_id', name='unique_user_post_save'),)