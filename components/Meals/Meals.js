import MealsSummary from "./MealsSummary";
import AvailabelMeal from "./AvailabelMeals";
import { Fragment } from "react";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailabelMeal />
    </Fragment>
  );
};

export default Meals;
