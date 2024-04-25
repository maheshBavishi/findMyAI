import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAllBlog: [],
  blogLoading: false,
  getpaginationBlog: [],
  getAllArtical: [],
  blogauthorloading: false,
  getallauthore: [],
  getpaginationauthore:[],
  getAllHomeBlog:[]
};

export const getBlog = createAsyncThunk(
  "blog/get-blog",
  async ({ text, categorytext, slug }) => {
    return new Promise((resolve, reject) => {
      let query = `
      query Blogs($pagination: PaginationArg ,$filters: BlogFiltersInput) {
        blogs(pagination: $pagination ,filters: $filters) {
          data {
            id
            attributes {
              title
              slug
              excerpt
              markdownContent
              tags
              createdAt
              updatedAt
              publishedAt
              blog_categories {
                data {
                  attributes {
                    title
                    createdAt
                    updatedAt
                    publishedAt
                  }
                  id
                }
              }
             
              coverImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              seo {
                description
                id
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                title
              }
              author {
                id
                title
                add_author {
                  data {
                    attributes {
                      author_name
                      createdAt
                      publishedAt
                      author_profile {
                        data {
                          attributes {
                            url
                            size
                          }
                        }
                      }
                      social_media {
                        social_media_link
                        social_media_name
                        social_media_icon {
                          data {
                            attributes {
                              url
                              size
                            }
                          }
                        }
                        id
                      }
                      updatedAt
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

      window
        .fetch(`https://cms.findmyaitool.com/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query,
            variables: {
              pagination: {
                limit: 2000,
              },

              filters: {
                title: {
                  contains: text,
                },
                blog_categories: {
                  title: {
                    contains: categorytext,
                  },
                },
                slug: {
                  contains: slug,
                },
              },
            },
          }),
        })
        .then((response) => response.json())

        .then(({ data, errors }) => {
          if (errors) {
            reject(errors);

            return;
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);
export const getAuthor = createAsyncThunk(
  "blog/get-authore",
  async ({ text, categorytext, slug }) => {
    return new Promise((resolve, reject) => {
      let query = `query AddAuthors($pagination: PaginationArg, $filters: AddAuthorFiltersInput) {
        addAuthors(pagination: $pagination, filters: $filters) {
          data {
            attributes {
              author_name
              author_profile {
                data {
                  attributes {
                    size
                    url
                  }
                }
              }
              createdAt
              publishedAt
              social_media {
                id
                social_media_icon {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                social_media_link
                social_media_name
              }
            }
          }
        }
      }`;

      window
        .fetch(`https://cms.findmyaitool.com/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query,
            variables: {
              pagination: {
                limit: 2000,
              },
              
              filters: {
                  "author_name": {
                    "contains": text
                  }
                }
              
            },
          }),
        })
        .then((response) => response.json())

        .then(({ data, errors }) => {
          if (errors) {
            reject(errors);

            return;
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);
export const getBlogForHomePage = createAsyncThunk(
  "blog/get-blogs",
  async ({ text, categorytext, slug }) => {
    return new Promise((resolve, reject) => {
      let query = `
      query Blogs($pagination: PaginationArg, $filters: BlogFiltersInput) {
        blogs(pagination: $pagination, filters: $filters, sort: "createdAt:DESC" ) {
          data {
            attributes {
              slug
              title
              coverImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              blog_categories {
                data {
                  attributes {
                    title
                  }
                }
              }
              author {
                add_author {
                  data {
                    attributes {
                      author_name
                      author_profile {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
              publishedAt
            }
          }
        }
      }
      
    `;

      window
        .fetch(`https://cms.findmyaitool.com/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query,
            variables: {
              pagination: {
                limit: 4,
              },

              filters: {
                title: {
                  contains: text,
                },
                blog_categories: {
                  title: {
                    contains: categorytext,
                  },
                },
                slug: {
                  contains: slug,
                },
              },
            },
          }),
        })
        .then((response) => response.json())

        .then(({ data, errors }) => {
          if (errors) {
            reject(errors);

            return;
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);
export const getAuthoreBlog = createAsyncThunk(
  "blog/get-blogss-authore",
  async ({ text, categorytext, slug }) => {
    return new Promise((resolve, reject) => {
      let query = `
     query Blogs($pagination: PaginationArg, $filters: BlogFiltersInput) {
        blogs(pagination: $pagination, filters: $filters,) {
          data {
            attributes {
              slug
              title
              coverImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              blog_categories {
                data {
                  attributes {
                    title
                  }
                }
              }
              author {
                add_author {
                  data {
                    attributes {
                      author_name
                      social_media {
                        social_media_link
                        social_media_name
                        social_media_icon {
                          data {
                            attributes {
                              url
                              size
                            }
                          }
                        }}
                      author_profile {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                title
              }
              publishedAt
            }
          }
        }
      }
      
      
    `;

      window
        .fetch(`https://cms.findmyaitool.com/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query,
            variables: {
              pagination: {
                limit: 2000,
              },

              filters: {
              
                blog_categories: {
                  title: {
                    contains: categorytext,
                  },
                },
              
                "author": {
                  "title": {
                    "contains": text
                  }
                }
              },
            },
          }),
        })
        .then((response) => response.json())

        .then(({ data, errors }) => {
          if (errors) {
            reject(errors);

            return;
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);
export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setGraphqlBlogs: (state, action) => {
      state.getpaginationBlog = action.payload;
    },
    setGraphqlAuthore: (state, action) => {
      state.getpaginationauthore = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getBlog.pending, (state) => {
        state.status = "pending";
        state.blogLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogLoading = false;
        let blogData = action?.payload?.blogs?.data?.sort(
          (a, b) =>
            new Date(b?.attributes?.publishedAt) -
            new Date(a?.attributes?.publishedAt)
        );
        state.getAllBlog = blogData;
        state.getpaginationBlog = blogData;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.status = "failed";

        state.blogLoading = false;
      })
      .addCase(getAuthor.pending, (state) => {
        state.status = "pending";
        state.blogauthorloading = true;
      })
      .addCase(getAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogauthorloading = false;
        state.getallauthore = action?.payload?.addAuthors?.data;
        state.getpaginationauthore = action?.payload?.addAuthors?.data;

      })
      .addCase(getAuthor.rejected, (state, action) => {
        state.status = "failed";

        state.blogauthorloading = false;
      })
      .addCase(getBlogForHomePage.pending, (state) => {
        state.status = "pending";
        state.blogLoading = true;
      })
      .addCase(getBlogForHomePage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogLoading = false;

        state.getAllHomeBlog = action?.payload?.blogs?.data;
        state.getpaginationBlog = action?.payload?.blogs?.data;
      })
      .addCase(getBlogForHomePage.rejected, (state, action) => {
        state.status = "failed";

        state.blogLoading = false;
      })
      .addCase(getAuthoreBlog.pending, (state) => {
        state.status = "pending";
        state.blogLoading = true;
      })
      .addCase(getAuthoreBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogLoading = false;

        state.getAllBlog = action?.payload?.blogs?.data;
        state.getpaginationBlog = action?.payload?.blogs?.data;
      })
      .addCase(getAuthoreBlog.rejected, (state, action) => {
        state.status = "failed";

        state.blogLoading = false;
      });
  },
});
export const { setGraphqlBlogs , setGraphqlAuthore} = blogSlice.actions;
export default blogSlice.reducer;
