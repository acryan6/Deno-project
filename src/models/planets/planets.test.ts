import { assertEquals, assertNotEquals } from "../../test_deps.ts";

import { filterHabitablePlanets } from "./planets.ts";

const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const NOT_CONFIRMED = {
  koi_disposition: "FALSE POSITIVE",
};

const PR_TOO_LARGE = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const PR_TOO_SMALL = {
  koi_disposition: "CONFIRMED",
  koi_prad: "0.5",
  koi_srad: "1",
  koi_smass: "1",
};

const SR_TOO_LARGE = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1",
};

const SR_TOO_SMALL = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "0.99",
  koi_smass: "1",
};

const SM_TOO_LARGE = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};

const SM_TOO_SMALL = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "0.78",
};
Deno.test("filter habitable planets", () => {
  const filtered = filterHabitablePlanets([
    HABITABLE_PLANET,
    NOT_CONFIRMED,
    PR_TOO_LARGE,
    PR_TOO_SMALL,
    SR_TOO_LARGE,
    SR_TOO_SMALL,
    SM_TOO_LARGE,
    SM_TOO_SMALL,
  ]);

  assertEquals(filtered, [HABITABLE_PLANET]);
});
