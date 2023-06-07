import {Resolvers} from "@/generated/graphql";

export const resolvers: Resolvers = {
    Query: {
        phone: (_, {id}, {repository}) => repository.phoneById(id),
        manufacturers: (_data, _args, {repository}) => repository.manufacturers(),
        phones: (_data, _args, {repository}) => repository.phones()
    },
    Phone: {
        manufacturer: async ({manufacturerID, name}, _args, {repository}) => {
            const manufacturerEntity = await repository.manufacturerByID(manufacturerID)
            if (!manufacturerEntity) {
                console.error('Manufacturer not found', {manufacturerID})
                throw new Error(`No manufacturer associated with this phone "${name}"`);
            }
            return manufacturerEntity;
        }
    },
    Mutation: {
        addManufacturer: async (_, {input: {name}}, {repository}) => {
            if (await repository.manufacturerByName(name)) {
                return {__typename: 'MutationError', message: `Manufacturer: ${name} already exists`}
            }

            const manufacturer = await repository.addManufacturer({name})

            return {...manufacturer, __typename: 'Manufacturer'};
        },
        addPhone: async (_, {input: {name, manufacturer}}, {repository}) => {
            const manufacturerEntity = await repository.manufacturerByID(manufacturer)
            if (!manufacturerEntity) {
                return {__typename: 'MutationError', message: `Manufacturer: ${manufacturer} does not exist`}
            }

            const phone = await repository.addPhone({name}, manufacturerEntity)

            return {...phone, __typename: 'Phone'};
        }
    },
};
