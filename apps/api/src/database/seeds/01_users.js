/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "dipak",
      last_name: "kalauni",
      email: "duckduck1234@gmail.com",
      password: "hello world",
      phone: "9868810438",
      dob: new Date("2023-09-01"),
      gender: "m",
      role_type: "super_admin",
      address: "kathmandu, nepal",
    },
  ]);
};
