import {ManufacturerModel, ManufacturerRepository, PhoneModel, PhoneRepository} from "@/phones/model";
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

export const createRepository = (db: Db): PhoneRepository & ManufacturerRepository => {
    const manufacturerByID: ManufacturerRepository['manufacturerByID'] = async (id) => {
        let manufacturer: (Document & { _id: ObjectId }) | null;
        try {
            manufacturer = await db.collection('manufacturers').findOne({_id: new ObjectId(id)});
        } catch (e) {
            console.debug(`Retrieving manufacturer ${id}`, e)
            manufacturer = null;
        }
        if (!manufacturer) {
            return null;
        }
        return asManufacturerModel(manufacturer);
    };
    const manufacturerByName: ManufacturerRepository['manufacturerByName'] = async (name) => {
        const manufacturer = await db.collection('manufacturers').findOne({name});
        if (!manufacturer) {
            return null;
        }
        return asManufacturerModel(manufacturer);
    };
    const manufacturers: ManufacturerRepository['manufacturers'] = async () => {
        const manufacturers = await db.collection('manufacturers')
            .find()
            .map(asManufacturerModel);
        return manufacturers.toArray();
    };
    const addManufacturer: ManufacturerRepository['addManufacturer'] = async (manufacturer) => {
        const {insertedId: id} = await db.collection('manufacturers').insertOne({
            ...manufacturer,
            created_at: new Date(),
        });
        return {...manufacturer, id};
    }

    const phoneById: PhoneRepository['phoneById'] = async (id) => {
        let phone: (Document & { _id: ObjectId }) | null;
        try {
            phone = await db.collection('phones').findOne({_id: new ObjectId(id)});
        } catch (e) {
            console.debug(`Error retrieving phone ${id}`, e)
            phone = null;
        }
        if (!phone) {
            return null
        }
        return asPhoneModel(phone)
    }

    const phones: PhoneRepository['phones'] = async () => {
        const phones = await db.collection('phones')
            .find()
            .map(asPhoneModel);
        return phones.toArray();
    };

    const addPhone: PhoneRepository['addPhone'] = async (phone, manufacturerModel) => {
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
    const updatePhone: PhoneRepository['updatePhone'] = async (phone) => {
        await db.collection('phones').updateOne({_id: phone.id}, {$set: phone})
    }
    return {
        manufacturers,
        manufacturerByID,
        manufacturerByName,
        addManufacturer,
        phoneById,
        phones,
        addPhone,
        updatePhone,
    }
}
