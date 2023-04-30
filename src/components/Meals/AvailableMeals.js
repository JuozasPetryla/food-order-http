import React, {useState} from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [mealList, setMealList]

  const fetchMealList = async () => {
    try {
      const response = await fetch(
        "https://react-http-learning-5ea49-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();

      if (!data) {
        throw Error("Meals not found");
      }

      console.log(data);

      let MealListData = [];

      for (const meal in data) {
        MealListData.push({ meal: data[meal] });
      }

      const mealsList = MealListData.map((meal) => (
        <MealItem
          key={meal.meal.id}
          id={meal.meal.id}
          name={meal.meal.name}
          description={meal.meal.description}
          price={meal.meal.price}
        />
      ));

      return mealsList;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {async () => {
            await fetchMealList();
          }}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
