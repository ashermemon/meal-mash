from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(255), unique = True)
    password = db.Column(db.String(128))

    last_scraped_page = db.Column(db.Integer, default=1)
    last_scraped_index = db.Column(db.Integer, default=0)



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