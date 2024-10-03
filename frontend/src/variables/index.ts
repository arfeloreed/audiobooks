import movie1984 from "/assets/images/1984.webp";
import braveNewWorld from "/assets/images/brave_new_world.webp";
import catcherRye from "/assets/images/catcher_in_the_rye.webp";
import dune from "/assets/images/dune.webp";
import farenheit from "/assets/images/fahrenheit_451.webp";
import greatGatsby from "/assets/images/great_gatsby.webp";
import hobbit from "/assets/images/hobbit.webp";
import mobyDick from "/assets/images/moby_dick.webp";
import pridePrejudice from "/assets/images/pride_prejudice.webp";
import silentPlanet from "/assets/images/silent_planet.webp";

const images = [
  { img: movie1984, title: "1984" },
  { img: braveNewWorld, title: "Brave New World" },
  { img: catcherRye, title: "The Catcher in the Rye" },
  { img: dune, title: "Dune" },
  { img: farenheit, title: "Fahrenheit 451" },
  { img: greatGatsby, title: "The Great Gatsby" },
  { img: hobbit, title: "The Hobbit" },
  { img: mobyDick, title: "Moby-Dick" },
  { img: pridePrejudice, title: "Pride and Prejudice" },
  { img: silentPlanet, title: "The Silent Planet" },
];

const url = import.meta.env.VITE_SERVER_URL;

export { images, url };
