from app import create_app, db
from app.models import Audiobook

app = create_app()


def populate_db():
    """Populate the database with these audiobook data if it's empty."""
    if Audiobook.query.first() is None:
        audiobooks = [
            Audiobook(
                title="The Silent Planet",
                author="C.S. Lewis",
                cover_image="/assets/images/silent_planet.webp",
            ),
            Audiobook(
                title="Dune",
                author="Frank Herbert",
                cover_image="/assets/images/dune.webp",
            ),
            Audiobook(
                title="1984",
                author="George Orwell",
                cover_image="/assets/images/1984.webp",
            ),
            Audiobook(
                title="Brave New World",
                author="Aldous Huxley",
                cover_image="/assets/images/brave_new_world.webp",
            ),
            Audiobook(
                title="The Hobbit",
                author="J.R.R. Tolkien",
                cover_image="/assets/images/hobbit.webp",
            ),
            Audiobook(
                title="Fahrenheit 451",
                author="Ray Bradbury",
                cover_image="/assets/images/fahrenheit_451.webp",
            ),
            Audiobook(
                title="The Catcher in the Rye",
                author="J.D. Salinger",
                cover_image="/assets/images/catcher_in_the_rye.webp",
            ),
            Audiobook(
                title="Moby-Dick",
                author="Herman Melville",
                cover_image="/assets/images/moby_dick.webp",
            ),
            Audiobook(
                title="Pride and Prejudice",
                author="Jane Austen",
                cover_image="/assets/images/pride_prejudice.webp",
            ),
            Audiobook(
                title="The Great Gatsby",
                author="F. Scott Fitzgerald",
                cover_image="/assets/images/great_gatsby.webp",
            ),
        ]

        db.session.bulk_save_objects(audiobooks)
        db.session.commit()
        print("Database populated with initial audiobooks")


if __name__ == "__main__":
    with app.app_context():
        # create tables if they don't exist
        db.create_all()

        # populate the database with audiobooks
        populate_db()

    app.run(debug=True)
