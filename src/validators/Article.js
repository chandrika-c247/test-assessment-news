/** @format */

const Yup = require("yup");
import { Messages } from "../common";

const addArticle = {
  title: Yup.string()
    .trim()
    .required(Messages.Required.replace(":item", "Title of article")),
  body: Yup.string()
    .trim()
    .required(Messages.Required.replace(":item", "Body of article")),
  authorEmail: Yup.string()
    .trim()
    .required(Messages.Required.replace(":item", "Author's email address"))
    .email(Messages.InvalidEmail),
  publicationDate: Yup.date()
    // .trim()
    .required(Messages.Required.replace(":item", "Publication date of article"))
    .typeError("Date format should be YYYY/MM/DD"),
};

module.exports = {
  addArticle,
};
