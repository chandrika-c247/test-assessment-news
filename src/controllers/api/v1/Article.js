/** @format */

import { ArticleModel } from "../../../models";
import { Messages } from "../../../common";

/**
 * @api {post} /api/v1/article  article - Create article
 * @apiName article - Create article
 * @apiGroup Article
 * @apiPermission none
 * @apiDescription Create article
 * @apiParam {String} title Title of the article
 * @apiParam {String} body Body of the article
 * @apiParam {String} authorEmail Author's email address
 * @apiParam {String} publicationDate Publication date
 * @apiParamExample {Object} Request-Example:
 * {
 *    "title": "news article",
 *    "body": "Bdy of the article",
 *    "email": "author@gmail.com",
 *    "publicationDate": "2022/04/01"
 * }
 * @apiSuccess {String} title Title of the article.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "message": "Article added successfully",
 * }
 * @apiErrorExample {json} List error
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *  "message": "Invalid request",
 *  "errors": {validationObject},
 *}
 * HTTP/1.1 500 Internal server error
 * {
 *    "message": "Internal Server Error"
 * }
 */
const add = async (req, res) => {
  try {
    const { body } = req;
    const checkDuplicate = await ArticleModel.findOne({ title: body.title });
    if (checkDuplicate) {
      return res.status(404).json({
        message: Messages.AlreadyExist.replace(':item', 'title'),
      });
    }
    await ArticleModel.create(body);
    return res.status(200).json({
      message: Messages.AddedSuccessfully.replace(':item', 'Article'),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


/**
 * @api {get} /api/v1/article  Article - Article List
 * @apiName Article - Article List
 * @apiGroup Article
 * @apiPermission none
 * @apiDescription List of all article
 * @apiQuery {String} skip skip number, default is 0.
 * @apiQuery {String} limit Limit of record, default is 10.
 * @apiSuccess {String} title Title of the article.
 */
const list = async (req, res) => {
  try {
    // const { skip = 0, limit = 10 } = req.query;
    // const data = await ArticleModel.find({}).skip(Number(skip)).limit(Number(limit)).sort({ _id: -1 });
    const data = await ArticleModel.find({}).sort({ _id: -1 });
    return res.status(200).json({
      message: Messages.List.replace(':item', 'Article'),
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @api {get} /api/v1/article/:id  Article - Get article info
 * @apiName Article - Get article info
 * @apiGroup Article
 * @apiPermission none
 * @apiDescription article info
 * @apiParam {String} id id of the article.
 * @apiSuccess {String} title Title of the article.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "message": "Article info",
 *   "data": ArticleObject,
 * }
 * @apiErrorExample {json} List error
 * HTTP/1.1 404 Not Found
 * {
 *    "message": "Invalid article id"
 * }
 * HTTP/1.1 500 Internal server error
 * {
 *    "message": "Internal Server Error"
 * }
 */
const info = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ArticleModel.findById(id);
    if (!data) {
      return res.status(404).json({
        message: Messages.Invalid.replace(':item', 'article id'),
      });
    }
    return res.status(200).json({
      message: Messages.Info.replace(':item', 'Article'),
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  add,
  list,
  info,
};