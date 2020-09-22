import React from "react";

import { Grid } from "../components";
import customRender, { initialValue as value } from "../utils/customRender";

describe("Grid", () => {
  test("should render right number of items", async () => {
    const { getAllByText } = customRender(
      <Grid
        movies={new Array(10).fill(0).map((_, i) => ({
          title: `title_${i}`,
          original_title: `title_${i}`,
          vote_average: 4.5,
          backdrop_path: `backdrop_${i}`,
          id: i,
        }))}
      />,
      { value }
    );

    expect(getAllByText(/title/i)).toHaveLength(10);
  });
});
