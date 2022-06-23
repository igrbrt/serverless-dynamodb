import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';
import * as uuid from 'uuid';
import middify from '../core/middify';
import formatJSONResponse from '../core/formatJsonResponse';
import articleService from '../database/services/index';
import Article from 'src/entities/article.interface';

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent & Article,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    const { title, author, source, sourceUrl, articleUrl, sentiment, lexile } =
      event.body;

    try {
      const id: string = uuid.v4();
      const post = await articleService.createArticle({
        id,
        title,
        author,
        source,
        sourceUrl,
        articleUrl,
        sentiment,
        lexile,
        createdAt: new Date().toISOString(),
      });

      return formatJSONResponse(201, post);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  },
);
