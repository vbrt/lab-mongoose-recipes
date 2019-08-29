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

// Recipe.create({
//   title: "test",
//   level: "Easy Peasy",
//   ingredients: ["test", "test"],
//   cuisine: "Italian",
//   dishType: "Breakfast",
//   duration: "50",
//   creator: "Victor"
// })
//   .then(recipe => {
//     console.log(recipe.title);
//   })
//   .catch(err => {
//     console.log("An error happened:", err);
//   });

Recipe.deleteMany({})
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(data => {
    data.forEach(el => {
      console.log(el.title);
    });

    let promise1 = Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 110 }
    );
    let promise2 = Recipe.deleteOne({ title: "Carrot Cake" });
    return Promise.all([promise1, promise2]);
  })
  .then(() => {
    console.log("Successfully updated");
    console.log("Successfully deleted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
