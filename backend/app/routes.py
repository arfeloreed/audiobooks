from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

from .models import Audiobook, User, Vote, db

main = Blueprint("main", __name__)


# register a new user
@main.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        # create a new user
        new_user = User(email=email, password=generate_password_hash(password))
        db.session.add(new_user)
        db.session.commit()

        # generate JWT token
        token = create_access_token(
            identity={"id": new_user.user_id, "email": new_user.email}
        )

        return jsonify({"message": "success", "token": token}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "User already exists"}), 400


# def register_user():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     # check if the email already exists
#     existing_user = User.query.filter_by(email=email).first()
#     if existing_user:
#         return jsonify({"error": "Email already exists"}), 409  # conflict error

#     # Create new user
#     new_user = User(email=email, password=password)
#     try:
#         db.session.add(new_user)
#         db.session.commit()
#         return jsonify({"message": "success", "email": email}), 201
#     except Exception as e:
#         print("Error: ", e)
#         db.session.rollback()
#         return jsonify({"error": "Can't register user"}), 500


# Login route
@main.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        # generate jwt token
        token = create_access_token(identity={"id": user.user_id, "email": user.email})

        return jsonify({"message": "success", "token": token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     # look for user by email
#     user = User.query.filter_by(email=email).first()

#     # check if the user exists
#     if not user:
#         return jsonify({"error": "User with this email does not exist"}), 404

#     # check if the password matches
#     if user.password != password:
#         return jsonify({"error": "Incorrect password"}), 401

#     # login successful
#     return jsonify({"message": "success", "email": user.email}), 200


# get all audiobooks
@main.route("/audiobooks", methods=["GET"])
@jwt_required(
    optional=True  # to allow non-authenticated users to access the audiobooks
)
def get_audiobooks():
    current_user = get_jwt_identity()  # get current user's identity if authenticated

    audiobooks = Audiobook.query.all()
    books = []

    for book in audiobooks:
        has_voted = False
        if current_user:
            # Check if the current user has voted for this audiobook
            vote = Vote.query.filter_by(
                user_id=current_user["id"], audiobook_id=book.book_id
            ).first()
            has_voted = True if vote else False

        books.append(
            {
                "id": book.book_id,
                "title": book.title,
                "author": book.author,
                "votes": book.votes,
                "cover_image": book.cover_image,
                "has_voted": has_voted,
            }
        )

    return jsonify(books)


# Update votes for an audiobook
@main.route("/audiobooks/<int:book_id>/vote", methods=["POST"])
@jwt_required()
def vote_audiobook(book_id):
    current_user = get_jwt_identity()
    user_id = current_user["id"]

    audiobook = Audiobook.query.get_or_404(book_id)

    # check if the user has already voted for this audiobook
    existing_vote = Vote.query.filter_by(user_id=user_id, audiobook_id=book_id).first()

    if existing_vote:
        return jsonify({"message": "You have already voted for this audiobook"}), 400

    # register the vote
    new_vote = Vote(user_id=user_id, audiobook_id=book_id)
    db.session.add(new_vote)

    audiobook.votes += 1
    db.session.commit()

    return jsonify({"message": "Vote registered", "votes": audiobook.votes}), 201
