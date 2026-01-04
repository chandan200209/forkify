import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
// https://forkify-api.jonas.io/

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results to mark selected search result
    // taking the page that's gonna be displayed
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading the recipe
    await model.loadRecipe(id);

    // 2) Rendering the recipe
    // if (!recipe.ingredients) recipe.ingredients = [];
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.error(err);
    // recipeView.renderError(`${err} 💥💥`);
    recipeView.renderError(); // will take the default value
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResult(query); // it does not return anything, just manipulate the state

    // 3) render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
}
const controlPagination = function (goToPage) {
  // 3) render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) render new pagination buttons
  paginationView.render(model.state.search);
}
const controlServings = function (newServings) {
  // update the recipe servings
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}
const controlAddBookmark = function () {
  // add/remove bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  }
  else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // update recipe view
  recipeView.update(model.state.recipe);
  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
}
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}
const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();
    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // render recipe
    recipeView.render(model.state.recipe);
    // success message
    addRecipeView.renderMessage();
    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back();
    // window.history.forward();

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }
  catch (err) {
    addRecipeView.renderError(err);
  }
}
// publisher - subscriber design pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
