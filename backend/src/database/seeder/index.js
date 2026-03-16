import roleSeeder from "./roleSeeder.js";
import userSeeder from "./userSeeder.js";
import tableSeeder from "./tableSeeder.js";
import categorySeeder from "./categorySeeder.js";
import productSeeder from "./productSeeder.js";

async function runSeeders() {
  await roleSeeder();
  await userSeeder();
  await tableSeeder();
  await categorySeeder();
  await productSeeder();
}

export default runSeeders;
