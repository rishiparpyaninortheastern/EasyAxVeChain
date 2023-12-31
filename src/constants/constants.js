// "comment_1": "Score Calculation Formula: Score = w1(1 - Electricity Consumption/Max Electricity Consumption) + w2(1 - Water Consumption/Max Water Consumption) + w3(Max Occupancy/Area)",
// "comment_2": "Conversion to Score out of 5: Score out of 5 = (Score/(w1 + w2 + w3)) * 5",
// "max_electricity_consumption_kWh": 1200, We obtain these from historical data  based on sqft and no of people
// "max_water_consumption_gallons": 500, We obtain these from historical data based on sqft and no of people

export const properties = [
  {
    property_id: 1,
    property_name: "Brick Bastion",
    area_sq_ft: 2000,
    max_occupancy: 50,
    electricity_consumption_kWh: 500,
    water_consumption_gallons: 200,
    score_out_of_5: 1.55,
    image_key: "brickbaston",
    price: "148.2K VET",
  },
  {
    property_id: 2,
    property_name: "Urban Villas",
    area_sq_ft: 3000,
    max_occupancy: 75,
    electricity_consumption_kWh: 750,
    water_consumption_gallons: 300,
    score_out_of_5: 1.75,
    image_key: "urbanvillas",
    price: "150.2K VET",
  },
  {
    property_id: 3,
    property_name: "Steel Stronghold.jpeg",
    area_sq_ft: 1000,
    max_occupancy: 25,
    electricity_consumption_kWh: 250,
    water_consumption_gallons: 100,
    score_out_of_5: 1.45,
    image_key: "brickbaston",
    price: "142.8K VET",
  },
  {
    property_id: 4,
    property_name: "Glass Gallows",
    area_sq_ft: 4000,
    max_occupancy: 100,
    electricity_consumption_kWh: 1000,
    water_consumption_gallons: 400,
    score_out_of_5: 2.0,
    image_key: "glassglow",
    price: "149K VET",
  },
  {
    property_id: 5,
    property_name: "Concrete Castle",
    area_sq_ft: 1500,
    max_occupancy: 37,
    electricity_consumption_kWh: 375,
    water_consumption_gallons: 150,
    score_out_of_5: 1.5,
    image_key: "conceretecastle",
    price: "139.5K VET",
  },
  {
    property_id: 6,
    property_name: "Eco Haven",
    area_sq_ft: 2500,
    max_occupancy: 125,
    electricity_consumption_kWh: 200,
    water_consumption_gallons: 100,
    score_out_of_5: 4.2,
    image_key: "ecoheaven",
    price: "60K VET",
  },
  {
    property_id: 7,
    property_name: "Sustainable Sanctuary",
    area_sq_ft: 2500,
    max_occupancy: 130,
    electricity_consumption_kWh: 180,
    water_consumption_gallons: 90,
    score_out_of_5: 4.5,
    image_key: "ecofriendly",
    price: "64K VET",
  },
  {
    property_id: 8,
    property_name: "Earthly Abode",
    area_sq_ft: 2000,
    max_occupancy: 120,
    electricity_consumption_kWh: 150,
    water_consumption_gallons: 80,
    score_out_of_5: 4.8,
    image_key: "earthlyadobe",
    price: "60K VET",
  },
];
