import {ApolloServer} from "@apollo/server";
import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {getDbInstance} from "@/database/mongodb";
import {NextApiRequest} from "next";
import {typeDefs} from "@/phones/typeDefs";
import {resolvers} from "@/phones/resolvers";
import {Context} from "@/phones/model";
import {createRepository} from "@/phones/repository";

const server = new ApolloServer<Context>({
    typeDefs: typeDefs,
    resolvers: resolvers
})

export default startServerAndCreateNextHandler<NextApiRequest, Context>(server, {
    context: async (req, res) => {
        const repository = createRepository(await getDbInstance('phone_app'));
        return ({req, res, manufacturerRepository: repository, phoneRepository: repository});
    }
})
