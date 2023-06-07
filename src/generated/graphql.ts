import { GraphQLResolveInfo } from 'graphql';
import { ManufacturerModel, PhoneModel, Context } from '@/phones/model';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddManufacturerInput = {
  name: Scalars['String']['input'];
};

export type AddManufacturerResult = Manufacturer | MutationError;

export type AddPhoneInput = {
  manufacturer: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type AddPhoneResult = MutationError | Phone;

export type Manufacturer = {
  __typename?: 'Manufacturer';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addManufacturer: AddManufacturerResult;
  addPhone: AddPhoneResult;
  updatePhone: UpdatePhoneResult;
};


export type MutationAddManufacturerArgs = {
  input: AddManufacturerInput;
};


export type MutationAddPhoneArgs = {
  input: AddPhoneInput;
};


export type MutationUpdatePhoneArgs = {
  input: UpdatePhoneInput;
};

export type MutationError = {
  __typename?: 'MutationError';
  message: Scalars['String']['output'];
};

export type Phone = {
  __typename?: 'Phone';
  id: Scalars['ID']['output'];
  manufacturer: Manufacturer;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  manufacturers?: Maybe<Array<Maybe<Manufacturer>>>;
  phone?: Maybe<Phone>;
  phones?: Maybe<Array<Maybe<Phone>>>;
};


export type QueryPhoneArgs = {
  id: Scalars['ID']['input'];
};

export type UpdatePhoneInput = {
  name: Scalars['String']['input'];
  phone: Scalars['ID']['input'];
};

export type UpdatePhoneResult = MutationError | Phone;

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  AddManufacturerResult: ( ManufacturerModel ) | ( MutationError );
  AddPhoneResult: ( MutationError ) | ( PhoneModel );
  UpdatePhoneResult: ( MutationError ) | ( PhoneModel );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddManufacturerInput: AddManufacturerInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AddManufacturerResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AddManufacturerResult']>;
  AddPhoneInput: AddPhoneInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  AddPhoneResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AddPhoneResult']>;
  Manufacturer: ResolverTypeWrapper<ManufacturerModel>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationError: ResolverTypeWrapper<MutationError>;
  Phone: ResolverTypeWrapper<PhoneModel>;
  Query: ResolverTypeWrapper<{}>;
  UpdatePhoneInput: UpdatePhoneInput;
  UpdatePhoneResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdatePhoneResult']>;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddManufacturerInput: AddManufacturerInput;
  String: Scalars['String']['output'];
  AddManufacturerResult: ResolversUnionTypes<ResolversParentTypes>['AddManufacturerResult'];
  AddPhoneInput: AddPhoneInput;
  ID: Scalars['ID']['output'];
  AddPhoneResult: ResolversUnionTypes<ResolversParentTypes>['AddPhoneResult'];
  Manufacturer: ManufacturerModel;
  Mutation: {};
  MutationError: MutationError;
  Phone: PhoneModel;
  Query: {};
  UpdatePhoneInput: UpdatePhoneInput;
  UpdatePhoneResult: ResolversUnionTypes<ResolversParentTypes>['UpdatePhoneResult'];
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean']['output'];
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = Context, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = Context, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = Context, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = Context, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = Context, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = Context, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = Context, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = Context, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddManufacturerResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AddManufacturerResult'] = ResolversParentTypes['AddManufacturerResult']> = {
  __resolveType: TypeResolveFn<'Manufacturer' | 'MutationError', ParentType, ContextType>;
};

export type AddPhoneResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AddPhoneResult'] = ResolversParentTypes['AddPhoneResult']> = {
  __resolveType: TypeResolveFn<'MutationError' | 'Phone', ParentType, ContextType>;
};

export type ManufacturerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Manufacturer'] = ResolversParentTypes['Manufacturer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addManufacturer?: Resolver<ResolversTypes['AddManufacturerResult'], ParentType, ContextType, RequireFields<MutationAddManufacturerArgs, 'input'>>;
  addPhone?: Resolver<ResolversTypes['AddPhoneResult'], ParentType, ContextType, RequireFields<MutationAddPhoneArgs, 'input'>>;
  updatePhone?: Resolver<ResolversTypes['UpdatePhoneResult'], ParentType, ContextType, RequireFields<MutationUpdatePhoneArgs, 'input'>>;
};

export type MutationErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MutationError'] = ResolversParentTypes['MutationError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PhoneResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Phone'] = ResolversParentTypes['Phone']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  manufacturer?: Resolver<ResolversTypes['Manufacturer'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  manufacturers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Manufacturer']>>>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType, RequireFields<QueryPhoneArgs, 'id'>>;
  phones?: Resolver<Maybe<Array<Maybe<ResolversTypes['Phone']>>>, ParentType, ContextType>;
};

export type UpdatePhoneResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdatePhoneResult'] = ResolversParentTypes['UpdatePhoneResult']> = {
  __resolveType: TypeResolveFn<'MutationError' | 'Phone', ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AddManufacturerResult?: AddManufacturerResultResolvers<ContextType>;
  AddPhoneResult?: AddPhoneResultResolvers<ContextType>;
  Manufacturer?: ManufacturerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationError?: MutationErrorResolvers<ContextType>;
  Phone?: PhoneResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdatePhoneResult?: UpdatePhoneResultResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};
