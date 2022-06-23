import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';
import middify from '../core/middify';
import formatJSONResponse from '../core/formatJsonResponse';
import articleService from 'src/database/services';

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    const id: string = event.pathParameters.id;
    try {
      const msg = await articleService.deleteArticle(id);

      return formatJSONResponse(200, msg);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  },
);
