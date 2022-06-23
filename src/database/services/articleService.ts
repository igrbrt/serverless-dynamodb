import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Article from 'src/entities/article.interface';

class ArticleService {
  constructor(
    private readonly dynamoDb: DocumentClient,
    private readonly tableName: string,
  ) {}

  async getAll(): Promise<Article[]> {
    const result = await this.dynamoDb
      .scan({
        TableName: this.tableName,
      })
      .promise();
    return result.Items as Article[];
  }

  async createArticle(article: Article): Promise<Article> {
    await this.dynamoDb
      .put({
        TableName: this.tableName,
        Item: article,
      })
      .promise();

    return article;
  }

  async getArticleById(id: string): Promise<Article> {
    const result = await this.dynamoDb
      .get({
        TableName: this.tableName,
        Key: {
          id,
        },
      })
      .promise();
    return result.Item as Article;
  }

  async deleteArticle(id: string): Promise<string> {
    await this.dynamoDb
      .delete({
        TableName: this.tableName,
        Key: { id },
      })
      .promise();

    return 'Article deleted successfully';
  }

  async updateArticle(
    id: string,
    partialArticle: Partial<Article>,
  ): Promise<Article> {
    const updated = await this.dynamoDb
      .update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression:
          'set #title = :title, author = :author, sourceUrl = :sourceUrl, articleUrl = :articleUrl, sentiment = :sentiment, lexile = :lexile',
        ExpressionAttributeNames: {
          '#title': 'title',
        },
        ExpressionAttributeValues: {
          ':title': partialArticle.title,
          ':author': partialArticle.author,
          ':sourceUrl': partialArticle.sourceUrl,
          ':articleUrl': partialArticle.articleUrl,
          ':sentiment': partialArticle.sentiment,
          ':lexile': partialArticle.lexile,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();

    return updated.Attributes as Article;
  }
}

export default ArticleService;
