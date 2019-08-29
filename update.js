const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let promise1 = Recipe.updateOne(
  { title: "Rigatoni alla Genovese" },
  { duration: 110 }
)
  .then(() => {
    console.log("Successfully updated");
  })
  .catch(err => {
    console.log(err);
  });

let promise2 = Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => {
    console.log("Successfully deleted");
  })
  .catch(err => {
    console.log(err);
  });

Promise.all([promise1, promise2]).then(() => {
  mongoose.connection.close();
});
