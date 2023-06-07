/**
 * Leaking mongodb type to keep things simple.
 */
import {ObjectId} from "mongodb";
import {BaseContext} from "@apollo/server";

export type Context = BaseContext & {
    manufacturerRepository: ManufacturerRepository,
    phoneRepository: PhoneRepository
};

/**
 * Need to add -Model postfix to jive with codegen. Cannot pick the same name as generated from schema.
 */
export type ManufacturerModel = {
    id: ObjectId;
    name: string;
}

export type PhoneModel = {
    id: ObjectId;
    name: string;
    manufacturerID: ObjectId;
}

export interface ManufacturerRepository {
    manufacturers: () => Promise<ManufacturerModel[] | null>
    manufacturerByID: (id: ObjectId | string) => Promise<ManufacturerModel | null>
    manufacturerByName: (name: string) => Promise<ManufacturerModel | null>
    addManufacturer: (manufacturer: Pick<ManufacturerModel, 'name'>) => Promise<ManufacturerModel>
}

export interface PhoneRepository {
    phones: () => Promise<PhoneModel[] | null>;
    phoneById: (id: string) => Promise<PhoneModel | null>;
    addPhone: (phone: Pick<PhoneModel, 'name'>, manufacturerModel: ManufacturerModel) => Promise<PhoneModel>;
    updatePhone: (phone: PhoneModel) => Promise<void>
}
