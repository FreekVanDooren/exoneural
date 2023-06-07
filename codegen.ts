import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:3000/api/phones",
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
            config: {
                objectIdType: 'string'
            }
        }
    },
    config: {
        contextType: '@/phones/model#Context',
        scalars: {
            ID: 'string'
        },
        mappers: {
            Manufacturer: '@/phones/model#ManufacturerModel',
            Phone: '@/phones/model#PhoneModel',
        }
    }
};

export default config;
