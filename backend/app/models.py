from . import db


class Audiobook(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    votes = db.Column(db.Integer, default=0)
    cover_image = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<Audiobook {self.title}>"


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"<User {self.email}>"


class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    audiobook_id = db.Column(
        db.Integer, db.ForeignKey("audiobook.book_id"), nullable=False
    )

    user = db.relationship("User", backref=db.backref("votes", lazy=True))
    audiobook = db.relationship(
        "Audiobook", backref=db.backref("user_votes", lazy=True)
    )

    __table_args__ = (
        db.UniqueConstraint("user_id", "audiobook_id", name="unique_vote"),
    )
