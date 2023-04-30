import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [mealList, setMealList] = useState([]);

  const fetchMealList = async () => {
    try {
      const response = await fetch(
        "https://react-http-learning-5ea49-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();

      if (!data) {
        throw Error("Meals not found");
      }

      for (const meal in data) {
        const mealListItem = { meal: data[meal] };
        setMealList((prevList) => [...prevList, mealListItem]);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchMealList();
  }, []);

  const mealsList = mealList.map((meal) => (
    <MealItem
      key={meal.meal.id}
      id={meal.meal.id}
      name={meal.meal.name}
      description={meal.meal.description}
      price={meal.meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
