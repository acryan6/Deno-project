import { parse, join, BufReader, _ } from "../../deps.ts";

type Planet = Record<string, string>;

let planets: Planet[] = [];

export const filterHabitablePlanets = (planets: Planet[]) => {
  return planets.filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return (
      planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 &&
      planetaryRadius < 1.5 &&
      stellarMass > 0.78 &&
      stellarMass < 1.04 &&
      stellarRadius > 0.99 &&
      stellarRadius < 1.01
    );
  });
};

const loadPlanetsData = async () => {
  const path = join("data", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: "#",
  });
  Deno.close(file.rid);

  const planets = filterHabitablePlanets(result as Planet[]);

  return planets.map((planet) =>
    _.pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff",
    ])
  );
};

planets = await loadPlanetsData();
console.log(`${planets.length} habitable planets found!`);

export const getAllPlanets = () => {
  return planets;
};
