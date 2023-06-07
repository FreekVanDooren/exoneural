import {ManufacturerModel, PhoneModel, Repository} from "@/phones/model";
import {Db, ObjectId, WithId} from "mongodb";
import {Document} from "bson";

/**
 * Decoupling database object shape from internal shape
 */
const asManufacturerModel = ({_id, name}: WithId<Document>): ManufacturerModel => ({id: _id, name});

const asPhoneModel = (phone: WithId<Document>): PhoneModel => ({
    id: phone._id,
    name: phone.name,
    manufacturerID: phone.manufacturerID
});

export const createRepository = (db: Db): Repository => {
    const manufacturerByID: Repository['manufacturerByID'] = async (id) => {
        const manufacturer = await db.collection('manufacturers').findOne({_id: new ObjectId(id)});
        if (!manufacturer) {
            return null;
        }
        return asManufacturerModel(manufacturer);
    };
    const manufacturerByName: Repository['manufacturerByName'] = async (name) => {
        const manufacturer = await db.collection('manufacturers').findOne({name});
        if (!manufacturer) {
            return null;
        }
        return asManufacturerModel(manufacturer);
    };
    const manufacturers: Repository['manufacturers'] = async () => {
        const manufacturers = await db.collection('manufacturers')
            .find()
            .map(asManufacturerModel);
        return manufacturers.toArray();
    };
    const addManufacturer: Repository['addManufacturer'] = async (manufacturer) => {
        const {insertedId: id} = await db.collection('manufacturers').insertOne({
            ...manufacturer,
            created_at: new Date(),
        });
        return {...manufacturer, id};
    }

    const phoneById: Repository['phoneById'] = async (id) => {
        const phone = await db.collection('phones').findOne({_id: new ObjectId(id)});
        if (!phone) {
            return null
        }
        return asPhoneModel(phone)
    }

    const phones: Repository['phones'] = async () => {
        const phones = await db.collection('phones')
            .find()
            .map(asPhoneModel);
        return phones.toArray();
    };

    const addPhone: Repository['addPhone'] = async (phone, manufacturerModel) => {
        const model = {
            ...phone,
            manufacturerID: manufacturerModel.id,
        }
        const {insertedId: id} = await db.collection('phones').insertOne({
            ...model,
            created_at: new Date(),
        });
        return {...model, id}
    }
    return {
        manufacturers,
        manufacturerByID,
        manufacturerByName,
        addManufacturer,
        phoneById,
        phones,
        addPhone,
    }
}