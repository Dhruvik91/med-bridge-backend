import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

export class ResponseEnvelope<TData = any> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  isError: boolean;

  @ApiProperty({ type: [String] })
  message: string[];

  @ApiProperty({ nullable: true })
  error: string | null;

  // TData is overridden per-endpoint in Swagger schema using getSchemaPath
  @ApiProperty({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: TData;
}

export class EmptyResponseDto {}

export const ApiOkResponseEnvelope = <TModel extends Type<unknown>>(
  model: TModel,
  isArray = false,
) =>
  applyDecorators(
    ApiExtraModels(ResponseEnvelope, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseEnvelope) },
          {
            properties: {
              data: isArray
                ? { type: 'array', items: { $ref: getSchemaPath(model) } }
                : { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );

export const ApiCreatedResponseEnvelope = <TModel extends Type<unknown>>(
  model: TModel,
  isArray = false,
) =>
  applyDecorators(
    ApiExtraModels(ResponseEnvelope, model),
    ApiCreatedResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseEnvelope) },
          {
            properties: {
              data: isArray
                ? { type: 'array', items: { $ref: getSchemaPath(model) } }
                : { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );

export const ApiPaginatedResponseEnvelope = <TModel extends Type<unknown>>(
  model: TModel,
) =>
  applyDecorators(
    ApiExtraModels(ResponseEnvelope, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseEnvelope) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                type: 'object',
                properties: {
                  page: { type: 'number' },
                  take: { type: 'number' },
                  itemCount: { type: 'number' },
                  pageCount: { type: 'number' },
                  hasPreviousPage: { type: 'boolean' },
                  hasNextPage: { type: 'boolean' },
                },
              },
            },
          },
        ],
      },
    }),
  );
