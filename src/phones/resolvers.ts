import {Resolvers} from "@/generated/graphql";

export const resolvers: Resolvers = {
    Query: {
        phone: (_, {id}, {phoneRepository}) => phoneRepository.phoneById(id),
        manufacturers: (_data, _args, {manufacturerRepository}) => manufacturerRepository.manufacturers(),
        phones: (_data, _args, {phoneRepository}) => phoneRepository.phones()
    },
    Phone: {
        manufacturer: async ({manufacturerID, name}, _args, {manufacturerRepository}) => {
            const manufacturerEntity = await manufacturerRepository.manufacturerByID(manufacturerID)
            if (!manufacturerEntity) {
                console.error('Manufacturer not found', {manufacturerID})
                throw new Error(`No manufacturer associated with this phone "${name}"`);
            }
            return manufacturerEntity;
        }
    },
    Mutation: {
        addManufacturer: async (_, {input: {name}}, {manufacturerRepository}) => {
            if (await manufacturerRepository.manufacturerByName(name)) {
                return {__typename: 'MutationError', message: `Manufacturer: ${name} already exists`}
            }

            const manufacturer = await manufacturerRepository.addManufacturer({name})

            return {...manufacturer, __typename: 'Manufacturer'};
        },
        addPhone: async (_, {input: {name, manufacturer}}, {manufacturerRepository, phoneRepository}) => {
            const manufacturerEntity = await manufacturerRepository.manufacturerByID(manufacturer)
            if (!manufacturerEntity) {
                return {__typename: 'MutationError', message: `Manufacturer: ${manufacturer} does not exist`}
            }

            const phone = await phoneRepository.addPhone({name}, manufacturerEntity)

            return {...phone, __typename: 'Phone'};
        },
        updatePhone: async (_, {input: {phone: phoneId, name}}, {phoneRepository}) => {
            const currentPhone = await phoneRepository.phoneById(phoneId)
            if (!currentPhone) {
                return {__typename: 'MutationError', message: `Phone: ${phoneId} does not exist`}
            }

            const updatedPhone = {...currentPhone, name};
            await phoneRepository.updatePhone(updatedPhone)

            return {...updatedPhone, __typename: 'Phone'};
        }
    },
};
