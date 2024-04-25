const { gql } = require("@apollo/client");

const GET_ALL_BLOG_DATA = gql`
  query Attributes($pagination: PaginationArg) {
    rejoiceBlog(pagination: $pagination) {
      data {
        attributes {
          blogTitle
          autherImage {
            data {
              attributes {
                url
              }
            }
          }
          autherName
          blogTitleImage {
            data {
              attributes {
                url
              }
            }
          }
          shortDescription
          blogDescription
          blogCategory
          slug
          blogCreatedAt
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;
export default GET_ALL_BLOG_DATA;
