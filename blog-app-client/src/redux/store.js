import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import commentReducer from "./commentSlice";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    theme: themeReducer,
    user: userReducer,
    category: categoryReducer,
    comment: commentReducer,
  },
});

export default store;
