import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';
import middify from '../core/middify';
import formatJSONResponse from '../core/formatJsonResponse';
import articleService from '../database/services/index';

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    try {
      const articles = await articleService.getAll();

      return formatJSONResponse(200, articles);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  },
);
