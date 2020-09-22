import React from "react";
import { fireEvent, wait } from "@testing-library/react";

import { Detail } from "../pages";

import customRender, {
  initialValue as value,
  history,
} from "../utils/customRender";
import { fetchSingle } from "../api";

const routeComponentPropsMock = {
  history: history("/movie/1245"),
  location: {} as any,
  match: { params: { id: "1245", type: "movie" } } as any,
};

const setup = () => {
  const utils = customRender(<Detail {...routeComponentPropsMock} />, {
    value,
  });

  return {
    ...utils,
    params: routeComponentPropsMock.match.params,
  };
};

jest.mock("../api/index");

describe("Detail", () => {
  test("should fetch movie/show detail", async () => {
    const {
      params: { id, type },
    } = setup();

    await wait();

    expect(fetchSingle).toHaveBeenCalled();
    expect(fetchSingle).toHaveBeenCalledWith(type, id);
  });

  test("should show video if movie/show has video, otherwise show poster", async () => {
    const { getByTestId, queryByAltText } = customRender(
      <Detail {...routeComponentPropsMock} />,
      {
        value: {
          ...value,
          state: {
            ...value.state,
            single: {
              backdrop_path: "show",
              first_air_date: "2004-07-07",
              genres: [{ id: 1, name: "Action" }],
              id: 12345,
              name: "show",
              number_of_episodes: 16,
              number_of_seasons: 2,
              original_name: "show",
              overview: "show",
              poster_path: "show.jpg",
              type: "show",
              vote_average: 4.5,
              vote_count: 123,
              videos: {
                results: [{ id: "1", key: "video_key", site: "youtube" }],
              },
            },
          },
        },
      }
    );

    await wait();

    expect(getByTestId(/video/i)).toBeVisible();
    expect(queryByAltText(/poster/i)).toBeNull();
  });

  test("click on back icon should navigate back to home", async () => {
    const { id, type } = routeComponentPropsMock.match.params;
    const { getByTestId, history } = customRender(
      <Detail {...routeComponentPropsMock} />,
      {
        history: routeComponentPropsMock.history,
        value: {
          ...value,
          state: {
            ...value.state,
            single: {
              backdrop_path: "show",
              first_air_date: "2004-07-07",
              genres: [{ id: 1, name: "Action" }],
              id: 12345,
              name: "show",
              number_of_episodes: 16,
              number_of_seasons: 2,
              original_name: "show",
              overview: "show",
              poster_path: "show.jpg",
              type: "show",
              vote_average: 4.5,
              vote_count: 123,
              videos: {
                results: [{ id: "1", key: "video_key", site: "youtube" }],
              },
            },
          },
        },
      }
    );

    expect(getByTestId(/back/i)).toBeVisible();

    expect(history.location.pathname).toBe(`/${type}/${id}`);

    fireEvent.click(getByTestId(/back/i));

    expect(history.location.pathname).toBe("/");
  });
});
