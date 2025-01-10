import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

const filePath = '../../data/kepler_data.csv'

let habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets = [...habitablePlanets, data];
        }
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err.message);
        reject(err);
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

export {
  habitablePlanets as planets,
  loadPlanetsData
}
