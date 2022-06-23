import createDynamoDBClient from '../db';
import ArticleService from './articleService';

const TABLE = 'ArticlesTable';
//const {ARTICLE_TABLE} = process.env.ARTICLE_TABLE;

const articleService = new ArticleService(createDynamoDBClient(), TABLE);

export default articleService;
