import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';
import middify from '../core/middify';
import formatJSONResponse from '../core/formatJsonResponse';
import Article from 'src/entities/article.interface';
import articleService from 'src/database/services';

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent & Article,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    const id: string = event.pathParameters.id;
    const { body } = event;
    try {
      const article = await articleService.updateArticle(id, body);

      return formatJSONResponse(200, article);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  },
);
