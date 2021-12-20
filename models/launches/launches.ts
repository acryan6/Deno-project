import * as log from "https://deno.land/std/log/mod.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: string[];
  launchDate: number;
  upcoming: boolean;
  success?: boolean;
  target?: string;
}
const launches = new Map<number, Launch>();

export const downloadLaunchData = async () => {
  log.info("Downloading launch data...");
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });

  if (!response.ok) {
    log.warning("");
    throw new Error("Launch data download failed.");
  }

  const launchData = await response.json();
  for (const launch of launchData) {
    const payloads = launch["rocket"]["second_stage"]["payloads"];

    const customers = _.flatMap(
      payloads,
      (payload: any) => payload["customers"]
    );
    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      launchDate: launch["launch_date_unix"],
      upcoming: launch["upcoming"],
      success: launch["launch_success"],
      customers,
    };

    launches.set(flightData.flightNumber, flightData);
    log.info(JSON.stringify(flightData));
  }
};

await downloadLaunchData();
log.info(`Downloaded data for ${launches.size} SpaceX launches`);

export const getAll = () => {
  return Array.from(launches.values());
};

export const getOne = (id: number) => {
  if (launches.has(id)) {
    return launches.get(id);
  } else {
    return null;
  }
};
